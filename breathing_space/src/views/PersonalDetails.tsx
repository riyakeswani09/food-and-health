import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { InputField } from '../components/InputField';
import { User, Activity, ArrowRight } from 'lucide-react';

export const PersonalDetails: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <div className="min-h-screen flex flex-col p-8" style={{ background: 'var(--surface)' }}>
      <div className="max-w-md w-full mx-auto flex flex-col gap-8 flex-1 mt-12">
        
        <div className="flex flex-col gap-2">
          <p className="body-md" style={{ color: 'var(--primary)' }}>Step 1 of 2</p>
          <h1 className="headline-lg">Let's personalize your sanctuary.</h1>
          <p className="body-lg">Before we build your dashboard, tell us a little about yourself.</p>
        </div>

        <div className="flex flex-col gap-6">
          <InputField 
            label="What should we call you?"
            placeholder="Your name"
            icon={<User size={20} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <InputField 
            label="Your age"
            placeholder="e.g. 28"
            type="number"
            icon={<Activity size={20} />}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mt-auto mb-8">
          <PrimaryButton 
            onClick={() => navigate('/onboarding/goals')}
            style={{ width: '100%', justifyContent: 'space-between' }}
            disabled={!name}
          >
            <span>Continue</span>
            <ArrowRight size={20} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
