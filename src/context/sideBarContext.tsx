import React, { createContext, useState, useContext } from "react";

/* ---- create context ---- */
type ISidebarContextValue = boolean;
type ISidebarToggleContextValue = React.MouseEventHandler<HTMLButtonElement>;


export const SidebarContext = createContext<ISidebarContextValue | undefined>(undefined);
export const SidebarToggleContext = createContext<ISidebarToggleContextValue | undefined>(undefined);

/* ---- create context provider (wrapper) ---- */
interface IProps {
    children: React.ReactNode;
}

export const SidebarContextProvider: React.FC<IProps> = ({children}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(isSidebarOpen => !isSidebarOpen);
    }

    return (
        <SidebarContext.Provider value={isSidebarOpen}>
            <SidebarToggleContext.Provider value={toggleSidebar}>
                {children}
            </SidebarToggleContext.Provider>
        </SidebarContext.Provider>
    );
};

/* ---- create custom hook that never returns 'undefined' ---- */
export const useSidebarContext = () => {
    const sidebarContext = useContext(SidebarContext);

    if (sidebarContext === undefined) {
        throw new Error('useSidebarContext must be used with a SidebarContext');
    }

    return sidebarContext;
}

export const useSidebarToggleContext = () => {
    const sidebarToggleContext = useContext(SidebarToggleContext);

    if (sidebarToggleContext === undefined) {
        throw new Error('useSidebarToggleContext must be used with a SidebarToggleContext');
    }

    return sidebarToggleContext;
}