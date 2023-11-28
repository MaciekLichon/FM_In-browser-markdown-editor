import React from 'react';
import './FileName.scss';

import iconDocument from '../../assets/icon-document.svg';

interface IProps {
    editable?: boolean;
}

const FileName: React.FC<IProps> = ({editable}) => {
    return (
        <>
            {editable && <div className="file-name">
                <img className="file-name__icon" src={iconDocument} alt="icon document" />
                <input type="text" className="file-name__input text_body_l" value='welcome.md'/>
                <p className="text_body_s">Document name</p>
            </div>}
            {!editable && <div className="file-name">
                <img className="file-name__icon" src={iconDocument} alt="icon document" />
                <p className="text_body_s">Document name</p>
                <p className=" text_body_l">welcome.md</p>
            </div>}
        </>
    );
};

export default FileName;