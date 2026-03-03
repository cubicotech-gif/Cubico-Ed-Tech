import type { ServiceCard } from './types';

export const SERVICES: ServiceCard[] = [
  {
    id: 'lms',
    number: '01',
    category: 'MOODLE LMS',
    symptom: {
      headline: 'Your students stop learning the moment they leave school.',
      detail: 'No homework platform. No recorded lessons. No way for parents to know what their child missed. Learning ends at 2pm every day.',
    },
    cure: {
      name: 'LMS & E-Learning Platform',
      outcome: 'Your school runs its own learning platform — available 24/7 to every student and parent.',
      proofStat: '50+',
      proofLabel: 'LMS PLATFORMS DEPLOYED',
      defaultBullets: [
        'Students access lessons, homework, and tests from any device — at home, at night, during Ramadan.',
        'Parents log in and see exactly what their child studied, what they missed, and what\'s due.',
        'Certificates issue automatically when a student completes a course — no admin work.',
      ],
    },
    expander: {
      forPrincipal: [
        'Every teacher gets their own course space — upload videos, PDFs, quizzes, all in one place.',
        'Automatic WhatsApp/SMS alerts when a student is falling behind — before parents have to ask.',
        'Students in Pakistan, UAE, or UK access the same platform — in English, Arabic, or Urdu.',
        'Live classes via Zoom or BigBlueButton — integrated directly into the LMS, no separate links.',
        'Your school\'s branding: logo, colors, domain (lms.yourschool.edu.pk) — looks like yours, not ours.',
      ],
      forIT: [
        'Moodle 4.x on dedicated VPS — full admin access handed to your IT team post-launch.',
        'SCORM 1.2 and 2004 compliant — import any third-party course content without conversion.',
        'H5P interactive content natively supported — drag & drop, fill-in-blank, video quizzes.',
        'JazzCash · EasyPaisa · Stripe payment gateway for course enrollment fees.',
        'REST API exposed for integration with your existing school ERP or SIS.',
        'SSL, daily backups, 99.9% uptime SLA — full technical documentation provided.',
      ],
      forTrustee: {
        stat: '₨180K',
        label: 'AVG. ANNUAL SAVING VS. SEPARATE TOOLS',
        bullets: [
          'Replaces: Google Classroom + Zoom subscription + test platform + certificate tool.',
          'Parent engagement increases 3× — fewer complaints, fewer late-payment surprises.',
          'One-time setup cost. Annual hosting only after Year 1.',
        ],
      },
      deliveryDays: 14,
    },
    tags: ['Moodle', 'SCORM', 'H5P', 'RTL Arabic', 'Mobile App'],
  },
  {
    id: 'animations',
    number: '02',
    category: 'ANIMATIONS',
    symptom: {
      headline: 'Your teachers explain the same concept every year. Students still don\'t get it.',
      detail: 'Diagrams on a whiteboard. Photocopied textbook pages. YouTube videos that aren\'t in Urdu, aren\'t curriculum-aligned, and aren\'t yours.',
    },
    cure: {
      name: '2D & 3D Educational Animations',
      outcome: 'Concepts that took a teacher 40 minutes to explain — understood in 4 minutes on screen.',
      proofStat: '4K',
      proofLabel: 'PRODUCTION QUALITY',
      defaultBullets: [
        'Complex science, math, and Islamic studies topics animated in 2D or 3D — built for your curriculum.',
        'Voiced in English, Urdu, or Arabic by professional voice artists — students hear their own language.',
        'Delivered as MP4 for YouTube or SCORM package for your LMS — plays anywhere.',
      ],
    },
    expander: {
      forPrincipal: [
        'Prophet Ibrahim\'s story animated without human depictions — Islamic guidelines strictly followed, reviewed by scholars.',
        'Cell division, photosynthesis, the water cycle — science concepts your students have never actually seen.',
        'Your school\'s name and logo in every animation — this is your content, forever.',
        'Students can rewatch as many times as needed — no teacher repetition required.',
        'Parents can watch at home with their children — extends learning beyond school walls.',
      ],
      forIT: [
        'Delivered in 1080p and 4K MP4 — compatible with all LMS platforms and smart boards.',
        'SCORM 2004 packaging available — drop into Moodle, Canvas, or any LMS in one click.',
        'Closed captions (SRT files) included for all voiceovers — accessibility compliant.',
        'Source files (After Effects / Blender) handed over at project end — you own everything.',
        'CDN hosting available — zero buffering for students on slow connections.',
      ],
      forTrustee: {
        stat: '∞',
        label: 'USAGE — BUILT ONCE, USED FOREVER',
        bullets: [
          'One animation serves every student who will ever attend your school — cost amortizes to zero over time.',
          'Competitive differentiator: "We have our own animated curriculum" — powerful for admissions.',
          'Replaces annual textbook reprinting costs for visual topics.',
        ],
      },
      deliveryDays: 21,
    },
    tags: ['2D Animation', '3D Animation', 'Urdu', 'Arabic', 'SCORM'],
  },
  {
    id: 'website',
    number: '03',
    category: 'WEBSITE & BRAND',
    symptom: {
      headline: 'Parents judge your school before they ever visit — and your website is losing them.',
      detail: 'A Blogspot page from 2016. No admissions system. No way to pay fees online. Parents calling the office for information that should be two clicks away.',
    },
    cure: {
      name: 'School Website & Brand Identity',
      outcome: 'A website that makes parents apply before they\'ve even visited — live in 30 days.',
      proofStat: '30',
      proofLabel: 'DAYS TO LAUNCH',
      defaultBullets: [
        'Online admissions form — parents apply from their phone in 8 minutes. You receive structured data, not paper.',
        'Fee payment portal built in — JazzCash, EasyPaisa, and Stripe. Parents pay at midnight if they want.',
        'News, events, and results system the admin team manages themselves — no developer needed after launch.',
      ],
    },
    expander: {
      forPrincipal: [
        'Your school\'s complete brand identity: logo, color palette, typography, letterhead, uniform badges — all cohesive.',
        'Full Arabic and Urdu RTL support — every page available in three languages, properly typeset.',
        'Virtual tour integration — embed a 360° walkthrough so parents visit before they visit.',
        'Exam results publication — upload a CSV, results appear live on the website automatically.',
        'Google Maps integration, transport route pages, and staff directory — everything parents search for.',
      ],
      forIT: [
        'Built on Next.js 14 (SSG/SSR) — PageSpeed score 95+ guaranteed. Google will rank it.',
        'CMS: Sanity or WordPress — your admin team edits content without touching code.',
        'Hosted on Vercel or your own server — your choice, full access credentials handed over.',
        'SSL, CDN, automatic image optimization, Core Web Vitals compliant from day one.',
        'Full SEO setup: meta tags, schema markup, sitemap, Google Search Console connected.',
      ],
      forTrustee: {
        stat: '3×',
        label: 'MORE INQUIRIES VS. NO DIGITAL PRESENCE',
        bullets: [
          'Online admissions system cuts admin processing time by 70% — staff focus on students, not paperwork.',
          'Fee portal eliminates cash handling — reduces errors, increases collection rate.',
          'A premium web presence is the first filter: attracts higher-fee parents before first contact.',
        ],
      },
      deliveryDays: 30,
    },
    tags: ['Next.js', 'RTL Arabic', 'Urdu', 'CMS', 'SEO', 'Brand'],
  },
  {
    id: 'erp',
    number: '04',
    category: 'SCHOOL ERP',
    symptom: {
      headline: 'Your admin staff spends 6 hours a day on things a system could do in 6 seconds.',
      detail: 'Attendance in a register. Fees in Excel. Results typed into Word. Staff salaries in a notebook. WhatsApp for everything. Nothing connected to anything.',
    },
    cure: {
      name: 'School ERP & Mobile Apps',
      outcome: 'Every administrative function of your school — one system, one screen, zero duplication.',
      proofStat: '8',
      proofLabel: 'MODULES IN ONE SYSTEM',
      defaultBullets: [
        'Attendance taken on a tablet — absentee WhatsApp alert sent to parents automatically, same minute.',
        'Fee collection tracked in real time — overdue notices sent automatically, no clerk needed.',
        'Exam results entered once, published to student portal, reported to parents, archived for board — simultaneously.',
      ],
    },
    expander: {
      forPrincipal: [
        'Admissions → fees → attendance → grades → results → certificates — one complete cycle, zero data re-entry.',
        'Student, teacher, parent, and admin apps — each role sees only what they need.',
        'Zakat and sponsor management module for Islamic schools and madrassas — track donors, distribute allocations, report automatically.',
        'Multi-campus support — manage 3 branches from one dashboard, compare performance side by side.',
        'WhatsApp automation for every event: fee due, exam schedule, result published, holiday announced.',
      ],
      forIT: [
        'Built on Next.js + PostgreSQL + Supabase — modern stack, real-time updates via websockets.',
        'Role-based access control: principal sees everything, teacher sees their class, parent sees their child.',
        'REST API for third-party integrations — connect to existing biometric attendance hardware.',
        'iOS and Android apps built in React Native — single codebase, both stores, full source code handed over.',
        'Data export: every module exports to Excel/PDF — no lock-in, your data is always yours.',
      ],
      forTrustee: {
        stat: '70%',
        label: 'REDUCTION IN ADMIN WORKLOAD',
        bullets: [
          'Equivalent of 2 full-time admin staff — redirectable to student-facing roles.',
          'Fee collection rate increases 25% with automated reminders vs. manual follow-up.',
          'Eliminates data errors from manual transfer — one source of truth across all departments.',
        ],
      },
      deliveryDays: 45,
    },
    tags: ['ERP', 'iOS', 'Android', 'WhatsApp API', 'Biometric'],
  },
  {
    id: 'content',
    number: '05',
    category: 'CONTENT',
    symptom: {
      headline: 'Your teachers are teaching. Your students are not learning.',
      detail: 'Photocopied notes. Passive listening. No interactive practice. Students score just enough to pass — then forget everything by summer.',
    },
    cure: {
      name: 'Digital Content & Curriculum',
      outcome: 'Curriculum that students actually engage with — interactive, tested, and remembered.',
      proofStat: '4',
      proofLabel: 'BOARD STANDARDS SUPPORTED',
      defaultBullets: [
        'H5P interactive activities — drag-and-drop, fill-in-blank, video quizzes — built for your exact syllabus chapters.',
        'Quran, Hadith, and Seerah content created with full Islamic scholarly review — zero compromise on accuracy.',
        'Cambridge IGCSE, Pakistani Matric, Islamic/Madrassa, and custom curricula — we build for what your school actually teaches.',
      ],
    },
    expander: {
      forPrincipal: [
        'E-books that replace photocopied notes — searchable, highlightable, accessible offline on student devices.',
        'Auto-graded assessments — teacher sets questions once, system marks, records, and reports forever.',
        'Bilingual content: English medium schools get Urdu translation toggle — no student is left behind.',
        'Teacher training included — your staff knows exactly how to use and update every piece of content.',
        'Annual content refresh service available — curriculum changes don\'t mean starting from scratch.',
      ],
      forIT: [
        'H5P content compatible with all major LMS platforms — import as .h5p or via API.',
        'SCORM 1.2/2004 packaging — drop into any LMS with xAPI/Tin Can tracking.',
        'E-books in EPUB3 format — works on tablets, Kindle, and all e-reader apps.',
        'Automated assessment engine: configurable pass marks, retry attempts, and certificate triggers.',
        'Content hosted on your LMS or delivered via CDN — your choice.',
      ],
      forTrustee: {
        stat: '2×',
        label: 'IMPROVEMENT IN BOARD RESULT RATES (CLIENT AVERAGE)',
        bullets: [
          'Replaces annual workbook and past-paper printing costs — significant recurring saving.',
          'Interactive content reduces teacher load — fewer revision sessions, fewer complaints from parents.',
          'Proprietary content is a long-term institutional asset — increases school valuation.',
        ],
      },
      deliveryDays: 30,
    },
    tags: ['H5P', 'SCORM', 'EPUB', 'Cambridge', 'Islamic', 'Urdu'],
  },
  {
    id: 'marketing',
    number: '06',
    category: 'MARKETING',
    symptom: {
      headline: 'Your admissions season ends with empty seats and a pile of receipts from newspaper ads.',
      detail: 'PKR 80,000 on a newspaper ad that ran once. A banner on the main road nobody photographed. Word of mouth that reached the same 40 families it always reaches. No way to know what worked.',
    },
    cure: {
      name: 'Digital Marketing & Admissions Campaigns',
      outcome: 'Admissions campaigns measured to the rupee — every inquiry tracked, every seat filled.',
      proofStat: '340%',
      proofLabel: 'AVG. INQUIRY INCREASE',
      defaultBullets: [
        'Google Ads targeting parents searching "best school in [your area]" — they find you first, not your competitor.',
        'Meta (Facebook + Instagram) campaigns timed to your admissions calendar — running before you even open applications.',
        'WhatsApp broadcast to 2,000+ parent contacts — properly formatted, not spammy, legally compliant.',
      ],
    },
    expander: {
      forPrincipal: [
        'Monthly social media management: 12–16 designed posts, Reels, event coverage — your school looks alive online.',
        'Parent testimonial video production — the most trusted form of school marketing, done properly.',
        'Admissions landing page built and A/B tested — one URL on every flyer, every ad, every WhatsApp message.',
        'Google My Business optimization — your school appears in Maps, reviews managed, questions answered.',
        'Post-campaign report: exactly how many inquiries, from which channel, at what cost per lead.',
      ],
      forIT: [
        'Google Analytics 4 + Meta Pixel installed on your website — full funnel tracking from ad click to enrollment.',
        'WhatsApp Business API integration — broadcast to opted-in contacts, receive replies in one inbox.',
        'UTM tracking on all campaigns — every channel measured independently in your dashboard.',
        'Retargeting pixels on admissions page — parents who visited but didn\'t apply get followed up automatically.',
        'Monthly data export: all lead data in CSV — your CRM or your spreadsheet, your choice.',
      ],
      forTrustee: {
        stat: '₨180',
        label: 'COST PER LEAD (VS. ₨2,000 NEWSPAPER)',
        bullets: [
          'Digital campaigns are 10× more cost-efficient than print — same budget, 10× the inquiries.',
          'Every rupee tracked: you know exactly which ad filled which seat.',
          'Admissions season campaigns typically pay for the entire year\'s marketing budget in enrollment fees.',
        ],
      },
      deliveryDays: 7,
    },
    tags: ['Google Ads', 'Meta Ads', 'WhatsApp', 'SEO', 'Analytics'],
  },
];
