import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ExerciseHub = () => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const { theme } = useTheme();
  const [difficulty, setDifficulty] = useState('medium');
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const parseHTMLAnalysis = (htmlText) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlText;

      const categories = {};

      const headers = tempDiv.getElementsByTagName('h2');
      Array.from(headers).forEach((header) => {
        const category = header.textContent.split(':')[1]?.trim();

        if (category) {
          let ulElement = header.nextElementSibling;
          while (ulElement && ulElement.tagName !== 'UL') {
            ulElement = ulElement.nextElementSibling;
          }

          if (ulElement) {
            const exercises = Array.from(ulElement.getElementsByTagName('li'))
              .map((li) => {
                const strong = li.querySelector('strong');
                const exerciseName = strong ? strong.textContent.trim() : 'Exercise';
                const description = li.textContent.split(':').slice(1).join(':').trim();

                return {
                  name: exerciseName,
                  description: description,
                };
              });

            categories[category] = exercises;
          }
        }
      });

      return categories;
    };

    const analysisText = localStorage.getItem('analysis');
    if (analysisText) {
      try {
        const parsedCategories = parseHTMLAnalysis(analysisText);

        const generatedExercises = Object.entries(parsedCategories).flatMap(
          ([category, exercises], categoryIndex) =>
            exercises.map((exercise, index) => ({
              id: `${categoryIndex}-${index}`,
              title: exercise.name || `${category} Exercise ${index + 1}`,
              category,
              duration: '15 min',
              description: exercise.description,
              difficulty: index === 0 ? 'Beginner' : 'Intermediate',
            }))
        );

        setExercises(generatedExercises);
      } catch (error) {
        console.error('Error parsing analysis:', error);
      }
    }
  }, []);

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

      {exercises.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full space-y-4 px-6">
          <h2 className="text-2xl font-bold text-center text-green-500">You're doing great!</h2>
          <p className="text-lg text-center text-gray-500">
            You are normal and don't need any exercises right now. Keep going!
          </p>
          <button
            className={`px-6 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Continue on Your Journey
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-6">
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
              <div className="text-2xl font-bold">{15 * exercises.length} mins</div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                Remaining today
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
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
                <div className="flex flex-col">
                  <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
                    Duration: {exercise.duration}
                  </span>
                  <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
                    Level: {exercise.difficulty}
                  </span>
                </div>
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
