// FireRescue AI - Evacuation Plan Screen (Priority-wise Evacuation & Tactical Routes)
import React from 'react';
import { Users, Clock, CheckCircle2, XCircle, ArrowRight, ShieldCheck, AlertOctagon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RescuePriority = () => {
  const { priorities, finalDecision, onOpenCommanderModal } = useAuth();

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Evacuation Plan</h1>
          <p className="page-subtitle">Priority-wise evacuation plan for building occupants</p>
        </div>

        {finalDecision.approved && (
          <span style={{
            background: '#d1fae5',
            color: '#065f46',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={16} /> Evacuation Broadcast Approved & Active
          </span>
        )}
      </div>

      {/* 2-Column Evacuation Layout */}
      <div className="evacuation-layout">
        {/* Left Column: Evacuation Priority List */}
        <div className="panel-card">
          <div className="panel-header">
            <h2 className="panel-title">Evacuation Priority</h2>
          </div>

          <div className="priority-list">
            {priorities.map((item) => (
              <div 
                key={item.priority}
                className="priority-card"
                style={{
                  borderLeft: `4px solid ${item.color}`
                }}
              >
                {/* Number Badge */}
                <div 
                  className="priority-badge-num"
                  style={{ backgroundColor: item.color }}
                >
                  {item.priority}
                </div>

                {/* Details */}
                <div className="priority-details">
                  <div className="priority-floor-title">{item.floor}</div>
                  <div className="priority-reason">{item.subtitle}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>Estimated Time: <strong>{item.estTime}</strong></span>
                  </div>
                </div>

                {/* Occupants Count */}
                <div className="priority-stat-col">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', color: '#1f2937' }}>
                    <Users size={16} color="#4b5563" />
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{item.people}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>People</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recommended Routes & Blocked Routes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Recommended Routes Card */}
          <div className="panel-card">
            <div className="panel-header" style={{ marginBottom: '12px' }}>
              <div>
                <h2 className="panel-title">Recommended Routes</h2>
                <div style={{ fontSize: '12px', color: '#059669', fontWeight: '600', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={14} /> Primary Evacuation Route (Staircase A)
                </div>
              </div>

              <span style={{
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '11.5px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Recommended
              </span>
            </div>

            {/* Stepper tree */}
            <div className="route-steps-container">
              <div className="route-step-row">
                <span className="route-step-circle">1</span>
                <span>Floor 4 → Staircase A</span>
              </div>

              <div className="route-step-row">
                <span className="route-step-circle">2</span>
                <span>Floor 3 → Staircase A</span>
              </div>

              <div className="route-step-row">
                <span className="route-step-circle">3</span>
                <span>Floor 2 → Staircase A</span>
              </div>

              <div className="route-step-row" style={{ background: '#dcfce7', borderColor: '#86efac' }}>
                <span className="route-step-circle" style={{ background: '#15803d' }}>4</span>
                <span style={{ color: '#14532d', fontWeight: '700' }}>Exit to Safe Zone</span>
              </div>
            </div>
          </div>

          {/* Blocked Routes Card */}
          <div className="panel-card" style={{ borderColor: '#fecaca', background: '#fff' }}>
            <div className="panel-header" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle size={15} color="#dc2626" />
                </div>
                <h2 className="panel-title" style={{ color: '#991b1b' }}>Blocked Routes</h2>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>
                  Staircase B
                </div>
                <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600', marginTop: '2px' }}>
                  High smoke concentration
                </div>
                <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '4px' }}>
                  Optical sensors detect zero visibility; thermal camera registers 68°C ambient air. Impassable.
                </div>
              </div>

              {/* Blocked Visual Preview with X overlay */}
              <div style={{
                width: '130px',
                height: '84px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid #e2e8f0'
              }}>
                {/* Smoke simulation */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(148, 163, 184, 0.7) 0%, rgba(30, 41, 59, 0.9) 100%)',
                  filter: 'blur(3px)'
                }} />

                {/* Red cross overlay */}
                <div style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(239, 68, 68, 0.8)'
                }}>
                  <XCircle size={22} color="#ffffff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
