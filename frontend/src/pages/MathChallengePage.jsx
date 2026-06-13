import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

// ── Question Generators ──────────────────────────────────────
const generate = (level) => {
  const qs = [];
  const count = { normal: 8, basic: 10, hard: 12 }[level];

  for (let i = 0; i < count; i++) {
    let q, answer;
    if (level === 'normal') {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const op = Math.random() > 0.5 ? '+' : '-';
      answer = op === '+' ? a + b : Math.abs(a - b);
      const [x, y] = op === '+' ? [a, b] : (a >= b ? [a, b] : [b, a]);
      q = `${x} ${op} ${y} = ?`;
    } else if (level === 'basic') {
      const ops = ['×', '÷', '+', '-'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      if (op === '×') {
        const a = Math.floor(Math.random() * 12) + 2;
        const b = Math.floor(Math.random() * 12) + 2;
        answer = a * b; q = `${a} × ${b} = ?`;
      } else if (op === '÷') {
        const b = Math.floor(Math.random() * 10) + 2;
        answer = Math.floor(Math.random() * 10) + 2;
        q = `${answer * b} ÷ ${b} = ?`;
      } else if (op === '+') {
        const a = Math.floor(Math.random() * 80) + 10;
        const b = Math.floor(Math.random() * 80) + 10;
        answer = a + b; q = `${a} + ${b} = ?`;
      } else {
        const a = Math.floor(Math.random() * 80) + 30;
        const b = Math.floor(Math.random() * 30) + 5;
        answer = a - b; q = `${a} - ${b} = ?`;
      }
    } else {
      // hard: algebra-style
      const types = ['linear', 'square', 'mixed'];
      const type = types[Math.floor(Math.random() * types.length)];
      if (type === 'linear') {
        const x = Math.floor(Math.random() * 10) + 2;
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 15) + 1;
        answer = x;
        q = `Solve: ${a}x + ${b} = ${a * x + b}`;
      } else if (type === 'square') {
        const base = Math.floor(Math.random() * 10) + 2;
        answer = base * base;
        q = `${base}² = ?`;
      } else {
        const a = Math.floor(Math.random() * 15) + 5;
        const b = Math.floor(Math.random() * 8) + 2;
        const c = Math.floor(Math.random() * 10) + 1;
        answer = a * b + c;
        q = `(${a} × ${b}) + ${c} = ?`;
      }
    }

    // Generate 4 choices (1 correct + 3 wrong)
    const wrongSet = new Set([answer]);
    const choices = [];
    while (wrongSet.size < 4) {
      const delta = Math.floor(Math.random() * 10) + 1;
      const w = Math.random() > 0.5 ? answer + delta : Math.max(0, answer - delta);
      if (!wrongSet.has(w)) { wrongSet.add(w); choices.push(w); }
    }
    choices.push(answer);
    // shuffle
    const shuffled = choices.sort(() => Math.random() - 0.5);

    qs.push({ question: q, answer, choices: shuffled });
  }
  return qs;
};

const LEVEL_CONFIG = {
  normal: { label: 'Normal', emoji: '🌱', timePerQ: 15, xpReward: 30 },
  basic:  { label: 'Basic',  emoji: '🌿', timePerQ: 12, xpReward: 50 },
  hard:   { label: 'Hard',   emoji: '🔥', timePerQ: 8,  xpReward: 80 },
};

const getLevelLabel = (lvl, lang) => {
  const labels = {
    en: { normal: 'Normal', basic: 'Basic', hard: 'Hard' },
    hi: { normal: 'सामान्य', basic: 'बुनियादी', hard: 'कठिन' }
  };
  return labels[lang]?.[lvl] || labels.en[lvl] || lvl;
};

