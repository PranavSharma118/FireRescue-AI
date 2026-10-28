// FireRescue AI - Report New Incident Modal
import React, { useState } from 'react';
import { Flame, X, AlertTriangle, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NewIncidentModal = ({ isOpen, onClose }) => {
  const { addNewIncident } = useAuth();

  const [formData, setFormData] = useState({
    building: 'Engineering Block B',
    location: 'Floor 2, Robotics Lab',
    severity: 'High',
    peopleAtRisk: 30,
    notes: 'Smoke detector activated. Lithium battery fire suspected in workshop.',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewIncident(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '520px' }}>
        <div style={{
          padding: '18px 24px',
          background: '#c92a2a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame size={20} />
            <h2 style={{ fontSize: '17px', fontWeight: '700' }}>Log New Fire Incident</h2>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Building / Complex:
            </label>
            <input 
              type="text" 
              required
              value={formData.building}
              onChange={(e) => setFormData({ ...formData, building: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Floor & Room / Exact Location:
            </label>
            <input 
              type="text" 
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Severity Level:
              </label>
              <select 
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13.5px' }}
              >
                <option value="High">High (Immediate Action)</option>
                <option value="Medium">Medium (Watch & Contain)</option>
                <option value="Low">Low (Isolated Flareup)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Estimated People at Risk:
              </label>
              <input 
                type="number" 
                required
                min="0"
                value={formData.peopleAtRisk}
                onChange={(e) => setFormData({ ...formData, peopleAtRisk: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13.5px' }}
              >
              </input>
            </div>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Preliminary Hazard Notes:
            </label>
            <textarea 
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              Register Incident & Dispatch AI Scan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
