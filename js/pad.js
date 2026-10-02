// ---- drawing pad (mouse / touch / pen) ----
function makePad(cv){const cx=cv.getContext('2d'),p={strokes:[],on:true};let cur=null;
 const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
 p.draw=()=>{cx.clearRect(0,0,cv.width,cv.height);cx.lineWidth=9;cx.lineCap=cx.lineJoin='round';cx.strokeStyle=getComputedStyle(document.body).color;
  p.strokes.forEach(l=>{cx.beginPath();l.forEach((q,i)=>cx[i?'lineTo':'moveTo'](...q));if(l.length<2)cx.lineTo(l[0][0]+.1,l[0][1]);cx.stroke()})};
 p.clear=()=>{p.strokes=[];cur=null;p.draw()};p.up=()=>{cur=null};
 cv.onpointerdown=e=>{if(!p.on)return;cv.setPointerCapture(e.pointerId);cur=[pt(e)];p.strokes.push(cur);p.draw()};
 cv.onpointermove=e=>{if(cur){cur.push(pt(e));p.draw()}};cv.onpointerup=()=>{cur=null};
 return p}