'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
type ActiveDemo = 'lms' | 'animation' | 'portal';
type LmsPage = 'dashboard' | 'courses' | 'students' | 'grades' | 'calendar';
type PortalTab = 'home' | 'attendance' | 'fees' | 'results' | 'notices';
type AnimCategory = 'all' | 'science' | 'maths' | 'islamic' | 'history';

// ─── Animation data ───────────────────────────────────────────────────────────
const ANIMATIONS: {
  id: string; title: string; subject: string; grade: string;
  duration: string; category: Exclude<AnimCategory,'all'>; description: string;
}[] = [
  { id:'photosynthesis', title:'How Photosynthesis Works', subject:'Science', grade:'Grade 6–8', duration:'3:24', category:'science', description:'Visualises the process of photosynthesis — sunlight absorption, CO₂ intake, oxygen release, and glucose production in plants.' },
  { id:'solar',          title:'The Solar System',          subject:'Science', grade:'Grade 4–7', duration:'4:10', category:'science', description:'3D-style animated tour of the eight planets, their orbits, sizes, and key characteristics with Urdu narration.' },
  { id:'ibrahim',        title:'Story of Prophet Ibrahim',  subject:'Islamic Studies', grade:'Grade 4–8', duration:'5:30', category:'islamic', description:'An animated retelling of key events — the building of the Kaaba, Hajj origins, and lessons of tawakkul.' },
  { id:'pythagoras',     title:'Pythagoras Theorem',        subject:'Mathematics', grade:'Grade 8–10', duration:'2:45', category:'maths', description:'Step-by-step visual proof of a² + b² = c² with interactive geometry and real-world application examples.' },
  { id:'pillars',        title:'The 5 Pillars of Islam',    subject:'Islamic Studies', grade:'Grade 2–6', duration:'4:00', category:'islamic', description:'Introduces Shahada, Salah, Zakat, Sawm and Hajj through vibrant Islamic-geometric illustrated scenes.' },
  { id:'mughal',         title:'The Mughal Empire',         subject:'History', grade:'Grade 7–10', duration:'5:00', category:'history', description:'Chronicles the rise and fall of the Mughal dynasty — Babur to Aurangzeb — with maps, timelines and battles.' },
  { id:'fractions',      title:'Understanding Fractions',   subject:'Mathematics', grade:'Grade 3–5', duration:'3:10', category:'maths', description:'Visual explanations of proper, improper, and equivalent fractions using pie charts and number lines.' },
  { id:'ancient',        title:'Ancient Civilizations',     subject:'History', grade:'Grade 6–9', duration:'6:00', category:'history', description:'Explores Egyptian, Mesopotamian, Indus Valley, and Greek civilizations — culture, inventions, and legacy.' },
];

const THUMB_GRADIENTS: Record<Exclude<AnimCategory,'all'>, string> = {
  science: 'linear-gradient(135deg,#0d2510,#1a5c28)',
  maths:   'linear-gradient(135deg,#0d1020,#1a2050)',
  islamic: 'linear-gradient(135deg,#1a1005,#2d1a08)',
  history: 'linear-gradient(135deg,#0d0a05,#1a1205)',
};

const DEMO_URLS: Record<ActiveDemo, string> = {
  lms:       'cubico.app/lms/dashboard',
  animation: 'cubico.app/animation-studio',
  portal:    'cubico.app/school-portal',
};
const DEMO_TAGS: Record<ActiveDemo, string> = {
  lms:       'LIVE DEMO — MOODLE LMS',
  animation: 'LIVE DEMO — ANIMATION STUDIO',
  portal:    'LIVE DEMO — SCHOOL PORTAL',
};

// ─── Keyframes (injected once) ────────────────────────────────────────────────
const KEYFRAMES = `
@keyframes elabFadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes elabSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes elabPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.06);opacity:.7} }
@keyframes elabFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes elabLeafGlow { from{box-shadow:0 0 12px rgba(45,155,64,.3)} to{box-shadow:0 0 28px rgba(45,155,64,.7)} }
@keyframes elabSunGlow { from{box-shadow:0 0 30px rgba(255,200,0,.4)} to{box-shadow:0 0 60px rgba(255,200,0,.9)} }
@keyframes elabExpandRing { 0%{transform:translate(-50%,-50%) scale(1);opacity:.5} 100%{transform:translate(-50%,-50%) scale(2.5);opacity:0} }
@keyframes elabBronzeGlow { from{text-shadow:0 0 12px rgba(201,169,110,.3)} to{text-shadow:0 0 24px rgba(201,169,110,.7)} }
@keyframes elabFireGlow { from{text-shadow:0 0 12px rgba(232,98,42,.3)} to{text-shadow:0 0 28px rgba(232,98,42,.8)} }
@keyframes elabTwinkle { 0%,100%{opacity:.8} 50%{opacity:.1} }
@keyframes elabPulseOrb { 0%,100%{opacity:1} 50%{opacity:.3} }
@keyframes elabProgress { from{width:5%} to{width:95%} }
@keyframes elabRayFade { 0%,100%{opacity:.6} 50%{opacity:.15} }
.elab-fadein{animation:elabFadeIn .3s ease both}
.elab-scroll::-webkit-scrollbar{width:3px;height:3px}
.elab-scroll::-webkit-scrollbar-track{background:transparent}
.elab-scroll::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
.elab-scroll::-webkit-scrollbar-thumb:hover{background:#E8622A}
`;

// ─── CSS Scenes ───────────────────────────────────────────────────────────────
function ScenePhotosynthesis() {
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'linear-gradient(180deg,#071507,#0d2510)',overflow:'hidden'}}>
      {/* Sun */}
      <div style={{position:'absolute',top:24,right:40,width:64,height:64,borderRadius:'50%',background:'radial-gradient(circle,#FFD700,#FFA500)',animation:'elabSunGlow 3s infinite alternate',boxShadow:'0 0 40px rgba(255,200,0,.5)'}}>
        {[0,45,90,135].map(deg=>(
          <div key={deg} style={{position:'absolute',top:'50%',left:'50%',width:80,height:2,background:'linear-gradient(90deg,rgba(255,200,0,.6),transparent)',transformOrigin:'0 50%',transform:`rotate(${deg}deg)`,animation:`elabRayFade 2s infinite ${deg*0.01}s`}}/>
        ))}
      </div>
      {/* Leaf */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-55%)',width:90,height:120,clipPath:'polygon(50% 0%,100% 30%,90% 70%,70% 90%,50% 100%,30% 90%,10% 70%,0% 30%)',background:'linear-gradient(135deg,#1a6b2a,#2d9b40)',animation:'elabLeafGlow 2s infinite alternate'}}/>
      {/* Stem */}
      <div style={{position:'absolute',top:'calc(50% + 28px)',left:'calc(50% - 2px)',width:4,height:60,background:'#1a5c28'}}/>
      {/* Labels */}
      {[
        {text:'☀ Sunlight Energy',   left:'60%',top:'12%'},
        {text:'↓ CO₂ Absorbed',      left:'5%', top:'38%'},
        {text:'↑ H₂O from roots',    left:'5%', top:'62%'},
        {text:'O₂ Released →',       left:'60%',top:'40%'},
        {text:'Glucose stored ↓',    left:'60%',top:'62%'},
      ].map((l,i)=>(
        <div key={l.text} style={{position:'absolute',left:l.left,top:l.top,fontFamily:'var(--font-body)',fontSize:10,color:'rgba(240,235,227,.7)',whiteSpace:'nowrap',animation:`elabFadeIn .5s ease ${i*0.2}s both`}}>{l.text}</div>
      ))}
    </div>
  );
}

