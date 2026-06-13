import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

// SVG Icons
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const WhatsappIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const ContactHeadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const contactItems = [
  {
    icon: <PhoneIcon />,
    label: 'Phone',
    value: '+91 9560846824',
    sub: 'Mon–Sat, 9am–6pm',
    color: '#781728',
    bg: 'rgba(120,23,40,0.08)',
    border: 'rgba(120,23,40,0.2)',
  },
  {
    icon: <WhatsappIcon />,
    label: 'WhatsApp',
    value: '+91 9560846824',
    sub: 'Quick replies on WhatsApp',
    color: '#0d7a56',
    bg: 'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: 'yb730934@gmail.com',
    sub: 'We reply within 24 hours',
    color: '#b45309',
    bg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    icon: <MapPinIcon />,
    label: 'Address',
    value: 'Delhi, India',
    sub: 'VidyaKhel Foundation',
    color: '#4f46e5',
    bg: 'rgba(99,102,241,0.07)',
    border: 'rgba(99,102,241,0.2)',
  },
];

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', grade: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success(language === 'hi' ? 'आपका संदेश भेज दिया गया है! हम आपसे संपर्क करेंगे। 📩' : 'Your message has been sent! We will get back to you. 📩');
      setForm({ name: '', email: '', grade: '', message: '' });
      setSending(false);
    }, 1000);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Hero ── */
        .ct-hero {
          background: #1a0208;
          padding: 160px 24px 120px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ct-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 70% 25%, rgba(120,23,40,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 15% 75%, rgba(79,7,21,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(79,7,21,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .ct-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          padding: 6px 16px;
          color: #f4b8c4;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
          animation: fadeIn 0.6s ease both;
        }
        .ct-hero h1 {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 14px;
          animation: fadeUp 0.7s ease 0.1s both;
          line-height: 1.15;
        }
        .ct-hero p {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          margin: 0 auto;
          animation: fadeUp 0.7s ease 0.2s both;
        }

        /* ── Wave Divider ── */
        .ct-wave {
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          margin-bottom: -2px;
        }
        .ct-wave svg {
          display: block;
          width: 100%;
          height: 80px;
        }

        /* ── Body ── */
        .ct-body {
          background: var(--bg, #f9f5f6);
          padding: 60px 24px 80px;
          width: 100%;
        }
        .ct-container {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Contact Info Grid ── */
        .ct-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 40px;
          animation: fadeUp 0.7s ease 0.3s both;
        }
        .ct-info-card {
          background: var(--bg-card, #fff);
          border-radius: 16px;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          border: 2px solid #9c2f4aff;
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .ct-info-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(120,23,40,0.12);
        }
        .ct-info-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ct-info-card:hover .ct-info-icon { transform: rotate(-10deg) scale(1.12); }
        .ct-info-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted, #6b7280);
        }
        .ct-info-value {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text, #1a0208);
          word-break: break-all;
        }
        .ct-info-sub {
          font-size: 0.72rem;
          color: var(--text-muted, #9ca3af);
        }

        /* ── Main Grid: Form + Map ── */
        .ct-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        /* ── Form ── */
        .ct-form-card {
          background: var(--bg-card, #fff);
          border: 0.5px solid #7b1831ff;
          border-radius: 20px;
          padding: 28px;
          animation: slideLeft 0.7s ease 0.4s both;
        }
        .ct-form-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text, #1a0208);
          margin: 0 0 20px;
          display: flex; align-items: center; gap: 9px;
        }
        .ct-form-title-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #781728, #1a0208);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; flex-shrink: 0;
        }
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        .ct-field { display: flex; flex-direction: column; gap: 5px; width: 100%; }
        .ct-label { font-size: 0.82rem; font-weight: 600; color: var(--text-muted, #6b7280); }
        .ct-two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .ct-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px;
          font-size: 0.95rem; font-weight: 700;
          border-radius: 12px; border: none;
          background: linear-gradient(135deg, #781728, #1a0208);
          color: #fff; cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 5px 18px rgba(120,23,40,0.3);
          font-family: inherit; margin-top: 4px;
        }
        .ct-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); }
        .ct-submit:disabled { opacity: 0.55; cursor: not-allowed; }

        /* ── Map ── */
        .ct-map-card {
          background: var(--bg-card, #fff);
          border: 1px solid #610c21ff;
          border-radius: 20px;
          overflow: hidden;
          animation: slideRight 0.7s ease 0.4s both;
        }
        .ct-map-header {
          padding: 18px 20px;
          border-bottom: 1px solid var(--border, #e5e7eb);
        }
        .ct-map-title {
          font-size: 1rem; font-weight: 700;
          color: var(--text, #1a0208);
          display: flex; align-items: center; gap: 8px;
          margin: 0 0 3px;
        }
        .ct-map-title svg { color: #781728; }
        .ct-map-sub { font-size: 0.78rem; color: var(--text-muted, #9ca3af); margin: 0; }
        .ct-map-iframe {
          width: 100%;
          height: 450px;
          border: none;
          display: block;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ct-info-grid { grid-template-columns: repeat(2, 1fr); }
          .ct-main-grid { grid-template-columns: 1fr; }
          .ct-map-iframe { height: 260px; }
        }
        @media (max-width: 500px) {
          .ct-hero { padding: 138px 16px 100px; }
          .ct-body { padding: 40px 16px 60px; }
          .ct-info-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ct-info-card { padding: 14px 10px; }
          .ct-info-icon { width: 40px; height: 40px; }
          .ct-form-card { padding: 20px 16px; }
          .ct-two { grid-template-columns: 1fr; }
          .ct-wave svg { height: 50px; }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <div className="ct-hero">
        
        <h1>{t('contactUsTitle')}</h1>
        <p>{t('contactUsSub')}</p>
      </div>

      {/* ── Wave Divider ── */}
      <div className="ct-wave" style={{ background: '#1a0208' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="var(--bg, #f9f5f6)"
          />
        </svg>
      </div>

      {/* ── Body ── */}
      <div className="ct-body">
        <div className="ct-container">

          {/* Contact Info Cards */}
          <div className="ct-info-grid">
            {contactItems.map((item, i) => (
              <div
                key={i}
                className="ct-info-card"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div
                  className="ct-info-icon"
                  style={{ background: item.bg, color: item.color, border: `1px solid ${item.border}` }}
                >
                  {item.icon}
                </div>
                <div className="ct-info-label">
                  {item.label === 'Phone' ? (language === 'hi' ? 'फ़ोन' : 'Phone')
                   : item.label === 'WhatsApp' ? 'WhatsApp'
                   : item.label === 'Email' ? (language === 'hi' ? 'ईमेल' : 'Email')
                   : (language === 'hi' ? 'पता' : 'Address')}
                </div>
                <div className="ct-info-value">
                  {item.label === 'Address' ? (language === 'hi' ? 'दिल्ली, भारत' : item.value) : item.value}
                </div>
                <div className="ct-info-sub">
                  {item.label === 'Phone' ? (language === 'hi' ? 'सोम–शनि, सुबह 9–शाम 6' : item.sub)
                   : item.label === 'WhatsApp' ? (language === 'hi' ? 'व्हाट्सएप पर त्वरित उत्तर' : item.sub)
                   : item.label === 'Email' ? (language === 'hi' ? 'हम 24 घंटे में जवाब देते हैं' : item.sub)
                   : (language === 'hi' ? 'विद्याखेल फाउंडेशन' : item.sub)}
                </div>
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="ct-main-grid">

            {/* Form */}
            <div className="ct-form-card">
              <div className="ct-form-title">
                <div className="ct-form-title-icon"><ContactHeadIcon /></div>
                {language === 'hi' ? 'हमें एक संदेश भेजें' : 'Send us a Message'}
              </div>

              <form className="ct-form" onSubmit={handleSubmit}>
                <div className="ct-two">
                  <div className="ct-field">
                    <label className="ct-label">{t('fullName')}</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder={t('fullNamePlace')}
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">{t('emailAddr')}</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder={t('emailAddrPlace')}
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-label">{language === 'hi' ? 'कक्षा' : 'Class'}</label>
                  <select
                    className="form-select"
                    value={form.grade}
                    onChange={e => setForm({ ...form, grade: e.target.value })}
                    required
                  >
                    <option value="">{language === 'hi' ? 'कक्षा चुनें' : 'Select Class'}</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {language === 'hi' ? `कक्षा ${i + 1}` : `Class ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ct-field">
                  <label className="ct-label">{t('messageSuggestion')}</label>
                  <textarea
                    className="form-input"
                    rows="5"
                    placeholder={t('messagePlace')}
                    required
                    style={{ resize: 'vertical', minHeight: '110px' }}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button className="ct-submit" type="submit" disabled={sending}>
                  <SendIcon />
                  {sending ? t('sending') : t('sendMessage')}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="ct-map-card">
              <div className="ct-map-header">
                <div className="ct-map-title">
                  <MapPinIcon /> {language === 'hi' ? 'हमारा स्थान' : 'Our Location'}
                </div>
                <p className="ct-map-sub">
                  {language === 'hi' ? 'विद्याखेल फाउंडेशन, दिल्ली, भारत' : 'VidyaKhel Foundation, Delhi, India'}
                </p>
              </div>
              <iframe
                className="ct-map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Delhi Map"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}