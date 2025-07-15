import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        success = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
        if (!success) {
          setError('Registration failed. Please try again.');
        }
      }

      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-mono font-black text-4xl mb-4 tracking-wider">
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </h1>
          <p className="font-mono text-gray-600">
            {isLogin ? 'WELCOME BACK TO BRUTAL MOTORS' : 'JOIN THE BRUTAL FAMILY'}
          </p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 mb-4 font-mono font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <Input
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="JOHN DOE"
                required
              />
            )}
            
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="USER@EXAMPLE.COM"
              required
            />

            {!isLogin && (
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                placeholder="+1 (555) 123-4567"
                required
              />
            )}

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                placeholder="••••••••"
                required
              />
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'PROCESSING...' : (isLogin ? 'LOGIN' : 'REGISTER')}
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                });
              }}
              className="font-mono text-black hover:text-brutal-yellow transition-colors duration-200"
            >
              {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : 'ALREADY HAVE AN ACCOUNT? LOGIN'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 p-4 bg-gray-100 border-2 border-gray-300">
              <p className="font-mono font-bold text-xs mb-2">DEMO ACCOUNT:</p>
              <p className="font-mono text-xs">Create a new account or use existing credentials</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Auth;
