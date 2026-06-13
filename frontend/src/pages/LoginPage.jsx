import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';
import footerLogo from '../assets/images/footer.png';

// SVG Icons
const IconTrophy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3.58a6 6 0 0 1-3.93 5.63l-.07.03a6 6 0 0 1-4 0l-.07-.03A6 6 0 0 1 6 11.58V8a6 6 0 0 1 6-6z" />
  </svg>
);

const IconBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
  </svg>
);

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const IconLightning = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'currentColor', flexShrink: 0 }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconSignIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'currentColor', flexShrink: 0 }}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const msg = {
        'auth/user-not-found':         'No account found with this email. Please register first.',
        'auth/wrong-password':         'Incorrect password. Please try again.',
        'auth/invalid-credential':     'Invalid email or password. Please try again.',
        'auth/invalid-email':          'Please enter a valid email address.',
        'auth/too-many-requests':      'Too many failed attempts. Try again later.',
        'auth/network-request-failed': 'Network error. Check your internet connection.',
      }[err.code] || err.message || 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .login-card  { flex-direction: column !important; border-radius: 24px !important; max-height: 96vh !important; }
          .login-left  { flex: none !important; width: 100% !important; padding: 20px 24px 12px !important; border-radius: 24px 24px 0 0 !important; min-height: unset !important; }
          .login-right { padding: 20px 20px 24px !important; overflow-y: auto !important; }
          .login-cutout{ display: none !important; }
          .login-logo-img  { width: 90px !important; height: 90px !important; margin: 0 auto 8px !important; }
          .login-left-stats { display: none !important; }
          .bg-circle { display: none !important; }
        }
        .back-home-btn:hover { transform: translateX(-3px) !important; }
      `}</style>

      {/* ← Back to Home */}
      <Link
        to="/"
        className="back-home-btn"
        style={{
          position: 'absolute', top: '18px', left: '20px', zIndex: 100,
          display: 'flex', alignItems: 'center', gap: '7px',
          color: '#fff', textDecoration: 'none',
          padding: '8px 16px',
          fontSize: '0.82rem', fontWeight: 700,
          transition: 'all 0.22s ease',
          letterSpacing: '0.01em',
        }}
      >
        {t('backToHome')}
      </Link>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0208 0%, #781728 50%, #4f0715 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative background circles */}
        {[
          { w: 350, h: 350, top: '-10%', left: '-8%',  op: 0.06 },
          { w: 250, h: 250, bottom: '-8%', right: '-5%', op: 0.08 },
          { w: 180, h: 180, top: '60%',  left: '5%',   op: 0.05 },
          { w: 120, h: 120, top: '15%',  right: '12%', op: 0.07 },
        ].map((c, i) => (
          <div key={i} className="bg-circle" style={{
            position: 'absolute', width: c.w, height: c.h,
            borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)',
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            opacity: c.op, pointerEvents: 'none',
          }} />
        ))}

        {/* Main Card */}
        <div className="login-card" style={{
          width: '100%', maxWidth: '900px',
          background: '#fff', borderRadius: '32px',
          display: 'flex', overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          minHeight: '560px', position: 'relative', zIndex: 1,
        }}>

          {/* ── LEFT PANEL ── */}
          <div className="login-left" style={{
            flex: '0 0 44%',
            background: 'linear-gradient(160deg, #781728 0%, #4f0715 60%, #2d000a 100%)',
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '48px 40px', overflow: 'hidden',
          }}>
            {/* Curved cutout */}
            <div className="login-cutout" style={{
              position: 'absolute', right: '-60px', top: '50%',
              transform: 'translateY(-50%)',
              width: '120px', height: '120px',
              background: '#fff', borderRadius: '50%',
            }} />
            {/* Blobs */}
            <div style={{ position:'absolute', top:'-40px', right:'20px', width:'160px', height:'160px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
            <div style={{ position:'absolute', bottom:'-30px', left:'-20px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
            <div style={{ position:'absolute', top:'40%', left:'10px', width:'80px', height:'80px', borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />

            {/* Logo & Branding */}
            <div style={{ position:'relative', zIndex:2, textAlign:'center', width: '100%' }}>
              <img
                src={footerLogo}
                alt="VidyaKhel Logo"
                className="login-logo-img"
                style={{
                  width: '160px', height: '160px',
                  objectFit: 'contain',
                  display: 'block', margin: '0 auto 16px',
                  filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.35))',
                }}
              />

              <h2 style={{ color:'#fff', fontSize:'1.9rem', fontWeight:800, marginBottom:'8px', fontFamily:"'Baloo 2', cursive" }}>
                विद्याखेल
              </h2>
              <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.88rem', lineHeight:1.65, maxWidth:'210px', margin:'0 auto' }}>
                Gamified Learning for Rural India
              </p>

              {/* Stats pills */}
              <div className="login-left-stats" style={{ marginTop:'32px', display:'flex', flexDirection:'column', gap:'12px' }}>
                {[
                  { icon: <IconTrophy />, text: t('heroStudentsBadge') },
                  { icon: <IconBook />, text: language === 'hi' ? '150+ क्विज़ और खेल' : '150+ Quizzes & Games' },
                  { icon: <IconGlobe />, text: language === 'hi' ? 'हिंदी, अंग्रेजी और अधिक' : 'Hindi, English & More' },
                ].map((s, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:'10px',
                    background:'rgba(255,255,255,0.1)', borderRadius:'50px',
                    padding:'8px 16px', backdropFilter:'blur(4px)',
                  }}>
                    {s.icon}
                    <span style={{ color:'rgba(255,255,255,0.9)', fontSize:'0.82rem', fontWeight:600 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="login-right" style={{
            flex:1, display:'flex', flexDirection:'column',
            justifyContent:'center', padding:'52px 48px', background:'#fff',
          }}>
            <div style={{ marginBottom:'28px' }}>
              <h1 style={{ fontSize:'2rem', fontWeight:800, color:'#1a0208', marginBottom:'6px', fontFamily:"'Baloo 2', cursive" }}>
                {t('welcomeBack')}
              </h1>
              <p style={{ color:'#786064', fontSize:'0.92rem' }}>{t('signInContinue')}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:700, color:'#4f0715', marginBottom:'7px' }}>
                  {t('emailAddr')}
                </label>
                <input
                  type="email" id="login-email"
                  placeholder={t('emailAddrPlace')}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  style={{
                    width:'100%', padding:'12px 16px',
                    border:'1.5px solid rgba(120,23,40,0.2)', borderRadius:'12px',
                    fontSize:'0.95rem', outline:'none',
                    color:'#1a0208', background:'#faf6f7',
                    transition:'border-color 0.2s, box-shadow 0.2s', boxSizing:'border-box',
                  }}
                  onFocus={e => { e.target.style.borderColor='#781728'; e.target.style.boxShadow='0 0 0 3px rgba(120,23,40,0.1)'; }}
                  onBlur={e  => { e.target.style.borderColor='rgba(120,23,40,0.2)'; e.target.style.boxShadow='none'; }}
                />
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:700, color:'#4f0715', marginBottom:'7px' }}>
                  {t('password')}
                </label>
                <div style={{ position:'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'} id="login-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    style={{
                      width:'100%', padding:'12px 48px 12px 16px',
                      border:'1.5px solid rgba(120,23,40,0.2)', borderRadius:'12px',
                      fontSize:'0.95rem', outline:'none',
                      color:'#1a0208', background:'#faf6f7',
                      transition:'border-color 0.2s, box-shadow 0.2s', boxSizing:'border-box',
                    }}
                    onFocus={e => { e.target.style.borderColor='#781728'; e.target.style.boxShadow='0 0 0 3px rgba(120,23,40,0.1)'; }}
                    onBlur={e  => { e.target.style.borderColor='rgba(120,23,40,0.2)'; e.target.style.boxShadow='none'; }}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{
                    position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', display: 'flex', alignItems: 'center', color:'#786064', padding:0,
                  }}>
                    {showPass ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                <div style={{ textAlign:'right', marginTop:'6px' }}>
                  <Link to="/forgot-password" style={{ fontSize:'0.82rem', color:'#781728', fontWeight:600, textDecoration:'none' }}>
                    {t('forgotPasswordQ')}
                  </Link>
                </div>
              </div>

              <button
                type="submit" id="login-submit"
                disabled={loading}
                style={{
                  width:'100%', padding:'13px',
                  background: loading ? 'rgba(120,23,40,0.5)' : 'linear-gradient(135deg, #781728, #4f0715)',
                  color:'#fff', border:'none', borderRadius:'14px',
                  fontSize:'1rem', fontWeight:700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow:'0 6px 20px rgba(120,23,40,0.35)',
                  transition:'all 0.25s', marginTop:'2px',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; }}
              >
                {loading
                  ? <><span style={{ display:'inline-block', width:'16px', height:'16px', border:'2.5px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} /> {t('signingIn')}</>
                  : <><IconSignIn /> {t('signIn')}</>}
              </button>
            </form>

            <p style={{ textAlign:'center', marginTop:'20px', color:'#786064', fontSize:'0.88rem' }}>
              {t('dontHaveAccount')}{' '}
              <Link to="/register" style={{ color:'#781728', fontWeight:700, textDecoration:'none' }}>
                {t('registerHere')}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
