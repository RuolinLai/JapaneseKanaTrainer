// ---- stroke order animation (KanjiVG) ----
function strokeSVG(str,anim=true){const cs=[...str];let gh='',st='',sn='';
 cs.forEach((c,i)=>(KD[c]||[]).forEach((d,j)=>{const m=d.match(/^M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/)||[0,0,0],t=`translate(${109*i})`;
  gh+=`<path class="gh" d="${d}" transform="${t}"/>`;st+=`<path class="st" pathLength="1" d="${d}" transform="${t}"/>`;sn+=`<text class="sn" x="${+m[1]+109*i-5}" y="${+m[2]-2}">${j+1}</text>`}));
 const box=document.createElement('div');box.innerHTML=`<svg class="sv" viewBox="0 0 ${109*cs.length} 109" style="max-width:${170*cs.length}px">${gh}${st}${sn}</svg>`;
 if(anim&&!matchMedia('(prefers-reduced-motion:reduce)').matches){box.querySelectorAll('.st').forEach((p,k)=>{p.style.strokeDasharray=1;p.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:650,delay:k*800,fill:'both',easing:'ease-in-out'})});
  box.querySelectorAll('.sn').forEach((p,k)=>p.animate([{opacity:0},{opacity:1}],{duration:200,delay:k*800,fill:'both'}))}
 return box.firstChild}
