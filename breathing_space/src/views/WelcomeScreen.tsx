import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { Sparkles } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 background-animation" style={{ 
      background: 'radial-gradient(circle at 50% top, var(--surface-container-low), var(--surface))' 
    }}>
      <div className="text-center flex flex-col items-center gap-6 max-w-md w-full">
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--signature-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(43, 182, 115, 0.4)'
        }}>
          <Sparkles color="white" size={40} />
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="display-sm" style={{ fontSize: '2.25rem' }}>The Breathing Space</h1>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>
            Your digital sanctuary for intelligent health and wellness tracking. 
            Reduce noise, build habits, and breathe.
          </p>
        </div>

        <PrimaryButton 
          onClick={() => navigate('/onboarding/personal')}
          style={{ marginTop: '2rem', width: '100%' }}
        >
          Begin Your Journey
        </PrimaryButton>
      </div>
    </div>
  );
};
