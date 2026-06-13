import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

// SVG Icons
const IconBook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
    <path d="M6 6h10M6 10h10M6 14h6"/>
  </svg>
);
const IconHindi = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconMath = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="9" y1="9" x2="15" y2="9"/>
    <line x1="12" y1="6" x2="12" y2="12"/>
    <line x1="9" y1="16" x2="15" y2="16"/>
  </svg>
);
const IconScience = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h12"/>
    <path d="M9 2v6L4.2 19.4a2 2 0 0 0 1.8 2.6h12a2 2 0 0 0 1.8-2.6L15 8V2"/>
    <path d="M6 16h12"/>
  </svg>
);
const IconSST = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
    <path d="M2 12h20"/>
  </svg>
);
const IconSubjects = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconBolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L4.09 12.97H11L10 22l8.91-10.97H13z"/>
  </svg>
);
const IconInfo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const IconWarning = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
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

const getGroupFromGrade = (grade) => {
  const g = Number(grade);
  if (g >= 1 && g <= 3) return 'A';
  if (g >= 4 && g <= 6) return 'B';
  return 'C';
};

const MOCK_QUIZZES_METADATA = {
  A: {
    english: { id: 'dq_a_eng', title: 'Alphabet & Phonics', questions: 10, timeLimit: 5, xpReward: 50 },
    hindi:   { id: 'dq_a_hin', title: 'हिंदी शब्द और शब्दावली', questions: 10, timeLimit: 5, xpReward: 50 },
    math:    { id: 'dq_a_math', title: 'Basic Counting & Addition', questions: 10, timeLimit: 5, xpReward: 50 },
    science: { id: 'dq_a_sci', title: 'Living & Non-Living Things', questions: 10, timeLimit: 5, xpReward: 50 },
    gk:      { id: 'dq_a_sst', title: 'My Family & Neighborhood', questions: 10, timeLimit: 5, xpReward: 50 },
  },
  B: {
    english: { id: 'dq_b_eng', title: 'English Nouns & Verbs', questions: 10, timeLimit: 5, xpReward: 60 },
    hindi:   { id: 'dq_b_hin', title: 'हिंदी व्याकरण बुनियादी बातें', questions: 10, timeLimit: 5, xpReward: 60 },
    math:    { id: 'dq_b_math', title: 'Multiplication & Division', questions: 10, timeLimit: 5, xpReward: 60 },
    science: { id: 'dq_b_sci', title: 'Water Cycle & Climate', questions: 10, timeLimit: 5, xpReward: 60 },
    gk:      { id: 'dq_b_sst', title: 'States & Geography of India', questions: 10, timeLimit: 5, xpReward: 60 },
  },
  C: {
    english: { id: 'dq_c_eng', title: 'Advanced Grammar & Voice', questions: 10, timeLimit: 5, xpReward: 80 },
    hindi:   { id: 'dq_c_hin', title: 'हिंदी व्याकरण और नियम', questions: 10, timeLimit: 5, xpReward: 80 },
    math:    { id: 'dq_c_math', title: 'Equations & Algebra', questions: 10, timeLimit: 5, xpReward: 80 },
    science: { id: 'dq_c_sci', title: 'Force, Motion & Energy', questions: 10, timeLimit: 5, xpReward: 80 },
    gk:      { id: 'dq_c_sst', title: 'Indian Constitution & Civics', questions: 10, timeLimit: 5, xpReward: 80 },
  },
};

