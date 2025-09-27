import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadDetails from "./pages/UploadDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check if user is authenticated with additional validation
const checkAuthentication = () => {
  try {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    // If no timestamp, clear authentication
    if (isAuthenticated && !loginTimestamp) {
      localStorage.removeItem('isAuthenticated');
      return false;
    }
    
    // Mobile-specific shorter session timeout
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isAuthenticated && loginTimestamp) {
      const loginTime = parseInt(loginTimestamp);
      const currentTime = Date.now();
      
      // Shorter timeout for mobile devices
      const timeoutDuration = (isMobile || isSmallScreen) ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 1 hour vs 24 hours
      
      if (isNaN(loginTime) || currentTime - loginTime > timeoutDuration) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('loginTimestamp');
        return false;
      }
    }
    
    return isAuthenticated;
  } catch (error) {
    // If localStorage fails (like in incognito mode), return false
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTimestamp');
    } catch (e) {
      // Ignore cleanup errors
    }
    return false;
  }
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = checkAuthentication();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  // Additional mobile check before authentication
  React.useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
      // For mobile, be extra strict about clearing auth on route access
      const hasValidSession = () => {
        const auth = localStorage.getItem('isAuthenticated');
        const timestamp = localStorage.getItem('loginTimestamp');
        
        if (auth === 'true' && timestamp) {
          const loginTime = parseInt(timestamp);
          const currentTime = Date.now();
          const fiveMinutes = 5 * 60 * 1000; // Very short for mobile debugging
          
          return !isNaN(loginTime) && (currentTime - loginTime) < fiveMinutes;
        }
        return false;
      };
      
      if (!hasValidSession()) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('loginTimestamp');
      }
    }
  }, []);
  
  const isAuthenticated = checkAuthentication();
  
  // Debug: check URL params to force login
  const urlParams = new URLSearchParams(window.location.search);
  const forceLogin = urlParams.get('force') === 'login';
  
  if (forceLogin) {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTimestamp');
    return <>{children}</>;
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const App = () => {
  // Clear stale authentication on app load if needed
  React.useEffect(() => {
    try {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      
      // More aggressive clearing for mobile devices
      if (isMobile || isSmallScreen) {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        
        // For mobile, always check timestamp validity more strictly
        if (isAuthenticated === 'true') {
          if (!loginTimestamp) {
            // No timestamp means old auth, clear it
            localStorage.removeItem('isAuthenticated');
          } else {
            const loginTime = parseInt(loginTimestamp);
            const currentTime = Date.now();
            const oneHour = 60 * 60 * 1000; // 1 hour for mobile
            
            // Shorter session for mobile devices
            if (isNaN(loginTime) || currentTime - loginTime > oneHour) {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('loginTimestamp');
            }
          }
        }
        
        // If coming from external link on mobile, force login
        if (window.location.pathname === '/' && document.referrer === '') {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('loginTimestamp');
        }
      } else {
        // Desktop logic (less aggressive)
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        
        if (isAuthenticated === 'true' && !loginTimestamp) {
          localStorage.removeItem('isAuthenticated');
        }
      }
      
      sessionStorage.setItem('authCheckRun', 'true');
    } catch (error) {
      // If localStorage fails, clear everything
      try {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('loginTimestamp');
      } catch (e) {
        console.warn('Failed to clear localStorage');
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute>
                <UploadDetails />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback Routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
