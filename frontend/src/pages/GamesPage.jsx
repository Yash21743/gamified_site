import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// SVG Icons
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="9" height="13" rx="2"/><rect x="13" y="3" width="9" height="13" rx="2"/>
    <path d="M6 20h12"/><path d="M12 17v3"/>
  </svg>
);
const IconPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconBolt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L4.09 12.97H11L10 22l8.91-10.97H13z"/>
  </svg>
);
const IconTarget = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="9" height="13" rx="2"/><rect x="13" y="3" width="9" height="13" rx="2"/>
    <path d="M6 20h12"/><path d="M12 17v3"/>
  </svg>
);
const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const IconSeedling = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12"/><path d="M12 12C12 7 7 4 2 5c1 5 4 8 10 7z"/><path d="M12 12c0-5 5-8 10-7-1 5-4 8-10 7z"/>
  </svg>
);
const IconLeaf = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const IconFire = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);
const IconGamepad = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#781728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="4"/>
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <circle cx="15" cy="11" r="1" fill="#781728" stroke="none"/>
    <circle cx="17" cy="13" r="1" fill="#781728" stroke="none"/>
  </svg>
);
const IconMathGame = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="9" x2="15" y2="9"/>
    <line x1="12" y1="6" x2="12" y2="12"/>
    <line x1="9" y1="16" x2="15" y2="16"/>
  </svg>
);

const levelIcons = {
  normal: <IconSeedling />,
  basic:  <IconLeaf />,
  hard:   <IconFire />,
};

const GAMES = [
  {
    id: 'math-challenge',
    name: 'Math Challenge',
    subject: 'Mathematics',
    image: 'https://i.pinimg.com/474x/45/9a/32/459a32dfdd90f3edcd4d26b1fb99c257.jpg',
    description: 'Solve math equations as fast as you can! Beat the clock and earn points for every correct answer.',
    gradient: 'linear-gradient(135deg, #781728, #4f0715)',
    Icon: IconMathGame,
    levels: {
      normal: { label: 'Normal', questions: 8,  timePerQ: 15, xpReward: 30, description: 'Simple addition & subtraction. Great for beginners!' },
      basic:  { label: 'Basic',  questions: 10, timePerQ: 12, xpReward: 50, description: 'Multiplication & division. A step up from Normal.' },
      hard:   { label: 'Hard',   questions: 12, timePerQ: 8,  xpReward: 80, description: 'Algebra & mixed operations. For the brave!' },
    },
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    subject: 'Brain & Logic',
    image: 'https://i.pinimg.com/474x/be/63/99/be63994894331d5615e926f8076cf892.jpg',
    description: 'Flip cards to find matching pairs! Train your memory and concentration skills.',
    gradient: 'linear-gradient(135deg, #0f766e, #065f46)',
    Icon: IconBrain,
    levels: {
      normal: { label: 'Normal', pairs: 4, xpReward: 25, description: '4 pairs (8 cards). Easy warm-up for your memory!' },
      basic:  { label: 'Basic',  pairs: 6, xpReward: 45, description: '6 pairs (12 cards). Medium challenge.' },
      hard:   { label: 'Hard',   pairs: 8, xpReward: 70, description: '8 pairs (16 cards). Ultimate memory test!' },
    },
  },
];

