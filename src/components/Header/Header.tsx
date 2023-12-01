import React from "react";
import "./Header.scss";

import { IDocument } from "../../redux/initialState";

import iconSave from "../../assets/icon-save.svg";
import logo from '../../assets/logo.svg';

import HeaderToggle from "./HeaderToggle/HeaderToggle";
import FileNameInput from "../FileName/FileNameInput";
import { useDocumentContext } from "../../context/documentContext";
import { useModalToggleContext } from "../../context/modalContext";


interface IProps {
  saveDocument: (v: IDocument) => void;
}

const Header: React.FC<IProps> = ({ saveDocument }) => {

    const {documentData} = useDocumentContext();
    const setModalStatus = useModalToggleContext();

    return (
        <header className="header">
            <HeaderToggle />
            <div className="header__logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header__file">
                <FileNameInput />
                <div className="header__file-buttons">
                    <button className="header__file-button header__file-button_delete" onClick={() => setModalStatus('open-delete')}>
                        <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z" fill="#7C8187"/></svg>
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
