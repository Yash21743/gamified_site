import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/* ── SVG Icons ── */
const IconMath = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconEnglish = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
);
const IconHindi = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconScience = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6v11l3.4 5.1A1 1 0 0 1 17.6 21H6.4a1 1 0 0 1-.8-1.6L9 14V3z"/>
    <line x1="9" y1="3" x2="15" y2="3"/>
  </svg>
);
const IconPuzzle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z"/>
  </svg>
);
const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconLightbulb = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Data ── */
const QUIZZES = [
  {
    _id: 'q_math',
    icon: <IconMath />,
    title: 'Mathematics',
    titleHi: 'गणित',
    desc: 'Numbers, algebra, geometry and more!',
    descHi: 'संख्याएं, बीजगणित और ज्यामिति सीखें!',
    img: 'https://i.pinimg.com/1200x/3c/2a/30/3c2a306853c02c630a95ee6d5922a5d0.jpg',
  },
  {
    _id: 'q_sci',
    icon: <IconScience />,
    title: 'Science',
    titleHi: 'विज्ञान',
    desc: 'Physics, chemistry, biology and more!',
    descHi: 'भौतिकी, रसायन और जीव विज्ञान सीखें!',
    img: 'https://i.pinimg.com/736x/3c/4f/14/3c4f14d5ba766bc7d8fe7ee6e212db71.jpg',
  },
  {
    _id: 'q_hindi',
    icon: <IconHindi />,
    title: 'Hindi',
    titleHi: 'हिंदी',
    desc: 'वर्णमाला, व्याकरण और रचना।',
    descHi: 'वर्णमाला, व्याकरण और रचना।',
    img: 'https://i.pinimg.com/1200x/d3/60/95/d36095a54ae06a2629f9f10997db7350.jpg',
  },
  {
    _id: 'q_social',
    icon: <IconEnglish />,
    title: 'Social Studies',
    titleHi: 'सामाजिक अध्ययन',
    desc: 'History, geography and civics.',
    descHi: 'इतिहास, भूगोल और नागरिक शास्त्र।',
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80',
  },
];

const FEATURES = [
  { icon: <IconMonitor />,   title: 'Digital Literacy',         titleHi: 'डिजिटल साक्षरता',   desc: 'Navigate the digital world safely and effectively.',        descHi: 'डिजिटल दुनिया को समझें।' },
  { icon: <IconBrain />,     title: 'Critical Thinking',        titleHi: 'तार्किक सोच',        desc: 'Solve puzzles and challenges to enhance problem-solving.', descHi: 'वास्तविक समस्याओं को हल करें।' },
  { icon: <IconClock />,     title: 'Self-Paced Learning',      titleHi: 'स्व-गति से सीखना',   desc: 'Learn at your own speed with personal progress tracking.', descHi: 'अपनी गति से सीखें।' },
  { icon: <IconLightbulb />, title: 'Conceptual Understanding', titleHi: 'अवधारणा की समझ',    desc: 'Master core concepts through interactive content.',         descHi: 'इंटरएक्टिव सामग्री से सीखें।' },
  { icon: <IconStar />,      title: 'Gamified Rewards',         titleHi: 'गेमिफाइड पुरस्कार', desc: 'Earn XP, badges and certificates as you learn.',           descHi: 'XP, बैज और सर्टिफिकेट अर्जित करें।' },
];

const GAMES = [
  {
    id: 'word-puzzle',
    icon: <IconPuzzle />,
    title: 'Word Puzzle Challenge',
    titleHi: 'शब्द पहेली चैलेंज',
    desc: 'Unscramble words, build vocabulary, boost XP by 2x.',
    descHi: 'शब्दों को सुलझाएं और 2x XP पाएं।',
    img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80',
  },
  {
    id: 'math-sprint',
    icon: <IconZap />,
    title: 'Math Sprint',
    titleHi: 'गणित स्प्रिंट',
    desc: 'Solve rapid-fire math problems and boost XP by 7x.',
    descHi: 'तेज़ गणित के सवाल हल करें और 7x XP पाएं।',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80',
  },
];

