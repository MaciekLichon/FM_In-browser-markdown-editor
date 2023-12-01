import React, { createContext, useState, useContext } from "react";

/* ---- create context ---- */
type IModalContextValue = 'open-unsaved' | 'open-delete' | 'closed';
type IModalToggleContextValue = (value: IModalContextValue) => void;


export const ModalContext = createContext<IModalContextValue | undefined>(undefined);
export const ModalToggleContext = createContext<IModalToggleContextValue | undefined>(undefined);

/* ---- create context provider (wrapper) ---- */
interface IProps {
    children: React.ReactNode;
}

export const ModalContextProvider: React.FC<IProps> = ({children}) => {

    const [modalStatus, setModalStatus] = useState<IModalContextValue>('closed');
    const showModal: IModalToggleContextValue = (value) => {
        setModalStatus(value);
    }

    return (
        <ModalContext.Provider value={modalStatus}>
            <ModalToggleContext.Provider value={showModal}>
                {children}
            </ModalToggleContext.Provider>
        </ModalContext.Provider>
    );
};

/* ---- create custom hook that never returns 'undefined' ---- */
export const useModalContext = () => {
    const modalContext = useContext(ModalContext);

    if (modalContext === undefined) {
        throw new Error('useModalContext must be used with a ModalContext');
    }

    return modalContext;
}

export const useModalToggleContext = () => {
    const modalToggleContext = useContext(ModalToggleContext);

    if (modalToggleContext === undefined) {
        throw new Error('useModalToggleContext must be used with a ModalToggleContext');
    }

    return modalToggleContext;
}