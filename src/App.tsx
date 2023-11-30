import React from 'react';
import Layout from './components/Layout/Layout';
import { DarkModeContextProvider } from './context/darkModeContext';
import { SidebarContextProvider } from './context/sideBarContext';

const App: React.FC = () => {
  return (
    <DarkModeContextProvider>
      <SidebarContextProvider>
        <Layout />
      </SidebarContextProvider>
    </DarkModeContextProvider>
  );
};

export default App;
