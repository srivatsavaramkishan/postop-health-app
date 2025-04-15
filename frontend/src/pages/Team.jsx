// src/pages/Team.jsx

import React from 'react';

const Team = () => {
  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Our Team</h2>
      <div className="mb-6">
        <h3 className="text-blue-700 text-xl">Team Member 1</h3>
        <p className="text-gray-600 mb-2">Full Stack Developer - Specialized in Backend APIs and Database Management.</p>
      </div>

      <div className="mb-6">
        <h3 className="text-blue-700 text-xl">Team Member 2</h3>
        <p className="text-gray-600 mb-2">Frontend Developer - Expert in React.js, UI Design and API Integration.</p>
      </div>

      <div className="mb-6">
        <h3 className="text-blue-700 text-xl">Team Member 3</h3>
        <p className="text-gray-600 mb-2">Data Analyst - Working on PowerBI Visualizations and Healthcare Data Reporting.</p>
      </div>

      <div className="mb-6">
        <h3 className="text-blue-700 text-xl">Team Member 4</h3>
        <p className="text-gray-600 mb-2">DevOps Engineer - Handling Deployment, Cloud Infrastructure and Backend Hosting.</p>
      </div>
    </section>
  );
};

export default Team;
