import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

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

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const tick = () => {
        start = Math.min(start + step, target);
        setCount(Math.floor(start));
        if (start < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [count, ref];
}

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
const IconStar = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M24 4l5.09 10.31L41 16.18l-8.5 8.28 2.01 11.72L24 30.77l-10.51 5.41 2.01-11.72L7 16.18l11.91-1.87L24 4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
  </svg>
);
const IconLanguage = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M24 4C24 4 16 12 16 24s8 20 8 20M24 4c0 0 8 8 8 20s-8 20-8 20M4 24h40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconOffline = () => (
  <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
    <path d="M6 28a12 12 0 0 1 12-12h12a12 12 0 0 1 0 24H18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M14 36l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function StatItem({ target, suffix, label }) {
  const [count, ref] = useCountUp(target);
  return (
    <div className="lp-stat-item" ref={ref}>
      <div className="lp-stat-val">{count.toLocaleString()}{suffix}</div>
      <div className="lp-stat-lbl">{label}</div>
    </div>
  );
}

function Avatar({ name, color, img }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  if (img) {
    return (
      <div style={{
        width: 46, height: 46, borderRadius: '50%', overflow: 'hidden',
        flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)'
      }}>
        <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div style={{
      width: 46, height: 46, borderRadius: '50%',
      background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.95rem', fontWeight: 800, color: '#fff',
      fontFamily: "'Baloo 2', cursive", flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.2)'
    }}>{initials}</div>
  );
}

