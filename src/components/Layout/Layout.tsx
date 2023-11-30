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
import { DocumentContextProvider } from '../../context/documentContext';
import { useDarkModeContext } from '../../context/darkModeContext';
import { useSidebarContext } from '../../context/sideBarContext';


const Layout: React.FC = () => {

    const isSidebarOpen = useSidebarContext();
    const isDarkMode = useDarkModeContext();
    
    const dispatch = useDispatch();
    const activeDocument = useSelector(getActiveDocument);
    const allDocuments = useSelector(getAllDocuments);
        
    const createDocument = () => {
        const id = uuidv4();
        const newDocument: IDocument = {
            id: id,
            createdAt: getTodaysDate(),
            name: `${id}.md`,
            content: "",
        }
        dispatch(addDocument(newDocument));
        dispatch(updateActiveId(id));
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
    };

    const saveDocument = (document: IDocument) => {
        dispatch(editDocument({...document}))
    };

    
    return (
        <main className={`main ${isSidebarOpen ? 'main_open' : ''} ${isDarkMode ? 'darkmode' : ''}`}>
            <DocumentContextProvider>
                <section className="main__menu">
                    <SideBar createDocument={createDocument} />
                </section>
                <section className="main__content">
                    <Header deleteDocument={deleteDocument} saveDocument={saveDocument}/>
                    <Editor />
                </section>
            </DocumentContextProvider>
        </main>
    );
};

export default Layout;