import React from 'react';
import './HeaderToggle.scss';

interface IProps {
    toggleMenu: () => void;
    isMenuOpen: boolean;
}

const HeaderToggle: React.FC<IProps> = ({toggleMenu, isMenuOpen}) => {
    return (
        <button className={`header__toggle ${isMenuOpen ? 'header__toggle_open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default HeaderToggle;