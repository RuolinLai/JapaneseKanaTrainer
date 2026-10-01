const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const kata=h=>[...h].map(c=>String.fromCharCode(c.charCodeAt(0)+96)).join('');
const DEF={
'Basic':[5,"あいうえお|かきくけこ|さしすせそ|たちつてと|なにぬねの|はひふへほ|まみむめも|や-ゆ-よ|らりるれろ|わ---を|ん----","a i u e o|ka ki ku ke ko|sa shi su se so|ta chi tsu te to|na ni nu ne no|ha hi fu he ho|ma mi mu me mo|ya - yu - yo|ra ri ru re ro|wa - - - wo|n - - - -"],
'Dakuten':[5,"がぎぐげご|ざじずぜぞ|だぢづでど|ばびぶべぼ|ぱぴぷぺぽ","ga gi gu ge go|za ji zu ze zo|da di du de do|ba bi bu be bo|pa pi pu pe po"],
'Combo':[3,"きゃ きゅ きょ|しゃ しゅ しょ|ちゃ ちゅ ちょ|にゃ にゅ にょ|ひゃ ひゅ ひょ|みゃ みゅ みょ|りゃ りゅ りょ|ぎゃ ぎゅ ぎょ|じゃ じゅ じょ|びゃ びゅ びょ|ぴゃ ぴゅ ぴょ","kya kyu kyo|sha shu sho|cha chu cho|nya nyu nyo|hya hyu hyo|mya myu myo|rya ryu ryo|gya gyu gyo|ja ju jo|bya byu byo|pya pyu pyo"]};
const D={};
for(const g in DEF){const [w,H,R]=DEF[g],hs=H.split('|'),rs=R.split('|'),sp=g==='Combo'?s=>s.split(' '):s=>[...s];
 D[g]={w,rows:hs.map((row,i)=>{const r=rs[i].split(' ');return sp(row).map((h,j)=>h==='-'?null:{h,k:kata(h),r:r[j],g})})}}
const ALL=Object.values(D).flatMap(x=>x.rows.flat().filter(Boolean));
