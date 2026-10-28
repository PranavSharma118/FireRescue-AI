// FireRescue AI - Left Sidebar Navigation Component
import React from 'react';
import { 
  Flame, 
  LayoutDashboard, 
  Video, 
  Map, 
  Cpu, 
  Footprints, 
  FileText, 
  ShieldAlert, 
  Settings, 
  UserCheck,
  LogOut,
  Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activePage, setActivePage }) => {
  const { currentUser, toggleRole, logout, alerts } = useAuth();

  const criticalAlertsCount = alerts.filter(a => a.type === 'critical').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Live Monitoring', icon: Video, badge: 'Live', badgeType: 'danger' },
    { id: 'map', label: 'Building Map', icon: Map },
    { id: 'analysis', label: 'AI Analysis', icon: Cpu },
    { id: 'evacuation', label: 'Evacuation Plan', icon: Footprints },
    { id: 'incidents', label: 'Reports', icon: FileText },
    { id: 'resources', label: 'Resources', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-icon-box" title="FireResQ AI Tactical System">
          <img 
            src="/logo-shield.png" 
            alt="FireResQ AI Logo" 
            className="brand-logo-img" 
          />
        </div>
        <div className="brand-text-wrapper">
          <h1 className="brand-text-title">
            FireRes<span className="brand-highlight">Q</span> AI
          </h1>
          <p className="brand-text-sub">AI-Powered Fire Response & Evacuation</p>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`nav-link ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`nav-badge ${item.badgeType || ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with Commander Switch and Status */}
      <div className="sidebar-footer">
        <div className="commander-switch-box" onClick={toggleRole} title="Click to toggle tactical role">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={16} color="#ef4444" className="animate-pulse" />
            <div>
              <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: '600', textTransform: 'uppercase' }}>
                Mode: {currentUser.role}
              </div>
              <div style={{ fontSize: '10px', color: '#fda4af' }}>
                Tap to toggle role
              </div>
            </div>
          </div>
          <UserCheck size={16} color="#ffffff" />
        </div>

        <button 
          onClick={logout} 
          style={{
            marginTop: '10px',
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: '#fecdd3',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '6px'
          }}
        >
          <LogOut size={14} />
          Sign Out / Lock Console
        </button>
      </div>
    </aside>
  );
};
