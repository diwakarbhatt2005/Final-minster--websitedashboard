import React, { useState } from 'react';
import { 
  Crown, Shield, ArrowLeft, Save, Eye, Calendar, Upload,
  User, Image, FileText, Briefcase, Camera, FolderOpen,
  CheckCircle, AlertCircle, Plus, X, Edit, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';
import { Badge } from '@/components/ui/badge';
import FileUpload from '@/components/FileUpload';
import GalleryManager from '@/components/GalleryManager';
import ContentManager from '@/components/ContentManager';

const UploadDetails = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Hon. Rajesh Kumar',
    party: 'Bharatiya Janata Party',
    tagline: 'Serving the Nation with Dedication',
    email: 'rajesh.kumar@gov.in',
    phone: '+91 98765 43210',
    constituency: 'Delhi North',
    portfolio: 'Health & Family Welfare',
    address: 'Ministry of Health, Nirman Bhavan, New Delhi',
    bannerUrl: '',
    logoUrl: '',
    biography: '',
    socialMedia: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  const [initiatives, setInitiatives] = useState([
    {
      id: 1,
      title: 'Digital Health Initiative',
      description: 'Implementing digital health records across all government hospitals',
      category: 'Healthcare',
      status: 'In Progress',
      progress: 75,
      budget: '₹50 Crores',
      startDate: '2024-01-15',
      endDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Rural Telemedicine Program',
      description: 'Connecting rural areas with specialized doctors through telemedicine',
      category: 'Healthcare',
      status: 'Planning',
      progress: 25,
      budget: '₹25 Crores',
      startDate: '2024-03-01',
      endDate: '2025-02-28'
    }
  ]);

  const tabItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'visual', label: 'Visual Assets', icon: Image },
    { id: 'about', label: 'About Us', icon: FileText },
    { id: 'initiatives', label: 'Initiatives', icon: Briefcase },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'content', label: 'Content Management', icon: FolderOpen }
  ];

  const handleSave = () => {
    console.log('Saving data...', formData);
    // Here you would save the data
  };

  const handlePublish = () => {
    console.log('Publishing...', formData);
    // Here you would publish the content
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Minister Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-government"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="party" className="text-sm font-medium">Political Party</Label>
          <Combobox
            options={[
              { value: "Bharatiya Janata Party", label: "Bharatiya Janata Party (BJP)" },
              { value: "Indian National Congress", label: "Indian National Congress (INC)" },
              { value: "Aam Aadmi Party", label: "Aam Aadmi Party (AAP)" },
              { value: "Bahujan Samaj Party", label: "Bahujan Samaj Party (BSP)" },
              { value: "Communist Party of India", label: "Communist Party of India (CPI)" },
              { value: "Trinamool Congress", label: "All India Trinamool Congress (AITC)" },
              { value: "Dravida Munnetra Kazhagam", label: "Dravida Munnetra Kazhagam (DMK)" },
              { value: "Shiv Sena", label: "Shiv Sena" },
              { value: "Nationalist Congress Party", label: "Nationalist Congress Party (NCP)" },
              { value: "Janata Dal United", label: "Janata Dal (United)" }
            ]}
            value={formData.party}
            onValueChange={(value) => setFormData({ ...formData, party: value })}
            placeholder="Select or type political party..."
            searchPlaceholder="Search political parties..."
            allowCustomValues={true}
            emptyMessage="No political party found. You can add a custom one."
            className="input-government"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline" className="text-sm font-medium">Tagline/Slogan</Label>
        <Input
          id="tagline"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          className="input-government"
          placeholder="Your inspiring tagline"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Contact Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-government"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input-government"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="space-y-2">
          <Label htmlFor="constituency" className="text-sm font-medium">Constituency</Label>
          <Combobox
            options={[
              { value: "Delhi North", label: "Delhi North" },
              { value: "Delhi South", label: "Delhi South" },
              { value: "Mumbai North", label: "Mumbai North" },
              { value: "Mumbai South", label: "Mumbai South" },
              { value: "Chennai North", label: "Chennai North" },
              { value: "Chennai South", label: "Chennai South" },
              { value: "Kolkata North", label: "Kolkata North" },
              { value: "Kolkata South", label: "Kolkata South" },
              { value: "Bangalore North", label: "Bangalore North" },
              { value: "Bangalore South", label: "Bangalore South" },
              { value: "Hyderabad", label: "Hyderabad" },
              { value: "Pune", label: "Pune" }
            ]}
            value={formData.constituency}
            onValueChange={(value) => setFormData({ ...formData, constituency: value })}
            placeholder="Select or type constituency..."
            searchPlaceholder="Search constituencies..."
            allowCustomValues={true}
            emptyMessage="No constituency found. You can add a custom one."
            className="input-government"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio" className="text-sm font-medium">Portfolio/Ministry</Label>
          <Combobox
            options={[
              { value: "Health & Family Welfare", label: "Ministry of Health & Family Welfare" },
              { value: "Education", label: "Ministry of Education" },
              { value: "Finance", label: "Ministry of Finance" },
              { value: "Home Affairs", label: "Ministry of Home Affairs" },
              { value: "External Affairs", label: "Ministry of External Affairs" },
              { value: "Defence", label: "Ministry of Defence" },
              { value: "Railways", label: "Ministry of Railways" },
              { value: "Information Technology", label: "Ministry of Electronics & Information Technology" },
              { value: "Agriculture", label: "Ministry of Agriculture & Farmers Welfare" },
              { value: "Commerce & Industry", label: "Ministry of Commerce & Industry" },
              { value: "Environment", label: "Ministry of Environment, Forest & Climate Change" },
              { value: "Rural Development", label: "Ministry of Rural Development" }
            ]}
            value={formData.portfolio}
            onValueChange={(value) => setFormData({ ...formData, portfolio: value })}
            placeholder="Select or type portfolio/ministry..."
            searchPlaceholder="Search ministries..."
            allowCustomValues={true}
            emptyMessage="No ministry found. You can add a custom one."
            className="input-government"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">Office Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="input-government"
          rows={3}
        />
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gradient-government">Social Media Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(formData.socialMedia).map(([platform, url]) => (
            <div key={platform} className="space-y-2">
              <Label className="text-sm font-medium capitalize">{platform}</Label>
              <Input
                value={url}
                onChange={(e) => setFormData({
                  ...formData,
                  socialMedia: { ...formData.socialMedia, [platform]: e.target.value }
                })}
                className="input-government"
                placeholder={`Your ${platform} profile URL`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVisualTab = () => (
    <div className="space-y-8">
      {/* Banner Management */}
      <Card className="card-government">
        <CardHeader>
          <CardTitle className="text-gradient-government flex items-center gap-2">
            <Image className="w-5 h-5" />
            Banner Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bannerUrl" className="text-sm font-medium">Banner URL</Label>
            <Input
              id="bannerUrl"
              value={formData.bannerUrl}
              onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
              className="input-government"
              placeholder="https://example.com/banner.jpg"
            />
          </div>
          <FileUpload
            accept="image/*"
            maxSize={10}
            onFileSelect={(files) => {
              if (files.length > 0) {
                const file = files[0];
                const url = URL.createObjectURL(file);
                setFormData({ ...formData, bannerUrl: url });
              }
            }}
          >
            Recommended size: 1920x600px (PNG, JPG, WebP)
          </FileUpload>
          {formData.bannerUrl && (
            <div className="rounded-lg overflow-hidden border border-card-border">
              <img 
                src={formData.bannerUrl} 
                alt="Banner Preview" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%236b7280">Banner Preview</text></svg>';
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logo Management */}
      <Card className="card-government">
        <CardHeader>
          <CardTitle className="text-gradient-government flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Logo Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoUrl" className="text-sm font-medium">Logo URL</Label>
            <Input
              id="logoUrl"
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              className="input-government"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FileUpload
              accept="image/*"
              maxSize={5}
              onFileSelect={(files) => {
                if (files.length > 0) {
                  const file = files[0];
                  const url = URL.createObjectURL(file);
                  setFormData({ ...formData, logoUrl: url });
                }
              }}
            >
              <div className="text-center">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">Upload Logo</p>
                <p className="text-xs text-muted-foreground">
                  Recommended: 200x200px (PNG with transparency)
                </p>
              </div>
            </FileUpload>
            {formData.logoUrl && (
              <div className="flex items-center justify-center border border-card-border rounded-lg p-4 sm:p-6 bg-card">
                <img 
                  src={formData.logoUrl} 
                  alt="Logo Preview" 
                  className="max-w-full max-h-24 sm:max-h-32 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%236b7280">Logo</text></svg>';
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInitiativesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg sm:text-heading text-gradient-government font-semibold">Policy Initiatives</h3>
        <Button className="btn-government w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Add Initiative</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <div className="grid gap-6">
        {initiatives.map((initiative) => (
          <Card key={initiative.id} className="card-government">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-base sm:text-lg">{initiative.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{initiative.description}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <Badge variant={initiative.status === 'In Progress' ? 'default' : 'secondary'} className="text-xs">
                    {initiative.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Category</Label>
                  <p className="font-medium">{initiative.category}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Budget</Label>
                  <p className="font-medium">{initiative.budget}</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label className="text-sm text-muted-foreground">Timeline</Label>
                  <p className="font-medium text-sm">{initiative.startDate} to {initiative.endDate}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Progress</Label>
                  <span className="text-sm font-medium">{initiative.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-cream pb-32 sm:pb-24 overflow-x-hidden">
      <div className="p-3 sm:p-6 max-w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link to="/dashboard" className="btn-outline self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-title text-gradient-golden font-bold">
                Upload & Content Management
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your profile, content, and public information
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start lg:self-center">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto">
          <Link to="/dashboard" className="hover:text-primary transition-colors whitespace-nowrap">Dashboard</Link>
          <span>→</span>
          <span className="whitespace-nowrap">Upload Details</span>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Mobile Tabs - Improved Grid Layout */}
          <div className="block sm:hidden">
            <TabsList className="w-full bg-card border border-card-border rounded-lg p-1">
              <div className="grid grid-cols-3 gap-1 w-full">
                {tabItems.slice(0, 3).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-1 py-2 text-[10px] sm:text-xs min-h-[50px] max-w-full overflow-hidden"
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs leading-tight text-center truncate w-full">{tab.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-1 w-full mt-1">
                {tabItems.slice(3, 6).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex flex-col items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-1 py-2 text-[10px] sm:text-xs min-h-[50px] max-w-full overflow-hidden"
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs leading-tight text-center truncate w-full">{tab.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </div>
            </TabsList>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:block">
            <TabsList className="grid w-full grid-cols-6 bg-card border border-card-border rounded-lg p-1">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 py-2 text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{tab.label}</span>
                    <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="card-government p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <TabsContent value="profile" className="mt-0 space-y-4 sm:space-y-6">
              {renderProfileTab()}
            </TabsContent>

            <TabsContent value="visual" className="mt-0 space-y-4 sm:space-y-6">
              {renderVisualTab()}
            </TabsContent>

            <TabsContent value="about" className="mt-0 space-y-4 sm:space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="biography" className="text-sm font-medium">Biography</Label>
                  <Textarea
                    id="biography"
                    value={formData.biography}
                    onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                    className="input-government min-h-[150px] sm:min-h-[200px]"
                    placeholder="Write your detailed biography, education, career history, and achievements..."
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="initiatives" className="mt-0 space-y-4 sm:space-y-6">
              {renderInitiativesTab()}
            </TabsContent>

            <TabsContent value="gallery" className="mt-0 space-y-4 sm:space-y-6">
              <GalleryManager />
            </TabsContent>

            <TabsContent value="content" className="mt-0 space-y-4 sm:space-y-6">
              <ContentManager />
            </TabsContent>
          </div>
        </Tabs>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-gradient-cream border-t border-card-border p-4 -mx-3 sm:-mx-6 mt-6 sm:mt-8">
          <div className="flex flex-col gap-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Auto-saved 30 seconds ago
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={handleSave} variant="outline" className="btn-outline w-full sm:flex-1">
                <Save className="w-4 h-4 mr-2" />
                <span>Save as Draft</span>
              </Button>
              <Button className="btn-secondary w-full sm:flex-1">
                <Eye className="w-4 h-4 mr-2" />
                <span>Preview Changes</span>
              </Button>
              <Button onClick={handlePublish} className="btn-government w-full sm:flex-1">
                <Globe className="w-4 h-4 mr-2" />
                <span>Publish Live</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDetails;