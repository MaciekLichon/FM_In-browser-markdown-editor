import React from 'react';
import './FileName.scss';

import iconDocument from '../../assets/icon-document.svg';

interface IProps {
    fileName: string;
    updateFileName: (v: string) => void;   
}

const FileNameInput: React.FC<IProps> = ({fileName, updateFileName}) => {
    
    return (
        <div className="file-name">
            <img className="file-name__icon" src={iconDocument} alt="icon document" />
            <input type="text" className="file-name__input text_body_l" value={fileName} onChange={(e) => updateFileName(e.target.value)}/>
            <p className="text_body_s">Document name</p>
        </div>
    );
};

export default FileNameInput;