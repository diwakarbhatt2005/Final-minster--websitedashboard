import React from 'react';
import { 
  BarChart3, MessageSquare, Users, Phone, Mail, Share2, 
  User, Upload, Settings, Crown, Shield, LogOut, X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ activeSection, onSectionChange, isOpen = false, onClose }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTimestamp');
    navigate('/login');
  };

  const analyticsItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'my-questions', label: 'My Questions', icon: MessageSquare },
    { id: 'public-inquiries', label: 'Public Inquiries', icon: Users },
    { id: 'contact-requests', label: 'Contact Requests', icon: Phone },
    { id: 'email-responses', label: 'Email Responses', icon: Mail },
    { id: 'social-media', label: 'Social Media Engagement', icon: Share2 },
  ];

  const managementItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'upload', label: 'Upload Details', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const SidebarItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const Icon = item.icon;
    
    return (
      <Button
        variant="ghost"
        onClick={() => onSectionChange(item.id)}
        className={cn(
          "w-full justify-start gap-3 py-3 px-4 rounded-lg transition-all duration-300",
          "hover:bg-primary/10 hover:text-primary hover:shadow-government",
          isActive 
            ? "bg-primary text-primary-foreground shadow-golden" 
            : "text-muted-foreground"
        )}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{item.label}</span>
      </Button>
    );
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 w-72 h-screen bg-card border-r border-card-border shadow-government flex flex-col z-40 transition-transform duration-300 ease-in-out",
      "lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Logo Section */}
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Crown className="w-8 h-8 text-primary animate-pulse-golden" />
              <Shield className="w-4 h-4 text-accent absolute -top-1 -right-1" />
            </div>
            <h1 className="text-xl font-bold text-gradient-golden">MinisterHub</h1>
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Government of India</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Analytics Section */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Analytics
          </h3>
          <div className="space-y-1">
            {analyticsItems.map((item) => (
              <SidebarItem 
                key={item.id} 
                item={item} 
                isActive={activeSection === item.id} 
              />
            ))}
          </div>
        </div>

        {/* Management Section */}
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Management
          </h3>
          <div className="space-y-1">
            {managementItems.map((item) => (
              <SidebarItem 
                key={item.id} 
                item={item} 
                isActive={activeSection === item.id} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-card-border space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            HM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Hon. Minister
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Ministry of Health
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3 py-2 px-4 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;