import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Brain, AlertTriangle, Bookmark } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CaregiverPortal = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { theme, setTheme } = useTheme(); // Use theme and setTheme from context

  const [timeRange, setTimeRange] = useState('week');

  const patients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Post-Stroke Recovery', risk: 'low' },
    { id: 2, name: 'Jane Smith', age: 52, condition: 'TBI Recovery', risk: 'medium' },
    { id: 3, name: 'Mike Johnson', age: 38, condition: 'Cognitive Rehabilitation', risk: 'high' },
  ];

  const progressData = [
    { day: 'Mon', cognitive: 65, memory: 70, attention: 60 },
    { day: 'Tue', cognitive: 68, memory: 72, attention: 63 },
    { day: 'Wed', cognitive: 75, memory: 68, attention: 70 },
    { day: 'Thu', cognitive: 72, memory: 75, attention: 68 },
    { day: 'Fri', cognitive: 78, memory: 80, attention: 75 },
  ];

  return (
  <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
    <div className="mb-8">
      <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        Caregiver Portal
      </h1>
      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        Monitor and manage patient progress
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            Total Patients
          </CardTitle>
          <Users className={`h-4 w-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            Active in treatment
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            Average Progress
          </CardTitle>
          <Brain className={`h-4 w-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+15%</div>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            Past 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            High Risk Patients
          </CardTitle>
          <AlertTriangle className={`h-4 w-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            Require attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            Pending Reviews
          </CardTitle>
          <Bookmark className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            Awaiting assessment
          </p>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedPatient?.id === patient.id
                    ? `${theme === 'dark' ? 'bg-indigo-800 border-l-4 border-indigo-600' : 'bg-indigo-50 border-l-4 border-indigo-600'}`
                    : `${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{patient.name}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                      {patient.condition}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      patient.risk === 'low'
                        ? `${theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`
                        : patient.risk === 'medium'
                        ? `${theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`
                        : `${theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`
                    }`}
                  >
                    {patient.risk} risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>Progress Overview</CardTitle>
          <div className="flex space-x-4 mt-4">
            {['week', 'month', '3months'].map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded-lg text-sm ${
                  timeRange === range
                    ? `${theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`
                    : `${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <LineChart data={progressData} width={600} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cognitive"
                stroke={theme === 'dark' ? '#7c63e7' : '#8884d8'}
                name="Cognitive Score"
              />
              <Line
                type="monotone"
                dataKey="memory"
                stroke={theme === 'dark' ? '#2dbe75' : '#82ca9d'}
                name="Memory Score"
              />
              <Line
                type="monotone"
                dataKey="attention"
                stroke={theme === 'dark' ? '#ff8800' : '#ffc658'}
                name="Attention Score"
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

};

export default CaregiverPortal;