// Infinite scroll testimonials
function TestimonialScroller({ testimonials }) {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className="lp-testi-scroll-outer">
      <div className="lp-testi-scroll-track">
        {doubled.map((item, i) => (
          <div className="lp-testi-scroll-card" key={i}>
            <div className="lp-testi-stars">
              {[...Array(5)].map((_, si) => <span key={si} className="lp-testi-star">★</span>)}
            </div>
            <div className="lp-testi-text">"{item.text}"</div>
            <div className="lp-testi-header">
              <Avatar name={item.name} color={item.color} img={item.img} />
              <div>
                <div className="lp-testi-name">{item.name}</div>
                <div className="lp-testi-village">📍 {item.village}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  useReveal(language);



  const features = [
    { icon: <IconQuiz />,     title: t('featureSmartQuizzesTitle'),  desc: t('featureSmartQuizzesDesc') },
    { icon: <IconGame />,     title: t('featureMiniGamesTitle'),     desc: t('featureMiniGamesDesc') },
    { icon: <IconTrophy />,   title: t('featureLeaderboardsTitle'),  desc: t('featureLeaderboardsDesc') },
    { icon: <IconStar />,     title: t('featureEarnRewardsTitle'),   desc: t('featureEarnRewardsDesc') },
    { icon: <IconLanguage />, title: t('featureMultilanguageTitle'), desc: t('featureMultilanguageDesc') },
    { icon: <IconOffline />,  title: t('featureOfflineTitle'),       desc: t('featureOfflineDesc') },
  ];

  const testimonials = [
    {
      name: t('testi1Name'), village: t('testi1Village'), color: '#781728', text: t('testi1Text'),
      img: 'https://i.pinimg.com/474x/a8/b8/57/a8b857851e42a253b8ab486400edb3b0.jpg'
    },
    {
      name: t('testi2Name'), village: t('testi2Village'), color: '#4f0715', text: t('testi2Text'),
      img: 'https://i.pinimg.com/736x/38/d0/66/38d066d7a3c7161e920fa6a2ec04f6b6.jpg'
    },
    {
      name: t('testi3Name'), village: t('testi3Village'), color: '#ad5b67', text: t('testi3Text'),
      img: 'https://i.pinimg.com/1200x/55/51/f8/5551f8a9f8251e9b5e22cd7ee3d405f3.jpg'
    },
    {
      name: t('testi4Name'), village: t('testi4Village'), color: '#781728', text: t('testi4Text'),
      img: 'https://i.pinimg.com/1200x/9f/c8/0a/9fc80a93344242f2d950e90004f80c21.jpg'
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Hind:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Hind', sans-serif; background: #fff; color: #1a1a1a; overflow-x: hidden; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .rd1{transition-delay:0.07s} .rd2{transition-delay:0.15s}
        .rd3{transition-delay:0.23s} .rd4{transition-delay:0.31s} .rd5{transition-delay:0.39s}

        /* ══ HERO ══ */
        .lp-hero {
          min-height: 100vh;
          background: #1a0208;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 100px 5% 0;
        }
        .lp-hero-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 70% 25%, rgba(120,23,40,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 15% 75%, rgba(79,7,21,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(79,7,21,0.2) 0%, transparent 70%);
        }
        .lp-hero-content {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
          position: relative; z-index: 2;
          padding-bottom: 18px;
        }
        .lp-hero-h1 {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 800; line-height: 1.1; color: #fff; margin-bottom: 16px;
        }
        .lp-hero-h1 span { color: #fbbfca; }
        .lp-hero-p {
          font-size: 1rem; color: rgba(255,255,255,0.7);
          line-height: 1.75; margin-bottom: 32px; max-width: 420px;
        }
        .lp-hero-btns { display: flex; gap: 14px; flex-wrap: nowrap; align-items: center; }

        .lp-btn-primary {
          background: #fff; color: #4f0715; border: none; border-radius: 50px;
          padding: 13px 28px; font-size: 0.93rem; font-weight: 800;
          cursor: pointer; font-family: 'Baloo 2', cursive;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(0,0,0,0.2);
          white-space: nowrap;
        }
        .lp-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(0,0,0,0.25); }
        .lp-btn-secondary {
          background: transparent; color: #fff;
          border: 2px solid rgba(255,255,255,0.45); border-radius: 50px;
          padding: 13px 28px; font-size: 0.93rem; font-weight: 700;
          cursor: pointer; font-family: 'Baloo 2', cursive;
          transition: background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .lp-btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        /* Hero right images */
        .lp-hero-imgs { position: relative; height: 420px; }
        .lp-hero-img-main {
          position: absolute; top: 0; right: 0;
          width: 78%; height: 78%;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          transition: transform 0.5s ease;
        }
        .lp-hero-img-main:hover { transform: scale(1.04); }
        .lp-hero-img-main img { width: 100%; height: 100%; object-fit: cover; }
        .lp-hero-img-sec {
          position: absolute; bottom: 0; left: 0;
          width: 58%; height: 55%;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.45);
          border: 3px solid #1a0208;
          transition: transform 0.5s ease;
        }
        .lp-hero-img-sec:hover { transform: scale(1.05); }
        .lp-hero-img-sec img { width: 100%; height: 100%; object-fit: cover; }
        .lp-hero-img-badge {
          position: absolute; bottom: 22%; left: 38%;
          background: #781728; color: #fff;
          border-radius: 50px; padding: 9px 16px;
          font-family: 'Baloo 2', cursive; font-size: 0.8rem; font-weight: 700;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4); white-space: nowrap;
          border: 2px solid rgba(255,255,255,0.15);
          animation: floatBadge 4s ease-in-out infinite;
          z-index: 3; pointer-events: none;
        }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

        /* ══ STATS ══ */
        .lp-stats-band { background: #781728; padding: 44px 5% 48px; }
        .lp-stats-inner-wrap {
          max-width: 960px; margin: 0 auto;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px; padding: 32px 40px;
          display: flex; justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap; gap: 0;
        }
        .lp-stat-item {
          text-align: center; flex: 1;
          padding: 0 12px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .lp-stat-item + .lp-stat-item { border-left: 1px solid rgba(255,255,255,0.15); }
        .lp-stat-val {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 800; color: #fff; line-height: 1;
        }
        .lp-stat-lbl {
          font-size: 0.78rem; color: rgba(255,255,255,0.52);
          margin-top: 6px; letter-spacing: 0.5px;
        }

        /* ══ FEATURES ══ */
        .lp-features { background: #781728; padding: 0 5% 52px; }
        .lp-features-inner { max-width: 1200px; margin: 0 auto; }
        .lp-section-eyebrow {
          font-size: 0.67rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px;
        }
        .lp-section-title {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 800; color: #fff;
          margin-bottom: 10px; line-height: 1.2;
        }
        .lp-section-sub {
          font-size: 0.92rem; color: rgba(255,255,255,0.58);
          max-width: 460px; line-height: 1.7; margin-bottom: 32px;
        }
        .lp-features-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 14px;
        }
        .lp-feature-card {
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 24px 20px;
          transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
          display: flex; flex-direction: column;
          cursor: pointer;
        }
        .lp-feature-card:hover {
          transform: translateY(-5px); background: rgba(255,255,255,0.12);
          box-shadow: 0 12px 36px rgba(0,0,0,0.2);
        }
        .lp-feature-icon {
          color: #fbbfca; margin-bottom: 14px;
          width: 50px; height: 50px;
          background: rgba(251,191,202,0.1); border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .lp-feature-card:hover .lp-feature-icon {
          transform: rotate(18deg) scale(1.18);
        }
        .lp-feature-title { font-family: 'Baloo 2', cursive; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 7px; }
        .lp-feature-desc { font-size: 0.85rem; color: rgba(255,255,255,0.56); line-height: 1.65; }

        /* ══ HOW IT WORKS ══ */
        .lp-how { background: #fff; padding: 52px 5% 56px; }
        .lp-how-inner { max-width: 1200px; margin: 0 auto; display: flex; gap: 64px; align-items: center; flex-wrap: wrap; }
        .lp-how-left { flex: 1; min-width: 240px; }
        .lp-how-steps { flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 12px; }
        .lp-step {
          display: flex; gap: 16px; align-items: flex-start;
          background: #fdf5f6; border-radius: 14px; padding: 18px 20px;
          border: 1px solid rgba(120,23,40,0.07);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .lp-step:hover { transform: translateX(5px); box-shadow: 0 6px 24px rgba(79,7,21,0.1); }
        .lp-step-num {
          flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%;
          background: #4f0715; display: flex; align-items: center; justify-content: center;
          font-family: 'Baloo 2', cursive; font-size: 0.88rem; font-weight: 800; color: #fff;
        }
        .lp-step-title { font-family: 'Baloo 2', cursive; font-size: 0.97rem; font-weight: 700; color: #2d0209; margin-bottom: 3px; }
        .lp-step-desc { font-size: 0.84rem; color: #6b3040; line-height: 1.58; }
        .lp-how .lp-section-eyebrow { color: #ad5b67; }
        .lp-how .lp-section-title { color: #2d0209; }
        .lp-how .lp-section-sub { color: #6b3040; }

        /* ══ TESTIMONIALS INFINITE SCROLL ══ */
        .lp-testi { background: #4f0715; padding: 52px 0 56px; }
        .lp-testi-inner { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
        .lp-testi-scroll-outer {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .lp-testi-scroll-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: scrollLeft 32s linear infinite;
          padding: 8px 0;
        }
        .lp-testi-scroll-outer:hover .lp-testi-scroll-track {
          animation-play-state: paused;
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .lp-testi-scroll-card {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.11);
          border-radius: 16px; padding: 22px 20px;
          width: 300px; flex-shrink: 0;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .lp-testi-scroll-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
        .lp-testi-stars { display: flex; gap: 2px; margin-bottom: 10px; }
        .lp-testi-star { color: #fbbfca; font-size: 0.8rem; }
        .lp-testi-text { font-size: 0.89rem; color: rgba(255,255,255,0.82); line-height: 1.72; font-style: italic; margin-bottom: 14px; }
        .lp-testi-header { display: flex; align-items: center; gap: 10px; }
        .lp-testi-name { font-family: 'Baloo 2', cursive; font-weight: 700; color: #fff; font-size: 0.92rem; }
        .lp-testi-village { font-size: 0.73rem; color: rgba(255,255,255,0.45); margin-top: 2px; }

        /* ══ CTA ══ */
        .lp-cta { background: #fff; padding: 52px 5% 18px; }
        .lp-cta-box {
          max-width: 1100px; margin: 0 auto;
          border-radius: 24px; overflow: hidden;
          position: relative; min-height: 360px;
          display: flex; align-items: center; justify-content: center; text-align: center;
        }
        .lp-cta-bg {
          position: absolute; inset: 0;
          background-image: url('https://i.pinimg.com/1200x/ee/be/8a/eebe8a73a7eed94dfc2a96ca4699e4b8.jpg');
          background-size: cover; background-position: center;
          transition: transform 0.7s ease; transform: scale(1);
        }
        .lp-cta-box:hover .lp-cta-bg { transform: scale(1.07); }
        .lp-cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(26,2,8,0.9) 0%, rgba(79,7,21,0.84) 50%, rgba(120,23,40,0.8) 100%);
        }
        .lp-cta-inner { position: relative; z-index: 2; padding: 60px 56px; width: 100%; }
        .lp-cta-eyebrow {
          font-size: 0.67rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.42); margin-bottom: 12px;
        }
        .lp-cta-title {
          font-family: 'Baloo 2', cursive;
          font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; color: #fff; margin-bottom: 14px;
        }
        .lp-cta-sub {
          font-size: 0.97rem; color: rgba(255,255,255,0.7);
          margin-bottom: 30px; line-height: 1.7;
          max-width: 500px; margin-left: auto; margin-right: auto;
        }
        .lp-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* ══ TABLET RESPONSIVE (769px – 1200px) ══ */
        @media (min-width: 769px) and (max-width: 1200px) {
          .lp-hero {
            min-height: auto;
            padding: 100px 5% 0;
          }
          .lp-hero-content {
            gap: 32px;
            padding-bottom: 12px;
            padding-top:20px;
          }
          .lp-hero-imgs {
            height: 320px;
          }
          .lp-hero-h1 {
            font-size: clamp(2rem, 3.8vw, 2.8rem);
          }
          .lp-hero-p {
            margin-bottom: 20px;
          }
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 768px) {
           .lp-hero {
    min-height: auto;
    padding: 72px 5% 0;
    align-items: flex-start;
  }

  .lp-hero-content {
    grid-template-columns: 1fr;
     padding-top: 25px; 
    padding-bottom: 18px;
    gap: 12px;
    text-align: center;
  }

  .lp-hero-imgs {
    width: 100%;
    height: 190px;
    margin-top: 0;
    margin-bottom: 0;
  }

          .lp-hero-h1 {
            font-size: clamp(2rem, 8vw, 2.8rem);
            margin-top: 12px;
          }
          .lp-hero-p { margin-left: auto; margin-right: auto; text-align: center; }
          .lp-hero-btns {
            justify-content: center;
            flex-wrap: nowrap;
             margin-bottom: 20px; 
            gap: 10px;
          }
          .lp-btn-primary, .lp-btn-secondary {
            padding: 11px 20px;
            font-size: 0.85rem;
          }
        
          .lp-stats-inner-wrap {
            padding: 24px 16px;
            flex-wrap: wrap;
            gap: 0;
          }
          .lp-stat-item {
            flex: 1 1 45%;
            padding: 12px 8px;
          }
          .lp-stat-item + .lp-stat-item { border-left: none; }
          .lp-stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.15); }
          .lp-stat-item:nth-child(1),
          .lp-stat-item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.15); }
          .lp-how-inner { flex-direction: column; gap: 28px; }
          .lp-cta-inner { padding: 40px 20px; }
          .lp-testi-scroll-card { width: 260px; }
        }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-glow" />
        <div className="lp-hero-content">
          {/* Left */}
          <div>
            <h1 className="lp-hero-h1">{t('heroH1_1')}<br /><span>Grow!</span></h1>
            <p className="lp-hero-p">{t('heroP')}</p>
            <div className="lp-hero-btns">
              <button className="lp-btn-primary" onClick={() => navigate('/register')}>{t('startLearningFree')}</button>
              <button className="lp-btn-secondary" onClick={() => navigate('/login')}>{t('loginArrow')}</button>
            </div>
          </div>

          {/* Right — images with hover zoom */}
          <div className="lp-hero-imgs">
            <div className="lp-hero-img-main">
              <img src="https://i.pinimg.com/736x/01/e7/05/01e705f332839e5eeedb2bfbe36c4836.jpg" alt="Students learning" />
            </div>
            <div className="lp-hero-img-sec">
              <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=75" alt="Rural classroom" />
            </div>
            <div className="lp-hero-img-badge">{t('heroStudentsBadge')}</div>
          </div>
        </div>
      </section>

      {/* ══ Wave: hero #1a0208 → stats #781728 ══ */}
      <div style={{ background: '#1a0208', lineHeight: 0, marginBottom: '-1px' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="110" style={{ display: 'block' }}>
          <path d="M0,0 C200,100 400,20 600,70 C800,120 1000,10 1200,65 C1320,95 1400,40 1440,60 L1440,110 L0,110 Z" fill="#781728"/>
        </svg>
      </div>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className="lp-stats-band">
        <div className="lp-stats-inner-wrap">
          <StatItem target={5000} suffix="+" label={t('students')} />
          <StatItem target={50}   suffix="+" label={t('quizzesStat')} />
          <StatItem target={120}  suffix="+" label={t('villages')} />
          <StatItem target={5}    suffix="+" label={t('languages')} />
        </div>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section className="lp-features" id="features">
        <div className="lp-features-inner">
          <div className="reveal">
            <div className="lp-section-eyebrow">{t('platformFeatures')}</div>
            <div className="lp-section-title" style={{ whiteSpace: 'pre-line' }}>{t('featuresTitle')}</div>
            <div className="lp-section-sub">{t('featuresSub')}</div>
          </div>
          <div className="lp-features-grid">
            {features.map((f, i) => (
              <div className={`lp-feature-card reveal rd${(i % 4) + 1}`} key={f.title}>
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Wave: features #781728 → how #fff ══ */}
      <div style={{ background: '#781728', lineHeight: 0, marginBottom: '-1px' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="110" style={{ display: 'block' }}>
          <path d="M0,40 C180,110 360,0 540,70 C720,130 900,20 1080,75 C1260,120 1380,30 1440,55 L1440,110 L0,110 Z" fill="#fff"/>
        </svg>
      </div>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section className="lp-how" id="how">
        <div className="lp-how-inner">
          <div className="lp-how-left reveal">
            <div className="lp-section-eyebrow">{t('howItWorks')}</div>
            <div className="lp-section-title" style={{ whiteSpace: 'pre-line' }}>{t('howTitle')}</div>
            <div className="lp-section-sub" style={{ marginBottom: 0 }}>{t('howSub')}</div>
          </div>
          <div className="lp-how-steps">
            {[
              { n: '01', title: t('step1Title'), desc: t('step1Desc') },
              { n: '02', title: t('step2Title'), desc: t('step2Desc') },
              { n: '03', title: t('step3Title'), desc: t('step3Desc') },
              { n: '04', title: t('step4Title'), desc: t('step4Desc') },
            ].map((s, i) => (
              <div className={`lp-step reveal rd${i + 1}`} key={s.n}>
                <div className="lp-step-num">{s.n}</div>
                <div>
                  <div className="lp-step-title">{s.title}</div>
                  <div className="lp-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Wave: how #fff → testimonials #4f0715 ══ */}
      <div style={{ background: '#fff', lineHeight: 0, marginBottom: '-1px' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="110" style={{ display: 'block' }}>
          <path d="M0,60 C300,0 600,110 900,40 C1100,0 1280,90 1440,45 L1440,110 L0,110 Z" fill="#4f0715"/>
        </svg>
      </div>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="lp-testi">
        <div className="lp-testi-inner">
          <div className="reveal" style={{ marginBottom: 26 }}>
            <div className="lp-section-eyebrow">{t('realStories')}</div>
            <div className="lp-section-title">{t('familiesSay')}</div>
          </div>
        </div>
        <TestimonialScroller testimonials={testimonials} />
      </section>

      {/* ══ Wave: testimonials #4f0715 → cta #fff ══ */}
      <div style={{ background: '#4f0715', lineHeight: 0, marginBottom: '-1px' }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="110" style={{ display: 'block' }}>
          <path d="M0,50 C240,110 480,10 720,70 C960,120 1200,15 1440,55 L1440,110 L0,110 Z" fill="#fff"/>
        </svg>
      </div>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="lp-cta">
        <div className="lp-cta-box reveal">
          <div className="lp-cta-bg" />
          <div className="lp-cta-overlay" />
          <div className="lp-cta-inner">
            <div className="lp-cta-eyebrow">{t('platformFeatures')}</div>
            <div className="lp-cta-title">{t('ctaTitle')}</div>
            <div className="lp-cta-sub">{t('ctaSub')}</div>
            <div className="lp-cta-btns">
              <button className="lp-btn-primary" onClick={() => navigate('/register')}>{t('ctaBtnPrimary')}</button>
              <button className="lp-btn-secondary" onClick={() => navigate('/login')}>{t('ctaBtnSecondary')}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}