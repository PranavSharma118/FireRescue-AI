// FireRescue AI - KPI Stat / Metric Card
import React from 'react';

export const RiskCard = ({ title, value, subtext, icon: Icon, iconBg, iconColor, isHighlight }) => {
  return (
    <div className="stat-card">
      <div 
        className="stat-icon-wrapper"
        style={{ 
          backgroundColor: iconBg || '#fee2e2', 
          color: iconColor || '#dc2626' 
        }}
      >
        <Icon size={24} />
      </div>
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{value}</span>
        <span className={`stat-subtext ${isHighlight ? 'highlight-red' : ''}`}>
          {subtext}
        </span>
      </div>
    </div>
  );
};
