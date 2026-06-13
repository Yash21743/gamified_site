import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

/* ── SVG Icons ── */
const IconBook = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M6 8h14c2.2 0 4 1.8 4 4v28c0-2.2-1.8-4-4-4H6V8Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M42 8H28c-2.2 0-4 1.8-4 4v28c0-2.2 1.8-4 4-4h14V8Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 42S6 30 6 18a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 12-18 24-18 24Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.2"/>
    <circle cx="24" cy="24" r="2" fill="currentColor"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M4 24s7-14 20-14 20 14 20 14-7 14-20 14S4 24 4 24Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.2"/>
  </svg>
);
const IconQuiz = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M18 20c0-3.314 2.686-6 6-6s6 2.686 6 6c0 2.5-1.5 4-3 5.5S25 28 25 30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="24" cy="35" r="1.5" fill="currentColor"/>
  </svg>
);
const IconGame = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <rect x="4" y="14" width="40" height="24" rx="8" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M16 22v8M12 26h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="32" cy="24" r="2" fill="currentColor"/>
    <circle cx="36" cy="28" r="2" fill="currentColor"/>
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 33v6M16 44h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M10 8h28v14c0 7.732-6.268 14-14 14S10 29.732 10 22V8Z" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M10 12H6a4 4 0 0 0 4 4M38 12h4a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconLeaderboard = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <rect x="4" y="28" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="19" y="4" width="10" height="40" rx="2" stroke="currentColor" strokeWidth="2.2"/>
    <rect x="34" y="18" width="10" height="26" rx="2" stroke="currentColor" strokeWidth="2.2"/>
  </svg>
);
const IconOffline = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M6 28a12 12 0 0 1 12-12h12a12 12 0 0 1 0 24H18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M14 36l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLanguage = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M24 4C24 4 16 12 16 24s8 20 8 20M24 4c0 0 8 8 8 20s-8 20-8 20M4 24h40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 4L6 12v12c0 11 8 20 18 24 10-4 18-13 18-24V12L24 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="18" cy="16" r="6" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M6 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="34" cy="18" r="5" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M34 28c5.523 0 10 4.477 10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 4l5.09 10.31L41 16.18l-8.5 8.28 2.01 11.72L24 30.77l-10.51 5.41 2.01-11.72L7 16.18l11.91-1.87L24 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M14 24l7 7 13-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLightbulb = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M18 38h12M20 42h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M18 32c-4-3-7-7-7-13a13 13 0 1 1 26 0c0 6-3 10-7 13v2H18v-2Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    <path d="M24 10v6M30 14l-4 4M18 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconGrowth = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M6 42L18 28l8 6 16-22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 12h8v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconHandshake = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M6 20l10-10 8 4 10-4 8 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 20l8 8 6-2 6 6 6-4 4 4 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function useReveal(language) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        }),
        { threshold: 0.12 }
      );
      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    }, 150);
    return () => clearTimeout(timer);
  }, [language]);
}

