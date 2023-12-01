import React from "react";
import "./FileName.scss";

import iconDocument from "../../assets/icon-document.svg";

import { useUnsavedDocumentContext } from "../../context/unsavedDocumentContext";

const FileNameInput: React.FC = () => {

    const { unsavedActiveDocument, setUnsavedActiveDocument } = useUnsavedDocumentContext();

    return (
        <div className="file-name">
            <img className="file-name__icon" src={iconDocument} alt="icon document" />
            <input
                type="text"
                className="file-name__input text_body_l"
                value={unsavedActiveDocument.name}
                onChange={(e) => setUnsavedActiveDocument({ ...unsavedActiveDocument, name: e.target.value })}
            />
            <p className="text_body_s">Document name</p>
        </div>
    );
};

export default FileNameInput;
