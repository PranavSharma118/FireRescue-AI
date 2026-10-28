// FireRescue AI - Incident Details / Reports Screen
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Printer
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TIMELINE_EVENTS, API_BASE_URL } from '../services/api';

export const Incident = ({ onBackToList }) => {
  const { incidents, selectedIncidentId, setSelectedIncidentId } = useAuth();
  const [activeTab, setActiveTab] = useState('images'); // 'images' | 'sensors' | 'notes'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [liveReport, setLiveReport] = useState(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const incident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];

  const cctvCaptures = [
    { title: 'Cam 1 - Floor 3, Room 304', time: '10:24:12 AM', type: 'fire', caption: 'Flashover ignition source identified' },
    { title: 'Cam 2 - Floor 3 Corridor', time: '10:24:12 AM', type: 'smoke', caption: 'Smoke billowing towards east wing' },
    { title: 'Cam 4 - Staircase B', time: '10:25:00 AM', type: 'blocked', caption: 'Zero visibility smoke entrapment hazard' },
  ];

  const handleGenerateReport = async () => {
    setIsLoadingReport(true);
    setIsReportModalOpen(true);
    try {
      const res = await fetch(`${API_BASE_URL}/incidents/${incident.id}/report`);
      if (res.ok) {
        const data = await res.json();
        setLiveReport(data);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoadingReport(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header and Action Buttons */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Incident Details</h1>
          <p className="page-subtitle">Complete information and logs for the selected incident</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onBackToList}
            className="btn-secondary"
          >
            <ArrowLeft size={16} />
            Back to List
          </button>

          <button 
            onClick={handleGenerateReport}
            className="btn-primary"
          >
            <FileText size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* 3-Column Incident Details Grid matching Screenshot 6 */}
      <div className="incident-details-layout">
        {/* Column 1: Basic Information */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">Basic Information</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Incident ID</span>
              <strong style={{ color: '#111827' }}>{incident.code}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Building</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>{incident.building}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Location</span>
              <span style={{ fontWeight: '500' }}>{incident.location}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Time</span>
              <span>{incident.timestamp || '10:24 AM, 30 Oct 2026'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Severity</span>
              <span className={`badge-pill badge-${incident.severity.toLowerCase()}`}>
                {incident.severity}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Status</span>
              <span className={`badge-pill badge-${incident.status.toLowerCase()}`}>
                {incident.status}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f3f6', paddingBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>People at Risk</span>
              <strong style={{ color: '#dc2626' }}>{incident.peopleAtRisk} (estimated)</strong>
            </div>

            <div style={{ marginTop: '8px', padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Dispatched Units:</span>
              <div style={{ fontSize: '12px', color: '#1e293b', marginTop: '3px' }}>
                Engine 01, Ladder 03, Entry Squad Alpha (5 firefighters on-site)
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Timeline */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">Timeline</h2>
          </div>

          <div className="timeline-feed">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="timeline-node">
                <div className={`timeline-dot ${event.status}`} />
                <span className="timeline-time">{event.time}</span>
                <span className="timeline-title">{event.title}</span>
                <span className="timeline-desc">{event.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Supporting Data */}
        <div className="panel-card">
          <div className="panel-header" style={{ marginBottom: '14px' }}>
            <h2 className="panel-title">Supporting Data</h2>
          </div>

          {/* Sub Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '14px' }}>
            {['images', 'sensors', 'notes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? '#fee2e2' : 'transparent',
                  color: activeTab === tab ? '#dc2626' : '#6b7280',
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'sensors' ? 'Sensor Data' : tab}
              </button>
            ))}
          </div>

          {/* Tab 1: Images Carousel */}
          {activeTab === 'images' && (
            <div>
              <div style={{
                position: 'relative',
                height: '210px',
                background: '#0f172a',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Visual rendering simulation */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: cctvCaptures[currentSlideIndex].type === 'fire'
                    ? 'radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, rgba(15, 23, 42, 0.95) 75%)'
                    : 'radial-gradient(circle, rgba(100, 116, 139, 0.7) 0%, rgba(15, 23, 42, 0.95) 75%)',
                }} />

                <div style={{ position: 'relative', textAlign: 'center', color: '#fff', zIndex: 5 }}>
                  <div style={{ fontSize: '36px' }}>
                    {cctvCaptures[currentSlideIndex].type === 'fire' ? '🔥' : '💨'}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px' }}>
                    {cctvCaptures[currentSlideIndex].title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
                    {cctvCaptures[currentSlideIndex].caption}
                  </div>
                </div>

                {/* Left/Right carousel arrows */}
                <button
                  onClick={() => setCurrentSlideIndex(prev => (prev === 0 ? cctvCaptures.length - 1 : prev - 1))}
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                  }}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => setCurrentSlideIndex(prev => (prev === cctvCaptures.length - 1 ? 0 : prev + 1))}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11.5px', color: '#6b7280' }}>
                Captured: {cctvCaptures[currentSlideIndex].title} ({cctvCaptures[currentSlideIndex].time})
              </div>
            </div>
          )}

          {/* Tab 2: Sensor Telemetry Data */}
          {activeTab === 'sensors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                  <span>Thermal Sensor T-304</span>
                  <span style={{ color: '#dc2626' }}>92°C (Critical)</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Sampling frequency: 10Hz</div>
              </div>

              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                  <span>Optical Smoke Obscuration</span>
                  <span style={{ color: '#dc2626' }}>89% / m</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>East corridor exhaust active</div>
              </div>

              <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                  <span>Carbon Monoxide (CO)</span>
                  <span style={{ color: '#d97706' }}>120 ppm</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>SCBA gear mandatory for entry crews</div>
              </div>
            </div>
          )}

          {/* Tab 3: Dispatcher Notes */}
          {activeTab === 'notes' && (
            <div style={{ fontSize: '12.5px', color: '#374151', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '8px' }}>
                {incident.notes}
              </p>
              <div style={{ fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #f1f3f6', paddingTop: '8px' }}>
                Logged by Central Dispatcher • Station 12
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Incident Dossier / Investigation Report Modal */}
      {isReportModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '780px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            {/* Report Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #450e17 0%, #1a0408 100%)',
              color: '#ffffff',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #dc2626'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={20} color="#ef4444" />
                  <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#fca5a5', fontWeight: '700' }}>
                    OFFICIAL INCIDENT REPORT • DOSSIER
                  </span>
                </div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', marginTop: '2px' }}>
                  Incident Report {liveReport?.incident_code || incident.code}
                </h2>
                <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
                  Report ID: {liveReport?.report_id || `FIRERESCUE-REP-${incident.code}`} • Status: <strong style={{ color: '#86efac' }}>{incident.status}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => window.print()}
                  className="btn-primary"
                  style={{ background: '#2563eb', padding: '6px 14px', fontSize: '12px' }}
                >
                  <Printer size={15} /> Print / Save PDF
                </button>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '6px' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Report Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '13px' }}>
              
              {/* Section 1: KYA HUA (Incident Nature) */}
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  1. KYA HUA (Incident Nature & Threat Summary)
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#991b1b', marginBottom: '4px' }}>
                  {liveReport?.kya_hua?.title || 'Major Chemical Hazard & Active Laboratory Fire'}
                </h3>
                <p style={{ color: '#4b5563', lineHeight: '1.5' }}>
                  {liveReport?.kya_hua?.summary || incident.notes}
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '12.5px', fontWeight: '600' }}>
                  <div>People at Risk: <strong style={{ color: '#dc2626' }}>{incident.peopleAtRisk} Occupants</strong></div>
                  <div>Casualties: <strong style={{ color: '#059669' }}>0 Reported</strong></div>
                  <div>Severity Level: <span className="badge-pill badge-high">{incident.severity}</span></div>
                </div>
              </div>

              {/* Section 2: KAHAN HUA (Spatial Mapping) */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  2. KAHAN HUA (Exact Location & Hazard Conduits)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', color: '#334155' }}>
                  <div><strong>Campus / Complex:</strong> North Campus Engineering Quad</div>
                  <div><strong>Building:</strong> {incident.building}</div>
                  <div><strong>Floor & Room:</strong> {incident.location}</div>
                  <div><strong>Fire Origin Core:</strong> Room 303 Chemical Storage Shelf B-2</div>
                  <div><strong>Blocked Conduit:</strong> <span style={{ color: '#dc2626', fontWeight: '600' }}>Staircase B (Zero Visibility)</span></div>
                  <div><strong>Safe Escape Route:</strong> <span style={{ color: '#059669', fontWeight: '600' }}>Staircase A (West Wing to EXIT)</span></div>
                </div>
              </div>

              {/* Section 3: KAISE HUA (Root Cause & Timeline) */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  3. KAISE HUA (Root Cause & Progression)
                </div>
                <p style={{ color: '#475569', marginBottom: '10px' }}>
                  <strong>Initial Trigger:</strong> Electrical short circuit on instrumentation rack ignited volatile solvent vapors. Convective heat draft carried toxic smoke along ceiling westward towards the central corridor.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: '2px solid #cbd5e1', paddingLeft: '12px' }}>
                  {TIMELINE_EVENTS.map((ev, i) => (
                    <div key={i} style={{ fontSize: '12px' }}>
                      <strong style={{ color: '#dc2626' }}>{ev.time}</strong> — <strong>{ev.title}</strong>: {ev.detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: SENSORS & AI TELEMETRY */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  4. SENSOR TELEMETRY & AI RISK PREDICTION
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>AI Spread Risk</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#dc2626' }}>{incident.aiSpreadRisk || 87}%</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Peak Heat</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#dc2626' }}>92.5°C</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Smoke Density</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#ea580c' }}>{incident.smokeDensity || '89%'}</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Spread Window</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>10 - 15m</div>
                  </div>
                </div>
              </div>

              {/* Section 5: COMMANDER ACTIONS & DECISION SIGNOFF */}
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '14px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#15803d', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  5. TACTICAL ORDERS & COMMANDER SIGNOFF
                </div>
                <ul style={{ paddingLeft: '18px', color: '#166534', lineHeight: '1.6' }}>
                  <li>Entry Squad Alpha dispatched strictly via West Entrance (Staircase A).</li>
                  <li>Positive Pressure Ventilation (PPV) deployed in Stairwell A.</li>
                  <li>Staircase B sealed due to zero-visibility smoke entrapment risk.</li>
                  <li>Evacuation priority order: Floor 4 → Floor 3 → Floor 2.</li>
                </ul>
                <div style={{ marginTop: '10px', borderTop: '1px solid #bbf7d0', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#166534' }}>
                  <div>Authorized by: <strong>Commander Rajesh Varma (FD-709)</strong></div>
                  <div>Station: <strong>Station 12 - Metro Command</strong></div>
                  <div>Status: <strong>Tactical Orders Executed</strong></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
