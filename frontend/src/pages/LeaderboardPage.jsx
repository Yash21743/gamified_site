import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

// ── Static Demo Students (always shown as seed data) ──────────
const DEMO_STUDENTS = [
  { id: 'd1', name: 'Priya Singh',    xp: 1250, level: 6, streak: 12, village: 'Bijnor',    grade: 8, badges: ['Week Warrior','Bronze Milestone Badge','Silver Milestone Badge'], avatar: 'avatar2' },
  { id: 'd2', name: 'Amit Yadav',     xp: 980,  level: 5, streak: 8,  village: 'Unnao',     grade: 9, badges: ['Bronze Milestone Badge','Silver Milestone Badge'], avatar: 'avatar4' },
  { id: 'd3', name: 'Sunita Devi',    xp: 870,  level: 5, streak: 10, village: 'Sitapur',   grade: 5, badges: ['Week Warrior','Bronze Milestone Badge'], avatar: 'avatar6' },
  { id: 'd4', name: 'Ravi Shankar',   xp: 740,  level: 4, streak: 5,  village: 'Hardoi',    grade: 7, badges: ['Bronze Milestone Badge'], avatar: 'avatar8' },
  { id: 'd5', name: 'Geeta Kumari',   xp: 620,  level: 4, streak: 4,  village: 'Kannauj',   grade: 6, badges: ['Bronze Milestone Badge'], avatar: 'avatar3' },
  { id: 'd6', name: 'Suresh Gupta',   xp: 510,  level: 3, streak: 3,  village: 'Fatehpur',  grade: 4, badges: [], avatar: 'avatar1' },
  { id: 'd7', name: 'Kavita Verma',   xp: 420,  level: 3, streak: 6,  village: 'Barabanki', grade: 3, badges: [], avatar: 'avatar7' },
  { id: 'd8', name: 'Rahul Kumar',    xp: 380,  level: 2, streak: 5,  village: 'Rampur',    grade: 8, badges: ['First Quiz'], avatar: 'avatar1' },
  { id: 'd9', name: 'Anjali Verma',   xp: 290,  level: 2, streak: 2,  village: 'Lucknow',   grade: 7, badges: [], avatar: 'avatar5' },
  { id: 'd10',name: 'Rajesh Das',     xp: 180,  level: 1, streak: 2,  village: 'Kalyan',    grade: 2, badges: [], avatar: 'avatar3' },
];

const MEDALS = ['🥇', '🥈', '🥉'];
const AVATARS = ['🐯', '🦁', '🐸', '🦊', '🐼', '🦋', '🌟', '🚀'];

const getAvatarEmoji = (avatarStr, idx) => {
  if (avatarStr && avatarStr.startsWith('avatar')) {
    const num = parseInt(avatarStr.replace('avatar', ''), 10);
    if (num >= 1 && num <= AVATARS.length) {
      return AVATARS[num - 1];
    }
  }
  return AVATARS[idx % AVATARS.length];
};

const getGroup = (grade) => {
  const g = Number(grade);
  if (g >= 1 && g <= 3) return 'A';
  if (g >= 4 && g <= 6) return 'B';
  return 'C';
};

