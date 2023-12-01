import React from "react";
import "./SideBar.scss";

import { useSelector } from "react-redux";
import { getAllDocuments } from "../../redux/documentsRedux";

import FileNameButton from "../FileName/FileNameButton";

import logo from "../../assets/logo.svg";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface IProps {
  createDocument: () => void;
}

const SideBar: React.FC<IProps> = ({ createDocument }) => {
    
    const documents = useSelector(getAllDocuments);

    return (
        <aside className="sidebar">
            <img src={logo} alt="logo" className="sidebar__logo" />
            <p className="sidebar__text text_body_m-spaced">My documents</p>
            <button className="button-action text_body_l" onClick={createDocument}>+ New Document</button>
            {documents.map((document) => (
                <FileNameButton
                    key={document.id}
                    id={document.id}
                    dateAdded={document.createdAt}
                    fileName={document.name}
                />
            ))}
            <div className="sidebar__theme-toggle">
                <ThemeToggle />
            </div>
        </aside>
    );
};

export default SideBar;
