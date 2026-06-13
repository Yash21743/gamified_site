import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';
import footerLogo from '../assets/images/footer.png';

// SVG Icons
const IconGamepad = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="3" />
  </svg>
);

const IconTrophy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3.58a6 6 0 0 1-3.93 5.63l-.07.03a6 6 0 0 1-4 0l-.07-.03A6 6 0 0 1 6 11.58V8a6 6 0 0 1 6-6z" />
  </svg>
);

const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconFree = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbfca', flexShrink: 0 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10H8a15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconRocket = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'currentColor', flexShrink: 0 }}>
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L17.5 5.5l-3-3L4.5 16.5z" />
    <path d="m12 5 7 7" />
    <path d="M9 15h.01" />
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

const inp = {
  width: '100%', padding: '10px 14px',
  border: '1.5px solid rgba(120,23,40,0.2)',
  borderRadius: '10px', fontSize: '0.88rem',
  outline: 'none', color: '#1a0208',
  background: '#faf6f7',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};
const focusIn  = e => { e.target.style.borderColor = '#781728'; e.target.style.boxShadow = '0 0 0 3px rgba(120,23,40,0.1)'; };
const focusOut = e => { e.target.style.borderColor = 'rgba(120,23,40,0.2)'; e.target.style.boxShadow = 'none'; };

