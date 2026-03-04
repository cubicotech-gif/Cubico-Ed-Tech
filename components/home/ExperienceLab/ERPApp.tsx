'use client';

import { useState } from 'react';

const NAV = ['Dashboard', 'Fees', 'Admissions', 'Staff', 'Reports'] as const;
type Module = typeof NAV[number];

const inputStyle: React.CSSProperties = {
  background: '#090909',
  border: '1px solid #272727',
  padding: '6px 8px',
  borderRadius: 2,
  color: '#F0EBE3',
  fontSize: 10,
  fontFamily: 'monospace',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: 8,
  color: '#2A2A2A',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 3,
};

const STAFF = [
  { id: 'EMP-001', name: 'Mr. Hassan Ali', role: 'Math Teacher', salary: 45000, dept: 'Academics' },
  { id: 'EMP-002', name: 'Ms. Fatima Khan', role: 'CS Teacher', salary: 48000, dept: 'Academics' },
  { id: 'EMP-003', name: 'Maulana Ibrahim', role: 'Islamic Studies', salary: 40000, dept: 'Academics' },
  { id: 'EMP-004', name: 'Mr. Bilal Raza', role: 'English Teacher', salary: 42000, dept: 'Academics' },
  { id: 'EMP-005', name: 'Ms. Ayesha Siddiqui', role: 'Accountant', salary: 38000, dept: 'Admin' },
];

const TRANSACTIONS = [
  { id: 'TXN-001', name: 'Ahmed Khan', amount: 12500, date: 'Mar 01', status: 'Paid' },
  { id: 'TXN-002', name: 'Sara Malik', amount: 12500, date: 'Mar 01', status: 'Paid' },
  { id: 'TXN-003', name: 'Usman Ali', amount: 12500, date: 'Feb 28', status: 'Pending' },
  { id: 'TXN-004', name: 'Fatima Noor', amount: 12500, date: 'Mar 02', status: 'Paid' },
];

const cell: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 9,
  color: '#6A6460',
  padding: '5px 8px',
  borderBottom: '1px solid #1a1a1a',
};

const th: React.CSSProperties = {
  ...cell,
  color: '#2A2A2A',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  fontSize: 7,
};

