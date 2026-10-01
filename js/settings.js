// ---- tabs / shared quiz settings ----
$$('.seg button').forEach(b=>b.onclick=()=>{$$('.seg button').forEach(x=>x.classList.toggle('on',x===b));['table','q1','q2','mk'].forEach(id=>$('#'+id).hidden=id!==b.dataset.t);b.dataset.t==='q1'?next1():b.dataset.t==='q2'?next2():b.dataset.t==='mk'&&renderMk()});
const MODES=[['mix','Mixed'],['r>h','Romaji → Hiragana'],['r>k','Romaji → Katakana'],['k>h','Katakana → Hiragana'],['h>k','Hiragana → Katakana']];
const sel={'Basic':true,'Dakuten':false,'Combo':false};
$$('.settings').forEach(s=>{s.className='chips';s.innerHTML=`<select class="mode">${MODES.map(m=>`<option value="${m[0]}">${m[1]}</option>`).join('')}</select>`;
 Object.keys(D).forEach(g=>{const b=document.createElement('button');b.textContent=g;b.dataset.g=g;b.className=sel[g]?'on':'';b.onclick=()=>{sel[g]=!sel[g];if(!Object.values(sel).some(Boolean))sel[g]=true;$$('.chips [data-g]').forEach(x=>x.classList.toggle('on',sel[x.dataset.g]));q1on()?next1():next2()};s.append(b)})});
const q1on=()=>!$('#q1').hidden;
$$('.mode').forEach(s=>s.onchange=e=>{$$('.mode').forEach(x=>x.value=e.target.value);q1on()?next1():next2()});
const grp=()=>ALL.filter(e=>sel[e.g]);const pool=()=>{const p=weak?ALL.filter(e=>isWeak(MB[e.h])):[];return p.length?p:grp()};
function gen(){const m=$('.mode').value,md=m==='mix'?MODES[1+Math.floor(Math.random()*4)][0]:m,[f,t]=md.split('>'),p=pool();return{e:p[Math.floor(Math.random()*p.length)],f,t}}
const val=(e,x)=>x==='r'?e.r:x==='h'?e.h:e.k;
function prompt(el,q,h,verb){h.textContent=`${verb} the ${q.t==='h'?'hiragana':'katakana'}`;el.textContent=val(q.e,q.f)}
