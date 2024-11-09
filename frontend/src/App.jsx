import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './base/layout/Navbar';
import Dashboard from './base/dashboard/Dashboard';
import ExerciseHub from './base/exercises/ExerciseHub';
import CaregiverPortal from './base/caregiver/CaregiverPortal';
import ProgressTracking from './base/progress/ProgressTracking';
import EEGVisualization from './base/eeg/EEGVisualization';
import AdaptiveExerciseSystem from './base/exercises/AdaptiveExerciseSystem';
import NotificationSystem from './base/notifications/NotificationSystem';
import { LoginForm } from './base/auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import RegisterForm from './base/auth/Register';
import MentalMath from './base/test/MentalMath'
import OneToFifty from './base/test/OneToFifty';
import Game from './base/test/Game';
import Sequence from './base/test/Sequence';
import GameBoard from './base/test/GameBoard'
import EEGPlotViewer from './base/eeg/EEGPlotViewer';
import CognitiveAssessment from './base/exercises/CognitiveAssessment';
const App = () => {

  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/" element={<LoginForm />}/>
          <Route path="/exercises" element={<ExerciseHub />} />
          <Route path="/exercises/adaptive" element={<AdaptiveExerciseSystem />} />
          <Route path="/notifications" element={<NotificationSystem />} />
          <Route path="/caregiver" element={<CaregiverPortal />} />
          <Route path="/eeg" element={<EEGVisualization />} />
          <Route path="/progress" element={<ProgressTracking />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="test" element={<MentalMath />} />
          <Route path="test2" element={<OneToFifty />} />
          <Route path="test3" element={<Game />} />
          <Route path="test4" element={<Sequence />} />
          <Route path="test5" element={<GameBoard />} />
          <Route path="results" element={<CognitiveAssessment />} />
          <Route path="plot" element={<EEGPlotViewer/>} />
          <Route path="plot" element={<EEGPlotViewer/>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;