export function ERPApp() {
  const [module, setModule] = useState<Module>('Dashboard');

  // Fees state
  const [feesForm, setFeesForm] = useState({ studentId: '', name: '', amount: '', month: '' });
  const [feesSuccess, setFeesSuccess] = useState(false);
  const [feesErrors, setFeesErrors] = useState<Record<string, string>>({});

  // Admissions state
  const [admForm, setAdmForm] = useState({ name: '', father: '', grade: '', contact: '' });
  const [admSuccess, setAdmSuccess] = useState<string | null>(null);
  const [admErrors, setAdmErrors] = useState<Record<string, string>>({});

  // Reports state
  const [reportType, setReportType] = useState<'fees' | 'attendance' | 'grades'>('fees');

  const handleFeesSubmit = () => {
    const errors: Record<string, string> = {};
    if (!feesForm.studentId) errors.studentId = 'Required';
    if (!feesForm.name) errors.name = 'Required';
    if (!feesForm.amount) errors.amount = 'Required';
    if (!feesForm.month) errors.month = 'Required';
    if (Object.keys(errors).length) { setFeesErrors(errors); return; }
    setFeesErrors({});
    setFeesSuccess(true);
    setTimeout(() => { setFeesSuccess(false); setFeesForm({ studentId: '', name: '', amount: '', month: '' }); }, 2500);
  };

  const handleAdmSubmit = () => {
    const errors: Record<string, string> = {};
    if (!admForm.name) errors.name = 'Required';
    if (!admForm.father) errors.father = 'Required';
    if (!admForm.grade) errors.grade = 'Required';
    if (!admForm.contact) errors.contact = 'Required';
    if (Object.keys(errors).length) { setAdmErrors(errors); return; }
    setAdmErrors({});
    const id = `ADM-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setAdmSuccess(id);
    setTimeout(() => { setAdmSuccess(null); setAdmForm({ name: '', father: '', grade: '', contact: '' }); }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'monospace', fontSize: 11 }}>
      {/* Top bar */}
      <div style={{ background: '#060606', borderBottom: '1px solid #1d1d1d', padding: '0 12px', display: 'flex', alignItems: 'center', gap: 16, height: 36, flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#C9A96E' }}>ERP</span>
        <div style={{ display: 'flex', gap: 0 }}>
          {NAV.map((n) => (
            <button
              key={n}
              onClick={() => setModule(n)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'monospace', fontSize: 9, padding: '4px 10px',
                color: module === n ? '#C9A96E' : '#2A2A2A',
                borderBottom: module === n ? '2px solid #C9A96E' : '2px solid transparent',
                transition: 'color 150ms, border-color 150ms',
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', background: '#060606' }}>

        {/* ── Dashboard ── */}
        {module === 'Dashboard' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              School Overview
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 10 }}>
              {[
                { label: 'Students', value: '155', color: '#E8622A' },
                { label: 'Staff', value: '12', color: '#C9A96E' },
                { label: 'Fees Due', value: 'PKR 1.2L', color: '#EF4444' },
                { label: 'Collection', value: '78%', color: '#10B981' },
              ].map((k) => (
                <div key={k.label} style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', padding: '8px 8px', borderRadius: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: k.color, fontFamily: 'var(--font-stamp)' }}>{k.value}</div>
                  <div style={{ fontSize: 7, color: '#2A2A2A', marginTop: 2, letterSpacing: '0.06em' }}>{k.label}</div>
                </div>
              ))}
            </div>
            {/* Fee bar chart */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, padding: '8px 10px' }}>
              <div style={{ fontSize: 8, color: '#2A2A2A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Monthly Fee Collection</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
                {[55, 70, 82, 68, 90, 78].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: '100%', height: `${v}%`, background: i === 5 ? '#C9A96E' : '#1d1d1d', borderRadius: '1px 1px 0 0', transition: 'height 600ms ease' }} />
                    <span style={{ fontSize: 6, color: '#2A2A2A' }}>{['O', 'N', 'D', 'J', 'F', 'M'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Fees ── */}
        {module === 'Fees' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              Fee Collection
            </div>

            {feesSuccess && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '6px 10px', borderRadius: 2, fontSize: 9, color: '#10B981', marginBottom: 8 }}>
                ✓ Payment recorded successfully
              </div>
            )}

            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, padding: '10px', marginBottom: 10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                {[
                  { field: 'studentId', label: 'Student ID', placeholder: 'e.g. STD-001' },
                  { field: 'name', label: 'Student Name', placeholder: 'Full name' },
                  { field: 'amount', label: 'Amount (PKR)', placeholder: '12500' },
                  { field: 'month', label: 'Month', placeholder: 'March 2026' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      style={{ ...inputStyle, borderColor: feesErrors[field] ? '#EF4444' : '#272727' }}
                      value={feesForm[field as keyof typeof feesForm]}
                      placeholder={placeholder}
                      onChange={(e) => setFeesForm((p) => ({ ...p, [field]: e.target.value }))}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#C9A96E'; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = feesErrors[field] ? '#EF4444' : '#272727'; }}
                    />
                    {feesErrors[field] && <span style={{ fontSize: 7, color: '#EF4444' }}>{feesErrors[field]}</span>}
                  </div>
                ))}
              </div>
              <button
                onClick={handleFeesSubmit}
                style={{ background: '#C9A96E', border: 'none', color: '#050505', padding: '6px 16px', borderRadius: 2, cursor: 'pointer', fontFamily: 'monospace', fontSize: 10, fontWeight: 700 }}
              >
                Record Payment
              </button>
            </div>

            {/* Recent transactions */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ padding: '5px 8px', borderBottom: '1px solid #1d1d1d', fontSize: 7, color: '#2A2A2A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recent Transactions</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>{['ID', 'Student', 'Amount', 'Date', 'Status'].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((t) => (
                    <tr key={t.id}>
                      <td style={{ ...cell, color: '#2A2A2A', fontSize: 8 }}>{t.id}</td>
                      <td style={cell}>{t.name}</td>
                      <td style={{ ...cell, color: '#C9A96E' }}>PKR {t.amount.toLocaleString()}</td>
                      <td style={{ ...cell, fontSize: 8 }}>{t.date}</td>
                      <td style={cell}>
                        <span style={{ color: t.status === 'Paid' ? '#10B981' : '#EF4444', fontSize: 8 }}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Admissions ── */}
        {module === 'Admissions' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              New Admission
            </div>

            {admSuccess && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '8px 10px', borderRadius: 2, marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: '#10B981', marginBottom: 2 }}>✓ Student enrolled successfully</div>
                <div style={{ fontSize: 10, color: '#F0EBE3', fontWeight: 700 }}>ID: {admSuccess}</div>
              </div>
            )}

            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, padding: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                {[
                  { field: 'name', label: "Student's Name", placeholder: 'Full name' },
                  { field: 'father', label: "Father's Name", placeholder: "Father's full name" },
                  { field: 'grade', label: 'Class / Grade', placeholder: 'e.g. Grade 9' },
                  { field: 'contact', label: 'Contact No.', placeholder: '03XX-XXXXXXX' },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      style={{ ...inputStyle, borderColor: admErrors[field] ? '#EF4444' : '#272727' }}
                      value={admForm[field as keyof typeof admForm]}
                      placeholder={placeholder}
                      onChange={(e) => setAdmForm((p) => ({ ...p, [field]: e.target.value }))}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E8622A'; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = admErrors[field] ? '#EF4444' : '#272727'; }}
                    />
                    {admErrors[field] && <span style={{ fontSize: 7, color: '#EF4444' }}>{admErrors[field]}</span>}
                  </div>
                ))}
              </div>
              <button
                onClick={handleAdmSubmit}
                style={{ background: '#E8622A', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: 2, cursor: 'pointer', fontFamily: 'monospace', fontSize: 10, fontWeight: 700 }}
              >
                Enrol Student
              </button>
            </div>
          </div>
        )}

        {/* ── Staff ── */}
        {module === 'Staff' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              Staff Directory
            </div>
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>{['ID', 'Name', 'Role', 'Dept', 'Salary'].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {STAFF.map((s) => (
                    <tr key={s.id}>
                      <td style={{ ...cell, color: '#2A2A2A', fontSize: 8 }}>{s.id}</td>
                      <td style={cell}>{s.name}</td>
                      <td style={{ ...cell, color: '#C9A96E' }}>{s.role}</td>
                      <td style={{ ...cell, fontSize: 8 }}>{s.dept}</td>
                      <td style={{ ...cell, color: '#F0EBE3' }}>PKR {s.salary.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Reports ── */}
        {module === 'Reports' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              Reports
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
              {(['fees', 'attendance', 'grades'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setReportType(r)}
                  style={{
                    background: reportType === r ? '#C9A96E' : '#0a0a0a',
                    border: `1px solid ${reportType === r ? '#C9A96E' : '#272727'}`,
                    color: reportType === r ? '#050505' : '#6A6460',
                    padding: '4px 12px', borderRadius: 2, cursor: 'pointer',
                    fontFamily: 'monospace', fontSize: 9, textTransform: 'capitalize',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {reportType === 'fees' && (
              <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, padding: 10 }}>
                <div style={{ fontSize: 8, color: '#2A2A2A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Fee Collection — March 2026</div>
                {[{ label: 'Total Due', value: 'PKR 1,93,750', color: '#F0EBE3' }, { label: 'Collected', value: 'PKR 1,50,000', color: '#10B981' }, { label: 'Pending', value: 'PKR 43,750', color: '#EF4444' }, { label: 'Collection Rate', value: '77.4%', color: '#C9A96E' }].map((r) => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #111' }}>
                    <span style={{ fontSize: 9, color: '#6A6460' }}>{r.label}</span>
                    <span style={{ fontSize: 9, color: r.color, fontWeight: 700 }}>{r.value}</span>
                  </div>
                ))}
              </div>
            )}

            {reportType === 'attendance' && (
              <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, padding: 10 }}>
                <div style={{ fontSize: 8, color: '#2A2A2A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Attendance — Week of March 2026</div>
                {[{ grade: 'Grade 9', rate: 92, color: '#10B981' }, { grade: 'Grade 10', rate: 87, color: '#C9A96E' }, { grade: 'Grade 11', rate: 78, color: '#EF4444' }].map((r) => (
                  <div key={r.grade} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 9, color: '#6A6460' }}>{r.grade}</span>
                      <span style={{ fontSize: 9, color: r.color }}>{r.rate}%</span>
                    </div>
                    <div style={{ height: 3, background: '#1d1d1d', borderRadius: 1 }}>
                      <div style={{ width: `${r.rate}%`, height: '100%', background: r.color, borderRadius: 1 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {reportType === 'grades' && (
              <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, padding: 10 }}>
                <div style={{ fontSize: 8, color: '#2A2A2A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Grade Distribution</div>
                {[{ grade: 'A / A+', count: 42, color: '#10B981' }, { grade: 'B / B+', count: 68, color: '#C9A96E' }, { grade: 'C / C+', count: 35, color: '#E8622A' }, { grade: 'D / Fail', count: 10, color: '#EF4444' }].map((r) => (
                  <div key={r.grade} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 8, color: r.color, width: 40, flexShrink: 0 }}>{r.grade}</span>
                    <div style={{ flex: 1, height: 8, background: '#1d1d1d', borderRadius: 1 }}>
                      <div style={{ width: `${(r.count / 155) * 100}%`, height: '100%', background: r.color, borderRadius: 1 }} />
                    </div>
                    <span style={{ fontSize: 8, color: '#2A2A2A', width: 24, textAlign: 'right' }}>{r.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