const subjects = [
  {
    id: 'english',
    name: 'English',
    Icon: IconBook,
    image: 'https://i.pinimg.com/1200x/05/8e/ba/058ebae3c23b49562573e5b594f82a94.jpg',
    description: 'Master reading, writing, and vocabulary with interactive stories and quizzes.',
  },
  {
    id: 'hindi',
    name: 'हिंदी',
    Icon: IconHindi,
    image: 'https://i.pinimg.com/474x/10/ba/72/10ba7203cf55f321d21baaa6e6a8b458.jpg',
    description: 'हिंदी स्वर, व्यंजन, शब्दावली और व्याकरण की बुनियादी अवधारणाओं को सीखें।',
  },
  {
    id: 'math',
    name: 'Mathematics',
    Icon: IconMath,
    image: 'https://i.pinimg.com/474x/7d/04/a4/7d04a457ab2901a205b4e5e25d7923ba.jpg',
    description: 'Master arithmetic, algebra, and logical problem-solving skills.',
  },
  {
    id: 'science',
    name: 'Science',
    Icon: IconScience,
    image: 'https://i.pinimg.com/474x/99/f7/cc/99f7cc9ce3685669a1317142d3f3bc2e.jpg',
    description: 'Explore nature, experiments, the human body, and the laws of physics.',
  },
  {
    id: 'gk',
    name: 'Social Studies',
    Icon: IconSST,
    image: 'https://i.pinimg.com/474x/36/2d/20/362d2005e1b05a633b23b9d392ed105a.jpg',
    description: 'Discover history, geography, civics, and the fabric of our society.',
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

  /* ── Grid ── */
  .sub-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin-top: 8px;
  }

  /* ── Card ── */
  .sub-card {
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #1a0208;
    border: 2px solid rgba(120,23,40,0.25);
    box-shadow: 0 4px 18px rgba(26,2,8,0.12);
    transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
    animation: fadeInUp 0.5s ease both;
  }
  .sub-card:hover {
    transform: translateY(-8px) scale(1.012);
    box-shadow: 0 18px 44px rgba(120,23,40,0.25);
    border-color: #781728;
  }
  .sub-card:hover .sub-img { transform: scale(1.07); }
  .sub-card:hover .sub-start-btn {
    background: linear-gradient(135deg, #781728, #1a0208);
    color: #fff;
  }
  .sub-card:hover .sub-icon-wrap {
    transform: rotate(-8deg) scale(1.1);
    background: rgba(255,255,255,0.2);
  }

  .sub-img-wrap {
    width: 100%;
    height: 185px;
    overflow: hidden;
    position: relative;
    background:#1a0208;
    padding:7px;
  }
  .sub-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
    border-radius:20px;
  }
  .sub-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 45%, rgba(68, 8, 23, 0.6) 100%);
  }

  .sub-body {
    padding: 16px 18px 18px;
    background: #340813ff;
  }
  .sub-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .sub-name {
    font-size: 1.18rem;
    font-weight: 800;
    color: #ffffff;
  }
  .sub-icon-wrap {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(196,176,176,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e8a0ad;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease;
    flex-shrink: 0;
  }
  .sub-desc {
    font-size: 0.84rem;
    color: #b9b5b5;
    line-height: 1.6;
    margin-bottom: 14px;
    min-height: 38px;
  }
  .sub-start-btn {
    width: 100%;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.5);
    background: transparent;
    color: #df96a3;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .sub-start-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
  .sub-card:hover .sub-start-btn::after {
    animation: shimmer 0.55s ease;
  }

  /* ── MODAL OVERLAY — fixed, full screen, flex center ── */
  .sub-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10,0,4,0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: overlayIn 0.22s ease;
  overflow: hidden;  /* ← 'auto' ki jagah 'hidden' karo */
}

  /* ── MODAL BOX ── */
