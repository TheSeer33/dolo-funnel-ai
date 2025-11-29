import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import FunnelBuilder from './pages/FunnelBuilder';
import Analytics from './pages/Analytics';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoadingSpinner from './components/LoadingSpinner';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/builder"
        element={user ? <FunnelBuilder /> : <Navigate to="/" replace />}
      />
      <Route
        path="/analytics"
        element={user ? <Analytics /> : <Navigate to="/" replace />}
      />
      <Route
        path="/admin"
        element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <AppRoutes />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
