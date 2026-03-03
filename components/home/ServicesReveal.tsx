'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ─── Keyframes ────────────────────────────────────────────────────────────────
const KF = `
@keyframes srOrbit{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes srSunPulse{0%,100%{box-shadow:0 0 20px rgba(255,200,0,.7)}50%{box-shadow:0 0 45px rgba(255,200,0,1)}}
@keyframes srTwinkle{0%,100%{opacity:.7}50%{opacity:.1}}
@keyframes srBarFill{from{width:0}}
@keyframes srMktBar{from{width:0%}}
@keyframes srFadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
`;

// ─── Tiny Mock Components (CSS-only inside cards) ─────────────────────────────

function MockLMS() {
  return (
    <div style={{background:'#0a0a0a',border:'1px solid #1f1f1f',width:'100%',fontSize:0,overflow:'hidden'}}>
      <div style={{background:'#080808',borderBottom:'1px solid #1a1a1a',padding:'8px 12px',display:'flex',alignItems:'center',gap:8}}>
        {['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} style={{width:7,height:7,borderRadius:'50%',background:c}}/>)}
        <div style={{marginLeft:8,fontFamily:'var(--font-ui)',fontSize:9,color:'#4a4540'}}>EduConnect LMS — Powered by Cubico</div>
      </div>
      <div style={{display:'flex'}}>
        {/* Sidebar */}
        <div style={{width:44,background:'#060606',borderRight:'1px solid #1a1a1a',padding:'10px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
          {[{i:'⊞',on:true},{i:'📚'},{i:'👥'},{i:'📊'},{i:'📅'}].map((b,idx)=>(
            <div key={idx} style={{width:22,height:22,borderRadius:2,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,background:b.on?'rgba(232,98,42,.12)':'#111',border:b.on?'1px solid rgba(232,98,42,.3)':'none'}}>{b.i}</div>
          ))}
        </div>
        {/* Main */}
        <div style={{flex:1,padding:12,display:'flex',flexDirection:'column',gap:8}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:11,color:'#F0EBE3',marginBottom:2,fontStyle:'italic'}}>Good morning, Principal Ahmed</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5}}>
            {[{n:'847',l:'Students',c:'#E8622A'},{n:'24',l:'Courses',c:'#C9A96E'},{n:'94%',l:'Attend.',c:'#10B981'}].map(s=>(
              <div key={s.l} style={{background:'#171717',border:'1px solid #1f1f1f',padding:6,textAlign:'center'}}>
                <div style={{fontFamily:'var(--font-accent)',fontSize:14,color:s.c}}>{s.n}</div>
                <div style={{fontFamily:'var(--font-body)',fontSize:8,color:'#6a6460',letterSpacing:'0.05em'}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            {[{n:'Mathematics G9',p:68},{n:'Islamic Studies',p:45},{n:'Computer Science',p:82},{n:'Urdu Literature',p:55}].map(c=>(
              <div key={c.n} style={{background:'#171717',border:'1px solid #1f1f1f',padding:'5px 7px',display:'flex',alignItems:'center',gap:7}}>
                <div style={{fontFamily:'var(--font-body)',fontSize:9,color:'#c8c2ba',flex:1}}>{c.n}</div>
                <div style={{flex:1,height:2,background:'#2a2a2a',borderRadius:1,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${c.p}%`,background:'linear-gradient(90deg,#E8622A,#C9A96E)',animation:'srBarFill 1.2s ease forwards'}}/>
                </div>
                <div style={{fontFamily:'var(--font-body)',fontSize:8,color:'#6a6460',width:22,textAlign:'right'}}>{c.p}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const STARS = Array.from({length:36},(_,i)=>({x:(i*73+17)%100,y:(i*53+31)%100,s:i%3===0?1.8:.8,d:2+((i*7)%4)}));

function MockOrbit() {
  return (
    <div style={{background:'radial-gradient(ellipse at 40% 50%,#0c0c20,#050508)',border:'1px solid #1f1f1f',position:'relative',overflow:'hidden',height:200,display:'flex',alignItems:'center',justifyContent:'center'}}>
      {STARS.map((s,i)=>(
        <div key={i} style={{position:'absolute',left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,borderRadius:'50%',background:'white',animation:`srTwinkle ${s.d}s ease-in-out infinite`,animationDelay:`${(i*.3)%5}s`,opacity:.5}}/>
      ))}
      <div style={{position:'relative',width:130,height:130}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:22,height:22,borderRadius:'50%',background:'radial-gradient(#ffe168,#ff9200)',animation:'srSunPulse 2.5s ease-in-out infinite',zIndex:5}}/>
        {[{d:56,sp:'3s',ps:7,pc:'#C2956C'},{d:90,sp:'7s',ps:10,pc:'#4B8FE2',glow:'0 0 6px rgba(75,143,226,.7)'},{d:126,sp:'13s',ps:8,pc:'#D4714A'}].map((o,i)=>(
          <div key={i} style={{position:'absolute',top:'50%',left:'50%',width:o.d,height:o.d,border:'1px solid rgba(255,255,255,.08)',borderRadius:'50%',transform:'translate(-50%,-50%)',animation:`srOrbit ${o.sp} linear infinite`}}>
            <div style={{position:'absolute',top:-(o.ps/2),left:'50%',transform:'translateX(-50%)',width:o.ps,height:o.ps,borderRadius:'50%',background:o.pc,boxShadow:(o as {glow?:string}).glow||'none'}}/>
          </div>
        ))}
      </div>
      <div style={{position:'absolute',bottom:10,left:12,fontFamily:'var(--font-ui)',fontSize:9,color:'#4a4540',letterSpacing:'0.12em',textTransform:'uppercase'}}>Live CSS preview</div>
    </div>
  );
}

function MockWebsite() {
  return (
    <div style={{background:'#0a0a0a',border:'1px solid #1f1f1f',overflow:'hidden'}}>
      <div style={{background:'#060606',borderBottom:'1px solid #1a1a1a',padding:'5px 10px',display:'flex',alignItems:'center',gap:5}}>
        {['#FF5F57','#FFBD2E','#28CA41'].map(c=><div key={c} style={{width:6,height:6,borderRadius:'50%',background:c}}/>)}
        <div style={{marginLeft:8,flex:1,background:'#171717',border:'1px solid #1a1a1a',padding:'2px 6px',fontFamily:'var(--font-body)',fontSize:8,color:'#6a6460'}}>🔒 al-noor-academy.edu.pk</div>
      </div>
      <div style={{width:'100%',height:72,backgroundImage:"url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=50')",backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(.45) saturate(.7)'}}/>
      <div style={{background:'#171717',padding:8,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:4}}>
        {[{t:'📋 Admissions',d:'2026–27 open'},{t:'📅 Events',d:'Sports Day: Mar 15'},{t:'💳 Pay Fees',d:'JazzCash · EasyPaisa'}].map(w=>(
          <div key={w.t} style={{background:'#0a0a0a',border:'1px solid #1a1a1a',borderLeft:'2px solid #E8622A',padding:'5px 6px'}}>
            <div style={{fontFamily:'var(--font-ui)',fontWeight:600,fontSize:8,color:'#F0EBE3',marginBottom:2}}>{w.t}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:7,color:'#6a6460'}}>{w.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockERP() {
  return (
    <div style={{background:'#0a0a0a',border:'1px solid #1f1f1f',overflow:'hidden'}}>
      <div style={{background:'#060606',borderBottom:'1px solid #1a1a1a',padding:'6px 10px',display:'flex',alignItems:'center',gap:10}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:10,color:'#E8622A',fontWeight:700,fontStyle:'italic'}}>SchoolOS</div>
        <div style={{display:'flex',gap:10}}>
          {['Dashboard','Students','Fees'].map((n,i)=>(
            <span key={n} style={{fontFamily:'var(--font-ui)',fontSize:8,color:i===0?'#F0EBE3':'#6a6460'}}>{n}</span>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,padding:8}}>
        {[{n:'847',l:'Students',c:'#E8622A'},{n:'94%',l:'Present Today',c:'#10B981'},{n:'2.4M',l:'Fees Due (Rs.)',c:'#C9A96E'},{n:'12',l:'Overdue',c:'#e05c8a'}].map(s=>(
          <div key={s.l} style={{background:'#171717',border:'1px solid #1a1a1a',padding:7}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:18,lineHeight:1,color:s.c}}>{s.n}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:8,color:'#6a6460'}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{padding:'0 8px 8px',display:'flex',flexDirection:'column',gap:3}}>
        {[{c:'#10B981',n:'Ahmed K. — fee paid',t:'9:14am'},{c:'#E8622A',n:'Bilal A. — absent',t:'8:30am'},{c:'#C9A96E',n:'New admission submitted',t:'8:12am'}].map(r=>(
          <div key={r.n} style={{display:'flex',alignItems:'center',gap:6,padding:'4px 0',borderBottom:'1px solid #1a1a1a'}}>
            <div style={{width:5,height:5,borderRadius:'50%',background:r.c,flexShrink:0}}/>
            <div style={{fontFamily:'var(--font-body)',fontSize:9,color:'#c8c2ba',flex:1}}>{r.n}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:8,color:'#6a6460'}}>{r.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockContent() {
  return (
    <div style={{background:'#0a0a0a',border:'1px solid #1f1f1f',overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'#1a1a1a'}}>
        {[
          {head:'بِسۡمِ ٱللَّهِ',hs:{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:18,color:'#C9A96E'},sub:'Islamic Studies · G6',pct:72,pc:'#C9A96E'},
          {head:'Mathematics',hs:{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:14,color:'#F0EBE3'},sub:'Algebra — Chapter 7',pct:45,pc:'#E8622A'},
          {head:'O Level',hs:{fontFamily:'var(--font-accent)',fontSize:22,color:'#E8622A'},sub:'Cambridge Biology 5090',pct:88,pc:'#10B981'},
          {head:'BOARDS',hs:{fontFamily:'var(--font-accent)',fontSize:11,color:'#6a6460',letterSpacing:'.15em'},sub:'Cambridge · Matric · Islamic',pct:0,pc:'',plain:true},
        ].map((c,i)=>(
          <div key={i} style={{background:'#171717',padding:'10px 12px',display:'flex',flexDirection:'column',gap:6}}>
            <div style={c.hs}>{c.head}</div>
            <div style={{fontFamily:'var(--font-body)',fontSize:8,color:'#6a6460'}}>{c.sub}</div>
            {!c.plain && <div style={{height:2,background:'#2a2a2a',borderRadius:1,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${c.pct}%`,background:c.pc,animation:'srBarFill 1.2s ease forwards'}}/>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MockMarketing() {
  const rows = [
    [{n:'340%',c:'#E8622A',l:'Inquiry Uplift',p:85},{n:'4.2×',c:'#C9A96E',l:'Meta ROAS',p:72},{n:'#1',c:'#10B981',l:'Google Rank',p:95}],
    [{n:'12K',c:'#6c8eef',l:'Monthly Reach',p:58},{n:'₨180',c:'#c8c2ba',l:'Cost Per Lead',p:38},{n:'89%',c:'#e05c8a',l:'Retention Rate',p:89}],
  ];
  return (
    <div style={{background:'#1a1a1a',border:'1px solid #1f1f1f',overflow:'hidden',display:'flex',flexDirection:'column',gap:1}}>
      {rows.map((row,ri)=>(
        <div key={ri} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,background:'#1a1a1a'}}>
          {row.map(c=>(
            <div key={c.l} style={{background:'#171717',padding:'10px 8px',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
              <div style={{fontFamily:'var(--font-accent)',fontSize:20,lineHeight:1,color:c.c}}>{c.n}</div>
              <div style={{fontFamily:'var(--font-ui)',fontSize:7,color:'#6a6460',textAlign:'center',textTransform:'uppercase',letterSpacing:'.08em'}}>{c.l}</div>
              <div style={{width:'100%',height:2,background:'#2a2a2a',borderRadius:1,overflow:'hidden',marginTop:3}}>
                <div style={{height:'100%',width:`${c.p}%`,background:c.c,animation:'srMktBar 1.5s ease forwards'}}/>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
interface CardData {
  num: string; title: string;
  outcome: [string, string, string]; // [prefix, ghost, fire]
  proof: string; proofLabel: string;
  features: string[];
  tags: string[];
  mock: React.ReactNode;
  wide?: boolean;
  mockRight?: boolean; // for wide cards — put mock in right column
}

function ServiceCard({ card, style }: { card: CardData; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#050505',
        position: 'relative',
        overflow: 'hidden',
        padding: card.wide && card.mockRight ? 0 : '44px 48px 40px',
        minHeight: 480,
        display: 'flex',
        flexDirection: 'column',
        transition: 'background .3s ease',
        ...style,
      }}
    >
      {/* Ember wash */}
      <div style={{position:'absolute',inset:0,background:'rgba(232,98,42,0.1)',opacity:hov?1:0,transition:'opacity .35s ease',pointerEvents:'none',zIndex:0}}/>
      {/* Fire border draw */}
      <div style={{position:'absolute',top:0,left:0,width:2,height:hov?'100%':'0%',background:'linear-gradient(180deg,#E8622A,#C9A96E)',transition:'height .45s cubic-bezier(.16,1,.3,1)',zIndex:2}}/>

      {card.wide && card.mockRight ? (
        /* Wide card: 2-col inner layout */
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,height:'100%',padding:'44px 48px 40px',position:'relative',zIndex:1}}>
          {/* Left */}
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:13,letterSpacing:'.3em',marginBottom:32,transition:'color .25s',color:hov?'#E8622A':'#3a3530'}}>{card.num}</div>
            <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(20px,2.6vw,34px)',lineHeight:1.08,letterSpacing:'-.02em',color:'#F0EBE3',marginBottom:20,flex:'0 0 auto'}}>
              {card.outcome[0]}<br/>
              <span style={{fontStyle:'italic',fontWeight:300,color:'#C9A96E'}}>{card.outcome[1]}</span><br/>
              <span style={{color:'#E8622A'}}>{card.outcome[2]}</span>
            </div>
            <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:20}}>
              <div style={{fontFamily:'var(--font-accent)',fontSize:'clamp(44px,5.5vw,72px)',lineHeight:1,color:'#E8622A',transition:'transform .3s ease',transform:hov?'scale(1.06)':'scale(1)'}}>{card.proof}</div>
              <div style={{fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#6a6460',maxWidth:120,lineHeight:1.4}}>{card.proofLabel}</div>
            </div>
            <ul style={{listStyle:'none',padding:0,margin:'0 0 auto',display:'flex',flexDirection:'column',gap:6}}>
              {card.features.map(f=>(
                <li key={f} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:12.5,color:'#c8c2ba',lineHeight:1.5}}>
                  <div style={{width:4,height:4,borderRadius:'50%',background:'#E8622A',flexShrink:0,marginTop:6}}/>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:20,borderTop:'1px solid #1f1f1f',marginTop:24}}>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                {card.tags.map(t=>(
                  <span key={t} style={{fontFamily:'var(--font-ui)',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',padding:'3px 7px',border:'1px solid',borderColor:hov?'#3a3530':'#2a2a2a',color:hov?'#6a6460':'#3a3530',transition:'all .2s'}}>{t}</span>
                ))}
              </div>
              <div style={{fontFamily:'var(--font-ui)',fontWeight:700,fontSize:18,color:hov?'#E8622A':'#3a3530',transform:hov?'translate(4px,-4px)':'translate(0,0)',transition:'transform .25s ease,color .25s'}}>↗</div>
            </div>
          </div>
          {/* Right — mock always visible in wide cards */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            {card.mock}
          </div>
        </div>
      ) : (
        /* Normal card */
        <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',height:'100%'}}>
          <div style={{fontFamily:'var(--font-accent)',fontSize:13,letterSpacing:'.3em',marginBottom:32,color:hov?'#E8622A':'#3a3530',transition:'color .25s'}}>{card.num}</div>
          <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(20px,2.6vw,34px)',lineHeight:1.08,letterSpacing:'-.02em',color:'#F0EBE3',marginBottom:20,flex:'0 0 auto'}}>
            {card.outcome[0]}<br/>
            <span style={{fontStyle:'italic',fontWeight:300,color:'#C9A96E'}}>{card.outcome[1]}</span><br/>
            <span style={{color:'#E8622A'}}>{card.outcome[2]}</span>
          </div>
          <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:20}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:'clamp(44px,5.5vw,72px)',lineHeight:1,color:'#E8622A',transition:'transform .3s ease',transform:hov?'scale(1.06)':'scale(1)'}}>{card.proof}</div>
            <div style={{fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#6a6460',maxWidth:120,lineHeight:1.4}}>{card.proofLabel}</div>
          </div>
          <ul style={{listStyle:'none',padding:0,margin:'0 0 auto',display:'flex',flexDirection:'column',gap:6}}>
            {card.features.map(f=>(
              <li key={f} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:12.5,color:'#c8c2ba',lineHeight:1.5}}>
                <div style={{width:4,height:4,borderRadius:'50%',background:'#E8622A',flexShrink:0,marginTop:6}}/>
                {f}
              </li>
            ))}
          </ul>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:20,borderTop:'1px solid #1f1f1f',marginTop:24}}>
            <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
              {card.tags.map(t=>(
                <span key={t} style={{fontFamily:'var(--font-ui)',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',padding:'3px 7px',border:'1px solid',borderColor:hov?'#3a3530':'#2a2a2a',color:hov?'#6a6460':'#3a3530',transition:'all .2s'}}>{t}</span>
              ))}
            </div>
            <div style={{fontFamily:'var(--font-ui)',fontWeight:700,fontSize:18,color:hov?'#E8622A':'#3a3530',transform:hov?'translate(4px,-4px)':'translate(0,0)',transition:'transform .25s ease,color .25s'}}>↗</div>
          </div>
          {/* Hover mock */}
          <div style={{position:'absolute',right:-10,bottom:-10,width:'52%',pointerEvents:'none',opacity:hov?1:0,transform:hov?'translate(0,0) scale(1)':'translate(20px,20px) scale(.96)',transition:'opacity .45s ease,transform .45s cubic-bezier(.16,1,.3,1)',zIndex:3}}>
            {card.mock}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Card Data ────────────────────────────────────────────────────────────────
const CARDS: (CardData & {span?: 2|3})[] = [
  {
    num: '01 / LMS & E-LEARNING', wide: true, mockRight: true, span: 2,
    outcome: ['Your school runs', 'its own', 'Netflix for learning.'],
    proof: '50+', proofLabel: 'LMS platforms deployed',
    features: [
      'Complete Moodle setup — branded, RTL-ready, mobile app included',
      'SCORM courses, H5P quizzes, auto-certificates, live classes via Zoom/BBB',
      'JazzCash · EasyPaisa · Stripe payment integration on enrolment',
      'Parent dashboards that keep families inside your ecosystem',
    ],
    tags: ['Moodle','SCORM','RTL Arabic','Canvas','H5P'],
    mock: <MockLMS/>,
  },
  {
    num: '02 / EDUCATIONAL ANIMATIONS',
    outcome: ['Your curriculum,', 'alive on', 'screen.'],
    proof: '2D+3D', proofLabel: 'production in-house',
    features: [
      '2D character series, 3D science animations, whiteboard explainers',
      'Voiced in English, Urdu & Arabic — professional studios',
      'Islamic content reviewed by scholars — zero human depictions in prophetic content',
      'SCORM-packaged for your LMS or MP4 for YouTube',
    ],
    tags: ['2D','3D','Motion','SCORM'],
    mock: <MockOrbit/>,
  },
  {
    num: '03 / WEBSITES & BRANDING',
    outcome: ['A website worth', 'applying', 'to.'],
    proof: '30', proofLabel: 'day delivery guaranteed',
    features: [
      'Premium Next.js & WordPress sites — fast, SEO-first, CMS-editable',
      'Online admissions, fee portals, virtual tours, news system',
      'Full brand identity — logo, colors, typography, stationery',
      'RTL Arabic & Urdu Nastaliq — madrassa and Islamic school specialists',
    ],
    tags: ['Next.js','Brand','RTL','SEO'],
    mock: <MockWebsite/>,
  },
  {
    num: '04 / SCHOOL ERP & APPS',
    outcome: ['Run your', 'entire school', 'from one screen.'],
    proof: '8', proofLabel: 'modules in one system',
    features: [
      'Admissions → fees → attendance → grades → results — full cycle',
      'iOS & Android apps for students, parents, teachers, admin',
      'WhatsApp automation — fee alerts, exam schedules, absent notifications',
      'Zakat & sponsor portals for Islamic schools and madrassas',
    ],
    tags: ['ERP','iOS','Android','WhatsApp'],
    mock: <MockERP/>,
  },
  {
    num: '05 / CONTENT & CURRICULUM',
    outcome: ['Textbooks that', 'students', 'actually open.'],
    proof: '4', proofLabel: 'board standards supported',
    features: [
      'Interactive e-books, SCORM modules, H5P assessments',
      'Cambridge IGCSE · Pakistani Matric · Islamic / Madrassa curriculum',
      'Scholar-reviewed Islamic content — Quran, Hadith, Seerah in 3 languages',
      'Teacher training & CPD programmes included',
    ],
    tags: ['E-Books','SCORM','Islamic','Cambridge'],
    mock: <MockContent/>,
  },
  {
    num: '06 / DIGITAL MARKETING', wide: true, mockRight: true, span: 2,
    outcome: ['Fill your', 'classrooms.', 'Every intake.'],
    proof: '340%', proofLabel: 'average inquiry increase in admissions season',
    features: [
      'Google & Meta Ads timed to your admissions calendar — measured by actual enrolments',
      'Social media management — designed posts, Reels, event coverage monthly',
      'WhatsApp broadcast campaigns that convert inquiries into visits',
      'Multilingual SEO in English, Urdu & Arabic — rank where parents search',
    ],
    tags: ['Google Ads','Meta Ads','WhatsApp','SEO','Social'],
    mock: <MockMarketing/>,
  },
];

const IMPACT = [
  {n:'50+', c:'#E8622A', l:'Projects Delivered',    s:'Pakistan · GCC · UK'},
  {n:'6',   c:'#C9A96E', l:'Disciplines',             s:'One team, zero handoffs'},
  {n:'3',   c:'#F0EBE3', l:'Languages',               s:'English · اردو · العربية'},
  {n:'30',  c:'#E8622A', l:'Day Delivery',            s:'Standard projects, guaranteed'},
  {n:'100%',c:'#C9A96E', l:'Custom Built',            s:'No templates. Ever.'},
];

const DIFFERENTIATORS = [
  'English · اردو · العربية — native speakers',
  'Islamic content by qualified scholars',
  'JazzCash · EasyPaisa natively integrated',
  '30-day delivery on standard projects',
  'Post-launch support and maintenance',
  'Free digital audit for new clients',
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServicesReveal() {
  return (
    <section style={{background:'#050505',position:'relative',overflow:'hidden',paddingTop:130}}>
      <style dangerouslySetInnerHTML={{__html:KF}}/>

      {/* Grain texture */}
      <div aria-hidden="true" style={{position:'absolute',inset:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.022'/%3E%3C/svg%3E\")",pointerEvents:'none',zIndex:0}}/>

      {/* ── Top Header ── */}
      <motion.div
        initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
        viewport={{once:true,margin:'-80px'}} transition={{duration:.6,ease:'easeOut'}}
        style={{maxWidth:1440,margin:'0 auto',padding:'0 6%',position:'relative',zIndex:1}}
      >
        <div style={{display:'grid',gridTemplateColumns:'1fr auto',alignItems:'flex-end',gap:40,paddingBottom:72,borderBottom:'1px solid #1f1f1f'}}>
          <div>
            <div style={{fontFamily:'var(--font-accent)',fontSize:11,letterSpacing:'.4em',color:'#C9A96E',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
              <span style={{display:'inline-block',width:28,height:1,background:'#C9A96E'}}/>
              01 — WHAT WE BUILD
            </div>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:900,fontSize:'clamp(52px,7vw,100px)',lineHeight:.92,letterSpacing:'-.035em',color:'#F0EBE3',margin:0}}>
              Your institution.<br/>
              <span style={{fontStyle:'italic',fontWeight:300,color:'#C9A96E'}}>Completely</span><br/>
              <span style={{color:'#E8622A'}}>digital.</span>
            </h2>
          </div>
          <div style={{textAlign:'right',maxWidth:360,paddingBottom:8}}>
            <p style={{fontFamily:'var(--font-body)',fontSize:14,lineHeight:1.75,color:'#6a6460',marginBottom:20}}>
              Six disciplines. One team. Every digital need an educational institution has — handled. We don&apos;t subcontract. We don&apos;t use templates. We build.
            </p>
            <Link href="/contact" data-cursor="cta"
              style={{display:'inline-flex',alignItems:'center',gap:10,background:'#E8622A',color:'white',padding:'13px 28px',fontFamily:'var(--font-ui)',fontSize:13,fontWeight:700,textDecoration:'none',transition:'background .2s'}}
              onMouseEnter={e=>(e.currentTarget.style.background='#cf5020')}
              onMouseLeave={e=>(e.currentTarget.style.background='#E8622A')}>
              See how we work <span>→</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Services Grid (bleeds full width) ── */}
      <div style={{position:'relative',zIndex:1}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr 1fr',
          gap:1,
          background:'#1f1f1f',
          borderTop:'1px solid #1f1f1f',
        }}>
          {/* LMS - wide (cols 1-2) */}
          <ServiceCard card={CARDS[0]} style={{gridColumn:'span 2'}}/>
          {/* Animation - col 3 */}
          <ServiceCard card={CARDS[1]}/>
          {/* Website, ERP, Content - row 2 */}
          <ServiceCard card={CARDS[2]}/>
          <ServiceCard card={CARDS[3]}/>
          <ServiceCard card={CARDS[4]}/>
          {/* Marketing - wide (cols 1-2, row 3) */}
          <ServiceCard card={CARDS[5]} style={{gridColumn:'span 2'}}/>
          {/* Empty col 3 row 3 - decorative stat block */}
          <div style={{background:'#050505',padding:'44px 48px 40px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',gap:24}}>
            <div style={{fontFamily:'var(--font-accent)',fontSize:11,letterSpacing:'.3em',color:'#3a3530'}}>THE EDGE</div>
            {['One agency.','Zero handoffs.','Six disciplines.','In-house.'].map((t,i)=>(
              <div key={t} style={{fontFamily:'var(--font-display)',fontSize:'clamp(18px,2vw,26px)',fontWeight:i%2===0?700:300,fontStyle:i%2===1?'italic':'normal',color:i%2===0?'#F0EBE3':'#C9A96E',lineHeight:1}}>{t}</div>
            ))}
            <div style={{width:'100%',height:1,background:'#1f1f1f',marginTop:8}}/>
            <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#6a6460',lineHeight:1.7}}>Every other agency makes you manage 4 vendors. We handle everything under one roof.</div>
          </div>

          {/* Full-width differentiator strip */}
          <div style={{gridColumn:'span 3',background:'#0a0a0a',borderTop:'2px solid #E8622A',padding:48}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:48,alignItems:'center',maxWidth:1440,margin:'0 auto'}}>
              <div>
                <div style={{fontFamily:'var(--font-accent)',fontSize:11,letterSpacing:'.3em',color:'#C9A96E',marginBottom:12}}>THE DIFFERENCE</div>
                <div style={{fontFamily:'var(--font-display)',fontSize:'clamp(20px,2.5vw,32px)',fontWeight:700,lineHeight:1.15,color:'#F0EBE3'}}>
                  One team.<br/><em style={{fontWeight:300,color:'#C9A96E'}}>Everything</em><br/>handled.
                </div>
              </div>
              <div style={{fontFamily:'var(--font-body)',fontSize:13,color:'#6a6460',lineHeight:1.75}}>
                Every other agency makes you manage 4 vendors — a developer, a designer, a content writer, a marketing agency. We do all six disciplines in-house. One brief. One invoice. One point of accountability.
              </div>
              {[DIFFERENTIATORS.slice(0,3), DIFFERENTIATORS.slice(3)].map((group,gi)=>(
                <div key={gi} style={{display:'flex',flexDirection:'column',gap:8}}>
                  {group.map(d=>(
                    <div key={d} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:'rgba(232,98,42,.1)',border:'1px solid rgba(232,98,42,.2)'}}>
                      <div style={{color:'#E8622A',fontSize:14,flexShrink:0}}>✓</div>
                      <div style={{fontFamily:'var(--font-body)',fontSize:12,color:'#F0EBE3'}}>{d}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Impact Strip ── */}
      <div style={{position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:1,background:'#1f1f1f',borderTop:'2px solid #E8622A'}}>
          {IMPACT.map((s,i)=>(
            <motion.div key={s.l}
              initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.5,delay:i*.07,ease:'easeOut'}}
              style={{background:'#0a0a0a',padding:'32px 36px',display:'flex',flexDirection:'column',gap:6}}
            >
              <div style={{fontFamily:'var(--font-accent)',fontSize:'clamp(36px,4.5vw,60px)',lineHeight:1,color:s.c}}>{s.n}</div>
              <div style={{fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'#6a6460'}}>{s.l}</div>
              <div style={{fontFamily:'var(--font-body)',fontSize:11.5,color:'#3a3530',lineHeight:1.5}}>{s.s}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div style={{background:'#0a0a0a',borderTop:'1px solid #1f1f1f',padding:'72px 6%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:60,flexWrap:'wrap',position:'relative',zIndex:1}}>
        <div>
          <div style={{fontFamily:'var(--font-accent)',fontSize:11,letterSpacing:'.35em',color:'#C9A96E',marginBottom:12}}>READY TO START?</div>
          <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(28px,4vw,54px)',lineHeight:1.05,letterSpacing:'-.025em',color:'#F0EBE3',margin:'0 0 10px'}}>
            One call.<br/><em style={{fontStyle:'italic',fontWeight:300,color:'#E8622A'}}>Everything</em> gets built.
          </h3>
          <p style={{fontFamily:'var(--font-body)',fontSize:13,color:'#6a6460',margin:0}}>We&apos;ll respond within 24 hours with a clear plan and honest pricing.</p>
        </div>
        <div style={{flexShrink:0,display:'flex',flexDirection:'column',gap:12,alignItems:'flex-end'}}>
          <Link href="/contact" data-cursor="cta"
            style={{display:'inline-flex',alignItems:'center',gap:10,background:'#E8622A',color:'white',padding:'15px 36px',fontFamily:'var(--font-ui)',fontSize:14,fontWeight:800,textDecoration:'none',letterSpacing:'.02em',transition:'background .2s'}}
            onMouseEnter={e=>(e.currentTarget.style.background='#cf5020')}
            onMouseLeave={e=>(e.currentTarget.style.background='#E8622A')}>
            Start Your Project <span>→</span>
          </Link>
          <div style={{fontFamily:'var(--font-ui)',fontSize:11,color:'#3a3530'}}>📍 Karachi · 💬 WhatsApp Available · ✉ info@cubico.tech</div>
        </div>
      </div>
    </section>
  );
}
