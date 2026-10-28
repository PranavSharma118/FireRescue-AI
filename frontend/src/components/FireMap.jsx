// FireRescue AI - Interactive Floor Plan Blueprint & Evacuation Map
import React, { useState } from 'react';
import { Flame, X, ArrowRight, ShieldCheck, AlertCircle, Eye, Box } from 'lucide-react';

export const FireMap = ({ is3DView = false, onToggle3D }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const roomsData = [
    { id: '301', name: '301 Class Room', risk: 'Moderate', temp: '34°C', smoke: '22%', occupants: 14, color: '#fef08a' },
    { id: '302', name: '302 Lab', risk: 'High', temp: '48°C', smoke: '76%', occupants: 0, color: '#fecaca' },
    { id: '303', name: '303 Lab (Fire Origin)', risk: 'Critical Fire', temp: '92°C', smoke: '98%', occupants: 0, color: '#f87171', isFire: true },
    { id: '305', name: '305 Office', risk: 'Moderate', temp: '36°C', smoke: '35%', occupants: 4, color: '#fed7aa' },
    { id: '306', name: '306 Class Room', risk: 'Low', temp: '26°C', smoke: '8%', occupants: 18, color: '#fef9c3' },
    { id: '307', name: '307 Class Room', risk: 'Safe', temp: '23°C', smoke: '0%', occupants: 22, color: '#dcfce7' },
    { id: '308', name: '308 Storage', risk: 'Safe', temp: '22°C', smoke: '0%', occupants: 0, color: '#dcfce7' },
  ];

  return (
    <div className="floorplan-container">
      {/* Blueprint Visual Canvas */}
      <div className="floorplan-canvas-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Sector: Floor 3 West & East Wings</span>
            <span style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              Active Evacuation Routing Active
            </span>
          </div>

          <button 
            onClick={onToggle3D} 
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            <Box size={14} />
            {is3DView ? 'Switch to 2D Plan' : 'View 3D Model'}
          </button>
        </div>

        {/* 2D Architectural SVG Blueprint Layout */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            viewBox="0 0 920 460"
            className="blueprint-svg"
            style={{ maxWidth: '100%', height: 'auto', background: '#fafbfc', border: '1px solid #e5e7eb' }}
          >
            <defs>
              {/* Pattern for grid blueprint */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
              </pattern>

              {/* Glowing gradient for fire room */}
              <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.3" />
              </radialGradient>

              {/* Animated dash array marker */}
              <marker id="greenArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
              </marker>
              <marker id="redCross" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 1 1 L 9 9 M 9 1 L 1 9" stroke="#dc2626" strokeWidth="2" />
              </marker>
            </defs>

            {/* Canvas Blueprint Grid */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Outer Building Structural Perimeter */}
            <rect x="70" y="30" width="780" height="380" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.5" />

            {/* STAIRCASE A (West Wing) */}
            <g transform="translate(85, 45)">
              <rect x="0" y="0" width="85" height="150" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" rx="4" />
              <text x="42" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#166534">Staircase A</text>
              
              {/* Stair treads */}
              {[38, 52, 66, 80, 94, 108, 122].map((y, idx) => (
                <line key={idx} x1="10" y1={y} x2="75" y2={y} stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 2" />
              ))}
              
              <text x="42" y="142" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">SAFE EXIT</text>
            </g>

            {/* GREEN EXIT BUTTON AT BASE OF STAIRCASE A */}
            <g transform="translate(85, 335)">
              <rect x="0" y="0" width="85" height="55" rx="6" fill="#059669" stroke="#047857" strokeWidth="2" />
              <text x="42" y="34" textAnchor="middle" fontSize="16" fontWeight="800" fill="#ffffff" letterSpacing="2">EXIT</text>
              <circle cx="20" cy="30" r="4" fill="#86efac" />
            </g>

            {/* TOP ROW ROOMS: 301, 302, 303, 305 */}
            {/* Room 301 */}
            <g 
              transform="translate(190, 45)" 
              onClick={() => setSelectedRoom(roomsData[0])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="130" height="120" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="65" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#854d0e">301</text>
              <text x="65" y="75" textAnchor="middle" fontSize="11" fill="#713f12">Class Room</text>
            </g>

            {/* Room 302 */}
            <g 
              transform="translate(335, 45)" 
              onClick={() => setSelectedRoom(roomsData[1])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="130" height="120" rx="4" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
              <text x="65" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">302</text>
              <text x="65" y="75" textAnchor="middle" fontSize="11" fill="#7f1d1d">Lab</text>
            </g>

            {/* Room 303 (Fire Core) */}
            <g 
              transform="translate(480, 45)" 
              onClick={() => setSelectedRoom(roomsData[2])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="140" height="120" rx="4" fill="url(#fireGlow)" stroke="#ef4444" strokeWidth="2.5" />
              <circle cx="70" cy="45" r="18" fill="#fee2e2" />
              <text x="70" y="51" textAnchor="middle" fontSize="18">🔥</text>
              <text x="70" y="80" textAnchor="middle" fontSize="14" fontWeight="800" fill="#991b1b">303 Lab</text>
              <text x="70" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">FIRE CORE</text>
            </g>

            {/* Room 305 */}
            <g 
              transform="translate(635, 45)" 
              onClick={() => setSelectedRoom(roomsData[3])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="130" height="120" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
              <text x="65" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9a3412">305</text>
              <text x="65" y="75" textAnchor="middle" fontSize="11" fill="#7c2d12">Office</text>
            </g>

            {/* STAIRCASE B (East Wing - Blocked) */}
            <g transform="translate(780, 45)">
              <rect x="0" y="0" width="60" height="340" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="4" strokeDasharray="4 2" />
              <text x="30" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">Staircase B</text>

              {/* Red X over Staircase B */}
              <circle cx="30" cy="180" r="18" fill="#ef4444" />
              <path d="M 21 171 L 39 189 M 39 171 L 21 189" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              
              <text x="30" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">BLOCKED</text>
              <text x="30" y="240" textAnchor="middle" fontSize="9" fill="#991b1b">(SMOKE)</text>
            </g>

            {/* CENTRAL CORRIDOR (West to East) */}
            <rect x="180" y="180" width="590" height="60" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <text x="475" y="215" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b" letterSpacing="3">
              CENTRAL CORRIDOR
            </text>

            {/* BOTTOM ROW ROOMS: 306, 307, 308 */}
            {/* Room 306 */}
            <g 
              transform="translate(190, 255)" 
              onClick={() => setSelectedRoom(roomsData[4])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="130" height="135" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="65" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="#854d0e">306</text>
              <text x="65" y="85" textAnchor="middle" fontSize="11" fill="#713f12">Class Room</text>
            </g>

            {/* Room 307 */}
            <g 
              transform="translate(335, 255)" 
              onClick={() => setSelectedRoom(roomsData[5])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="130" height="135" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <text x="65" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">307</text>
              <text x="65" y="85" textAnchor="middle" fontSize="11" fill="#166534">Class Room</text>
            </g>

            {/* Room 308 */}
            <g 
              transform="translate(480, 255)" 
              onClick={() => setSelectedRoom(roomsData[6])}
              style={{ cursor: 'pointer' }}
            >
              <rect x="0" y="0" width="140" height="135" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <text x="70" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">308</text>
              <text x="70" y="85" textAnchor="middle" fontSize="11" fill="#166534">Storage</text>
            </g>

            {/* RECOMMENDED SAFE EVACUATION ROUTE (Green Arrows leading from corridor to Staircase A down to EXIT) */}
            <g>
              {/* Corridor west path */}
              <line 
                x1="550" y1="210" 
                x2="130" y2="210" 
                stroke="#059669" 
                strokeWidth="4" 
                strokeDasharray="8 6" 
                markerEnd="url(#greenArrow)" 
              />
              {/* Down toward Staircase A Exit */}
              <line 
                x1="127" y1="210" 
                x2="127" y2="330" 
                stroke="#059669" 
                strokeWidth="4" 
                strokeDasharray="8 6" 
                markerEnd="url(#greenArrow)" 
              />

              {/* Waypoint indicator dots */}
              <circle cx="480" cy="210" r="5" fill="#059669" />
              <circle cx="330" cy="210" r="5" fill="#059669" />
              <circle cx="200" cy="210" r="5" fill="#059669" />
            </g>

            {/* BLOCKED EVACUATION ROUTE (Red Dashed Line leading towards Staircase B) */}
            <g>
              <line 
                x1="550" y1="210" 
                x2="775" y2="210" 
                stroke="#ef4444" 
                strokeWidth="3.5" 
                strokeDasharray="6 4" 
              />
              <circle cx="775" cy="210" r="6" fill="#ef4444" />
              <path d="M 770 205 L 780 215 M 780 205 L 770 215" stroke="#ffffff" strokeWidth="2" />
            </g>
          </svg>

          {/* Interactive Room Telemetry Overlay Modal / Card */}
          {selectedRoom && (
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '14px 18px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                zIndex: 20,
                minWidth: '220px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px', color: '#1f2937' }}>{selectedRoom.name}</span>
                <button 
                  onClick={() => setSelectedRoom(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                >
                  <X size={16} />
                </button>
              </div>
              <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>Status: <strong>{selectedRoom.risk}</strong></div>
                <div>Temperature: <strong>{selectedRoom.temp}</strong></div>
                <div>Smoke Obscuration: <strong>{selectedRoom.smoke}</strong></div>
                <div>Est. Occupants: <strong>{selectedRoom.occupants} people</strong></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Legend Panel */}
      <div className="legend-panel">
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #f1f3f5', paddingBottom: '10px' }}>
          Legend
        </h3>

        <div className="legend-item">
          <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flame size={14} color="#dc2626" />
          </div>
          <span>Fire Location</span>
        </div>

        <div className="legend-item">
          <div className="legend-color-box" style={{ background: '#fca5a5' }} />
          <span>High Risk Zone</span>
        </div>

        <div className="legend-item">
          <div className="legend-color-box" style={{ background: '#fed7aa' }} />
          <span>Moderate Risk Zone</span>
        </div>

        <div className="legend-item">
          <div className="legend-color-box" style={{ background: '#fef08a' }} />
          <span>Low Risk Zone</span>
        </div>

        <div className="legend-item">
          <div className="legend-color-box" style={{ background: '#bbf7d0' }} />
          <span>Safe Zone</span>
        </div>

        <div className="legend-item">
          <div style={{ width: '22px', height: '0px', borderTop: '3px dashed #059669', position: 'relative' }}>
            <span style={{ position: 'absolute', right: '-4px', top: '-6px', color: '#059669', fontSize: '10px' }}>▶</span>
          </div>
          <span style={{ color: '#059669', fontWeight: '600' }}>Recommended Route</span>
        </div>

        <div className="legend-item">
          <div style={{ width: '22px', height: '0px', borderTop: '3px dashed #ef4444', position: 'relative' }}>
            <span style={{ position: 'absolute', right: '-3px', top: '-7px', color: '#ef4444', fontSize: '10px', fontWeight: '900' }}>✕</span>
          </div>
          <span style={{ color: '#dc2626', fontWeight: '600' }}>Blocked Route</span>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f3f5' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Primary Escape Passage:
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#059669', marginTop: '2px' }}>
            West Wing Staircase A (Positive pressure fan operating)
          </div>
        </div>
      </div>
    </div>
  );
};
