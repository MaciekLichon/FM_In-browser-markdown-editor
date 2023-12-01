import React from "react";
import "./FileName.scss";

import { useDispatch, useSelector } from "react-redux";
import { updateActiveId } from "../../redux/selectedDocumentIdRedux";
import { getSavedActiveDocument } from "../../redux/documentsRedux";
import { useUnsavedDocumentContext } from "../../context/unsavedDocumentContext";

import iconDocument from "../../assets/icon-document.svg";
import { useModalToggleContext } from "../../context/modalContext";

interface IProps {
    id: string;
    fileName: string;
    dateAdded: string;
}

const FileNameButton: React.FC<IProps> = ({ id, dateAdded, fileName }) => {
    const dispatch = useDispatch();

    const setModalStatus = useModalToggleContext();
    const savedActiveDocument = useSelector(getSavedActiveDocument); // saved version of the CURRENT file (saved in redux)
    const { unsavedActiveDocument } = useUnsavedDocumentContext(); // potentially edited CURRENT file (saved in context state)

    // check if saved / unsaved before switching to another file
    const handleClick = () => {
        const equalNames = savedActiveDocument.name === unsavedActiveDocument.name;
        const equalContent = savedActiveDocument.content === unsavedActiveDocument.content;
        
        if (!equalContent || !equalNames) {
            setModalStatus("open-unsaved");
        } else {
            dispatch(updateActiveId(id));
        }
    };

    return (
        <button className="file-name" onClick={handleClick}>
            <img className="file-name__icon" src={iconDocument} alt="icon document" />
            <p className="text_body_s">{dateAdded}</p>
            <p className="text_body_l file-name__title">{fileName}</p>
        </button>
    );
};

export default FileNameButton;
