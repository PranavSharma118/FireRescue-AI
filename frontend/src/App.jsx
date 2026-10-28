// FireRescue AI - Main Application Entry & Layout Orchestrator
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { CommanderModal } from './components/CommanderModal';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LiveMap } from './pages/LiveMap';
import { BuildingMap } from './pages/BuildingMap';
import { FireAnalysis } from './pages/FireAnalysis';
import { RescuePriority } from './pages/RescuePriority';
import { Incident } from './pages/Incident';
import { Resources } from './pages/Resources';
import { Settings } from './pages/Settings';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isCommanderModalOpen, setIsCommanderModalOpen] = useState(false);

  // If unauthenticated, display Login screen
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app-container">
      {/* Tactical Wine/Crimson Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />

      {/* Main Dynamic Viewport */}
      <div className="main-wrapper">
        <Navbar 
          onOpenCommanderModal={() => setIsCommanderModalOpen(true)} 
        />

        <main style={{ flex: 1 }}>
          {activePage === 'dashboard' && (
            <Dashboard 
              onNavigateToIncident={(page) => setActivePage(page)} 
            />
          )}

          {activePage === 'monitoring' && (
            <LiveMap />
          )}

          {activePage === 'map' && (
            <BuildingMap />
          )}

          {activePage === 'analysis' && (
            <FireAnalysis 
              onOpenCommanderModal={() => setIsCommanderModalOpen(true)} 
            />
          )}

          {activePage === 'evacuation' && (
            <RescuePriority />
          )}

          {activePage === 'incidents' && (
            <Incident 
              onBackToList={() => setActivePage('dashboard')} 
            />
          )}

          {activePage === 'resources' && (
            <Resources />
          )}

          {activePage === 'settings' && (
            <Settings />
          )}
        </main>
      </div>

      {/* Incident Commander View & Final Decision Action Modal */}
      <CommanderModal 
        isOpen={isCommanderModalOpen} 
        onClose={() => setIsCommanderModalOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
