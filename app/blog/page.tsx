"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'd%20like%20to%20chat%20about%20your%20EdTech%20solutions.";

const CATEGORIES = [
  "All",
  "School Management",
  "Teaching & Content",
  "Student Engagement",
  "Digital Transformation",
];

type CategoryBadgeColor = "amber" | "purple" | "indigo" | "teal";

const CATEGORY_COLORS: Record<CategoryBadgeColor, { bg: string; color: string; border: string }> = {
  amber: { bg: "rgba(251,191,36,0.1)", color: "#FCD34D", border: "rgba(251,191,36,0.25)" },
  purple: { bg: "rgba(124,58,237,0.15)", color: "#C084FC", border: "rgba(124,58,237,0.3)" },
  indigo: { bg: "rgba(79,70,229,0.15)", color: "#818CF8", border: "rgba(79,70,229,0.3)" },
  teal: { bg: "rgba(6,214,160,0.1)", color: "#06D6A0", border: "rgba(6,214,160,0.25)" },
};

interface BlogPost {
  id: number;
  category: string;
  badgeColor: CategoryBadgeColor;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  href: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Digital Transformation",
    badgeColor: "amber",
    title: "Why Schools in Pakistan Need to Go Digital in 2026 (And How to Start)",
    excerpt:
      "Digital transformation is no longer optional for educational institutions in Pakistan. Here's your practical guide to getting started.",
    readTime: "5 min read",
    date: "March 2026",
    href: "/blog/digital-transformation-pakistan-2026",
  },
  {
    id: 2,
    category: "Teaching & Content",
    badgeColor: "purple",
    title: "How Animated Lessons Improve Student Retention: What the Research Shows",
    excerpt:
      "Studies consistently show that visual and animated content dramatically improves retention. Here's what it means for your classroom.",
    readTime: "4 min read",
    date: "February 2026",
    href: "/blog/animated-lessons-student-retention",
  },
  {
    id: 3,
    category: "School Management",
    badgeColor: "indigo",
    title: "The Complete Guide to Choosing a School Management System",
    excerpt:
      "Not all school management systems are created equal. Here's what to look for — and what to avoid.",
    readTime: "7 min read",
    date: "February 2026",
    href: "/blog/choosing-school-management-system",
  },
  {
    id: 4,
    category: "Digital Transformation",
    badgeColor: "amber",
    title: "5 Signs Your Institution Is Ready for a Digital Transformation",
    excerpt:
      "If you're experiencing any of these five pain points, your institution is signaling that it's time to make the leap.",
    readTime: "3 min read",
    date: "January 2026",
    href: "/blog/signs-ready-digital-transformation",
  },
  {
    id: 5,
    category: "Teaching & Content",
    badgeColor: "purple",
    title: "Teaching Arabic Grammar Through Animation: A Saudi School's Story",
    excerpt:
      "How one school transformed dry grammar lessons into animated experiences that students actually wanted to watch.",
    readTime: "6 min read",
    date: "January 2026",
    href: "/blog/arabic-grammar-animation-saudi-school",
  },
];

function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function CategoryBadge({ category, color }: { category: string; color: CategoryBadgeColor }) {
  const styles = CATEGORY_COLORS[color];
  return (
    <span
      style={{
        display: "inline-block",
        background: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        borderRadius: "20px",
        padding: "4px 12px",
        fontFamily: "var(--font-ui)",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.06em",
      }}
    >
      {category}
    </span>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ translateY: -6, boxShadow: "0 16px 50px rgba(79,70,229,0.2)" }}
      style={{
        background: "#101E32",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        cursor: "pointer",
        transition: "box-shadow 0.3s",
      }}
    >
      <CategoryBadge category={post.category} color={post.badgeColor} />

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(18px, 2vw, 22px)",
          color: "#E2E8F0",
          lineHeight: 1.35,
          margin: 0,
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          color: "#94A3B8",
          lineHeight: 1.65,
          margin: 0,
          flexGrow: 1,
        }}
      >
        {post.excerpt}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            fontFamily: "var(--font-ui)",
            fontSize: "12px",
            color: "#64748B",
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <a
          href={post.href}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#818CF8",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#A5B4FC")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#818CF8")}
        >
          Read Article →
        </a>
      </div>
    </motion.div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section
      style={{
        background: "#0C1528",
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#818CF8",
              marginBottom: "16px",
            }}
          >
            Newsletter
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#E2E8F0",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Get EdTech insights in your inbox.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "#94A3B8",
              marginBottom: "40px",
            }}
          >
            Ideas and strategies for educators — delivered when they matter.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                background: "rgba(6,214,160,0.08)",
                border: "1px solid rgba(6,214,160,0.3)",
                borderRadius: "12px",
                padding: "24px 32px",
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                color: "#06D6A0",
              }}
            >
              You&apos;re subscribed! 🎉
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@institution.edu"
                style={{
                  flex: "1 1 260px",
                  background: "#060A15",
                  border: focused ? "1px solid #4F46E5" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  color: "#E2E8F0",
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ translateY: -2, boxShadow: "0 0 40px rgba(79,70,229,0.5)" }}
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                  padding: "14px 28px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  color: "white",
                  fontSize: "15px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(79,70,229,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </motion.button>
            </form>
          )}

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#64748B",
              marginTop: "16px",
            }}
          >
            No spam. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div style={{ background: "#060A15", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          paddingTop: "140px",
          paddingBottom: "80px",
          paddingLeft: "5%",
          paddingRight: "5%",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,70,229,0.12) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.14) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,70,229,0.12) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: "20px",
              }}
            >
              EdTech Blog
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "#E2E8F0",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              Insights for Educational Leaders.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#94A3B8",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Ideas, guides, and strategies for institutions ready to transform how they manage,
              teach, and engage.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CATEGORY FILTER BAR ── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "48px",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ translateY: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
                    : "transparent",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "9px 20px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: isActive ? "white" : "#94A3B8",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 0 20px rgba(79,70,229,0.35)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── BLOG POSTS GRID ── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "100px",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "80px 20px",
                color: "#64748B",
                fontFamily: "var(--font-body)",
                fontSize: "16px",
              }}
            >
              No posts in this category yet. Check back soon!
            </motion.div>
          ) : (
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "28px",
              }}
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <NewsletterSection />

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "100px",
          paddingLeft: "5%",
          paddingRight: "5%",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                color: "#94A3B8",
                marginBottom: "24px",
              }}
            >
              Have a question? We&apos;d love to hear from you.
            </p>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ translateY: -2, boxShadow: "0 0 50px rgba(79,70,229,0.6)" }}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                padding: "16px 36px",
                borderRadius: "8px",
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                color: "white",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(79,70,229,0.4)",
                transition: "box-shadow 0.2s",
              }}
            >
              💬 Message us on WhatsApp
            </motion.a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
