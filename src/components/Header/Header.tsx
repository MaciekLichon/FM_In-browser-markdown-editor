import React from 'react';
import './Header.scss';

import iconDelete from '../../assets/icon-delete.svg';
import iconSave from '../../assets/icon-save.svg';
import FileName from '../FileName/FileName';
import HeaderToggle from './HeaderToggle/HeaderToggle';

interface IProps {
    toggleMenu: () => void;
    isMenuOpen: boolean;
}

const Header: React.FC<IProps> = ({toggleMenu, isMenuOpen}) => {
    return (
        <header className="header">
            <HeaderToggle toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
            <div className="header__file">
                <FileName editable />
                <div className="header__file-buttons">
                    <button className="header__file-button">
                        <img src={iconDelete} alt="icon delete" />
                    </button>
                    <button className="header__file-button header__file-button_save button-action">
                        <img src={iconSave} alt="icon save" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;