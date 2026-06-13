import { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import footerLogoImg from '../../assets/images/footer.png';
import '../../styles/index.css';

// SVG Icons
const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const IconSubjects = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconGames = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="3" />
  </svg>
);

const IconLeaderboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3.58a6 6 0 0 1-3.93 5.63l-.07.03a6 6 0 0 1-4 0l-.07-.03A6 6 0 0 1 6 11.58V8a6 6 0 0 1 6-6z" />
  </svg>
);

const IconRewards = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const IconProfile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconBackToHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 12 10-10 10 10" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="m15 15-3-3-3 3" />
    <path d="M12 12v6" />
  </svg>
);

const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconTeacher = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconPlus = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);

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
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const studentLinks = [
    { to: '/dashboard',   icon: <IconDashboard />,  label: t('dashboardLink') },
    { to: '/subjects',    icon: <IconSubjects />,   label: t('subjectsLink') },
    { to: '/games',       icon: <IconGames />,      label: t('gamesLink') },
    { to: '/leaderboard', icon: <IconLeaderboard />,label: t('leaderboardLink') },
    { to: '/rewards',     icon: <IconRewards />,    label: t('rewardsLink') },
    { to: '/profile',     icon: <IconProfile />,    label: t('profileLink') },
    { to: '/',            icon: <IconBackToHome />, label: t('backToHomeLink') }
  ];

  const links = studentLinks;

  return (
    <div className="layout-wrapper">
      {/* Mobile Header Bar */}
      <div className="mobile-top-bar">
        <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(true)} aria-label="Open sidebar menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-logo-container">
          <img 
            src={footerLogoImg} 
            alt="VidyaKhel Logo" 
            className="mobile-logo" 
            style={{ maxHeight: '44px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.95 }}
          />
        </div>
        {user && (
          <div className="mobile-xp-badge">
            ⚡ {user?.xp || 0} XP
          </div>
        )}
      </div>

      {/* Sidebar Backdrop Overlay on Mobile */}
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Main Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand-container">
          <img 
            src={footerLogoImg} 
            alt="VidyaKhel Logo" 
            className="sidebar-logo" 
            style={{ height: '85px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.95 }}
          />
        </div>

        {/* Compact Level badge for Tablet compact sidebar */}
        {user && (
          <div className="sidebar-xp-compact">{language === 'hi' ? 'स्तर' : 'Lvl'} {user?.level || 1}</div>
        )}

        {/* XP Progress Card for Desktop / Mobile Drawer */}
        {user && (
          <div className="sidebar-xp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="sidebar-xp-level">{language === 'hi' ? 'स्तर' : 'Level'} {user?.level || 1}</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                {(user?.xp || 0) % 200}/200
              </span>
            </div>
            <div className="xp-bar-container" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <div className="sidebar-xp-bar-fill" style={{ width: `${((user?.xp || 0) % 200) / 2}%` }} />
            </div>
            <div className="sidebar-xp-text">⚡ {user?.xp || 0} XP</div>
          </div>
        )}

        {/* Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} end={link.to === '/'}>
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout Link */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', marginBottom: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setShowLogoutConfirm(true)} className="sidebar-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#ef4444' }}>
            <span className="icon" style={{ color: '#ef4444' }}><IconLogout /></span>
            <span className="label">{t('logout')}</span>
          </button>
        </div>
      </aside>

      <main key={location.pathname} className="main-content page-fade-in">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            className="card"
            style={{
              width: '90%',
              maxWidth: '380px',
              padding: '32px 24px',
              textAlign: 'center',
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(79, 7, 21, 0.18)',
              animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: 'var(--text)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🚪</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>
              {t('areYouSureLogout')}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              {t('logoutConfirmDesc')}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: '0.9rem' }}
                onClick={() => setShowLogoutConfirm(false)}
              >
                {t('cancel')}
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, justifyContent: 'center', padding: '10px 16px', fontSize: '0.9rem' }}
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
              >
                {t('yesLogout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
