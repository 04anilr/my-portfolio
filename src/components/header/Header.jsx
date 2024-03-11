import React, { useState } from 'react';
import "./header.css"; 
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Header = ({theme, toggleTheme}) => {
/* ================  change background Header  =================== */
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (this.scrollY >= 80) header.classList.add("show-header");
    else header.classList.remove("show-header");
});

    /* ================  Toggle Menu  =================== */
    const [toggle, setToggle] = useState(false);
    const [activeNav, setActiveNav] = useState("#home");
  return (
<header className='header'>
    <nav className='nav container'>
        <a href="index.html" className='nav_logo'>Anilrajput</a>
        <div className={toggle ? "nav_menu show-menu" :"nav_menu"}>
            <ul className='nav_list grid'>
                <li className='nav_item'>
                    <a href="#home" onClick={() => setActiveNav("#home")} className={activeNav === "#home" ?'nav_link active_link' : "nav_link"}>
                        <i className="uil uil-estate nav_icon"></i>
                        Home
                    </a>
                </li> 
                <li className='nav_item'>
                    <a href="#about" onClick={() => setActiveNav("#about")} className={activeNav === "#about" ?'nav_link active_link' : "nav_link"}>
                        <i className="uil uil-user nav_icon"></i>
                        About
                    </a>
                </li>
                <li className='nav_item'>
                    <a href="#skills" onClick={() => setActiveNav("#skills")} className={activeNav === "#skills" ?'nav_link active_link' : "nav_link"}>
                        <i className="uil uil-file-alt nav_icon"></i>
                        Skills
                    </a>
                </li>
                <li className='nav_item'>
                    <a href="#portfolio" onClick={() => setActiveNav("#project")} className={activeNav === "#project" ?'nav_link active_link' : "nav_link"}>
                        <i className="uil uil-scenery nav_icon"></i>
                         Project
                    </a>
                </li>
                <li className='nav_item'>
                    <a href="#contact" onClick={() => setActiveNav("#contact")} className={activeNav === "#contact" ?'nav_link active_link' : "nav_link"}>
                        <i className="uil uil-message nav_icon"></i> 
                        contact
                    </a>
                </li>
            </ul>
            
            <i className='uil uil-times nav_close' onClick={() => setToggle(!toggle)}></i>
        </div>
        <div className='nav_toggle' onClick={() => setToggle(!toggle)}>
            <i className='uil uil-apps'></i>
        </div>
{/*=================== light mode function ============================== */}
        <div className='light_mode'>
            <span onClick = {toggleTheme}>
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
    </nav>
</header>
  )
}

export default Header