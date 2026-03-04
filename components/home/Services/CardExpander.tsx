'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ServiceCard } from './data/types';

interface CardExpanderProps {
  expander: ServiceCard['expander'];
  isExpanded: boolean;
}

function BulletRow({ text, dotColor }: { text: string; dotColor: string }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        listStyle: 'none',
      }}
    >
      <div
        style={{
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: dotColor,
          flexShrink: 0,
          marginTop: 7,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 400,
          fontSize: 12,
          color: 'var(--text-body)',
          lineHeight: 1.6,
        }}
      >
        {text}
      </span>
    </li>
  );
}

function ColHeader({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
      }}
    >
      <div style={{ width: 6, height: 6, background: color, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: 'var(--font-stamp)',
          fontSize: 9,
          letterSpacing: '0.3em',
          color,
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function CardExpander({ expander, isExpanded }: CardExpanderProps) {
  return (
    <AnimatePresence mode="sync">
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div
            style={{
              background: 'var(--bg-subtle)',
              borderTop: '1px solid var(--line)',
              padding: '24px 28px 28px',
            }}
          >
            {/* Three-column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 28,
                marginBottom: 24,
              }}
            >
              {/* Column 1 — For the Principal */}
              <div>
                <ColHeader label="FOR THE PRINCIPAL" color="var(--blue)" />
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {expander.forPrincipal.map((item, i) => (
                    <BulletRow key={i} text={item} dotColor="var(--blue)" />
                  ))}
                </ul>
              </div>

              {/* Column 2 — For IT */}
              <div>
                <ColHeader label="FOR IT &amp; ADMIN" color="var(--gold)" />
                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {expander.forIT.map((item, i) => (
                    <BulletRow key={i} text={item} dotColor="var(--gold)" />
                  ))}
                </ul>
              </div>

              {/* Column 3 — For the Trustee */}
              <div>
                <ColHeader label="FOR THE TRUSTEE" color="var(--gold)" />

                {/* Big proof stat */}
                <div style={{ marginBottom: 14 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-stamp)',
                      fontSize: 52,
                      color: 'var(--blue)',
                      lineHeight: 1,
                      display: 'block',
                    }}
                  >
                    {expander.forTrustee.stat}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 9,
                      letterSpacing: '0.15em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginTop: 2,
                    }}
                  >
                    {expander.forTrustee.label}
                  </span>
                </div>

                <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {expander.forTrustee.bullets.map((item, i) => (
                    <BulletRow key={i} text={item} dotColor="var(--text-dim)" />
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  style={{
                    display: 'inline-block',
                    marginTop: 16,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 12,
                    color: 'var(--blue)',
                    borderBottom: '1px solid var(--blue-lo)',
                    textDecoration: 'none',
                    paddingBottom: 1,
                    transition: 'border-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--blue)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--blue-lo)';
                  }}
                >
                  Discuss this service →
                </a>
              </div>
            </div>

            {/* Timeline chip */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  background: 'var(--blue-lo)',
                  border: '1px solid var(--blue-mid)',
                  padding: '6px 14px',
                  borderRadius: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    color: 'var(--blue)',
                  }}
                >
                  ⏱ DELIVERED IN {expander.deliveryDays} DAYS
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
