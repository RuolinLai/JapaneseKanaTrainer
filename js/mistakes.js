// ---- mistake book (saved in this browser via localStorage) ----
let MB={},weak=false;try{MB=JSON.parse(localStorage.getItem('kanaMB')||'{}')}catch(e){}
const saveMB=()=>{try{localStorage.setItem('kanaMB',JSON.stringify(MB))}catch(e){}};
const isWeak=m=>m&&m.w>0&&(m.s||0)<3;
function rec(e,ok,got){const m=MB[e.h]||(MB[e.h]={w:0,r:0,s:0,c:{}});if(ok){m.r++;m.s=(m.s||0)+1}else{m.w++;m.s=0;m.t=Date.now();if(got)m.c[got]=(m.c[got]||0)+1}saveMB()}
function setWeak(v){weak=v&&ALL.some(e=>isWeak(MB[e.h]));$$('[data-w]').forEach(b=>b.classList.toggle('on',weak));if(!$('#q1').hidden)next1();else if(!$('#q2').hidden)next2()}
$$('select.mode').forEach(m=>{const b=document.createElement('button');b.textContent='Mistakes only';b.dataset.w=1;b.onclick=()=>setWeak(!weak);m.parentNode.append(b)});
function renderMk(){const L=ALL.filter(e=>isWeak(MB[e.h])).map(e=>[e,MB[e.h]]).sort((a,b)=>b[1].w-a[1].w||b[1].t-a[1].t);
 $('#ms').textContent=L.length?`${L.length} kana to review. A kana leaves this list after 3 correct answers in a row.`:'No mistakes to review. Wrong answers in the quizzes will show up here.';
 $('#ml').replaceChildren(...L.map(([e,m])=>{const d=document.createElement('button'),c=Object.entries(m.c).sort((a,b)=>b[1]-a[1])[0];d.className='mrow';
  d.innerHTML=`<b>${e.h} ${e.k}</b><span>${e.r}${c?` · mixed up with ${c[0]}`:''}</span><em>${m.w} wrong<small>${Math.round(100*m.r/(m.r+m.w))}% correct</small></em>`;d.onclick=()=>openD(e);return d}));
 [$('#mp1'),$('#mp2')].forEach(b=>b.hidden=!L.length);$('#mc').hidden=!Object.keys(MB).length}
const go=i=>{setWeak(true);$$('.seg button')[i].click()};$('#mp1').onclick=()=>go(1);$('#mp2').onclick=()=>go(2);
$('#mc').onclick=()=>{if(confirm('Clear all mistake records?')){MB={};saveMB();weak=false;renderMk()}};