.sub-modal {
  width: 100%;
  max-width: 480px;
  max-height: 90vh;       /* ← dvh hatao, simple 90vh use karo */
  overflow-y: auto;
  background: var(--bg-card, #fff);
  border-radius: 22px;
  border: 1px solid var(--border, #e5e7eb);
  box-shadow: 0 24px 64px rgba(120,23,40,0.28);
  animation: modalIn 0.32s cubic-bezier(0.34,1.56,0.64,1);
  scrollbar-width: none;
  position: relative;    /* ← add karo */
  flex-shrink: 0;
}
  .sub-modal::-webkit-scrollbar { display: none; }

  .sub-modal-img {
    width: 100%;
    height: 155px;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
  }
  .sub-modal-body {
    padding: 22px 24px 24px;
  }
  .sub-modal-title {
    font-size: 1.28rem;
    font-weight: 800;
    color: var(--text, #1a0208);
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sub-modal-icon {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: rgba(120,23,40,0.09);
    display: flex; align-items: center; justify-content: center;
    color: #781728;
    flex-shrink: 0;
  }
  .sub-modal-topic {
    font-size: 0.85rem;
    color: var(--text-muted, #6b7280);
    margin-bottom: 14px;
    padding-left: 2px;
  }

  .sub-badge-mode {
    padding: 10px 13px;
    border-radius: 11px;
    font-size: 0.82rem;
    line-height: 1.5;
    margin-bottom: 12px;
    display: flex;
    gap: 9px;
    align-items: flex-start;
  }
  .sub-badge-mode svg { flex-shrink: 0; margin-top: 2px; }

  .sub-info-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 13px;
    border-radius: 10px;
    background: rgba(120,23,40,0.05);
    border: 1px solid rgba(120,23,40,0.1);
    font-size: 0.85rem;
    color: var(--text, #1a0208);
    margin-bottom: 8px;
  }
  .sub-info-row svg { color: #781728; flex-shrink: 0; }

  .sub-modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 18px;
  }
  .sub-btn-back {
    flex: 1;
    padding: 11px;
    border-radius: 11px;
    border: 1.5px solid var(--border, #e5e7eb);
    background: transparent;
    color: var(--text-muted, #6b7280);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.22s ease;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }
  .sub-btn-back:hover { border-color: #781728; color: #781728; }

  .sub-btn-proceed {
    flex: 2;
    padding: 11px;
    border-radius: 11px;
    border: none;
    background: linear-gradient(135deg, #781728, #1a0208);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.28s ease;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    box-shadow: 0 5px 18px rgba(120,23,40,0.32);
  }
  .sub-btn-proceed:hover {
    transform: translateY(-2px);
    box-shadow: 0 9px 26px rgba(120,23,40,0.42);
  }

  /* ── Page Header ── */
  .sub-page-header {
    margin-bottom: 26px;
    animation: fadeInUp 0.4s ease both;
  }
  .sub-page-title {
    font-size: 1.8rem;
    font-weight: 900;
    color: var(--text, #1a0208);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 5px;
  }
  .sub-page-title-icon {
    width: 44px; height: 44px;
    background: linear-gradient(135deg, #781728, #1a0208);
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    flex-shrink: 0;
  }
  .sub-page-subtitle {
    font-size: 0.93rem;
    color: var(--text-muted, #6b7280);
    margin-left: 56px;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .sub-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .sub-grid { grid-template-columns: 1fr; gap: 16px; }
    .sub-img-wrap { height: 160px; }
    .sub-modal { max-width: 100%; border-radius: 18px; }
    .sub-modal-img { height: 130px; }
    .sub-modal-body { padding: 18px 18px 20px; }
    .sub-modal-title { font-size: 1.1rem; }
  }
`;

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [selectedSub, setSelectedSub] = useState(null);

  const userGroup  = getGroupFromGrade(user?.grade || 8);
  const activeGroup = localStorage.getItem('glp_active_group') || userGroup;
  const isPracticeMode = activeGroup !== userGroup;

  const activeQuizMetadata = selectedSub
    ? MOCK_QUIZZES_METADATA[activeGroup][selectedSub.id]
    : null;

  // Lock body scroll when modal open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = selectedSub ? 'hidden' : '';
    document.documentElement.style.overflow = selectedSub ? 'hidden' : '';
  }

  const getSubjectDetails = (subId, defaultName, defaultDesc) => {
    const data = {
      en: {
        english: { name: 'English', desc: 'Master reading, writing, and vocabulary with interactive stories and quizzes.' },
        hindi: { name: 'Hindi', desc: 'Learn Hindi vowels, consonants, vocabulary, and basic grammar concepts.' },
        math: { name: 'Mathematics', desc: 'Master arithmetic, algebra, and logical problem-solving skills.' },
        science: { name: 'Science', desc: 'Explore nature, experiments, the human body, and the laws of physics.' },
        gk: { name: 'Social Studies', desc: 'Discover history, geography, civics, and the fabric of our society.' }
      },
      hi: {
        english: { name: 'अंग्रेजी', desc: 'इंटरैक्टिव कहानियों और क्विज़ के साथ पढ़ना, लिखना और शब्दावली सीखें।' },
        hindi: { name: 'हिंदी', desc: 'हिंदी स्वर, व्यंजन, शब्दावली और व्याकरण की बुनियादी अवधारणाओं को सीखें।' },
        math: { name: 'गणित', desc: 'अंकगणित, बीजगणित और तार्किक समस्या-समाधान कौशल सीखें।' },
        science: { name: 'विज्ञान', desc: 'प्रकृति, प्रयोगों, मानव शरीर और भौतिकी के नियमों का अन्वेषण करें।' },
        gk: { name: 'सामाजिक अध्ययन', desc: 'इतिहास, भूगोल, नागरिक शास्त्र और हमारे समाज के ताने-बाने की खोज करें।' }
      }
    };
    const lang = language === 'hi' ? 'hi' : 'en';
    return data[lang][subId] || { name: defaultName, desc: defaultDesc };
  };

  return (
    <div>
      <style>{styles}</style>

      {/* Page Header */}
      <div className="sub-page-header">
        <div className="sub-page-title">
          <div className="sub-page-title-icon"><IconSubjects /></div>
          {t('subjectsTitle')}
        </div>
        <p className="sub-page-subtitle">{t('subjectsSubtitle')}</p>
      </div>

      {/* Subject Cards Grid */}
      <div className="sub-grid">
        {subjects.map(({ id, name, Icon, image, description }, i) => {
          const details = getSubjectDetails(id, name, description);
          return (
            <div
              key={id}
              className="sub-card"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => setSelectedSub({ id, name, Icon, image })}
            >
              <div className="sub-img-wrap">
                <img src={image} alt={details.name} className="sub-img" loading="lazy" />
                <div className="sub-img-overlay" />
              </div>
              <div className="sub-body">
                <div className="sub-header">
                  <div className="sub-name">{details.name}</div>
                  <div className="sub-icon-wrap"><Icon /></div>
                </div>
                <p className="sub-desc">{details.desc}</p>
                <button className="sub-start-btn">
                  {t('startLearningBtn')} <IconArrow />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    {/* ── Modal ── */}
      {selectedSub && activeQuizMetadata && createPortal(
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
          }}
          onClick={() => setSelectedSub(null)}
        >
          <div className="sub-modal" onClick={e => e.stopPropagation()}>

            <img
              src={selectedSub.image}
              alt={selectedSub.name}
              className="sub-modal-img"
            />

            <div className="sub-modal-body">

              <div className="sub-modal-title">
                <div className="sub-modal-icon">
                  <selectedSub.Icon />
                </div>
                {`${getSubjectDetails(selectedSub.id, selectedSub.name, '').name} ${t('quizQuiz')}`}
              </div>
              <p className="sub-modal-topic">
                {t('quizTopic')}: <strong>{activeQuizMetadata.title}</strong>
              </p>

              {isPracticeMode ? (
                <div className="sub-badge-mode" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)', color: '#b45309' }}>
                  <IconWarning />
                  <div>
                    <strong>{t('practiceMode')}</strong><br />
                    {t('practiceModeDesc')}
                  </div>
                </div>
              ) : (
                <div className="sub-badge-mode" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#0d7a56' }}>
                  <IconBolt />
                  <div>
                    <strong>{t('normalMode')}</strong> {t('normalModeDesc').replace('{xp}', activeQuizMetadata.xpReward)}
                  </div>
                </div>
              )}

              <div className="sub-info-row">
                <IconTarget />
                <span><strong>{t('totalQuestions')}</strong> {t('questionsCount').replace('{count}', activeQuizMetadata.questions)}</span>
              </div>
              <div className="sub-info-row">
                <IconClock />
                <span><strong>{t('timeLimit')}</strong> {t('timeLimitMins').replace('{count}', activeQuizMetadata.timeLimit)}</span>
              </div>
              <div className="sub-info-row">
                <IconInfo />
                <span>{t('reviewPrevQ')}</span>
              </div>

              <div className="sub-modal-actions">
                <button className="sub-btn-back" onClick={() => setSelectedSub(null)}>
                  <IconClose /> {t('cancel')}
                </button>
                <button
                  className="sub-btn-proceed"
                  onClick={() => {
                    const qId = activeQuizMetadata.id;
                    setSelectedSub(null);
                    navigate(`/quizzes/${qId}/play`);
                  }}
                >
                  {t('startQuizBtn')} <IconArrow />
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