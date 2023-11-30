import React, { createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { getActiveDocument } from "../redux/documentsRedux";
import { IDocument } from "../redux/initialState";

/* ----------- THIS CONTEXT HOLDS EDITED AND UNSAVED DOCUMENT'S DATA I.E. NAME AND MARKUP ----------- */

/* ---- create context ---- */
interface IDocumentContextValue {
    documentData: IDocument;
    setDocumentData: React.Dispatch<React.SetStateAction<IDocument>>
}

export const DocumentContext = createContext<IDocumentContextValue | undefined>(undefined);

/* ---- create context provider (wrapper) ---- */
interface IProps {
    children: React.ReactNode;
}

export const DocumentContextProvider: React.FC<IProps> = ({children}) => {

    const activeDocument = useSelector(getActiveDocument);
    const [documentData, setDocumentData] = useState<IDocument>(activeDocument);

    useEffect(() => {
        setDocumentData(activeDocument);
    }, [activeDocument]);

    return (
        <DocumentContext.Provider value={{documentData, setDocumentData}}>
            {children}
        </DocumentContext.Provider>
    );
};

/* ---- create custom hook that never returns 'undefined' ---- */
export const useDocumentContext = () => {
    const documentContext = useContext(DocumentContext);

    if (documentContext === undefined) {
        throw new Error('useDocumentContext must be ysed with a DocumentContext');
    }

    return documentContext;
}