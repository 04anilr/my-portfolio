import React from 'react';
import "./footer.css";
import { FaDev } from "react-icons/fa";
import { VisitorCounter } from "./VisitorCounter";

export const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer_container container">
            <h1 className="footer_title">Anil Rajput</h1>

            <ul className="footer_list">
                <li>
                    <a href="#about" className="footer_link">About</a>
                </li>

                <li>
                    <a href="#skills" className="footer_link">Skills</a>
                </li>

                <li>
                    <a href="#services" className="footer_link">Services</a>
                </li>

                <li>
                    <a href="#portfolio" className="footer_link">Projects</a>
                </li>

                <li>
                    <a href="#qualification" className="footer_link">Qualification</a>
                </li>

                <li>
                    <a href="#blog" className="footer_link">Blog</a>
                </li>

                <li>
                    <a href="#/admin" className="footer_link">Library</a>
                </li>

                <li>
                    <a href="#contact" className="footer_link">Contact</a>
                </li>
            </ul>

            <div className="footer_social">
              <a href="https://dev.to/04anilr" className='footer_social-link' target='_blank' rel='noopener noreferrer'>
                <i className='uil'><FaDev /></i>
              </a>
              <a href="https://www.linkedin.com/in/anil-rajput-6411a4233/" className='footer_social-link' target='_blank' rel='noopener noreferrer'>
                <i className='uil uil-linkedin'></i>
              </a>
              <a href="https://github.com/04anilr" className='footer_social-link' target='_blank' rel='noopener noreferrer'>
                <i className='uil uil-github-alt'></i>
              </a>
            </div>
            <VisitorCounter />

            <span className="footer_copy">
                &#169; Anil Rajput. All rights reserved.
            </span>
        </div>
    </footer>
  )
}
