import React, {useState} from 'react';
import './Layout.scss';

import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';


const Layout: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <main className={`main ${isMenuOpen ? 'main_open' : ''}`}>
            <section className="main__menu">
                <SideBar />
            </section>
            <section className="main__content">
                <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
                <Editor />
            </section>
        </main>
    );
};

export default Layout;