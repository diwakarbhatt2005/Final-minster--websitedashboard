import React, { useState } from 'react';
import { Camera, Grid, List, Plus, Edit, Trash2, Eye, Tag, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FileUpload from './FileUpload';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  tags: string[];
  url: string;
  thumbnail: string;
}

const GalleryManager = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'Community Health Camp',
      description: 'Annual health checkup camp in rural areas',
      category: 'public-engagement',
      date: '2024-01-15',
      location: 'Gram Panchayat Office, Village Rampur',
      tags: ['healthcare', 'community', 'rural'],
      url: '/api/placeholder/600/400',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Digital India Initiative Launch',
      description: 'Launch of digital literacy program',
      category: 'policy-announcement',
      date: '2024-01-20',
      location: 'New Delhi',
      tags: ['digital', 'technology', 'education'],
      url: '/api/placeholder/600/400',
      thumbnail: '/api/placeholder/300/200'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'official-events', label: 'Official Events' },
    { value: 'public-engagement', label: 'Public Engagement' },
    { value: 'policy-announcement', label: 'Policy Announcements' },
    { value: 'personal-moments', label: 'Personal Moments' }
  ];

  const handleFileUpload = (files: File[]) => {
    // Handle uploaded files
    console.log('Uploaded files:', files);
    // In a real app, you would upload these to your server
  };

  const handleDeleteItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading text-gradient-government font-semibold">Photo Gallery Management</h2>
          <p className="text-muted-foreground">Organize and manage your official photos and media</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-card border border-card-border rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-government">
                <Plus className="w-4 h-4 mr-2" />
                Add Photos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-gradient-golden">Upload New Photos</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <FileUpload
                  accept="image/*"
                  multiple={true}
                  maxSize={10}
                  onFileSelect={handleFileUpload}
                >
                  Upload photos from official events, meetings, and public engagements
                </FileUpload>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-64 input-government">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          {filteredItems.length} photos
        </div>
      </div>

      {/* Gallery Content */}
      <Tabs defaultValue="gallery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-card-border">
          <TabsTrigger value="gallery">Gallery View</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
          <TabsTrigger value="organize">Organize</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="card-government overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%236b7280">Photo</text></svg>';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="h-8 w-8 p-0 bg-white/90 text-foreground hover:bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="h-8 w-8 p-0 bg-white/90 text-foreground hover:bg-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-8 w-8 p-0 bg-red-500/90 text-white hover:bg-red-500"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                      <MapPin className="w-3 h-3 ml-3 mr-1" />
                      {item.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          +{item.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="card-government">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%236b7280">Photo</text></svg>';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.date}
                          <MapPin className="w-3 h-3 ml-4 mr-1" />
                          {item.location}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card className="card-government">
            <CardHeader>
              <CardTitle className="text-gradient-government">Bulk Photo Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                accept="image/*"
                multiple={true}
                maxSize={50}
                onFileSelect={handleFileUpload}
                className="min-h-[300px]"
              >
                <div className="text-center">
                  <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">Upload Multiple Photos</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop up to 50 photos at once, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, WebP • Maximum 50MB total
                  </p>
                </div>
              </FileUpload>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organize">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-government">
              <CardHeader>
                <CardTitle className="text-gradient-government">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full btn-outline">
                  <Tag className="w-4 h-4 mr-2" />
                  Bulk Tag Photos
                </Button>
                <Button className="w-full btn-outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Create Album
                </Button>
                <Button className="w-full btn-outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Batch Edit Metadata
                </Button>
              </CardContent>
            </Card>

            <Card className="card-government">
              <CardHeader>
                <CardTitle className="text-gradient-government">Storage Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Used Space</span>
                    <span>2.4 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Total Photos: {galleryItems.length}</p>
                  <p>Categories: {categories.length - 1}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GalleryManager;