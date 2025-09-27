import React, { useState } from 'react';
import { Crown, Shield, Star, ChevronRight, ChevronLeft, CheckCircle, User, Building, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    constituency: '',
    ministry: '',
    party: '',
    otp: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate account creation
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('loginTimestamp', Date.now().toString());
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Ministry Details', icon: Building },
    { number: 3, title: 'Verification', icon: Smartphone }
  ];

  return (
    <div className="min-h-screen bg-gradient-cream relative overflow-hidden">
      {/* Government Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-8 border-primary animate-pulse-golden"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full border-4 border-accent opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full border-6 border-primary/30"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Government Header */}
          <div className="text-center mb-4 md:mb-6 animate-fade-in">
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <div className="relative">
                <Crown className="w-10 h-10 md:w-14 md:h-14 text-primary animate-pulse-golden" />
                <Shield className="w-5 h-5 md:w-7 md:h-7 text-accent absolute -top-1 md:-top-2 -right-1 md:-right-2" />
              </div>
            </div>
            <h1 className="text-xl md:text-2xl text-gradient-golden font-bold mb-1">
              Join MinisterHub
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Official Government Registration Portal
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-4 md:mb-6 animate-slide-up">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : isActive 
                        ? 'border-primary text-primary bg-card' 
                        : 'border-muted text-muted-foreground bg-card'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-4 rounded transition-all duration-300 ${
                        isCompleted ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="card-government p-6 animate-scale-in">
            {/* Gmail Signup Button - Only show on first step */}
            {currentStep === 1 && (
              <>
                <Button className="w-full mb-4 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Gmail
                </Button>
                
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-2 text-muted-foreground">or fill out manually</span>
                  </div>
                </div>
              </>
            )}

            <h2 className="text-heading text-gradient-government font-semibold mb-4 text-center">
              {steps[currentStep - 1].title}
            </h2>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input-government"
                      placeholder="Hon. [Your Full Name]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Official Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-government"
                      placeholder="minister@gov.in"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Official Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-government"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Ministry Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="constituency" className="text-sm font-medium">Constituency</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, constituency: value })}>
                    <SelectTrigger className="input-government">
                      <SelectValue placeholder="Select your constituency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi-north">Delhi North</SelectItem>
                      <SelectItem value="mumbai-south">Mumbai South</SelectItem>
                      <SelectItem value="bangalore-central">Bangalore Central</SelectItem>
                      <SelectItem value="kolkata-east">Kolkata East</SelectItem>
                      <SelectItem value="chennai-north">Chennai North</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ministry" className="text-sm font-medium">Ministry/Department</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, ministry: value })}>
                    <SelectTrigger className="input-government">
                      <SelectValue placeholder="Select your ministry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Ministry of Health & Family Welfare</SelectItem>
                      <SelectItem value="education">Ministry of Education</SelectItem>
                      <SelectItem value="finance">Ministry of Finance</SelectItem>
                      <SelectItem value="defence">Ministry of Defence</SelectItem>
                      <SelectItem value="home">Ministry of Home Affairs</SelectItem>
                      <SelectItem value="external">Ministry of External Affairs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="party" className="text-sm font-medium">Political Party</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, party: value })}>
                    <SelectTrigger className="input-government">
                      <SelectValue placeholder="Select your political party" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bjp">Bharatiya Janata Party (BJP)</SelectItem>
                      <SelectItem value="inc">Indian National Congress (INC)</SelectItem>
                      <SelectItem value="aap">Aam Aadmi Party (AAP)</SelectItem>
                      <SelectItem value="sp">Samajwadi Party (SP)</SelectItem>
                      <SelectItem value="bsp">Bahujan Samaj Party (BSP)</SelectItem>
                      <SelectItem value="independent">Independent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: OTP Verification */}
            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We've sent a verification code to your registered phone number
                  </p>
                  <p className="font-medium text-foreground">
                    {formData.phone}
                  </p>
                </div>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={formData.otp}
                    onChange={(value) => setFormData({ ...formData, otp: value })}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <button className="text-sm text-primary hover:text-primary-dark transition-colors">
                  Resend verification code
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button onClick={handlePrevious} variant="outline" className="btn-outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <Link to="/login" className="btn-outline">
                  Back to Login
                </Link>
              )}

              {currentStep < 3 ? (
                <Button onClick={handleNext} className="btn-government">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-government">
                  <Shield className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              )}
            </div>
          </div>

          {/* Government Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground animate-fade-in">
            <p>© 2024 Government of India. All rights reserved.</p>
            <div className="flex items-center justify-center mt-2 text-accent">
              <Star className="w-4 h-4 mr-1" />
              <span>Secure Registration Process</span>
              <Star className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;