// FireRescue AI - Tactical System Settings Page
import React from 'react';
import { Settings as SettingsIcon, Bell, Volume2, Shield, Sliders, Database, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Settings = () => {
  const { soundEnabled, setSoundEnabled, currentUser } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure AI model sensitivity, telemetry streaming, and dispatch parameters</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Sound & Alert Configuration */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={18} color="#dc2626" />
              Auditory & Visual Alerts
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13.5px', color: '#111827' }}>Emergency Audio Sirens</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Play 880Hz tactical warning chime on critical alerts</div>
              </div>
              <input 
                type="checkbox" 
                checked={soundEnabled} 
                onChange={(e) => setSoundEnabled(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#dc2626' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13.5px', color: '#111827' }}>Flashing Screen Vignette</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Pulsing red screen border during flashover alerts</div>
              </div>
              <input 
                type="checkbox" 
                defaultChecked={true}
                style={{ width: '18px', height: '18px', accentColor: '#dc2626' }}
              />
            </label>
          </div>
        </div>

        {/* AI Model Parameters */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#2563eb" />
              AI Risk Thresholds
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Flame Confidence Floor:</span>
                <span style={{ color: '#dc2626', fontWeight: '700' }}>85%</span>
              </div>
              <input type="range" min="50" max="95" defaultValue="85" style={{ width: '100%', accentColor: '#dc2626' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Smoke Density Alert Threshold:</span>
                <span style={{ color: '#ea580c', fontWeight: '700' }}>70%</span>
              </div>
              <input type="range" min="40" max="95" defaultValue="70" style={{ width: '100%', accentColor: '#ea580c' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Optical Frame Sample Rate:</span>
                <span style={{ color: '#059669', fontWeight: '700' }}>24 FPS</span>
              </div>
              <input type="range" min="5" max="60" defaultValue="24" style={{ width: '100%', accentColor: '#059669' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
