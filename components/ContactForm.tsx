'use client';

import { useState, type FormEvent } from 'react';
import { submitContactForm } from '@/lib/supabase';

const SERVICE_OPTIONS = [
  'Moodle LMS Setup',
  'Educational Animations',
  'Digital Solutions / App',
  'Educational Content Creation',
  'Multiple Services',
  'Not sure yet',
];

interface FormState {
  name: string;
  email: string;
  institution: string;
  service: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  institution: '',
  service: '',
  message: '',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#111111',
  border: '1px solid #2A2520',
  padding: '13px 16px',
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: '#F0EBE3',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontWeight: 500,
  fontSize: 11,
  color: '#8A8278',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 8,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    (e.target as HTMLElement).style.borderColor = '#E8622A';
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    (e.target as HTMLElement).style.borderColor = '#2A2520';
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await submitContactForm(form);

    if (result.success) {
      setSuccess(true);
      setForm(INITIAL_STATE);
    } else {
      setError('Something went wrong. Please try again or email us directly.');
    }

    setSubmitting(false);
  }

  if (success) {
    return (
      <div
        style={{
          border: '1px solid #2A2520',
          padding: '60px 40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: '1px solid #C9A96E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#C9A96E',
            fontSize: 20,
          }}
        >
          ✓
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#F0EBE3', margin: 0 }}>
          Message Sent
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#7A7268', lineHeight: 1.7, maxWidth: 340, margin: 0 }}>
          We&apos;ll reply within 24 hours with a clear plan for your institution.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            fontSize: 12,
            color: '#E8622A',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: 8,
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }} noValidate>
      <div>
        <label style={labelStyle} htmlFor="name">Your Name *</label>
        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur} placeholder="Ahmed Khan" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="email">Email Address *</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur} placeholder="you@institution.com" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="institution">Institution Name</label>
        <input id="institution" name="institution" type="text" value={form.institution} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur} placeholder="e.g. Karachi Grammar School" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="service">Service Interested In</label>
        <select id="service" name="service" value={form.service} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur}
          style={{ ...inputStyle, color: form.service ? '#F0EBE3' : '#7A7268', appearance: 'none' }}
        >
          <option value="" disabled>Select a service…</option>
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt} value={opt} style={{ backgroundColor: '#191919', color: '#F0EBE3' }}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle} htmlFor="message">Tell us about your project *</label>
        <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange}
          onFocus={handleFocus} onBlur={handleBlur}
          placeholder="Describe what you need, your timeline, and any specific requirements…"
          dir="auto" style={{ ...inputStyle, resize: 'none' }}
        />
      </div>

      {error && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13, color: '#F0EBE3',
          backgroundColor: 'rgba(232,98,42,0.1)', border: '1px solid rgba(232,98,42,0.3)',
          padding: '12px 16px', margin: 0,
        }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em',
          color: '#F0EBE3', backgroundColor: '#E8622A', border: 'none', padding: '18px 36px',
          cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
          opacity: submitting ? 0.7 : 1,
        }}
        onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.backgroundColor = '#C4531F'; }}
        onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLElement).style.backgroundColor = '#E8622A'; }}
      >
        {submitting ? 'Sending…' : 'Send Message →'}
      </button>
    </form>
  );
}
