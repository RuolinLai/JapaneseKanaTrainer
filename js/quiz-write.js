let Q1, sc1 = [0, 0], submitted = false;
const cv = $('#cv'), QP = makePad(cv);

$('#clr').onclick = () => { if (!submitted) QP.clear(); };

function next1() {
  Q1 = gen();
  QP.clear();
  QP.on = true;
  submitted = false;
  prompt($('#p1'), Q1, $('#h1'), 'Write');
  $('#r1').textContent = '';
  $('#r1').className = 'res';
  $('#a1').replaceChildren();
  $('#b1').hidden = false;
  $('#nx1').hidden = true;
  $('#s1').textContent = `Score ${sc1[0]} / ${sc1[1]}`;
}

$('#sub').onclick = () => {
  if (!QP.strokes.length || submitted) return;
  submitted = true;
  QP.on = false;
  const ans = val(Q1.e, Q1.t), 
        cands = [...new Set(ALL.filter(e => sel[e.g] || e === Q1.e).map(e => val(e, Q1.t)))];
  
  const j = judge(QP.strokes, cands, ans), ok = j.ok;
  sc1[1]++; 
  if (ok) sc1[0]++;
  rec(Q1.e, ok, j.got);
  
  $('#r1').className = 'res ' + (ok ? 'ok' : 'bad');
  $('#r1').textContent = (ok ? 'Correct' : 'Not quite') + ` · read as ${j.got}` + (ok ? '' : ` · answer: ${ans}`);
  $('#a1').replaceChildren(strokeSVG(ans));
  $('#b1').hidden = true;
  $('#nx1').hidden = false;
  $('#s1').textContent = `Score ${sc1[0]} / ${sc1[1]}`;
  speak(Q1.e.h);
};

$('#nx1').onclick = next1;


window.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
    e.preventDefault();
    if (submitted) {
      next1();
    } else if (!$('#sub').hidden) {
      $('#sub').click();
    }
  } else if (e.key === 'Backspace' && !submitted) {
    QP.clear();
  }
});