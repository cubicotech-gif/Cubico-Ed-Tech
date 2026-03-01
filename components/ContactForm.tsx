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

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <div className="bg-accent-green/10 border border-accent-green/30 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center text-3xl">
          ✓
        </div>
        <h3 className="font-syne font-bold text-white text-xl">Message Sent!</h3>
        <p className="text-muted font-dm text-sm leading-relaxed max-w-sm">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours with a plan for your
          institution.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 text-sm font-syne font-semibold text-accent-green hover:text-accent-green/80 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="font-syne font-semibold text-sm text-text" htmlFor="name">
          Your Name <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Ahmed Khan"
          className="bg-background border border-border rounded-xl px-4 py-3 text-text text-sm font-dm placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="font-syne font-semibold text-sm text-text" htmlFor="email">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@institution.com"
          className="bg-background border border-border rounded-xl px-4 py-3 text-text text-sm font-dm placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Institution */}
      <div className="flex flex-col gap-1.5">
        <label className="font-syne font-semibold text-sm text-text" htmlFor="institution">
          Institution Name
        </label>
        <input
          id="institution"
          name="institution"
          type="text"
          value={form.institution}
          onChange={handleChange}
          placeholder="e.g. Karachi Grammar School"
          className="bg-background border border-border rounded-xl px-4 py-3 text-text text-sm font-dm placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Service dropdown */}
      <div className="flex flex-col gap-1.5">
        <label className="font-syne font-semibold text-sm text-text" htmlFor="service">
          Service Interested In
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="bg-background border border-border rounded-xl px-4 py-3 text-sm font-dm focus:outline-none focus:border-accent transition-colors appearance-none"
          style={{ color: form.service ? 'var(--color-text, #e8eaf0)' : '#6b7588' }}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-card-bg text-text">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="font-syne font-semibold text-sm text-text" htmlFor="message">
          Tell us about your project <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe what you need, your timeline, and any specific requirements..."
          dir="auto"
          className="bg-background border border-border rounded-xl px-4 py-3 text-text text-sm font-dm placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm font-dm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          ⚠️ {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-syne font-bold text-sm py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message →'
        )}
      </button>
    </form>
  );
}
