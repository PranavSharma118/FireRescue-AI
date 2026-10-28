// FireRescue AI - Tactical Authentication Screen (Login / Portal Entry)
import React, { useState } from 'react';
import { Flame, Shield, Lock, User, ArrowRight, Radio, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const [badgeId, setBadgeId] = useState('FD-709');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('Incident Commander');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(selectedRole, selectedRole === 'Incident Commander' ? 'Commander Rajesh Varma' : 'Firefighter Amit Roy');
  };

  const handleQuickDemo = (role) => {
    login(role, role === 'Incident Commander' ? 'Commander Rajesh Varma' : 'Firefighter');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2a080f 0%, #150306 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Ambience */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.18) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.12) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-10%',
        pointerEvents: 'none',
      }} />

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Top Brand Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #450e17 0%, #340910 100%)',
          padding: '30px 24px',
          textAlign: 'center',
          color: '#ffffff',
          borderBottom: '2px solid #ef4444'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.25) 0%, rgba(153, 27, 27, 0.15) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.4), inset 0 0 12px rgba(239, 68, 68, 0.2)',
            padding: '5px'
          }}>
            <img 
              src="/logo-shield.png" 
              alt="FireResQ AI Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))' }} 
            />
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
            FireRes<span style={{ color: '#ff4d4d', textShadow: '0 0 10px rgba(255, 77, 77, 0.6)' }}>Q</span> AI
          </h1>
          <p style={{ fontSize: '11px', color: '#fca5a5', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '600' }}>
            AI-Powered Fire Response & Evacuation
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '28px 24px' }}>
          <form onSubmit={handleSubmit}>
            {/* Role Radio Pills */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>
                Operational Role:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {['Incident Commander', 'Lead Firefighter'].map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: `1.5px solid ${selectedRole === role ? '#c92a2a' : '#e5e7eb'}`,
                      background: selectedRole === role ? '#fef2f2' : '#ffffff',
                      color: selectedRole === role ? '#991b1b' : '#4b5563',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Shield size={14} />
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Badge / ID */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Officer Badge ID / Credentials:
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text" 
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Secure Access Token:
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: '14px' }}
            >
              Sign In to Command Console
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f3f5', textAlign: 'center' }}>
            <div style={{ fontSize: '11.5px', color: '#6b7280', marginBottom: '8px' }}>
              Instant Demo Access:
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button 
                onClick={() => handleQuickDemo('Incident Commander')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: '#1e293b',
                  cursor: 'pointer'
                }}
              >
                Enter as Commander
              </button>
              <button 
                onClick={() => handleQuickDemo('Lead Firefighter')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: '#1e293b',
                  cursor: 'pointer'
                }}
              >
                Enter as Firefighter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
