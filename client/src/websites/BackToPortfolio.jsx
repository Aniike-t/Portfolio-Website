import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackToPortfolio() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 18px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '100px',
        color: '#000000',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateX(4px)';
        e.currentTarget.style.background = '#ffffff';
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      }}
    >
      <ArrowLeft size={16} />
      <span>Portfolio</span>
    </button>
  );
}

export default BackToPortfolio;
