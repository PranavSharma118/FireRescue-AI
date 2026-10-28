// FireRescue AI - Simulated API and Real-Time State Service

export const INITIAL_INCIDENTS = [
  {
    id: '104',
    code: '#104',
    building: 'Academic Block',
    location: 'Floor 3, Room 304',
    severity: 'High',
    peopleAtRisk: 42,
    status: 'Active',
    time: '10:24 AM',
    timestamp: '10:24 AM, 30 Oct 2026',
    temperature: '45°C',
    smokeDensity: 'High (89%)',
    gasLevel: 'Moderate',
    wind: 'East 12 km/h',
    spreadEstimate: '10 - 15 mins',
    staircaseA: 'Clear & Safe',
    staircaseB: 'Blocked (Smoke)',
    aiSpreadRisk: 87,
    notes: 'Primary fire outbreak identified in chemical storage shelf. Toxic fumes spreading towards East wing corridors. Ventilation shutdown initiated.',
  },
  {
    id: '103',
    code: '#103',
    building: 'Hostel Block',
    location: 'Floor 1, Kitchen',
    severity: 'Medium',
    peopleAtRisk: 12,
    status: 'Contained',
    time: '09:15 AM',
    timestamp: '09:15 AM, 30 Oct 2026',
    temperature: '32°C',
    smokeDensity: 'Low (18%)',
    gasLevel: 'Normal',
    wind: 'North 8 km/h',
    spreadEstimate: 'Controlled',
    staircaseA: 'Clear',
    staircaseB: 'Clear',
    aiSpreadRisk: 34,
    notes: 'Kitchen deep fryer flareup suppressed by team Bravo using dry powder extinguisher.',
  },
  {
    id: '102',
    code: '#102',
    building: 'Admin Block',
    location: 'Floor 2, Room 201',
    severity: 'Low',
    peopleAtRisk: 6,
    status: 'Resolved',
    time: '08:10 AM',
    timestamp: '08:10 AM, 30 Oct 2026',
    temperature: '24°C',
    smokeDensity: 'Zero',
    gasLevel: 'Normal',
    wind: 'Calm',
    spreadEstimate: 'None',
    staircaseA: 'Clear',
    staircaseB: 'Clear',
    aiSpreadRisk: 12,
    notes: 'Electrical short circuit safely isolated by campus facility crew. Thermal scan verified clear.',
  },
];

export const INITIAL_CAMERAS = [
  {
    id: 'cam-1',
    name: 'Cam 1 - Floor 3 (Room 304)',
    location: 'Academic Block, Floor 3',
    timestamp: '10:24:12 AM',
    detection: 'FIRE DETECTED 94%',
    confidence: 94,
    statusType: 'danger',
    room: 'Room 304',
    type: 'fire',
    box: { x: 30, y: 35, width: 44, height: 48 },
    alertText: 'Active ignition zone detected near east cabinet',
  },
  {
    id: 'cam-2',
    name: 'Cam 2 - Floor 3 Corridor',
    location: 'Academic Block, Floor 3 Corridor',
    timestamp: '10:24:12 AM',
    detection: 'SMOKE DETECTED 89%',
    confidence: 89,
    statusType: 'danger',
    room: 'Corridor 3B',
    type: 'smoke',
    box: { x: 38, y: 30, width: 38, height: 40 },
    alertText: 'Dense particulate smoke moving westward towards Staircase B',
  },
  {
    id: 'cam-3',
    name: 'Cam 3 - Staircase A',
    location: 'Academic Block, West Wing Staircase',
    timestamp: '10:24:12 AM',
    detection: 'CLEAR',
    confidence: 98,
    statusType: 'safe',
    room: 'Staircase A',
    type: 'clear',
    box: null,
    alertText: 'Primary safe evacuation route verified clear',
  },
  {
    id: 'cam-4',
    name: 'Cam 4 - Staircase B',
    location: 'Academic Block, East Wing Staircase',
    timestamp: '10:24:12 AM',
    detection: 'BLOCKED (SMOKE)',
    confidence: 92,
    statusType: 'danger',
    room: 'Staircase B',
    type: 'smoke',
    box: { x: 25, y: 35, width: 50, height: 45 },
    alertText: 'Emergency exit blocked by zero-visibility smoke buildup',
  },
];