// ── Component ─────────────────────────────────────────────────
export default function MathChallengePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, updateUser } = useAuth();
  const { t, language } = useLanguage();
  const level = searchParams.get('level') || 'normal';
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.normal;

  const [questions]   = useState(() => generate(level));
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timePerQ);
  const [phase, setPhase]       = useState('playing'); // playing | feedback | done
  const [results, setResults]   = useState([]);
  const timerRef = useRef(null);

  const currentQ = questions[current];

  const finishGame = useCallback((finalScore, finalResults) => {
    setPhase('done');
    const xpEarned = Math.round((finalScore / questions.length) * config.xpReward);
    if (xpEarned > 0) {
      const newXp    = (user?.xp    || 0) + xpEarned;
      const newLevel = Math.floor(newXp / 200) + 1;
      let badges = [...(user?.badges || [])];
      if (newXp >= 100 && !badges.includes('Bronze Milestone Badge')) badges.push('Bronze Milestone Badge');
      if (newXp >= 300 && !badges.includes('Silver Milestone Badge')) badges.push('Silver Milestone Badge');
      if (newXp >= 500 && !badges.includes('Gold Milestone Badge'))  badges.push('Gold Milestone Badge');
      updateUser({ xp: newXp, level: newLevel, badges });
      toast.success(language === 'hi' ? `🎉 +${xpEarned} XP अर्जित किए!` : `🎉 +${xpEarned} XP Earned!`);
    }
  }, [questions.length, config.xpReward, user, updateUser, language]);

  const handleAnswer = useCallback((choice) => {
    if (phase !== 'playing') return;
    clearInterval(timerRef.current);
    const correct = choice === currentQ.answer;
    setSelected(choice);
    setPhase('feedback');
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    const newResults = [...results, { question: currentQ.question, answer: currentQ.answer, chosen: choice, correct }];
    setResults(newResults);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        finishGame(newScore, newResults);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setPhase('playing');
        setTimeLeft(config.timePerQ);
      }
    }, 900);
  }, [phase, currentQ, score, results, current, questions.length, config.timePerQ, finishGame]);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    setTimeLeft(config.timePerQ);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null); // timed out = wrong
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = Math.round((score / questions.length) * 100);
  const xpEarned = Math.round((score / questions.length) * config.xpReward);

  // ── DONE SCREEN ───────────────────────────────────────────
  if (phase === 'done') {
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
          .game-done-circle {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .game-done-circle-inner {
            width: 112px;
            height: 112px;
            border-radius: 50%;
            background: var(--bg-card);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .game-done-circle-pct {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--text);
          }
          .game-done-circle-score {
            font-size: 0.75rem;
            color: var(--text-muted);
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
            .game-done-circle {
              width: 110px;
              height: 110px;
              margin-bottom: 16px;
            }
            .game-done-circle-inner {
              width: 88px;
              height: 88px;
            }
            .game-done-circle-pct {
              font-size: 1.5rem;
            }
            .game-done-circle-score {
              font-size: 0.7rem;
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
          {pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '👍' : '💪'}
        </div>
        <h1 className="game-done-title">
          {pct === 100 ? (language === 'hi' ? 'उत्कृष्ट स्कोर!' : 'Perfect Score!') 
           : pct >= 70 ? (language === 'hi' ? 'बहुत बढ़िया!' : 'Great Job!') 
           : pct >= 40 ? (language === 'hi' ? 'अच्छा प्रयास!' : 'Good Effort!') 
           : (language === 'hi' ? 'अभ्यास करते रहें!' : 'Keep Practicing!')}
        </h1>
        <p className="game-done-sub">
          {language === 'hi' ? `मैथ चैलेंज — ${config.emoji} ${getLevelLabel(level, 'hi')} स्तर` : `Math Challenge — ${config.emoji} ${config.label} Level`}
        </p>

        {/* Score Circle */}
        <div
          className="game-done-circle"
          style={{
            background: `conic-gradient(${pct >= 50 ? 'var(--primary)' : '#ef4444'} ${pct * 3.6}deg, var(--border) 0deg)`,
          }}
        >
          <div className="game-done-circle-inner">
            <div className="game-done-circle-pct">{pct}%</div>
            <div className="game-done-circle-score">{score}/{questions.length}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="game-done-stats">
          {[
            { icon: '⚡', label: language === 'hi' ? 'अर्जित XP' : 'XP Earned', value: `+${xpEarned} XP` },
            { icon: '✅', label: language === 'hi' ? 'सही' : 'Correct',   value: score },
            { icon: '❌', label: language === 'hi' ? 'गलत' : 'Wrong',     value: questions.length - score },
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
  const progress = (current / questions.length) * 100;
  const timerPct = (timeLeft / config.timePerQ) * 100;
  const timerColor = timeLeft <= 3 ? '#ef4444' : timeLeft <= 6 ? '#f59e0b' : '#10b981';

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>🧮 {language === 'hi' ? 'मैथ चैलेंज' : 'Math Challenge'}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {language === 'hi' 
              ? `प्रश्न ${current + 1} / ${questions.length} · ${config.emoji} ${getLevelLabel(level, 'hi')}` 
              : `Question ${current + 1} of ${questions.length} · ${config.emoji} ${config.label}`}
          </div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'var(--bg-card)', border: `2px solid ${timerColor}`,
          borderRadius: '14px', padding: '8px 16px', minWidth: '64px',
          boxShadow: `0 4px 16px ${timerColor}30`,
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: timerColor, lineHeight: 1 }}>{timeLeft}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{language === 'hi' ? 'सेकंड' : 'SEC'}</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div style={{ background: 'var(--border)', borderRadius: '50px', height: '6px', marginBottom: '6px' }}>
        <div style={{ width: `${progress}%`, height: '100%', borderRadius: '50px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', transition: 'width 0.4s ease' }} />
      </div>
      {/* Timer Bar */}
      <div style={{ background: 'rgba(16,185,129,0.12)', borderRadius: '50px', height: '4px', marginBottom: '28px' }}>
        <div style={{ width: `${timerPct}%`, height: '100%', borderRadius: '50px', background: timerColor, transition: 'width 1s linear, background 0.3s' }} />
      </div>

      {/* Question Card */}
      <div className="card" style={{
        textAlign: 'center', marginBottom: '24px',
        padding: '36px 28px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)',
        background: 'var(--bg-card)',
      }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
          {t('solveThis')}
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>
          {currentQ.question}
        </div>
      </div>

      {/* Answer Choices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {currentQ.choices.map((choice, i) => {
          let bg = 'var(--bg-card)';
          let border = '1px solid var(--border)';
          let color = 'var(--text)';
          if (phase === 'feedback') {
            if (choice === currentQ.answer) { bg = 'rgba(16,185,129,0.12)'; border = '2px solid #10b981'; color = '#10b981'; }
            else if (choice === selected)   { bg = 'rgba(239,68,68,0.1)';  border = '2px solid #ef4444'; color = '#ef4444'; }
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(choice)}
              disabled={phase === 'feedback'}
              style={{
                padding: '18px 12px', borderRadius: '14px', border,
                background: bg, color, fontWeight: 700,
                fontSize: '1.2rem', cursor: phase === 'playing' ? 'pointer' : 'default',
                transition: 'all 0.2s', fontFamily: 'var(--font)',
                transform: phase === 'playing' ? undefined : 'none',
                boxShadow: 'var(--shadow)',
              }}
              onMouseEnter={e => { if (phase === 'playing') e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            >
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>
                {String.fromCharCode(65 + i)}
              </span>
              {choice}
            </button>
          );
        })}
      </div>

      {/* Score footer */}
      <div style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
        {language === 'hi' 
          ? `स्कोर: ${score}/${current + (phase === 'feedback' ? 1 : 0)} · ⚡ अब तक ${Math.round((score / questions.length) * config.xpReward)} XP`
          : `Score: ${score}/${current + (phase === 'feedback' ? 1 : 0)} · ⚡ ${Math.round((score / questions.length) * config.xpReward)} XP so far`}
      </div>
    </div>
  );
}