function SceneSolar() {
  const STARS = Array.from({length:40},(_,i)=>({
    x: (i*73+17)%100, y: (i*53+31)%100, s: i%3===0?2:1, d: (i*0.7+0.3)
  }));
  const ORBITS = [
    {size:110,speed:'5s', planet:{size:10,color:'#C2956C',label:'Mercury'}},
    {size:180,speed:'9s', planet:{size:14,color:'#E8C490',label:'Venus'}},
    {size:270,speed:'15s',planet:{size:16,color:'#4B8FE2',label:'Earth',glow:'0 0 12px rgba(75,143,226,.6)'}},
    {size:370,speed:'24s',planet:{size:12,color:'#D4714A',label:'Mars'}},
  ];
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'radial-gradient(ellipse at 35% 50%,#0a0a1f,#020208)',overflow:'hidden'}}>
      {STARS.map((s,i)=>(
        <div key={i} style={{position:'absolute',left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,borderRadius:'50%',background:'white',animation:`elabTwinkle ${s.d+1}s infinite ${s.d*0.5}s`}}/>
      ))}
      {/* Sun */}
      <div style={{position:'absolute',top:'50%',left:'32%',transform:'translate(-50%,-50%)',width:56,height:56,borderRadius:'50%',background:'radial-gradient(circle,#FFF176,#FFA000)',boxShadow:'0 0 50px rgba(255,200,0,.7)',animation:'elabSunGlow 3s infinite alternate',zIndex:10}}/>
      {/* Orbits + Planets */}
      {ORBITS.map((o,i)=>(
        <div key={i} style={{position:'absolute',top:'50%',left:'32%',transform:'translate(-50%,-50%)',width:o.size,height:o.size,borderRadius:'50%',border:'1px solid rgba(255,255,255,.07)',animation:`elabSpin ${o.speed} linear infinite`}}>
          <div style={{position:'absolute',top:-(o.planet.size/2),left:'50%',transform:'translateX(-50%)',width:o.planet.size,height:o.planet.size,borderRadius:'50%',background:o.planet.color,boxShadow:(o.planet as {glow?:string}).glow||'none'}}/>
        </div>
      ))}
    </div>
  );
}

function SceneIbrahim() {
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'linear-gradient(180deg,#1a0f05,#0d0805)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,overflow:'hidden'}}>
      {/* Moon + star */}
      <div style={{fontSize:32,animation:'elabFloat 3s infinite',letterSpacing:4}}>🌙 ⭐</div>
      {/* Bismillah */}
      <div style={{border:'1px solid rgba(201,169,110,.2)',background:'rgba(201,169,110,.04)',padding:'12px 28px',textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:22,color:'#C9A96E',animation:'elabBronzeGlow 2s infinite alternate',letterSpacing:'0.05em'}}>بِسْمِ ٱللَّٰهِ</div>
      </div>
      {/* Kaaba */}
      <div style={{position:'relative',width:70,height:80,background:'#111',border:'2px solid #333',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'30%',left:0,right:0,height:20,borderTop:'1px solid #C9A96E',borderBottom:'1px solid #C9A96E',background:'linear-gradient(180deg,rgba(201,169,110,.15),rgba(201,169,110,.05))'}}/>
        <div style={{position:'absolute',top:'50%',left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#C9A96E,transparent)'}}/>
      </div>
      {/* Tawaf rings */}
      {[1,2,3].map(i=>(
        <div key={i} style={{position:'absolute',top:'50%',left:'50%',width:70+i*40,height:70+i*40,border:'1px solid rgba(201,169,110,.3)',borderRadius:'50%',animation:`elabExpandRing 3s infinite ${i*.9}s`}}/>
      ))}
    </div>
  );
}

function ScenePythagoras() {
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'#080d12',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,backgroundImage:'linear-gradient(rgba(232,98,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,98,42,.04) 1px,transparent 1px)',backgroundSize:'30px 30px',overflow:'hidden'}}>
      <svg width={240} height={200} viewBox="0 0 240 200">
        {/* squares */}
        <rect x={20} y={80} width={80} height={80} fill="rgba(232,98,42,.2)" stroke="#E8622A" strokeWidth={1}/>
        <rect x={100} y={140} width={60} height={60} fill="rgba(201,169,110,.12)" stroke="#C9A96E" strokeWidth={1}/>
        <polygon points="20,160 180,160 180,40" fill="rgba(240,235,227,.04)" stroke="#E8622A" strokeWidth={2}/>
        {/* right angle */}
        <path d="M165,160 L165,145 L180,145" fill="none" stroke="#7A7268" strokeWidth={1.5}/>
        <text x={10} y={176} fontFamily="Georgia,serif" fontStyle="italic" fontSize={13} fill="#E8622A">a</text>
        <text x={110} y={178} fontFamily="Georgia,serif" fontStyle="italic" fontSize={13} fill="#C9A96E">b</text>
        <text x={186} y={100} fontFamily="Georgia,serif" fontStyle="italic" fontSize={13} fill="#F0EBE3">c</text>
      </svg>
      <div style={{fontFamily:'var(--font-display)',fontSize:24,color:'#F0EBE3',animation:'elabFireGlow 2s infinite alternate'}}>a² + b² = c²</div>
    </div>
  );
}

function ScenePillars() {
  const pillars = [
    {icon:'🕌',label:'Shahada',h:60},{icon:'🤲',label:'Salah',h:80},
    {icon:'⭐',label:'Zakat',h:70},{icon:'🌙',label:'Sawm',h:90},{icon:'📖',label:'Hajj',h:65},
  ];
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'linear-gradient(180deg,#1a1005,#0d0a05)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,overflow:'hidden'}}>
      <div style={{fontFamily:'var(--font-display)',fontSize:13,color:'#C9A96E',letterSpacing:'0.2em',textTransform:'uppercase',marginBottom:4}}>THE FIVE PILLARS</div>
      <div style={{display:'flex',gap:28,alignItems:'flex-end'}}>
        {pillars.map((p,i)=>(
          <div key={p.label} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
            <div style={{fontSize:26,animation:`elabFloat ${2.5+i*0.3}s infinite ${i*0.4}s`}}>{p.icon}</div>
            <div style={{width:3,height:p.h,background:`linear-gradient(180deg,#C9A96E,transparent)`}}/>
            <div style={{fontFamily:'var(--font-body)',fontSize:9,color:'rgba(201,169,110,.6)',letterSpacing:'0.1em'}}>{p.label}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:16,color:'rgba(240,235,227,.7)',animation:'elabBronzeGlow 2s infinite alternate',marginTop:4}}>أَرْكَانُ الْإِسْلَامِ</div>
    </div>
  );
}

