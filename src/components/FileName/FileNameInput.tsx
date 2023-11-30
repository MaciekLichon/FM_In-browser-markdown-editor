import React from 'react';
import './FileName.scss';

import iconDocument from '../../assets/icon-document.svg';

import { useDocumentContext } from '../../context/documentContext';


const FileNameInput: React.FC = () => {

    const {documentData, setDocumentData} = useDocumentContext();
    
    return (
        <div className="file-name">
            <img className="file-name__icon" src={iconDocument} alt="icon document" />
            <input type="text" className="file-name__input text_body_l" value={documentData.name} onChange={(e) => setDocumentData({...documentData, name: e.target.value})}/>
            <p className="text_body_s">Document name</p>
        </div>
    );
};

export default FileNameInput;
