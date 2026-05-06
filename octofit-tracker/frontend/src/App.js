import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/octofitapp-small.png"
              alt="Octofit Logo"
              height="40"
              className="me-3"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
            <span>Octofit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/activities') ? 'active' : ''}`}
                  to="/activities"
                >
                  <i className="bi bi-activity"></i> Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/leaderboard') ? 'active' : ''}`}
                  to="/leaderboard"
                >
                  <i className="bi bi-trophy"></i> Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/teams') ? 'active' : ''}`}
                  to="/teams"
                >
                  <i className="bi bi-people"></i> Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/users') ? 'active' : ''}`}
                  to="/users"
                >
                  <i className="bi bi-person"></i> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/workouts') ? 'active' : ''}`}
                  to="/workouts"
                >
                  <i className="bi bi-heart-pulse"></i> Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid px-4 pb-5">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
