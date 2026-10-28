// FireRescue AI - Main Dashboard Screen
import React, { useState } from 'react';
import { Flame, Users, Building, ShieldCheck, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RiskCard } from '../components/RiskCard';
import { NewIncidentModal } from '../components/NewIncidentModal';

export const Dashboard = ({ onNavigateToIncident }) => {
  const { incidents, setSelectedIncidentId } = useAuth();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Calculate live stats
  const activeCount = incidents.filter(i => i.status === 'Active').length;
  const totalPeopleAtRisk = incidents
    .filter(i => i.status === 'Active')
    .reduce((acc, curr) => acc + (Number(curr.peopleAtRisk) || 0), 0);

  const handleRowClick = (incidentId) => {
    setSelectedIncidentId(incidentId);
    if (onNavigateToIncident) {
      onNavigateToIncident('incidents');
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Real-time fire incident overview and AI-powered insights</p>
        </div>

        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          New Incident
        </button>
      </div>

      {/* 4 Stats Cards matching screenshot */}
      <div className="stats-grid">
        <RiskCard 
          title="Active Incidents"
          value={activeCount}
          subtext="+1 in last 1 hour"
          isHighlight={true}
          icon={Flame}
          iconBg="#fee2e2"
          iconColor="#dc2626"
        />

        <RiskCard 
          title="People at Risk"
          value={totalPeopleAtRisk > 0 ? totalPeopleAtRisk : 68}
          subtext="Across 3 zones"
          icon={Users}
          iconBg="#e0e7ff"
          iconColor="#4f46e5"
        />

        <RiskCard 
          title="Buildings Monitored"
          value="5"
          subtext="In this campus"
          icon={Building}
          iconBg="#e0f2fe"
          iconColor="#0284c7"
        />

        <RiskCard 
          title="Safe Evacuations"
          value="1"
          subtext="Today"
          icon={ShieldCheck}
          iconBg="#dcfce7"
          iconColor="#16a34a"
        />
      </div>

      {/* Recent Incidents Panel */}
      <div className="panel-card">
        <div className="panel-header">
          <h2 className="panel-title">Recent Incidents</h2>
          <span 
            className="view-all-link"
            onClick={() => onNavigateToIncident && onNavigateToIncident('incidents')}
          >
            View All <ArrowRight size={14} />
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Building</th>
                <th>Location</th>
                <th>Severity</th>
                <th>People at Risk</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id} onClick={() => handleRowClick(inc.id)}>
                  <td style={{ fontWeight: '700', color: '#111827' }}>{inc.code}</td>
                  <td style={{ fontWeight: '600', color: '#374151' }}>{inc.building}</td>
                  <td>{inc.location}</td>
                  <td>
                    <span className={`badge-pill badge-${inc.severity.toLowerCase()}`}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: inc.severity === 'High' ? '#dc2626' : inc.severity === 'Medium' ? '#d97706' : '#059669'
                      }} />
                      {inc.severity}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600' }}>{inc.peopleAtRisk}</td>
                  <td>
                    <span className={`badge-pill badge-${inc.status.toLowerCase()}`}>
                      {inc.status}
                    </span>
                  </td>
                  <td style={{ color: '#6b7280' }}>{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Incident Registration Modal */}
      <NewIncidentModal 
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />
    </div>
  );
};
