// FireRescue AI - Tactical Authentication & Emergency State Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_INCIDENTS, INITIAL_ALERTS, INITIAL_CAMERAS, EVACUATION_PRIORITIES } from '../services/api';
import { playTacticalBeep } from '../utils/helpers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Current logged in user details
  const [currentUser, setCurrentUser] = useState({
    id: 'ff-401',
    name: 'Firefighter',
    subtitle: 'Fire Department',
    role: 'Incident Commander',
    station: 'Station 12 - Metro Command',
    callSign: 'Red Leader',
    avatar: '👨‍🚒',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Tactical Operational State
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState('104');
  const [selectedBuilding, setSelectedBuilding] = useState('Academic Block');
  const [selectedFloor, setSelectedFloor] = useState('Floor 3');
  
  // Alerts and notification center
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAlertMenuOpen, setIsAlertMenuOpen] = useState(false);
  
  // Cameras
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);

  // Evacuation status & final decision
  const [priorities, setPriorities] = useState(EVACUATION_PRIORITIES);
  const [finalDecision, setFinalDecision] = useState({
    approved: false,
    commanderName: null,
    timestamp: null,
    actionsApproved: [],
    evacuationSignalSent: false,
  });

  // Live Backend Data Fetching
  useEffect(() => {
    let isMounted = true;
    const fetchLiveData = async () => {
      try {
        const liveIncidents = await api.getIncidents();
        if (isMounted && liveIncidents && liveIncidents.length > 0) {
          setIncidents(liveIncidents);
          if (!selectedIncidentId || !liveIncidents.some(i => i.id === selectedIncidentId)) {
            setSelectedIncidentId(liveIncidents[0].id);
          }
        }
        const liveAlerts = await api.getAlerts();
        if (isMounted && liveAlerts && liveAlerts.length > 0) {
          setAlerts(liveAlerts);
        }
      } catch {
        // Fallback already active
      }
    };
    fetchLiveData();
    return () => { isMounted = false; };
  }, []);

  // Current active incident object
  const activeIncident = incidents.find(inc => inc.id === selectedIncidentId) || incidents[0];

  // Handler to add a new incident
  const addNewIncident = async (incidentData) => {
    // Send to backend API asynchronously
    api.createIncident(incidentData).catch(() => {});

    const newId = String(Date.now()).slice(-3);
    const newInc = {
      id: newId,
      code: `#${newId}`,
      building: incidentData.building || 'Science Complex',
      location: incidentData.location || 'Floor 2, Chem Lab',
      severity: incidentData.severity || 'High',
      peopleAtRisk: Number(incidentData.peopleAtRisk) || 25,
      status: 'Active',
      time: 'Just now',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      temperature: '48°C',
      smokeDensity: 'High (85%)',
      gasLevel: 'Moderate',
      wind: 'NE 10 km/h',
      spreadEstimate: '10 - 15 mins',
      staircaseA: 'Clear',
      staircaseB: 'Watch',
      aiSpreadRisk: 82,
      notes: incidentData.notes || 'Emergency call received. AI automated hazard scanning initiated.',
    };

    setIncidents(prev => [newInc, ...prev]);
    setSelectedIncidentId(newId);

    // Also add critical alert
    const newAlert = {
      id: `alt-${Date.now()}`,
      title: `Emergency Reported: ${newInc.code}`,
      description: `${newInc.building} - ${newInc.location}`,
      details: `Severity: ${newInc.severity}`,
      time: 'Just now',
      type: 'critical',
      severity: newInc.severity,
    };
    setAlerts(prev => [newAlert, ...prev]);

    if (soundEnabled) {
      playTacticalBeep();
    }
  };

  // Add camera
  const addNewCamera = (camData) => {
    const newCam = {
      id: `cam-${Date.now()}`,
      name: camData.name || `Cam ${cameras.length + 1} - Floor 2 Hallway`,
      location: `${selectedBuilding}, ${selectedFloor}`,
      timestamp: new Date().toLocaleTimeString(),
      detection: camData.detection || 'CLEAR',
      confidence: 96,
      statusType: 'safe',
      room: camData.room || 'Hallway A',
      type: 'clear',
      box: null,
      alertText: 'Optical sensor online and calibrated',
    };
    setCameras(prev => [...prev, newCam]);
  };

  // Confirm final commander tactical action
  const confirmFinalDecision = (actions) => {
    // Dispatch to backend API
    api.verifyCommanderDecision(actions).catch(() => {});

    setFinalDecision({
      approved: true,
      commanderName: `${currentUser.name} (${currentUser.role})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actionsApproved: actions,
      evacuationSignalSent: true,
    });
    
    // Add success alert
    const confirmAlert = {
      id: `alt-confirmed-${Date.now()}`,
      title: 'Commander Action Executed',
      description: 'Tactical evacuation and crew orders broadcasted to all units',
      details: 'Signal sent to Campus PA & Firefighter Squads',
      time: 'Just now',
      type: 'safe',
      severity: 'Safe',
    };
    setAlerts(prev => [confirmAlert, ...prev]);
  };

  // Switch role between Commander and Firefighter
  const toggleRole = () => {
    setCurrentUser(prev => {
      const isCommander = prev.role === 'Incident Commander';
      return {
        ...prev,
        role: isCommander ? 'Senior Firefighter' : 'Incident Commander',
        subtitle: isCommander ? 'Tactical Squad Alpha' : 'Fire Department',
      };
    });
  };

  const login = (role = 'Incident Commander', name = 'Firefighter') => {
    setCurrentUser({
      id: 'ff-401',
      name,
      subtitle: 'Fire Department',
      role,
      station: 'Station 12 - Metro Command',
      callSign: 'Red Leader',
      avatar: '👨‍🚒',
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        login,
        logout,
        toggleRole,
        incidents,
        setIncidents,
        selectedIncidentId,
        setSelectedIncidentId,
        activeIncident,
        selectedBuilding,
        setSelectedBuilding,
        selectedFloor,
        setSelectedFloor,
        alerts,
        setAlerts,
        soundEnabled,
        setSoundEnabled,
        isAlertMenuOpen,
        setIsAlertMenuOpen,
        cameras,
        setCameras,
        priorities,
        setPriorities,
        finalDecision,
        confirmFinalDecision,
        addNewIncident,
        addNewCamera,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
