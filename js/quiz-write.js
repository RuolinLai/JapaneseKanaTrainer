// ---- quiz1: handwriting ----
let Q1,sc1=[0,0],submitted=false,LP=null;const cv=$('#cv'),QP=makePad(cv);
$('#clr').onclick=()=>{if(!submitted)QP.clear()};
function next1(){Q1=gen();QP.clear();QP.on=true;submitted=false;prompt($('#p1'),Q1,$('#h1'),'Write');$('#r1').textContent='';$('#r1').className='res';$('#a1').replaceChildren();$('#b1').hidden=false;$('#nx1').hidden=true;$('#s1').textContent=`Score ${sc1[0]} / ${sc1[1]}`}
$('#sub').onclick=()=>{if(!QP.strokes.length||submitted)return;submitted=true;QP.on=false;QP.up();const ans=val(Q1.e,Q1.t),cands=[...new Set(ALL.filter(e=>sel[e.g]||e===Q1.e).map(e=>val(e,Q1.t)))];
 const j=judge(QP.strokes,cands,ans),ok=j.ok;sc1[1]++;if(ok)sc1[0]++;rec(Q1.e,ok,j.got);
 $('#r1').className='res '+(ok?'ok':'bad');$('#r1').textContent=(ok?'Correct':'Not quite')+` · read as ${j.got}`+(ok?'':` · answer: ${ans}`);
 $('#a1').replaceChildren(strokeSVG(ans));$('#b1').hidden=true;$('#nx1').hidden=false;$('#s1').textContent=`Score ${sc1[0]} / ${sc1[1]}`;speak(Q1.e.h)};
$('#nx1').onclick=next1;
// trackpad mode: pointer lock turns the trackpad into a relative pen; Esc exits
$('#tp').onclick=()=>{try{cv.requestPointerLock()}catch(e){}};
document.addEventListener('pointerlockchange',()=>{const on=document.pointerLockElement===cv;QP.locked=on;LP=on?QP:null;QP.up();$('#tph').hidden=!on;QP.draw()});
let flip=1;document.addEventListener('mousemove',e=>LP&&LP.move(e));document.addEventListener('wheel',e=>{if(LP){e.preventDefault();LP.nudge(-e.deltaX*flip,-e.deltaY*flip)}},{passive:false});
document.addEventListener('keydown',e=>{if(!LP)return;if(e.key==='f'||e.key==='F')flip=-flip;else if(e.key==='Enter'){e.preventDefault();submitted?next1():$('#sub').click()}else if(e.key==='Backspace'&&!submitted)LP.clear()});