export const INITIAL_ALERTS = [
  {
    id: 'alt-1',
    title: 'Fire detected',
    description: 'Room 304, Floor 3',
    details: 'Confidence: 94%',
    time: '10:24 AM',
    type: 'critical',
    severity: 'High',
  },
  {
    id: 'alt-2',
    title: 'Smoke detected',
    description: 'Corridor, Floor 3',
    details: 'Confidence: 89%',
    time: '10:24 AM',
    type: 'critical',
    severity: 'High',
  },
  {
    id: 'alt-3',
    title: 'Staircase B blocked',
    description: 'High smoke level',
    details: 'Impassable route',
    time: '10:23 AM',
    type: 'warning',
    severity: 'Medium',
  },
  {
    id: 'alt-4',
    title: 'Staircase A is clear',
    description: 'Safe for evacuation',
    details: 'Airflow positive pressure active',
    time: '10:22 AM',
    type: 'safe',
    severity: 'Safe',
  },
  {
    id: 'alt-5',
    title: 'Temperature rising',
    description: 'Floor 3 (45°C)',
    details: 'Thermal gradient climbing +2°C/min',
    time: '10:21 AM',
    type: 'warning',
    severity: 'Medium',
  },
];

export const TIMELINE_EVENTS = [
  {
    time: '10:24 AM',
    title: 'Fire detected (Cam 1)',
    detail: 'Location: Room 304',
    status: 'critical',
  },
  {
    time: '10:24 AM',
    title: 'Smoke detected (Cam 2)',
    detail: 'Corridor, Floor 3',
    status: 'critical',
  },
  {
    time: '10:25 AM',
    title: 'Staircase B blocked',
    detail: 'High smoke level',
    status: 'warning',
  },
  {
    time: '10:26 AM',
    title: 'AI analysis completed',
    detail: 'Spread risk: 87%',
    status: 'info',
  },
  {
    time: '10:26 AM',
    title: 'Evacuation plan generated',
    detail: 'Priority: Floor 4 → 3 → 2',
    status: 'success',
  },
];

export const EVACUATION_PRIORITIES = [
  {
    priority: 1,
    floor: 'Floor 4',
    subtitle: 'Highest risk due to smoke spread',
    estTime: '3-5 mins',
    people: 28,
    color: '#EF4444',
    bg: '#FEE2E2',
    border: '#FECACA',
    status: 'In Progress',
  },
  {
    priority: 2,
    floor: 'Floor 3',
    subtitle: 'Directly affected by fire',
    estTime: '5-7 mins',
    people: 42,
    color: '#F97316',
    bg: '#FFEDD5',
    border: '#FED7AA',
    status: 'Active Evac',
  },
  {
    priority: 3,
    floor: 'Floor 2',
    subtitle: 'Moderate risk',
    estTime: '7-10 mins',
    people: 18,
    color: '#EAB308',
    bg: '#FEF9C3',
    border: '#FEF08A',
    status: 'Staging',
  },
  {
    priority: 4,
    floor: 'Floor 1',
    subtitle: 'Low risk',
    estTime: '10-12 mins',
    people: 10,
    color: '#22C55E',
    bg: '#DCFCE7',
    border: '#BBF7D0',
    status: 'Cleared',
  },
];

