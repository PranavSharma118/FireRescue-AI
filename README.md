# 🚒 FireRescue AI — Firefighters Decision Support & Evacuation Intelligence

> **ResQFire AI / FireRescue AI**: An AI-powered tactical decision support, CCTV hazard detection, multi-floor risk prediction, and dynamic evacuation navigation system designed specifically for firefighters, emergency response teams, and incident commanders.

---

## 📋 Comprehensive Frontend Architecture Flowchart

```mermaid
flowchart TD
    Start([🚒 System Start]) --> Auth[🔐 1. Login & Tactical Authentication<br/>Roles: Incident Commander / Lead Firefighter]
    Auth --> Dash[🏠 2. Main Dashboard<br/>Active Incidents | People at Risk | Buildings Monitored | Safe Evacuations]
    
    Dash --> Overview[🚨 3. Incident Overview<br/>Active Fire Locations, Severity Badges, Real-Time Status]
    Dash --> LiveCCTV[📹 4. Live CCTV Monitoring<br/>Cam 1-4 Quad Feeds | AI Bounding Boxes | Edge Detection 94%]
    Dash --> Map2D[🗺️ 5. Building Map Blueprint<br/>2D Floor Plan | Rooms 301-308 | Safe Routes vs Blocked Routes]
    Dash --> Analysis[🔥 6. AI Fire Analysis<br/>Isometric 3D Floor Risk Stack | 87% Spread Gauge | Telemetry]
    Dash --> Evac[👤 7. Evacuation Priority & Routes<br/>Priorities 1-4 | Staircase A Safe Path | Staircase B Blocked]
    Dash --> ResMgmt[👨‍🚒 8. Resource Management<br/>Firefighter Squads | Engine & Ladder Fleet | Thermal Drones]
    
    LiveCCTV --> AlertsFeed[⚠️ Tactical Alert Stream<br/>Fire Detected | Smoke Detected | Temp Rising]
    Map2D --> Model3D[🏢 BIM / 3D Digital Twin View]
    
    Analysis --> Recomms[📊 AI Tactical Recommendations<br/>Entry Path | Ventilation PPV | Floor Evac Order]
    Evac --> Recomms
    
    Recomms --> Commander[👨‍🚒 9. Incident Commander View<br/>Unified Situation Assessment & Verification Modal]
    Commander --> FinalAction[🚨 10. Final Decision Execution<br/>Broadcast Evac Orders | Dispatch Entry Units | Campus Alarm]
    
    FinalAction --> Report[📑 11. Incident Details & Reports<br/>Chronological Timeline | Sensor Logs | Printable Dossier]
```

---

## 🎨 Visual Screens Implemented (Matching Reference Designs)

| # | Screen | Key Features |
|---|--------|--------------|
| **1** | **Dashboard** | KPI Metric Cards (Active Incidents: 2, People at Risk: 68, Buildings Monitored: 5, Safe Evacuations: 1), "+ New Incident" modal trigger, Recent Incidents table with live severity badges. |
| **2** | **Live Monitoring** | 2x2 CCTV Camera grid (Cam 1 Room 304 [FIRE 94%], Cam 2 Corridor [SMOKE 89%], Cam 3 Staircase A [CLEAR], Cam 4 Staircase B [BLOCKED]), live detection alerts sidebar, "+ Add Camera". |
| **3** | **Building Map** | Interactive architectural SVG floor plan (Rooms 301–308, Fire core with pulse flame, green arrows pointing along Staircase A to EXIT, red dashed blocked route to Staircase B), full legend, 3D BIM toggle. |
| **4** | **AI Analysis** | Multi-floor isometric building risk stack (Floor 4 High Risk, Floor 3 Critical 🔥, Floor 2 Moderate, Floor 1 Low Risk), 87% spread risk radial gauge, environmental telemetry, AI Insights, Recommended Actions. |
| **5** | **Evacuation Plan** | Priority 1–4 floor breakdown with occupant counts and time windows, recommended step-by-step escape routes (Staircase A), blocked route card with smoke-filled thumbnail. |
| **6** | **Incident Details (Reports)** | Incident #104 breakdown, vertical milestone timeline (10:24 AM detection through 10:26 AM AI evac plan), supporting data tabs (Images, Sensors, Notes), printable report generation. |
| **7** | **Commander View & Final Action** | Decision support modal for Incident Commander to verify AI recommendations, broadcast evacuation sirens, and dispatch entry teams. |
| **8** | **Resources & Fleet** | Active firefighter squads, apparatus fleet (Rescue Engine 01, Ladder Truck 03, Foam unit), and SCBA/thermal drone hardware tracking. |

---

## 📂 Project Directory Structure

