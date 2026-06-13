import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const isDemo = () => !!localStorage.getItem('glp_demo_user');
const DEMO_REWARDS = [
  { _id: 'r1', name: 'First Quiz', description: 'Complete your first quiz successfully', type: 'badge', icon: '🎯', xpRequired: 50 },
  { _id: 'r_bronze', name: 'Bronze Milestone Badge', description: 'Reach 100 points threshold', type: 'badge', icon: '🥉', xpRequired: 100 },
  { _id: 'r2', name: 'Math Star', description: 'Score 100% on any Math quiz', type: 'badge', icon: '🔢', xpRequired: 150 },
  { _id: 'r_silver', name: 'Silver Milestone Badge', description: 'Reach 300 points threshold', type: 'badge', icon: '🥈', xpRequired: 300 },
  { _id: 'r_gold', name: 'Gold Milestone Badge', description: 'Reach 500 points threshold', type: 'badge', icon: '🥇', xpRequired: 500 },
  { _id: 'r3', name: 'Week Warrior', description: 'Maintain a 7-day learning streak', type: 'badge', icon: '🔥', xpRequired: 300 },
  { _id: 'r5', name: 'Science Explorer', description: 'Complete 5 Science quizzes', type: 'badge', icon: '🔬', xpRequired: 500 },
];

