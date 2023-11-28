import React from 'react';
import './SideBar.scss';

import logo from '../../assets/logo.svg';

const SideBar: React.FC = () => {
    return (
        <aside className="sidebar">
            <img src={logo} alt="logo" className="sidebar__logo"/>
            <p className="sidebar__text text_body_m-spaced">My documents</p>
            <button className="button-action text_body_l">+ New Document</button>
        </aside>
    );
};

export default SideBar;