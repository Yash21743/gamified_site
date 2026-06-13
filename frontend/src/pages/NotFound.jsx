import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
      <div style={{ fontSize: '6rem', marginBottom: '16px' }}>🗺️</div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>404</h1>
      <p style={{ color: '#9ca3af', marginBottom: '28px', fontSize: '1.1rem' }}>
        Oops! This page doesn't exist. Let's get you back on track!
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Go Back</button>
        <button className="btn btn-primary" onClick={() => navigate('/')}>🏠 Home</button>
      </div>
    </div>
  );
}
