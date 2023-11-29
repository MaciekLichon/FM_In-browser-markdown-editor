import React from "react";
import "./Header.scss";

import { IDocument } from "../../redux/initialState";
import { useDispatch } from "react-redux";
import { removeDocument } from "../../redux/documentsRedux";

import iconDelete from "../../assets/icon-delete.svg";
import iconSave from "../../assets/icon-save.svg";

import HeaderToggle from "./HeaderToggle/HeaderToggle";
import FileNameInput from "../FileName/FileNameInput";

interface IProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  documentData: IDocument;
  updateFileName: (v: string) => void;
  deleteDocument: (v: string) => void;
  changeDocument: (v: IDocument) => void;
}


const Header: React.FC<IProps> = ({ toggleMenu, isMenuOpen, documentData, updateFileName, deleteDocument, changeDocument }) => {

    return (
        <header className="header">
            <HeaderToggle toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className="header__file">
                <FileNameInput fileName={documentData.name} updateFileName={updateFileName}/>
                <div className="header__file-buttons">
                    <button className="header__file-button" onClick={() => deleteDocument(documentData.id)}>
                        <img src={iconDelete} alt="icon delete" />
                    </button>
                    <button className="header__file-button header__file-button_save button-action" onClick={() => changeDocument(documentData)}>
                        <img src={iconSave} alt="icon save" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
