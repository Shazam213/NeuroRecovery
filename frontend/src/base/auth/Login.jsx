import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { authService } from './../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login(formData);
      login(response.data);
      
      if(response.data.role === "user") {
        navigate('/dashboard');
      } else {
        navigate('/caregiver');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} flex items-center justify-center p-4`}>
      <Card className={`w-full max-w-md shadow-xl hover:shadow-2xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <CardHeader className="space-y-1 text-center pb-8">
          <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <LogIn className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>Welcome Back</CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Please sign in to continue</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-900 px-4 py-3 rounded-lg flex items-center gap-2 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 -translate-y-1/2`} />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 
                             ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                />
              </div>
              
              <div className="relative">
                <Lock className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} absolute left-3 top-1/2 -translate-y-1/2`} />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className={`pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 
                             ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Remember me</span>
                </label>
                <a href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                          transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                          disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className={`text-gray-600 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      Already have an account?{' '}
      <span 
        onClick={() => navigate('/register')} 
        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
      >
        Sign Up
      </span>
    </p>
          </div>
        </CardContent>
      </Card>
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export {LoginForm};
