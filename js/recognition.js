// ---- handwriting recognition: raster overlap + stroke-by-stroke matching against KanjiVG ----
const N=32,NS='http://www.w3.org/2000/svg',K=16;
const mk=()=>{const c=document.createElement('canvas');c.width=c.height=N;return c};
const grab=x=>{const d=x.getImageData(0,0,N,N).data,m=new Uint8Array(N*N);for(let i=0;i<N*N;i++)m[i]=d[i*4+3]>60?1:0;return m};
function dil(m,r=5){const o=new Uint8Array(N*N);for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(m[y*N+x])for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const a=x+i,b=y+j;if(a>=0&&b>=0&&a<N&&b<N)o[b*N+a]=1}return o}
const fit=(x0,y0,x1,y1)=>{const s=26/Math.max(x1-x0,y1-y0,1);return[s,(N-(x1-x0)*s)/2-x0*s,(N-(y1-y0)*s)/2-y0*s]};
function userFit(st){const P=st.flat(),xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);return fit(Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys))}
function userMask(st,[s,ox,oy]){const c=mk(),x=c.getContext('2d');x.lineWidth=2;x.lineCap=x.lineJoin='round';
 st.forEach(l=>{x.beginPath();l.forEach((p,i)=>x[i?'lineTo':'moveTo'](p[0]*s+ox,p[1]*s+oy));if(l.length<2)x.lineTo(l[0][0]*s+ox,l[0][1]*s+oy);x.stroke()});return grab(x)}
const SV=document.createElementNS(NS,'svg');SV.style.cssText='position:absolute;width:0;height:0';document.body.append(SV);
function res(l){const c=[0];for(let i=1;i<l.length;i++)c.push(c[i-1]+Math.hypot(l[i][0]-l[i-1][0],l[i][1]-l[i-1][1]));const L=c[c.length-1],o=[];let j=0;
 for(let k=0;k<K;k++){const t=L*k/(K-1);while(j<l.length-2&&c[j+1]<t)j++;const a=l[j],b=l[Math.min(j+1,l.length-1)],w=c[j+1]>c[j]?(t-c[j])/(c[j+1]-c[j]):0;o.push([a[0]+(b[0]-a[0])*w,a[1]+(b[1]-a[1])*w])}return o}
const TC={};
function tpl(ch){if(TC[ch])return TC[ch];const cs=[...ch],W=109*cs.length,it=[];cs.forEach((c,i)=>(KD[c]||[]).forEach(d=>it.push([new Path2D(d),109*i,d])));
 const big=document.createElement('canvas');big.width=W;big.height=109;const b=big.getContext('2d');b.lineWidth=3;
 it.forEach(([p,dx])=>{b.setTransform(1,0,0,1,dx,0);b.stroke(p)});
 const d=b.getImageData(0,0,W,109).data;let x0=W,y0=109,x1=0,y1=0;
 for(let y=0;y<109;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]>60){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}
 const [s,ox,oy]=fit(x0,y0,x1,y1),c=mk(),x=c.getContext('2d');x.lineWidth=2/s;x.lineCap=x.lineJoin='round';
 it.forEach(([p,dx])=>{x.setTransform(s,0,0,s,ox+dx*s,oy);x.stroke(p)});
 const S=it.map(([p,dx,d])=>{const e=document.createElementNS(NS,'path');e.setAttribute('d',d);SV.append(e);const L=e.getTotalLength(),o=[];for(let k=0;k<K;k++){const q=e.getPointAtLength(L*k/(K-1));o.push([(q.x+dx)*s+ox,q.y*s+oy])}e.remove();return o});
 const m=grab(x);return TC[ch]={m,d:dil(m),n:it.length,S}}
const cov=(a,b)=>{let n=0,h=0;for(let i=0;i<a.length;i++)if(a[i]){n++;if(b[i])h++}return n?h/n:0};

function sscore(us, ts) {
  if (us.length !== ts.length) return 0; 
  let tot = 0;
  us.forEach((a, i) => {
    const b = ts[i];
    let d = 0, e = 0;
    for (let k = 0; k < K; k++) {
      d += Math.hypot(a[k][0] - b[k][0], a[k][1] - b[k][1]);
      e += Math.hypot(a[K - 1 - k][0] - b[k][0], a[K - 1 - k][1] - b[k][1]);
    }
    tot += Math.min(d, e + 40) / K;
  });
  return Math.max(0, 1 - tot / us.length / 15);
}

function recog(st, cands) {
  const f = userFit(st), u = userMask(st, f), ud = dil(u, 5),
        us = st.map(l => res(l).map(p => [p[0]*f[0]+f[1], p[1]*f[0]+f[2]]));
  
  return cands.map(c => {
    const t = tpl(c);
    const r = (cov(u, t.d) + cov(t.m, ud)) / 2;
    let s = sscore(us, t.S);
    

    let finalScore;
    if (us.length !== t.n) {
      const diffPenalty = 0.03 * Math.abs(us.length - t.n);
      finalScore = Math.max(0, r * 0.85 - diffPenalty);
    } else {
      finalScore = 0.4 * r + 0.6 * s;
    }
    
    return [c, finalScore];
  }).sort((a, b) => b[1] - a[1]);
}

function recog(st,cands){const f=userFit(st),u=userMask(st,f),ud=dil(u),us=st.map(l=>res(l).map(p=>[p[0]*f[0]+f[1],p[1]*f[0]+f[2]]));
 return cands.map(c=>{const t=tpl(c),r=(cov(u,t.d)+cov(t.m,ud))/2,s=sscore(us,t.S);return[c,s==null?r-.06*Math.abs(st.length-t.n)-.03:.4*r+.6*s]}).sort((a,b)=>b[1]-a[1])}
function judge(st,cands,ans){const r=recog(st,cands);return{got:r[0][0],ok:r[0][0]===ans||(!!r[1]&&r[1][0]===ans&&r[0][1]-r[1][1]<.1)}}
