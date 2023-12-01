import React from "react";
import "./Layout.scss";

import { v4 as uuidv4 } from "uuid";
import { getTodaysDate } from "../../utils";

import { useSelector, useDispatch } from "react-redux";
import { IDocument } from "../../redux/initialState";
import { getSavedActiveDocument, getAllDocuments, removeDocument, editDocument, addDocument, } from "../../redux/documentsRedux";
import { updateActiveId } from "../../redux/selectedDocumentIdRedux";

import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import Editor from "../Editor/Editor";
import Modal from "../Modal/Modal";
import { useUnsavedDocumentContext } from "../../context/unsavedDocumentContext";
import { useDarkModeContext } from "../../context/darkModeContext";
import { useSidebarContext } from "../../context/sideBarContext";
import { useModalContext, useModalToggleContext, } from "../../context/modalContext";

const Layout: React.FC = () => {
    
    const isSidebarOpen = useSidebarContext();
    const isDarkMode = useDarkModeContext();
    const modalStatus = useModalContext();
    const setModalStatus = useModalToggleContext();
    const { unsavedActiveDocument } = useUnsavedDocumentContext();  // potentially edited CURRENT file (saved in context state)

    const dispatch = useDispatch();
    const savedActiveDocument = useSelector(getSavedActiveDocument); // saved version of the CURRENT file (saved in redux)
    const allDocuments = useSelector(getAllDocuments);

    const createDocument = () => {
        // check if saved / unsaved before switching to another file
        const equalNames = savedActiveDocument.name === unsavedActiveDocument.name;
        const equalContent = savedActiveDocument.content === unsavedActiveDocument.content;

        if (!equalContent || !equalNames) {
            setModalStatus("open-unsaved");
        } else {
            const id = uuidv4();
            const newDocument: IDocument = {
                id: id,
                createdAt: getTodaysDate(),
                name: `${id}.md`,
                content: "",
            };
            dispatch(addDocument(newDocument));
            dispatch(updateActiveId(id));
        }
    };

    const deleteDocument = () => {
        let firstAvailableId = "";

        if (allDocuments[0].id !== savedActiveDocument.id) { // savedActiveDocument.id - id of the document that is being deleted
            // default view to the 1st document
            firstAvailableId = allDocuments[0].id;
        } else {
            // if I'm removing the very first one or the only one (both index = 0)
            if (allDocuments[1]) {
                firstAvailableId = allDocuments[1].id;
            }
        }

        firstAvailableId === "" ? createDocument() : dispatch(updateActiveId(firstAvailableId));

        dispatch(removeDocument(savedActiveDocument.id));
        setModalStatus("closed");
    };

    const saveDocument = (document: IDocument) => {
        dispatch(editDocument({ ...document }));
        setModalStatus("closed");
    };
    

    return (
        <main className={`main ${isSidebarOpen ? "main_open" : ""} ${ isDarkMode ? "darkmode" : "" }`} >
            <section className="main__menu">
                <SideBar createDocument={createDocument} />
            </section>
            <section className="main__content">
                <Header saveDocument={saveDocument} />
                <Editor />
            </section>
            {modalStatus === "open-delete" && (
                <Modal
                    title="Delete this document?"
                    message={`Are you sure you want to delete the '${savedActiveDocument.name}' document and its contents? This action cannot be reversed.`}
                    buttonPrimaryText="Confirm & Delete"
                    actionPrimary={deleteDocument}
                />
            )}
            {modalStatus === "open-unsaved" && (
                <Modal
                    title="Unsaved changes!"
                    message={`There have been some changes made to the '${savedActiveDocument.name}' document? Would you like to save them?`}
                    buttonPrimaryText="Confirm & Save"
                    actionPrimary={() => saveDocument(unsavedActiveDocument)} // replace saved with unsaved
                    buttonSecondaryText="Discard changes"
                    actionSecondary={() => saveDocument(savedActiveDocument)} // keep saved, don't replace
                />
            )}
        </main>
    );
};

export default Layout;
