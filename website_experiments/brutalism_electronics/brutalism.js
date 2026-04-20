/* ─────────────────────────────────────
   CURSOR
───────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mx=0,my=0;
document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
(function animC(){
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
  cursorDot.style.left=mx+'px'; cursorDot.style.top=my+'px';
  requestAnimationFrame(animC);
})();
document.querySelectorAll('button,.g-cell,.p-card,.n-stat').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('big'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('big'));
});

/* ─────────────────────────────────────
   WIRE BACKGROUND
───────────────────────────────────── */
(function(){
  const c=document.getElementById('wire-bg');
  const ctx=c.getContext('2d');
  let W,H;
  const wires=[];
  function resize(){ W=c.width=window.innerWidth; H=c.height=window.innerHeight; }
  function buildWires(){
    wires.length=0;
    for(let i=0;i<20;i++){
      let x=Math.random()*W, y=Math.random()*H;
      const pts=[{x,y}];
      for(let s=0;s<4+Math.floor(Math.random()*4);s++){
        const horiz=Math.random()<0.5;
        const len=50+Math.random()*250;
        if(horiz) x+=(Math.random()<0.5?1:-1)*len;
        else y+=(Math.random()<0.5?1:-1)*len;
        pts.push({x,y});
      }
      wires.push({pts,a:0.05+Math.random()*0.1});
    }
  }
  resize(); buildWires();
  window.addEventListener('resize',()=>{ resize(); buildWires(); });

  const pulses=[];
  setInterval(()=>{
    const w=wires[Math.floor(Math.random()*wires.length)];
    if(w) pulses.push({w,t:0,sp:0.006+Math.random()*0.012});
  },500);

  function lerp(a,b,t){return a+(b-a)*t;}
  function getPos(w,t){
    const tot=w.pts.length-1;
    const seg=Math.min(Math.floor(t*tot),tot-1);
    const st=t*tot-seg;
    const a=w.pts[seg],b=w.pts[seg+1];
    return{x:lerp(a.x,b.x,st),y:lerp(a.y,b.y,st)};
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    wires.forEach(w=>{
      ctx.beginPath();
      ctx.moveTo(w.pts[0].x,w.pts[0].y);
      w.pts.forEach((p,i)=>{ if(i>0) ctx.lineTo(p.x,p.y); });
      ctx.strokeStyle=`rgba(200,195,185,${w.a})`;
      ctx.lineWidth=1; ctx.stroke();
      w.pts.forEach((p,i)=>{
        if(i>0&&i<w.pts.length-1){
          ctx.beginPath(); ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
          ctx.fillStyle=`rgba(200,195,185,${w.a*2})`; ctx.fill();
        }
      });
    });
    for(let i=pulses.length-1;i>=0;i--){
      const p=pulses[i]; p.t+=p.sp;
      if(p.t>=1){pulses.splice(i,1);continue;}
      const pos=getPos(p.w,p.t);
      const g=ctx.createRadialGradient(pos.x,pos.y,0,pos.x,pos.y,14);
      g.addColorStop(0,'rgba(255,34,0,0.9)');
      g.addColorStop(0.4,'rgba(255,34,0,0.3)');
      g.addColorStop(1,'rgba(255,34,0,0)');
      ctx.beginPath(); ctx.arc(pos.x,pos.y,14,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x,pos.y,3,0,Math.PI*2);
      ctx.fillStyle='#ff4422'; ctx.fill();
      const tp=getPos(p.w,Math.max(0,p.t-0.07));
      ctx.beginPath(); ctx.moveTo(tp.x,tp.y); ctx.lineTo(pos.x,pos.y);
      ctx.strokeStyle='rgba(255,60,0,0.5)'; ctx.lineWidth=2; ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─────────────────────────────────────
   RESISTOR STRIP BUILDER
───────────────────────────────────── */
function buildStrip(el,count){
  const W=56,H=24;
  const COLS=['#1a1a1a','#8b4513','#cc1100','#f5a623','#c8a400','#1a5e1a','#0044cc','#8b008b','#888','#f0ece4'];
  let svg='';
  for(let i=0;i<count;i++){
    const x=i*(W+6);
    const c1=COLS[Math.floor(Math.random()*COLS.length)];
    const c2=COLS[Math.floor(Math.random()*COLS.length)];
    const c3=COLS[Math.floor(Math.random()*COLS.length)];
    svg+=`<g transform="translate(${x},0)">
      <line x1="0" y1="${H/2}" x2="${W*0.18}" y2="${H/2}" stroke="#aaa" stroke-width="1.5"/>
      <line x1="${W*0.82}" y1="${H/2}" x2="${W}" y2="${H/2}" stroke="#aaa" stroke-width="1.5"/>
      <rect x="${W*0.18}" y="${H*0.1}" width="${W*0.64}" height="${H*0.8}" rx="3.5" fill="#c8b89a" stroke="#8a7a60" stroke-width="0.7"/>
      <rect x="${W*0.29}" y="${H*0.1}" width="3" height="${H*0.8}" fill="${c1}"/>
      <rect x="${W*0.41}" y="${H*0.1}" width="3" height="${H*0.8}" fill="${c2}"/>
      <rect x="${W*0.53}" y="${H*0.1}" width="3" height="${H*0.8}" fill="${c3}"/>
      <rect x="${W*0.67}" y="${H*0.1}" width="2.5" height="${H*0.8}" fill="#c8a400"/>
      <rect x="${W*0.18}" y="${H*0.1}" width="${W*0.64}" height="${H*0.22}" rx="3" fill="rgba(255,255,255,0.1)"/>
    </g>`;
  }
  const tot=count*(W+6);
  el.innerHTML=`<svg width="${tot}" height="${H}" viewBox="0 0 ${tot} ${H}" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
}

buildStrip(document.getElementById('hero-strip'), Math.max(4, Math.floor(window.innerWidth/65)));
buildStrip(document.getElementById('foot-strip'), 8);

/* ─────────────────────────────────────
   MARQUEE
───────────────────────────────────── */
const ITEMS=['SCHEMA_CAPTURE','FLOW_ANALYSIS','SYSTEM_MAPPING','NETWORK_CONGESTION',
  'CHAOS_BAY','COMPONENT_BRUTALISM','PHASE_1_INIT','DECONSTRUCTION_JUNCTION',
  'SYSTEM_CORE','ARDUINO_PARTS','KINETIC_COMPONENTS','BRUTALIST_ASSET',
  'FINAL_ABSTRACT','SYSTEM_BACK','GRAPHIC_ASSETS','COMPONENT_DECONSTRUCTION'];
const ti=document.getElementById('tape-inner');
ti.innerHTML=[...ITEMS,...ITEMS].map(t=>`<span>// ${t}</span>`).join('');

/* ─────────────────────────────────────
   GALLERY
───────────────────────────────────── */
const ASSETS=[
  {file:'deconstruction_junction',label:'DECONSTRUCTION_JUNCTION',tag:'SCHEMATIC'},
  {file:'chaos_bay',label:'CHAOS_BAY',tag:'ASSEMBLY'},
  {file:'component_brutalism',label:'COMPONENT_BRUTALISM',tag:'COMPONENT'},
  {file:'component_deconstruction',label:'COMPONENT_DECONSTRUCTION',tag:'COMPONENT'},
  {file:'flow_analysis',label:'FLOW_ANALYSIS',tag:'SIGNAL'},
  {file:'system_back',label:'SYSTEM_BACK',tag:'SYSTEM'},
  {file:'system_core',label:'SYSTEM_CORE',tag:'SYSTEM'},
  {file:'phase_1',label:'PHASE_1',tag:'INIT'},
  {file:'final_abstract',label:'FINAL_ABSTRACT',tag:'FINAL'},
  {file:'schema',label:'SCHEMA',tag:'SCHEMATIC'},
  {file:'system_mapping',label:'SYSTEM_MAPPING',tag:'MAPPING'},
  {file:'network_conjestion',label:'NETWORK_CONGESTION',tag:'NETWORK'},
  {file:'graphic assets',label:'GRAPHIC_ASSETS',tag:'DESIGN'},
  {file:'arduino_parts',label:'ARDUINO_PARTS',tag:'HARDWARE'},
  {file:'brutalist_asset',label:'BRUTALIST_ASSET',tag:'DESIGN'},
  {file:'kinetic_componenets',label:'KINETIC_COMPONENTS',tag:'KINETIC'},
];

const gg=document.getElementById('gallery-grid');
ASSETS.forEach(a=>{
  const cell=document.createElement('div');
  cell.className='g-cell';
  cell.innerHTML=`
    <img class="g-img" src="brutalism_assets/${a.file}.png" alt="${a.label}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="g-ph" style="display:none">
      <svg width="70" height="52" viewBox="0 0 70 52" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="68" height="50" stroke="#222" stroke-width="1" fill="none"/>
        <line x1="1" y1="1" x2="69" y2="51" stroke="#1a1a1a" stroke-width="1"/>
        <line x1="69" y1="1" x2="1" y2="51" stroke="#1a1a1a" stroke-width="1"/>
        <text x="35" y="28" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="5" fill="#333" letter-spacing="1">${a.file.replace(/_/g,' ').toUpperCase().slice(0,14)}</text>
      </svg>
    </div>
    <div class="g-overlay">
      <div class="g-name">${a.label}</div>
      <div class="g-tag">// ${a.tag}</div>
    </div>`;
  gg.appendChild(cell);
});

/* ─────────────────────────────────────
   OSCILLOSCOPE
───────────────────────────────────── */
const oc=document.getElementById('osc-canvas');
const ox=oc.getContext('2d');
let waveType='SQUARE', phase=0;

function setWave(t,btn){
  waveType=t;
  document.querySelectorAll('.wave-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById('wave-v').textContent=t;
}
window.setWave=setWave;

function resizeOsc(){
  oc.width=(oc.offsetWidth||700)*window.devicePixelRatio;
  oc.height=220*window.devicePixelRatio;
  oc.style.height='220px';
}
resizeOsc(); window.addEventListener('resize',resizeOsc);

let oscT=0;
function drawOsc(){
  const W=oc.width,H=oc.height;
  ox.clearRect(0,0,W,H);
  // grid
  ox.strokeStyle='rgba(0,55,18,0.35)'; ox.lineWidth=0.6;
  for(let i=0;i<=10;i++){ox.beginPath();ox.moveTo(i*W/10,0);ox.lineTo(i*W/10,H);ox.stroke();}
  for(let i=0;i<=8;i++){ox.beginPath();ox.moveTo(0,i*H/8);ox.lineTo(W,i*H/8);ox.stroke();}
  ox.strokeStyle='rgba(0,80,25,0.6)'; ox.lineWidth=0.8;
  ox.beginPath();ox.moveTo(0,H/2);ox.lineTo(W,H/2);ox.stroke();

  phase+=0.02;
  const amp=H*0.34;

  // glow
  ox.shadowBlur=14; ox.shadowColor='#00ff66';
  ox.strokeStyle='rgba(42,255,122,0.2)'; ox.lineWidth=5;
  drawShape(W,H,amp);

  // crisp
  ox.shadowBlur=0;
  ox.strokeStyle='#2aff7a'; ox.lineWidth=1.8;
  drawShape(W,H,amp);

  // trigger
  ox.fillStyle='#cc1100'; ox.fillRect(0,H/2-7,8,14);

  document.getElementById('osc-t').textContent=(oscT*0.02).toFixed(1)+'ms';
  document.getElementById('osc-lv').textContent=(1.65+Math.sin(oscT*0.04)*0.18).toFixed(2)+'V';
  oscT++;
  requestAnimationFrame(drawOsc);
}

function drawShape(W,H,amp){
  ox.beginPath();
  for(let x=0;x<=W;x+=2){
    const ph=(x/W)*Math.PI*2*3+phase;
    let y;
    switch(waveType){
      case'SINE':     y=Math.sin(ph); break;
      case'SQUARE':   y=Math.sign(Math.sin(ph)); break;
      case'SAW':      y=((ph%(Math.PI*2))/(Math.PI*2))*2-1; break;
      case'TRIANGLE': y=Math.asin(Math.sin(ph))*(2/Math.PI); break;
      case'NOISE':    y=(Math.sin(ph*7.1)+Math.sin(ph*13)*0.5+Math.random()*0.15)/1.5; break;
      default:        y=Math.sin(ph);
    }
    x===0?ox.moveTo(x,H/2-y*amp):ox.lineTo(x,H/2-y*amp);
  }
  ox.stroke();
}
drawOsc();

/* ─────────────────────────────────────
   RESISTOR SLIDERS
───────────────────────────────────── */
const BC={0:'#1a1a1a',1:'#8b4513',2:'#cc1100',3:'#f5a623',4:'#c8a400',5:'#1a5e1a',6:'#0044cc',7:'#8b008b',8:'#888',9:'#f0ece4'};

function getBands(ohms){
  let v=ohms,m=0;
  while(v>=100){v/=10;m++;}
  return[Math.floor(v/10),Math.floor(v%10),m,1];
}
function fmtR(v){ if(v>=1000000)return(v/1000000).toFixed(1)+' MΩ'; if(v>=1000)return(v/1000).toFixed(1)+' kΩ'; return v+' Ω'; }

const SDEFS=[
  {lbl:'RESISTANCE A',name:'R1',min:10,max:1000000,val:10000},
  {lbl:'RESISTANCE B',name:'R2',min:10,max:1000000,val:47000},
  {lbl:'PULL-UP',    name:'R3',min:1000,max:100000,val:10000},
  {lbl:'FEEDBACK',  name:'R4',min:100,max:500000,val:22000},
  {lbl:'BYPASS',    name:'R5',min:10,max:100000,val:330},
];

const sr=document.getElementById('sliders-right');
SDEFS.forEach((d,idx)=>{
  const b=getBands(d.val);
  const bandHtml=(bands)=>bands.map((v,i)=>`<div class="band${i===3?' tol':''}" style="background:${i===3?'#c8a400':BC[v]}"></div>`).join('');
  sr.innerHTML+=`
    <div class="r-row">
      <div class="r-lbl">${d.lbl}<strong>${d.name}</strong></div>
      <div class="r-track">
        <input type="range" min="${d.min}" max="${d.max}" value="${d.val}" step="${d.min}"
          oninput="updateR(this,${idx})" id="r-${idx}">
      </div>
      <div class="r-val" id="rv-${idx}">${fmtR(d.val)}</div>
    </div>
    <div style="display:grid;grid-template-columns:130px 1fr;gap:1.2rem;margin-top:-1.2rem;margin-bottom:0.5rem">
      <div></div>
      <div class="r-bands" id="rb-${idx}">${bandHtml(b)}</div>
    </div>`;
});

function updateR(el,idx){
  const v=parseInt(el.value);
  document.getElementById('rv-'+idx).textContent=fmtR(v);
  document.getElementById('rb-'+idx).innerHTML=getBands(v).map((bv,i)=>
    `<div class="band${i===3?' tol':''}" style="background:${i===3?'#c8a400':BC[bv]}"></div>`).join('');
}
window.updateR=updateR;

/* big decorative resistor */
document.getElementById('big-res').innerHTML=`<svg width="300" height="56" viewBox="0 0 300 56" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="28" x2="55" y2="28" stroke="#666" stroke-width="2"/>
  <line x1="245" y1="28" x2="300" y2="28" stroke="#666" stroke-width="2"/>
  <rect x="55" y="7" width="190" height="42" rx="7" fill="#c8b89a" stroke="#8a7a60" stroke-width="1.5"/>
  <rect x="78"  y="7" width="9" height="42" fill="#cc1100"/>
  <rect x="100" y="7" width="9" height="42" fill="#c8a400"/>
  <rect x="122" y="7" width="9" height="42" fill="#1a1a1a"/>
  <rect x="144" y="7" width="9" height="42" fill="#cc1100"/>
  <rect x="198" y="7" width="7" height="42" fill="#c8a400" opacity="0.8"/>
  <rect x="55" y="7" width="190" height="9" rx="4" fill="rgba(255,255,255,0.12)"/>
  <text x="150" y="31" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="8.5" fill="#5a4a30" letter-spacing="2">10kΩ // 5%</text>
</svg>`;

/* ─────────────────────────────────────
   NETWORK CANVAS
───────────────────────────────────── */
(function(){
  const c=document.getElementById('net-canvas');
  const ctx=c.getContext('2d');
  function resize(){ c.width=c.offsetWidth||700; c.height=480; }
  resize(); window.addEventListener('resize',resize);

  const N=24; const nodes=[]; const conns=[];
  function init(){
    nodes.length=0; conns.length=0;
    const W=c.width,H=c.height;
    for(let i=0;i<N;i++) nodes.push({
      x:40+Math.random()*(W-80), y:40+Math.random()*(H-80),
      vx:(Math.random()-0.5)*0.35, vy:(Math.random()-0.5)*0.35,
      r:2.5+Math.random()*2.5, active:Math.random()>0.55
    });
    for(let i=0;i<N;i++){
      const ds=nodes.map((n,j)=>({j,d:Math.hypot(n.x-nodes[i].x,n.y-nodes[i].y)}))
        .filter(d=>d.j!==i).sort((a,b)=>a.d-b.d);
      for(let k=0;k<3;k++){
        const j=ds[k].j;
        if(!conns.find(c2=>(c2[0]===i&&c2[1]===j)||(c2[0]===j&&c2[1]===i)))
          conns.push([i,j]);
      }
    }
  }
  init(); window.addEventListener('resize',init);

  const pulses=[];
  setInterval(()=>{
    if(conns.length){ const cn=conns[Math.floor(Math.random()*conns.length)];
      pulses.push({cn,t:0,sp:0.009+Math.random()*0.014}); }
  },280);

  function draw(){
    const W=c.width,H=c.height;
    ctx.clearRect(0,0,W,H);
    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<20||n.x>W-20)n.vx*=-1;
      if(n.y<20||n.y>H-20)n.vy*=-1;
    });
    // wires — orthogonal L-routing
    conns.forEach(([i,j])=>{
      const a=nodes[i],b=nodes[j];
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(a.x,b.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle='rgba(170,160,145,0.1)'; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.arc(a.x,b.y,2,0,Math.PI*2);
      ctx.fillStyle='rgba(170,160,145,0.18)'; ctx.fill();
    });
    // pulses
    for(let i=pulses.length-1;i>=0;i--){
      const p=pulses[i]; p.t+=p.sp;
      if(p.t>=1){pulses.splice(i,1);continue;}
      const[ai,bi]=p.cn; const a=nodes[ai],b=nodes[bi];
      let px,py;
      if(p.t<0.5){px=a.x;py=a.y+(b.y-a.y)*(p.t*2);}
      else{px=a.x+(b.x-a.x)*((p.t-0.5)*2);py=b.y;}
      const g=ctx.createRadialGradient(px,py,0,px,py,16);
      g.addColorStop(0,'rgba(255,34,0,0.9)'); g.addColorStop(0.4,'rgba(255,34,0,0.3)'); g.addColorStop(1,'rgba(255,34,0,0)');
      ctx.beginPath(); ctx.arc(px,py,16,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      ctx.beginPath(); ctx.arc(px,py,3,0,Math.PI*2); ctx.fillStyle='#ff4422'; ctx.fill();
    }
    // nodes
    nodes.forEach(n=>{
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r+4,0,Math.PI*2);
      ctx.fillStyle=n.active?'rgba(204,17,0,0.12)':'rgba(80,75,65,0.06)'; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fillStyle=n.active?'#cc1100':'#2e2e2e'; ctx.fill();
      if(n.active){
        ctx.strokeStyle='rgba(204,17,0,0.35)'; ctx.lineWidth=0.5;
        ctx.beginPath(); ctx.moveTo(n.x-9,n.y); ctx.lineTo(n.x+9,n.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(n.x,n.y-9); ctx.lineTo(n.x,n.y+9); ctx.stroke();
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();