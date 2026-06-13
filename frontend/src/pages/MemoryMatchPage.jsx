import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

// ── Card Data ─────────────────────────────────────────────────
const ALL_PAIRS = [
  { id: 'cat',    emoji: '🐱', label: 'Cat'     },
  { id: 'dog',    emoji: '🐶', label: 'Dog'     },
  { id: 'sun',    emoji: '☀️',  label: 'Sun'     },
  { id: 'moon',   emoji: '🌙', label: 'Moon'    },
  { id: 'star',   emoji: '⭐', label: 'Star'    },
  { id: 'heart',  emoji: '❤️',  label: 'Heart'   },
  { id: 'tree',   emoji: '🌳', label: 'Tree'    },
  { id: 'apple',  emoji: '🍎', label: 'Apple'   },
  { id: 'fire',   emoji: '🔥', label: 'Fire'    },
  { id: 'water',  emoji: '💧', label: 'Water'   },
  { id: 'thunder',emoji: '⚡', label: 'Thunder' },
  { id: 'gem',    emoji: '💎', label: 'Gem'     },
  { id: 'rocket', emoji: '🚀', label: 'Rocket'  },
  { id: 'crown',  emoji: '👑', label: 'Crown'   },
  { id: 'flower', emoji: '🌸', label: 'Flower'  },
  { id: 'planet', emoji: '🪐', label: 'Planet'  },
];

const LEVEL_CONFIG = {
  normal: { label: 'Normal', emoji: '🌱', pairs: 4,  xpReward: 25 },
  basic:  { label: 'Basic',  emoji: '🌿', pairs: 6,  xpReward: 45 },
  hard:   { label: 'Hard',   emoji: '🔥', pairs: 8,  xpReward: 70 },
};

const getLevelLabel = (lvl, lang) => {
  const labels = {
    en: { normal: 'Normal', basic: 'Basic', hard: 'Hard' },
    hi: { normal: 'सामान्य', basic: 'बुनियादी', hard: 'कठिन' }
  };
  return labels[lang]?.[lvl] || labels.en[lvl] || lvl;
};

const buildCards = (pairs) => {
  const selected = ALL_PAIRS.slice(0, pairs);
  const doubled  = [...selected, ...selected].map((item, idx) => ({
    ...item,
    uid: `${item.id}-${idx}`,
    flipped: false,
    matched: false,
  }));
  return doubled.sort(() => Math.random() - 0.5);
};

