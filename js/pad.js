// ---- drawing pad (mouse / touch / pen, plus trackpad mode via Pointer Lock) ----
function makePad(cv){const cx=cv.getContext('2d'),p={strokes:[],locked:false,on:true,pos:[cv.width/2,cv.height/2]};let cur=null;
 const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]};
 p.draw=()=>{cx.clearRect(0,0,cv.width,cv.height);cx.lineWidth=9;cx.lineCap=cx.lineJoin='round';cx.strokeStyle=getComputedStyle(document.body).color;
  p.strokes.forEach(l=>{cx.beginPath();l.forEach((q,i)=>cx[i?'lineTo':'moveTo'](...q));if(l.length<2)cx.lineTo(l[0][0]+.1,l[0][1]);cx.stroke()});
  if(p.locked){const rc=getComputedStyle(document.body).getPropertyValue('--red')||'red';cx.fillStyle=cx.strokeStyle=rc;cx.lineWidth=3;cx.beginPath();cx.arc(p.pos[0],p.pos[1],7,0,7);cur?cx.fill():cx.stroke()}};
 p.clear=()=>{p.strokes=[];cur=null;p.draw()};p.up=()=>{clearTimeout(tm);cur=null};
 cv.onpointerdown=e=>{if(!p.on||p.locked)return;cv.setPointerCapture(e.pointerId);cur=[pt(e)];p.strokes.push(cur);p.draw()};
 cv.onpointermove=e=>{if(cur&&!p.locked){cur.push(pt(e));p.draw()}};cv.onpointerup=()=>{if(!p.locked)cur=null};
 let tm=0;const aim=(dx,dy)=>{const r=cv.getBoundingClientRect(),k=1.4*cv.width/r.width;p.pos=[Math.max(0,Math.min(cv.width,p.pos[0]+dx*k)),Math.max(0,Math.min(cv.height,p.pos[1]+dy*k))]};
 const len=l=>l.reduce((s,q,i)=>i?s+Math.hypot(q[0]-l[i-1][0],q[1]-l[i-1][1]):0,0);
 const lift=()=>{if(cur&&len(cur)<5)p.strokes.splice(p.strokes.indexOf(cur),1);cur=null;p.draw()};
 p.move=e=>{if(!p.on)return;if(!cur){cur=[[...p.pos]];p.strokes.push(cur)}aim(e.movementX,e.movementY);cur.push([...p.pos]);clearTimeout(tm);tm=setTimeout(lift,170);p.draw()};
 p.nudge=(dx,dy)=>{if(!p.on)return;clearTimeout(tm);lift();aim(dx,dy);p.draw()};
 return p}