// SVG Icons
const GiftIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 12V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V12" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 8V20" stroke="currentColor" strokeWidth="2"/>
    <path d="M8.5 8C8.5 8 7 8 7 6.5C7 5 8.5 4 10 5.5L12 8H8.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M15.5 8C15.5 8 17 8 17 6.5C17 5 15.5 4 14 5.5L12 8H15.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const BadgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M7.5 14L5 21L12 18L19 21L16.5 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export default function RewardsPage() {
  const { user, updateUser } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  const getRewardDetails = (rewardId, defaultName, defaultDesc) => {
    const data = {
      en: {
        r1: { name: 'First Quiz', description: 'Complete your first quiz successfully' },
        r_bronze: { name: 'Bronze Milestone Badge', description: 'Reach 100 points threshold' },
        r2: { name: 'Math Star', description: 'Score 100% on any Math quiz' },
        r_silver: { name: 'Silver Milestone Badge', description: 'Reach 300 points threshold' },
        r_gold: { name: 'Gold Milestone Badge', description: 'Reach 500 points threshold' },
        r3: { name: 'Week Warrior', description: 'Maintain a 7-day learning streak' },
        r5: { name: 'Science Explorer', description: 'Complete 5 Science quizzes' }
      },
      hi: {
        r1: { name: 'पहला क्विज़', description: 'अपना पहला क्विज़ सफलतापूर्वक पूरा करें' },
        r_bronze: { name: 'कांस्य मील का पत्थर बैज', description: '100 अंक तक पहुंचें' },
        r2: { name: 'गणित सितारा', description: 'किसी भी गणित क्विज़ में 100% स्कोर करें' },
        r_silver: { name: 'रजत मील का पत्थर बैज', description: '300 अंक तक पहुंचें' },
        r_gold: { name: 'स्वर्ण मील का पत्थर बैज', description: '500 अंक तक पहुंचें' },
        r3: { name: 'सप्ताह योद्धा', description: '7 दिन की सीखने का सिलसिला बनाए रखें' },
        r5: { name: 'विज्ञान खोजकर्ता', description: '5 विज्ञान क्विज़ पूरे करें' }
      }
    };
    const lang = language === 'hi' ? 'hi' : 'en';
    return data[lang][rewardId] || { name: defaultName, description: defaultDesc };
  };

  useEffect(() => {
    setRewards(DEMO_REWARDS);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user && isDemo()) {
      let updatedBadges = [...(user.badges || [])];
      let changed = false;

      if (user.xp >= 100 && !updatedBadges.includes('Bronze Milestone Badge')) {
        updatedBadges.push('Bronze Milestone Badge');
        changed = true;
      }
      if (user.xp >= 300 && !updatedBadges.includes('Silver Milestone Badge')) {
        updatedBadges.push('Silver Milestone Badge');
        changed = true;
      }
      if (user.xp >= 500 && !updatedBadges.includes('Gold Milestone Badge')) {
        updatedBadges.push('Gold Milestone Badge');
        changed = true;
      }

      if (changed) {
        updateUser({ badges: updatedBadges });
        toast.success(language === 'hi' ? '🏅 नया मील का पत्थर बैज अनलॉक हुआ!' : '🏅 New Milestone Badge unlocked!');
      }
    }
  }, [user?.xp, updateUser, language]);

  const handleClaim = async (reward) => {
    const details = getRewardDetails(reward._id, reward.name, reward.description);
    toast.success(language === 'hi' ? `🏅 "${details.name}" बैज अनलॉक हुआ!` : `🏅 "${reward.name}" badge unlocked!`);
    updateUser({ badges: [...(user?.badges || []), reward.name] });
  };

  if (loading) return <div className="loading-screen">{language === 'hi' ? 'पुरस्कार लोड हो रहे हैं...' : 'Loading Rewards...'}</div>;

  return (
    <div>
      <style>{`
        .rewards-page-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rewards-title-icon {
          color: var(--primary);
          display: inline-flex;
          align-items: center;
        }

        .reward-card-custom {
          border: 1.5px solid #781728 !important;
          border-radius: 14px;
          padding: 20px 16px;
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .reward-card-custom:hover {
          box-shadow: 0 6px 24px rgba(120,23,40,0.13);
          transform: translateY(-2px);
        }

        .reward-card-custom.unlocked {
          border-color: #781728 !important;
          background: linear-gradient(135deg, rgba(120,23,40,0.04), rgba(120,23,40,0.02));
        }

        .reward-card-custom.unlocked::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #781728, #f59e0b);
          border-radius: 14px 14px 0 0;
        }

        .reward-card-locked {
          opacity: 0.52;
        }

        .reward-badge-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid rgba(120,23,40,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 12px;
          background: rgba(120,23,40,0.05);
        }

        .reward-card-name {
          font-weight: 700;
          color: var(--text);
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .reward-card-xp {
          font-size: 0.78rem;
          color: #f59e0b;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .reward-card-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 6px;
          line-height: 1.4;
        }

        .reward-claim-btn {
          width: 100%;
          padding: 8px 18px;
          font-size: 0.85rem;
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #fff;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }

        .reward-claim-btn:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        .badge-earned {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 14px;
          background: rgba(16,185,129,0.1);
          color: #10b981;
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 50px;
          padding: 4px 12px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .badge-locked {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 14px;
          background: rgba(120,23,40,0.07);
          color: #781728;
          border: 1px solid rgba(120,23,40,0.18);
          border-radius: 50px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
      `}</style>

      <div className="page-header">
        <h1 className="rewards-page-title">
          <span className="rewards-title-icon"><GiftIcon /></span>
          {t('rewardsTitle')}
        </h1>
        <p>{t('rewardsSubtitle')}</p>
      </div>

      {/* My XP */}
      <div className="card" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px', background: 'linear-gradient(135deg, #781728, #4f0715)', border: 'none', boxShadow: '0 8px 24px rgba(120,23,40,0.15)' }}>
        <div style={{ fontSize: '3rem' }}>⚡</div>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>{t('currentXpLabel')}</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b' }}>{user?.xp || 0} XP</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>{t('badgesEarned')}</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbfca', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            <BadgeIcon />
            {user?.badges?.length || 0}
          </div>
        </div>
      </div>

      {rewards.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#9ca3af' }}><BadgeIcon /></div>
          <p>{t('noRewardsAvailable')}</p>
        </div>
      ) : (
        <div className="grid-4">
          {rewards.map(r => {
            const owned    = user?.badges?.includes(r.name);
            const canClaim = (user?.xp || 0) >= r.xpRequired;
            const details = getRewardDetails(r._id, r.name, r.description);
            return (
              <div
                key={r._id}
                className={`reward-card-custom ${owned ? 'unlocked' : ''} ${!canClaim && !owned ? 'reward-card-locked' : ''}`}
              >
                <div className="reward-badge-icon-wrap">{r.icon || '🏅'}</div>
                <div className="reward-card-name">{details.name}</div>
                <div className="reward-card-xp">
                  ⚡ {language === 'hi' ? `${r.xpRequired} XP आवश्यक` : `${r.xpRequired} XP required`}
                </div>
                {details.description && <p className="reward-card-desc">{details.description}</p>}

                <div style={{ marginTop: 'auto', width: '100%' }}>
                  {owned ? (
                    <span className="badge-earned">✅ {t('earnedBadgeText')}</span>
                  ) : canClaim ? (
                    <button className="reward-claim-btn" onClick={() => handleClaim(r)}>
                      <GiftIcon width={14} height={14} /> {t('claimBtn')}
                    </button>
                  ) : (
                    <span className="badge-locked">🔒 {t('xpMoreBadge').replace('{xp}', r.xpRequired - (user?.xp || 0))}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}