function SceneMughal() {
  return (
    <div style={{position:'relative',width:'100%',height:'100%',backgroundImage:"url('https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=70')",backgroundSize:'cover',backgroundPosition:'center',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'rgba(6,6,6,.72)'}}/>
      <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:12,padding:24,textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-accent)',fontSize:11,color:'#C9A96E',letterSpacing:'0.25em'}}>1526 – 1857</div>
        <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:32,color:'white',lineHeight:1.1,animation:'elabBronzeGlow 2s infinite alternate'}}>The Mughal Empire</div>
        <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'rgba(255,255,255,.5)'}}>Rise · Reign · Legacy — South Asia</div>
      </div>
    </div>
  );
}

function SceneFractions() {
  const bars = [
    {label:'¼ One Quarter', val:25, color:'#C9A96E'},
    {label:'½ One Half',    val:50, color:'#E8622A'},
    {label:'¾ Three-Qtr',  val:75, color:'#10B99B'},
  ];
  return (
    <div style={{position:'relative',width:'100%',height:'100%',background:'#080d12',display:'flex',alignItems:'center',justifyContent:'center',gap:40,padding:32,overflow:'hidden',backgroundImage:'linear-gradient(rgba(232,98,42,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(232,98,42,.03) 1px,transparent 1px)',backgroundSize:'30px 30px'}}>
      {/* Pie */}
      <svg width={130} height={130} viewBox="0 0 100 100">
        <circle cx={50} cy={50} r={46} fill="#141414" stroke="#222" strokeWidth={1}/>
        {/* ¾ slice */}
        <path d="M50,50 L50,4 A46,46 0 1,1 4,50 Z" fill="rgba(16,185,155,.25)" stroke="#10B99B" strokeWidth={1}/>
        {/* ½ */}
        <path d="M50,50 L50,4 A46,46 0 0,1 96,50 Z" fill="rgba(232,98,42,.25)" stroke="#E8622A" strokeWidth={1}/>
        {/* ¼ */}
        <path d="M50,50 L50,4 A46,46 0 0,1 96,50 Z" fill="rgba(201,169,110,.18)" stroke="#C9A96E" strokeWidth={1} opacity={0.5}/>
        <text x={50} y={55} textAnchor="middle" fontFamily="Georgia,serif" fontSize={20} fill="#F0EBE3">¾</text>
      </svg>
      {/* Bars */}
      <div style={{display:'flex',flexDirection:'column',gap:16,flex:1,maxWidth:160}}>
        {bars.map(b=>(
          <div key={b.label} style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:20,color:b.color,width:30,flexShrink:0}}>{b.label.split(' ')[0]}</div>
            <div style={{flex:1,height:5,background:'#222',overflow:'hidden',borderRadius:2}}>
              <div style={{height:'100%',width:`${b.val}%`,background:b.color}}/>
            </div>
            <div style={{fontFamily:'var(--font-ui)',fontSize:11,color:'#F0EBE3',width:30,textAlign:'right'}}>{b.val}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneAncient() {
  const civs = ['Egypt','Mesopotamia','Indus Valley','Greece'];
  return (
    <div style={{position:'relative',width:'100%',height:'100%',backgroundImage:"url('https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=70')",backgroundSize:'cover',backgroundPosition:'center',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'rgba(6,6,6,.75)'}}/>
      <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:14,padding:24,textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-accent)',fontSize:11,color:'#C9A96E',letterSpacing:'0.25em'}}>3000 BCE – 500 CE</div>
        <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:28,color:'white',lineHeight:1.1}}>Ancient Civilizations</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginTop:8}}>
          {civs.map(c=>(
            <span key={c} style={{fontFamily:'var(--font-body)',fontSize:11,color:'#C9A96E',border:'1px solid rgba(201,169,110,.2)',background:'rgba(201,169,110,.08)',padding:'5px 12px'}}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SCENES: Record<string,React.ReactNode> = {
  photosynthesis: <ScenePhotosynthesis/>,
  solar:          <SceneSolar/>,
  ibrahim:        <SceneIbrahim/>,
  pythagoras:     <ScenePythagoras/>,
  pillars:        <ScenePillars/>,
  mughal:         <SceneMughal/>,
  fractions:      <SceneFractions/>,
  ancient:        <SceneAncient/>,
};

// ─── LMS Demo ─────────────────────────────────────────────────────────────────
const sNav: React.CSSProperties = {display:'flex',alignItems:'center',gap:10,padding:'9px 18px',fontFamily:'var(--font-body)',fontSize:12.5,color:'var(--muted)',borderLeft:'2px solid transparent',cursor:'pointer',transition:'all .15s'};

function LmsNav({page,active,onClick}:{page:LmsPage,active:boolean,onClick:()=>void}) {
  const items:{page:LmsPage,icon:string,label:string}[] = [
    {page:'dashboard',icon:'⊞',label:'Dashboard'},
    {page:'courses',  icon:'📚',label:'Courses'},
    {page:'students', icon:'👥',label:'Students'},
    {page:'grades',   icon:'📊',label:'Grades'},
    {page:'calendar', icon:'📅',label:'Calendar'},
  ];
  const item = items.find(i=>i.page===page)!;
  return (
    <div onClick={onClick} style={{...sNav,color:active?'var(--ivory)':'var(--muted)',background:active?'var(--fire-dim)':'transparent',borderLeftColor:active?'var(--fire)':'transparent'}}>
      {item.icon} {item.label}
    </div>
  );
}

function LmsDashboard({goTo}:{goTo:(p:LmsPage)=>void}) {
  const courses = [
    {name:'Mathematics Grade 9', teacher:'Mr. Hassan Ali · 34 students',  prog:68},
    {name:'Islamic Studies',      teacher:'Maulana Ibrahim · 52 students', prog:45},
    {name:'Computer Science',     teacher:'Ms. Fatima Khan · 28 students', prog:82},
  ];
  return (
    <div className="elab-fadein">
      <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'var(--ivory)'}}>Good morning, Principal Ahmed</div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',marginBottom:16}}>Tuesday, 3 March 2026 · 47 students online</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:20}}>
        {[{num:'847',label:'Total Students'},{num:'24',label:'Active Courses'},{num:'94%',label:'Attendance Rate',fire:true},{num:'12',label:'Due Today'}].map(s=>(
          <div key={s.label} style={{background:'var(--surface)',border:'1px solid #222',padding:14}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:26,color:s.fire?'var(--fire)':'var(--ivory)',lineHeight:1}}>{s.num}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'var(--muted)',marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:10}}>ACTIVE COURSES</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {courses.map(c=>(
          <div key={c.name} onClick={()=>goTo('courses')} style={{background:'var(--surface)',border:'1px solid #222',padding:14,cursor:'pointer',transition:'border-color .15s'}}
            onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--fire)')} onMouseLeave={e=>(e.currentTarget.style.borderColor='#222')}>
            <div style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:12.5,color:'var(--ivory)',marginBottom:4}}>{c.name}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'var(--muted)',marginBottom:10}}>{c.teacher}</div>
            <div style={{background:'#222',height:3,overflow:'hidden',marginBottom:4}}>
              <div style={{height:'100%',width:`${c.prog}%`,background:'linear-gradient(90deg,var(--fire),var(--bronze))'}}/>
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'var(--muted)'}}>{c.prog}% complete</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LmsCourses({back}:{back:()=>void}) {
  const rows = [
    {name:'Mathematics Grade 9',  stu:34, prog:68, status:'Active'},
    {name:'Islamic Studies',       stu:52, prog:45, status:'Active'},
    {name:'Computer Science',      stu:28, prog:82, status:'Active'},
    {name:'Urdu Literature',       stu:41, prog:55, status:'Active'},
    {name:'Physics Grade 10',      stu:38, prog:71, status:'Active'},
    {name:'English Grammar',       stu:29, prog:33, status:'Draft'},
  ];
  return (
    <div className="elab-fadein">
      <button onClick={back} style={{fontFamily:'var(--font-ui)',fontSize:12,color:'var(--fire)',background:'none',border:'none',cursor:'pointer',padding:0,marginBottom:16}}>← Dashboard</button>
      <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'var(--ivory)'}}>All Courses</div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',marginBottom:16}}>24 courses this semester</div>
      <div style={{borderTop:'1px solid #222'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'8px 14px',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid #222'}}>
          <div>Course</div><div>Students</div><div>Progress</div><div>Status</div>
        </div>
        {rows.map(r=>(
          <div key={r.name} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',padding:'11px 14px',borderBottom:'1px solid #1a1a1a',fontSize:12}}>
            <div style={{fontFamily:'var(--font-body)',fontWeight:500,color:'var(--ivory)'}}>{r.name}</div>
            <div style={{fontFamily:'var(--font-body)',color:'var(--muted)'}}>{r.stu}</div>
            <div style={{fontFamily:'var(--font-body)',color:'var(--muted)'}}>{r.prog}%</div>
            <div>
              <span style={{fontFamily:'var(--font-body)',fontSize:10,padding:'2px 8px',background:r.status==='Active'?'rgba(16,185,129,.12)':'rgba(107,101,96,.12)',color:r.status==='Active'?'#10B981':'var(--muted)'}}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LmsStudents({back}:{back:()=>void}) {
  const rows = [
    {name:'Ahmed Khan',    cls:'Grade 9', att:'96%', grade:'A',  st:'active'},
    {name:'Fatima Malik',  cls:'Grade 9', att:'88%', grade:'B+', st:'active'},
    {name:'Omar Siddiqui', cls:'Grade 10',att:'72%', grade:'B',  st:'active'},
    {name:'Ayesha Raza',   cls:'Grade 9', att:'91%', grade:'A−', st:'active'},
    {name:'Bilal Ahmed',   cls:'Grade 10',att:'65%', grade:'C+', st:'atrisk'},
    {name:'Zainab Hassan', cls:'Grade 9', att:'98%', grade:'A+', st:'active'},
    {name:'Ibrahim Shah',  cls:'Grade 10',att:'80%', grade:'B',  st:'active'},
    {name:'Sara Qureshi',  cls:'Grade 9', att:'55%', grade:'D',  st:'absent'},
  ];
  const dot:(st:string)=>[string,string] = (st)=>st==='active'?['#10B981','●']:st==='atrisk'?['#FBBF24','⚠']:['#EF4444','✕'];
  return (
    <div className="elab-fadein">
      <button onClick={back} style={{fontFamily:'var(--font-ui)',fontSize:12,color:'var(--fire)',background:'none',border:'none',cursor:'pointer',padding:0,marginBottom:16}}>← Dashboard</button>
      <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'var(--ivory)'}}>Students</div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',marginBottom:16}}>47 currently enrolled</div>
      <div style={{borderTop:'1px solid #222'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'8px 14px',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid #222'}}>
          <div>Name</div><div>Class</div><div>Attendance</div><div>Grade</div><div>Status</div>
        </div>
        {rows.map(r=>{const [col,ico]=dot(r.st);return(
          <div key={r.name} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'10px 14px',borderBottom:'1px solid #1a1a1a',fontSize:12}}>
            <div style={{fontFamily:'var(--font-body)',fontWeight:500,color:'var(--ivory)'}}>{r.name}</div>
            <div style={{fontFamily:'var(--font-body)',color:'var(--muted)'}}>{r.cls}</div>
            <div style={{fontFamily:'var(--font-body)',color:'var(--muted)'}}>{r.att}</div>
            <div style={{fontFamily:'var(--font-body)',color:'var(--muted)'}}>{r.grade}</div>
            <div style={{fontFamily:'var(--font-body)',color:col}}>{ico}</div>
          </div>
        );})}
      </div>
    </div>
  );
}

function LmsGrades({back}:{back:()=>void}) {
  const bars = [
    {sub:'Mathematics',    val:78},{sub:'Islamic Studies',val:85},
    {sub:'English',        val:72},{sub:'Science',        val:68},
    {sub:'Urdu',           val:80},{sub:'Computer',       val:88},
  ];
  return (
    <div className="elab-fadein">
      <button onClick={back} style={{fontFamily:'var(--font-ui)',fontSize:12,color:'var(--fire)',background:'none',border:'none',cursor:'pointer',padding:0,marginBottom:16}}>← Dashboard</button>
      <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'var(--ivory)'}}>Grade Report</div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',marginBottom:20}}>Class averages — Term 1, 2026</div>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {bars.map(b=>(
          <div key={b.sub} style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--muted)',width:130,flexShrink:0}}>{b.sub}</div>
            <div style={{flex:1,background:'#222',height:6,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${b.val}%`,background:'linear-gradient(90deg,var(--fire),var(--bronze))'}}/>
            </div>
            <div style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:12,color:'var(--ivory)',width:35,textAlign:'right'}}>{b.val}%</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',marginTop:16}}>Class average: 78.5%</div>
    </div>
  );
}

function LmsCalendar({back}:{back:()=>void}) {
  const events = [
    {date:'Mar 5', label:'Mathematics Mid-Term',       color:'var(--fire)'},
    {date:'Mar 10',label:'Parent-Teacher Meeting',     color:'var(--bronze)'},
    {date:'Mar 15',label:'Science Practical Exam',     color:'var(--fire)'},
    {date:'Mar 20',label:'Report Card Distribution',   color:'#10B981'},
    {date:'Mar 25',label:'Annual Sports Day',          color:'#3B82F6'},
    {date:'Mar 28',label:'Eid Holiday (Tentative)',    color:'#8B5CF6'},
  ];
  return (
    <div className="elab-fadein">
      <button onClick={back} style={{fontFamily:'var(--font-ui)',fontSize:12,color:'var(--fire)',background:'none',border:'none',cursor:'pointer',padding:0,marginBottom:16}}>← Dashboard</button>
      <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'var(--ivory)'}}>Academic Calendar</div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',marginBottom:20}}>March 2026</div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {events.map(e=>(
          <div key={e.label} style={{display:'flex',alignItems:'center',gap:14,padding:'10px 14px',background:'var(--surface)',border:'1px solid #222',borderLeft:`3px solid ${e.color}`}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:13,color:e.color,width:45,flexShrink:0}}>{e.date}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--ivory)'}}>{e.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LMS Demo Wrapper ─────────────────────────────────────────────────────────
function LmsDemo() {
  const [page, setPage] = useState<LmsPage>('dashboard');
  const pages: LmsPage[] = ['dashboard','courses','students','grades','calendar'];
  return (
    <div style={{display:'flex',minHeight:560}}>
      {/* Sidebar */}
      <div style={{width:220,flexShrink:0,background:'#0a0a0a',borderRight:'1px solid #222',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'20px 18px 16px',borderBottom:'1px solid #222'}}>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontWeight:600,fontSize:15,color:'var(--ivory)'}}>EduConnect LMS</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'var(--muted)'}}>Powered by Cubico</div>
        </div>
        {pages.map(p=>(
          <LmsNav key={p} page={p} active={page===p} onClick={()=>setPage(p)}/>
        ))}
      </div>
      {/* Content */}
      <div key={page} className="elab-scroll" style={{flex:1,overflowY:'auto',padding:22,background:'var(--card)'}}>
        {page==='dashboard' && <LmsDashboard goTo={setPage}/>}
        {page==='courses'   && <LmsCourses   back={()=>setPage('dashboard')}/>}
        {page==='students'  && <LmsStudents  back={()=>setPage('dashboard')}/>}
        {page==='grades'    && <LmsGrades    back={()=>setPage('dashboard')}/>}
        {page==='calendar'  && <LmsCalendar  back={()=>setPage('dashboard')}/>}
      </div>
    </div>
  );
}

// ─── Animation Studio Demo ────────────────────────────────────────────────────
function AnimationDemo() {
  const [activeId, setActiveId] = useState('photosynthesis');
  const [category, setCategory] = useState<AnimCategory>('all');
  const cats: AnimCategory[] = ['all','science','maths','islamic','history'];
  const filtered = category==='all' ? ANIMATIONS : ANIMATIONS.filter(a=>a.category===category);
  const active = ANIMATIONS.find(a=>a.id===activeId) ?? ANIMATIONS[0];

  return (
    <div style={{display:'flex',minHeight:560}}>
      {/* Sidebar */}
      <div style={{width:260,flexShrink:0,background:'#080808',borderRight:'1px solid #222',display:'flex',flexDirection:'column'}}>
        <div style={{padding:'16px 18px',borderBottom:'1px solid #222',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.15em'}}>ANIMATION LIBRARY</div>
        {/* Category pills */}
        <div style={{padding:'12px 14px',borderBottom:'1px solid #222',display:'flex',flexWrap:'wrap',gap:5}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{fontFamily:'var(--font-ui)',fontWeight:500,fontSize:10,color:category===c?'white':'var(--muted)',background:category===c?'var(--fire)':'var(--card)',border:`1px solid ${category===c?'var(--fire)':'#222'}`,padding:'4px 10px',borderRadius:20,cursor:'pointer',textTransform:'capitalize'}}>
              {c}
            </button>
          ))}
        </div>
        {/* List */}
        <div className="elab-scroll" style={{overflowY:'auto',flex:1}}>
          {filtered.map(a=>(
            <div key={a.id} onClick={()=>setActiveId(a.id)}
              style={{display:'flex',alignItems:'center',gap:12,padding:'11px 14px',cursor:'pointer',borderBottom:'1px solid #1a1a1a',borderLeft:`2px solid ${activeId===a.id?'var(--fire)':'transparent'}`,background:activeId===a.id?'var(--fire-dim)':'transparent',transition:'background .15s'}}
              onMouseEnter={e=>{if(activeId!==a.id)e.currentTarget.style.background='var(--card)'}}
              onMouseLeave={e=>{if(activeId!==a.id)e.currentTarget.style.background='transparent'}}>
              <div style={{width:44,height:32,borderRadius:2,flexShrink:0,background:THUMB_GRADIENTS[a.category]}}/>
              <div>
                <div style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:12,color:'var(--ivory)'}}>{a.title}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'var(--muted)'}}>{a.subject} · {a.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        {/* Player */}
        <div key={activeId} className="elab-fadein" style={{flex:1,minHeight:300,position:'relative',overflow:'hidden'}}>
          {SCENES[activeId]}
        </div>
        {/* Controls */}
        <div style={{background:'#0a0a0a',borderTop:'1px solid #222',padding:'10px 16px',display:'flex',alignItems:'center',gap:12}}>
          <div style={{display:'flex',gap:10,color:'var(--muted)',fontSize:16}}>
            <span style={{cursor:'pointer',fontSize:14}}>⏮</span>
            <span style={{cursor:'pointer',fontSize:18,color:'var(--ivory)'}}>▶</span>
            <span style={{cursor:'pointer',fontSize:14}}>⏭</span>
          </div>
          <div style={{flex:1,height:3,background:'#222',overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,var(--fire),var(--bronze))',animation:'elabProgress 8s linear infinite'}}/>
          </div>
          <div style={{fontFamily:'var(--font-ui)',fontSize:11,color:'var(--muted)'}}>0:00 / {active.duration}</div>
          <span style={{fontFamily:'var(--font-ui)',fontSize:10,color:'var(--muted)',border:'1px solid #222',padding:'2px 6px'}}>HD</span>
        </div>
        {/* Info */}
        <div style={{padding:'16px 20px',borderTop:'1px solid #222',background:'#0a0a0a'}}>
          <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:16,color:'var(--ivory)',marginBottom:8}}>{active.title}</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
            <span style={{fontFamily:'var(--font-ui)',fontSize:10,color:'var(--fire)',background:'var(--fire-dim)',border:'1px solid rgba(232,98,42,.3)',padding:'3px 10px'}}>{active.subject}</span>
            <span style={{fontFamily:'var(--font-ui)',fontSize:10,color:'var(--muted)',border:'1px solid #222',padding:'3px 10px'}}>{active.grade}</span>
            <span style={{fontFamily:'var(--font-ui)',fontSize:10,color:'var(--muted)',border:'1px solid #222',padding:'3px 10px'}}>{active.duration}</span>
            <span style={{fontFamily:'var(--font-ui)',fontSize:10,color:'var(--muted)',border:'1px solid #222',padding:'3px 10px'}}>EN / UR / AR</span>
          </div>
          <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)',lineHeight:1.6}}>{active.description}</div>
        </div>
      </div>
    </div>
  );
}

// ─── School Portal Demo ────────────────────────────────────────────────────────
function PortalHome() {
  return (
    <div className="elab-fadein">
      <div style={{background:'linear-gradient(135deg,rgba(16,185,155,.08),rgba(10,140,120,.04))',border:'1px solid rgba(16,185,155,.15)',padding:'18px 20px',marginBottom:16}}>
        <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:20,color:'#a8f0e0'}}>Welcome back, Ahmed! 👋</div>
        <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72'}}>Class 9-A · Roll No. 23 · Academic Year 2025–26</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:18}}>
        {[{val:'88%',color:'#10B99B',label:'Attendance This Month'},{val:'Paid',color:'#10B99B',label:'Fee Status — March',small:true},{val:'Mar 15',color:'#E8622A',label:'Next Exam',small:true}].map(s=>(
          <div key={s.label} style={{background:'#070d0d',border:'1px solid #1a2525',padding:14}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:s.small?16:24,color:s.color,lineHeight:1}}>{s.val}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'#4a7a72',marginTop:3}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'#4a7a72',textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:10}}>RECENT NOTICES</div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        {[{t:'Mid-term examination schedule released',d:'28 Feb',c:'#10B99B'},{t:'Parent-teacher meeting: 10 March',d:'25 Feb',c:'#E8622A'},{t:'Fee deadline extended to 12 March',d:'20 Feb',c:'#C9A96E'}].map(n=>(
          <div key={n.t} style={{background:'#070d0d',border:'1px solid #1a2525',borderLeft:`3px solid ${n.c}`,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div style={{fontFamily:'var(--font-body)',fontWeight:500,fontSize:12,color:'#c8e8e0'}}>{n.t}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'#4a7a72',marginLeft:12,flexShrink:0}}>{n.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalAttendance() {
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  // Feb 2026 starts on Sunday. P=present, A=absent, H=holiday, E=empty
  const cal=['E','2P','3P','4P','5P','6P','7H','8H','9P','10A','11P','12P','13P','14H','15H','16P','17P','18A','19P','20P','21H','22H','23P','24P','25P','26A','27P','28H'];
  const cellColor=(d:string)=>{
    if(d==='E'||!d)return{bg:'transparent',color:'transparent'};
    const t=d.slice(-1);
    if(t==='P')return{bg:'rgba(16,185,155,.12)',color:'#10B99B'};
    if(t==='A')return{bg:'rgba(239,68,68,.12)',color:'#EF4444'};
    return{bg:'transparent',color:'#4a7a72'};
  };
  return (
    <div className="elab-fadein">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:16,color:'#a8f0e0'}}>February 2026</div>
        <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72'}}>Attendance: <span style={{color:'#10B99B',fontWeight:700}}>85.7%</span></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
        {days.map(d=><div key={d} style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:9,color:'#4a7a72',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',padding:'4px 0'}}>{d}</div>)}
        {cal.map((d,i)=>{const c=cellColor(d);const n=d==='E'?'':d.replace(/[PA H]/g,'');return(
          <div key={i} style={{height:36,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontFamily:'var(--font-ui)',background:c.bg,color:c.color}}>{n}</div>
        );})}
      </div>
      <div style={{display:'flex',gap:16,marginTop:14,fontSize:11,color:'#4a7a72',fontFamily:'var(--font-body)'}}>
        {[{c:'#10B99B',l:'Present (18 days)'},{c:'#EF4444',l:'Absent (3 days)'},{c:'#4a7a72',l:'Holidays (7 days)'}].map(s=>(
          <div key={s.l} style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:s.c}}/>
            {s.l}
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalFees() {
  const rows=[
    {mo:'January 2026', amt:'Rs. 4,500',due:'Jan 10',paid:'Jan 8', status:'paid'},
    {mo:'February 2026',amt:'Rs. 4,500',due:'Feb 10',paid:'Feb 12',status:'paid'},
    {mo:'March 2026',   amt:'Rs. 4,500',due:'Mar 10',paid:'—',    status:'pending'},
  ];
  return (
    <div className="elab-fadein">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'#a8f0e0'}}>Fee Statement</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72'}}>Academic Year 2025–26</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:'var(--font-accent)',fontSize:28,color:'#E8622A',lineHeight:1}}>Rs. 4,500</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'#4a7a72'}}>Outstanding Balance</div>
        </div>
      </div>
      <div style={{borderTop:'1px solid #1a2525'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'8px 0',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:10,color:'#4a7a72',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid #1a2525'}}>
          {['Month','Amount','Due Date','Paid','Status'].map(h=><div key={h}>{h}</div>)}
        </div>
        {rows.map(r=>(
          <div key={r.mo} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'11px 0',borderBottom:'1px solid #1a2525',fontSize:12}}>
            <div style={{fontFamily:'var(--font-body)',color:'#c8e8e0'}}>{r.mo}</div>
            <div style={{fontFamily:'var(--font-body)',color:'#4a7a72'}}>{r.amt}</div>
            <div style={{fontFamily:'var(--font-body)',color:'#4a7a72'}}>{r.due}</div>
            <div style={{fontFamily:'var(--font-body)',color:'#4a7a72'}}>{r.paid}</div>
            <div>
              <span style={{fontFamily:'var(--font-body)',fontSize:10,padding:'2px 8px',background:r.status==='paid'?'rgba(16,185,129,.12)':'rgba(251,191,36,.12)',color:r.status==='paid'?'#10B981':'#FBBF24'}}>
                {r.status==='paid'?'✓ Paid':'⏳ Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button style={{marginTop:14,background:'#10B99B',color:'white',border:'none',padding:'8px 20px',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:12,cursor:'pointer',borderRadius:2}}
        onMouseEnter={e=>(e.currentTarget.style.background='#0d8f78')} onMouseLeave={e=>(e.currentTarget.style.background='#10B99B')}>
        Pay Now — Rs. 4,500
      </button>
    </div>
  );
}

function PortalResults() {
  const subjects=[
    {sub:'Mathematics',   max:100,obt:78,grd:'B+',rem:'Good'},
    {sub:'English',       max:100,obt:82,grd:'A−',rem:'Very Good'},
    {sub:'Urdu',          max:100,obt:75,grd:'B', rem:'Good'},
    {sub:'Islam. Studies',max:100,obt:91,grd:'A', rem:'Excellent'},
    {sub:'Science',       max:100,obt:69,grd:'B−',rem:'Average'},
    {sub:'Computer',      max:100,obt:88,grd:'A−',rem:'Very Good'},
  ];
  return (
    <div className="elab-fadein">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'#a8f0e0'}}>Result Card — Term 1</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72'}}>2025–26 · Class 9-A</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:'var(--font-accent)',fontSize:40,color:'#E8622A',lineHeight:1}}>B+</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72'}}>483/600 · 80.5% · 8th in class</div>
        </div>
      </div>
      <div style={{border:'1px solid #1a2525'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'8px 14px',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:10,color:'#4a7a72',textTransform:'uppercase',letterSpacing:'0.1em',borderBottom:'1px solid #1a2525'}}>
          {['Subject','Max','Obtained','Grade','Remarks'].map(h=><div key={h}>{h}</div>)}
        </div>
        {subjects.map(r=>(
          <div key={r.sub} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'10px 14px',borderBottom:'1px solid #1a2525',fontSize:12}}>
            <div style={{fontFamily:'var(--font-body)',color:'#c8e8e0'}}>{r.sub}</div>
            <div style={{fontFamily:'var(--font-body)',color:'#4a7a72'}}>{r.max}</div>
            <div style={{fontFamily:'var(--font-ui)',fontWeight:600,color:'#E8622A'}}>{r.obt}</div>
            <div style={{fontFamily:'var(--font-body)',color:'#4a7a72'}}>{r.grd}</div>
            <div style={{fontFamily:'var(--font-body)',color:'#4a7a72'}}>{r.rem}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalNotices() {
  const notices=[
    {t:'Mid-term examination schedule released',body:'Exams start 15 March. All students must carry their roll number slips. Schedule available on notice board.',tag:'Exam',c:'#10B99B',d:'28 Feb 2026'},
    {t:'Parent-Teacher Meeting: 10 March 2026',body:'PTM will be held from 9 AM to 1 PM. Parents are requested to bring their child\'s diary and last report card.',tag:'Meeting',c:'#E8622A',d:'25 Feb 2026'},
    {t:'Annual Sports Day: 25 March 2026',body:'All students are invited to participate. Registration forms available at the front office. Last date: 8 March.',tag:'Event',c:'#10B99B',d:'22 Feb 2026'},
    {t:'Fee Deadline Extended to 12 March',body:'The school has extended the fee submission deadline. Late fee charges will apply after 12 March without exception.',tag:'Finance',c:'#3B82F6',d:'20 Feb 2026'},
  ];
  return (
    <div className="elab-fadein">
      <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:18,color:'#a8f0e0',marginBottom:4}}>Notice Board</div>
      <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72',marginBottom:16}}>Recent announcements</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {notices.map(n=>(
          <div key={n.t} style={{background:'#070d0d',border:'1px solid #1a2525',borderLeft:`3px solid ${n.c}`,padding:'14px 16px',borderRadius:'0 2px 2px 0'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
              <div style={{fontFamily:'var(--font-body)',fontWeight:500,fontSize:13,color:'#c8e8e0'}}>{n.t}</div>
              <span style={{fontFamily:'var(--font-body)',fontSize:10,background:'#0d1616',border:'1px solid #1a2525',color:'#4a7a72',padding:'2px 8px',flexShrink:0,marginLeft:10}}>{n.tag}</span>
            </div>
            <div style={{fontFamily:'var(--font-body)',fontSize:11,color:'#4a7a72',lineHeight:1.6}}>{n.body}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:10,color:'#4a7a72',marginTop:6}}>{n.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalDemo() {
  const [tab, setTab] = useState<PortalTab>('home');
  const tabs: {id:PortalTab,label:string}[] = [
    {id:'home',       label:'Home'},
    {id:'attendance', label:'Attendance'},
    {id:'fees',       label:'Fees'},
    {id:'results',    label:'Results'},
    {id:'notices',    label:'Notices'},
  ];
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:560,background:'#0d1616'}}>
      {/* Top Nav */}
      <div style={{height:50,background:'#090909',borderBottom:'1px solid #1a2525',padding:'0 24px',display:'flex',alignItems:'center',gap:0,flexShrink:0}}>
        <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontWeight:600,fontSize:14,color:'#a8f0e0',marginRight:32,flexShrink:0}}>Al-Noor School System</div>
        <div className="elab-scroll" style={{display:'flex',flex:1,overflowX:'auto',flexShrink:0}}>
          {tabs.map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)}
              style={{padding:'0 16px',height:50,display:'flex',alignItems:'center',fontFamily:'var(--font-ui)',fontWeight:500,fontSize:12,color:tab===t.id?'#a8f0e0':'#4a7a72',borderBottom:`2px solid ${tab===t.id?'#10B99B':'transparent'}`,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,transition:'color .15s'}}>
              {t.label}
            </div>
          ))}
        </div>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#10B99B,#0d8f78)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',fontSize:12,color:'white'}}>AK</div>
          <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#4a7a72'}}>Ahmed Khan</div>
        </div>
      </div>
      {/* Content */}
      <div key={tab} className="elab-scroll elab-fadein" style={{flex:1,overflowY:'auto',padding:'20px 24px',background:'#0d1616'}}>
        {tab==='home'       && <PortalHome/>}
        {tab==='attendance' && <PortalAttendance/>}
        {tab==='fees'       && <PortalFees/>}
        {tab==='results'    && <PortalResults/>}
        {tab==='notices'    && <PortalNotices/>}
      </div>
    </div>
  );
}

// ─── Main ExperienceLab Component ────────────────────────────────────────────
export default function ExperienceLab() {
  const [activeDemo, setActiveDemo] = useState<ActiveDemo>('lms');

  const railTabs: {id:ActiveDemo,icon:string,label:string,dot:string}[] = [
    {id:'lms',       icon:'🎓', label:'LMS Dashboard',    dot:'#E8622A'},
    {id:'animation', icon:'🎬', label:'Animation Studio', dot:'#C9A96E'},
    {id:'portal',    icon:'🏫', label:'School Portal',    dot:'#10B99B'},
  ];

  const FEATURES = [
    {num:'3+',  color:'var(--fire)',   title:'Solution Types',  text:'LMS, portals, animations — all custom built for your institution'},
    {num:'3',   color:'var(--bronze)', title:'Languages',       text:'English, Urdu, Arabic with full RTL support from day one'},
    {num:'30',  color:'var(--ivory)',  title:'Day Delivery',    text:'From brief to deployment in 30 days, with training included'},
    {num:'∞',   color:'#10B981',      title:'Customizable',    text:'Every demo above becomes yours — your name, colors, data'},
  ];

  return (
    <motion.section
      initial={{opacity:0}}
      whileInView={{opacity:1}}
      viewport={{once:true,margin:'-100px'}}
      transition={{duration:.6,ease:'easeOut'}}
      style={{padding:'120px 5% 100px',backgroundColor:'var(--surface)',borderTop:'1px solid #1a1a1a'}}
    >
      <style dangerouslySetInnerHTML={{__html:KEYFRAMES}}/>
      {/* ── CSS variables shim for demos ── */}
      <style dangerouslySetInnerHTML={{__html:`
        :root {
          --fire-dim: rgba(232,98,42,0.12);
          --muted: #6B6560;
          --ivory: #F0EBE3;
          --card: #161616;
          --surface: #0f0f0f;
        }
      `}}/>

      <div style={{maxWidth:1400,margin:'0 auto'}}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.5}}
          style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:72,flexWrap:'wrap',gap:40}}
        >
          {/* Left */}
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <div style={{width:32,height:1,background:'var(--bronze)'}}/>
              <span style={{fontFamily:'var(--font-accent)',fontSize:12,color:'var(--bronze)',letterSpacing:'0.3em'}}>02 — EXPERIENCE OUR WORK</span>
            </div>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(38px,5vw,76px)',color:'var(--ivory)',lineHeight:1,letterSpacing:'-0.02em',margin:0}}>
              Don&apos;t Take<br/>Our Word.<br/><em style={{color:'var(--fire)'}}>Try It.</em>
            </h2>
          </div>
          {/* Right */}
          <div style={{maxWidth:340}}>
            <p style={{fontFamily:'var(--font-body)',fontSize:15,color:'var(--muted)',lineHeight:1.75,margin:'0 0 16px'}}>
              Every solution below is live and interactive. Click through dashboards, explore portals, watch animations. This is exactly what we build for your institution.
            </p>
            <div style={{display:'inline-flex',gap:7,alignItems:'center',background:'var(--fire-dim)',border:'1px solid rgba(232,98,42,.3)',padding:'6px 14px'}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'var(--fire)',animation:'elabPulseOrb 2s infinite'}}/>
              <span style={{fontFamily:'var(--font-ui)',fontWeight:500,fontSize:11,color:'var(--fire)',letterSpacing:'0.1em',textTransform:'uppercase'}}>ALL DEMOS FULLY INTERACTIVE</span>
            </div>
          </div>
        </motion.div>

        {/* ── Rail + Stage ── */}
        <motion.div
          initial={{y:60,opacity:0}}
          whileInView={{y:0,opacity:1}}
          viewport={{once:true}}
          transition={{duration:.8,delay:.2,ease:'easeOut'}}
        >
          {/* Rail */}
          <div className="elab-scroll" style={{display:'flex',gap:2,overflowX:'auto'}}>
            {railTabs.map(t=>(
              <button key={t.id} onClick={()=>setActiveDemo(t.id)}
                style={{
                  background:activeDemo===t.id?'var(--card)':'var(--surface)',
                  border:`1px solid ${activeDemo===t.id?'var(--fire)':'#222'}`,
                  borderBottom:activeDemo===t.id?`1px solid var(--card)`:'1px solid #222',
                  padding:'12px 24px',fontFamily:'var(--font-ui)',fontWeight:500,fontSize:13,
                  color:activeDemo===t.id?'var(--ivory)':'var(--muted)',
                  display:'flex',alignItems:'center',gap:10,whiteSpace:'nowrap',cursor:'pointer',
                  transition:'all .2s ease',position:'relative',zIndex:activeDemo===t.id?2:1,
                  marginBottom:activeDemo===t.id?-1:0,
                }}
                onMouseEnter={e=>{if(activeDemo!==t.id){e.currentTarget.style.color='var(--ivory)';e.currentTarget.style.borderColor='#333';}}}
                onMouseLeave={e=>{if(activeDemo!==t.id){e.currentTarget.style.color='var(--muted)';e.currentTarget.style.borderColor='#222';}}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:t.dot,opacity:activeDemo===t.id?1:.4}}/>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Stage */}
          <div style={{border:'1px solid #222',borderTop:'1px solid var(--fire)',background:'var(--card)',position:'relative',overflow:'hidden',minHeight:600}}>
            {/* Toolbar */}
            <div style={{height:44,background:'var(--surface)',borderBottom:'1px solid #222',padding:'0 20px',display:'flex',alignItems:'center',gap:16}}>
              <div style={{display:'flex',gap:6}}>
                {['#FF5F57','#FFBD2E','#28CA41'].map(c=>(
                  <div key={c} style={{width:10,height:10,borderRadius:'50%',background:c}}/>
                ))}
              </div>
              <div style={{flex:1,maxWidth:380,background:'var(--card)',border:'1px solid #222',borderRadius:3,padding:'5px 12px',display:'flex',alignItems:'center',gap:7,fontFamily:'var(--font-body)',fontSize:11,color:'var(--muted)'}}>
                <span>🔒</span>
                <span>{DEMO_URLS[activeDemo]}</span>
              </div>
              <div style={{fontFamily:'var(--font-accent)',fontSize:11,letterSpacing:'0.2em',color:'var(--bronze)',marginLeft:'auto'}}>{DEMO_TAGS[activeDemo]}</div>
            </div>
            {/* Panels */}
            <div key={activeDemo} className="elab-fadein">
              {activeDemo==='lms'       && <LmsDemo/>}
              {activeDemo==='animation' && <AnimationDemo/>}
              {activeDemo==='portal'    && <PortalDemo/>}
            </div>
          </div>
        </motion.div>

        {/* ── Features Row ── */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2,marginTop:2}}>
          {FEATURES.map(f=>(
            <div key={f.title}
              style={{background:'var(--surface)',border:'1px solid #222',padding:'24px 20px',transition:'border-color .2s'}}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--fire)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='#222')}>
              <div style={{fontFamily:'var(--font-accent)',fontSize:36,color:f.color,lineHeight:1,marginBottom:6}}>{f.num}</div>
              <div style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:13,color:'var(--ivory)',marginBottom:5}}>{f.title}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--muted)',lineHeight:1.6}}>{f.text}</div>
            </div>
          ))}
        </div>

        {/* ── CTA Row ── */}
        <div style={{marginTop:48,padding:40,background:'var(--surface)',border:'1px solid #222',display:'flex',alignItems:'center',justifyContent:'space-between',gap:40,flexWrap:'wrap'}}>
          <div>
            <div style={{fontFamily:'var(--font-accent)',fontSize:11,color:'var(--bronze)',letterSpacing:'0.25em',marginBottom:10}}>READY TO START?</div>
            <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:28,color:'var(--ivory)',lineHeight:1.2,margin:'0 0 8px'}}>
              Want this built<br/><em style={{color:'var(--fire)'}}>for your institution?</em>
            </h3>
            <p style={{fontFamily:'var(--font-body)',fontSize:12,color:'var(--muted)',margin:0}}>
              We&apos;ll rebuild any demo above with your school&apos;s data — completely free.
            </p>
          </div>
          <Link href="/contact" data-cursor="cta"
            style={{flexShrink:0,display:'inline-flex',alignItems:'center',gap:10,background:'var(--fire)',color:'white',padding:'14px 32px',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:14,textDecoration:'none',transition:'background .2s',border:'none'}}
            onMouseEnter={(e)=>(e.currentTarget.style.background='#d45520')}
            onMouseLeave={(e)=>(e.currentTarget.style.background='var(--fire)')}>
            Request Your Custom Demo <span style={{display:'inline-block',transition:'transform .2s'}}>→</span>
          </Link>
        </div>

      </div>
    </motion.section>
  );
}
