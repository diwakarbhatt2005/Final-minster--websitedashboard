import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardContent from '@/components/DashboardContent';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleSectionChange = (section: string) => {
    if (section === 'upload') {
      navigate('/upload');
    } else {
      setActiveSection(section);
    }
    // Close sidebar on mobile after selection
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-card border-b border-card-border p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gradient-golden">MinisterHub</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4 lg:p-8">
          <DashboardContent 
            activeSection={activeSection} 
            onUploadClick={handleUploadClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;