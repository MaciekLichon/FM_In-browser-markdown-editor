import React from 'react';
import Layout from './components/Layout/Layout';
import { DarkModeContextProvider } from './context/darkModeContext';
import { SidebarContextProvider } from './context/sideBarContext';
import { ModalContextProvider } from './context/modalContext';
import { DocumentContextProvider } from './context/documentContext';

const App: React.FC = () => {
  return (
    <DocumentContextProvider>
      <DarkModeContextProvider>
        <SidebarContextProvider>
          <ModalContextProvider>
            <Layout />
          </ModalContextProvider>
        </SidebarContextProvider>
      </DarkModeContextProvider>
    </DocumentContextProvider>
  );
};

export default App;
