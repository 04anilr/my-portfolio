import React, { useState } from 'react';
import "./services.css";
export const Services = () => {
    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    }

  return (
        <section className="services section" id="services">
        <h2 className="section_title">Services</h2>
        <span className="section_subtitle">What i offer</span>

        <div className="services_container container grid">
            <div className="services_content">
               <div>
               <i className="uil uil-web-grid services_icon"></i>
                <h3 className="services_title">Prodect <br /> Designer</h3>
               </div>
               <span className="services_button" onClick={() => toggleTab(1)} >
                View More <i className="uil uil-arrow-right 
               services_button-icon"></i> </span>

               <div className= {toggleState === 1 ? "services_modal active-modal" : "services_modal"}>
                <div className="services_modal-content">
                    <i onClick={() => toggleTab(0)} className="uil uil-times services_modal-close"></i>
                    <h3 className="services_modal-title">Prodect Designer</h3>
                    <p className="services_modal-description">I have fresher experience but reletive 
                   experience more then 1 year to college
                    project.</p>
                    <ul className="services_modal-services grid">
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                            Custom Website Design with Interactive User.
                            </p>
                        </li>

                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                            Content Strategy and Website Copywriting
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                            Frontend Development.
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                               I position your company brand.
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Design and mockups of prodects for companies.
                            </p>
                        </li>
                    </ul>
                </div>
               </div>
            </div>

            <div className="services_content">
               <div>
               <i className="uil uil-arrow services_icon"></i>
                <h3 className="services_title">Software <br /> Applications</h3>
               </div>
               <span onClick={() => toggleTab(2)} className="services_button">View More <i className="uil uil-arrow-right 
               services_button-icon"></i> </span>

               <div className= {toggleState === 2 ? "services_modal active-modal" : "services_modal"}>
                <div className="services_modal-content">
                    <i  onClick={() => toggleTab(0)} className="uil uil-times services_modal-close"></i>
                    <h3 className="services_modal-title">UI/UX Designer</h3>
                    <p className="services_modal-description">I have experience of this Software & Applications
                    for development.</p>
                    <ul className="services_modal-services grid">
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Git, github desktop to use for version control.
                            </p>
                        </li>

                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Vercel for depolyment of your project.
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Figma to use for create UI .
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                               npm note.js environment.
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Netlify to use for depolyment of project.
                            </p>
                        </li>
                    </ul>
                </div>
               </div>
            </div>

            <div className="services_content">
               <div>
               <i className="uil uil-edit services_icon"></i>
                <h3 className="services_title">Development <br /> Tool</h3>
               </div>
               <span onClick={() => toggleTab(3)} className="services_button">View More <i className="uil uil-arrow-right 
               services_button-icon"></i> </span>

               <div className= {toggleState === 3 ? "services_modal active-modal" : "services_modal"}>
                <div className="services_modal-content">
                    <i  onClick={() => toggleTab(0)} className="uil uil-times services_modal-close"></i>
                    <h3 className="services_modal-title">System</h3>
                    <p className="services_modal-description">I have experience developer tools more then 
                    2 years.</p>
                    <ul className="services_modal-services grid">
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                            Visual Studio Code - Code Editing.
                            </p>
                        </li>

                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Chrome.
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                                Windows 11 .
                            </p>
                        </li>
                        <li className="services_modal-service">
                            <i className="uil uil-check-circle servies_modal-icon"></i>
                            <p className="services_modal-info">
                               Microsoft Edge.
                            </p>
                        </li>
                    </ul>
                </div>
               </div>
            </div>
        </div>
    </section>
  )
}
