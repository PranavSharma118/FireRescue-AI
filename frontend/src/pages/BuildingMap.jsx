// FireRescue AI - Building Map Page
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FireMap } from '../components/FireMap';
import { Box, Layers, ShieldCheck, Flame, Compass, Maximize2 } from 'lucide-react';

export const BuildingMap = () => {
  const { 
    selectedBuilding, 
    setSelectedBuilding, 
    selectedFloor, 
    setSelectedFloor 
  } = useAuth();

  const [is3DMode, setIs3DMode] = useState(false);

  const buildings = ['Academic Block', 'Hostel Block', 'Admin Block', 'Library Complex'];
  const floors = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'];

  return (
    <div className="page-container">
      {/* Header and Controls Row */}
      <div className="page-header" style={{ marginBottom: '14px' }}>
        <div>
          <h1 className="page-title">Building Map</h1>
          <p className="page-subtitle">Live fire location, spread prediction and recommended routes</p>
        </div>

        {/* Building & Floor Selectors */}
        <div className="map-controls-row" style={{ margin: 0 }}>
          <select 
            value={selectedBuilding} 
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="select-filter"
          >
            {buildings.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select 
            value={selectedFloor} 
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="select-filter"
          >
            {floors.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Component or 3D Structural View */}
      {!is3DMode ? (
        <FireMap is3DView={is3DMode} onToggle3D={() => setIs3DMode(true)} />
      ) : (
        /* 3D Model Viewer simulation matching modern CAD/BIM model */
        <div className="panel-card" style={{ minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                BIM / 3D Digital Twin - {selectedBuilding}
              </h3>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                Spatial heat dissipation and multi-level vertical escape conduits
              </p>
            </div>
            <button onClick={() => setIs3DMode(false)} className="btn-secondary">
              Back to 2D Blueprint Plan
            </button>
          </div>

          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            overflow: 'hidden'
          }}>
            {/* 3D Isometric Building Model Render */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '100%',
              maxWidth: '500px',
              transform: 'perspective(900px) rotateX(25deg) rotateZ(-10deg)',
              transition: 'all 0.3s ease'
            }}>
              {/* Floor 4 */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.25)',
                border: '2px solid #ef4444',
                borderRadius: '8px',
                padding: '16px 24px',
                color: '#f87171',
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '700'
              }}>
                <span>Floor 4 (Roof Staging & Upper Corridor)</span>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>
                  HIGH SMOKE RISK
                </span>
              </div>

              {/* Floor 3 (FIRE ORIGIN) */}
              <div style={{
                background: 'rgba(220, 38, 38, 0.55)',
                border: '3px solid #ff4444',
                borderRadius: '8px',
                padding: '20px 24px',
                color: '#ffffff',
                boxShadow: '0 0 35px rgba(239, 68, 68, 0.5)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '800'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Flame size={22} className="animate-pulse" />
                  <span>Floor 3 (Room 304 - CHEMICAL LAB FIRE)</span>
                </div>
                <span style={{ background: '#7f1d1d', border: '1px solid #f87171', color: '#fff', fontSize: '11px', padding: '4px 10px', borderRadius: '4px' }}>
                  CRITICAL ZONE
                </span>
              </div>

              {/* Floor 2 */}
              <div style={{
                background: 'rgba(234, 179, 8, 0.2)',
                border: '2px solid #eab308',
                borderRadius: '8px',
                padding: '16px 24px',
                color: '#fde047',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '700'
              }}>
                <span>Floor 2 (Computer Science Dept)</span>
                <span style={{ background: '#ca8a04', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>
                  MODERATE RISK
                </span>
              </div>

              {/* Floor 1 */}
              <div style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '2px solid #22c55e',
                borderRadius: '8px',
                padding: '16px 24px',
                color: '#86efac',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '700'
              }}>
                <span>Floor 1 (Ground Lobby & Main Assembly)</span>
                <span style={{ background: '#16a34a', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>
                  SAFE EVACUATION EXIT
                </span>
              </div>
            </div>

            {/* Compass / 3D Orientation marker */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '20px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid #334155',
              padding: '8px 12px',
              borderRadius: '8px',
              color: '#94a3b8',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Compass size={16} color="#38bdf8" />
              <span>Orientation: Facing North-West (Staircase A West)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
