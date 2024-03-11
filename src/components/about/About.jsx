import React from 'react';
import "./about.css";
import AboutImg from "../../assets/profile-pic (4).png";
import { Info } from './Info';
import { FaArrowCircleDown } from "react-icons/fa";

export const About = () => {
  const CV = "https://drive.google.com/file/d/1oJ1l7Gm0xJA6yg9jZxKu2l9ikVtNNkQc/view?usp=drive_link";
    return (
        <section className="about section" id="about">
            <h2 className="section_title">About Me</h2>
            <span className="section_subtitle">My introduction</span>

            <div className="about_container container grid">
                <img src={AboutImg} alt="" className="about_img" />
                <div className="about_data">
                    <Info />
                    <p className="about_description">
                        Hello! I'm a <span className='about_title'>Frontend developer, </span> 
                        I create web page with <span className='about_title'>React</span> user interface,
                        I have fresher experience but many clients are happy with the project carried out. 
                        </p>
                        <a download="" href={CV} className="button button--flex">
                            Download CV <FaArrowCircleDown className='cv-icon' />
                        </a>
                </div>
            </div>
        </section>
    )
}
