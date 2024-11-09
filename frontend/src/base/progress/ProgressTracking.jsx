import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Brain, Activity, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ProgressTracking = () => {
  const [dateRange, setDateRange] = useState('week');
  const { theme, setTheme } = useTheme(); // Use theme and setTheme from context

  // Sample data - in production, this would come from your backend
  const progressData = [
    { date: '2024-01-01', cognitiveScore: 75, exerciseCompletion: 85, focusLevel: 70, sessionDuration: 25 },
    { date: '2024-01-02', cognitiveScore: 78, exerciseCompletion: 90, focusLevel: 75, sessionDuration: 30 },
    { date: '2024-01-03', cognitiveScore: 80, exerciseCompletion: 88, focusLevel: 78, sessionDuration: 28 },
    { date: '2024-01-04', cognitiveScore: 82, exerciseCompletion: 92, focusLevel: 80, sessionDuration: 32 },
    { date: '2024-01-05', cognitiveScore: 85, exerciseCompletion: 95, focusLevel: 82, sessionDuration: 35 },
    { date: '2024-01-06', cognitiveScore: 83, exerciseCompletion: 91, focusLevel: 79, sessionDuration: 30 },
    { date: '2024-01-07', cognitiveScore: 87, exerciseCompletion: 94, focusLevel: 85, sessionDuration: 38 }
  ];

  const metrics = [
    {
      title: 'Average Cognitive Score',
      value: '82',
      change: '+5',
      icon: Brain,
      color: 'text-blue-600'
    },
    {
      title: 'Exercise Completion Rate',
      value: '91%',
      change: '+3%',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Average Focus Level',
      value: '78%',
      change: '+8%',
      icon: Zap,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className={`space-y-6 p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                  {metric.title}
                </p>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
              <div className="mt-2">
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  {metric.value}
                </p>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {metric.change} from last period
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
  
      <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cognitive" className="space-y-4">
            <TabsList>
              <TabsTrigger value="cognitive" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Cognitive Score</TabsTrigger>
              <TabsTrigger value="completion" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Exercise Completion</TabsTrigger>
              <TabsTrigger value="focus" className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Focus Level</TabsTrigger>
            </TabsList>
  
            <TabsContent value="cognitive" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cognitiveScore" 
                    stroke={theme === 'dark' ? '#4c9efc' : '#2563eb'} 
                    name="Cognitive Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
  
            <TabsContent value="completion" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="exerciseCompletion" 
                    stroke={theme === 'dark' ? '#10b981' : '#16a34a'} 
                    name="Completion Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
  
            <TabsContent value="focus" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="focusLevel" 
                    stroke={theme === 'dark' ? '#9b4de8' : '#9333ea'} 
                    name="Focus Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
  
};

export default ProgressTracking;