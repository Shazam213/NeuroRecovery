import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, Target } from 'lucide-react';
import AdaptiveExerciseSystem from './AdaptiveExerciseSystem';
import { useTheme } from '../../contexts/ThemeContext';

const ExerciseHub = () => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const { theme } = useTheme();
  const [difficulty, setDifficulty] = useState('medium');

  // Simulated EEG data processing
  useEffect(() => {
    const interval = setInterval(() => {
      // In reality, this would process real EEG data
      const performanceMetric = Math.random();
      if (performanceMetric > 0.7) {
        setDifficulty('hard');
      } else if (performanceMetric < 0.3) {
        setDifficulty('easy');
      } else {
        setDifficulty('medium');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const exercises = [
    {
      id: 1,
      title: 'Pattern Recognition',
      category: 'Memory',
      duration: '10 min',
      description: 'Match patterns to improve visual memory and cognitive processing.'
    },
    {
      id: 2,
      title: 'Word Association',
      category: 'Language',
      duration: '15 min',
      description: 'Connect related words to enhance semantic processing abilities.'
    },
    {
      id: 3,
      title: 'Spatial Navigation',
      category: 'Spatial',
      duration: '12 min',
      description: 'Navigate through 3D environments to improve spatial awareness.'
    }
  ];


  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="mb-8 px-6">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Cognitive Exercises
        </h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Personalized exercises adapted to your performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-6 flex-grow">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Current Difficulty
            </CardTitle>
            <Target className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{difficulty}</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
              Adjusted based on EEG feedback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Brain Activity
            </CardTitle>
            <Brain className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
              Monitoring in real-time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Session Time
            </CardTitle>
            <Clock className={`h-4 w-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37 min</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
              Remaining today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 flex-grow">
        {exercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={`hover:shadow-lg transition-shadow cursor-pointer ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}
            onClick={() => setCurrentExercise(exercise)}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  {exercise.title}
                </CardTitle>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${theme === 'dark' ? 'bg-indigo-700 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}
                >
                  {exercise.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {exercise.description}
              </p>
              <div className="flex justify-between items-center">
                <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
                  Duration: {exercise.duration}
                </span>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Start Exercise
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExerciseHub;
