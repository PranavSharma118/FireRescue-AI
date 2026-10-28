// FireRescue AI - Commander Decision View & Final Tactical Action Modal
import React, { useState } from 'react';
import { Shield, CheckCircle2, AlertTriangle, X, Radio, Send, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export const CommanderModal = ({ isOpen, onClose }) => {
  const { currentUser, activeIncident, confirmFinalDecision, finalDecision } = useAuth();

  const [actions, setActions] = useState([
    { id: 'act1', text: 'Deploy entry crew Alpha from West Entrance (Staircase A)', checked: true },
    { id: 'act2', text: 'Evacuate Floor 4 first, followed immediately by Floor 3 & 2', checked: true },
    { id: 'act3', text: 'Direct all evacuees strictly via Staircase A (Staircase B sealed)', checked: true },
    { id: 'act4', text: 'Initiate positive pressure ventilation (PPV) in West Stairwell', checked: true },
    { id: 'act5', text: 'Activate Zone 3 deluge sprinklers and campus emergency broadcast', checked: true },
  ]);

  const [commanderNotes, setCommanderNotes] = useState('Approved AI evacuation route. Entry team Alpha dispatched.');
  const [isExecuting, setIsExecuting] = useState(false);

  if (!isOpen) return null;

  const toggleAction = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, checked: !a.checked } : a));
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      confirmFinalDecision(actions.filter(a => a.checked).map(a => a.text));
      setIsExecuting(false);

      // Trigger tactical confirmation confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }

      onClose();
    }, 600);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={22} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.01em' }}>
                Incident Commander View & Final Decision
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                Verify AI predictions and authorize tactical response orders
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Situation Brief Card */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            fontSize: '12.5px'
          }}>
            <div>
              <div style={{ color: '#64748b' }}>Active Incident:</div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>{activeIncident?.code} ({activeIncident?.building})</div>
            </div>
            <div>
              <div style={{ color: '#64748b' }}>AI Spread Risk:</div>
              <div style={{ fontWeight: '700', color: '#dc2626' }}>{activeIncident?.aiSpreadRisk}% (High)</div>
            </div>
            <div>
              <div style={{ color: '#64748b' }}>People At Risk:</div>
              <div style={{ fontWeight: '700', color: '#d97706' }}>{activeIncident?.peopleAtRisk} Occupants</div>
            </div>
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Tactical Action Checklist (Verify & Authorize)</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {actions.map((act) => (
              <label 
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${act.checked ? '#bbf7d0' : '#e2e8f0'}`,
                  background: act.checked ? '#f0fdf4' : '#ffffff',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: act.checked ? '#166534' : '#64748b'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={act.checked}
                  onChange={() => toggleAction(act.id)}
                  style={{ width: '16px', height: '16px', accentColor: '#16a34a' }}
                />
                <span>{act.text}</span>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
              Commander Tactical Directives / Radio Log:
            </label>
            <textarea 
              rows={2}
              value={commanderNotes}
              onChange={(e) => setCommanderNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '16px'
          }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Authorizing as: <strong style={{ color: '#0f172a' }}>{currentUser.name} ({currentUser.role})</strong>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={onClose} className="btn-secondary" disabled={isExecuting}>
                Cancel
              </button>
              <button 
                onClick={handleExecute} 
                className="btn-primary"
                disabled={isExecuting}
                style={{ background: '#dc2626' }}
              >
                <Send size={15} />
                {isExecuting ? 'Transmitting Orders...' : 'Authorize & Broadcast Final Decision'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
