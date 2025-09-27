import React, { useState } from 'react';
import { 
  FileText, Video, Headphones, Upload, Plus, Edit, Trash2, Eye,
  Calendar, User, Download, Share, FolderOpen, File, 
  FileImage, FileVideo, Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FileUpload from './FileUpload';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'audio' | 'image';
  category: string;
  size: string;
  uploadDate: string;
  author: string;
  url: string;
  status: 'draft' | 'published' | 'archived';
}

const ContentManager = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Digital Health Policy 2024',
      description: 'Comprehensive policy document for digital health initiatives',
      type: 'document',
      category: 'policy',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      author: 'Policy Team',
      url: '/documents/digital-health-policy.pdf',
      status: 'published'
    },
    {
      id: '2',
      title: 'Town Hall Meeting - Education Reform',
      description: 'Recording of public consultation on education reforms',
      type: 'video',
      category: 'public-engagement',
      size: '156 MB',
      uploadDate: '2024-01-18',
      author: 'Media Team',
      url: '/videos/town-hall-education.mp4',
      status: 'published'
    },
    {
      id: '3',
      title: 'Press Conference Audio',
      description: 'Audio recording of press conference on healthcare initiatives',
      type: 'audio',
      category: 'media',
      size: '23 MB',
      uploadDate: '2024-01-20',
      author: 'Communications Team',
      url: '/audio/press-conference.mp3',
      status: 'published'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'policy', label: 'Policy Documents' },
    { value: 'press-releases', label: 'Press Releases' },
    { value: 'reports', label: 'Reports & Analytics' },
    { value: 'public-engagement', label: 'Public Engagement' },
    { value: 'media', label: 'Media Content' }
  ];

  const contentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'document', label: 'Documents' },
    { value: 'video', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'image', label: 'Images' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-8 h-8 text-red-500" />;
      case 'video': return <FileVideo className="w-8 h-8 text-blue-500" />;
      case 'audio': return <Headphones className="w-8 h-8 text-green-500" />;
      case 'image': return <FileImage className="w-8 h-8 text-purple-500" />;
      default: return <File className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const handleFileUpload = (files: File[], category: string) => {
    console.log('Uploading files:', files, 'to category:', category);
    // Handle file upload logic here
  };

  const handleDeleteItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = contentItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-heading text-gradient-government font-semibold">Content Management System</h2>
          <p className="text-muted-foreground">Manage documents, media, and official content</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn-government">
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-gradient-golden">Upload New Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label>Content Category</Label>
                <Select>
                  <SelectTrigger className="input-government">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FileUpload
                accept="*"
                multiple={true}
                maxSize={100}
                onFileSelect={(files) => handleFileUpload(files, 'general')}
              >
                Upload documents, videos, audio files, or any other content
              </FileUpload>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48 input-government">
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
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48 input-government">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground ml-auto">
          {filteredItems.length} items
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card border border-card-border">
          <TabsTrigger value="content">Content Library</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="media">Media Files</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="card-government">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getFileIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'published' ? 'bg-success/10 text-success' :
                          item.status === 'draft' ? 'bg-warning/10 text-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 truncate">{item.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.uploadDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.author}
                        </span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" title="Preview">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Download">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Share">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        title="Delete"
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
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="card-government lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-gradient-government">Document Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  multiple={true}
                  maxSize={25}
                  onFileSelect={(files) => handleFileUpload(files, 'documents')}
                >
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">Upload Documents</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, Word, Text files • Maximum 25MB each
                    </p>
                  </div>
                </FileUpload>
              </CardContent>
            </Card>

            <Card className="card-government">
              <CardHeader>
                <CardTitle className="text-gradient-government">Quick Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-outline justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Press Release
                </Button>
                <Button className="w-full btn-outline justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Policy Brief
                </Button>
                <Button className="w-full btn-outline justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Public Notice
                </Button>
                <Button className="w-full btn-outline justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Meeting Minutes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-government">
              <CardHeader>
                <CardTitle className="text-gradient-government">Video Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept="video/*"
                  multiple={true}
                  maxSize={500}
                  onFileSelect={(files) => handleFileUpload(files, 'videos')}
                >
                  <div className="text-center">
                    <Video className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">Upload Videos</p>
                    <p className="text-sm text-muted-foreground">
                      MP4, MOV, AVI files • Maximum 500MB each
                    </p>
                  </div>
                </FileUpload>
              </CardContent>
            </Card>

            <Card className="card-government">
              <CardHeader>
                <CardTitle className="text-gradient-government">Audio Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept="audio/*"
                  multiple={true}
                  maxSize={100}
                  onFileSelect={(files) => handleFileUpload(files, 'audio')}
                >
                  <div className="text-center">
                    <Headphones className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">Upload Audio</p>
                    <p className="text-sm text-muted-foreground">
                      MP3, WAV, AAC files • Maximum 100MB each
                    </p>
                  </div>
                </FileUpload>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Press Release Template', desc: 'Standard format for press releases', icon: FileText },
              { title: 'Policy Document Template', desc: 'Structured policy documentation', icon: FileText },
              { title: 'Public Notice Template', desc: 'Official public announcements', icon: File },
              { title: 'Meeting Minutes Template', desc: 'Standard meeting documentation', icon: Database },
              { title: 'Report Template', desc: 'Analytics and progress reports', icon: FileText },
              { title: 'Letter Template', desc: 'Official correspondence format', icon: File }
            ].map((template, index) => (
              <Card key={index} className="card-government cursor-pointer hover:shadow-golden transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <template.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.desc}</p>
                  <Button className="btn-outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;