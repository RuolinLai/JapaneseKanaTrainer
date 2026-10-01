// ---- try writing inside the kana dialog ----
const TP=makePad($('#tcv'));
function tryMode(on){$('#tw').hidden=!on;$('#dsv').hidden=on;$('#tres').textContent='';$('#tres').className='res';TP.on=true;TP.clear();$('#try').textContent=on?'Hide canvas':'Try writing'}
$('#try').onclick=()=>tryMode($('#tw').hidden);
$('#tclr').onclick=()=>{TP.on=true;TP.clear();$('#tres').textContent='';$('#tres').className='res';$('#dsv').hidden=true};
function dist(st,cands){const r=recog(st,cands),mx=r[0][1],w=r.map(x=>Math.exp((x[1]-mx)/.05)),z=w.reduce((a,b)=>a+b,0);return r.map((x,i)=>[x[0],100*w[i]/z])}
$('#tchk').onclick=()=>{if(!TP.strokes.length)return;const ans=scr==='h'?cur.h:cur.k,cands=[...new Set(ALL.filter(e=>e.g===cur.g).map(e=>scr==='h'?e.h:e.k))],j=judge(TP.strokes,cands,ans),d=dist(TP.strokes,cands),top=d.filter(x=>x[1]>=2).slice(0,3),me=d.find(x=>x[0]===ans);
 $('#tres').className='res '+(j.ok?'ok':'bad');$('#tres').textContent=(j.ok?'Correct':'Not quite')+' · looks like '+top.map(x=>`${Math.round(x[1])}% ${x[0]}`).join(', ')+(top.some(x=>x[0]===ans)?'':` (${ans}: ${Math.round(me[1])}%)`);TP.on=false;$('#dsv').hidden=false};
