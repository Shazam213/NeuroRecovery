import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, Timer, Target, ArrowUp, ArrowDown } from 'lucide-react';

const AdaptiveExerciseSystem = () => {
  const [difficulty, setDifficulty] = useState(5);
  const [performance, setPerformance] = useState(0);
  const [eegFocus, setEegFocus] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);

  const exerciseTypes = {
    memory: [
      { type: 'sequence', title: 'Pattern Recall', minDifficulty: 1 },
      { type: 'spatial', title: 'Spatial Memory', minDifficulty: 2 },
      { type: 'verbal', title: 'Word Association', minDifficulty: 3 }
    ],
    attention: [
      { type: 'sustained', title: 'Focus Track', minDifficulty: 1 },
      { type: 'divided', title: 'Dual Task', minDifficulty: 3 },
      { type: 'selective', title: 'Signal Detection', minDifficulty: 2 }
    ],
    executive: [
      { type: 'planning', title: 'Strategy Planning', minDifficulty: 4 },
      { type: 'inhibition', title: 'Response Control', minDifficulty: 3 },
      { type: 'flexibility', title: 'Task Switching', minDifficulty: 5 }
    ]
  };

  // Simulate EEG focus updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEegFocus(prev => {
        const change = Math.random() * 0.4 - 0.2;
        return Math.max(0, Math.min(1, prev + change));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Difficulty adjustment algorithm
  useEffect(() => {
    if (currentExercise) {
      const performanceWeight = 0.6;
      const focusWeight = 0.4;
      
      const adjustedScore = (performance * performanceWeight) + (eegFocus * focusWeight);
      
      if (adjustedScore > 0.8 && difficulty < 10) {
        setDifficulty(prev => Math.min(10, prev + 1));
      } else if (adjustedScore < 0.4 && difficulty > 1) {
        setDifficulty(prev => Math.max(1, prev - 1));
      }
    }
  }, [performance, eegFocus]);

  const startExercise = (exerciseType) => {
    setCurrentExercise(exerciseType);
    setPerformance(0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            Adaptive Exercise System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Difficulty Level</span>
                  <span className="text-2xl font-bold">{difficulty}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  {difficulty > 1 && (
                    <ArrowDown className="text-red-500" />
                  )}
                  {difficulty < 10 && (
                    <ArrowUp className="text-green-500" />
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Focus Level</span>
                  <span className="text-2xl font-bold">{(eegFocus * 100).toFixed(0)}%</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${eegFocus * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Performance</span>
                  <span className="text-2xl font-bold">{(performance * 100).toFixed(0)}%</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${performance * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {Object.entries(exerciseTypes).map(([category, exercises]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-semibold capitalize">{category} Exercises</h3>
                {exercises.map((exercise) => (
                  <Button
                    key={exercise.type}
                    onClick={() => startExercise(exercise)}
                    disabled={exercise.minDifficulty > difficulty}
                    className="w-full justify-start"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    {exercise.title}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveExerciseSystem;