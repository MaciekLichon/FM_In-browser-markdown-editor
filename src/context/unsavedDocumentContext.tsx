import React, { createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSavedActiveDocument } from "../redux/documentsRedux";
import { IDocument } from "../redux/initialState";

/* ----------- THIS CONTEXT HOLDS EDITED AND UNSAVED DOCUMENT'S DATA I.E. NAME AND MARKUP ----------- */

/* ---- create context ---- */
interface IUnsavedDocumentContextValue {
  unsavedActiveDocument: IDocument;
  setUnsavedActiveDocument: React.Dispatch<React.SetStateAction<IDocument>>;
}

export const UnsavedDocumentContext = createContext< IUnsavedDocumentContextValue | undefined >(undefined);

/* ---- create context provider (wrapper) ---- */
interface IProps {
  children: React.ReactNode;
}

export const UnsavedDocumentContextProvider: React.FC<IProps> = ({ children, }) => {
  const savedActiveDocument = useSelector(getSavedActiveDocument);
  const [unsavedActiveDocument, setUnsavedActiveDocument] = useState<IDocument>(savedActiveDocument);

  useEffect(() => {
    setUnsavedActiveDocument(savedActiveDocument);
  }, [savedActiveDocument]);

  return (
    <UnsavedDocumentContext.Provider value={{ unsavedActiveDocument, setUnsavedActiveDocument }} >
      {children}
    </UnsavedDocumentContext.Provider>
  );
};

/* ---- create custom hook that never returns 'undefined' ---- */
export const useUnsavedDocumentContext = () => {
  const unsavedDocumentContext = useContext(UnsavedDocumentContext);

  if (unsavedDocumentContext === undefined) {
    throw new Error( "useUnsavedDocumentContext must be used with a UnsavedDocumentContext" ); }

  return unsavedDocumentContext;
};
