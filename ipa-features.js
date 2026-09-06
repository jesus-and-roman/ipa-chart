/* IPA Chart interactive pronunciation / hover information.
 * Local assets are expected in addon/img/<slug>.png/.mp3 and
 * addon/img/2exemple_<slug>.mp3. Edit IPA_DATA to change slugs/examples.
 */
(function () {
  'use strict';

  var IPA_DATA = {
    'p': {name:'Voiceless bilabial plosive', xsampa:'p', slug:'p', wiki:'Voiceless bilabial plosive', lang:'English', word:'spin', transcription:'[spɪn]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'b': {name:'Voiced bilabial plosive', xsampa:'b', slug:'b', wiki:'Voiced bilabial plosive', lang:'English', word:'bin', transcription:'[bɪn]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    't': {name:'Voiceless alveolar plosive', xsampa:'t', slug:'t', wiki:'Voiceless alveolar plosive', lang:'English', word:'tea', transcription:'[tiː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'd': {name:'Voiced alveolar plosive', xsampa:'d', slug:'d', wiki:'Voiced alveolar plosive', lang:'English', word:'dee', transcription:'[diː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'k': {name:'Voiceless velar plosive', xsampa:'k', slug:'k', wiki:'Voiceless velar plosive', lang:'English', word:'key', transcription:'[kiː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɡ': {name:'Voiced velar plosive', xsampa:'g', slug:'g', wiki:'Voiced velar plosive', lang:'English', word:'go', transcription:'[ɡoʊ]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ʔ': {name:'Glottal stop', xsampa:'?', slug:'glottal-stop', wiki:'Glottal stop', lang:'English', word:'uh-oh', transcription:'[ʔʌʔoʊ]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'm': {name:'Bilabial nasal', xsampa:'m', slug:'m', wiki:'Bilabial nasal', lang:'English', word:'me', transcription:'[miː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'n': {name:'Alveolar nasal', xsampa:'n', slug:'n', wiki:'Alveolar nasal', lang:'English', word:'knee', transcription:'[niː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ŋ': {name:'Velar nasal', xsampa:'N', slug:'ng', wiki:'Voiced velar nasal', lang:'English', word:'sing', transcription:'[sɪŋ]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'f': {name:'Voiceless labiodental fricative', xsampa:'f', slug:'f', wiki:'Voiceless labiodental fricative', lang:'English', word:'fee', transcription:'[fiː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'v': {name:'Voiced labiodental fricative', xsampa:'v', slug:'v', wiki:'Voiced labiodental fricative', lang:'English', word:'vee', transcription:'[viː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    's': {name:'Voiceless alveolar fricative', xsampa:'s', slug:'s', wiki:'Voiceless alveolar fricative', lang:'English', word:'see', transcription:'[siː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'z': {name:'Voiced alveolar fricative', xsampa:'z', slug:'z', wiki:'Voiced alveolar fricative', lang:'English', word:'zee', transcription:'[ziː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ʃ': {name:'Voiceless postalveolar fricative', xsampa:'S', slug:'sh', wiki:'Voiceless postalveolar fricative', lang:'English', word:'sheep', transcription:'[ˈʃiːp]', wordLink:'https://en.wikipedia.org/wiki/English_orthography'},
    'ʒ': {name:'Voiced postalveolar fricative', xsampa:'Z', slug:'zh', wiki:'Voiced postalveolar fricative', lang:'English', word:'vision', transcription:'[ˈvɪʒən]', wordLink:'https://en.wikipedia.org/wiki/English_orthography'},
    'θ': {name:'Voiceless dental fricative', xsampa:'T', slug:'theta', wiki:'Voiceless dental fricative', lang:'English', word:'think', transcription:'[θɪŋk]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ð': {name:'Voiced dental fricative', xsampa:'D', slug:'eth', wiki:'Voiced dental fricative', lang:'English', word:'this', transcription:'[ðɪs]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'h': {name:'Voiceless glottal fricative', xsampa:'h', slug:'h', wiki:'Voiceless glottal fricative', lang:'English', word:'he', transcription:'[hiː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'l': {name:'Alveolar lateral approximant', xsampa:'l', slug:'l', wiki:'Voiced dental, alveolar and postalveolar lateral approximants', lang:'English', word:'lee', transcription:'[liː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɹ': {name:'Voiced alveolar approximant', xsampa:'r\\', slug:'r', wiki:'Voiced alveolar and postalveolar approximants', lang:'English', word:'red', transcription:'[ɹɛd]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'j': {name:'Palatal approximant', xsampa:'j', slug:'j', wiki:'Palatal approximant', lang:'English', word:'yes', transcription:'[jɛs]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'w': {name:'Voiced labial–velar approximant', xsampa:'w', slug:'w', wiki:'Voiced labial–velar approximant', lang:'English', word:'we', transcription:'[wiː]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'i': {name:'Close front unrounded vowel', xsampa:'i', slug:'i', wiki:'Close front unrounded vowel', lang:'English', word:'machine', transcription:'[məˈʃiːn]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'u': {name:'Close back rounded vowel', xsampa:'u', slug:'u', wiki:'Close back rounded vowel', lang:'English', word:'food', transcription:'[fuːd]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'e': {name:'Close-mid front unrounded vowel', xsampa:'e', slug:'e', wiki:'Close-mid front unrounded vowel', lang:'Spanish', word:'mesa', transcription:'[ˈmesa]', wordLink:'https://en.wikipedia.org/wiki/Spanish_phonology'},
    'o': {name:'Close-mid back rounded vowel', xsampa:'o', slug:'o', wiki:'Close-mid back rounded vowel', lang:'Spanish', word:'como', transcription:'[ˈkomo]', wordLink:'https://en.wikipedia.org/wiki/Spanish_phonology'},
    'ə': {name:'Mid central vowel', xsampa:'@', slug:'schwa', wiki:'Mid central vowel', lang:'English', word:'about', transcription:'[əˈbaʊt]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɛ': {name:'Open-mid front unrounded vowel', xsampa:'E', slug:'epsilon', wiki:'Open-mid front unrounded vowel', lang:'English', word:'bed', transcription:'[bɛd]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɔ': {name:'Open-mid back rounded vowel', xsampa:'O', slug:'open-o', wiki:'Open-mid back rounded vowel', lang:'English', word:'thought', transcription:'[θɔːt]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'æ': {name:'Near-open front unrounded vowel', xsampa:'{', slug:'ae', wiki:'Near-open front unrounded vowel', lang:'English', word:'cat', transcription:'[kæt]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ʌ': {name:'Open-mid back unrounded vowel', xsampa:'V', slug:'caret', wiki:'Open-mid back unrounded vowel', lang:'English', word:'strut', transcription:'[strʌt]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɑ': {name:'Open back unrounded vowel', xsampa:'A', slug:'alpha', wiki:'Open back unrounded vowel', lang:'English', word:'father', transcription:'[ˈfɑːðəɹ]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɒ': {name:'Open back rounded vowel', xsampa:'Q', slug:'turned-alpha', wiki:'Open back rounded vowel', lang:'English', word:'lot', transcription:'[lɒt]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ʈ': {name:'Voiceless retroflex plosive', xsampa:'t`', slug:'t-retroflex', wiki:'Voiceless retroflex plosive'},
    'ɖ': {name:'Voiced retroflex plosive', xsampa:'d`', slug:'d-retroflex', wiki:'Voiced retroflex plosive'},
    'ɟ': {name:'Voiced palatal plosive', xsampa:'J\\', slug:'j-stop', wiki:'Voiced palatal plosive'},
    'ɡ': {name:'Voiced velar plosive', xsampa:'g', slug:'g', wiki:'Voiced velar plosive', lang:'English', word:'go', transcription:'[ɡoʊ]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ɢ': {name:'Voiced uvular plosive', xsampa:'G\\', slug:'g-uvular', wiki:'Voiced uvular plosive'},
    'ʔ': {name:'Glottal stop', xsampa:'?', slug:'glottal-stop', wiki:'Glottal stop', lang:'English', word:'uh-oh', transcription:'[ʔʌʔoʊ]', wordLink:'https://en.wikipedia.org/wiki/English_phonology'},
    'ʘ': {name:'Bilabial click', xsampa:'O\\', slug:'bilabial-click', wiki:'Bilabial click'},
    'ǀ': {name:'Dental click', xsampa:'|\\', slug:'dental-click', wiki:'Dental click'},
    'ǃ': {name:'Postalveolar click', xsampa:'!\\', slug:'postalveolar-click', wiki:'Postalveolar click'},
    'ǂ': {name:'Palatal click', xsampa:'=\\', slug:'palatal-click', wiki:'Palatal click'},
    'ǁ': {name:'Alveolar lateral click', xsampa:'||\\', slug:'alveolar-lateral-click', wiki:'Alveolar lateral click'},
    'ɓ': {name:'Voiced bilabial implosive', xsampa:'b_<', slug:'bilabial-implosive', wiki:'Voiced bilabial implosive'},
    'ɗ': {name:'Voiced dental/alveolar implosive', xsampa:'d_<', slug:'dental-implosive', wiki:'Voiced dental/alveolar implosive'},
    'ʄ': {name:'Voiced palatal implosive', xsampa:'J\_<', slug:'palatal-implosive', wiki:'Voiced palatal implosive'},
    'ɠ': {name:'Voiced velar implosive', xsampa:'g_<', slug:'velar-implosive', wiki:'Voiced velar implosive'},
    'ʛ': {name:'Voiced uvular implosive', xsampa:'G\_<', slug:'uvular-implosive', wiki:'Voiced uvular implosive'}
  };

  function esc(s){return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function slugifySymbol(symbol){
    if(IPA_DATA[symbol]) return IPA_DATA[symbol].slug;
    return symbol.normalize ? symbol.normalize('NFKD').replace(/[\u0300-\u036f]/g,'') : symbol;
  }
  function infoFor(symbol, el){
    var d=IPA_DATA[symbol];
    if(!d) d={name:(el.getAttribute('title')||'IPA symbol').replace(/^U\+[0-9A-F]+:\s*/i,''),xsampa:'',slug:slugifySymbol(symbol),wiki:symbol};
    return d;
  }
  function localAudio(d){return 'addon/img/'+encodeURIComponent(d.slug)+'.mp3';}
  function exampleAudio(d){return 'addon/img/2exemple_'+encodeURIComponent(d.slug)+'.mp3';}

  var tip, audio, soundEnabled=true, robotEnabled=true;
  function ensureUI(){
    if(!tip){
      tip=document.createElement('div'); tip.id='ipaInfoCard'; tip.setAttribute('role','tooltip'); tip.style.display='none'; document.body.appendChild(tip);
      audio=document.createElement('audio'); audio.id='ipaLocalAudio'; audio.preload='none'; document.body.appendChild(audio);
    }
  }
  function playFile(url, fallbackText){
    if(!soundEnabled) return;
    ensureUI(); audio.pause(); audio.src=url; audio.currentTime=0;
    var p=audio.play();
    if(p && p.catch) p.catch(function(){ if(robotEnabled && fallbackText) speak(fallbackText); });
  }
  function speak(text){
    if(!soundEnabled || !robotEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(text); u.lang='en-US'; window.speechSynthesis.speak(u);
  }
  function playSymbol(symbol,d){
    playFile(localAudio(d), symbol);
    setTimeout(function(){
      if(!soundEnabled || !robotEnabled || !window.speechSynthesis) return;
      if(audio.error) speak(symbol);
    },180);
  }
  function exampleRow(d){
    if(!d.word) return '<div class="ipaNoExample">No example configured yet. Add one in <code>IPA_DATA</code>.</div>';
    var audioId='ipa-example-'+Math.random().toString(36).slice(2);
    return '<table class="ipaExampleTable"><tbody><tr><td><a href="https://en.wikipedia.org/wiki/'+encodeURIComponent(d.lang||'English_language').replace(/%20/g,'_')+'" target="_blank" rel="noopener">'+esc(d.lang||'English')+'</a></td><td>'+esc(d.word)+'</td><td><button type="button" class="ipaExamplePlay" data-audio="'+esc(exampleAudio(d))+'" data-text="'+esc(d.word)+'" aria-label="Play example">'+esc(d.transcription||'▶')+'</button></td></tr></tbody></table>';
  }
  function show(symbol,el,x,y){
    ensureUI(); var d=infoFor(symbol,el);
    var wiki='https://en.wikipedia.org/wiki/'+encodeURIComponent(d.wiki||d.name).replace(/%20/g,'_');
    tip.innerHTML='<div class="ipaCardTitle">'+esc(d.name)+'</div>'+
      '<div class="ipaCardSymbol" title="Click to copy">'+esc(symbol)+'</div>'+ 
      '<div class="ipaCardLine"><strong>X-SAMPA:</strong> <code>'+esc(d.xsampa||'—')+'</code></div>'+ 
      '<div class="ipaCardLine"><a target="_blank" rel="noopener" href="'+wiki+'">Wikipedia (English)</a></div>'+exampleRow(d);
    tip.style.display='block'; position(x,y);
    tip.querySelectorAll('.ipaExamplePlay').forEach(function(btn){btn.addEventListener('click',function(e){e.stopPropagation();playFile(this.getAttribute('data-audio'),this.getAttribute('data-text'));});});
  }
  function position(x,y){
    var gap=14, left=x+gap, top=y+gap, r=tip.getBoundingClientRect();
    if(left+r.width>window.innerWidth-8) left=Math.max(8,x-r.width-gap);
    if(top+r.height>window.innerHeight-8) top=Math.max(8,y-r.height-gap);
    tip.style.left=left+'px'; tip.style.top=top+'px';
  }
  function hide(){if(tip) tip.style.display='none';}

  function enhance(el){
    if(el.dataset.ipaEnhanced) return;
    var symbol=(el.textContent||'').replace(/[\s\u25CC]/g,''); if(!symbol) return;
    var parent=el.closest('#pulmonicConsonants,#nonPulmonicConsonants,#vowels'); if(!parent) return;
    el.dataset.ipaEnhanced='1'; el.dataset.ipaSymbol=symbol; var d=infoFor(symbol,el);
    el.classList.add('ipaInteractive'); el.setAttribute('data-ipa-slug',d.slug); el.setAttribute('tabindex','0');
    el.addEventListener('mouseenter',function(e){show(symbol,el,e.clientX,e.clientY);});
    el.addEventListener('mousemove',function(e){if(tip&&tip.style.display!=='none') position(e.clientX,e.clientY);});
    el.addEventListener('mouseleave',hide);
    el.addEventListener('focus',function(){var r=el.getBoundingClientRect();show(symbol,el,r.right,r.top);});
    el.addEventListener('blur',hide);
    el.addEventListener('click',function(e){e.preventDefault();e.stopPropagation(); playSymbol(symbol,d); copySymbol(symbol);});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();playSymbol(symbol,d);copySymbol(symbol);}});
  }
  function copySymbol(symbol){if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(symbol).catch(function(){});}
  function enhanceAll(){
    document.querySelectorAll('#pulmonicConsonants span,#pulmonicConsonants td,#nonPulmonicConsonants td,#vowels span').forEach(enhance);
  }
  function addSoundControls(){
    var host=document.getElementById('soundControls'); if(host) return;
    host=document.createElement('div'); host.id='soundControls'; host.innerHTML='<label><input id="ipaSoundsToggle" type="checkbox" checked> Jouer les sons IPA</label> <label><input id="ipaRobotToggle" type="checkbox" checked> Robot si le MP3 est absent</label> <button type="button" id="ipaStopSound">Désactiver les sons</button>';
    var intro=document.getElementById('chartIntro'); if(intro) intro.parentNode.insertBefore(host,intro.nextSibling); else document.body.insertBefore(host,document.body.firstChild);
    document.getElementById('ipaSoundsToggle').addEventListener('change',function(){soundEnabled=this.checked;if(!soundEnabled&&window.speechSynthesis)window.speechSynthesis.cancel();});
    document.getElementById('ipaRobotToggle').addEventListener('change',function(){robotEnabled=this.checked;});
    document.getElementById('ipaStopSound').addEventListener('click',function(){soundEnabled=false;document.getElementById('ipaSoundsToggle').checked=false;if(audio)audio.pause();if(window.speechSynthesis)window.speechSynthesis.cancel();});
  }
  function init(){ensureUI();enhanceAll();addSoundControls();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.addEventListener('message',function(e){if(!e.data)return;if(e.data.type==='ipa-stop-sound'){soundEnabled=false;if(audio)audio.pause();if(window.speechSynthesis)window.speechSynthesis.cancel();}if(e.data.type==='ipa-play'&&e.data.symbol){var d=infoFor(e.data.symbol,{getAttribute:function(){return ''}});playSymbol(e.data.symbol,d);}});
  window.IPAInteractive={data:IPA_DATA,enhance:enhanceAll,playSymbol:function(symbol){var d=infoFor(symbol,{getAttribute:function(){return ''}});playSymbol(symbol,d);},setSoundEnabled:function(v){soundEnabled=!!v;}};
})();
