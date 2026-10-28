// FireRescue AI - Emergency Alert Card
import React from 'react';
import { Flame, CloudRain, AlertTriangle, CheckCircle, Thermometer } from 'lucide-react';

export const AlertCard = ({ alert }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'critical':
        return <Flame size={18} color="#dc2626" />;
      case 'warning':
        return <AlertTriangle size={18} color="#d97706" />;
      case 'safe':
        return <CheckCircle size={18} color="#059669" />;
      default:
        return <Thermometer size={18} color="#4b5563" />;
    }
  };

  const getIconBg = () => {
    switch (alert.type) {
      case 'critical':
        return '#fee2e2';
      case 'warning':
        return '#fef3c7';
      case 'safe':
        return '#d1fae5';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <div className={`alert-item-card ${alert.type}`}>
      <div 
        className="alert-item-icon" 
        style={{ backgroundColor: getIconBg() }}
      >
        {getIcon()}
      </div>
      <div className="alert-item-content">
        <div className="alert-item-title">{alert.title}</div>
        <div className="alert-item-desc">{alert.description}</div>
        {alert.details && (
          <div className="alert-item-meta">{alert.details}</div>
        )}
      </div>
      <div className="alert-item-time">{alert.time}</div>
    </div>
  );
};
