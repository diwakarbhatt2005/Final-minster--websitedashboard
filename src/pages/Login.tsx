import React, { useState } from 'react';
import { Eye, EyeOff, Crown, Shield, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loginTimestamp', Date.now().toString());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-cream relative overflow-hidden">
      {/* Government Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-8 border-primary animate-pulse-golden"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full border-4 border-accent opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full border-6 border-primary/30"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full border-4 border-accent/40"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-6">
        <div className="w-full max-w-xs sm:max-w-sm">
          {/* Government Header */}
          <div className="text-center mb-4 md:mb-6 animate-fade-in">
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <div className="relative">
                <Crown className="w-10 h-10 md:w-14 md:h-14 text-primary animate-pulse-golden" />
                <Shield className="w-5 h-5 md:w-7 md:h-7 text-accent absolute -top-1 md:-top-2 -right-1 md:-right-2" />
              </div>
            </div>
            <h1 className="text-xl md:text-2xl text-gradient-golden font-bold mb-1">
              MinisterHub Portal
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Government of India
            </p>
            <div className="flex items-center justify-center mt-1 text-accent">
              <Star className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">Official Government Platform</span>
              <Star className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* Login Card */}
          <div className="card-government p-3 md:p-5 animate-slide-up">
            {/* Gmail Login Button */}
            <Button className="w-full mb-4 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login with Gmail
            </Button>
            
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Official Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-government"
                  placeholder="minister@gov.in"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-government pr-12"
                    placeholder="Enter your secure password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="text-sm text-primary hover:text-primary-dark transition-colors">
                      Forgot password?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="card-government">
                    <DialogHeader>
                      <DialogTitle className="text-gradient-golden">Reset Password</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <p className="text-muted-foreground">
                        Enter your official email address and we'll send you instructions to reset your password.
                      </p>
                      <Input
                        type="email"
                        placeholder="minister@gov.in"
                        className="input-government"
                      />
                      <Button className="btn-government w-full">
                        Send Reset Instructions
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Button type="submit" className="btn-government w-full">
                <Shield className="w-5 h-5 mr-2" />
                Secure Login
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have access yet?
                </p>
                <Link 
                  to="/signup" 
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Request Access Account →
                </Link>
              </div>
            </form>
          </div>

          {/* Government Footer */}
          <div className="text-center mt-4 md:mt-6 text-xs text-muted-foreground animate-fade-in">
            <p>© 2024 Government of India. All rights reserved.</p>
            <p className="mt-1">Secure • Trusted • Transparent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;