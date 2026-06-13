import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const UserIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 20C4 17.7909 7.58172 16 12 16C16.4183 16 20 17.7909 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);
const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);
const FlameIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 7 7 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 10 16 8.5 15 7.5C15 7.5 15 10 13 10C13 10 14 7 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M9 17.5C9 19.433 10.3431 21 12 21C13.6569 21 15 19.433 15 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16L20 7V20C20 20.5523 19.5523 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <rect x="8" y="3" width="8" height="5" rx="0.5" stroke="currentColor" strokeWidth="2"/>
    <rect x="7" y="13" width="10" height="8" rx="0.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
const BadgeMedalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M7.5 14L5 21L12 18L19 21L16.5 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    name: user?.name || '',
    grade: user?.grade || '',
    village: user?.village || '',
    district: user?.district || '',
    avatar: user?.avatar || 'avatar1'
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUser({
        ...form,
        grade: Number(form.grade) || 1
      });
      toast.success(language === 'hi' ? 'प्रोफ़ाइल अपडेट की गई!' : 'Profile updated!');
    } catch {
      toast.error(language === 'hi' ? 'अपडेट विफल रहा' : 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const AVATARS = ['🐯', '🦁', '🐸', '🦊', '🐼', '🦋', '🌟', '🚀'];
  const stats = [
    { icon: <BoltIcon />, label: 'XP', value: user?.xp || 0 },
    { icon: <TargetIcon />, label: language === 'hi' ? 'स्तर' : 'Level', value: user?.level || 1 },
    { icon: <FlameIcon />, label: language === 'hi' ? 'सिलसिला' : 'Streak', value: user?.streak || 0 },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .pf-wrap {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          padding: 0;
        }

        .pf-title {
          display: flex; align-items: center; gap: 9px;
          color: var(--primary); font-size: 1.55rem;
          font-weight: 900; margin: 0 0 3px;
        }
        .pf-subtitle { color: var(--text-muted); font-size: 0.88rem; margin: 0 0 18px; }

        /* ── Stats ── */
        .pf-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 16px;
          width: 100%;
        }
        .pf-stat {
          background: linear-gradient(135deg, #781728, #4f0715);
          border-radius: 12px;
          padding: 12px 10px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(120,23,40,0.18);
          min-width: 0; overflow: hidden;
          transition: transform 0.2s;
        }
        .pf-stat:hover { transform: translateY(-2px); }
        .pf-stat-icon {
          color: rgba(255,255,255,0.88);
          display: flex; align-items: center; flex-shrink: 0;
        }
        .pf-stat-info { min-width: 0; overflow: hidden; }
        .pf-stat-label {
          font-size: 0.65rem; color: rgba(255,255,255,0.6);
          font-weight: 500; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .pf-stat-value { font-size: 1.5rem; font-weight: 800; color: #fff; line-height: 1; }

        /* ── Cards ── */
        .pf-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px;
          width: 100%;
          margin-bottom: 14px;
        }
        .pf-card-title {
          font-weight: 700; font-size: 0.92rem;
          color: var(--text); margin: 0 0 12px;
        }

        /* ── Avatar: always 8 in one row ── */
        .pf-avatar-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 6px;
          width: 100%;
        }
        .pf-avatar-btn {
          font-size: 1.2rem;
          border-radius: 8px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          aspect-ratio: 1; width: 100%; padding: 0;
          background: transparent;
          transition: transform 0.18s;
          line-height: 1;
        }
        .pf-avatar-btn:hover { transform: scale(1.12); }

        /* ── Badges ── */
        .pf-badges-head {
          display: flex; align-items: center; gap: 7px;
          font-weight: 700; font-size: 0.92rem;
          color: var(--text); margin-bottom: 10px;
        }
        .pf-badges-head svg { color: var(--primary); }
        .pf-badges-list { display: flex; gap: 7px; flex-wrap: wrap; }
        .pf-badge-pill {
          background: rgba(245,158,11,0.1); color: #b45309;
          border: 1px solid rgba(245,158,11,0.28); border-radius: 50px;
          padding: 3px 11px; font-size: 0.78rem; font-weight: 600;
        }

        /* ── Form ── */
        .pf-form { display: flex; flex-direction: column; gap: 13px; width: 100%; }
        .pf-field { display: flex; flex-direction: column; gap: 4px; width: 100%; min-width: 0; }
        .pf-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }

        /* Village + District always side by side */
        .pf-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        /* Force inputs to never overflow */
        .form-input, .form-select {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
        }

        .pf-save {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 11px;
          font-size: 0.92rem; font-weight: 700;
          border-radius: 10px; border: none;
          background: linear-gradient(135deg, #781728, #4f0715);
          color: #fff; cursor: pointer;
          transition: opacity 0.18s, transform 0.18s;
          box-shadow: 0 4px 14px rgba(120,23,40,0.22);
          font-family: inherit;
        }
        .pf-save:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .pf-save:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Desktop: avatar + form side by side */
        @media (min-width: 700px) {
          .pf-wrap { max-width: 860px; }
          .pf-desktop-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 18px;
            align-items: start;
          }
          .pf-desktop-left { display: flex; flex-direction: column; gap: 0; }
          .pf-desktop-right .pf-card { margin-bottom: 0; }
          .pf-avatar-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
          .pf-avatar-btn { font-size: 1.5rem; border-radius: 10px; }
          .pf-stat-value { font-size: 1.6rem; }
          .pf-stat { padding: 14px 12px; gap: 10px; }
        }
      `}</style>

      <div className="pf-wrap">

        {/* Header */}
        <h1 className="pf-title"><UserIcon /> {t('myProfileTitle')}</h1>
        <p className="pf-subtitle">{t('myProfileSubtitle')}</p>

        {/* Stats */}
        <div className="pf-stats">
          {stats.map(s => (
            <div key={s.label} className="pf-stat">
              <div className="pf-stat-icon">{s.icon}</div>
              <div className="pf-stat-info">
                <div className="pf-stat-label">{s.label}</div>
                <div className="pf-stat-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single column | Desktop: two column */}
        <div className="pf-desktop-grid">

          {/* LEFT */}
          <div className="pf-desktop-left">

            {/* Avatar */}
            <div className="pf-card">
              <div className="pf-card-title">{t('chooseAvatar')}</div>
              <div className="pf-avatar-grid">
                {AVATARS.map((av, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => set('avatar', `avatar${i + 1}`)}
                    className="pf-avatar-btn"
                    style={{
                      border: `2px solid ${form.avatar === `avatar${i + 1}` ? 'var(--primary)' : 'var(--border)'}`,
                      background: form.avatar === `avatar${i + 1}` ? 'rgba(120,23,40,0.1)' : 'transparent',
                    }}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges */}
            {user?.badges?.length > 0 && (
              <div className="pf-card">
                <div className="pf-badges-head">
                  <BadgeMedalIcon /> {t('myBadges')}
                </div>
                <div className="pf-badges-list">
                  {user.badges.map(b => {
                    const namesMap = {
                      'First Quiz': { en: 'First Quiz', hi: 'पहला क्विज़' },
                      'Bronze Milestone Badge': { en: 'Bronze Milestone Badge', hi: 'कांस्य मील का पत्थर बैज' },
                      'Math Star': { en: 'Math Star', hi: 'गणित सितारा' },
                      'Silver Milestone Badge': { en: 'Silver Milestone Badge', hi: 'रजत मील का पत्थर बैज' },
                      'Gold Milestone Badge': { en: 'Gold Milestone Badge', hi: 'स्वर्ण मील का पत्थर बैज' },
                      'Week Warrior': { en: 'Week Warrior', hi: 'सप्ताह योद्धा' },
                      'Science Explorer': { en: 'Science Explorer', hi: 'विज्ञान खोजकर्ता' }
                    };
                    const bTranslated = namesMap[b]?.[language === 'hi' ? 'hi' : 'en'] || b;
                    return (
                      <span key={b} className="pf-badge-pill">🏅 {bTranslated}</span>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT — Form */}
          <div className="pf-desktop-right">
            <div className="pf-card">
              <form className="pf-form" onSubmit={handleSave}>

                <div className="pf-field">
                  <label className="pf-label">{t('fullName')}</label>
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">{language === 'hi' ? 'कक्षा / ग्रेड' : 'Class / Grade'}</label>
                  <select
                    className="form-select"
                    value={form.grade}
                    onChange={e => set('grade', e.target.value)}
                    required
                  >
                    <option value="">{t('selectGrade')}</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {t('classOptionText').replace('{grade}', i + 1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pf-two-col">
                  <div className="pf-field">
                    <label className="pf-label">{language === 'hi' ? 'गाँव' : 'Village'}</label>
                    <input
                      className="form-input"
                      placeholder={t('villagePlace')}
                      value={form.village}
                      onChange={e => set('village', e.target.value)}
                    />
                  </div>
                  <div className="pf-field">
                    <label className="pf-label">{language === 'hi' ? 'जिला' : 'District'}</label>
                    <input
                      className="form-input"
                      placeholder={t('districtPlace')}
                      value={form.district}
                      onChange={e => set('district', e.target.value)}
                    />
                  </div>
                </div>

                <button className="pf-save" type="submit" disabled={saving}>
                  <SaveIcon />
                  {saving ? t('savingChanges') : t('saveChanges')}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}