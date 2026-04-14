import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomeScreen } from './views/WelcomeScreen';
import { PersonalDetails } from './views/PersonalDetails';
import { WellnessGoals } from './views/WellnessGoals';
import { SanctuaryLoader } from './views/SanctuaryLoader';
import { NutritionHub } from './views/NutritionHub';
import { WellnessScore } from './views/WellnessScore';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        
        {/* Onboarding */}
        <Route path="/onboarding/personal" element={<PersonalDetails />} />
        <Route path="/onboarding/goals" element={<WellnessGoals />} />
        
        {/* Loader */}
        <Route path="/loader" element={<SanctuaryLoader />} />
        
        {/* Dashboard Hubs */}
        <Route path="/dashboard/nutrition" element={<NutritionHub />} />
        <Route path="/dashboard/score" element={<WellnessScore />} />
        
        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
