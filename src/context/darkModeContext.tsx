import React, { createContext, useState, useContext } from "react";

/* ----------- THIS CONTEXT HOLDS EDITED AND UNSAVED DOCUMENT'S DATA I.E. NAME AND MARKUP ----------- */

/* ---- create context ---- */
type IDarkModeContextValue = boolean;
type IDarkModeToggleContextValue = React.MouseEventHandler<HTMLButtonElement>;


export const DarkModeContext = createContext<IDarkModeContextValue | undefined>(undefined);
export const DarkModeToggleContext = createContext<IDarkModeToggleContextValue | undefined>(undefined);

/* ---- create context provider (wrapper) ---- */
interface IProps {
    children: React.ReactNode;
}

export const DarkModeContextProvider: React.FC<IProps> = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const toggleDarkMode = () => {
        setIsDarkMode(darkMode => !darkMode);
    }

    return (
        <DarkModeContext.Provider value={isDarkMode}>
            <DarkModeToggleContext.Provider value={toggleDarkMode}>
                {children}
            </DarkModeToggleContext.Provider>
        </DarkModeContext.Provider>
    );
};

/* ---- create custom hook that never returns 'undefined' ---- */
export const useDarkModeContext = () => {
    const darkModeContext = useContext(DarkModeContext);

    if (darkModeContext === undefined) {
        throw new Error('useDarkModeContext must be used with a DarkModeContext');
    }

    return darkModeContext;
}

export const useDarkModeToggleContext = () => {
    const darkModeToggleContext = useContext(DarkModeToggleContext);

    if (darkModeToggleContext === undefined) {
        throw new Error('useDarkModeToggleContext must be used with a DarkModeToggleContext');
    }

    return darkModeToggleContext;
}