import React from 'react';
import { Card } from '../components/Card';
import { HeartPulse, CheckCircle2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProgressHalo } from '../components/ProgressHalo';

export const WellnessScore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col p-6 gap-8" style={{ background: 'var(--surface)' }}>
      <header className="flex justify-between items-center pt-4">
        <div>
          <p className="body-md" style={{ color: 'var(--primary)' }}>Overall</p>
          <h1 className="headline-sm">Health Score</h1>
        </div>
        <div style={{
          background: 'var(--surface-container-high)',
          borderRadius: '50%',
          padding: '8px',
          cursor: 'pointer'
        }} onClick={() => navigate('/dashboard/nutrition')}>
          <span className="body-md" style={{ color: 'var(--on-surface-variant)', fontWeight: 'bold' }}>
            Diet
          </span>
        </div>
      </header>

      {/* Score Visualization */}
      <section className="flex justify-center py-6">
        <ProgressHalo progress={82} size={200}>
          <div className="flex flex-col items-center" style={{ marginTop: '3.5rem' }}>
            <span className="display-lg" style={{ color: 'var(--primary)', lineHeight: 1 }}>82</span>
            <span className="body-md" style={{ color: 'var(--on-surface-variant)' }}>Excellent</span>
          </div>
        </ProgressHalo>
      </section>

      <section>
        <h2 className="title-lg mb-4">Habit Patterns</h2>
        <div className="flex flex-col gap-4">
          
          <Card className="flex items-center gap-4">
            <CheckCircle2 color="var(--primary)" size={28} />
            <div className="flex-1">
              <h3 className="title-lg">Hydration</h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>You reached your water goal 5 days in a row.</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 bg-tertiary">
            <HeartPulse color="var(--tertiary)" size={28} />
            <div className="flex-1">
              <h3 className="title-lg">Cardio Activity</h3>
              <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>A bit low this week. Try a 20-min walk.</p>
            </div>
          </Card>

        </div>
      </section>

      <section className="mt-4">
        <Card style={{ background: 'var(--secondary)', color: 'var(--on-secondary)' }}>
          <div className="flex items-start gap-4">
            <TrendingUp size={28} />
            <div>
              <h3 className="title-lg mb-1">Weekly Insight</h3>
              <p className="body-md" style={{ opacity: 0.9 }}>Your consistent sleep schedule is positively impacting your stress levels. Keep it up.</p>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
};
