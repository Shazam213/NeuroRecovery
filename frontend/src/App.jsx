// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
// import Dashboard from './components/dashboard/Dashboard';
// import ExerciseHub from './components/exercises/ExerciseHub';
// import CaregiverPortal from './components/caregiver/CaregiverPortal';
// import ProgressTracking from './components/progress/ProgressTracking';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import EEGVisualization from './components/eeg/EEGVisualization';
// import AdaptiveExerciseSystem from './components/exercises/AdaptiveExerciseSystem';
// import NotificationSystem from './components/notifications/NotificationSystem';

// const App = () => {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/exercises" element={<ExerciseHub />} />
//           <Route path="/exercises/adaptive" element={<AdaptiveExerciseSystem />} />
//           <Route path="/caregiver" element={<CaregiverPortal />} />
//           <Route path="/progress" element={<ProgressTracking />} />
//           <Route path="/eeg" element={<EEGVisualization />} />
//           <Route path="/notifications" element={<NotificationSystem />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.js
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
import CognitiveReport from './base/test/Testss';
const App = () => {

  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="results" element={<CognitiveReport />} />
        </Routes>

      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;