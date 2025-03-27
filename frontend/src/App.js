import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <header className="bg-blue-600 text-white p-4 flex justify-between">
          <h1 className="text-xl font-bold">Post-Op Health App</h1>
          <nav className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/team">Team</Link>
          </nav>
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