const FAQS = [
  { q: 'How does XP work?',      qHi: 'XP कैसे काम करता है?',   a: 'You earn XP by completing quizzes and games. More XP means a higher rank on the leaderboard!', aHi: 'क्विज़ और गेम्स पूरे करने पर XP मिलता है। ज़्यादा XP = ऊंची रैंकिंग!' },
  { q: 'What are rewards?',      qHi: 'पुरस्कार क्या हैं?',      a: 'Top players get certificates, badges, and special recognition at VidyaKhel events.',           aHi: 'टॉप खिलाड़ियों को सर्टिफिकेट, बैज और विशेष मान्यता मिलती है।' },
  { q: 'Is it free?',            qHi: 'क्या यह मुफ्त है?',        a: 'Yes! VidyaKhel is completely free for all students. No hidden charges ever.',                   aHi: 'हाँ! VidyaKhel सभी छात्रों के लिए पूरी तरह मुफ्त है।' },
  { q: 'Are games educational?', qHi: 'क्या गेम्स शैक्षिक हैं?', a: 'Absolutely! Every game is designed to reinforce school curriculum in a fun way.',               aHi: 'बिल्कुल! हर गेम स्कूल पाठ्यक्रम को मज़ेदार तरीके से सिखाता है।' },
];

export default function QuizzesPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.qp-faq-item')) setOpenFaq(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Baloo 2', cursive" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes imgZoom { from{transform:scale(1)} to{transform:scale(1.08)} }

        .qp-a1{animation:fadeUp 0.55s ease 0.05s both}
        .qp-a2{animation:fadeUp 0.55s ease 0.15s both}
        .qp-a3{animation:fadeUp 0.55s ease 0.25s both}
        .qp-a4{animation:fadeUp 0.55s ease 0.35s both}

        /* ── HERO ── */
        .qp-hero {
          background: #1a0208;
          padding: 120px 5% 20px;
          min-height: auto;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
        }
        .qp-hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 70% 25%, rgba(120,23,40,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 15% 75%, rgba(79,7,21,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(79,7,21,0.2) 0%, transparent 70%);
        }
        .qp-hero-inner {
          max-width: 1140px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center; padding-bottom: 30px;
        }
        .qp-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 50px; padding: 5px 14px;
          color: rgba(255,255,255,0.65);
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.5px;
          margin-bottom: 18px;
        }
        .qp-hero h1 {
          font-size: clamp(2rem,5vw,3.2rem); font-weight: 800;
          color: #fff; line-height: 1.1; margin: 0 0 14px;
        }
        .qp-hero h1 span { color: #fbbfca; }
        .qp-hero p {
          font-size: 0.97rem; color: rgba(255,255,255,0.6);
          line-height: 1.75; max-width: 400px; margin: 0 0 28px;
        }
        .qp-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .qp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 50px; border: none;
          background: #fff; color: #4f0715;
          font-weight: 800; font-size: 0.9rem; cursor: pointer;
          font-family: 'Baloo 2', cursive;
          box-shadow: 0 4px 18px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .qp-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.25); }
        .qp-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 50px;
          background: transparent; border: 2px solid rgba(255,255,255,0.3);
          color: #fff; font-weight: 700; font-size: 0.9rem;
          cursor: pointer; font-family: 'Baloo 2', cursive;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .qp-btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        /* Hero images */
        .qp-hero-imgs { position: relative; height: 320px; display: flex; align-items: center; justify-content: center; width: 100%; }
        .qp-img-single {
          width: 90%; height: 90%;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border: 3px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .qp-img-single:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 30px 65px rgba(0,0,0,0.6);
        }
        .qp-img-single img { width: 100%; height: 100%; object-fit: cover; }
        .qp-img-badge {
          position: absolute; bottom: 12%; left: 0%;
          background: linear-gradient(135deg, #781728, #4f0715);
          color: #fff;
          border-radius: 50px; padding: 10px 20px;
          font-family: 'Baloo 2', cursive; font-size: 0.85rem; font-weight: 700;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4); white-space: nowrap;
          border: 2px solid rgba(255,255,255,0.18);
          animation: floatY 4s ease-in-out infinite;
          z-index: 3; pointer-events: none;
        }

        /* ── WAVE ── */
        .qp-wave {
          display: block; line-height: 0; font-size: 0;
          border: none; outline: none; overflow: hidden;
            margin-top: -1px;
             margin-bottom: -1px;
        }
        .qp-wave svg { display: block; border: none; outline: none; }

        /* ── FEATURES SECTION ── */
        .qp-features-section { background: #fff; padding: 72px 5%; }
        .qp-feat-card {
          background: #fdf5f6;
          border: 1px solid rgba(120,23,40,0.08);
          border-radius: 16px; padding: 20px;
          display: flex; flex-direction: column; gap: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default; height: 100%;
        }
        .qp-feat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(120,23,40,0.1); }
        .qp-feat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(120,23,40,0.08); color: #781728;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(120,23,40,0.12); flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .qp-feat-card:hover .qp-feat-icon { transform: rotate(-10deg) scale(1.12); }
        .qp-feat-layout { display: flex; gap: 48px; align-items: stretch; }
        .qp-feat-left { flex: 0 0 250px; display: flex; flex-direction: column; }
        .qp-feat-left .qp-feat-card { flex: 1; }
        .qp-feat-right {
          flex: 1; display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px; min-width: 0;
        }

        /* ── QUIZ SECTION ── */
        .qp-quiz-section { background: #781728; padding: 72px 5%; }

        /* ── QUIZ CARDS: full-image overlay style ── */
        .qp-quiz-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }
        .qp-quiz-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1 / 1;
          border: 1.5px solid rgba(255,255,255,0.12);
          transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s;
        }
        .qp-quiz-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 56px rgba(0,0,0,0.45);
        }
        /* Background image with zoom on hover */
        .qp-quiz-card-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .qp-quiz-card:hover .qp-quiz-card-bg {
          transform: scale(1.08);
        }
        /* Dark gradient overlay — stronger at bottom */
        .qp-quiz-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,0,4,0.05) 0%,
            rgba(10,0,4,0.1) 40%,
            rgba(10,0,4,0.75) 75%,
            rgba(10,0,4,0.92) 100%
          );
        }
        /* Content: icon + title + desc, bottom-centre */
        .qp-quiz-card-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          z-index: 2;
        }
        .qp-quiz-card-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.25);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
          flex-shrink: 0;
        }
        .qp-quiz-card:hover .qp-quiz-card-icon {
          transform: rotate(-10deg) scale(1.12);
          background: rgba(255,255,255,0.22);
        }

        /* ── GAMES SECTION ── */
        .qp-games-section { background: #4f0715; padding: 72px 5%; }

        /* ── GAME CARDS: same full-image overlay style ── */
        .qp-games-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 640px;
          margin: 0 auto 36px;
        }
        .qp-game-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1 / 1;
          border: 1.5px solid rgba(255,255,255,0.12);
          transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s;
        }
        .qp-game-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 56px rgba(0,0,0,0.45);
        }
        .qp-game-card-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .qp-game-card:hover .qp-game-card-bg {
          transform: scale(1.08);
        }
        .qp-game-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,0,4,0.05) 0%,
            rgba(10,0,4,0.1) 40%,
            rgba(10,0,4,0.75) 75%,
            rgba(10,0,4,0.92) 100%
          );
        }
        .qp-game-card-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          z-index: 2;
        }
        .qp-game-card-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.25);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
          flex-shrink: 0;
        }
        .qp-game-card:hover .qp-game-card-icon {
          transform: rotate(-10deg) scale(1.12);
          background: rgba(255,255,255,0.22);
        }

        /* ── FAQ ── */
        .qp-faq-section { background: #fff; padding: 72px 5% 80px; }
        .qp-faq-item {
          border: 1.5px solid #e8e4e5; border-radius: 14px; overflow: hidden;
          transition: border-color 0.2s; background: #fff;
        }
        .qp-faq-item.open { border-color: rgba(120,23,40,0.3); }
        .qp-faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 18px 22px; background: transparent; border: none;
          cursor: pointer; font-family: 'Baloo 2', cursive; text-align: left;
          transition: background 0.18s;
        }
        .qp-faq-btn:hover { background: rgba(120,23,40,0.03); }
        .qp-faq-chevron { color: #781728; flex-shrink: 0; transition: transform 0.25s ease; }
        .qp-faq-chevron.open { transform: rotate(180deg); }

        /* Explore btn */
        .qp-explore-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 30px; border-radius: 50px;
          background: #fff; color: #4f0715;
          font-weight: 800; font-size: 0.9rem;
          cursor: pointer; border: none; font-family: 'Baloo 2', cursive;
          box-shadow: 0 4px 18px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .qp-explore-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.25); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1000px) {
          .qp-quiz-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .qp-feat-right { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .qp-hero { padding-top: 112px; min-height: auto; }
          .qp-hero-inner { grid-template-columns: 1fr; padding-bottom: 40px; gap: 28px; text-align: center; }
          .qp-hero p { margin-left: auto; margin-right: auto; }
          .qp-hero-btns { justify-content: center; }
          .qp-hero-imgs { height: 220px; }

          .qp-feat-layout { flex-direction: column !important; }
          .qp-feat-left { flex: unset !important; width: 100% !important; }
          .qp-feat-right { grid-template-columns: 1fr !important; }
          .qp-feat-card {
            align-items: center !important;
            text-align: center !important;
            max-width: 360px;
            margin-left: auto; margin-right: auto;
            width: 100%;
          }

          .qp-quiz-grid {
            grid-template-columns: 1fr !important;
            max-width: 320px !important;
            margin-left: auto !important; margin-right: auto !important;
          }
          .qp-games-grid {
            grid-template-columns: 1fr !important;
            max-width: 320px !important;
          }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="qp-hero">
        <div className="qp-hero-glow" />
        <div className="qp-hero-inner">
          <div>
            
            <h1 className="qp-a2">
              {isHi ? (
                <>क्विज़ खेलें,<br /><span>XP कमाएं!</span></>
              ) : (
                <>Play Quizzes,<br /><span>Earn XP!</span></>
              )}
            </h1>
            <p className="qp-a3">
              {isHi
                ? 'अपना विषय चुनें, सवालों का जवाब दें और लीडरबोर्ड पर चढ़ें। लॉगिन ज़रूरी है!'
                : 'Pick a subject, answer questions, and climb the leaderboard. Login needed to explore!'}
            </p>
            <div className="qp-hero-btns qp-a4">
              <button className="qp-btn-primary" onClick={() => document.getElementById('qp-quizzes')?.scrollIntoView({ behavior: 'smooth' })}>
                {isHi ? 'क्विज़ देखें' : 'Browse Quizzes'} ↓
              </button>
              <Link to="/register" className="qp-btn-outline">
                {isHi ? 'साइन अप करें' : 'Sign Up Free'}
              </Link>
            </div>
          </div>

          <div className="qp-hero-imgs qp-a3">
            <div className="qp-img-single">
              <img src="https://i.pinimg.com/736x/b9/ec/98/b9ec98be9295ec71c409334e5102adea.jpg" alt="Students" />
            </div>
            <div className="qp-img-badge">{isHi ? '5,000+ छात्र सीख रहे हैं' : '5,000+ Students Learning'}</div>
          </div>
        </div>
      </section>

      {/* Wave: #1a0208 → #fff */}
      <div className="qp-wave" style={{ background: '#1a0208' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" width="100%" height="90">
          <path d="M0,30 C240,90 480,0 720,50 C960,95 1200,10 1440,45 L1440,90 L0,90 Z" fill="#fff" />
        </svg>
      </div>

      {/* ══ FEATURES (WHITE) ══════════════════════════════ */}
      <section className="qp-features-section">
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.3rem)', fontWeight: 800, color: '#1a0208', margin: '0 0 10px' }}>
              {isHi ? 'हमारे साथ सीखें & बढ़ें' : 'Learn & Grow With Us'}
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#6b3040', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
              {isHi
                ? 'अपने कौशल को बढ़ाएं और लर्निंग एक्सपीरियंस कलेक्ट करें।'
                : 'Boost your skills and collect learning experiences. Start learning what matters most, right now.'}
            </p>
          </div>

          <div className="qp-feat-layout">
            <div className="qp-feat-left">
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#781728', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                {isHi ? 'प्लेटफ़ॉर्म की विशेषताएं' : 'PLATFORM FEATURES'}
              </div>
              <h3 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: '#1a0208', lineHeight: 1.2, marginBottom: '12px' }}>
                {isHi ? 'हर बच्चे के लिए नया तरीका' : 'A New Way for Every Child'}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#6b3040', lineHeight: 1.7, marginBottom: '20px' }}>
                {isHi ? 'हर विषय को मज़ेदार बनाएं — खेलें, सीखें और बढ़ें।' : 'Make every subject fun — play, learn, and grow in your own language.'}
              </p>
              <div className="qp-feat-card">
                <div className="qp-feat-icon"><IconMonitor /></div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1a0208' }}>
                  {isHi ? 'डिजिटल साक्षरता' : 'Digital Literacy'}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6b3040', lineHeight: 1.65, margin: 0 }}>
                  {isHi ? 'डिजिटल दुनिया को समझें।' : 'Navigate the digital world safely and effectively.'}
                </p>
              </div>
            </div>

            <div className="qp-feat-right">
              {FEATURES.slice(1).map((f, i) => (
                <div key={i} className="qp-feat-card">
                  <div className="qp-feat-icon">{f.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1a0208' }}>{isHi ? f.titleHi : f.title}</div>
                  <p style={{ fontSize: '0.8rem', color: '#6b3040', lineHeight: 1.65, margin: 0 }}>{isHi ? f.descHi : f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave: #fff → #781728 */}
      <div className="qp-wave" style={{ background: '#fff' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" width="100%" height="90">
          <path d="M0,30 C240,90 480,0 720,50 C960,95 1200,10 1440,45 L1440,90 L0,90 Z" fill="#781728" />
        </svg>
      </div>

      {/* ══ QUIZ SECTION (MAROON) ══════════════════════════ */}
      <section id="qp-quizzes" className="qp-quiz-section">
        <div style={{ maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '10px' }}>
            {isHi ? 'क्विज़ लाइब्रेरी' : 'QUIZ LIBRARY'}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.3rem)', fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
            {isHi ? 'क्विज़ का उत्तर दें, ज्ञान बढ़ाएं, अपना XP बूस्ट करें!' : 'Answer Quizzes, Gain Knowledge, Boost Your XP!'}
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.58)', maxWidth: '460px', margin: '0 auto 44px', lineHeight: 1.75 }}>
            {isHi ? 'अपना विषय चुनें और अपने ज्ञान का परीक्षण करें।' : 'Choose a subject and test your knowledge.'}
          </p>

          <div className="qp-quiz-grid">
            {QUIZZES.map(q => (
              <div key={q._id} className="qp-quiz-card">
                {/* Full background image */}
                <img src={q.img} alt={q.title} className="qp-quiz-card-bg" />
                {/* Dark gradient overlay */}
                <div className="qp-quiz-card-overlay" />
                {/* Bottom-centre: icon + title + desc */}
                <div className="qp-quiz-card-content">
                  <div className="qp-quiz-card-icon">{q.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>
                    {isHi ? q.titleHi : q.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
                    {isHi ? q.descHi : q.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="qp-explore-btn" onClick={() => navigate('/subjects')}>
            {isHi ? 'सभी क्विज़ देखें' : 'Explore All Quizzes'} <IconArrowRight />
          </button>
        </div>
      </section>

      {/* Wave: #781728 → #4f0715 */}
      <div className="qp-wave" style={{ background: '#781728' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" width="100%" height="90">
          <path d="M0,45 C180,0 360,90 540,40 C720,0 900,80 1080,35 C1260,0 1380,60 1440,30 L1440,90 L0,90 Z" fill="#4f0715" />
        </svg>
      </div>

      {/* ══ GAMES SECTION (DARK) ══════════════════════════ */}
      <section className="qp-games-section">
        <div style={{ maxWidth: '1140px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '10px' }}>
            {isHi ? 'खेल' : 'GAMES'}
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.3rem)', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
            {isHi ? 'एक्सपी बूस्ट करने के लिए गेम्स खेलें!' : 'Play Games to Boost Your XP!'}
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.52)', maxWidth: '420px', margin: '0 auto 44px', lineHeight: 1.75 }}>
            {isHi ? 'मज़ेदार गेम खेलो और बोनस XP कमाओ।' : 'Play fun educational games and earn bonus XP points.'}
          </p>

          <div className="qp-games-grid">
            {GAMES.map(g => (
              <div key={g.id} className="qp-game-card">
                {/* Full background image */}
                <img src={g.img} alt={g.title} className="qp-game-card-bg" />
                {/* Dark gradient overlay */}
                <div className="qp-game-card-overlay" />
                {/* Bottom-centre: icon + title + desc */}
                <div className="qp-game-card-content">
                  <div className="qp-game-card-icon">{g.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>
                    {isHi ? g.titleHi : g.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
                    {isHi ? g.descHi : g.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="qp-explore-btn" onClick={() => navigate('/games')}>
            {isHi ? 'सभी गेम्स देखें' : 'Explore All Games'} <IconArrowRight />
          </button>
        </div>
      </section>

      {/* Wave: #4f0715 → #fff */}
      <div className="qp-wave" style={{ background: '#4f0715' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" width="100%" height="90">
          <path d="M0,55 C300,0 600,90 900,35 C1100,0 1300,70 1440,40 L1440,90 L0,90 Z" fill="#fff" />
        </svg>
      </div>

      {/* ══ FAQ (WHITE) ════════════════════════════════════ */}
      <section className="qp-faq-section">
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#781728', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: '10px' }}>
            FAQ
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.3rem)', fontWeight: 800, color: '#1a0208', margin: '0 0 40px' }}>
            {isHi ? 'आपके सवाल, हमारे जवाब' : 'Your Questions, Our Answers'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`qp-faq-item${isOpen ? ' open' : ''}`}>
                  <button className="qp-faq-btn" onClick={() => setOpenFaq(isOpen ? null : i)}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a0208' }}>{isHi ? f.qHi : f.q}</span>
                    <span className={`qp-faq-chevron${isOpen ? ' open' : ''}`}><IconChevronDown /></span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 22px 18px', fontSize: '0.87rem', color: '#6b3040', lineHeight: 1.75 }}>
                      {isHi ? f.aHi : f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}