export default function RegisterPage() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    grade: '',
    village: '', district: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.grade) { toast.error(t('selectGrade')); return; }
    setLoading(true);
    try {
      await register({ ...form, role: 'student' });
      toast.success(t('language') === 'hi' ? 'खाता सफलतापूर्वक बनाया गया! विद्याखेल में आपका स्वागत है 🎉' : 'Account created! Welcome to VidyaKhel 🎉');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const isHi = t('language') === 'hi';
      const msg = {
        'auth/email-already-in-use':   isHi ? 'यह ईमेल पहले से ही पंजीकृत है। लॉगिन करने का प्रयास करें।' : 'This email is already registered. Try logging in.',
        'auth/weak-password':          isHi ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : 'Password must be at least 6 characters.',
        'auth/invalid-email':          isHi ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : 'Please enter a valid email address.',
        'auth/network-request-failed': isHi ? 'नेटवर्क त्रुटि। अपने इंटरनेट कनेक्शन की जांच करें।' : 'Network error. Check your internet connection.',
      }[err.code] || err.message || (isHi ? 'पंजीकरण विफल रहा। कृपया पुनः प्रयास करें।' : 'Registration failed. Please try again.');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 720px) {
          .reg-card  { flex-direction: column !important; border-radius: 24px !important; max-height: 96vh !important; }
          .reg-left  { flex: none !important; width: 100% !important; padding: 20px 24px 12px !important; border-radius: 24px 24px 0 0 !important; min-height: unset !important; }
          .reg-right { padding: 20px 20px 24px !important; overflow-y: auto !important; }
          .reg-cutout { display: none !important; }
          .reg-left-features { display: none !important; }
          .reg-logo-img { width: 90px !important; height: 90px !important; margin: 0 auto 8px !important; }
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
        padding: '16px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background circles */}
        {[
          { w:350, h:350, top:'-10%', right:'-8%', op:0.06 },
          { w:250, h:250, bottom:'-8%', left:'-5%', op:0.07 },
          { w:140, h:140, top:'20%', left:'5%',   op:0.05 },
        ].map((c, i) => (
          <div key={i} className="bg-circle" style={{
            position:'absolute', width:c.w, height:c.h,
            borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.15)',
            top:c.top, bottom:c.bottom, left:c.left, right:c.right,
            opacity:c.op, pointerEvents:'none',
          }} />
        ))}

        {/* Main card — fixed height, no scroll */}
        <div className="reg-card" style={{
          width:'100%', maxWidth:'940px',
          background:'#fff', borderRadius:'32px',
          display:'flex', overflow:'hidden',
          boxShadow:'0 40px 100px rgba(0,0,0,0.4)',
          position:'relative', zIndex:1,
        }}>

          {/* ── LEFT PANEL ── */}
          <div className="reg-left" style={{
            flex:'0 0 38%',
            background:'linear-gradient(160deg, #781728 0%, #4f0715 60%, #2d000a 100%)',
            position:'relative',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            padding:'40px 32px', overflow:'hidden',
          }}>
            {/* Curved cutout */}
            <div className="reg-cutout" style={{
              position:'absolute', right:'-60px', top:'50%',
              transform:'translateY(-50%)',
              width:'120px', height:'120px',
              background:'#fff', borderRadius:'50%',
            }} />
            <div style={{ position:'absolute', top:'-50px', right:'10px', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
            <div style={{ position:'absolute', bottom:'-30px', left:'-20px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />

            <div style={{ position:'relative', zIndex:2, textAlign:'center', width: '100%' }}>
              <img
                src={footerLogo}
                alt="VidyaKhel Logo"
                className="reg-logo-img"
                style={{
                  width: '150px', height: '150px',
                  objectFit: 'contain',
                  display: 'block', margin: '0 auto 12px',
                  filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
                }}
              />

              <h2 style={{ color:'#fff', fontSize:'1.6rem', fontWeight:800, marginBottom:'6px', fontFamily:"'Baloo 2', cursive" }}>
                {t('joinVidyaKhel')}
              </h2>
              <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.85rem', lineHeight:1.6, maxWidth:'190px', margin:'0 auto' }}>
                {t('startFreeJourney')}
              </p>

              <div className="reg-left-features" style={{ marginTop:'24px', display:'flex', flexDirection:'column', gap:'10px' }}>
                {[
                  { icon: <IconGamepad />, text: t('regFeature1') },
                  { icon: <IconTrophy />, text: t('regFeature2') },
                  { icon: <IconChart />, text: t('regFeature3') },
                  { icon: <IconFree />, text: t('regFeature4') },
                ].map((s, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:'10px',
                    background:'rgba(255,255,255,0.1)',
                    borderRadius:'50px', padding:'7px 14px',
                  }}>
                    {s.icon}
                    <span style={{ color:'rgba(255,255,255,0.9)', fontSize:'0.78rem', fontWeight:600 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="reg-right" style={{
            flex:1,
            padding:'32px 40px',
            background:'#fff',
            display:'flex', flexDirection:'column', justifyContent:'center',
            overflow:'hidden',
          }}>
            <div style={{ marginBottom:'18px' }}>
              <h1 style={{ fontSize:'1.65rem', fontWeight:800, color:'#1a0208', marginBottom:'4px', fontFamily:"'Baloo 2', cursive" }}>
                {t('createAccount')}
              </h1>
              <p style={{ color:'#786064', fontSize:'0.84rem' }}>{t('fillDetails')}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {/* Name */}
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'#4f0715', marginBottom:'5px' }}>{t('fullNameLabel')}</label>
                <input style={inp} placeholder={t('fullNamePlace')} required value={form.name}
                  onChange={e => set('name', e.target.value)} onFocus={focusIn} onBlur={focusOut} />
              </div>

              {/* Email */}
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'#4f0715', marginBottom:'5px' }}>{t('emailAddr')} *</label>
                <input style={inp} type="email" placeholder={t('emailAddrPlace')} required value={form.email}
                  onChange={e => set('email', e.target.value)} onFocus={focusIn} onBlur={focusOut} />
              </div>

              {/* Password */}
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'#4f0715', marginBottom:'5px' }}>{t('password')} *</label>
                <div style={{ position:'relative' }}>
                  <input style={{ ...inp, paddingRight:'40px' }}
                    type={showPass ? 'text' : 'password'} placeholder={t('passwordPlace')}
                    required minLength={6} value={form.password}
                    onChange={e => set('password', e.target.value)} onFocus={focusIn} onBlur={focusOut} />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{
                    position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', display: 'flex', alignItems: 'center', color:'#786064', padding:0,
                  }}>
                    {showPass ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </div>

              {/* Class / Grade */}
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'#4f0715', marginBottom:'5px' }}>{t('classGrade')}</label>
                <select style={{ ...inp, cursor:'pointer' }} value={form.grade} onChange={e => set('grade', e.target.value)}>
                  <option value="">{t('selectGrade')}</option>
                  {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{t('classOptionText').replace('{grade}', i + 1)}</option>)}
                </select>
              </div>

              {/* Village & District */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'#4f0715', marginBottom:'5px' }}>
                    {t('villageOpt')}
                  </label>
                  <input style={inp} placeholder={t('villagePlace')} value={form.village}
                    onChange={e => set('village', e.target.value)} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.78rem', fontWeight:700, color:'#4f0715', marginBottom:'5px' }}>
                    {t('districtOpt')}
                  </label>
                  <input style={inp} placeholder={t('districtPlace')} value={form.district}
                    onChange={e => set('district', e.target.value)} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit" id="register-submit"
                disabled={loading}
                style={{
                  width:'100%', padding:'13px', marginTop:'2px',
                  background: loading ? 'rgba(120,23,40,0.5)' : 'linear-gradient(135deg, #781728, #4f0715)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  fontSize:'0.95rem', fontWeight:700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow:'0 6px 20px rgba(120,23,40,0.3)',
                  transition:'all 0.25s',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; }}
              >
                {loading
                  ? <><span style={{ display:'inline-block', width:'16px', height:'16px', border:'2.5px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} /> {t('creatingAccount')}</>
                  : <><IconRocket /> {t('createFreeAccount')}</>}
              </button>
            </form>

            <p style={{ textAlign:'center', marginTop:'14px', color:'#786064', fontSize:'0.85rem' }}>
              {t('alreadyHaveAccount')}{' '}
              <Link to="/login" style={{ color:'#781728', fontWeight:700, textDecoration:'none' }}>
                {t('signInArrow')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
