// FireRescue AI - Real-Time CCTV Feed with AI Vision Overlay
import React from 'react';

export const CameraFeed = ({ camera, onSelect }) => {
  const isDanger = camera.statusType === 'danger';
  const isClear = camera.statusType === 'safe';

  return (
    <div className="camera-card" onClick={() => onSelect && onSelect(camera)}>
      {/* Top Overlay Bar */}
      <div className="camera-header-overlay">
        <span className="camera-title-badge">{camera.name}</span>
        <span className="camera-time-badge">{camera.timestamp}</span>
      </div>

      {/* Viewport Simulation */}
      <div className="camera-viewport">
        {/* Optical Canvas Background Simulation */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: camera.type === 'fire' 
              ? 'radial-gradient(circle at 45% 60%, rgba(220, 38, 38, 0.45) 0%, rgba(30, 20, 20, 0.95) 75%)'
              : camera.type === 'smoke'
              ? 'radial-gradient(circle at 50% 50%, rgba(100, 116, 139, 0.6) 0%, rgba(15, 23, 42, 0.95) 80%)'
              : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Architectural corridor grid lines for CCTV feeling */}
          <svg width="100%" height="100%" style={{ opacity: 0.25, position: 'absolute' }}>
            <line x1="0" y1="0" x2="50%" y2="50%" stroke="#94a3b8" strokeWidth="1" />
            <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#94a3b8" strokeWidth="1" />
            <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#94a3b8" strokeWidth="1" />
            <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#94a3b8" strokeWidth="1" />
            <rect x="35%" y="35%" width="30%" height="30%" fill="none" stroke="#94a3b8" strokeWidth="1" />
          </svg>

          {/* Realistic Silhouette & Fire FX */}
          {camera.type === 'fire' && (
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{
                fontSize: '44px',
                filter: 'drop-shadow(0 0 16px #ef4444)',
                animation: 'pulse 1.5s infinite'
              }}>
                🔥
              </div>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '70px',
                background: 'rgba(239, 68, 68, 0.25)',
                filter: 'blur(16px)',
                borderRadius: '50%'
              }} />
            </div>
          )}

          {camera.type === 'smoke' && (
            <div style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '38px', filter: 'blur(1px)' }}>💨</div>
              <div style={{
                width: '160px',
                height: '90px',
                background: 'rgba(148, 163, 184, 0.4)',
                filter: 'blur(20px)',
                borderRadius: '50%',
                margin: '0 auto'
              }} />
            </div>
          )}

          {camera.type === 'clear' && (
            <div style={{ textAlign: 'center', opacity: 0.7 }}>
              <div style={{ fontSize: '32px' }}>🚪</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                WEST STAIRWELL ACCESS
              </div>
            </div>
          )}
        </div>

        {/* Scanline CRT overlay */}
        <div className="camera-scanline" />

        {/* AI Bounding Box for detected anomalies */}
        {camera.box && (
          <div 
            className="ai-bounding-box"
            style={{
              left: `${camera.box.x}%`,
              top: `${camera.box.y}%`,
              width: `${camera.box.width}%`,
              height: `${camera.box.height}%`,
            }}
          >
            <div className="ai-box-tag">
              {camera.detection}
            </div>
          </div>
        )}

        {/* Live Watermark REC indicator */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          fontFamily: 'monospace',
          color: '#ef4444',
          zIndex: 10,
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            display: 'inline-block',
            boxShadow: '0 0 6px #ef4444'
          }} />
          LIVE FEED
        </div>

        {/* Status Badge in bottom right */}
        {camera.type === 'clear' && (
          <div className="camera-footer-overlay">
            <span className="status-indicator-badge clear">CLEAR</span>
          </div>
        )}

        {camera.type === 'smoke' && camera.name.includes('Staircase') && (
          <div className="camera-footer-overlay">
            <span className="status-indicator-badge blocked">BLOCKED (SMOKE)</span>
          </div>
        )}
      </div>
    </div>
  );
};
