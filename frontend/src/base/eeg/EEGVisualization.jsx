import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EEGVisualization = () => {
  const [eegData, setEegData] = useState([]);
  const { theme } = useTheme();
  const [selectedBand, setSelectedBand] = useState('alpha');
  const navigate = useNavigate(); // Initialize navigate

  // Simulate real-time EEG data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEegData(prevData => {
        const newPoint = {
          timestamp: Date.now(),
          alpha: Math.random() * 10 + 20,
          beta: Math.random() * 15 + 25,
          theta: Math.random() * 8 + 15,
          delta: Math.random() * 12 + 18,
          gamma: Math.random() * 6 + 12
        };
        const newData = [...prevData, newPoint];
        return newData.slice(-100); // Keep last 100 points
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const brainRegions = [
    { name: 'Frontal', value: 85 },
    { name: 'Temporal', value: 72 },
    { name: 'Parietal', value: 68 },
    { name: 'Occipital', value: 78 }
  ];

  const latestEEGData = eegData.length > 0 ? eegData[eegData.length - 1] : {};

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <Brain className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            Real-time EEG Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto space-y-4">
          {/* Upload Button */}

          <Tabs defaultValue="waves" className="space-y-4">
            <TabsList>
              <TabsTrigger value="waves">Brain Waves</TabsTrigger>
              <TabsTrigger value="regions">Brain Regions</TabsTrigger>
              <TabsTrigger value="spectrum">Frequency Spectrum</TabsTrigger>
            </TabsList>

            <TabsContent value="waves" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eegData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
                  <XAxis dataKey="timestamp" domain={['auto', 'auto']} tick={false} stroke={theme === 'dark' ? '#ccc' : '#555'} />
                  <YAxis stroke={theme === 'dark' ? '#ccc' : '#555'} />
                  <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }} />
                  <Line type="monotone" dataKey="alpha" stroke="#2563eb" dot={false} name="Alpha" />
                  <Line type="monotone" dataKey="beta" stroke="#16a34a" dot={false} name="Beta" />
                  <Line type="monotone" dataKey="theta" stroke="#9333ea" dot={false} name="Theta" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="regions" className="grid grid-cols-2 gap-4">
              {brainRegions.map(region => (
                <Card key={region.name}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} font-medium`}>
                        {region.name}
                      </span>
                      <span className="text-2xl font-bold">{region.value}%</span>
                    </div>
                    <div className={`mt-2 h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
                      <div
                        className={`h-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}
                        style={{ width: `${region.value}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="spectrum" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[latestEEGData]}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
                  <XAxis dataKey="band" tick={false} stroke={theme === 'dark' ? '#ccc' : '#555'} />
                  <YAxis stroke={theme === 'dark' ? '#ccc' : '#555'} />
                  <Tooltip cursor={false} wrapperStyle={{ backgroundColor: theme === 'dark' ? '#333' : 'transparent', border: 'none' }} />
                  <Bar dataKey="delta" fill="#6b7280" name="Delta" />
                  <Bar dataKey="theta" fill="#9333ea" name="Theta" />
                  <Bar dataKey="alpha" fill="#2563eb" name="Alpha" />
                  <Bar dataKey="beta" fill="#16a34a" name="Beta" />
                  <Bar dataKey="gamma" fill="#f59e0b" name="Gamma" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
          <button
            onClick={() => navigate('/plot')}
            className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-500 text-gray-200' : 'bg-blue-600 text-white'}`}
          >
            Upload Your EEG Data
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EEGVisualization;
