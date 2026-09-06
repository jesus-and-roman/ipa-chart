/* IPA chart interactive features */
(function () {
  'use strict';

  var DATA = {
    'p':  ['Voiceless bilabial plosive','p','English','spin','spɪn','Voiceless_bilabial_plosive'],
    'b':  ['Voiced bilabial plosive','b','English','bin','bɪn','Voiced_bilabial_plosive'],
    't':  ['Voiceless alveolar plosive','t','English','tea','tiː','Voiceless_alveolar_plosive'],
    'd':  ['Voiced alveolar plosive','d','English','day','deɪ','Voiced_alveolar_plosive'],
    'ʈ':  ['Voiceless retroflex plosive','t`','English','retroflex','ˈrɛtroʊflɛks','Voiceless_retroflex_plosive'],
    'ɖ':  ['Voiced retroflex plosive','d`','English','retroflex','ˈrɛtroʊflɛks','Voiced_retroflex_plosive'],
    'c':  ['Voiceless palatal plosive','c','English','acute','əˈkjuːt','Voiceless_palatal_plosive'],
    'ɟ':  ['Voiced palatal plosive','J\\','English','duke','djuːk','Voiced_palatal_plosive'],
    'k':  ['Voiceless velar plosive','k','English','key','kiː','Voiceless_velar_plosive'],
    'ɡ':  ['Voiced velar plosive','g','English','go','goʊ','Voiced_velar_plosive'],
    'q':  ['Voiceless uvular plosive','q','French','raclette','ʁaklɛt','Voiceless_uvular_plosive'],
    'ɢ':  ['Voiced uvular plosive','G','French','gargarisme','ɡaʁɡaʁism','Voiced_uvular_plosive'],
    'ʔ':  ['Glottal stop','?','English','uh-oh','ʌʔoʊ','Glottal_stop'],
    'm':  ['Voiced bilabial nasal','m','English','me','miː','Voiced_bilabial_nasal'],
    'ɱ':  ['Voiced labiodental nasal','m\\','English','symphony','ˈsɪmfəni','Voiced_labiodental_nasal'],
    'n':  ['Voiced alveolar nasal','n','English','no','noʊ','Voiced_alveolar_nasal'],
    'ɳ':  ['Voiced retroflex nasal','n`','English','retroflex','ˈrɛtroʊflɛks','Voiced_retroflex_nasal'],
    'ɲ':  ['Voiced palatal nasal','J','Spanish','niño','ˈniɲo','Voiced_palatal_nasal'],
    'ŋ':  ['Voiced velar nasal','N','English','sing','sɪŋ','Voiced_velar_nasal'],
    'ɴ':  ['Voiced uvular nasal','N\\','French','ranger','ʁɑ̃ʒe','Voiced_uvular_nasal'],
    'ʙ':  ['Bilabial trill','B\\','Spanish','perro','ˈpero','Bilabial_trill'],
    'r':  ['Alveolar trill','r','Spanish','perro','ˈpero','Alveolar_trill'],
    'ʀ':  ['Uvular trill','R','French','rouge','ʁuʒ','Uvular_trill'],
    'ⱱ':  ['Labiodental flap','P\\','English','very','ˈvɛɹi','Labiodental_flap'],
    'ɾ':  ['Alveolar tap','4','English','water','ˈwɔɾɚ','Alveolar_tap'],
    'ɽ':  ['Retroflex flap','r`','English','retroflex','ˈrɛtroʊflɛks','Retroflex_flap'],
    'ɸ':  ['Voiceless bilabial fricative','p\\','English','bilabial','ˌbaɪlæbiəl','Voiceless_bilabial_fricative'],
    'β':  ['Voiced bilabial fricative','B','Spanish','lobo','ˈloβo','Voiced_bilabial_fricative'],
    'f':  ['Voiceless labiodental fricative','f','English','fee','fiː','Voiceless_labiodental_fricative'],
    'v':  ['Voiced labiodental fricative','v','English','vee','viː','Voiced_labiodental_fricative'],
    'θ':  ['Voiceless dental fricative','T','English','think','θɪŋk','Voiceless_dental_fricative'],
    'ð':  ['Voiced dental fricative','D','English','this','ðɪs','Voiced_dental_fricative'],
    's':  ['Voiceless alveolar fricative','s','English','see','siː','Voiceless_alveolar_fricative'],
    'z':  ['Voiced alveolar fricative','z','English','zee','ziː','Voiced_alveolar_fricative'],
    'ʃ':  ['Voiceless postalveolar fricative','S','English','sheep','ʃiːp','Voiceless_postalveolar_fricative'],
    'ʒ':  ['Voiced postalveolar fricative','Z','English','vision','ˈvɪʒən','Voiced_postalveolar_fricative'],
    'ʂ':  ['Voiceless retroflex fricative','s`','English','retroflex','ˈrɛtroʊflɛks','Voiceless_retroflex_fricative'],
    'ʐ':  ['Voiced retroflex fricative','z`','English','retroflex','ˈrɛtroʊflɛks','Voiced_retroflex_fricative'],
    'ç':  ['Voiceless palatal fricative','C','German','ich','ɪç','Voiceless_palatal_fricative'],
    'ʝ':  ['Voiced palatal fricative','j\\','Spanish','yo','ʝo','Voiced_palatal_fricative'],
    'x':  ['Voiceless velar fricative','x','Spanish','jamón','xaˈmon','Voiceless_velar_fricative'],
    'ɣ':  ['Voiced velar fricative','G','Spanish','agua','ˈaɣwa','Voiced_velar_fricative'],
    'χ':  ['Voiceless uvular fricative','X','French','jota','ʒɔta','Voiceless_uvular_fricative'],
    'ʁ':  ['Voiced uvular fricative','R','French','rouge','ʁuʒ','Voiced_uvular_fricative'],
    'ħ':  ['Voiceless pharyngeal fricative','X\\','Arabic','Hassan','ħasan','Voiceless_pharyngeal_fricative'],
    'ʕ':  ['Voiced pharyngeal fricative','?\\','Arabic','Arabic','ʕarabi','Voiced_pharyngeal_fricative'],
    'h':  ['Voiceless glottal fricative','h','English','he','hiː','Voiceless_glottal_fricative'],
    'ɦ':  ['Voiced glottal fricative','h\\','English','ahead','əˈhɛd','Voiced_glottal_fricative'],
    'ɬ':  ['Voiceless alveolar lateral fricative','K','Welsh','Llanelli','ɬaˈnɛɬi','Voiceless_alveolar_lateral_fricative'],
    'ɮ':  ['Voiced alveolar lateral fricative','K\\','Welsh','Welsh','wɛlʃ','Voiced_alveolar_lateral_fricative'],
    'ʋ':  ['Labiodental approximant','P','English','very','ˈvɛɹi','Labiodental_approximant'],
    'ɹ':  ['Alveolar approximant','r\\','English','red','ɹɛd','Alveolar_approximant'],
    'ɻ':  ['Retroflex approximant','r\\`','English','right','ɹaɪt','Retroflex_approximant'],
    'j':  ['Palatal approximant','j','English','yes','jɛs','Palatal_approximant'],
    'ɰ':  ['Velar approximant','M\\','Spanish','agua','ˈaɣwa','Velar_approximant'],
    'l':  ['Alveolar lateral approximant','l','English','leaf','liːf','Alveolar_lateral_approximant'],
    'ɭ':  ['Retroflex lateral approximant','l`','English','retroflex','ˈrɛtroʊflɛks','Retroflex_lateral_approximant'],
    'ʎ':  ['Palatal lateral approximant','L','Spanish','llama','ˈʎama','Palatal_lateral_approximant'],
    'ʟ':  ['Velar lateral approximant','L\\','English','velar','ˈviːlər','Velar_lateral_approximant'],
    'ʘ':  ['Bilabial click','O\\','English','click','klɪk','Bilabial_click'],
    'ɓ':  ['Voiced bilabial implosive','b_<','English','implosive','ɪmˈploʊsɪv','Voiced_bilabial_implosive'],
    'ʼ':  ['Ejective marker','_>','English','ejective','ɪˈdʒɛktɪv','Ejective'],
    'ǀ':  ['Dental click','|\\','English','click','klɪk','Dental_click'],
    'ɗ':  ['Voiced alveolar implosive','d_<','English','implosive','ɪmˈploʊsɪv','Voiced_alveolar_implosive'],
    'ǃ':  ['Postalveolar click','!\\','English','click','klɪk','Postalveolar_click'],
    'ʄ':  ['Voiced palatal implosive','J_<','English','implosive','ɪmˈploʊsɪv','Voiced_palatal_implosive'],
    'ǂ':  ['Palatal alveolar click','=\\','English','click','klɪk','Palatal_alveolar_click'],
    'ɠ':  ['Voiced velar implosive','g_<','English','implosive','ɪmˈploʊsɪv','Voiced_velar_implosive'],
    'ǁ':  ['Alveolar lateral click','||\\','English','click','klɪk','Alveolar_lateral_click'],
    'ʛ':  ['Voiced uvular implosive','G_<','English','implosive','ɪmˈploʊsɪv','Voiced_uvular_implosive'],
    'i':  ['Close front unrounded vowel','i','English','machine','məˈʃiːn','Close_front_unrounded_vowel'],
    'y':  ['Close front rounded vowel','y','French','tu','ty','Close_front_rounded_vowel'],
    'ɨ':  ['Close central unrounded vowel','1','Polish','my','mɨ','Close_central_unrounded_vowel'],
    'ʉ':  ['Close central rounded vowel','}\\','Swedish','nu','nʉː','Close_central_rounded_vowel'],
    'ɯ':  ['Close back unrounded vowel','M','Turkish','kır','kɯr','Close_back_unrounded_vowel'],
    'u':  ['Close back rounded vowel','u','English','food','fuːd','Close_back_rounded_vowel'],
    'ɪ':  ['Near-close front unrounded vowel','I','English','kit','kɪt','Near-close_front_unrounded_vowel'],
    'ʏ':  ['Near-close front rounded vowel','Y','German','müssen','ˈmʏsn̩','Near-close_front_rounded_vowel'],
    'ʊ':  ['Near-close back rounded vowel','U','English','foot','fʊt','Near-close_back_rounded_vowel'],
    'e':  ['Close-mid front unrounded vowel','e','English','say','seɪ','Close-mid_front_unrounded_vowel'],
    'ø':  ['Close-mid front rounded vowel','2','French','peu','pø','Close-mid_front_rounded_vowel'],
    'ɘ':  ['Close-mid central unrounded vowel','@\\','English','about','əˈbaʊt','Close-mid_central_unrounded_vowel'],
    'ɵ':  ['Close-mid central rounded vowel','8','English','Swedish','swiːdɪʃ','Close-mid_central_rounded_vowel'],
    'ɤ':  ['Close-mid back unrounded vowel','7','Vietnamese','tơ','tɤ','Close-mid_back_unrounded_vowel'],
    'o':  ['Close-mid back rounded vowel','o','English','go','goʊ','Close-mid_back_rounded_vowel'],
    'ə':  ['Mid central vowel','@','English','sofa','ˈsoʊfə','Mid_central_vowel'],
    'ɛ':  ['Open-mid front unrounded vowel','E','English','bed','bɛd','Open-mid_front_unrounded_vowel'],
    'œ':  ['Open-mid front rounded vowel','9','French','œuf','œf','Open-mid_front_rounded_vowel'],
    'ɜ':  ['Open-mid central unrounded vowel','3','English','nurse','nɜːs','Open-mid_central_unrounded_vowel'],
    'ɞ':  ['Open-mid central rounded vowel','3\\','English','rounded','ˈraʊndɪd','Open-mid_central_rounded_vowel'],
    'ʌ':  ['Open-mid back unrounded vowel','V','English','strut','strʌt','Open-mid_back_unrounded_vowel'],
    'ɔ':  ['Open-mid back rounded vowel','O','English','thought','θɔːt','Open-mid_back_rounded_vowel'],
    'æ':  ['Near-open front unrounded vowel','{','English','cat','kæt','Near-open_front_unrounded_vowel'],
    'ɐ':  ['Near-open central vowel','6','German','bitte','ˈbɪtə','Near-open_central_vowel'],
    'a':  ['Open front unrounded vowel','a','Spanish','casa','ˈkasa','Open_front_unrounded_vowel'],
    'ɶ':  ['Open front rounded vowel','&','French','œil','œj','Open_front_rounded_vowel'],
    'ɑ':  ['Open back unrounded vowel','A','English','father','ˈfɑːðər','Open_back_unrounded_vowel'],
    'ɒ':  ['Open back rounded vowel','Q','English','lot','lɒt','Open_back_rounded_vowel']
  };

  function slugToLabel(slug) { return slug.replace(/_/g, ' '); }
  function enc(s) { return encodeURIComponent(s); }
  function makeWiki(name) { return 'https://en.wikipedia.org/wiki/' + name; }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }

  function getData(symbol) {
    var d = DATA[symbol];
    if (!d) return null;
    return { name:d[0], xsampa:d[1], lang:d[2], word:d[3], wordIpa:d[4], slug:d[5] };
  }

  function markNodes() {
    var root = document;
    ['pulmonicConsonants','nonPulmonicConsonants','vowelSymbols'].forEach(function (id) {
      var section = root.getElementById(id);
      if (!section) return;
      var nodes = section.querySelectorAll('span, td');
      for (var i=0;i<nodes.length;i++) {
        var node = nodes[i];
        var text = (node.textContent || '').replace(/[\s\u25CC]/g, '');
        if (text.length === 1 && DATA[text] && !node.classList.contains('impossible')) {
          node.classList.add('ipa-feature');
          node.setAttribute('data-ipa-symbol', text);
          node.setAttribute('data-ipa-name', DATA[text][0]);
        }
      }
    });
  }

  function makeTooltip() {
    var tip = document.getElementById('ipaFeatureTooltip');
    if (tip) return tip;
    tip = document.createElement('div');
    tip.id = 'ipaFeatureTooltip';
    tip.setAttribute('role','tooltip');
    tip.innerHTML = '<div class="ipa-tooltip-title"></div><img class="ipa-mouth-image" alt="Position de la bouche" /><div class="ipa-tooltip-copy"></div><div class="ipa-tooltip-xsampa"></div><a class="ipa-tooltip-wiki" target="_blank" rel="noopener"></a><div class="ipa-tooltip-example"></div>';
    document.body.appendChild(tip);
    return tip;
  }

  function showTooltip(node, e) {
    var d = getData(node.getAttribute('data-ipa-symbol'));
    if (!d) return;
    var tip = makeTooltip();
    tip.querySelector('.ipa-tooltip-title').textContent = d.name;
    var img = tip.querySelector('.ipa-mouth-image');
    img.src = 'addon/img/' + d.slug + '.png';
    img.onerror = function(){ this.style.display='none'; };
    img.onload = function(){ this.style.display='block'; };
    img.style.display='block';
    tip.querySelector('.ipa-tooltip-copy').innerHTML = '<strong>Copier :</strong> <button type="button" class="ipa-copy-btn">' + escapeHtml(node.textContent.trim()) + '</button>';
    tip.querySelector('.ipa-tooltip-xsampa').innerHTML = '<strong>X-SAMPA :</strong> <code>' + escapeHtml(d.xsampa) + '</code>';
    var wiki = tip.querySelector('.ipa-tooltip-wiki');
    wiki.href = makeWiki(d.slug);
    wiki.textContent = 'Wikipedia (English)';
    tip.querySelector('.ipa-tooltip-example').innerHTML = '<div class="ipa-example-lang">' + escapeHtml(d.lang) + '</div><a class="ipa-example-word" target="_blank" rel="noopener" href="https://en.wikipedia.org/wiki/' + enc(d.word) + '">' + escapeHtml(d.word) + '</a> <span class="ipa-example-transcription">[' + escapeHtml(d.wordIpa) + ']</span><button type="button" class="ipa-example-play" title="Jouer l\'exemple">▶</button>';
    tip.querySelector('.ipa-copy-btn').onclick = function () {
      if (navigator.clipboard) navigator.clipboard.writeText(node.textContent.trim());
      else { var ta=document.createElement('textarea'); ta.value=node.textContent.trim(); document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    };
    tip.querySelector('.ipa-example-play').onclick = function () { playExample(d); };
    tip.style.display = 'block';
    positionTooltip(tip, e);
  }

  function positionTooltip(tip, e) {
    var gap = 14, x = e.clientX + gap, y = e.clientY + gap;
    var rect = tip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - 8) x = e.clientX - rect.width - gap;
    if (y + rect.height > window.innerHeight - 8) y = e.clientY - rect.height - gap;
    tip.style.left = Math.max(8,x) + 'px'; tip.style.top = Math.max(8,y) + 'px';
  }

  function hideTooltip() { var tip=document.getElementById('ipaFeatureTooltip'); if(tip) tip.style.display='none'; }

  function audioEnabled() { return localStorage.getItem('ipaSoundsEnabled') !== '0'; }
  function playFile(slug) {
    if (!audioEnabled()) return false;
    var a = new Audio('addon/img/' + slug + '.mp3');
    a.onerror = function(){ if (window.speechSynthesis) speechSynthesis.cancel(); };
    a.play().catch(function(){});
    return true;
  }
  function speak(text) {
    if (!audioEnabled() || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.72; u.pitch = 1;
    speechSynthesis.speak(u);
  }
  function playExample(d) { if (!playFile('2exemple_' + d.slug)) speak(d.word); }

  function bind() {
    markNodes();
    var nodes = document.querySelectorAll('.ipa-feature');
    for (var i=0;i<nodes.length;i++) {
      (function(node){
        node.addEventListener('mouseenter', function(e){ showTooltip(node,e); });
        node.addEventListener('mousemove', function(e){ var tip=document.getElementById('ipaFeatureTooltip'); if(tip && tip.style.display!=='none') positionTooltip(tip,e); });
        node.addEventListener('mouseleave', hideTooltip);
        node.addEventListener('click', function(){ playFile(getData(node.getAttribute('data-ipa-symbol')).slug); });
      })(nodes[i]);
    }
    window.IPAFeatureData = DATA;
    window.IPAFeaturePlay = playFile;
    window.IPAFeatureSpeak = speak;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
})();
