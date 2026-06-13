import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Confetti from 'react-confetti';
import { useLanguage } from '../context/LanguageContext';

export default function QuizResult() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { t, language } = useLanguage();
  const result    = state?.result;
  const quiz      = state?.quiz;

  if (!result) return <div className="loading-screen">{language === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No result found.'}</div>;

  const pct    = Math.round((result.score / result.totalPoints) * 100);
  const passed = pct >= 50;

  const getMessage = () => {
    if (pct === 100) return { emoji: '🏆', msg: t('perfectScore') };
    if (pct >= 80)  return { emoji: '🌟', msg: t('excellentScore') };
    if (pct >= 60)  return { emoji: '👍', msg: t('goodJob') };
    if (pct >= 40)  return { emoji: '💪', msg: t('keepPracticing') };
    return { emoji: '📚', msg: t('keepLearning') };
  };
  const { emoji, msg } = getMessage();

  const isPractice = result.practiceMode || result.xpEarned === 0;

  return (
    <div className="quiz-done-container">
      <style>{`
        .quiz-done-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 12px;
        }
        .quiz-done-emoji {
          font-size: 3.5rem;
          margin-bottom: 8px;
          line-height: 1.1;
        }
        .quiz-done-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 4px;
          color: var(--text);
        }
        .quiz-done-sub {
          color: var(--text-muted);
          margin-bottom: 16px;
          font-size: 0.9rem;
        }
        .quiz-done-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .quiz-done-circle-inner {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: var(--bg-card);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .quiz-done-circle-pct {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text);
        }
        .quiz-done-circle-score {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .quiz-done-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .quiz-done-stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 8px;
          text-align: center;
          box-shadow: var(--shadow);
        }
        .quiz-done-stat-icon {
          font-size: 1.4rem;
        }
        .quiz-done-stat-value {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary);
          margin-top: 2px;
        }
        .quiz-done-stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .quiz-done-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        
        @media (max-width: 500px) {
          .quiz-done-container {
            padding: 4px;
          }
          .quiz-done-emoji {
            font-size: 2.8rem;
            margin-bottom: 6px;
          }
          .quiz-done-title {
            font-size: 1.35rem;
            margin-bottom: 4px;
          }
          .quiz-done-sub {
            margin-bottom: 12px;
            font-size: 0.8rem;
          }
          .quiz-done-circle {
            width: 100px;
            height: 100px;
            margin-bottom: 12px;
          }
          .quiz-done-circle-inner {
            width: 80px;
            height: 80px;
          }
          .quiz-done-circle-pct {
            font-size: 1.4rem;
          }
          .quiz-done-circle-score {
            font-size: 0.68rem;
          }
          .quiz-done-stats {
            gap: 6px;
            margin-bottom: 16px;
          }
          .quiz-done-stat-card {
            padding: 8px 4px;
          }
          .quiz-done-stat-icon {
            font-size: 1.15rem;
          }
          .quiz-done-stat-value {
            font-size: 0.9rem;
          }
          .quiz-done-stat-label {
            font-size: 0.65rem;
          }
          .quiz-done-buttons {
            gap: 8px;
          }
          .quiz-done-buttons .btn {
            padding: 10px 14px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      {passed && createPortal(
        <Confetti recycle={false} numberOfPieces={300} style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, top: 0, left: 0 }} />,
        document.body
      )}

      <div className="quiz-done-emoji">{emoji}</div>
      <h1 className="quiz-done-title">{msg}</h1>
      <p className="quiz-done-sub">{quiz?.title}</p>

      {isPractice && (
        <div style={{
          color: '#d97706',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          padding: '8px 14px',
          borderRadius: '12px',
          fontSize: '0.82rem',
          marginBottom: '16px',
          textAlign: 'left',
          lineHeight: '1.4'
        }}>
          <strong>📝 {t('practiceModeCompleted')}</strong><br />
          {t('practiceModeCompletedDesc')}
        </div>
      )}

      {/* Score Circle */}
      <div
        className="quiz-done-circle"
        style={{
          background: `conic-gradient(${pct >= 50 ? 'var(--primary)' : '#ef4444'} ${pct * 3.6}deg, var(--border) 0deg)`,
        }}
      >
        <div className="quiz-done-circle-inner">
          <div className="quiz-done-circle-pct">{pct}%</div>
          <div className="quiz-done-circle-score">{result.score}/{result.totalPoints}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="quiz-done-stats">
        {[
          { icon: '⚡', label: language === 'hi' ? 'अर्जित XP' : 'XP Earned',  value: isPractice ? (language === 'hi' ? '+0 XP (अभ्यास)' : '+0 XP (Practice)') : `+${result.xpEarned} XP` },
          { icon: '✅', label: t('correct'),     value: result.answers?.filter(a => a.isCorrect).length || 0 },
          { icon: '❌', label: t('wrong'),       value: result.answers?.filter(a => !a.isCorrect).length || 0 },
        ].map(s => (
          <div key={s.label} className="quiz-done-stat-card">
            <div className="quiz-done-stat-icon">{s.icon}</div>
            <div className="quiz-done-stat-value">{s.value}</div>
            <div className="quiz-done-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="quiz-done-buttons">
        <button className="btn btn-secondary" onClick={() => navigate('/subjects')}>← {t('backToSubjects')}</button>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>🏠 {t('dashboardLink')}</button>
      </div>
    </div>
  );
}
