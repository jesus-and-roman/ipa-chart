/**
 * addon/data.js
 *
 * Données statiques utilisées par addon/tooltip.js pour construire l'infobulle
 * qui apparaît au survol d'un symbole IPA dans les tableaux "Consonants
 * (Pulmonic)", "Consonants (Non-Pulmonic)" et "Vowels".
 *
 * Ce fichier ne dépend d'aucune image ni d'aucun son : il ne contient que du
 * texte (X-SAMPA, exemples de mots, informations de fallback pour les
 * symboles non-pulmoniques et les voyelles).
 *
 * Les images (addon/img/{SYMBOLE}.png) et les sons (addon/sounds/{SYMBOLE}.mp3)
 * sont gérés séparément : {SYMBOLE} est exactement le caractère IPA affiché
 * dans le tableau (ex. addon/img/ɘ.png, addon/sounds/ɘ.mp3).
 */

var IPAAddon = window.IPAAddon || {};

/**
 * Équivalents X-SAMPA. Clé = symbole IPA, valeur = notation X-SAMPA.
 */
IPAAddon.XSAMPA = {
	// Consonnes pulmoniques
	"p": "p", "b": "b", "t": "t", "d": "d", "ʈ": "t`", "ɖ": "d`",
	"c": "c", "ɟ": "J\\", "k": "k", "ɡ": "g", "q": "q", "ɢ": "G\\", "ʔ": "?",
	"m": "m", "ɱ": "F", "n": "n", "ɳ": "n`", "ɲ": "J", "ŋ": "N", "ɴ": "N\\",
	"ʙ": "B\\", "r": "r", "ʀ": "R\\",
	"ⱱ": "v\\", "ɾ": "4", "ɽ": "r`",
	"ɸ": "p\\", "β": "B", "f": "f", "v": "v", "θ": "T", "ð": "D",
	"s": "s", "z": "z", "ʃ": "S", "ʒ": "Z", "ʂ": "s`", "ʐ": "z`",
	"ç": "C", "ʝ": "j\\", "x": "x", "ɣ": "G", "χ": "X", "ʁ": "R",
	"ħ": "H\\", "ʕ": "?\\", "h": "h", "ɦ": "h\\",
	"ɬ": "K", "ɮ": "K\\",
	"ʋ": "P", "ɹ": "r\\", "ɻ": "r\\`", "j": "j", "ɰ": "M\\",
	"l": "l", "ɭ": "l`", "ʎ": "L", "ʟ": "L\\",

	// Consonnes non-pulmoniques
	"ʘ": "O\\", "ǀ": "|\\", "ǃ": "!\\", "ǂ": "=\\", "ǁ": "|\\|\\",
	"ɓ": "b_<", "ɗ": "d_<", "ʄ": "J\\_<", "ɠ": "g_<", "ʛ": "G\\_<",
	"ʼ": "_>",

	// Voyelles
	"i": "i", "y": "y", "ɨ": "i\\", "ʉ": "u\\", "ɯ": "M", "u": "u",
	"ɪ": "I", "ʏ": "Y", "ʊ": "U",
	"e": "e", "ø": "2", "ɘ": "@\\", "ɵ": "8", "ɤ": "7", "o": "o",
	"ə": "@",
	"ɛ": "E", "œ": "9", "ɜ": "3", "ɞ": "3\\", "ʌ": "V", "ɔ": "O",
	"æ": "{", "ɐ": "6",
	"a": "a", "ɶ": "&", "ɑ": "A", "ɒ": "Q"
};

/**
 * Exemples de mots par langue, avec transcription IPA du mot entier.
 * Ordre de priorité imposé : anglais ("en") > français ("fr") > espagnol ("es").
 * Un symbole absent de cet objet, ou absent des 3 langues, n'affichera
 * simplement pas de bloc "exemple" dans l'infobulle.
 */
