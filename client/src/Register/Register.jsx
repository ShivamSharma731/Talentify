import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, Lock, User, ArrowRight, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? `${import.meta.env.VITE_BASE_URL}/api/v1/login`
      : `${import.meta.env.VITE_BASE_URL}/api/v1/signup`;

    const payload = isLogin
      ? { email, password }
      : { 
          email,
          password,
          username: name,
          phoneno: phoneNo,
        };

    try {
      const response = await axios.post(endpoint, payload);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('jwt', token);
        toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
        navigate('/');
        setTimeout(() => window.location.reload(), 500); // Slight delay for toast to display
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast.error('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 bg-purple-600 p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-6">Talentify</h1>
            <p className="text-purple-100 text-lg mb-8">
              Connect with the world's best talents and opportunities
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Access to top global talents</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Smart matching algorithm</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="w-5 h-5" />
                <span>Secure and reliable platform</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full -mr-32 -mt-32 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-700 rounded-full -ml-24 -mb-24 opacity-50" />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? 'Log in to access your account'
                  : 'Join us and start your journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
