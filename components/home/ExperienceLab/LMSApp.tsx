'use client';

import { useState } from 'react';

interface Course {
  id: number;
  name: string;
  teacher: string;
  students: number;
  progress: number;
  color: string;
}

interface Student {
  id: number;
  name: string;
  grade: string;
  score: number;
  present: boolean;
}

const courses: Course[] = [
  { id: 1, name: 'Mathematics Grade 9', teacher: 'Mr. Hassan Ali', students: 34, progress: 68, color: '#E8622A' },
  { id: 2, name: 'Islamic Studies', teacher: 'Maulana Ibrahim', students: 52, progress: 45, color: '#C9A96E' },
  { id: 3, name: 'Computer Science', teacher: 'Ms. Fatima Khan', students: 28, progress: 82, color: '#10B981' },
  { id: 4, name: 'English Literature', teacher: 'Mr. Bilal Raza', students: 41, progress: 59, color: '#8B5CF6' },
];

const students: Student[] = [
  { id: 1, name: 'Ahmed Khan', grade: 'A', score: 92, present: true },
  { id: 2, name: 'Sara Malik', grade: 'B+', score: 85, present: true },
  { id: 3, name: 'Usman Ali', grade: 'C', score: 67, present: false },
  { id: 4, name: 'Fatima Noor', grade: 'A+', score: 97, present: true },
  { id: 5, name: 'Hassan Raza', grade: 'B', score: 78, present: true },
];

const NAV = ['Dashboard', 'Courses', 'Students', 'Grades', 'Attendance'] as const;
type Page = typeof NAV[number];

const cell: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 10,
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
  fontSize: 8,
};

