'use client';

import React, { createContext, useContext, useState } from 'react';

interface ApplicationContextType {
  isApplicationOpen: boolean;
  setIsApplicationOpen: (open: boolean) => void;
  openApplication: () => void;
  closeApplication: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const openApplication = () => setIsApplicationOpen(true);
  const closeApplication = () => setIsApplicationOpen(false);

  return (
    <ApplicationContext.Provider
      value={{
        isApplicationOpen,
        setIsApplicationOpen,
        openApplication,
        closeApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};
