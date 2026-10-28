// FireRescue AI - Utility and Helper Functions

export const formatTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const formatFullDateTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const getSeverityBadgeStyle = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'high':
    case 'critical':
      return {
        bg: '#FEE2E2',
        text: '#DC2626',
        border: '#FECACA',
        dot: '#EF4444',
      };
    case 'medium':
    case 'moderate':
      return {
        bg: '#FEF3C7',
        text: '#D97706',
        border: '#FDE68A',
        dot: '#F59E0B',
      };
    case 'low':
      return {
        bg: '#D1FAE5',
        text: '#059669',
        border: '#A7F3D0',
        dot: '#10B981',
      };
    case 'safe':
      return {
        bg: '#ECFDF5',
        text: '#047857',
        border: '#6EE7B7',
        dot: '#059669',
      };
    default:
      return {
        bg: '#F3F4F6',
        text: '#4B5563',
        border: '#E5E7EB',
        dot: '#9CA3AF',
      };
  }
};

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return {
        bg: '#FEE2E2',
        text: '#DC2626',
        label: 'Active',
      };
    case 'contained':
      return {
        bg: '#D1FAE5',
        text: '#059669',
        label: 'Contained',
      };
    case 'resolved':
      return {
        bg: '#E0F2FE',
        text: '#0284C7',
        label: 'Resolved',
      };
    default:
      return {
        bg: '#F3F4F6',
        text: '#4B5563',
        label: status || 'Pending',
      };
  }
};

// Simulated tactical audio notification for emergency alert
export const playTacticalBeep = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch {
    // Audio context may be restricted before user interaction
  }
};