export function LMSApp() {
  const [page, setPage] = useState<Page>('Dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);

  const handleSaveAttendance = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'monospace', fontSize: 11 }}>
      {/* Top bar */}
      <div style={{ background: '#060606', borderBottom: '1px solid #1d1d1d', padding: '0 12px', display: 'flex', alignItems: 'center', gap: 16, height: 36, flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#E8622A' }}>LMS</span>
        <div style={{ display: 'flex', gap: 0 }}>
          {NAV.map((n) => (
            <button
              key={n}
              onClick={() => { setPage(n); setSelectedCourse(null); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'monospace', fontSize: 9, padding: '4px 10px',
                color: page === n ? '#E8622A' : '#2A2A2A',
                borderBottom: page === n ? '2px solid #E8622A' : '2px solid transparent',
                transition: 'color 150ms, border-color 150ms',
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#1d1d1d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8, color: '#6A6460' }}>A</span>
          </div>
          <span style={{ fontSize: 9, color: '#2A2A2A' }}>Admin</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', background: '#060606' }}>

        {/* ── Dashboard ── */}
        {page === 'Dashboard' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              Welcome back, Admin
            </div>
            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 10 }}>
              {[
                { label: 'Active Courses', value: '4', color: '#E8622A' },
                { label: 'Total Students', value: '155', color: '#C9A96E' },
                { label: 'Avg Progress', value: '64%', color: '#10B981' },
              ].map((k) => (
                <div key={k.label} style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', padding: '8px 10px', borderRadius: 2 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: k.color, fontFamily: 'var(--font-stamp)' }}>{k.value}</div>
                  <div style={{ fontSize: 8, color: '#2A2A2A', marginTop: 2, letterSpacing: '0.06em' }}>{k.label}</div>
                </div>
              ))}
            </div>
            {/* Recent activity */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ padding: '6px 10px', borderBottom: '1px solid #1d1d1d', fontSize: 8, color: '#2A2A2A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Recent Activity
              </div>
              {[
                { text: 'Ahmed Khan submitted Math assignment', time: '2m ago' },
                { text: 'New quiz added to CS course', time: '14m ago' },
                { text: 'Attendance marked — Grade 9', time: '1h ago' },
              ].map((a) => (
                <div key={a.text} style={{ padding: '5px 10px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 9, color: '#6A6460' }}>{a.text}</span>
                  <span style={{ fontSize: 8, color: '#2A2A2A', whiteSpace: 'nowrap', marginLeft: 8 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Courses ── */}
        {page === 'Courses' && !selectedCourse && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              All Courses
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {courses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourse(c)}
                  style={{
                    background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2,
                    padding: '8px 10px', cursor: 'pointer',
                    borderLeft: `3px solid ${c.color}`,
                    transition: 'background 150ms',
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#111'; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#0a0a0a'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: '#F0EBE3', fontWeight: 600 }}>{c.name}</span>
                    <span style={{ fontSize: 9, color: c.color, fontFamily: 'var(--font-stamp)' }}>{c.progress}%</span>
                  </div>
                  <div style={{ height: 2, background: '#1d1d1d', borderRadius: 1, marginBottom: 5 }}>
                    <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: 1, transition: 'width 400ms ease' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 8, color: '#2A2A2A' }}>{c.teacher}</span>
                    <span style={{ fontSize: 8, color: '#2A2A2A' }}>{c.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Course Detail ── */}
        {page === 'Courses' && selectedCourse && (
          <div style={{ padding: 12 }}>
            <button
              onClick={() => setSelectedCourse(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, color: '#E8622A', marginBottom: 10, padding: 0 }}
            >
              ← Back to Courses
            </button>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
              {selectedCourse.name}
            </div>
            <div style={{ fontSize: 9, color: '#6A6460', marginBottom: 10 }}>{selectedCourse.teacher} · {selectedCourse.students} students</div>
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Name', 'Grade', 'Score', 'Status'].map((h) => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td style={cell}>{s.name}</td>
                      <td style={{ ...cell, color: '#C9A96E' }}>{s.grade}</td>
                      <td style={{ ...cell, color: '#F0EBE3' }}>{s.score}</td>
                      <td style={cell}>
                        <span style={{ color: s.present ? '#10B981' : '#EF4444', fontSize: 8 }}>
                          {s.present ? '● Present' : '○ Absent'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Students ── */}
        {page === 'Students' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              All Students
            </div>
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['#', 'Name', 'Grade', 'Score', 'Present'].map((h) => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td style={{ ...cell, color: '#2A2A2A' }}>{s.id}</td>
                      <td style={cell}>{s.name}</td>
                      <td style={{ ...cell, color: '#C9A96E' }}>{s.grade}</td>
                      <td style={{ ...cell, color: '#F0EBE3' }}>{s.score}</td>
                      <td style={cell}>
                        <span style={{ color: s.present ? '#10B981' : '#EF4444' }}>
                          {s.present ? '✓' : '✗'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Grades ── */}
        {page === 'Grades' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              Grade Book
            </div>
            <div style={{ background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={th}>Student</th>
                    {courses.map((c) => (
                      <th key={c.id} style={{ ...th, color: c.color }}>{c.name.split(' ')[0]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, si) => (
                    <tr key={s.id}>
                      <td style={cell}>{s.name}</td>
                      {courses.map((c, ci) => {
                        const score = Math.min(100, Math.max(40, s.score + (ci - si) * 3));
                        const grade = score >= 90 ? 'A+' : score >= 85 ? 'A' : score >= 80 ? 'B+' : score >= 75 ? 'B' : score >= 70 ? 'C+' : 'C';
                        return (
                          <td key={c.id} style={{ ...cell, color: score >= 80 ? '#10B981' : score >= 70 ? '#C9A96E' : '#EF4444' }}>
                            {grade}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Attendance ── */}
        {page === 'Attendance' && (
          <div style={{ padding: 12 }}>
            <div style={{ color: '#F0EBE3', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginBottom: 2 }}>
              Mark Attendance
            </div>
            <div style={{ fontSize: 9, color: '#6A6460', marginBottom: 10 }}>Mathematics Grade 9 · Today</div>

            {saved && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '6px 10px', borderRadius: 2, fontSize: 9, color: '#10B981', marginBottom: 8 }}>
                ✓ Attendance saved successfully
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 10 }}>
              {students.map((s) => {
                const isPresent = s.id in attendance ? attendance[s.id] : s.present;
                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', background: '#0a0a0a', border: '1px solid #1d1d1d', borderRadius: 2 }}>
                    <button
                      onClick={() => setAttendance((prev) => ({ ...prev, [s.id]: true }))}
                      style={{
                        background: isPresent ? 'rgba(16,185,129,0.15)' : 'transparent',
                        border: `1px solid ${isPresent ? '#10B981' : '#272727'}`,
                        color: isPresent ? '#10B981' : '#2A2A2A',
                        fontSize: 8, padding: '2px 7px', borderRadius: 2, cursor: 'pointer', fontFamily: 'monospace',
                      }}
                    >
                      P
                    </button>
                    <button
                      onClick={() => setAttendance((prev) => ({ ...prev, [s.id]: false }))}
                      style={{
                        background: !isPresent ? 'rgba(239,68,68,0.1)' : 'transparent',
                        border: `1px solid ${!isPresent ? '#EF4444' : '#272727'}`,
                        color: !isPresent ? '#EF4444' : '#2A2A2A',
                        fontSize: 8, padding: '2px 7px', borderRadius: 2, cursor: 'pointer', fontFamily: 'monospace',
                      }}
                    >
                      A
                    </button>
                    <span style={{ fontSize: 10, color: '#F0EBE3', flex: 1 }}>{s.name}</span>
                    <span style={{ fontSize: 8, color: '#2A2A2A' }}>{s.grade}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSaveAttendance}
              style={{
                background: '#E8622A', border: 'none', color: '#fff',
                padding: '6px 16px', borderRadius: 2, cursor: 'pointer',
                fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
              }}
            >
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