// SVG Icons
const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9H4C3.44772 9 3 8.55228 3 8V5C3 4.44772 3.44772 4 4 4H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 9H20C20.5523 9 21 8.55228 21 8V5C21 4.44772 20.5523 4 20 4H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 4H18V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SeedlingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 11C12 11 7 9 5 5C5 5 9 3 12 5C15 3 19 5 19 5C17 9 12 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const GraduationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 10L12 5L2 10L12 15L22 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M6 12.5V17C6 17 8.5 19 12 19C15.5 19 18 17 18 17V12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M22 10V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const userGroup = getGroup(user?.grade || 8);
  const [tab, setTab]     = useState(() => localStorage.getItem('glp_active_group') || userGroup);
  const [data, setData]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let all = [...DEMO_STUDENTS];

      try {
        const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(50));
        const snap = await getDocs(q);
        snap.forEach(doc => {
          const d = doc.data();
          const isDuplicate = all.some(s => s.name.toLowerCase() === (d.name || '').toLowerCase());
          if (!isDuplicate && d.name) {
            all.push({
              id: doc.id,
              name: d.name,
              xp: d.xp || 0,
              level: d.level || 1,
              streak: d.streak || 0,
              village: d.village || '',
              grade: Number(d.grade) || 8,
              badges: d.badges || [],
              avatar: d.avatar || 'avatar1',
              isReal: true,
            });
          }
        });
      } catch (err) {
        console.log('Firestore fetch skipped:', err.message);
      }

      if (user) {
        const exists = all.some(s => s.id === user.id || s.name?.toLowerCase() === user.name?.toLowerCase());
        if (!exists) {
          all.push({
            id: user.id,
            name: user.name,
            xp: user.xp || 0,
            level: user.level || 1,
            streak: user.streak || 0,
            village: user.village || '',
            grade: Number(user.grade) || 8,
            badges: user.badges || [],
            avatar: user.avatar || 'avatar1',
            isReal: true,
          });
        } else {
          all = all.map(s =>
            (s.id === user.id || s.name?.toLowerCase() === user.name?.toLowerCase())
              ? { ...s, xp: user.xp || s.xp, level: user.level || s.level, streak: user.streak || s.streak, avatar: user.avatar || s.avatar }
              : s
          );
        }
      }

      all.sort((a, b) => b.xp - a.xp);

      const filtered = tab === 'global' ? all : all.filter(s => getGroup(s.grade) === tab);

      setData(filtered);
      setLoading(false);
    };

    load();
  }, [tab, user?.xp, user?.id, user?.avatar]);

  const tabs = [
    { id: 'A', label: language === 'hi' ? 'समूह A (1-3)' : 'Group A (1–3)', icon: <SeedlingIcon /> },
    { id: 'B', label: language === 'hi' ? 'समूह B (4-6)' : 'Group B (4–6)', icon: <BookIcon /> },
    { id: 'C', label: language === 'hi' ? 'समूह C (7-10)' : 'Group C (7–10)', icon: <GraduationIcon /> },
    { id: 'global', label: language === 'hi' ? 'ग्लोबल' : 'Global', icon: <GlobeIcon /> },
  ];

  return (
    <div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tabSlide {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .leaderboard-tab-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          flex-wrap: nowrap;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .leaderboard-tab-bar::-webkit-scrollbar {
          display: none;
        }

        .lb-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          padding: 10px 16px;
          font-size: 0.85rem;
          border-radius: 8px  !important; ;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .lb-tab-btn:hover {
        
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .lb-tab-btn:active {
          transform: translateY(0px);
        }

        .lb-tab-btn.active {
          background: var(--primary);
          color: #fff;
          border: none;
          box-shadow: 0 4px 14px rgba(120,23,40,0.25);
        }

        .lb-tab-btn.inactive {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }

        .lb-tab-btn.inactive:hover {
          background: rgba(120,23,40,0.06);
          border-color: var(--primary);
          color: var(--primary);
        }

        .lb-row-enter {
          animation: fadeInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .leaderboard-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .leaderboard-row:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .page-header-icon {
          color: var(--primary);
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          margin-right: 8px;
        }
      `}</style>

      <div className="page-header">
        <h1>
          <span className="page-header-icon"><TrophyIcon /></span>
          {t('leaderboardLink')}
        </h1>
        <p>
          {language === 'hi' 
            ? 'देखें कि आप अपनी कक्षा के स्तर के छात्रों के बीच किस स्थान पर हैं!' 
            : 'See how you rank against students in your class level!'}
        </p>
      </div>

      {/* Tabs */}
      <div className="leaderboard-tab-bar">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`lb-tab-btn ${tab === t.id ? 'active' : 'inactive'}`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          {language === 'hi' ? '⏳ लीडरबोर्ड लोड हो रहा है...' : '⏳ Loading Leaderboard...'}
        </div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '4rem' }}>📭</div>
          <p>{language === 'hi' ? 'इस समूह में अभी कोई छात्र नहीं है। पहले बनें!' : 'No students in this group yet. Be the first!'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.map((student, idx) => {
            const isMe = student.id === user?.id || student.name?.toLowerCase() === user?.name?.toLowerCase();
            return (
              <div
                key={student.id || idx}
                className={`leaderboard-row lb-row-enter ${idx < 3 ? `rank-${idx + 1}` : ''}`}
                style={{
                  animationDelay: `${idx * 40}ms`,
                  ...(isMe
                    ? { border: '2px solid var(--primary)', background: 'rgba(120,23,40,0.06)', transform: 'scale(1.01)', boxShadow: '0 4px 20px rgba(120,23,40,0.12)' }
                    : { border: '1px solid var(--border)', background: 'var(--bg-card)' })
                }}
              >
                {/* Rank */}
                <div className="rank-num" style={{ fontWeight: 800, minWidth: '40px', textAlign: 'center' }}>
                  {idx < 3 ? MEDALS[idx] : `#${idx + 1}`}
                </div>

                {/* Avatar */}
                <div style={{ fontSize: '1.8rem', marginRight: '4px' }}>
                  {getAvatarEmoji(student.avatar, idx)}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {student.name}
                    {isMe && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '50px' }}>{language === 'hi' ? 'आप' : 'YOU'}</span>}
                    {student.isReal && !isMe && <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '50px', border: '1px solid rgba(16,185,129,0.3)' }}>{language === 'hi' ? '✓ वास्तविक' : '✓ Real'}</span>}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {student.village && `${student.village} · `}
                    {language === 'hi' ? `कक्षा ${student.grade}` : `Class ${student.grade}`}
                    {student.streak > 1 && (
                      language === 'hi' 
                        ? ` · 🔥 ${student.streak} दिनों का सिलसिला` 
                        : ` · 🔥 ${student.streak} day streak`
                    )}
                  </div>
                </div>

                {/* XP + Level */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '1.1rem' }}>⚡ {student.xp}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {language === 'hi' ? `स्तर ${student.level}` : `Level ${student.level}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}