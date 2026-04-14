import React from 'react';
import { Card } from '../components/Card';
import { Flame, Droplet, Coffee, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NutritionHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col p-6 gap-8" style={{ background: 'var(--surface)' }}>
      {/* Header section */}
      <header className="flex justify-between items-center pt-4">
        <div>
          <p className="body-md" style={{ color: 'var(--primary)' }}>Today</p>
          <h1 className="headline-sm">Nutrition Hub</h1>
        </div>
        <div style={{
          background: 'var(--surface-container-high)',
          borderRadius: '50%',
          padding: '8px',
          cursor: 'pointer'
        }} onClick={() => navigate('/dashboard/score')}>
          <span className="body-md" style={{ background: 'var(--signature-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>
            Score
          </span>
        </div>
      </header>

      {/* Main Focus Card - Tonal Layering */}
      <section>
        <Card className="flex flex-col gap-6" style={{ background: 'var(--surface-container-lowest)' }}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h2 className="title-lg">Calories</h2>
              <span className="display-md" style={{ color: 'var(--on-surface)' }}>1,420</span>
              <span className="body-md" style={{ color: 'var(--on-surface-variant)' }}>/ 2,200 kcal</span>
            </div>
            
            <div style={{ padding: '12px', background: 'var(--primary-container)', borderRadius: '16px', color: 'var(--on-primary-container)'}}>
              <Flame size={24} />
            </div>
          </div>

          {/* Micro-animations / UI element without lines */}
          <div className="w-full" style={{ height: '8px', background: 'var(--surface-container)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '65%', background: 'var(--signature-gradient)', borderRadius: '4px' }}></div>
          </div>
        </Card>
      </section>

      {/* Macros asymmetrical layout */}
      <section className="flex gap-4">
        <Card className="flex-1 flex flex-col items-center text-center gap-2" style={{ background: '#FFDAD3' }}>
          <span className="body-md" style={{ color: '#93000A' }}>Carbs</span>
          <span className="title-lg" style={{ color: '#3E0500' }}>120g</span>
        </Card>
        <Card className="flex-1 flex flex-col items-center text-center gap-2" style={{ background: '#D4E3FF' }}>
          <span className="body-md" style={{ color: '#001C39' }}>Protein</span>
          <span className="title-lg" style={{ color: '#001C39' }}>85g</span>
        </Card>
        <Card className="flex-1 flex flex-col items-center text-center gap-2" style={{ background: '#7AFBB1' }}>
          <span className="body-md" style={{ color: '#002110' }}>Fats</span>
          <span className="title-lg" style={{ color: '#002110' }}>42g</span>
        </Card>
      </section>

      {/* Predictive Nudge */}
      <section>
        <Card style={{ background: 'var(--surface-container-low)' }}>
          <div className="flex items-center gap-4">
            <div style={{ background: 'var(--secondary)', color: 'var(--on-secondary)', padding: '12px', borderRadius: '12px' }}>
              <Coffee size={24} />
            </div>
            <div>
              <h3 className="title-lg">AI Advisor</h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>You're short on protein. Try adding a Greek yogurt to your afternoon snack.</p>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
};
