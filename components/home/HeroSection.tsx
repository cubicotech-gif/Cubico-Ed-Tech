"use client";


import { motion } from 'framer-motion';

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

const CHART_BARS = [65, 80, 55, 90, 75, 45, 85];
const CHART_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATS = [
  { label: 'Students',       value: '1,247', change: '+12%', color: '#4F46E5' },
  { label: 'Attendance',     value: '94.2%', change: '+3.1%', color: '#06D6A0' },
  { label: 'Parents Online', value: '89%',   change: '+18%', color: '#7C3AED' },
];

const NOTIFS = [
  { icon: '✅', title: 'Attendance Synced', sub: 'Grade 5-B · Just now' },
  { icon: '🎬', title: 'New Lesson Ready',  sub: 'Arabic Grammar Ch.4' },
];

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#060A15',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 72,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid dot background */}
      <div
        className="grid-dot-pattern"
        style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }}
      />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '-8%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        className="hero-two-col"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 5%', width: '100%' }}
      >
        {/* ── Left: Copy ─────────────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: 'rgba(79,70,229,0.12)',
              border: '1px solid rgba(79,70,229,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 32,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4F46E5', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500, color: '#818CF8', letterSpacing: '0.04em' }}>
              EdTech Solutions for Institutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5.5vw, 70px)',
              fontWeight: 700, lineHeight: 1.06,
              color: '#E2E8F0', margin: 0, marginBottom: 24,
              letterSpacing: '-0.025em',
            }}
          >
            Build an institution<br />
            <span style={{
              background: 'linear-gradient(135deg, #818CF8 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              ready for anything.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 18,
              color: '#64748B', lineHeight: 1.75,
              margin: 0, marginBottom: 44, maxWidth: 500,
            }}
          >
            Management systems, animated lessons, game-based learning, and digital transformation — one partner, every solution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 15,
                padding: '14px 28px', borderRadius: 8, textDecoration: 'none',
                boxShadow: '0 0 30px rgba(79,70,229,0.45)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 44px rgba(79,70,229,0.65)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(79,70,229,0.45)';
              }}
            >
              💬 Get a Free Consultation
            </a>
            <a
              href="#results"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: '#94A3B8', fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 15,
                padding: '14px 20px', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#E2E8F0';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              Learn more ↓
            </a>
          </motion.div>
        </div>

        {/* ── Right: Dashboard mockup ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block"
          style={{ position: 'relative' }}
        >
          <div style={{
            backgroundColor: '#0C1528',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 0 80px rgba(79,70,229,0.18), 0 32px 64px rgba(0,0,0,0.55)',
          }}>
            {/* Window bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              backgroundColor: '#0A1020',
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#4B5563' }}>Cubico Dashboard</span>
              <div style={{ width: 48 }} />
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: 16 }}>
              {STATS.map(stat => (
                <div key={stat.label} style={{
                  backgroundColor: '#101E32', borderRadius: 10, padding: '14px 12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#64748B', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{stat.label}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 22, fontWeight: 700, color: '#E2E8F0', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: stat.color, marginTop: 4 }}>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ padding: '0 16px 16px' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: '#64748B', marginBottom: 12, fontWeight: 500 }}>Weekly Engagement</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72 }}>
                {CHART_BARS.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: '100%',
                      height: Math.round((h / 100) * 58),
                      borderRadius: '4px 4px 0 0',
                      background: i === 3
                        ? 'linear-gradient(180deg, #818CF8, #4F46E5)'
                        : 'rgba(79,70,229,0.28)',
                    }} />
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#4B5563' }}>
                      {CHART_DAYS[i].slice(0, 1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8 }}>
              {NOTIFS.map(n => (
                <div key={n.title} style={{
                  flex: 1, backgroundColor: '#0A1020',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 8, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ fontSize: 18 }}>{n.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: '#E2E8F0' }}>{n.title}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#64748B', marginTop: 2 }}>{n.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: -20, borderRadius: 36, zIndex: -1,
            background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.25) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />
        </motion.div>
      </div>
    </section>
  );
}
