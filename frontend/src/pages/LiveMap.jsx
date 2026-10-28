// FireRescue AI - Live Monitoring Screen (CCTV AI Vision & Real-Time Alerts)
import React, { useState } from 'react';
import { Video, Plus, Radio, Shield, AlertTriangle, CheckCircle, Flame, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CameraFeed } from '../components/CameraFeed';
import { AlertCard } from '../components/AlertCard';

export const LiveMap = () => {
  const { cameras, alerts, addNewCamera } = useAuth();
  const [isAddCamOpen, setIsAddCamOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);

  // Form for adding a camera
  const [newCamName, setNewCamName] = useState('');
  const [newCamRoom, setNewCamRoom] = useState('Corridor East');

  const handleCreateCamera = (e) => {
    e.preventDefault();
    addNewCamera({
      name: newCamName || `Cam ${cameras.length + 1} - Floor 3 Wing`,
      room: newCamRoom,
      detection: 'CLEAR',
    });
    setNewCamName('');
    setIsAddCamOpen(false);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Live Monitoring</h1>
          <p className="page-subtitle">Real-time CCTV analysis with AI-based fire and smoke detection</p>
        </div>

        <button 
          onClick={() => setIsAddCamOpen(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          Add Camera
        </button>
      </div>

      {/* 2-Column Monitoring Layout */}
      <div className="monitoring-layout">
        {/* Left CCTV 2x2 Grid */}
        <div>
          <div className="cctv-grid">
            {cameras.map((cam) => (
              <CameraFeed 
                key={cam.id} 
                camera={cam} 
                onSelect={(cam) => setSelectedFeed(cam)}
              />
            ))}
          </div>

          <div style={{
            marginTop: '16px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12.5px',
            color: '#64748b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={16} color="#059669" className="animate-pulse" />
              <span>Edge AI Inference Latency: <strong>42ms</strong> (TensorFlow/YOLOv8 Hazard Model)</span>
            </div>
            <div style={{ fontWeight: '600', color: '#1e293b' }}>
              Total Feeds: {cameras.length} Active
            </div>
          </div>
        </div>

        {/* Right Panel: AI Detection Alerts */}
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header" style={{ marginBottom: '16px' }}>
            <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              AI Detection Alerts
            </h2>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 8px',
              borderRadius: '999px',
              background: '#d1fae5',
              color: '#065f46',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              Live
            </span>
          </div>

          {/* Real-Time Detection Feed Items */}
          <div className="alerts-list" style={{ overflowY: 'auto', flex: 1, maxHeight: '540px' }}>
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Add Camera Modal */}
      {isAddCamOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div style={{ padding: '16px 20px', background: '#c92a2a', color: '#fff', fontWeight: '700' }}>
              Add Optical / Thermal Stream
            </div>
            <form onSubmit={handleCreateCamera} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                  Camera Label:
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Cam 5 - Floor 2 Server Room"
                  value={newCamName}
                  onChange={(e) => setNewCamName(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                  Zone / Room:
                </label>
                <input 
                  type="text" 
                  value={newCamRoom}
                  onChange={(e) => setNewCamRoom(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setIsAddCamOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Connect Camera
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
