import React from 'react';
import './HeaderToggle.scss';

import { useSidebarContext, useSidebarToggleContext } from '../../../context/sideBarContext';

const HeaderToggle: React.FC = () => {

    const isSidebarOpen = useSidebarContext();
    const toggleSidebar = useSidebarToggleContext();

    return (
        <button className={`header__toggle ${isSidebarOpen ? 'header__toggle_open' : ''}`} onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default HeaderToggle;