import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, AlertTriangle, CheckCircle, Clock, Brain } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      patient: 'John Doe',
      message: 'Significant drop in cognitive performance detected',
      timestamp: '2024-01-07T10:30:00',
      status: 'unread',
      priority: 'high'
    },
    {
      id: 2,
      type: 'progress',
      patient: 'Jane Smith',
      message: 'Completed weekly exercise goal',
      timestamp: '2024-01-07T09:15:00',
      status: 'unread',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'schedule',
      patient: 'Mike Johnson',
      message: 'Missed scheduled exercise session',
      timestamp: '2024-01-07T08:45:00',
      status: 'read',
      priority: 'low'
    }
  ]);

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'medium':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return '';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return AlertTriangle;
      case 'progress':
        return CheckCircle;
      case 'schedule':
        return Clock;
      default:
        return Bell;
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, status: 'read' }
        : notification
    ));
  };
  const { theme } = useTheme();


   return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <Card className={theme === 'dark' ? 'bg-gray-800' : ''}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
            <Bell className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
            Notification Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map(notification => {
              const Icon = getIcon(notification.type);
              
              return (
                <Alert
                  key={notification.id}
                  className={`${getPriorityStyles(notification.priority)} ${notification.status === 'read' ? 'opacity-60' : ''} ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
                >
                  <Icon className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <AlertTitle className="flex items-center justify-between">
                    <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>
                      {notification.patient}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    <p className={theme === 'dark' ? 'text-gray-300' : ''}>{notification.message}</p>
                    {notification.status === 'unread' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={`mt-2 ${theme === 'dark' ? 'border-gray-600' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>

          <div className="mt-6">
            <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>Notification Settings</h3>
            <div className="space-y-2">
              <div className={`flex items-center justify-between p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>High Priority Alerts</span>
                <Button variant="outline" size="sm" className={theme === 'dark' ? 'text-gray-200 border-gray-600' : ''}>
                  Enable
                </Button>
              </div>
              <div className={`flex items-center justify-between p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>Medium Priority Alerts</span>
                <Button variant="outline" size="sm" className={theme === 'dark' ? 'text-gray-200 border-gray-600' : ''}>
                  Enable
                </Button>
              </div>
              <div className={`flex items-center justify-between p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>Low Priority Alerts</span>
                <Button variant="outline" size="sm" className={theme === 'dark' ? 'text-gray-200 border-gray-600' : ''}>
                  Enable
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSystem;
