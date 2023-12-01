import React from "react";
import Layout from "./components/Layout/Layout";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SidebarContextProvider } from "./context/sideBarContext";
import { ModalContextProvider } from "./context/modalContext";
import { UnsavedDocumentContextProvider } from "./context/unsavedDocumentContext";

const App: React.FC = () => {
  return (
    <UnsavedDocumentContextProvider>
      <DarkModeContextProvider>
        <SidebarContextProvider>
          <ModalContextProvider>
            <Layout />
          </ModalContextProvider>
        </SidebarContextProvider>
      </DarkModeContextProvider>
    </UnsavedDocumentContextProvider>
  );
};

export default App;
