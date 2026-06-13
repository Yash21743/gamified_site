import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import logoImg from '../../assets/images/logo2.png';
import footerLogoImg from '../../assets/images/footer.png';

export default function PublicLayout() {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Scroll reveal — re-runs on both pathname AND language change
  // (language change remounts .reveal elements via key prop, so observer must re-attach)
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname, language]);

  const navLinks = [
    { to: '/',        label: t('home') },
    { to: '/about',   label: t('details') },
    { to: '/quizzes', label: t('explore') },
    { to: '/contact', label: t('contact') },
  ];

  const LangToggle = ({ inMenu = false }) => (
    <div
      className={inMenu ? 'lang-toggle lang-toggle--menu' : 'lang-toggle'}
      onClick={() => {
        setLanguage(language === 'en' ? 'hi' : 'en');
        if (inMenu) setMenuOpen(false);
      }}
      title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
    >
      <span className={`lang-pill ${language === 'en' ? 'lang-pill--active' : ''}`}>EN</span>
      <span className={`lang-pill ${language === 'hi' ? 'lang-pill--active' : ''}`}>हिं</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
          <img src={logoImg} alt="VidyaKhel Logo" style={{ height: '200px', objectFit: 'contain', borderRadius: '50%' }} />
        </NavLink>

        {/* Desktop centre links */}
        <div className="navbar-center">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop right controls */}
        <div className="navbar-links">
          <LangToggle />
          {user ? (
            <>
              <NavLink to="/login" className="nav-link">{t('login')}</NavLink>
              <button
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.9rem', background: 'linear-gradient(135deg, #4f0715, #800f2f)', boxShadow: '0 4px 15px rgba(79,7,21,0.2)' }}
                onClick={() => navigate('/dashboard')}
              >
                {t('dashboard')} →
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">{t('login')}</NavLink>
              <NavLink
                to="/register"
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.9rem', background: 'linear-gradient(135deg, #4f0715, #800f2f)', boxShadow: '0 4px 15px rgba(79,7,21,0.2)' }}
              >
                {t('startLearning')}
              </NavLink>
            </>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className="ham-bar" />
          <span className="ham-bar" />
          <span className="ham-bar" />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Overlay */}
      <div className={`mob-overlay ${menuOpen ? 'mob-overlay--show' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Drawer */}
      <div className={`mob-drawer ${menuOpen ? 'mob-drawer--open' : ''}`}>

        {/* Nav links — starts immediately, no header */}
        <div className="mob-nav-links">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `mob-nav-link ${isActive ? 'mob-nav-link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="mob-divider" />

        {/* Language toggle — compact, centered */}
        <div style={{ padding: '0 24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Language</p>
          <LangToggle inMenu />
        </div>

        {/* Action buttons */}
        <div className="mob-actions">
          {user ? (
            <>
              <NavLink to="/login" className="mob-btn mob-btn--outline" onClick={() => setMenuOpen(false)}>{t('login')}</NavLink>
              <button className="mob-btn mob-btn--primary" onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}>{t('dashboard')} →</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="mob-btn mob-btn--outline" onClick={() => setMenuOpen(false)}>{t('login')}</NavLink>
              <NavLink to="/register" className="mob-btn mob-btn--primary" onClick={() => setMenuOpen(false)}>{t('startLearning')}</NavLink>
            </>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div key={`${location.pathname}_${language}`} className="page-fade-in" style={{ flex: 1 }}>
        <Outlet />
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner">

          {/* Brand column — footer logo image */}
          <div className="footer-brand-col">
            <img
              src={footerLogoImg}
              alt="VidyaKhel Footer Logo"
              className="footer-logo-img"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.92 }}
            />
            <p className="footer-desc">{t('footerDesc')}</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{t('quickLinks')}</h4>
            <div className="footer-links">
              <NavLink to="/" className="footer-link">{t('home')}</NavLink>
              <NavLink to="/about" className="footer-link">{t('aboutUs')}</NavLink>
              <NavLink to="/contact" className="footer-link">{t('contactUs')}</NavLink>
              <NavLink to="/quizzes" className="footer-link">{t('explore')}</NavLink>
            </div>
          </div>

          {/* Learning */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{t('learning')}</h4>
            <div className="footer-links">
              <NavLink to="/subjects" className="footer-link">{t('subjects')}</NavLink>
              <NavLink to="/games" className="footer-link">{t('games')}</NavLink>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">{t('contactUs')}</h4>
            <div className="footer-links">
              <a href="mailto:yb730934@gmail.com" className="footer-link footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>yb730934@gmail.com</span>
              </a>
              <a href="tel:+919560846824" className="footer-link footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
                </svg>
                <span>+91 9560846824</span>
              </a>
              <span className="footer-link footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Haryana, Delhi</span>
              </span>
            </div>
          </div>

        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} विद्याखेल. {t('rightsReserved')} &nbsp;|&nbsp; Handcrafted for Rural Education Hackathon.
        </div>
      </footer>
    </div>
  );
}
