import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

// SVG Icons
const IconSecurity = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff', flexShrink: 0 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconKey = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const IconCheckCircle = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      toast.success(language === 'hi' ? 'रीसेट लिंक भेज दिया गया! अपना इनबॉक्स देखें।' : 'Reset link sent! Check your inbox.');
    } catch (err) {
      toast.error(err.code === 'auth/user-not-found'
        ? (language === 'hi' ? 'इस ईमेल के साथ कोई खाता नहीं मिला।' : 'No account found with this email.')
        : (language === 'hi' ? 'कुछ गलत हुआ। पुनः प्रयास करें।' : 'Something went wrong. Try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .forgot-card  { flex-direction: column !important; border-radius: 24px !important; max-height: 96vh !important; }
          .forgot-left  { flex: none !important; width: 100% !important; padding: 20px 24px 12px !important; border-radius: 24px 24px 0 0 !important; min-height: unset !important; }
          .forgot-right { padding: 20px 20px 24px !important; overflow-y: auto !important; }
          .forgot-cutout{ display: none !important; }
          .forgot-left-steps { display: none !important; }
          .forgot-logo-wrap { width: 64px !important; height: 64px !important; border-radius: 20px !important; margin-bottom: 8px !important; }
          .bg-circle { display: none !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0208 0%, #781728 50%, #4f0715 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decorative circles */}
        {[
          { w: 320, h: 320, top: '-10%', left: '-8%', op: 0.06 },
          { w: 220, h: 220, bottom: '-8%', right: '-5%', op: 0.07 },
          { w: 140, h: 140, top: '65%', left: '8%', op: 0.05 },
          { w: 100, h: 100, top: '10%', right: '15%', op: 0.08 },
        ].map((c, i) => (
          <div key={i} className="bg-circle" style={{
            position: 'absolute', width: c.w, height: c.h,
            borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)',
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            opacity: c.op, pointerEvents: 'none',
          }} />
        ))}

        {/* Main card */}
        <div className="forgot-card" style={{
          width: '100%', maxWidth: '860px',
          background: '#fff', borderRadius: '32px',
          display: 'flex', overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          minHeight: '500px',
          position: 'relative', zIndex: 1,
        }}>

          {/* ── LEFT PANEL ── */}
          <div className="forgot-left" style={{
            flex: '0 0 42%',
            background: 'linear-gradient(160deg, #781728 0%, #4f0715 60%, #2d000a 100%)',
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '48px 36px', overflow: 'hidden',
          }}>
            {/* Curved cutout */}
            <div className="forgot-cutout" style={{
              position: 'absolute', right: '-60px', top: '50%',
              transform: 'translateY(-50%)',
              width: '120px', height: '120px',
              background: '#fff', borderRadius: '50%',
            }} />
            <div style={{ position: 'absolute', top: '-40px', right: '20px', width: '170px', height: '170px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'absolute', bottom: '-30px', left: '-20px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ position: 'absolute', top: '38%', left: '8px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>
              <div className="forgot-logo-wrap" style={{
                width: '88px', height: '88px', borderRadius: '28px',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                <IconSecurity />
              </div>
              <h2 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 800, marginBottom: '12px', fontFamily: "'Baloo 2', cursive" }}>
                {t('dontWorry')}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '210px', margin: '0 auto' }}>
                {t('dontWorryDesc')}
              </p>

              <div className="forgot-left-steps" style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: <IconMail />, text: t('checkInbox') },
                  { icon: <IconLink />, text: t('clickResetLink') },
                  { icon: <IconKey />, text: t('setNewPassword') },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50px', padding: '8px 14px',
                  }}>
                    {s.icon}
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', fontWeight: 600 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="forgot-right" style={{
            flex: 1,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            padding: '52px 48px',
            background: '#fff',
          }}>
            {!sent ? (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1a0208', marginBottom: '8px', fontFamily: "'Baloo 2', cursive" }}>
                    {t('forgotPasswordQ')}
                  </h1>
                  <p style={{ color: '#786064', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {t('enterLinkedEmail')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4f0715', marginBottom: '8px' }}>
                      {t('emailAddr')}
                    </label>
                    <input
                      type="email"
                      placeholder={t('emailAddrPlace')}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '13px 16px',
                        border: '1.5px solid rgba(120,23,40,0.2)',
                        borderRadius: '12px', fontSize: '0.95rem',
                        outline: 'none', fontFamily: "'Baloo 2', cursive",
                        color: '#1a0208', background: '#faf6f7',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => { e.target.style.borderColor = '#781728'; e.target.style.boxShadow = '0 0 0 3px rgba(120,23,40,0.1)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(120,23,40,0.2)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%', padding: '14px',
                      background: loading ? 'rgba(120,23,40,0.5)' : 'linear-gradient(135deg, #781728, #4f0715)',
                      color: '#fff', border: 'none', borderRadius: '14px',
                      fontSize: '1rem', fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: "'Baloo 2', cursive",
                      boxShadow: '0 6px 20px rgba(120,23,40,0.35)',
                      transition: 'all 0.25s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                  >
                    {loading ? t('sendingLink') : <><IconMail /> {t('sendResetLink')}</>}
                  </button>
                </form>
              </>
            ) : (
              /* ── SUCCESS STATE ── */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%',
                  background: 'rgba(16,185,129,0.1)', border: '3px solid #10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  <IconCheckCircle />
                </div>
                <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#1a0208', marginBottom: '12px', fontFamily: "'Baloo 2', cursive" }}>
                  {t('emailSent')}
                </h2>
                <p style={{ color: '#786064', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '28px' }}>
                  {t('emailSentDesc').replace('{email}', email)}
                </p>
                <div style={{
                  background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '12px', padding: '14px 16px',
                  fontSize: '0.85rem', color: '#d97706', marginBottom: '28px', lineHeight: 1.5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <IconClock />
                  <span>{t('linkExpiresWarning')}</span>
                </div>
                <button
                  onClick={() => { setSent(false); setEmail(''); }}
                  style={{
                    background: 'none', border: '1.5px solid rgba(120,23,40,0.25)',
                    borderRadius: '12px', padding: '10px 24px',
                    color: '#781728', fontWeight: 700, cursor: 'pointer',
                    fontFamily: "'Baloo 2', cursive", fontSize: '0.9rem',
                    marginBottom: '12px',
                  }}
                >
                  {t('tryDifferentEmail')}
                </button>
              </div>
            )}

            {/* Footer links */}
            <div style={{ marginTop: sent ? '8px' : '24px', textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link to="/login" style={{ color: '#781728', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem' }}>
                {t('backToLogin')}
              </Link>
              <span style={{ color: '#786064', fontSize: '0.88rem' }}>·</span>
              <Link to="/register" style={{ color: '#786064', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem' }}>
                {t('createAccount')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
