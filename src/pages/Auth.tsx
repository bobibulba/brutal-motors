import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Eye, EyeOff, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneStep, setPhoneStep] = useState<'phone' | 'code'>('phone');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
  });

  const { login, loginWithGoogle, loginWithPhone, register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        success = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
      }

      if (success) {
        navigate('/');
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (phoneStep === 'phone') {
      // Simulate sending SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPhoneStep('code');
      setIsLoading(false);
    } else {
      try {
        const success = await loginWithPhone(formData.phone, formData.verificationCode);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid verification code');
        }
      } catch (err) {
        setError('Verification failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');

    try {
      const success = await loginWithGoogle();
      if (success) {
        navigate('/');
      } else {
        setError('Google authentication failed');
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
          {/* Auth Method Selection */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 px-4 font-mono font-bold border-2 border-black transition-all duration-200 ${
                authMethod === 'email' 
                  ? 'bg-brutal-yellow text-black shadow-brutal' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              EMAIL
            </button>
            <button
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 px-4 font-mono font-bold border-2 border-black transition-all duration-200 ${
                authMethod === 'phone' 
                  ? 'bg-brutal-cyan text-black shadow-brutal' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <Phone className="h-4 w-4 inline mr-2" />
              PHONE
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 mb-4 font-mono font-bold">
              {error}
            </div>
          )}

          {/* Email Authentication */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailAuth}>
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
          )}

          {/* Phone Authentication */}
          {authMethod === 'phone' && (
            <form onSubmit={handlePhoneAuth}>
              {phoneStep === 'phone' ? (
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              ) : (
                <div>
                  <p className="font-mono text-sm mb-4 text-gray-600">
                    VERIFICATION CODE SENT TO {formData.phone}
                  </p>
                  <Input
                    label="Verification Code"
                    value={formData.verificationCode}
                    onChange={handleInputChange('verificationCode')}
                    placeholder="123456"
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full mb-4"
                disabled={isLoading}
              >
                {isLoading ? 'PROCESSING...' : (phoneStep === 'phone' ? 'SEND CODE' : 'VERIFY')}
              </Button>
            </form>
          )}

          {/* Google Authentication */}
          <Button
            onClick={handleGoogleAuth}
            variant="secondary"
            className="w-full mb-6"
            icon={Chrome}
            disabled={isLoading}
          >
            CONTINUE WITH GOOGLE
          </Button>

          {/* Toggle Login/Register */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setPhoneStep('phone');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                  verificationCode: '',
                });
              }}
              className="font-mono text-black hover:text-brutal-yellow transition-colors duration-200"
            >
              {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : 'ALREADY HAVE AN ACCOUNT? LOGIN'}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-100 border-2 border-gray-300">
            <p className="font-mono font-bold text-xs mb-2">DEMO CREDENTIALS:</p>
            <p className="font-mono text-xs">ADMIN: admin@brutalmotors.com / admin123</p>
            <p className="font-mono text-xs">USER: user@example.com / user123</p>
            <p className="font-mono text-xs">PHONE: Any number / 123456</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
