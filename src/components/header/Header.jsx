import React, { useState, useEffect } from 'react';
import "./header.css";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { PiArticleMediumBold } from "react-icons/pi";

const Header = ({ theme, toggleTheme, onProfileClick }) => {
    /* ================  change background Header  =================== */
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(".header");
            if (header) {
                if (window.scrollY >= 80) header.classList.add("show-header");
                else header.classList.remove("show-header");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ================  Toggle Menu  =================== */
    const [toggle, setToggle] = useState(false);
    const [activeNav, setActiveNav] = useState("#home");
    return (
        <header className='header'>
            <nav className='nav container'>
                <a href="#home" className='nav_logo'>
                    <span className="nav_logo-badge">AR</span>
                    <span className="nav_logo-text">Anil <span className="nav_logo-accent">Rajput</span></span>
                </a>
                <div className={toggle ? "nav_menu show-menu" : "nav_menu"}>
                    <ul className='nav_list grid'>
                        <li className='nav_item'>
                            <a href="#home" onClick={() => setActiveNav("#home")} className={activeNav === "#home" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-estate nav_icon"></i>
                                Home
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#/about" onClick={() => setActiveNav("#/about")} className={activeNav === "#/about" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-user nav_icon"></i>
                                About
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#skills" onClick={() => setActiveNav("#skills")} className={activeNav === "#skills" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-file-alt nav_icon"></i>
                                Skills
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#blog" onClick={() => setActiveNav("#blog")} className={activeNav === "#blog" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil nav_icon"><PiArticleMediumBold /></i>
                                Blogs
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#/playground" onClick={() => setActiveNav("#/playground")} className={activeNav === "#/playground" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-brackets-curly nav_icon"></i>
                                Playground
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#portfolio" onClick={() => setActiveNav("#portfolio")} className={activeNav === "#portfolio" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-scenery nav_icon"></i>
                                Projects
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#/admin" onClick={() => setActiveNav("#/admin")} className={activeNav === "#/admin" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-book-reader nav_icon"></i>
                                Library
                            </a>
                        </li>
                        <li className='nav_item'>
                            <a href="#contact" onClick={() => setActiveNav("#contact")} className={activeNav === "#contact" ? 'nav_link active_link' : "nav_link"}>
                                <i className="uil uil-message nav_icon"></i>
                                Contact
                            </a>
                        </li>
                    </ul>

                    <i className='uil uil-times nav_close' onClick={() => setToggle(!toggle)}></i>
                </div>
                <div className='nav_toggle' onClick={() => setToggle(!toggle)}>
                    <i className='uil uil-apps'></i>
                </div>
                {/*=================== controls area containing theme and profile ============================== */}
                <div className="nav_controls">
                    <div className='light_mode'>
                        <span onClick={toggleTheme}>
                            {theme === "light-theme" ? (
                                <span>
                                    <MdDarkMode />
                                </span>
                            ) : (
                                <span>
                                    <MdLightMode />
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="nav_profile-btn" onClick={onProfileClick} title="Open Developer Profile">
                        <i className="uil uil-user-circle"></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
