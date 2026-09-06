/**
 * addon/tooltip.js
 *
 * - Survol d'un symbole dans #pulmonicConsonants, #nonPulmonicConsonants ou
 *   #vowels : affiche une infobulle à côté du curseur (jamais sur le symbole)
 *   avec : nom, image addon/img/{SYMBOLE}.png, le symbole copiable,
 *   l'équivalent X-SAMPA, un lien Wikipédia (EN), et un exemple dans la
 *   première langue disponible parmi anglais > français > espagnol.
 * - Clic sur un symbole : joue addon/sounds/{SYMBOLE}.mp3 (sauf si les sons
 *   sont désactivés via la case à cocher).
 *
 * {SYMBOLE} = le caractère IPA exact affiché (ex : "ɘ" -> addon/img/ɘ.png,
 * addon/sounds/ɘ.mp3).
 */

(function () {
	"use strict";

	var LANG_LABELS = { en: "English", fr: "Français", es: "Español" };
	var LANG_PRIORITY = ["en", "fr", "es"];

	var soundsEnabled = true;
	var currentAudio = null;
	var tooltipEl = null;
	var activeTarget = null;

	// ---------------------------------------------------------------
	// Construction des noms à partir du DOM (place / manière / voisement)
	// ---------------------------------------------------------------

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function buildPulmonicNames() {
		var map = {};
		var container = document.getElementById("pulmonicConsonants");
		if (!container) return map;
		var table = container.querySelector("table");
		var placeHeaders = [];
		var headThs = table.querySelectorAll("thead th.place");
		for (var h = 0; h < headThs.length; h++) {
			placeHeaders.push(headThs[h].textContent.replace(/\u00A0/g, " ").trim());
		}
		var rows = table.querySelectorAll("tbody tr");
		for (var r = 0; r < rows.length; r++) {
			var mannerEl = rows[r].querySelector("th.manner");
			if (!mannerEl) continue;
			var manner = mannerEl.textContent.trim();
			var cells = rows[r].querySelectorAll("td");
			for (var c = 0; c < cells.length; c++) {
				var place = placeHeaders[c] || "";
				var spans = cells[c].querySelectorAll('span[title^="U+"]');
				for (var s = 0; s < spans.length; s++) {
					var span = spans[s];
					var symbol = span.textContent.trim();
					if (!symbol) continue;
					var voicing = "";
					if (span.className.indexOf("voiceless") !== -1) voicing = "Voiceless";
					else if (span.className.indexOf("voiced") !== -1) voicing = "Voiced";
					var name = (voicing ? voicing + " " : "") + place.toLowerCase() + " " + manner.toLowerCase();
					map[symbol] = name;
				}
			}
		}
		return map;
	}

	function buildVowelNames() {
		var map = {};
		var info = window.IPAAddon.VOWEL_INFO || {};
		for (var symbol in info) {
			if (!info.hasOwnProperty(symbol)) continue;
			var v = info[symbol];
			var name = v.height + " " + v.back + " " + (v.round ? "rounded" : "unrounded") + " vowel";
			map[symbol] = name;
		}
		return map;
	}

	function buildNonPulmonicNames() {
		return window.IPAAddon.NON_PULMONIC_NAMES || {};
	}

	var NAME_MAP = null;
	function getNameMap() {
		if (!NAME_MAP) {
			NAME_MAP = {};
			var pulmonic = buildPulmonicNames();
			var vowels = buildVowelNames();
			var nonPulmonic = buildNonPulmonicNames();
			for (var k in pulmonic) NAME_MAP[k] = pulmonic[k];
			for (var k2 in vowels) NAME_MAP[k2] = vowels[k2];
			for (var k3 in nonPulmonic) NAME_MAP[k3] = nonPulmonic[k3];
		}
		return NAME_MAP;
	}

	function getPhonemeName(symbol) {
		var map = getNameMap();
		return map[symbol] || symbol;
	}

	function getWikiUrl(symbol, name) {
		var overrides = window.IPAAddon.WIKI_NAME_OVERRIDES || {};
		var title = overrides[symbol] || name;
		return "https://en.wikipedia.org/wiki/" + encodeURIComponent(title.trim().replace(/ /g, "_"));
	}

	function getExample(symbol) {
		var examples = (window.IPAAddon.EXAMPLES || {})[symbol];
		if (!examples) return null;
		for (var i = 0; i < LANG_PRIORITY.length; i++) {
			var lang = LANG_PRIORITY[i];
			if (examples[lang]) {
				return { lang: lang, word: examples[lang][0], ipa: examples[lang][1] };
			}
		}
		return null;
	}

	// ---------------------------------------------------------------
	// Infobulle
	// ---------------------------------------------------------------

	function buildTooltipElement() {
		var el = document.createElement("div");
		el.id = "ipaTooltip";
		el.className = "ipa-tooltip";
		el.setAttribute("aria-hidden", "true");
		el.innerHTML =
			'<div class="ipa-tooltip-name"></div>' +
			'<img class="ipa-tooltip-img" alt="" />' +
			'<div class="ipa-tooltip-copy" title="Cliquer pour copier le symbole"></div>' +
			'<div class="ipa-tooltip-xsampa"></div>' +
			'<div class="ipa-tooltip-wiki"><a href="#" target="_blank" rel="noopener noreferrer">Voir sur Wikipédia (EN)</a></div>' +
			'<div class="ipa-tooltip-example">' +
			'<div class="ipa-tooltip-example-lang"></div>' +
			'<div class="ipa-tooltip-example-word"></div>' +
			'<div class="ipa-tooltip-example-ipa"></div>' +
			"</div>";
		document.body.appendChild(el);

		el.querySelector(".ipa-tooltip-copy").addEventListener("click", function () {
			var symbol = el.getAttribute("data-symbol") || "";
			copyToClipboard(symbol);
		});

		return el;
	}

	function copyToClipboard(text) {
		if (!text) return;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text)["catch"](function () {});
		} else {
			var ta = document.createElement("textarea");
			ta.value = text;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			try { document.execCommand("copy"); } catch (e) {}
			document.body.removeChild(ta);
		}
	}

	function ensureTooltip() {
		if (!tooltipEl) tooltipEl = buildTooltipElement();
		return tooltipEl;
	}

	function fillTooltip(el, symbol) {
		var name = getPhonemeName(symbol);
		var xsampa = (window.IPAAddon.XSAMPA || {})[symbol];
		var wikiUrl = getWikiUrl(symbol, name);
		var example = getExample(symbol);

		el.setAttribute("data-symbol", symbol);
		el.querySelector(".ipa-tooltip-name").textContent = capitalize(name);

		var img = el.querySelector(".ipa-tooltip-img");
		img.style.display = "";
		img.onerror = function () { img.style.display = "none"; };
		img.src = "addon/img/" + encodeURIComponent(symbol) + ".png";
		img.alt = "Position de la bouche pour " + symbol;

		el.querySelector(".ipa-tooltip-copy").textContent = symbol;

		var xsampaEl = el.querySelector(".ipa-tooltip-xsampa");
		if (xsampa) {
			xsampaEl.style.display = "";
			xsampaEl.textContent = "X-SAMPA : " + xsampa;
		} else {
			xsampaEl.style.display = "none";
		}

		var wikiLink = el.querySelector(".ipa-tooltip-wiki a");
		wikiLink.href = wikiUrl;

		var exampleBox = el.querySelector(".ipa-tooltip-example");
		if (example) {
			exampleBox.style.display = "";
			el.querySelector(".ipa-tooltip-example-lang").textContent = LANG_LABELS[example.lang];
			el.querySelector(".ipa-tooltip-example-word").textContent = example.word;
			el.querySelector(".ipa-tooltip-example-ipa").textContent = "[" + example.ipa + "]";
		} else {
			exampleBox.style.display = "none";
		}
	}

	function positionTooltip(el, mouseX, mouseY) {
		var offset = 18;
		var vw = window.innerWidth;
		var vh = window.innerHeight;
		// on affiche d'abord hors-écran pour mesurer sa taille réelle
		el.style.left = "-9999px";
		el.style.top = "-9999px";
		el.style.display = "block";
		var rect = el.getBoundingClientRect();

		var left = mouseX + offset;
		var top = mouseY + offset;

		// ne jamais dépasser le bord droit / bas ; dans ce cas, on bascule
		// l'infobulle de l'autre côté du curseur (elle ne doit jamais
		// recouvrir le symbole survolé, qui est sous le curseur).
		if (left + rect.width > vw - 4) left = mouseX - offset - rect.width;
		if (top + rect.height > vh - 4) top = mouseY - offset - rect.height;
		if (left < 4) left = 4;
		if (top < 4) top = 4;

		el.style.left = left + "px";
		el.style.top = top + "px";
	}

	function showTooltip(target, mouseX, mouseY) {
		var symbol = target.textContent.trim();
		if (!symbol) return;
		var el = ensureTooltip();
		if (activeTarget !== target) {
			fillTooltip(el, symbol);
			activeTarget = target;
		}
		positionTooltip(el, mouseX, mouseY);
	}

	function hideTooltip() {
		if (tooltipEl) tooltipEl.style.display = "none";
		activeTarget = null;
	}

	// ---------------------------------------------------------------
	// Lecture du son au clic
	// ---------------------------------------------------------------

	function playPhonemeSound(symbol) {
		if (!soundsEnabled || !symbol) return;
		try {
			if (currentAudio) {
				currentAudio.pause();
			}
			currentAudio = new Audio("addon/sounds/" + encodeURIComponent(symbol) + ".mp3");
			currentAudio.play()["catch"](function () {
				// fichier son absent ou lecture bloquée par le navigateur : on ignore
			});
		} catch (e) {}
	}

	// Exposé pour que keyboard/input.js (autre frame) puisse aussi déclencher
	// le son quand un symbole est ajouté au champ de saisie.
	window.playPhonemeSound = playPhonemeSound;
	window.isSoundsEnabled = function () { return soundsEnabled; };

	// ---------------------------------------------------------------
	// Câblage des évènements sur les 3 zones ciblées
	// ---------------------------------------------------------------

	function getTargetElements() {
		var containers = ["pulmonicConsonants", "nonPulmonicConsonants", "vowels"];
		var elements = [];
		for (var i = 0; i < containers.length; i++) {
			var container = document.getElementById(containers[i]);
			if (!container) continue;
			var nodes = container.querySelectorAll('[title^="U+"]');
			for (var j = 0; j < nodes.length; j++) elements.push(nodes[j]);
		}
		return elements;
	}

	function initSoundToggle() {
		var toggle = document.getElementById("disableSoundsToggle");
		if (!toggle) return;
		soundsEnabled = !toggle.checked;
		toggle.addEventListener("change", function () {
			soundsEnabled = !toggle.checked;
		});
	}

	function init() {
		initSoundToggle();
		var elements = getTargetElements();
		for (var i = 0; i < elements.length; i++) {
			(function (el) {
				el.addEventListener("mouseenter", function (e) {
					showTooltip(el, e.clientX, e.clientY);
				});
				el.addEventListener("mousemove", function (e) {
					showTooltip(el, e.clientX, e.clientY);
				});
				el.addEventListener("mouseleave", function () {
					hideTooltip();
				});
				el.addEventListener("click", function () {
					playPhonemeSound(el.textContent.trim());
				});
			})(elements[i]);
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
