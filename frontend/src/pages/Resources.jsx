// FireRescue AI - Tactical Resources Management Page
import React, { useState } from 'react';
import { Shield, Truck, Users, Radio, Wrench, Droplets, BatteryCharging, CheckCircle } from 'lucide-react';
import { RESOURCES_DATA } from '../services/api';

export const Resources = () => {
  const [resources, setResources] = useState(RESOURCES_DATA);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'personnel' | 'vehicles' | 'equipment'

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Resources Management</h1>
          <p className="page-subtitle">Tactical firefighter units, emergency fleet and life-safety equipment</p>
        </div>

        {/* Tab Filter */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'personnel', label: 'Firefighters' },
            { id: 'vehicles', label: 'Vehicles' },
            { id: 'equipment', label: 'Equipment' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '12.5px', padding: '6px 14px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Resource Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Personnel Section */}
        {(activeTab === 'all' || activeTab === 'personnel') && (
          <div className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#dc2626" />
                Active Firefighter Squads ({resources.firefighters.length})
              </h2>
              <span className="badge-pill badge-active">All Units Connected</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {resources.firefighters.map(f => (
                <div 
                  key={f.id}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#fee2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    👨‍🚒
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '13.5px', color: '#111827' }}>{f.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{f.unit} • {f.location}</div>
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600', marginTop: '2px' }}>
                      Status: {f.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fleet Vehicles Section */}
        {(activeTab === 'all' || activeTab === 'vehicles') && (
          <div className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="#ea580c" />
                Apparatus Fleet & Water Supply
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {resources.vehicles.map(v => (
                <div 
                  key={v.id}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>{v.name}</div>
                    <span className="badge-pill badge-low">{v.status}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Location: <strong>{v.location}</strong>
                  </div>
                  {v.water && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#0284c7' }}>
                      <Droplets size={14} /> Tank Water: <strong>{v.water} ({v.pressure})</strong>
                    </div>
                  )}
                  {v.reach && (
                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#d97706' }}>
                      Hydraulic Reach: <strong>{v.reach}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Life Safety Gear Section */}
        {(activeTab === 'all' || activeTab === 'equipment') && (
          <div className="panel-card">
            <div className="panel-header">
              <h2 className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wrench size={18} color="#0284c7" />
                Tactical Hardware & Telemetry
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {resources.equipment.map((eq, i) => (
                <div 
                  key={i}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc'
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '13px', color: '#111827' }}>{eq.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    {eq.total ? `In Inventory: ${eq.total} | Deployed: ${eq.deployed || eq.inUse}` : eq.status}
                  </div>
                  {eq.battery && (
                    <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <BatteryCharging size={13} /> Battery: {eq.battery}
                    </div>
                  )}
                  {eq.model && (
                    <div style={{ fontSize: '11.5px', color: '#0284c7', marginTop: '4px' }}>
                      Model: {eq.model} (Alt: {eq.altitude})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
