import React from 'react';

const Navbar = ({ setActiveSection }) => {
  return (
    <header className="bg-blue-700 p-4 text-white">
      <nav className="flex space-x-4">
        <button onClick={() => setActiveSection('home')}>HOME</button>
        <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveSection('team')}>Team</button>
      </nav>
    </header>
  );
};

export default Navbar;