IPAAddon.EXAMPLES = {
	"p": { en: ["pea", "piː"], fr: ["pain", "pɛ̃"], es: ["pan", "pan"] },
	"b": { en: ["boy", "bɔɪ"], fr: ["beau", "bo"], es: ["bueno", "ˈbweno"] },
	"t": { en: ["tea", "tiː"], fr: ["tasse", "tas"], es: ["taza", "ˈtasa"] },
	"d": { en: ["day", "deɪ"], fr: ["dame", "dam"], es: ["dedo", "ˈdeðo"] },
	"k": { en: ["cat", "kæt"], fr: ["carte", "kaʁt"], es: ["casa", "ˈkasa"] },
	"ɡ": { en: ["go", "ɡoʊ"], fr: ["gare", "ɡaʁ"], es: ["gato", "ˈɡato"] },
	"ʔ": { en: ["uh-oh", "ˈʌʔoʊ"] },
	"m": { en: ["man", "mæn"], fr: ["mère", "mɛʁ"], es: ["madre", "ˈmaðɾe"] },
	"ɱ": { en: ["comfort", "ˈkʌɱfət"] },
	"n": { en: ["no", "noʊ"], fr: ["non", "nɔ̃"], es: ["no", "no"] },
	"ɲ": { fr: ["agneau", "aɲo"], es: ["año", "ˈaɲo"] },
	"ŋ": { en: ["sing", "sɪŋ"] },
	"r": { es: ["perro", "ˈpero"] },
	"ɾ": { en: ["butter", "ˈbʌɾɚ"], es: ["pero", "ˈpeɾo"] },
	"β": { es: ["lobo", "ˈloβo"] },
	"f": { en: ["fish", "fɪʃ"], fr: ["feu", "fø"], es: ["flor", "floɾ"] },
	"v": { en: ["voice", "vɔɪs"], fr: ["vie", "vi"] },
	"θ": { en: ["think", "θɪŋk"] },
	"ð": { en: ["this", "ðɪs"] },
	"s": { en: ["see", "siː"], fr: ["sac", "sak"], es: ["sol", "sol"] },
	"z": { en: ["zoo", "zuː"], fr: ["zéro", "zeʁo"] },
	"ʃ": { en: ["sheep", "ˈʃiːp"], fr: ["chat", "ʃa"] },
	"ʒ": { en: ["measure", "ˈmɛʒɚ"], fr: ["jour", "ʒuʁ"] },
	"ʝ": { es: ["yo", "ˈʝo"] },
	"x": { es: ["jamón", "xaˈmon"] },
	"ɣ": { es: ["amigo", "aˈmiɣo"] },
	"ʁ": { fr: ["rouge", "ʁuʒ"] },
	"h": { en: ["hat", "hæt"] },
	"ɹ": { en: ["red", "ɹɛd"] },
	"j": { en: ["yes", "jɛs"], fr: ["yeux", "jø"] },
	"l": { en: ["light", "laɪt"], fr: ["lait", "lɛ"], es: ["luz", "lus"] },
	"ʎ": { es: ["llave", "ˈʎaβe"] },

	"i": { en: ["see", "siː"], fr: ["si", "si"], es: ["sí", "si"] },
	"y": { fr: ["tu", "ty"] },
	"u": { en: ["boot", "buːt"], fr: ["vous", "vu"], es: ["tú", "tu"] },
	"ɪ": { en: ["bit", "bɪt"] },
	"ʊ": { en: ["book", "bʊk"] },
	"e": { fr: ["été", "ete"], es: ["mesa", "ˈmesa"] },
	"ø": { fr: ["feu", "fø"] },
	"o": { fr: ["eau", "o"], es: ["sol", "sol"] },
	"ə": { en: ["about", "əˈbaʊt"], fr: ["le", "lə"] },
	"ɛ": { en: ["bed", "bɛd"], fr: ["père", "pɛʁ"] },
	"œ": { fr: ["sœur", "sœʁ"] },
	"ɜ": { en: ["bird", "bɜːd"] },
	"ʌ": { en: ["cup", "kʌp"] },
	"ɔ": { en: ["thought", "θɔːt"], fr: ["sport", "spɔʁ"] },
	"æ": { en: ["cat", "kæt"] },
	"a": { fr: ["la", "la"], es: ["casa", "ˈkasa"] },
	"ɑ": { en: ["father", "ˈfɑːðɚ"] },
	"ɒ": { en: ["hot", "hɒt"] }
};

/**
 * Descriptions pour les symboles de "Consonants (Non-Pulmonic)", qui ne sont
 * pas dans un tableau lignes/colonnes régulier comme les pulmoniques.
 */
IPAAddon.NON_PULMONIC_NAMES = {
	"ʘ": "Bilabial click",
	"ǀ": "Dental click",
	"ǃ": "Alveolar click",
	"ǂ": "Palatoalveolar click",
	"ǁ": "Alveolar lateral click",
	"ɓ": "Voiced bilabial implosive",
	"ɗ": "Voiced dental/alveolar implosive",
	"ʄ": "Voiced palatal implosive",
	"ɠ": "Voiced velar implosive",
	"ʛ": "Voiced uvular implosive",
	"ʼ": "Ejective"
};

/**
 * Infos de position pour les voyelles (le tableau des voyelles n'est pas
 * une grille HTML classique mais des <span> positionnés en %).
 */
IPAAddon.VOWEL_INFO = {
	"i": { height: "Close", back: "front", round: false },
	"y": { height: "Close", back: "front", round: true },
	"ɨ": { height: "Close", back: "central", round: false },
	"ʉ": { height: "Close", back: "central", round: true },
	"ɯ": { height: "Close", back: "back", round: false },
	"u": { height: "Close", back: "back", round: true },
	"ɪ": { height: "Near-close", back: "near-front", round: false },
	"ʏ": { height: "Near-close", back: "near-front", round: true },
	"ʊ": { height: "Near-close", back: "near-back", round: true },
	"e": { height: "Close-mid", back: "front", round: false },
	"ø": { height: "Close-mid", back: "front", round: true },
	"ɘ": { height: "Close-mid", back: "central", round: false },
	"ɵ": { height: "Close-mid", back: "central", round: true },
	"ɤ": { height: "Close-mid", back: "back", round: false },
	"o": { height: "Close-mid", back: "back", round: true },
	"ə": { height: "Mid", back: "central", round: false },
	"ɛ": { height: "Open-mid", back: "front", round: false },
	"œ": { height: "Open-mid", back: "front", round: true },
	"ɜ": { height: "Open-mid", back: "central", round: false },
	"ɞ": { height: "Open-mid", back: "central", round: true },
	"ʌ": { height: "Open-mid", back: "back", round: false },
	"ɔ": { height: "Open-mid", back: "back", round: true },
	"æ": { height: "Near-open", back: "front", round: false },
	"ɐ": { height: "Near-open", back: "central", round: false },
	"a": { height: "Open", back: "front", round: false },
	"ɶ": { height: "Open", back: "front", round: true },
	"ɑ": { height: "Open", back: "back", round: false },
	"ɒ": { height: "Open", back: "back", round: true }
};

/**
 * Cas particuliers où le nom "Voiceless/Voiced <place> <manner>" calculé
 * automatiquement ne correspond pas au titre réel de la page Wikipédia.
 */
IPAAddon.WIKI_NAME_OVERRIDES = {
	"ʔ": "Glottal stop"
};

window.IPAAddon = IPAAddon;
