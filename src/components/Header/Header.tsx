import React from "react";
import "./Header.scss";

import { IDocument } from "../../redux/initialState";

import iconDelete from "../../assets/icon-delete.svg";
import iconSave from "../../assets/icon-save.svg";
import logo from '../../assets/logo.svg';

import HeaderToggle from "./HeaderToggle/HeaderToggle";
import FileNameInput from "../FileName/FileNameInput";
import { useDocumentContext } from "../../context/documentContext";

interface IProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
  deleteDocument: (v: string) => void;
  saveDocument: (v: IDocument) => void;
}


const Header: React.FC<IProps> = ({ toggleMenu, isMenuOpen, deleteDocument, saveDocument }) => {

    const {documentData} = useDocumentContext();

    return (
        <header className="header">
            <HeaderToggle toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <div className="header__logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header__file">
                <FileNameInput />
                <div className="header__file-buttons">
                    <button className="header__file-button" onClick={() => deleteDocument(documentData.id)}>
                        <img src={iconDelete} alt="icon delete" />
                    </button>
                    <button className="header__file-button header__file-button_save button-action" onClick={() => saveDocument(documentData)}>
                        <img src={iconSave} alt="icon save" />
                        <p className="text_body_l">Save Changes</p>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
