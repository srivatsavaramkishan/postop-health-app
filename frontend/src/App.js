// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'; // Use NavLink for active link
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import { useRole } from './context/RoleContext';

function App() {
  const { role, setRole } = useRole();

  return (
    <Router>
      <div className="min-h-screen">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Post-Op Health App</h1>

          <div className="flex space-x-4 items-center">
            <nav className="space-x-4">
              <NavLink
                to="/"
                className="text-white"
                activeClassName="text-yellow-300"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className="text-white"
                activeClassName="text-yellow-300"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/team"
                className="text-white"
                activeClassName="text-yellow-300"
              >
                Team
              </NavLink>
            </nav>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="ml-4 bg-white text-black px-2 py-1 rounded"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