export const RESOURCES_DATA = {
  firefighters: [
    { id: 'F1', name: 'Commander Rajesh Varma', unit: 'Incident Control', status: 'On-Site', location: 'Command Post Alpha', contact: '+91 98112-44101' },
    { id: 'F2', name: 'Squad Leader Amit Roy', unit: 'Entry Team Alpha', status: 'Deployed (West Entrance)', location: 'Floor 2 Staging', contact: '+91 98112-44102' },
    { id: 'F3', name: 'Vikas Sharma', unit: 'Search & Rescue 1', status: 'Deployed (Floor 4)', location: 'Floor 4 East', contact: '+91 98112-44103' },
    { id: 'F4', name: 'Sunil Patil', unit: 'Ventilation Team', status: 'Roof Operation', location: 'Rooftop Exhaust', contact: '+91 98112-44104' },
    { id: 'F5', name: 'Pooja Kulkarni', unit: 'Triage & Medical', status: 'Assembly Ground', location: 'Safe Zone Green', contact: '+91 98112-44105' },
  ],
  vehicles: [
    { id: 'V1', name: 'Rescue Engine 01 (Water Tender)', water: '88%', pressure: '12 Bar', status: 'Pumping', location: 'Hydrant Gate 2' },
    { id: 'V2', name: 'Ladder Truck 03 (32m Hydraulic)', reach: 'Available to Floor 6', status: 'Positioned (West Face)', location: 'Academic Courtyard' },
    { id: 'V3', name: 'High-Expansion Foam Unit 02', tank: '95%', status: 'Standby', location: 'Main Entrance' },
    { id: 'V4', name: 'Advanced Life Support Ambulance', status: 'Stationed', location: 'Safe Zone Perimeter' },
  ],
  equipment: [
    { name: 'Thermal Imaging Cameras', total: 6, deployed: 4, battery: '92%' },
    { name: 'Positive Pressure Fans (PPV)', total: 4, deployed: 2, status: 'Active at Staircase A' },
    { name: 'SCBA Air Packs (45 min)', total: 20, inUse: 12, reserve: 8 },
    { name: 'Thermal Drone Recon Unit', model: 'SkyScout Pro 4K', altitude: '45m', status: 'Hovering over Academic Block' },
  ]
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {
  // 1. Incidents
  getIncidents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/incidents/`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(item => ({
            id: String(item.id),
            code: item.incident_code || `#${item.id}`,
            building: item.building_id === 1 ? 'Academic Block' : 'Complex Unit',
            location: item.location_description,
            severity: item.severity,
            peopleAtRisk: item.people_at_risk,
            status: item.status,
            time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:24 AM',
            timestamp: item.created_at ? new Date(item.created_at).toLocaleString() : '10:24 AM, Today',
            temperature: `${item.temperature_celsius || 45}°C`,
            smokeDensity: `${item.smoke_density_pct || 85}%`,
            gasLevel: item.gas_level || 'Moderate',
            wind: item.wind_conditions || 'East 12 km/h',
            spreadEstimate: item.estimated_spread_window || '10 - 15 mins',
            staircaseA: 'Clear & Safe',
            staircaseB: 'Blocked (Smoke)',
            aiSpreadRisk: item.ai_spread_risk_score || 87,
            notes: item.notes || 'Emergency response active.'
          }));
        }
      }
    } catch {
      // Backend offline or booting, fall back to initial tactical state
    }
    return [...INITIAL_INCIDENTS];
  },

  createIncident: async (incidentData) => {
    try {
      const payload = {
        building_id: 1,
        floor_number: 3,
        location_description: `${incidentData.building} - ${incidentData.location}`,
        severity: incidentData.severity || 'High',
        people_at_risk: Number(incidentData.peopleAtRisk) || 25,
        temperature_celsius: 48.0,
        smoke_density_pct: 85,
        notes: incidentData.notes
      };
      const res = await fetch(`${API_BASE_URL}/incidents/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback handled in AuthContext
    }
    return null;
  },

  // 2. Alerts
  getAlerts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts/`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(item => ({
            id: `alt-${item.id}`,
            title: item.title,
            description: item.description,
            details: item.details || `Source: ${item.detected_source}`,
            time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
            type: item.severity?.toLowerCase() === 'critical' ? 'critical' : item.severity?.toLowerCase() === 'safe' ? 'safe' : 'warning',
            severity: item.severity
          }));
        }
      }
    } catch {
      // Backend offline, fallback to initial alerts
    }
    return [...INITIAL_ALERTS];
  },

  // 3. Commander Authorization & Decision
  verifyCommanderDecision: async (approvedActions, directivesNote = '') => {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approved_actions: approvedActions,
          commander_directives_note: directivesNote
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Handled gracefully in frontend
    }
    return null;
  },

  getCameras: async () => [...INITIAL_CAMERAS],
  getPriorities: async () => [...EVACUATION_PRIORITIES],
  getResources: async () => ({ ...RESOURCES_DATA }),
};