export default function AboutPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  useReveal(language);


  const whyUs = [
    { icon: <IconShield />, title: t('aboutWhy1Title'), desc: t('aboutWhy1Desc') },
    { icon: <IconCheck />, title: t('aboutWhy2Title'), desc: t('aboutWhy2Desc') },
    { icon: <IconStar />, title: t('aboutWhy3Title'), desc: t('aboutWhy3Desc') },
    { icon: <IconUsers />, title: t('aboutWhy4Title'), desc: t('aboutWhy4Desc') },
  ];

  const values = [
    { icon: <IconLightbulb />, title: t('aboutValue1Title'), desc: t('aboutValue1Desc') },
    { icon: <IconHeart />, title: t('aboutValue2Title'), desc: t('aboutValue2Desc') },
    { icon: <IconGrowth />, title: t('aboutValue3Title'), desc: t('aboutValue3Desc') },
    { icon: <IconHandshake />, title: t('aboutValue4Title'), desc: t('aboutValue4Desc') },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Hind:wght@400;500;600&display=swap');

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .rd1{transition-delay:0.07s} .rd2{transition-delay:0.15s}
        .rd3{transition-delay:0.23s} .rd4{transition-delay:0.31s} .rd5{transition-delay:0.39s}

        /* ══ ABOUT HERO ══ */
        .ab-hero {
          background: #1a0208;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          padding: 130px 5% 56px;
        }
        .ab-hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 70% 25%, rgba(120,23,40,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 15% 75%, rgba(79,7,21,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(79,7,21,0.2) 0%, transparent 70%);
        }
        .ab-hero-content {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center;
          position: relative; z-index: 2;
        }
        .ab-hero-h1 {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800; line-height: 1.12; color: #fff;
          margin-bottom: 18px; white-space: pre-line;
        }
        .ab-hero-h1 span { color: #fbbfca; }
        .ab-hero-p {
          font-size: 1rem; color: rgba(255,255,255,0.68);
          line-height: 1.75; max-width: 440px; margin-bottom: 28px;
        }
        .ab-hero-btns { display: flex; gap: 14px; flex-wrap: nowrap; align-items: center; }
        .ab-hero-imgs { position: relative; height: 380px; display: flex; align-items: center; justify-content: center; width: 100%; }
        .ab-hero-img-single {
          width: 90%; height: 90%;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border: 3px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .ab-hero-img-single:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 30px 65px rgba(0,0,0,0.6);
        }
        .ab-hero-img-single img { width: 100%; height: 100%; object-fit: cover; }
        .ab-hero-img-badge {
          position: absolute; bottom: 12%; left: 0%;
          background: linear-gradient(135deg, #781728, #4f0715);
          color: #fff;
          border-radius: 50px; padding: 10px 20px;
          font-family: 'Baloo 2', cursive; font-size: 0.85rem; font-weight: 700;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4); white-space: nowrap;
          border: 2px solid rgba(255,255,255,0.18);
          animation: abFloatBadge 4s ease-in-out infinite;
          z-index: 3; pointer-events: none;
        }
        @keyframes abFloatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

        /* ══ WAVE DIVIDER ══ */
        .ab-wave { line-height: 0; margin-bottom: -1px; }
        .ab-wave svg { display: block; width: 100%; }

        /* ══ STORY SECTION ══ */
        .ab-story {
          background: #781728; padding: 56px 5%;
        }
        .ab-story-inner {
          max-width: 900px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 20px;
        }
        .ab-eyebrow {
          font-size: 0.67rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .ab-title {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          font-weight: 800; color: #fff; line-height: 1.2;
        }
        .ab-text {
          font-size: 0.95rem; color: rgba(255,255,255,0.72);
          line-height: 1.8;
        }

        /* ══ MISSION SECTION ══ */
        .ab-mission { background: #781728; padding: 0 5% 56px; }
        .ab-mission-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
          align-items: center;
        }
        .ab-mission-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 36px 32px;
        }
        .ab-mission-icon {
          color: #fbbfca; margin-bottom: 16px;
          width: 56px; height: 56px;
          background: rgba(251,191,202,0.1); border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }

        /* ══ VISION SECTION ══ */
        .ab-vision { background: #4f0715; padding: 56px 5%; }
        .ab-vision-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
          align-items: center;
        }
        .ab-vision-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 36px 32px;
        }
        .ab-vision-stats {
          display: flex; gap: 20px; margin-top: 20px;
        }
        .ab-vision-stat {
          background: rgba(255,255,255,0.08);
          border-radius: 14px; padding: 18px 22px;
          text-align: center; flex: 1;
        }
        .ab-vision-stat-val {
          font-family: 'Baloo 2', cursive;
          font-size: 1.5rem; font-weight: 800; color: #fbbfca;
        }
        .ab-vision-stat-lbl {
          font-size: 0.72rem; color: rgba(255,255,255,0.5);
          margin-top: 4px;
        }

        /* ══ OFFERS GRID ══ */
        .ab-offers { background: #fff; padding: 56px 5%; }
        .ab-offers-inner { max-width: 1200px; margin: 0 auto; }
        .ab-offers .ab-eyebrow { color: #ad5b67; }
        .ab-offers .ab-title { color: #2d0209; }
        .ab-offers-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 16px; margin-top: 32px;
        }
        .ab-offer-card {
          background: #fdf5f6;
          border: 1px solid rgba(120,23,40,0.08);
          border-radius: 16px; padding: 24px 20px;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex; flex-direction: column;
        }
        .ab-offer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 36px rgba(79,7,21,0.1);
        }
        .ab-offer-icon {
          color: #781728; margin-bottom: 14px;
          width: 50px; height: 50px;
          background: rgba(120,23,40,0.08); border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ab-offer-card:hover .ab-offer-icon {
          transform: rotate(18deg) scale(1.18);
        }
        .ab-offer-title {
          font-family: 'Baloo 2', cursive;
          font-size: 1rem; font-weight: 700; color: #2d0209; margin-bottom: 7px;
        }
        .ab-offer-desc {
          font-size: 0.85rem; color: #6b3040; line-height: 1.65;
        }

        /* ══ WHY CHOOSE US ══ */
        .ab-why { background: #4f0715; padding: 56px 5%; }
        .ab-why-inner { max-width: 1100px; margin: 0 auto; }
        .ab-why-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px; margin-top: 32px;
        }
        .ab-why-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 28px 22px;
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: center;
        }
        .ab-why-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.2);
        }
        .ab-why-icon {
          color: #fbbfca; margin: 0 auto 14px;
          width: 56px; height: 56px;
          background: rgba(251,191,202,0.1); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .ab-why-title {
          font-family: 'Baloo 2', cursive;
          font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 8px;
        }
        .ab-why-desc {
          font-size: 0.84rem; color: rgba(255,255,255,0.6); line-height: 1.65;
        }

        /* ══ VALUES ══ */
        .ab-values { background: #781728; padding: 56px 5%; }
        .ab-values-inner { max-width: 1100px; margin: 0 auto; }
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px; margin-top: 32px;
        }
        .ab-value-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px; padding: 30px 22px;
          text-align: center;
          transition: transform 0.3s, background 0.3s;
        }
        .ab-value-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.1);
        }
        .ab-value-icon {
          color: #fbbfca; margin: 0 auto 14px;
          width: 60px; height: 60px;
          background: rgba(251,191,202,0.1); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .ab-value-title {
          font-family: 'Baloo 2', cursive;
          font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 8px;
        }
        .ab-value-desc {
          font-size: 0.84rem; color: rgba(255,255,255,0.6); line-height: 1.65;
        }

        /* ══ CTA ══ */
        .ab-cta { background: #fff; padding: 56px 5% 24px; }
        .ab-cta-box {
          max-width: 1100px; margin: 0 auto;
          border-radius: 24px; overflow: hidden;
          position: relative; min-height: 320px;
          display: flex; align-items: center; justify-content: center;
          text-align: center;
        }
        .ab-cta-bg {
          position: absolute; inset: 0;
          background-image: url('https://i.pinimg.com/1200x/ee/be/8a/eebe8a73a7eed94dfc2a96ca4699e4b8.jpg');
          background-size: cover; background-position: center;
          transition: transform 0.7s ease;
        }
        .ab-cta-box:hover .ab-cta-bg { transform: scale(1.07); }
        .ab-cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(26,2,8,0.92) 0%, rgba(79,7,21,0.86) 50%, rgba(120,23,40,0.82) 100%);
        }
        .ab-cta-inner {
          position: relative; z-index: 2;
          padding: 56px 48px; width: 100%;
        }
        .ab-cta-title {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          font-weight: 800; color: #fff; margin-bottom: 14px;
        }
        .ab-cta-sub {
          font-size: 0.95rem; color: rgba(255,255,255,0.68);
          margin-bottom: 28px; line-height: 1.7;
          max-width: 480px; margin-left: auto; margin-right: auto;
        }
        .ab-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .ab-btn-primary {
          background: #fff; color: #4f0715; border: none; border-radius: 50px;
          padding: 13px 28px; font-size: 0.93rem; font-weight: 800;
          cursor: pointer; font-family: 'Baloo 2', cursive;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(0,0,0,0.2);
        }
        .ab-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(0,0,0,0.25); }
        .ab-btn-secondary {
          background: transparent; color: #fff;
          border: 2px solid rgba(255,255,255,0.45); border-radius: 50px;
          padding: 13px 28px; font-size: 0.93rem; font-weight: 700;
          cursor: pointer; font-family: 'Baloo 2', cursive;
          transition: background 0.2s, border-color 0.2s;
        }
        .ab-btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 768px) {
          .ab-hero { padding: 102px 5% 40px; }
          .ab-hero-content { grid-template-columns: 1fr; gap: 20px; text-align: center; }
          .ab-hero-p { margin-left: auto; margin-right: auto; }
          .ab-hero-btns { justify-content: center; }
          .ab-hero-imgs { height: 200px; margin-top: 0; }
          .ab-mission-inner { grid-template-columns: 1fr; gap: 20px; }
          .ab-vision-inner { grid-template-columns: 1fr; gap: 20px; }
          .ab-vision-stats { flex-direction: column; gap: 12px; }
          .ab-cta-inner { padding: 36px 20px; }
          .ab-story { padding: 40px 5%; }
          .ab-why, .ab-values { padding: 40px 5%; }
        }
        @media (min-width: 769px) and (max-width: 1200px) {
          .ab-hero { padding: 110px 5% 40px; }
          .ab-hero-content { gap: 28px; }
          .ab-hero-h1 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); }
          .ab-hero-imgs { height: 320px; }
          .ab-mission-inner { gap: 24px; }
          .ab-vision-inner { gap: 24px; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="ab-hero">
        <div className="ab-hero-glow" />
        <div className="ab-hero-content">
          <div className="reveal">
            <h1 className="ab-hero-h1">{t('aboutHeroTitle')}</h1>
            <p className="ab-hero-p">{t('aboutHeroSub')}</p>
            <div className="ab-hero-btns">
              <button className="ab-btn-primary" onClick={() => navigate('/register')}>{t('startLearningFree')}</button>
              <button className="ab-btn-secondary" onClick={() => navigate('/login')}>{t('loginArrow')}</button>
            </div>
          </div>
          <div className="ab-hero-imgs reveal rd2">
            <div className="ab-hero-img-single">
              <img src="https://i.pinimg.com/1200x/56/10/94/5610941450ce2bb60fc1de08a6584e0e.jpg" alt="Students learning" />
            </div>
            <div className="ab-hero-img-badge"> {t('heroStudentsBadge')}</div>
          </div>
        </div>
      </section>

      {/* ══ Wave: hero → story ══ */}
      <div className="ab-wave" style={{ background: '#1a0208' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" height="110">
          <path d="M0,0 C200,100 400,20 600,70 C800,120 1000,10 1200,65 C1320,95 1400,40 1440,60 L1440,110 L0,110 Z" fill="#781728"/>
        </svg>
      </div>

      {/* ══════════════ OUR STORY ══════════════ */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="reveal">
            <div className="ab-eyebrow">{t('aboutStoryEyebrow')}</div>
            <div className="ab-title">{t('aboutStoryTitle')}</div>
          </div>
          <p className="ab-text reveal rd1">{t('aboutStoryP1')}</p>
          <p className="ab-text reveal rd2">{t('aboutStoryP2')}</p>
        </div>
      </section>

      {/* ══════════════ MISSION ══════════════ */}
      <section className="ab-mission">
        <div className="ab-mission-inner">
          <div className="ab-mission-card reveal">
            <div className="ab-mission-icon"><IconTarget /></div>
            <div className="ab-eyebrow" style={{ marginBottom: 8 }}>{t('aboutMissionEyebrow')}</div>
            <div className="ab-title" style={{ marginBottom: 14 }}>{t('aboutMissionTitle')}</div>
            <p className="ab-text">{t('aboutMissionP1')}</p>
            <p className="ab-text" style={{ marginTop: 12 }}>{t('aboutMissionP2')}</p>
          </div>
          <div className="ab-mission-card reveal rd2">
            <div className="ab-mission-icon"><IconEye /></div>
            <div className="ab-eyebrow" style={{ marginBottom: 8 }}>{t('aboutVisionEyebrow')}</div>
            <div className="ab-title" style={{ marginBottom: 14 }}>{t('aboutVisionTitle2')}</div>
            <p className="ab-text">{t('aboutVisionP1')}</p>
            <p className="ab-text" style={{ marginTop: 12 }}>{t('aboutVisionP2')}</p>
          </div>
        </div>
      </section>

      {/* ══ Wave: mission → why ══ */}
      <div className="ab-wave" style={{ background: '#781728' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" height="110">
          <path d="M0,60 C300,0 600,110 900,40 C1100,0 1280,90 1440,45 L1440,110 L0,110 Z" fill="#4f0715"/>
        </svg>
      </div>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section className="ab-why">
        <div className="ab-why-inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="ab-eyebrow">{t('aboutWhyEyebrow')}</div>
            <div className="ab-title">{t('aboutWhyTitle')}</div>
          </div>
          <div className="ab-why-grid">
            {whyUs.map((w, i) => (
              <div className={`ab-why-card reveal rd${(i % 4) + 1}`} key={w.title}>
                <div className="ab-why-icon">{w.icon}</div>
                <div className="ab-why-title">{w.title}</div>
                <div className="ab-why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Wave: why → values ══ */}
      <div className="ab-wave" style={{ background: '#4f0715' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" height="110">
          <path d="M0,0 C200,100 400,20 600,70 C800,120 1000,10 1200,65 C1320,95 1400,40 1440,60 L1440,110 L0,110 Z" fill="#781728"/>
        </svg>
      </div>

      {/* ══════════════ OUR VALUES ══════════════ */}
      <section className="ab-values">
        <div className="ab-values-inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="ab-eyebrow">{t('aboutValuesEyebrow')}</div>
            <div className="ab-title">{t('aboutValuesTitle')}</div>
          </div>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <div className={`ab-value-card reveal rd${(i % 4) + 1}`} key={v.title}>
                <div className="ab-value-icon">{v.icon}</div>
                <div className="ab-value-title">{v.title}</div>
                <div className="ab-value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Wave: values → cta ══ */}
      <div className="ab-wave" style={{ background: '#781728' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" height="110">
          <path d="M0,50 C240,110 480,10 720,70 C960,120 1200,15 1440,55 L1440,110 L0,110 Z" fill="#fff"/>
        </svg>
      </div>

      {/* ══════════════ CTA ══════════════ */}
      <section className="ab-cta">
        <div className="ab-cta-box reveal">
          <div className="ab-cta-bg" />
          <div className="ab-cta-overlay" />
          <div className="ab-cta-inner">
            <div className="ab-cta-title">{t('aboutCtaTitle')}</div>
            <div className="ab-cta-sub">{t('aboutCtaSub')}</div>
            <div className="ab-cta-btns">
              <button className="ab-btn-primary" onClick={() => navigate('/register')}>{t('aboutCtaBtn')}</button>
              <button className="ab-btn-secondary" onClick={() => navigate('/login')}>{t('aboutCtaLogin')}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