```
FireRescue AI/
├── index.html               # Semantic HTML5 entry with Outfit & Inter typography
├── package.json             # React, Vite, Lucide Icons, Canvas Confetti
├── vite.config.js           # Vite development server configuration
├── src/
│   ├── assets/              # Icons and imagery
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation with live search, alert drawer, user profile
│   │   ├── Sidebar.jsx      # Dark crimson tactical sidebar with ResQFire AI branding
│   │   ├── RiskCard.jsx     # Reusable KPI metric card
│   │   ├── AlertCard.jsx    # Emergency alert feed item
│   │   ├── CameraFeed.jsx   # Simulated CCTV camera view with scanlines & AI bounding box
│   │   ├── FireMap.jsx      # Interactive 2D architectural blueprint floor plan & legend
│   │   ├── CommanderModal.jsx # Commander View & Final Tactical Action authorization
│   │   └── NewIncidentModal.jsx # New fire emergency registration modal
│   ├── pages/
│   │   ├── Login.jsx        # Emergency command portal authentication
│   │   ├── Dashboard.jsx    # Real-time incident overview
│   │   ├── LiveMap.jsx      # Live monitoring with 4-cam CCTV grid & detection feed
│   │   ├── BuildingMap.jsx  # Building floor plan & 3D BIM toggle
│   │   ├── FireAnalysis.jsx # Spread prediction stack & 87% risk gauge
│   │   ├── RescuePriority.jsx # Priority-wise evacuation plan & escape routes
│   │   ├── Incident.jsx     # Incident #104 logs, timeline, and reporting
│   │   ├── Resources.jsx    # Firefighters, apparatus vehicles & equipment
│   │   └── Settings.jsx     # Audio sirens, AI thresholds & sensor polling
│   ├── services/
│   │   └── api.js           # Simulated backend API service & state data
│   ├── context/
│   │   └── AuthContext.jsx  # Tactical command state & authentication context
│   ├── utils/
│   │   └── helpers.js       # Formatting, badge styling, and 880Hz tactical audio chime
│   ├── App.jsx              # Main router & layout orchestrator
│   ├── main.jsx             # React DOM root entry
│   └── index.css            # Tactical CSS design system (wine/crimson theme)
```

---

## 📂 Complete Full-Stack Architecture

```
FireRescue-AI/
│
├── 📁 frontend/                 # React + Vite Application
│   ├── src/
│   │   ├── components/          # Navbar, Sidebar, FireMap, RiskCard, AlertCard, CommanderModal
│   │   ├── pages/               # Dashboard, LiveMap, BuildingMap, FireAnalysis, RescuePriority, Incident
│   │   ├── services/api.js      # Backend API connector with live sync & fallback
│   │   ├── context/AuthContext.jsx # Auth & live operational state
│   │   └── index.css            # Tactical command design system
│   ├── .env                     # VITE_API_URL=http://localhost:8000/api
│   ├── package.json
│   └── vite.config.js
│
├── 📁 backend/                  # FastAPI Application
│   ├── main.py                  # API gateway, CORS, lifespan database auto-init
│   ├── config.py                # Pydantic Settings loader from .env
│   ├── database.py              # PostgreSQL engine & sessionmaker with fallback
│   ├── models.py                # SQLAlchemy ORM models matching database tables
│   ├── schemas.py               # Pydantic request/response validation schemas
│   ├── dependencies.py          # Database and JWT authentication dependencies
│   ├── routes/
│   │   ├── auth.py              # Officer badge authentication & token issuance
│   │   ├── incidents.py         # Incident creation, lifecycle, and timeline milestones
│   │   ├── sensors.py           # IoT telemetry ingestion & threshold checks
│   │   ├── resources.py         # Squads, apparatus fleet, and gear tracking
│   │   ├── predictions.py       # AI fire spread risk & flashover index
│   │   ├── alerts.py            # Real-time critical hazard alerts
│   │   └── recommendations.py   # AI tactical recommendations & Commander approval
│   ├── services/
│   │   ├── prediction_service.py # Fire spread & thermal gradient physics algorithm
│   │   ├── incident_service.py   # Incident workflow & automated AI generation
│   │   └── alert_service.py      # Telemetry anomaly & hazard alert dispatcher
│   ├── utils/
│   │   └── security.py          # Bcrypt hashing & JWT token verification
│   ├── tests/
│   │   ├── test_database.py     # Connection & model unit tests
│   │   └── test_incidents.py    # Prediction engine & spread calculation tests
│   ├── .env                     # PostgreSQL credentials & secrets
│   ├── .env.example
│   └── requirements.txt
│
└── 📁 database/                 # PostgreSQL Database Structure
    ├── schema.sql               # Master aggregation script
    ├── relationships.sql        # Foreign keys, cascading constraints & indexes
    ├── seed_data.sql            # Demo seed data (Incident #104, Floor 3 Lab fire, Squad Alpha)
    └── tables/
        ├── users.sql            # Firefighters and Commanders
        ├── buildings.sql        # Campus structures and layouts
        ├── zones.sql            # Rooms (301-308) and staircases (A & B)
        ├── incidents.sql        # Active fire emergencies & severities
        ├── sensor_readings.sql  # Thermal & smoke telemetry
        ├── resources.sql        # Firefighters, water tenders, ladder trucks
        ├── predictions.sql      # AI risk predictions & spread vectors
        ├── alerts.sql           # Active critical hazard alerts
        └── recommendations.sql  # AI escape routes & verified Commander orders
```

---

## 🗄️ How to Import into PostgreSQL (`firerescue_AI`)

To execute the database schema directly into your local PostgreSQL database:

```bash
# Using psql command line tool:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d firerescue_AI -f database/schema.sql
```

Set your real database password inside `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/firerescue_AI
```

---

## 🚀 Running the Full Stack

### 1. Backend (FastAPI)
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
# API Docs: http://localhost:8000/docs
```

### 2. Frontend (React + Vite)
```bash
cd frontend
npm run dev
# App URL: http://localhost:5173/
```
