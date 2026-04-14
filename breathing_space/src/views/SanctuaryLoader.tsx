import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressHalo } from '../components/ProgressHalo';

export const SanctuaryLoader: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/dashboard/nutrition'), 400); // transition to dashboard
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 glass-header" style={{ 
      background: 'var(--surface-container-low)' 
    }}>
      <div className="flex flex-col items-center gap-8 fade-in text-center max-w-sm">
        
        <ProgressHalo progress={progress} size={150}>
          <span className="title-lg" style={{ color: 'var(--primary)', marginTop: '2.5rem' }}>
            {Math.round(progress)}%
          </span>
        </ProgressHalo>

        <div className="flex flex-col gap-2">
          <h2 className="headline-sm text-center">Creating your sanctuary</h2>
          <p className="body-md text-center" style={{ color: 'var(--on-surface-variant)' }}>
            We're personalizing your hub based on your goals. Breathe in, breathe out.
          </p>
        </div>

      </div>
    </div>
  );
};
