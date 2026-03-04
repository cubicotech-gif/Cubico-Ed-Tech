'use client';

import { useState } from 'react';

const PAGES = ['Home', 'About', 'Admissions', 'Academics', 'Fees'] as const;
type SitePage = typeof PAGES[number];

const inputStyle: React.CSSProperties = {
  background: '#f8f8f8',
  border: '1px solid #e0e0e0',
  padding: '6px 8px',
  borderRadius: 3,
  color: '#1a1a1a',
  fontSize: 10,
  fontFamily: 'sans-serif',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: 8,
  color: '#666',
  display: 'block',
  marginBottom: 3,
};

export function WebsiteApp() {
  const [page, setSitePage] = useState<SitePage>('Home');

  // Admissions form
  const [admForm, setAdmForm] = useState({ name: '', grade: '', contact: '', email: '' });
  const [admSubmitted, setAdmSubmitted] = useState<string | null>(null);
  const [admErrors, setAdmErrors] = useState<Record<string, string>>({});

  // Payment modal
  const [showModal, setShowModal] = useState(false);
  const [payMethod, setPayMethod] = useState<'card' | 'bank' | 'easypaisa'>('card');
  const [payDone, setPayDone] = useState(false);

  const handleAdmSubmit = () => {
    const errors: Record<string, string> = {};
    if (!admForm.name) errors.name = 'Required';
    if (!admForm.grade) errors.grade = 'Required';
    if (!admForm.contact) errors.contact = 'Required';
    if (!admForm.email) errors.email = 'Required';
    if (Object.keys(errors).length) { setAdmErrors(errors); return; }
    setAdmErrors({});
    const id = `REF-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    setAdmSubmitted(id);
    setTimeout(() => { setAdmSubmitted(null); setAdmForm({ name: '', grade: '', contact: '', email: '' }); }, 3500);
  };

  const handlePayment = () => {
    setPayDone(true);
    setTimeout(() => { setPayDone(false); setShowModal(false); }, 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff', fontFamily: 'sans-serif' }}>
      {/* Browser chrome */}
      <div style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: '#fff', border: '1px solid #ddd', borderRadius: 10, padding: '2px 8px', fontSize: 8, color: '#888', textAlign: 'center' }}>
          cubico.edu.pk
        </div>
      </div>

      {/* Site nav */}
      <div style={{ background: '#1a1a1a', display: 'flex', alignItems: 'center', padding: '0 12px', height: 32, flexShrink: 0, gap: 12 }}>
        <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 12, color: '#E8622A', marginRight: 8 }}>CubicoSchool</span>
        {PAGES.map((p) => (
          <button
            key={p}
            onClick={() => { setSitePage(p); setShowModal(false); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 8, padding: '2px 0',
              color: page === p ? '#E8622A' : '#aaa',
              borderBottom: page === p ? '1px solid #E8622A' : '1px solid transparent',
              transition: 'color 150ms',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Page content */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>

        {/* ── Home ── */}
        {page === 'Home' && (
          <div>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a0e 100%)', padding: '24px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#C9A96E', letterSpacing: '0.2em', marginBottom: 6 }}>EST. 2008 · KARACHI</div>
              <div style={{ fontFamily: 'serif', fontSize: 20, fontWeight: 700, color: '#F0EBE3', lineHeight: 1.2, marginBottom: 8 }}>
                Excellence in<br />Islamic Education
              </div>
              <div style={{ fontSize: 9, color: '#6A6460', marginBottom: 12 }}>Nurturing minds, building futures since 2008</div>
              <button
                onClick={() => setSitePage('Admissions')}
                style={{ background: '#E8622A', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: 3, cursor: 'pointer', fontSize: 9, fontWeight: 700 }}
              >
                Apply Now →
              </button>
            </div>
            {/* Feature cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#e0e0e0', margin: '1px 0' }}>
              {[
                { icon: '📚', title: 'O/A Levels', desc: 'Cambridge certified curriculum' },
                { icon: '🕌', title: 'Islamic Values', desc: 'Quran & character development' },
                { icon: '💻', title: 'Digital Labs', desc: 'Modern computer facilities' },
              ].map((f) => (
                <div key={f.title} style={{ background: '#fff', padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{f.icon}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 8, color: '#888' }}>{f.desc}</div>
                </div>
              ))}
            </div>
            {/* News strip */}
            <div style={{ padding: '8px 12px' }}>
              <div style={{ fontSize: 8, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Latest News</div>
              {['Annual Science Fair — March 15', 'Parent-Teacher Meeting — March 20', 'Admissions Open for 2026–27'].map((n) => (
                <div key={n} style={{ fontSize: 9, color: '#1a1a1a', padding: '3px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#E8622A', fontSize: 6 }}>●</span> {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── About ── */}
        {page === 'About' && (
          <div style={{ padding: 16 }}>
            <div style={{ fontFamily: 'serif', fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>About Our School</div>
            <div style={{ fontSize: 9, color: '#555', lineHeight: 1.7, marginBottom: 12 }}>
              Founded in 2008, our institution has been a beacon of quality education in Karachi, combining rigorous academic standards with strong Islamic values.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
              {[
                { label: 'Students Enrolled', value: '1,200+', color: '#E8622A' },
                { label: 'Years of Excellence', value: '18', color: '#C9A96E' },
                { label: 'Qualified Teachers', value: '65', color: '#10B981' },
                { label: 'A-Level Pass Rate', value: '96%', color: '#8B5CF6' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '10px', borderRadius: 3, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: 'serif' }}>{s.value}</div>
                  <div style={{ fontSize: 8, color: '#888', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Admissions ── */}
        {page === 'Admissions' && (
          <div style={{ padding: 16 }}>
            <div style={{ fontFamily: 'serif', fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Apply for Admission</div>
            <div style={{ fontSize: 9, color: '#888', marginBottom: 12 }}>Session 2026–27 applications are now open</div>

            {admSubmitted && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '8px 10px', borderRadius: 3, marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: '#166534', marginBottom: 2 }}>✓ Application submitted successfully!</div>
                <div style={{ fontSize: 10, color: '#15803d', fontWeight: 700 }}>Reference: {admSubmitted}</div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              {[
                { field: 'name', label: "Student's Full Name", placeholder: 'Enter full name' },
                { field: 'grade', label: 'Applying for Grade', placeholder: 'e.g. Grade 9' },
                { field: 'contact', label: 'Parent Contact', placeholder: '03XX-XXXXXXX' },
                { field: 'email', label: 'Email Address', placeholder: 'email@example.com' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    style={{ ...inputStyle, borderColor: admErrors[field] ? '#EF4444' : '#e0e0e0' }}
                    value={admForm[field as keyof typeof admForm]}
                    placeholder={placeholder}
                    onChange={(e) => setAdmForm((p) => ({ ...p, [field]: e.target.value }))}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E8622A'; }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = admErrors[field] ? '#EF4444' : '#e0e0e0'; }}
                  />
                  {admErrors[field] && <span style={{ fontSize: 7, color: '#EF4444' }}>{admErrors[field]}</span>}
                </div>
              ))}
            </div>
            <button
              onClick={handleAdmSubmit}
              style={{ background: '#E8622A', border: 'none', color: '#fff', padding: '7px 20px', borderRadius: 3, cursor: 'pointer', fontSize: 10, fontWeight: 700 }}
            >
              Submit Application →
            </button>
          </div>
        )}

        {/* ── Academics ── */}
        {page === 'Academics' && (
          <div style={{ padding: 16 }}>
            <div style={{ fontFamily: 'serif', fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Academic Programmes</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {[
                { title: 'Primary (I–V)', desc: 'Foundation in literacy, numeracy & Islamic studies', badge: 'Ages 5–10', color: '#E8622A' },
                { title: 'Middle (VI–VIII)', desc: 'Sciences, humanities & Quran memorisation', badge: 'Ages 11–13', color: '#C9A96E' },
                { title: 'Matriculation', desc: 'BISE-affiliated, O-Level stream available', badge: 'Grades 9–10', color: '#10B981' },
                { title: 'Intermediate', desc: 'Pre-Medical, Pre-Engineering & Commerce', badge: 'Grades 11–12', color: '#8B5CF6' },
              ].map((p) => (
                <div key={p.title} style={{ border: `1px solid ${p.color}22`, background: '#fafafa', borderRadius: 3, padding: 10, borderTop: `3px solid ${p.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1a1a', marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontSize: 8, color: '#888', lineHeight: 1.5, marginBottom: 6 }}>{p.desc}</div>
                  <span style={{ fontSize: 7, background: `${p.color}15`, color: p.color, padding: '2px 6px', borderRadius: 2, fontWeight: 700 }}>{p.badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Fees ── */}
        {page === 'Fees' && (
          <div style={{ padding: 16 }}>
            <div style={{ fontFamily: 'serif', fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Fee Structure 2025–26</div>
            <div style={{ border: '1px solid #eee', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    {['Grade', 'Monthly Fee', 'Admission', 'Security'].map((h) => (
                      <th key={h} style={{ fontSize: 7, color: '#888', padding: '5px 8px', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { grade: 'I–V', monthly: '3,500', adm: '15,000', sec: '10,000' },
                    { grade: 'VI–VIII', monthly: '5,000', adm: '20,000', sec: '15,000' },
                    { grade: 'IX–X', monthly: '7,500', adm: '25,000', sec: '20,000' },
                    { grade: 'XI–XII', monthly: '9,500', adm: '30,000', sec: '25,000' },
                  ].map((r) => (
                    <tr key={r.grade} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '5px 8px', fontSize: 9, color: '#1a1a1a', fontWeight: 600 }}>{r.grade}</td>
                      <td style={{ padding: '5px 8px', fontSize: 9, color: '#E8622A', fontWeight: 700 }}>PKR {r.monthly}</td>
                      <td style={{ padding: '5px 8px', fontSize: 8, color: '#555' }}>PKR {r.adm}</td>
                      <td style={{ padding: '5px 8px', fontSize: 8, color: '#555' }}>PKR {r.sec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowModal(true)}
              style={{ background: '#E8622A', border: 'none', color: '#fff', padding: '7px 20px', borderRadius: 3, cursor: 'pointer', fontSize: 10, fontWeight: 700 }}
            >
              Pay Online →
            </button>
          </div>
        )}

        {/* ── Payment Modal ── */}
        {showModal && (
          <div
            style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20,
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <div style={{ background: '#fff', borderRadius: 4, width: 260, padding: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a' }}>Online Payment</span>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#888' }}>×</button>
              </div>

              {payDone ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>✓</div>
                  <div style={{ fontSize: 10, color: '#166534', fontWeight: 700 }}>Payment Successful!</div>
                  <div style={{ fontSize: 8, color: '#888', marginTop: 2 }}>Reference: TXN-{Math.floor(Math.random() * 900000) + 100000}</div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 8, color: '#888', marginBottom: 8 }}>Select payment method</div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                    {([['card', 'Card'], ['bank', 'Bank'], ['easypaisa', 'EasyPaisa']] as const).map(([m, label]) => (
                      <button
                        key={m}
                        onClick={() => setPayMethod(m)}
                        style={{
                          flex: 1, background: payMethod === m ? '#E8622A' : '#f5f5f5',
                          border: `1px solid ${payMethod === m ? '#E8622A' : '#e0e0e0'}`,
                          color: payMethod === m ? '#fff' : '#555',
                          padding: '4px 0', borderRadius: 3, cursor: 'pointer', fontSize: 8,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 3, padding: 8, marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 8, color: '#888' }}>Fee — March 2026</span>
                      <span style={{ fontSize: 9, color: '#1a1a1a', fontWeight: 700 }}>PKR 9,500</span>
                    </div>
                    {payMethod === 'card' && (
                      <div style={{ marginTop: 6 }}>
                        <input style={{ ...inputStyle, background: '#fff', marginBottom: 4 }} placeholder="Card Number" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                          <input style={{ ...inputStyle, background: '#fff' }} placeholder="MM/YY" />
                          <input style={{ ...inputStyle, background: '#fff' }} placeholder="CVV" />
                        </div>
                      </div>
                    )}
                    {payMethod === 'bank' && (
                      <div style={{ marginTop: 6, fontSize: 9, color: '#555', lineHeight: 1.6 }}>
                        Account: <b>1234-5678-9012</b><br />Title: Cubico School<br />Bank: HBL
                      </div>
                    )}
                    {payMethod === 'easypaisa' && (
                      <div style={{ marginTop: 6 }}>
                        <input style={{ ...inputStyle, background: '#fff' }} placeholder="EasyPaisa mobile number" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handlePayment}
                    style={{ width: '100%', background: '#E8622A', border: 'none', color: '#fff', padding: '7px', borderRadius: 3, cursor: 'pointer', fontSize: 10, fontWeight: 700 }}
                  >
                    Pay PKR 9,500
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
