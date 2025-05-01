// src/context/RoleContext.jsx

import React, { createContext, useContext, useState } from 'react';

// Create a context to store the user role (doctor/patient)
const RoleContext = createContext();

// Provider component to wrap the app and provide role state
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('patient'); // default to patient

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook to use role context
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
