import React, { useState } from 'react';
import { 
  MessageSquare, Clock, ThumbsUp, TrendingUp, 
  Filter, Search, Upload, Bell, Calendar,
  Users, Phone, Mail, Share2, User, Settings,
  BarChart, PieChart, LineChart, MapPin,
  Heart, GraduationCap, Building, Briefcase, Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from 'recharts';

interface DashboardContentProps {
  activeSection: string;
  onUploadClick: () => void;
}

const DashboardContent = ({ activeSection, onUploadClick }: DashboardContentProps) => {
  const [timeFilter, setTimeFilter] = useState('weekly');

  // Sample data for charts
  const questionTrends = [
    { name: 'Mon', incoming: 45, outgoing: 42 },
    { name: 'Tue', incoming: 52, outgoing: 48 },
    { name: 'Wed', incoming: 38, outgoing: 40 },
    { name: 'Thu', incoming: 65, outgoing: 58 },
    { name: 'Fri', incoming: 48, outgoing: 52 },
    { name: 'Sat', incoming: 32, outgoing: 35 },
    { name: 'Sun', incoming: 28, outgoing: 30 },
  ];

  const issueData = [
    { name: 'Healthcare', value: 35, color: '#FFD700', issues: 245 },
    { name: 'Education', value: 28, color: '#4F46E5', issues: 196 },
    { name: 'Infrastructure', value: 18, color: '#10B981', issues: 126 },
    { name: 'Employment', value: 12, color: '#F59E0B', issues: 84 },
    { name: 'Environment', value: 7, color: '#06B6D4', issues: 49 },
  ];

  const sentimentData = [
    { name: 'Positive', value: 58, color: '#10B981' },
    { name: 'Neutral', value: 28, color: '#6B7280' },
    { name: 'Negative', value: 14, color: '#EF4444' },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-hero text-gradient-golden font-bold animate-fade-in">
            Minister Dashboard
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mt-2">
            Unified Public Engagement Analytics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full sm:w-40 input-government">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Last 1 Hour</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search analytics..." 
              className="input-government pl-10 w-full sm:w-64"
            />
          </div>
          <Button onClick={onUploadClick} className="btn-government w-full sm:w-auto">
            <Upload className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Upload Details</span>
            <span className="sm:hidden">Upload</span>
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-analytics cursor-pointer group">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Questions</p>
                <p className="text-xl md:text-2xl font-bold text-primary">1,247</p>
                <p className="text-xs text-muted-foreground mt-1">Across all channels</p>
              </div>
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:animate-pulse-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-analytics cursor-pointer group">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                <p className="text-xl md:text-2xl font-bold text-primary">2.4h</p>
                <p className="text-xs text-muted-foreground mt-1">Combined average</p>
              </div>
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:animate-pulse-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-analytics cursor-pointer group">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction Score</p>
                <p className="text-xl md:text-2xl font-bold text-success">87%</p>
                <p className="text-xs text-muted-foreground mt-1">Overall public satisfaction</p>
              </div>
              <ThumbsUp className="w-6 h-6 md:w-8 md:h-8 text-success group-hover:animate-pulse-golden" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-analytics cursor-pointer group">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estimated Impact</p>
                <p className="text-xl md:text-2xl font-bold text-primary">₹2.4Cr</p>
                <p className="text-xs text-muted-foreground mt-1">Compared to traditional methods</p>
              </div>
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:animate-pulse-golden" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Response Trends */}
        <Card className="card-government col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gradient-government">Question Response Trends</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm">Incoming Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Outgoing Responses</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsLineChart data={questionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid hsl(45 100% 65%)',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="incoming" 
                  stroke="#FFD700" 
                  strokeWidth={3}
                  dot={{ fill: '#FFD700', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="outgoing" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  dot={{ fill: '#4F46E5', strokeWidth: 2, r: 6 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Public Issues Analytics */}
        <Card className="card-government">
          <CardHeader>
            <CardTitle className="text-gradient-government">Top Public Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issueData.map((issue, index) => {
                const icons = {
                  'Healthcare': Heart,
                  'Education': GraduationCap,
                  'Infrastructure': Building,
                  'Employment': Briefcase,
                  'Environment': Leaf
                };
                const Icon = icons[issue.name as keyof typeof icons];
                
                return (
                  <div key={issue.name} className="flex items-center gap-4">
                    <Icon className="w-5 h-5" style={{ color: issue.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{issue.name}</span>
                        <span className="text-sm text-muted-foreground">{issue.issues} questions</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000" 
                          style={{ 
                            width: `${issue.value}%`, 
                            backgroundColor: issue.color 
                          }}
                        />
                      </div>
                    </div>
                    <span className="font-semibold text-sm">{issue.value}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="card-government">
          <CardHeader>
            <CardTitle className="text-gradient-government">Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSection = (title: string, icon: any) => {
    const Icon = icon;
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <h1 className="text-xl md:text-title text-gradient-golden font-bold">{title}</h1>
        </div>
        <Card className="card-government">
          <CardContent className="p-6 md:p-8">
            <div className="text-center">
              <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
              <h2 className="text-lg md:text-heading font-semibold mb-2">{title}</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                This section is under development. Advanced {title.toLowerCase()} features will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  switch (activeSection) {
    case 'dashboard':
      return renderDashboard();
    case 'my-questions':
      return renderSection('My Questions', MessageSquare);
    case 'public-inquiries':
      return renderSection('Public Inquiries', Users);
    case 'contact-requests':
      return renderSection('Contact Requests', Phone);
    case 'email-responses':
      return renderSection('Email Responses', Mail);
    case 'social-media':
      return renderSection('Social Media Engagement', Share2);
    case 'profile':
      return renderSection('My Profile', User);
    case 'settings':
      return renderSection('Settings', Settings);
    default:
      return renderDashboard();
  }
};

export default DashboardContent;