"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

const NAV_LINKS = [
  { href: "#solutions",    label: "Solutions"     },
  { href: "/case-studies", label: "Features"      },
  { href: "/about",        label: "Showcase"      },
  { href: "/blog",         label: "Testimonials"  },
  { href: "/contact",      label: "Pricing"       },
];

const SOLUTIONS = [
  { href: "/solutions/manage", label: "Cubico Manage™" },
  { href: "/solutions/teach",  label: "Cubico Teach™"  },
  { href: "/solutions/learn",  label: "Cubico Learn™"  },
  { href: "/solutions/scale",  label: "Cubico Scale™"  },
];

// Spring config matching iPhone Dynamic Island feel
const SPRING = { type: "spring" as const, stiffness: 500, damping: 38, mass: 0.8 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 320, damping: 30 };

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="#F97316" />
      <path
        d="M14 6 L20 9.5 L20 16.5 L14 20 L8 16.5 L8 9.5 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="13" r="2.2" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > lastY.current && y > 120) {
        setHidden(true);
        setMobileOpen(false);
        setDropOpen(false);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    /* Outer centering wrapper — fixed, full-width, pointer-events off */
    <div
      style={{
        position: "fixed",
        top: 12,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        padding: "0 16px",
      }}
    >
      {/* ── The pill ── */}
      <motion.div
        layout
        animate={{
          y: hidden ? -90 : 0,
          opacity: hidden ? 0 : 1,
          borderRadius: mobileOpen ? 22 : 100,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)"
            : "0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
        transition={SPRING}
        style={{
          pointerEvents: "auto",
          background: "rgba(14,14,14,0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          width: "100%",
          maxWidth: 860,
        }}
      >
        {/* ── Pill inner bar ── */}
        <div
          style={{
            height: 54,
            display: "flex",
            alignItems: "center",
            padding: "0 8px 0 14px",
            gap: 0,
          }}
        >
          {/* Logo */}
          <motion.div layout="position" style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
              <LogoIcon />
              <motion.span
                layout
                animate={{ opacity: 1, maxWidth: 80 }}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#FFFFFF",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                CUBICO
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop nav links — hidden when scrolled or on mobile */}
          <AnimatePresence mode="wait">
            {!scrolled && (
              <motion.ul
                key="nav-links"
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={SPRING_SOFT}
                className="hidden md:flex"
                style={{
                  listStyle: "none",
                  margin: "0 auto",
                  padding: "0 8px",
                  gap: 2,
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={label} style={{ position: "relative" }}>
                    {label === "Solutions" ? (
                      <div
                        onMouseEnter={() => setDropOpen(true)}
                        onMouseLeave={() => setDropOpen(false)}
                      >
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            fontFamily: "var(--font-ui)",
                            fontWeight: 500,
                            fontSize: 14,
                            color: dropOpen ? "#FFFFFF" : "rgba(255,255,255,0.68)",
                            padding: "6px 12px",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            transition: "color 0.15s, background 0.15s",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          {label}
                          <motion.span
                            animate={{ rotate: dropOpen ? 180 : 0 }}
                            transition={SPRING}
                            style={{ fontSize: 9, opacity: 0.5 }}
                          >
                            ▾
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {dropOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }}
                              transition={SPRING_SOFT}
                              style={{
                                position: "absolute",
                                top: "calc(100% + 10px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "rgba(18,18,18,0.97)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 14,
                                padding: "6px 0",
                                minWidth: 190,
                                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                                zIndex: 200,
                              }}
                            >
                              {SOLUTIONS.map(item => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  style={{
                                    display: "block",
                                    fontFamily: "var(--font-ui)",
                                    fontWeight: 500,
                                    fontSize: 13,
                                    color: "rgba(255,255,255,0.6)",
                                    textDecoration: "none",
                                    padding: "9px 18px",
                                    transition: "color 0.12s, background 0.12s",
                                  }}
                                  onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.color = "#fff";
                                    (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.1)";
                                  }}
                                  onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                                    (e.currentTarget as HTMLElement).style.background = "transparent";
                                  }}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={href}
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontWeight: 500,
                          fontSize: 14,
                          color: "rgba(255,255,255,0.68)",
                          textDecoration: "none",
                          padding: "6px 12px",
                          borderRadius: 8,
                          display: "block",
                          transition: "color 0.15s, background 0.15s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.68)";
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Spacer when scrolled (keeps logo left, CTA right) */}
          {scrolled && <div style={{ flex: 1 }} />}

          {/* Right CTAs */}
          <motion.div
            layout="position"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
              marginLeft: scrolled ? 0 : "auto",
            }}
          >
            {/* Sign In — hidden when scrolled */}
            <AnimatePresence mode="wait">
              {!scrolled && (
                <motion.div
                  key="signin"
                  className="hidden md:block"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={SPRING_SOFT}
                  style={{ overflow: "hidden" }}
                >
                  <Link
                    href="/contact"
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.68)",
                      textDecoration: "none",
                      padding: "6px 12px",
                      borderRadius: 8,
                      display: "block",
                      transition: "color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.68)")}
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Get started — always visible on desktop */}
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
              whileHover={{ scale: 1.06, boxShadow: "0 6px 24px rgba(249,115,22,0.55)" }}
              whileTap={{ scale: 0.94 }}
              transition={SPRING}
              style={{
                alignItems: "center",
                background: "#F97316",
                color: "#FFFFFF",
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: 13,
                padding: "9px 18px",
                borderRadius: 100,
                textDecoration: "none",
                letterSpacing: "0.01em",
                boxShadow: "0 2px 10px rgba(249,115,22,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              Get started
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              transition={SPRING}
              aria-label="Toggle navigation"
              style={{
                background: "none",
                border: "none",
                padding: "8px 6px",
                display: "flex",
                flexDirection: "column",
                gap: 4.5,
                marginRight: 2,
              }}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={{
                    rotate: mobileOpen
                      ? i === 0 ? 45  : i === 2 ? -45 : 0
                      : 0,
                    y: mobileOpen
                      ? i === 0 ? 7  : i === 2 ? -7 : 0
                      : 0,
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                    width: mobileOpen ? 20 : i === 1 ? 14 : 20,
                  }}
                  transition={SPRING}
                  style={{
                    display: "block",
                    height: 1.5,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 2,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </motion.button>
          </motion.div>
        </div>

        {/* ── Mobile expanded menu (Dynamic Island morph) ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={SPRING_SOFT}
              style={{ overflow: "hidden" }}
            >
              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0 16px" }} />

              <div style={{ padding: "12px 16px 16px" }}>
                {/* Nav items */}
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...SPRING_SOFT, delay: i * 0.04 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 500,
                        fontSize: 16,
                        color: "rgba(255,255,255,0.75)",
                        textDecoration: "none",
                        padding: "11px 4px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING_SOFT, delay: NAV_LINKS.length * 0.04 }}
                  style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 500,
                      fontSize: 15,
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      textAlign: "center",
                      padding: "11px 0",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 100,
                    }}
                  >
                    Sign In
                  </Link>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#FFFFFF",
                      textDecoration: "none",
                      background: "#F97316",
                      padding: "12px 0",
                      borderRadius: 100,
                      textAlign: "center",
                      boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
                    }}
                  >
                    Get started
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
