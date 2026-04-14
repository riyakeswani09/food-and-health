import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { Card } from '../components/Card';
import { Apple, Brain, Heart, ArrowRight } from 'lucide-react';

const GOALS = [
  { id: 'nutrition', title: 'Smarter Nutrition', description: 'Track macros and discover healthier foods.', icon: Apple },
  { id: 'habits', title: 'Mindful Habits', description: 'Build routines that stick without the stress.', icon: Brain },
  { id: 'health', title: 'Overall Health', description: 'Monitor daily scores and stay active.', icon: Heart },
];

export const WellnessGoals: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-8" style={{ background: 'var(--surface)' }}>
      <div className="max-w-md w-full mx-auto flex flex-col gap-8 flex-1 mt-12">
        
        <div className="flex flex-col gap-2">
          <p className="body-md" style={{ color: 'var(--primary)' }}>Step 2 of 2</p>
          <h1 className="headline-lg">What brings you here?</h1>
          <p className="body-lg">Select the areas you'd like to focus on. We'll tailor your dashboard.</p>
        </div>

        <div className="flex flex-col gap-4">
          {GOALS.map(goal => {
            const isSelected = selectedGoals.includes(goal.id);
            const Icon = goal.icon;
            
            return (
              <Card 
                key={goal.id}
                interactive
                onClick={() => toggleGoal(goal.id)}
                className={`flex gap-4 items-center ${isSelected ? 'selected-goal' : ''}`}
                // Using an inline style to simulate the selected state as we don't use strict lines
                // We shift the background subtly if selected.
              >
                <div style={{
                  background: isSelected ? 'var(--signature-gradient)' : 'var(--surface-container)',
                  padding: '12px',
                  borderRadius: '12px',
                  color: isSelected ? 'var(--on-primary)' : 'var(--on-surface-variant)'
                }}>
                  <Icon size={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className="title-lg" style={{ color: isSelected ? 'var(--primary)' : 'var(--on-surface)' }}>
                    {goal.title}
                  </h3>
                  <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                    {goal.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-auto mb-8">
          <PrimaryButton 
            onClick={() => navigate('/loader')}
            style={{ width: '100%', justifyContent: 'space-between' }}
            disabled={selectedGoals.length === 0}
          >
            <span>Create My Sanctuary</span>
            <ArrowRight size={20} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
