import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CountUp from 'react-countup';

const DEMO_STATS = {
  stats: { totalQuizzes: 12, avgScore: 76 },
  recentResults: [
    { _id: '1', quiz: { title: 'Math Tables Quiz', subject: 'math' }, score: 8, totalPoints: 10, xpEarned: 40 },
    { _id: '2', quiz: { title: 'Science Quiz', subject: 'science' }, score: 9, totalPoints: 10, xpEarned: 45 },
    { _id: '3', quiz: { title: 'Hindi Grammar', subject: 'hindi' }, score: 7, totalPoints: 10, xpEarned: 35 },
  ]
};

const isDemo = () => !!localStorage.getItem('glp_demo_user');

const getLevelNameKey = (xp) => {
  if (xp < 100) return 'levelNovice';
  if (xp < 300) return 'levelExplorer';
  if (xp < 500) return 'levelAchiever';
  return 'levelChampion';
};

const getGroupFromGrade = (grade) => {
  const g = Number(grade);
  if (g >= 1 && g <= 3) return 'A';
  if (g >= 4 && g <= 6) return 'B';
  return 'C';
};

// SVG Icons
const GraduationCapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const TrophyIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/>
    <path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
    <path d="M12 17v4"/>
    <path d="M8 21h8"/>
    <path d="M6 5h12v6a6 6 0 0 1-12 0z"/>
  </svg>
);

const StarIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const BadgeIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const FlameIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const BoltIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L4.09 12.97H11L10 22l8.91-10.97H13z"/>
  </svg>
);

const BookIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="12" y1="6" x2="16" y2="6"/>
    <line x1="12" y1="10" x2="16" y2="10"/>
  </svg>
);

const GamepadIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <line x1="15" y1="13" x2="15.01" y2="13"/>
    <line x1="18" y1="11" x2="18.01" y2="11"/>
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
  </svg>
);

const LeaderboardIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="3" width="4" height="18"/>
    <rect x="10" y="8" width="4" height="13"/>
    <rect x="2" y="13" width="4" height="8"/>
  </svg>
);

const GiftIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const SchoolIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(120,23,40,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(120,23,40,0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes xpBarFill {
    from { width: 0%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }

  .db-stat-card {
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    animation: fadeInUp 0.5s ease both;
    position: relative;
    overflow: hidden;
  }
  .db-stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(120,23,40,0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .db-stat-card:hover::before { opacity: 1; }
  .db-stat-card:hover {
    transform: translateY(-6px);
    border-color: #781728;
    box-shadow: 0 12px 32px rgba(120,23,40,0.18);
  }
  .db-stat-card:hover .db-stat-icon {
    transform: rotate(-12deg) scale(1.15);
    color: #781728;
    background: rgba(120,23,40,0.12);
  }

  .db-stat-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(120,23,40,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #781728;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    flex-shrink: 0;
  }

  .db-quick-card {
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: 18px;
    padding: 28px 16px;
    cursor: pointer;
    text-align: center;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    animation: fadeInUp 0.5s ease both;
    position: relative;
    overflow: hidden;
  }
  .db-quick-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #781728, #1a0208);
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: inherit;
  }
  .db-quick-card:hover::after { opacity: 1; }
  .db-quick-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: #781728;
    box-shadow: 0 16px 40px rgba(120,23,40,0.25);
  }
  .db-quick-card:hover .db-quick-label { color: #fff; }
  .db-quick-card:hover .db-quick-icon { color: #fff; transform: scale(1.2) rotate(-5deg); }
  .db-quick-card-inner {
    position: relative;
    z-index: 1;
  }
  .db-quick-icon {
    color: #781728;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .db-quick-label {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text, #1a0208);
    transition: color 0.3s;
  }

  .db-group-btn {
    padding: 13px 20px;
    font-size: 1rem;
    font-weight: 800;
    flex: 1 1 180px;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    border: 2px solid transparent;
  }
  .db-group-btn.active {
    background: linear-gradient(135deg, #781728, #1a0208);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(120,23,40,0.35);
  }
  .db-group-btn.inactive {
    background: var(--bg-card, #fff);
    color: var(--text, #1a0208);
    border-color: var(--border, #e5e7eb);
  }
  .db-group-btn.inactive:hover {
    border-color: #781728;
    background: rgba(120,23,40,0.06);
    transform: translateY(-2px);
  }

  .db-my-class-badge {
    position: absolute;
    top: -9px;
    right: 10px;
    background: #10b981;
    color: white;
    font-size: 0.6rem;
    padding: 2px 7px;
    border-radius: 8px;
    font-weight: 700;
    letter-spacing: 0.03em;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .db-xp-bar {
    height: 10px;
    border-radius: 20px;
    background: rgba(255,255,255,0.12);
    overflow: hidden;
    margin: 10px 0 6px;
  }
  .db-xp-fill {
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(90deg, #fbbfca, #ffffff);
    animation: xpBarFill 1.4s cubic-bezier(0.22,1,0.36,1) both;
    position: relative;
    overflow: hidden;
  }
  .db-xp-fill::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    animation: shimmer 2s 1.5s infinite;
    background-size: 200% auto;
  }

  .db-result-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-card, #fff);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: 12px;
    padding: 14px 20px;
    transition: all 0.25s ease;
    animation: slideInLeft 0.4s ease both;
  }
  .db-result-row:hover {
    border-color: #781728;
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(120,23,40,0.1);
  }

  .db-section-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text, #1a0208);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .db-section-title::before {
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background: linear-gradient(180deg, #781728, #1a0208);
    border-radius: 4px;
  }

  .db-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 1.1rem;
    font-weight: 600;
    color: #781728;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .db-grid-4 {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 480px) {
    .db-grid-4 {
      grid-template-columns: 1fr 1fr !important;
    }
    .db-stat-card { padding: 14px; gap: 10px; }
    .db-stat-icon { width: 42px; height: 42px; border-radius: 10px; }
  }
`;

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  const userGroup = getGroupFromGrade(user?.grade || 8);
  const [activeGroup, setActiveGroup] = useState(() =>
    localStorage.getItem('glp_active_group') || userGroup
  );

  const changeGroup = (group) => {
    setActiveGroup(group);
    localStorage.setItem('glp_active_group', group);
  };

  useEffect(() => {
    if (isDemo()) {
      setStats(DEMO_STATS);
    } else {
      setStats({ stats: { totalQuizzes: 0, avgScore: 0 }, recentResults: [] });
    }
    setLoading(false);
  }, []);

  const xpProgress = ((user?.xp || 0) % 200) / 2;
  const isPracticeMode = activeGroup !== userGroup;

  const statCards = [
    { Icon: TrophyIcon, label: t('totalPoints'), value: `${user?.xp || 0}`, sub: 'XP', delay: '0s' },
    { Icon: StarIcon, label: t('levelStatus'), value: t(getLevelNameKey(user?.xp || 0)), delay: '0.08s' },
    { Icon: BadgeIcon, label: t('badgesEarned'), value: `${user?.badges?.length || 0}`, sub: language === 'hi' ? 'बैज' : 'Badges', delay: '0.16s' },
    { Icon: FlameIcon, label: t('dayStreak'), value: `${user?.streak || 0}`, sub: language === 'hi' ? 'दिन' : 'days', delay: '0.24s' },
  ];

  const quickActions = [
    { Icon: BookIcon, label: language === 'hi' ? 'विषय और क्विज़' : 'Subjects & Quizzes', to: '/subjects', delay: '0s' },
    { Icon: GamepadIcon, label: language === 'hi' ? 'एक खेल खेलें' : 'Play a Game', to: '/games', delay: '0.08s' },
    { Icon: LeaderboardIcon, label: t('leaderboardLink'), to: '/leaderboard', delay: '0.16s' },
    { Icon: GiftIcon, label: language === 'hi' ? 'पुरस्कार भुनाएं' : 'Claim Rewards', to: '/rewards', delay: '0.24s' },
  ];

  const getSubjectName = (sub) => {
    const names = {
      en: { math: 'Math', science: 'Science', hindi: 'Hindi', english: 'English' },
      hi: { math: 'गणित', science: 'विज्ञान', hindi: 'हिंदी', english: 'अंग्रेजी' }
    };
    const lang = language === 'hi' ? 'hi' : 'en';
    return names[lang][sub?.toLowerCase()] || sub?.toUpperCase();
  };

  if (loading) return (
    <div className="db-loading">
      <style>{styles}</style>
      <BoltIcon size={22} /> {t('loadingDashboard')}
    </div>
  );

  return (
    <div style={{ paddingBottom: '32px' }}>
      <style>{styles}</style>

      {/* Welcome Header */}
      <div style={{ marginBottom: '32px', animation: 'fadeInUp 0.5s ease both' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text, #1a0208)', lineHeight: 1.2 }}>
          {t('welcomeUser').replace('{name}', user?.name?.split(' ')[0] || '')}
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          marginTop: '6px',
          fontSize: '0.95rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ color: '#781728' }}><GraduationCapIcon /></span>
          {t('classStudent').replace('{grade}', user?.grade || 8)}
        </p>
      </div>

      {/* Class Group Switcher Card */}
      <div style={{
        marginBottom: '28px',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(26,2,8,0.22)',
        animation: 'fadeInUp 0.5s ease 0.1s both',
      }}>
        {/* BG Image Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://i.pinimg.com/736x/d3/75/08/d37508771e9a8adb70ae9cd3ea525a80.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }} />
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(26,2,8,0.9) 0%, rgba(79,7,21,0.84) 50%, rgba(120,23,40,0.8) 100%)',
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SchoolIcon /> {t('chooseLearningLevel')}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', marginBottom: '20px' }}>
            {t('learningLevelDesc')}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { id: 'A', label: t('groupA'), sub: t('classes1_3') },
              { id: 'B', label: t('groupB'), sub: t('classes4_6') },
              { id: 'C', label: t('groupC'), sub: t('classes7_10') },
            ].map(grp => {
              const isSelected = activeGroup === grp.id;
              const isUserReg = userGroup === grp.id;
              return (
                <button
                  key={grp.id}
                  onClick={() => changeGroup(grp.id)}
                  className={`db-group-btn ${isSelected ? 'active' : 'inactive'}`}
                  style={{ color: isSelected ? '#fff' : 'rgba(255,255,255,0.85)', background: isSelected ? 'linear-gradient(135deg,#781728,#1a0208)' : 'rgba(255,255,255,0.1)', borderColor: isSelected ? 'transparent' : 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)' }}
                >
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{grp.label}</span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{grp.sub}</span>
                  {isUserReg && (
                    <span className="db-my-class-badge">
                      <CheckIcon /> {t('myClass')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isPracticeMode && (
            <div style={{
              marginTop: '16px',
              padding: '11px 16px',
              borderRadius: '10px',
             
              color: '#fbbf24',
              fontSize: '0.83rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <WarningIcon />
              <div>
                <strong>{t('practiceModeActive')} </strong>
                {t('practiceModeActiveDesc')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className="db-grid-4"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}
      >
        {statCards.map(({ Icon, label, value, sub, delay }) => (
          <div key={label} className="db-stat-card" style={{ animationDelay: delay, boxShadow: 'var(--shadow)' }}>
            <div className="db-stat-icon">
              <Icon size={26} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text, #1a0208)', whiteSpace: 'nowrap' }}>
                {value}{sub ? <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '3px' }}>{sub}</span> : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* XP Level Card */}
      <div style={{
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, #781728, #1a0208)',
        boxShadow: '0 8px 32px rgba(120,23,40,0.22)',
        animation: 'fadeInUp 0.5s ease 0.2s both',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>{t('currentLevel')}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fbbfca', lineHeight: 1 }}>
              {language === 'hi' ? `स्तर ${user?.level || 1}` : `Level ${user?.level || 1}`}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', marginBottom: '4px' }}>{t('totalXp')}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <BoltIcon size={22} />
              <CountUp end={user?.xp || 0} duration={1.5} />
            </div>
          </div>
        </div>
        <div className="db-xp-bar">
          <div className="db-xp-fill" style={{ width: `${xpProgress}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
          <span>{(user?.xp || 0) % 200} / 200 XP</span>
          <span>{t('xpToNextLevel').replace('{xp}', 200 - ((user?.xp || 0) % 200))}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="db-section-title">{t('quickActions')}</div>
      <div
        className="db-grid-4"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '36px' }}
      >
        {quickActions.map(({ Icon, label, to, delay }) => (
          <div key={label} className="db-quick-card" style={{ animationDelay: delay }} onClick={() => navigate(to)}>
            <div className="db-quick-card-inner">
              <div className="db-quick-icon"><Icon size={34} /></div>
              <div className="db-quick-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {stats?.recentResults?.length > 0 && (
        <>
          <div className="db-section-title">{t('recentActivity')}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.recentResults.slice(0, 5).map((r, i) => (
              <div key={r._id} className="db-result-row" style={{ animationDelay: `${i * 0.07}s` }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text, #1a0208)', marginBottom: '2px' }}>
                    {r.quiz?.title || t('quizQuiz')}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>
                    {getSubjectName(r.quiz?.subject)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#781728', fontSize: '1.05rem' }}>
                    {r.score}/{r.totalPoints}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                    <BoltIcon size={12} />+{r.xpEarned} XP
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}