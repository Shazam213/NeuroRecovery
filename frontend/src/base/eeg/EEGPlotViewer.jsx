import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTheme } from '../../contexts/ThemeContext';
import { Upload, FileIcon, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const EEGPlotViewer = () => {
    const [rawPlotData, setRawPlotData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { theme } = useTheme();

    const channelColors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead',
        '#d4a4eb', '#e9967a', '#66c2a5', '#fc8d62', '#8da0cb'
    ];

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUploadStatus(null);
            setRawPlotData([]);
            setDisplayedData([]);
            setCurrentIndex(0);
            setIsAnimating(false);
        }
    };

    const processEEGData = (data) => {
        const channelNames = Object.keys(data).filter(key => key.startsWith('Channel'));
        const maxLength = Math.max(...channelNames.map(channel => data[channel].length));
        
        const timeSeriesData = [];
        for (let i = 0; i < maxLength; i++) {
            const point = {
                time: i,
            };
            channelNames.forEach(channel => {
                point[channel] = data[channel][i] || 0;
            });
            timeSeriesData.push(point);
        }
        
        return {
            timeSeriesData,
            channels: channelNames
        };
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        setIsLoading(true);
        setUploadStatus(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const data = await response.json();
                const { timeSeriesData, channels } = processEEGData(data.eeg_data_points);
                setRawPlotData({ timeSeriesData, channels });
                setDisplayedData([]);
                setCurrentIndex(0);
                setUploadStatus('success');
                setIsAnimating(true);
            } else {
                setUploadStatus('error');
                console.error('Failed to upload file');
            }
        } catch (error) {
            setUploadStatus('error');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let animationInterval;
        
        if (isAnimating && rawPlotData.timeSeriesData) {
            animationInterval = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    if (prevIndex >= rawPlotData.timeSeriesData.length) {
                        setIsAnimating(false);
                        return prevIndex;
                    }
                    
                    setDisplayedData(prevData => {
                        const newPoint = rawPlotData.timeSeriesData[prevIndex];
                        const newData = [...prevData, newPoint];
                        return newData.slice(-100); // Keep last 100 points
                    });
                    
                    return prevIndex + 1;
                });
            }, 100); // Adjust speed of animation here
        }

        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
        };
    }, [isAnimating, rawPlotData]);

    return (
        <div className="min-h-screen p-8 bg-background">
            <Card className="max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">
                        EEG Plot Viewer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFileUpload} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="file" className="text-lg">
                                Upload MAT file
                            </Label>
                            <div className="flex flex-col gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="file"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    MAT files only
                                                </p>
                                            </div>
                                            <input 
                                                type="file" 
                                                id="file" 
                                                name="file" 
                                                className="hidden" 
                                                required 
                                                accept=".mat"
                                                onChange={handleFileSelect}
                                            />
                                        </label>
                                    </div>
                                </div>

                                {selectedFile && (
                                    <Alert className={`flex items-center justify-between ${
                                        uploadStatus === 'success' ? 'border-green-500' :
                                        uploadStatus === 'error' ? 'border-red-500' :
                                        'border-blue-500'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="h-4 w-4" />
                                            <AlertDescription className="flex items-center gap-2">
                                                <span className="font-medium">{selectedFile.name}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    ({(selectedFile.size / 1024).toFixed(2)} KB)
                                                </span>
                                            </AlertDescription>
                                        </div>
                                        {uploadStatus && (
                                            <div>
                                                {uploadStatus === 'success' ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                )}
                                            </div>
                                        )}
                                    </Alert>
                                )}

                                <Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={isLoading || !selectedFile}
                                >
                                    {isLoading ? "Processing..." : "Generate Plot"}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {displayedData.length > 0 && rawPlotData.channels && (
                        <div className="mt-8 space-y-4">
                            <h2 className="text-2xl font-semibold mb-4">EEG Channel Plots</h2>
                            <div className="w-full h-[600px] border border-muted rounded-lg p-4 bg-card">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="time" 
                                            type="number"
                                            domain={['dataMin', 'dataMax']}
                                            label={{ value: 'Time Points', position: 'bottom' }}
                                        />
                                        <YAxis 
                                            label={{ 
                                                value: 'Amplitude', 
                                                angle: -90, 
                                                position: 'insideLeft' 
                                            }}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px'
                                            }}
                                        />
                                        {/* <Legend /> */}
                                        {rawPlotData.channels.map((channel, index) => (
                                            <Line
                                                key={channel}
                                                type="monotone"
                                                dataKey={channel}
                                                name={channel}
                                                data={displayedData}
                                                stroke={channelColors[index % channelColors.length]}
                                                dot={false}
                                                activeDot={{ r: 4 }}
                                            />
                                        ))}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default EEGPlotViewer;