const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.90) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .gm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .gm-card {
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #1a0208;
    border: 2px solid rgba(120,23,40,0.25);
    box-shadow: 0 4px 18px rgba(26,2,8,0.12);
    transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
    animation: fadeInUp 0.5s ease both;
  }
  .gm-card:hover {
    transform: translateY(-8px) scale(1.012);
    box-shadow: 0 18px 44px rgba(120,23,40,0.25);
    border-color: #781728;
  }
  .gm-card:hover .gm-img { transform: scale(1.07); }
  .gm-card:hover .gm-play-btn {
    background: linear-gradient(135deg, #781728, #1a0208);
    color: #fff;
    border-color: #781728;
  }
  .gm-card:hover .gm-icon-wrap {
    transform: rotate(-8deg) scale(1.1);
    background: rgba(255,255,255,0.2);
  }

  .gm-img-wrap {
    width: 100%; height: 185px;
    overflow: hidden; position: relative;
    background: #1a0208; padding: 7px; box-sizing: border-box;
  }
  .gm-img {
    width: 100%; height: 100%; object-fit: cover;
    display: block; border-radius: 14px;
    transition: transform 0.5s ease;
  }


  .gm-body { padding: 16px 18px 18px; background: #1a0208; }
  .gm-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .gm-name { font-size: 1.18rem; font-weight: 800; color: #fff; }
  .gm-icon-wrap {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(196,176,176,0.15);
    display: flex; align-items: center; justify-content: center;
    color: #e8a0ad; flex-shrink: 0;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease;
  }
  .gm-desc { font-size: 0.84rem; color: #b9b5b5; line-height: 1.6; margin-bottom: 12px; min-height: 38px; }

  .gm-badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .gm-badge {
    font-size: 0.72rem; padding: 3px 9px; border-radius: 20px;
    border: 1px solid rgba(228, 228, 228, 1);
    background: rgba(120,23,40,0.12); color: #e8a0ad; font-weight: 700;
    display: flex; align-items: center; gap: 4px;
  }

  .gm-play-btn {
    width: 100%; padding: 10px 16px; border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.3);
    background: transparent; color: #df96a3;
    font-size: 0.9rem; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: all 0.3s ease; box-sizing: border-box; font-family: inherit;
    position: relative; overflow: hidden;
  }
  .gm-play-btn::after {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
  .gm-card:hover .gm-play-btn::after { animation: shimmer 0.55s ease; }

  /* Modal */
  .gm-modal {
  width: 100%;
  max-width: 500px;
  max-height: 92vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 22px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 24px 64px rgba(120,23,40,0.28);
  animation: modalIn 0.32s cubic-bezier(0.34,1.56,0.64,1);
  scrollbar-width: none;
}
  .gm-modal::-webkit-scrollbar { display: none; }

 .gm-modal-img {
  width: 100%; height: 120px; object-fit: cover;
  display: block; border-radius: 22px 22px 0 0; flex-shrink: 0;
}
  .gm-modal-body { padding: 16px 20px 20px; }

  .gm-modal-title {
    font-size: 1.28rem; font-weight: 800; color: #1a0208;
    display: flex; align-items: center; gap: 10px; margin-bottom: 3px;
  }
  .gm-modal-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(120,23,40,0.09);
    display: flex; align-items: center; justify-content: center;
    color: #781728; flex-shrink: 0;
  }
  .gm-modal-subject { font-size: 0.85rem; color: #6b7280; margin-bottom: 18px; padding-left: 2px; }

  .gm-level-label {
    font-size: 0.78rem; font-weight: 700; color: #6b7280;
    text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 10px;
  }
  .gm-level-row { display: flex; gap: 8px; margin-bottom: 14px; }
  .gm-level-btn {
    flex: 1; padding: 9px 8px; border-radius: 10px;
    font-weight: 700; font-size: 0.85rem; cursor: pointer;
    font-family: inherit; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }

  .gm-level-desc {
    background: rgba(120,23,40,0.05);
    border: 1px solid rgba(120,23,40,0.15);
    border-radius: 12px; padding: 12px 14px; margin-bottom: 14px;
    font-size: 0.86rem; color: #4b1a24; line-height: 1.55;
    display: flex; align-items: flex-start; gap: 8px;
  }

  .gm-info-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 13px; border-radius: 10px;
    background: rgba(120,23,40,0.05);
    border: 1px solid rgba(120,23,40,0.1);
    font-size: 0.85rem; color: #1a0208; margin-bottom: 8px;
  }
  .gm-info-row svg { color: #781728; flex-shrink: 0; }

  .gm-modal-actions { display: flex; gap: 10px; margin-top: 18px; }
  .gm-btn-cancel {
    flex: 1; padding: 11px; border-radius: 11px;
    border: 1.5px solid #e5e7eb; background: transparent;
    color: #6b7280; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all 0.22s;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }
  .gm-btn-cancel:hover { border-color: #781728; color: #781728; }
  .gm-btn-start {
    flex: 2; padding: 11px; border-radius: 11px; border: none;
    background: linear-gradient(135deg, #781728, #1a0208);
    color: #fff; font-size: 0.9rem; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: all 0.28s;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    box-shadow: 0 5px 18px rgba(120,23,40,0.32);
  }
  .gm-btn-start:hover { transform: translateY(-2px); box-shadow: 0 9px 26px rgba(120,23,40,0.42); }

  .gm-page-header { margin-bottom: 36px; animation: fadeInUp 0.4s ease both; }
  .gm-heading-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
  .gm-heading-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
  .gm-h1 { font-size: 2rem; font-weight: 900; color: var(--text, #1a0208); margin: 0; }
  .gm-subtitle { color: var(--text-muted, #6b7280); font-size: 0.95rem; margin: 0; }

  @media (max-width: 560px) {
    .gm-modal { border-radius: 18px; }
    .gm-modal-img { height: 130px; border-radius: 18px 18px 0 0; }
    .gm-modal-body { padding: 16px 16px 20px; }
    .gm-modal-title { font-size: 1.1rem; }
    .gm-level-row { flex-direction: column; }
  }
`;

export default function GamesPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedGame, setSelectedGame]   = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('normal');

  const getGameDetails = (gameId) => {
    const data = {
      en: {
        'math-challenge': {
          name: t('mathChallengeName'),
          description: t('mathChallengeDesc'),
          subject: t('mathChallengeSub'),
          levels: {
            normal: { label: 'Normal', description: 'Simple addition & subtraction. Great for beginners!' },
            basic:  { label: 'Basic',  description: 'Multiplication & division. A step up from Normal.' },
            hard:   { label: 'Hard',   description: 'Algebra & mixed operations. For the brave!' },
          }
        },
        'memory-match': {
          name: t('memoryMatchName'),
          description: t('memoryMatchDesc'),
          subject: t('memoryMatchSub'),
          levels: {
            normal: { label: 'Normal', description: '4 pairs (8 cards). Easy warm-up for your memory!' },
            basic:  { label: 'Basic',  description: '6 pairs (12 cards). Medium challenge.' },
            hard:   { label: 'Hard',   description: '8 pairs (16 cards). Ultimate memory test!' },
          }
        }
      },
      hi: {
        'math-challenge': {
          name: t('mathChallengeName'),
          description: t('mathChallengeDesc'),
          subject: t('mathChallengeSub'),
          levels: {
            normal: { label: 'सामान्य', description: 'साधारण जोड़ और घटाव। शुरुआती लोगों के लिए बढ़िया!' },
            basic:  { label: 'बुनियादी',  description: 'गुणा और भाग। सामान्य से एक कदम ऊपर।' },
            hard:   { label: 'कठिन',   description: 'बीजगणित और मिश्रित संक्रियाएं। साहसी लोगों के लिए!' },
          }
        },
        'memory-match': {
          name: t('memoryMatchName'),
          description: 'मिलान करने वाले जोड़े खोजने के लिए कार्ड पलटें! अपनी याददाश्त और एकाग्रता कौशल को प्रशिक्षित करें।',
          subject: t('memoryMatchSub'),
          levels: {
            normal: { label: 'सामान्य', description: '4 जोड़े (8 कार्ड)। आपकी याददाश्त के लिए आसान वार्म-अप!' },
            basic:  { label: 'बुनियादी',  description: '6 जोड़े (12 कार्ड)। मध्यम चुनौती।' },
            hard:   { label: 'कठिन',   description: '8 जोड़े (16 कार्ड)। परम स्मृति परीक्षण!' },
          }
        }
      }
    };
    const lang = language === 'hi' ? 'hi' : 'en';
    return data[lang][gameId];
  };

  const activeLevel = selectedGame ? selectedGame.levels[selectedLevel] : null;

  const handleProceed = () => {
    navigate(`/games/${selectedGame.id}/play?level=${selectedLevel}`);
    setSelectedGame(null);
  };

  if (typeof document !== 'undefined') {
    document.body.style.overflow = selectedGame ? 'hidden' : '';
    document.documentElement.style.overflow = selectedGame ? 'hidden' : '';
  }

  return (
    <div>
      <style>{styles}</style>

      {/* Header */}
      <div className="gm-page-header">
        <div className="gm-heading-row">
          <div className="gm-heading-icon"><IconGamepad /></div>
          <h1 className="gm-h1">{t('gamesTitle')}</h1>
        </div>
        <p className="gm-subtitle">{t('gamesSubtitle')}</p>
      </div>

      {/* Cards Grid */}
      <div className="gm-grid">
        {GAMES.map((game, i) => {
          const details = getGameDetails(game.id);
          return (
            <div
              key={game.id}
              className="gm-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="gm-img-wrap">
                <img src={game.image} alt={details.name} className="gm-img" loading="lazy" />
                <div className="gm-img-overlay" />
              </div>
              <div className="gm-body">
                <div className="gm-header">
                  <div className="gm-name">{details.name}</div>
                  <div className="gm-icon-wrap"><game.Icon /></div>
                </div>
                <p className="gm-desc">{details.description}</p>
                <div className="gm-badges">
                  {Object.entries(game.levels).map(([key, lvl]) => (
                    <span key={key} className="gm-badge">
                      {levelIcons[key]} {details.levels[key].label}: +{lvl.xpReward} XP
                    </span>
                  ))}
                </div>
                <button
                  className="gm-play-btn"
                  onClick={() => { setSelectedGame(game); setSelectedLevel('normal'); }}
                >
                  <IconPlay /> {t('playNowBtn')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal via Portal */}
      {selectedGame && activeLevel && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(10,0,4,0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'overlayIn 0.22s ease',
          }}
          onClick={() => setSelectedGame(null)}
        >
          <div className="gm-modal" onClick={e => e.stopPropagation()}>

            <img src={selectedGame.image} alt={getGameDetails(selectedGame.id).name} className="gm-modal-img" />

            <div className="gm-modal-body">

              {/* Title */}
              <div className="gm-modal-title">
                <div className="gm-modal-icon"><selectedGame.Icon /></div>
                {getGameDetails(selectedGame.id).name}
              </div>
              <p className="gm-modal-subject">{getGameDetails(selectedGame.id).subject}</p>

              {/* Level Picker */}
              <p className="gm-level-label">{t('chooseDifficulty')}</p>
              <div className="gm-level-row">
                {Object.entries(selectedGame.levels).map(([key, lvl]) => (
                  <button
                    key={key}
                    className="gm-level-btn"
                    onClick={() => setSelectedLevel(key)}
                    style={{
                      border: selectedLevel === key ? '2px solid #781728' : '2px solid rgba(120,23,40,0.2)',
                      background: selectedLevel === key ? 'rgba(120,23,40,0.08)' : 'transparent',
                      color: selectedLevel === key ? '#781728' : '#6b7280',
                    }}
                  >
                    {levelIcons[key]} {getGameDetails(selectedGame.id).levels[key].label}
                  </button>
                ))}
              </div>

              {/* Level Desc */}
              <div className="gm-level-desc">
                <IconInfo />
                {getGameDetails(selectedGame.id).levels[selectedLevel].description}
              </div>

              {/* Info Rows */}
              <div className="gm-info-row">
                <IconBolt />
                <span>{t('xpRewardOnCompletion').replace('{xp}', activeLevel.xpReward)}</span>
              </div>
              {selectedGame.id === 'math-challenge' && (
                <>
                  <div className="gm-info-row">
                    <IconTarget />
                    <span>{t('questionsMathProblems').replace('{count}', activeLevel.questions)}</span>
                  </div>
                  <div className="gm-info-row">
                    <IconClock />
                    <span>{t('timePerQuestionSecs').replace('{count}', activeLevel.timePerQ)}</span>
                  </div>
                </>
              )}
              {selectedGame.id === 'memory-match' && (
                <div className="gm-info-row">
                  <IconCard />
                  <span>{t('pairsCardsCount').replace('{pairs}', activeLevel.pairs).replace('{cards}', activeLevel.pairs * 2)}</span>
                </div>
              )}
              <div className="gm-info-row">
                <IconInfo />
                <span>{t('gameHintFooter')}</span>
              </div>

              {/* Actions */}
              <div className="gm-modal-actions">
                <button className="gm-btn-cancel" onClick={() => setSelectedGame(null)}>
                  <IconClose /> {t('cancel')}
                </button>
                <button className="gm-btn-start" onClick={handleProceed}>
                  {t('startGameBtn')} <IconArrow />
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}