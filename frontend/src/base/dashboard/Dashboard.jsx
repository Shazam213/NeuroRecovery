import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Brain, Activity, Users, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import EEGVisualization from '../eeg/EEGVisualization';
// import NotificationSystem from '../notifications/NotificationSystem';
// import DashboardMetrics from './DashboardMetrics';
import { useTheme } from '../../contexts/ThemeContext';
const Dashboard = () => {
  const { theme, setTheme } = useTheme(); // Use theme and setTheme from context
  const [eegData] = useState([
    { time: '0s', alpha: 8, beta: 12, theta: 6 },
    { time: '5s', alpha: 10, beta: 14, theta: 7 },
    { time: '10s', alpha: 9, beta: 13, theta: 8 },
    { time: '15s', alpha: 11, beta: 15, theta: 6 },
    { time: '20s', alpha: 12, beta: 14, theta: 7 }
  ]);

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>NeuroRecovery Dashboard</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back! Monitor your cognitive rehabilitation progress.</p>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Exercise Completion</CardTitle>
            <Brain className={`h-4 w-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>+2% from last session</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Cognitive Score</CardTitle>
            <Activity className={`h-4 w-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">726</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>+15 points improvement</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Session Time</CardTitle>
            <BarChart className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Average duration</p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Caregiver Updates</CardTitle>
            <Users className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>New messages</p>
          </CardContent>
        </Card>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Real-Time EEG Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <LineChart data={eegData} width={500} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alpha" stroke="#8884d8" name="Alpha Waves" />
                <Line type="monotone" dataKey="beta" stroke="#82ca9d" name="Beta Waves" />
                <Line type="monotone" dataKey="theta" stroke="#ffc658" name="Theta Waves" />
              </LineChart>
            </div>
          </CardContent>
        </Card>
  
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Upcoming Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Memory Pattern Recognition', time: '2:00 PM', difficulty: 'Medium' },
                { title: 'Spatial Reasoning Tasks', time: '3:30 PM', difficulty: 'Hard' },
                { title: 'Language Processing', time: '5:00 PM', difficulty: 'Easy' }
              ].map((exercise, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div>
                    <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{exercise.title}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{exercise.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    exercise.difficulty === 'Easy' 
                      ? `${theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`
                      : exercise.difficulty === 'Medium' 
                      ? `${theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`
                      : `${theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`
                  }`}>
                    {exercise.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
};

export default Dashboard;