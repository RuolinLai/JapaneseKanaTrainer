function speak(t){
    try{speechSynthesis.cancel();
        const u=new SpeechSynthesisUtterance(t);
        u.lang='ja-JP';u.rate=.8;
        const ja=speechSynthesis.getVoices().filter(v=>v.lang.startsWith('ja'));
        const pref=['Nanami','Keita','Google 日本語','Kyoko','O-Ren'];
        const v=pref.map(n=>ja.find(x=>x.name.includes(n))).find(Boolean)||ja[0];
        if(v)u.voice=v;speechSynthesis.speak(u)}
    catch(e){}
}
