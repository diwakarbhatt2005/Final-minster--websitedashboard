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

// Simplified authentication check
const checkAuthentication = () => {
  try {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    if (!isAuthenticated || !loginTimestamp) {
      return false;
    }
    
    const loginTime = parseInt(loginTimestamp);
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    // Check if session has expired
    if (isNaN(loginTime) || currentTime - loginTime > twentyFourHours) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTimestamp');
      return false;
    }
    
    return true;
  } catch (error) {
    // Clear auth on any error
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTimestamp');
    } catch (e) {
      // Ignore cleanup errors
    }
    return false;
  }
};

// Protected Route Component - requires authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = checkAuthentication();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component - for login/signup pages
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = checkAuthentication();
  // If already authenticated, redirect to dashboard
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Root route redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public Routes */}
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
