// FireRescue AI - AI Analysis Screen (Risk Assessment, Spread Prediction & Decision Support)
import React from 'react';
import { 
  Flame, 
  Thermometer, 
  Wind, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Layers,
  ArrowUp,
  Cpu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const FireAnalysis = ({ onOpenCommanderModal }) => {
  const { 
    incidents, 
    selectedIncidentId, 
    setSelectedIncidentId,
    selectedBuilding,
    setSelectedBuilding 
  } = useAuth();

  const currentInc = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const riskScore = currentInc.aiSpreadRisk || 87;

  return (
    <div className="page-container">
      {/* Header and Filter Row */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Analysis</h1>
          <p className="page-subtitle">Prediction, risk assessment and decision support</p>
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            value={selectedIncidentId}
            onChange={(e) => setSelectedIncidentId(e.target.value)}
            className="select-filter"
          >
            {incidents.map(inc => (
              <option key={inc.id} value={inc.id}>Incident {inc.code}</option>
            ))}
          </select>

          <select 
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="select-filter"
          >
            <option value="Academic Block">Academic Block</option>
            <option value="Hostel Block">Hostel Block</option>
            <option value="Admin Block">Admin Block</option>
          </select>
        </div>
      </div>

      {/* Top 2 Panels: Fire Spread Prediction & Risk Assessment */}
      <div className="analysis-grid">
        {/* Left: Fire Spread Prediction (Isometric Multi-Floor Stack) */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">Fire Spread Prediction</h2>
          </div>

          <div className="isometric-stack-container">
            {/* Floor 4 */}
            <div className="stack-floor-row" style={{ borderLeft: '5px solid #ef4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>Floor 4</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Roof Access & Classrooms</span>
              </div>
              <span className="badge-pill badge-high">High Risk</span>
            </div>

            {/* Floor 3 (FIRE ORIGIN) */}
            <div className="stack-floor-row critical" style={{ borderLeft: '6px solid #dc2626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Flame size={18} color="#dc2626" className="animate-pulse" />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#991b1b' }}>Floor 3</div>
                  <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: '600' }}>Active Chemical Ignition Core</div>
                </div>
              </div>
              <span className="badge-pill badge-high" style={{ background: '#b91c1c', color: '#ffffff', border: 'none' }}>
                Critical
              </span>
            </div>

            {/* Floor 2 */}
            <div className="stack-floor-row" style={{ borderLeft: '5px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>Floor 2</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Faculty Lounges & Lab B</span>
              </div>
              <span className="badge-pill badge-medium">Moderate</span>
            </div>

            {/* Floor 1 */}
            <div className="stack-floor-row" style={{ borderLeft: '5px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>Floor 1</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Ground Lobby & Assembly</span>
              </div>
              <span className="badge-pill badge-low">Low Risk</span>
            </div>
          </div>
        </div>

        {/* Right: Risk Assessment (Radial Gauge & Environmental Metrics) */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">Risk Assessment</h2>
          </div>

          {/* SVG Radial Gauge */}
          <div className="gauge-wrapper">
            <svg viewBox="0 0 200 110" className="gauge-svg">
              {/* Background Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Colored Gradient Stroke for 87% */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.87)}
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>

            <div className="gauge-score-value">{riskScore}%</div>
            <div className="gauge-risk-label">High Spread Risk</div>
          </div>

          {/* Telemetry Environmental Parameters */}
          <div className="parameters-grid">
            <div className="param-row">
              <span className="param-name">
                <Thermometer size={16} /> Temperature
              </span>
              <span className="param-value" style={{ color: '#dc2626' }}>
                {currentInc.temperature || '45°C'} <ArrowUp size={14} color="#dc2626" />
              </span>
            </div>

            <div className="param-row">
              <span className="param-name">
                <Wind size={16} /> Smoke Level
              </span>
              <span className="param-value" style={{ color: '#dc2626' }}>
                High <ArrowUp size={14} color="#dc2626" />
              </span>
            </div>

            <div className="param-row">
              <span className="param-name">
                <AlertTriangle size={16} /> Gas Level
              </span>
              <span className="param-value" style={{ color: '#d97706' }}>
                {currentInc.gasLevel || 'Moderate'}
              </span>
            </div>

            <div className="param-row">
              <span className="param-name">
                <Wind size={16} /> Wind Direction
              </span>
              <span className="param-value">
                {currentInc.wind || 'East'}
              </span>
            </div>

            <div className="param-row">
              <span className="param-name">
                <Clock size={16} /> Estimated Spread
              </span>
              <span className="param-value">
                {currentInc.spreadEstimate || '10 - 15 mins'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2 Panels: AI Insights & Recommended Actions */}
      <div className="bottom-analysis-grid">
        {/* Left: AI Insights */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">AI Insights</h2>
          </div>

          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-dot" />
              <span>Fire is likely to spread towards the East Wing (Rooms 305–308).</span>
            </div>

            <div className="insight-item">
              <div className="insight-dot" />
              <span>Staircase B is unsafe due to high smoke concentration.</span>
            </div>

            <div className="insight-item">
              <div className="insight-dot" />
              <span>Evacuate Floor 4 first as it has higher risk of smoke spread.</span>
            </div>

            <div className="insight-item">
              <div className="insight-dot" />
              <span>Recommended entry for firefighters: West Entrance (Staircase A).</span>
            </div>
          </div>
        </div>

        {/* Right: Recommended Actions */}
        <div className="panel-card">
          <div className="panel-header" style={{ marginBottom: '14px' }}>
            <h2 className="panel-title">Recommended Actions</h2>
            <button 
              onClick={onOpenCommanderModal}
              className="btn-primary" 
              style={{ fontSize: '12px', padding: '5px 12px' }}
            >
              Verify & Authorize
            </button>
          </div>

          <div className="recommended-actions-list">
            <div className="action-item-check">
              <CheckCircle2 size={18} color="#16a34a" />
              <span>Deploy firefighters from West Entrance.</span>
            </div>

            <div className="action-item-check">
              <CheckCircle2 size={18} color="#16a34a" />
              <span>Evacuate Floor 4 → Floor 3 → Floor 2.</span>
            </div>

            <div className="action-item-check">
              <CheckCircle2 size={18} color="#16a34a" />
              <span>Use Staircase A for evacuation.</span>
            </div>

            <div className="action-item-check">
              <CheckCircle2 size={18} color="#16a34a" />
              <span>Monitor East Wing for rapid spread.</span>
            </div>

            <div className="action-item-check">
              <CheckCircle2 size={18} color="#16a34a" />
              <span>Activate sprinkler system (if available).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
