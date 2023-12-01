import React from 'react';
import './Layout.scss';

import { v4 as uuidv4 } from 'uuid';
import { getTodaysDate } from '../../utils';

import { useSelector, useDispatch } from 'react-redux';
import { IDocument } from '../../redux/initialState';
import { getActiveDocument, getAllDocuments, removeDocument, editDocument, addDocument } from '../../redux/documentsRedux';
import { updateActiveId } from '../../redux/activeDocumentRedux';

import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';
import Modal from '../Modal/Modal';
import { useDocumentContext } from '../../context/documentContext';
import { useDarkModeContext } from '../../context/darkModeContext';
import { useSidebarContext } from '../../context/sideBarContext';
import { useModalContext, useModalToggleContext } from '../../context/modalContext';


const Layout: React.FC = () => {

    const isSidebarOpen = useSidebarContext();
    const isDarkMode = useDarkModeContext();
    const modalStatus = useModalContext();
    const setModalStatus = useModalToggleContext();
    const {documentData} = useDocumentContext();
    
    
    const dispatch = useDispatch();
    const activeDocument = useSelector(getActiveDocument);
    const allDocuments = useSelector(getAllDocuments);
        
    const createDocument = () => {
        const equalNames = activeDocument.name === documentData.name;
        const equalContent = activeDocument.content === documentData.content;
    
        if (!equalContent || !equalNames) {
          setModalStatus('open-unsaved');
        } else {
            const id = uuidv4();
            const newDocument: IDocument = {
                id: id,
                createdAt: getTodaysDate(),
                name: `${id}.md`,
                content: "",
            }
            dispatch(addDocument(newDocument));
            dispatch(updateActiveId(id));
        }
    };
        
    const deleteDocument = (currentId: string) => {
        let firstAvailableId = '';
                    
        if (allDocuments[0].id !== activeDocument.id) {
            // default view to the 1st document
            firstAvailableId = allDocuments[0].id;
        } else {
            // if I'm removing the very first one or the only one (both index = 0)
            if (allDocuments[1]) {
                firstAvailableId = allDocuments[1].id
            }
        }

        firstAvailableId === '' ? createDocument() : dispatch(updateActiveId(firstAvailableId));

        dispatch(removeDocument(currentId));
        setModalStatus('closed');
    };

    const saveDocument = (document: IDocument) => {
        dispatch(editDocument({...document}));
        setModalStatus('closed');
    };

    
    return (
        <main className={`main ${isSidebarOpen ? 'main_open' : ''} ${isDarkMode ? 'darkmode' : ''}`}>
            <section className="main__menu">
                <SideBar createDocument={createDocument} />
            </section>
            <section className="main__content">
                <Header saveDocument={saveDocument}/>
                <Editor />
            </section>
            {modalStatus === 'open-delete' && <Modal 
                title='Delete this document?' 
                message={`Are you sure you want to delete the '${activeDocument.name}' document and its contents? This action cannot be reversed.`} 
                buttonPrimaryText='Confirm & Delete' 
                actionPrimary={() => deleteDocument(activeDocument.id)} 
            />}
            {modalStatus === 'open-unsaved' && <Modal 
                title='Unsaved changes!' 
                message={`There have been some changes made to the '${activeDocument.name}' document? Would you like to save them?`} 
                buttonPrimaryText='Confirm & Save' 
                actionPrimary={() => saveDocument(documentData)} 
                buttonSecondaryText='Discard changes'
                actionSecondary={() => saveDocument(activeDocument)}
            />}
        </main>
    );
};

export default Layout;