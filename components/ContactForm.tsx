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

// ── Input / label style helpers ────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontWeight: 600,
  fontSize: 12,
  color: '#7A7268',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#111111',
  border: '1px solid #2A2520',
  borderRadius: 0,
  padding: '14px 16px',
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  color: '#F0EBE3',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          border: '1px solid rgba(201,169,110,0.3)',
          backgroundColor: 'rgba(201,169,110,0.05)',
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
            fontFamily: 'var(--font-accent)',
            fontSize: 72,
            color: '#C9A96E',
            lineHeight: 1,
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 24,
            color: '#F0EBE3',
            margin: 0,
          }}
        >
          Message Received.
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: '#7A7268',
            maxWidth: 380,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          We&apos;ll review your request and respond within 24 hours with a clear plan for
          your institution.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            fontWeight: 500,
            color: '#C9A96E',
            background: 'none',
            border: 'none',
            padding: 0,
            marginTop: 8,
            textDecoration: 'underline',
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }} noValidate>
      {/* Name */}
      <div>
        <label style={labelStyle} htmlFor="name">
          Your Name <span style={{ color: '#E8622A' }}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
          placeholder="e.g. Ahmed Khan"
          style={{
            ...inputStyle,
            borderColor: focused === 'name' ? '#E8622A' : '#2A2520',
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle} htmlFor="email">
          Email Address <span style={{ color: '#E8622A' }}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
          placeholder="you@institution.com"
          style={{
            ...inputStyle,
            borderColor: focused === 'email' ? '#E8622A' : '#2A2520',
          }}
        />
      </div>

      {/* Institution */}
      <div>
        <label style={labelStyle} htmlFor="institution">
          Institution Name
        </label>
        <input
          id="institution"
          name="institution"
          type="text"
          value={form.institution}
          onChange={handleChange}
          onFocus={() => setFocused('institution')}
          onBlur={() => setFocused(null)}
          placeholder="e.g. Karachi Grammar School"
          style={{
            ...inputStyle,
            borderColor: focused === 'institution' ? '#E8622A' : '#2A2520',
          }}
        />
      </div>

      {/* Service */}
      <div>
        <label style={labelStyle} htmlFor="service">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          onFocus={() => setFocused('service')}
          onBlur={() => setFocused(null)}
          style={{
            ...inputStyle,
            color: form.service ? '#F0EBE3' : '#7A7268',
            borderColor: focused === 'service' ? '#E8622A' : '#2A2520',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A7268' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: 40,
          }}
        >
          <option value="" disabled>Select a service...</option>
          {SERVICE_OPTIONS.map(opt => (
            <option key={opt} value={opt} style={{ backgroundColor: '#111111', color: '#F0EBE3' }}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle} htmlFor="message">
          Tell us about your project <span style={{ color: '#E8622A' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          placeholder="Describe what you need, your timeline, and any specific requirements..."
          dir="auto"
          style={{
            ...inputStyle,
            resize: 'none',
            borderColor: focused === 'message' ? '#E8622A' : '#2A2520',
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: '#E8622A',
            border: '1px solid rgba(232,98,42,0.3)',
            padding: '12px 16px',
            margin: 0,
          }}
        >
          ⚠️ {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        data-cursor="cta"
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: 15,
          color: '#F0EBE3',
          backgroundColor: submitting ? '#C4531F' : '#E8622A',
          border: 'none',
          padding: '18px 0',
          width: '100%',
          opacity: submitting ? 0.8 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background-color 0.2s ease',
        }}
      >
        {submitting ? (
          <>
            <span
              style={{
                width: 14,
                height: 14,
                border: '2px solid rgba(240,235,227,0.3)',
                borderTopColor: '#F0EBE3',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.7s linear infinite',
              }}
            />
            Sending...
          </>
        ) : (
          'Send Message →'
        )}
      </button>
    </form>
  );
}