// ── Card Component ────────────────────────────────────────────
function Card({ card, onClick, disabled }) {
  const isVisible = card.flipped || card.matched;
  const { t } = useLanguage();
  const key = `mm${card.id.charAt(0).toUpperCase() + card.id.slice(1)}`;
  const translatedLabel = t(key);

  return (
    <div
      onClick={() => !disabled && !card.flipped && !card.matched && onClick(card.uid)}
      style={{
        perspective: '600px',
        cursor: disabled || card.flipped || card.matched ? 'default' : 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{
        width: '100%',
        paddingBottom: '100%',
        position: 'relative',
        transition: 'transform 0.45s ease',
        transformStyle: 'preserve-3d',
        transform: isVisible ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Back face */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #781728, #4f0715)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backfaceVisibility: 'hidden',
          boxShadow: '0 4px 16px rgba(120,23,40,0.25)',
          fontSize: '1.8rem',
          border: '2px solid rgba(255,255,255,0.1)',
        }}>
          🎴
        </div>
        {/* Front face */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '14px',
          background: card.matched
            ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
            : 'var(--bg-card)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          border: card.matched ? '2px solid #10b981' : '2px solid var(--border)',
          boxShadow: card.matched ? '0 4px 16px rgba(16,185,129,0.2)' : 'var(--shadow)',
          gap: '6px',
        }}>
          <div style={{ fontSize: '2.2rem', lineHeight: 1 }}>{card.emoji}</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: card.matched ? '#10b981' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {translatedLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────
export default function MemoryMatchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, updateUser } = useAuth();
  const { t, language } = useLanguage();
  const level = searchParams.get('level') || 'normal';
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.normal;

  const [cards, setCards]           = useState(() => buildCards(config.pairs));
  const [flippedUids, setFlippedUids] = useState([]);
  const [moves, setMoves]           = useState(0);
  const [matches, setMatches]       = useState(0);
  const [locked, setLocked]         = useState(false);
  const [elapsed, setElapsed]       = useState(0);
  const [phase, setPhase]           = useState('playing'); // playing | done

  // Stopwatch
  useEffect(() => {
    if (phase !== 'playing') return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const finishGame = useCallback((totalMatches, totalMoves) => {
    setPhase('done');
    // XP based on efficiency: fewer moves = more xp (max config.xpReward)
    const perfect = config.pairs;  // min possible moves = pairs
    const efficiency = Math.max(0, 1 - (totalMoves - perfect) / (perfect * 2));
    const xpEarned = Math.max(5, Math.round(efficiency * config.xpReward));
    const newXp    = (user?.xp    || 0) + xpEarned;
    const newLevel = Math.floor(newXp / 200) + 1;
    let badges = [...(user?.badges || [])];
    if (newXp >= 100 && !badges.includes('Bronze Milestone Badge')) badges.push('Bronze Milestone Badge');
    if (newXp >= 300 && !badges.includes('Silver Milestone Badge')) badges.push('Silver Milestone Badge');
    if (newXp >= 500 && !badges.includes('Gold Milestone Badge'))  badges.push('Gold Milestone Badge');
    updateUser({ xp: newXp, level: newLevel, badges });
    toast.success(language === 'hi' ? `🎉 +${xpEarned} XP अर्जित किए!` : `🎉 +${xpEarned} XP Earned!`);
  }, [config.pairs, config.xpReward, user, updateUser, language]);

  const handleCardClick = useCallback((uid) => {
    if (locked) return;

    setCards(prev => prev.map(c => c.uid === uid ? { ...c, flipped: true } : c));
    const newFlipped = [...flippedUids, uid];
    setFlippedUids(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves(m => m + 1);

      const [uid1, uid2] = newFlipped;
      const card1 = cards.find(c => c.uid === uid1);
      const card2 = cards.find(c => c.uid === uid2);

      if (card1.id === card2.id) {
        // Match!
        const newMatches = matches + 1;
        setMatches(newMatches);
        setCards(prev => prev.map(c =>
          c.uid === uid1 || c.uid === uid2 ? { ...c, matched: true, flipped: true } : c
        ));
        setFlippedUids([]);
        setLocked(false);
        if (newMatches === config.pairs) {
          setTimeout(() => finishGame(newMatches, moves + 1), 400);
        }
      } else {
        // No match — flip back
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.uid === uid1 || c.uid === uid2 ? { ...c, flipped: false } : c
          ));
          setFlippedUids([]);
          setLocked(false);
        }, 900);
      }
    }
  }, [locked, flippedUids, cards, matches, moves, config.pairs, finishGame]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  // Grid columns
  const cols = config.pairs <= 4 ? 4 : config.pairs <= 6 ? 4 : 4;
  const totalCards = config.pairs * 2;

  // ── DONE SCREEN ───────────────────────────────────────────
  if (phase === 'done') {
    const perfect = config.pairs;
    const efficiency = Math.max(0, 1 - (moves - perfect) / (perfect * 2));
    const xpEarned = Math.max(5, Math.round(efficiency * config.xpReward));
    const starCount = moves <= perfect + 2 ? 3 : moves <= perfect + 4 ? 2 : 1;

    return (
      <div className="game-done-container">
        <style>{`
          .game-done-container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
            padding: 12px;
          }
          .game-done-emoji {
            font-size: 5rem;
            margin-bottom: 12px;
            line-height: 1.1;
          }
          .game-done-title {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 6px;
            color: var(--text);
          }
          .game-done-sub {
            color: var(--text-muted);
            margin-bottom: 24px;
            font-size: 1rem;
          }
          .game-done-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 24px;
          }
          .game-done-stat-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 12px 8px;
            text-align: center;
            box-shadow: var(--shadow);
          }
          .game-done-stat-icon {
            font-size: 1.5rem;
          }
          .game-done-stat-value {
            font-size: 1.1rem;
            font-weight: 800;
            color: var(--primary);
            margin-top: 2px;
          }
          .game-done-stat-label {
            font-size: 0.75rem;
            color: var(--text-muted);
          }
          .game-done-buttons {
            display: flex;
            gap: 12px;
            justify-content: center;
          }
          
          @media (max-width: 500px) {
            .game-done-container {
              padding: 4px;
            }
            .game-done-emoji {
              font-size: 3.5rem;
              margin-bottom: 8px;
            }
            .game-done-title {
              font-size: 1.5rem;
              margin-bottom: 4px;
            }
            .game-done-sub {
              margin-bottom: 16px;
              font-size: 0.85rem;
            }
            .game-done-stats {
              gap: 8px;
              margin-bottom: 18px;
            }
            .game-done-stat-card {
              padding: 8px 4px;
            }
            .game-done-stat-icon {
              font-size: 1.2rem;
            }
            .game-done-stat-value {
              font-size: 0.95rem;
            }
            .game-done-stat-label {
              font-size: 0.65rem;
            }
            .game-done-buttons {
              gap: 8px;
            }
            .game-done-buttons .btn {
              padding: 10px 16px !important;
              font-size: 0.85rem !important;
            }
          }
        `}</style>

        <div className="game-done-emoji">
          {'⭐'.repeat(starCount)}
        </div>
        <h1 className="game-done-title">
          {starCount === 3 ? t('perfectMemory') : starCount === 2 ? t('wellDone') : t('youDidIt')}
        </h1>
        <p className="game-done-sub">
          {language === 'hi' ? `मेमोरी मैच — ${config.emoji} ${getLevelLabel(level, 'hi')} स्तर` : `Memory Match — ${config.emoji} ${config.label} Level`}
        </p>

        {/* Stats */}
        <div className="game-done-stats">
          {[
            { icon: '⚡', label: language === 'hi' ? 'अर्जित XP' : 'XP Earned',  value: `+${xpEarned} XP` },
            { icon: '🎯', label: t('movesUsed'),  value: moves },
            { icon: '⏱️', label: t('timeTaken'),  value: formatTime(elapsed) },
          ].map(s => (
            <div key={s.label} className="game-done-stat-card">
              <div className="game-done-stat-icon">{s.icon}</div>
              <div className="game-done-stat-value">{s.value}</div>
              <div className="game-done-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="game-done-buttons">
          <button className="btn btn-secondary" onClick={() => navigate('/games')}>← {t('backToGames')}</button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>🏠 {t('dashboard')}</button>
        </div>
      </div>
    );
  }

  // ── PLAYING SCREEN ────────────────────────────────────────
  return (
    <div style={{ maxWidth: '620px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>🃏 {language === 'hi' ? 'मेमोरी मैच' : 'Memory Match'}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {language === 'hi'
              ? `${config.emoji} ${getLevelLabel(level, 'hi')} · ${matches}/${config.pairs} जोड़े मिले`
              : `${config.emoji} ${config.label} · ${matches}/${config.pairs} pairs found`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '8px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>{moves}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('movesLabel')}</div>
          </div>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '8px 14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>{formatTime(elapsed)}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('timeLabel')}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: 'var(--border)', borderRadius: '50px', height: '6px', marginBottom: '24px' }}>
        <div style={{
          width: `${(matches / config.pairs) * 100}%`, height: '100%', borderRadius: '50px',
          background: 'linear-gradient(90deg, #10b981, #059669)',
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '12px',
      }}>
        {cards.map(card => (
          <Card
            key={card.uid}
            card={card}
            onClick={handleCardClick}
            disabled={locked}
          />
        ))}
      </div>

      {/* Hint */}
      <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        💡 {t('flipMatchHint')}
      </p>
    </div>
  );
}
