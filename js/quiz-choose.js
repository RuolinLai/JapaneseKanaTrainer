// ---- quiz2: multiple choice ----
let Q2,sc2=[0,0],done=false;
function next2(){Q2=gen();done=false;prompt($('#p2'),Q2,$('#h2'),'Pick');$('#nx2').hidden=true;
 const ans=val(Q2.e,Q2.t),p=ALL.filter(e=>sel[e.g]||e===Q2.e),all=new Set(p.map(e=>val(e,Q2.t))),set=new Set([ans]);let n=0;
 while(set.size<Math.min(4,all.size)&&n++<300)set.add(val(p[Math.floor(Math.random()*p.length)],Q2.t));
 $('#o2').innerHTML='';[...set].sort(()=>Math.random()-.5).forEach(x=>{const b=document.createElement('button');b.textContent=x;
  b.onclick=()=>{if(done)return;done=true;sc2[1]++;rec(Q2.e,x===ans,x);if(x===ans){sc2[0]++;b.classList.add('right')}else{b.classList.add('wrong');$$('#o2 button').forEach(y=>y.textContent===ans&&y.classList.add('right'))}
   $('#s2').textContent=`${Q2.e.h} ${Q2.e.k} ${Q2.e.r} · Score ${sc2[0]} / ${sc2[1]}`;speak(Q2.e.h);$('#nx2').hidden=false};$('#o2').append(b)});
 $('#s2').textContent=`Score ${sc2[0]} / ${sc2[1]}`}
$('#nx2').onclick=next2;
