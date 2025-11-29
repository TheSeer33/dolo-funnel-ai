import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f3e8ff, #fce7f3, #dbeafe)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          DOLO's Funnel AI
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#6B7280', marginBottom: '2rem' }}>
          AI-Powered Funnel Builder for Solopreneurs
        </p>
        <div style={{ 
          background: 'white', 
          borderRadius: '0.5rem', 
          padding: '1.5rem', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ color: '#10B981', fontWeight: 'bold', fontSize: '1.2rem' }}>
            🎉 Your app is successfully deployed!
          </p>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>
            The full app will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
