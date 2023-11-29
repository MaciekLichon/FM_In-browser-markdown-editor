import React, {useEffect, useState} from 'react';
import './Layout.scss';

import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux';
import { getActiveDocument, getAllDocuments, removeDocument, editDocument, addDocument } from '../../redux/documentsRedux';

import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';
import { updateActiveId } from '../../redux/activeDocumentRedux';
import { IDocument } from '../../redux/initialState';


const Layout: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const activeDocument = useSelector(getActiveDocument);
    const allDocuments = useSelector(getAllDocuments);
    const [documentData, setDocumentData] = useState(activeDocument);

    useEffect(() => {
        setDocumentData(activeDocument);
    }, [activeDocument]);

    const dispatch = useDispatch();

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

    const changeDocument = (document: IDocument) => {
        dispatch(editDocument({...document}))
    };

    const adjustNumber = (number: number) => {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    const getTodaysDate = () => {
        const date = new Date();

        const day = adjustNumber(date.getDate());
        const month = adjustNumber(date.getMonth() + 1);
        const year = adjustNumber(date.getFullYear());

        return `${day}-${month}-${year}`;
    }

    const createDocument = () => {
        const id = uuidv4();
        dispatch(addDocument(
            {
                id: id,
                createdAt: getTodaysDate(),
                name: `${id}.md`,
                content: "",
            },
        ));
        dispatch(updateActiveId(id));
    };

    const updateFileName = (fileName: string) => {
        setDocumentData({...documentData, name: fileName})
    };

    const updateMarkup = (markup: string) => {
        setDocumentData({...documentData, content: markup})
    };
    
    return (
        <main className={`main ${isMenuOpen ? 'main_open' : ''}`}>
            <section className="main__menu">
                <SideBar createDocument={createDocument} />
            </section>
            <section className="main__content">
                <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} documentData={documentData} updateFileName={updateFileName} deleteDocument={deleteDocument} changeDocument={changeDocument}/>
                <Editor content={documentData.content} updateMarkup={updateMarkup} />
            </section>
        </main>
    );
};

export default Layout;