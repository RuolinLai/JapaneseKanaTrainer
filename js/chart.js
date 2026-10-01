// ---- table + dialog ----
let cur=null,scr='h';
function showG(g){$$('#gt button').forEach(b=>b.classList.toggle('on',b.textContent===g));const t=$('#tg');t.style.gridTemplateColumns=`repeat(${D[g].w},1fr)`;t.innerHTML='';
 D[g].rows.flat().forEach(e=>{const b=document.createElement('button');if(!e){b.className='cell gap';t.append(b);return}
  b.className='cell';b.innerHTML=`<b>${e.h}</b><span>${e.k}</span><i>${e.r}</i>`;b.onclick=()=>openD(e);t.append(b)})}
Object.keys(D).forEach(g=>{const b=document.createElement('button');b.textContent=g;b.onclick=()=>showG(g);$('#gt').append(b)});showG('Basic');
function drawD(){tryMode(false);$('#dh').classList.toggle('on',scr==='h');$('#dk').classList.toggle('on',scr==='k');$('#dt').textContent=`${cur.h}  ${cur.k}  ${cur.r}`;
 $('#dsv').replaceChildren(strokeSVG(scr==='h'?cur.h:cur.k));}
function openD(e){cur=e;$('#dlg').showModal();drawD();speak(e.h)}
$('#dh').onclick=()=>{scr='h';drawD()};$('#dk').onclick=()=>{scr='k';drawD()};$('#rp').onclick=drawD;$('#pl').onclick=()=>speak(cur.h);$('#dx').onclick=()=>$('#dlg').close();
$('#dlg').onclick=e=>{if(e.target===$('#dlg'))$('#dlg').close()};
