// FireRescue AI - Top Navbar Component
import React, { useState } from 'react';
import { Search, Bell, User, Shield, Volume2, VolumeX, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenCommanderModal }) => {
  const { 
    currentUser, 
    alerts, 
    soundEnabled, 
    setSoundEnabled, 
    toggleRole,
    finalDecision
  } = useAuth();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadAlertsCount = alerts.length;

  return (
    <header className="top-navbar">
      {/* Search Input Bar */}
      <div className="nav-search-bar">
        <Search size={18} color="#9ca3af" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search building, incident, or location..." 
        />
      </div>

      {/* Right Controls */}
      <div className="navbar-actions">
        {/* Tactical Audio Toggle */}
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)} 
          title={soundEnabled ? 'Mute emergency sirens' : 'Enable emergency siren sound'}
          style={{
            background: '#f8f9fa',
            border: '1px solid #e5e7eb',
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: soundEnabled ? '#dc2626' : '#9ca3af'
          }}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Commander Decision Quick Trigger */}
        <button 
          onClick={onOpenCommanderModal} 
          className="btn-primary"
          style={{
            fontSize: '12px',
            padding: '7px 14px',
            background: finalDecision.approved ? '#059669' : '#1e293b',
            boxShadow: 'none'
          }}
        >
          <Shield size={14} />
          {finalDecision.approved ? 'Decision Executed' : 'Commander View'}
        </button>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            className="notif-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Emergency Alert Center"
          >
            <Bell size={20} />
            {unreadAlertsCount > 0 && (
              <span className="notif-count-badge">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '340px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                zIndex: 60,
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#1f2937' }}>
                  Live Tactical Alerts ({alerts.length})
                </div>
                <span style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                  Critical Stream
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {alerts.map((alt) => (
                  <div 
                    key={alt.id}
                    style={{
                      padding: '10px',
                      background: alt.type === 'critical' ? '#fef2f2' : '#f8fafc',
                      borderLeft: `3px solid ${alt.type === 'critical' ? '#ef4444' : '#10b981'}`,
                      borderRadius: '6px',
                      fontSize: '12.5px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#111827' }}>
                      <span>{alt.title}</span>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>{alt.time}</span>
                    </div>
                    <div style={{ color: '#4b5563', fontSize: '11.5px', marginTop: '2px' }}>
                      {alt.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar and Menu */}
        <div style={{ position: 'relative' }}>
          <div 
            className="user-profile-widget"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar-circle">
              <User size={20} />
            </div>
            <div className="user-info-text">
              <span className="user-name-title">{currentUser.name}</span>
              <span className="user-dept-sub">{currentUser.subtitle}</span>
            </div>
          </div>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '240px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                zIndex: 60,
                padding: '14px',
              }}
            >
              <div style={{ borderBottom: '1px solid #f1f3f5', paddingBottom: '10px', marginBottom: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1f2937' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>
                  {currentUser.role}
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                  {currentUser.station}
                </div>
              </div>

              <button 
                onClick={() => {
                  toggleRole();
                  setShowUserMenu(false);
                }}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Shield size={14} color="#dc2626" />
                Toggle: {currentUser.role === 'Incident Commander' ? 'Switch to Firefighter' : 'Switch to Commander'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
