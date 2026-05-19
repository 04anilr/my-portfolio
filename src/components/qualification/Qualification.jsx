import React, { useState } from 'react';
import "./qualification.css";

export const Qualification = () => {
    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    }


  return (
    <section className="qualification section">
        <h2 className="section_title">Qualification</h2>
        <span className="section_subtitle">My personal journey</span>

        <div className="qualification_container container">
            <div className="qualification_tabs">
                <div className={toggleState === 0 ? "qualification_button qualification_active button--flex" : "qualification_button button--flex"} onClick={() => toggleTab(0)}>
                    <i className="uil uil-graduation-cap qualification_icon"></i>{" "}Education
                </div>
                <div className={toggleState === 1 ? "qualification_button qualification_active button--flex" : "qualification_button button--flex"} onClick={() => toggleTab(1)}>
                    <i className="uil uil-briefcase-alt qualification_icon"></i>{" "}Experience
                </div>
            </div>
            <div className="qualification_sections">
                <div className={toggleState === 0 ? "qualification_content qualification_content-active" : "qualification_content"}>
                    <div className="qualification_data">
                        <div>
                             <h3 className="qualification_title">Web Development</h3>
                             <span className="qualification_subtitle">Online</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2021 - present
                             </div>
                        </div>
                       <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>
                    </div>

                    <div className="qualification_data">
                        <div></div>


                        <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>


                        <div>
                             <h3 className="qualification_title">Bachelor of Technology (CSE)</h3>
                             <span className="qualification_subtitle">Invertis University</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2019 - 2023
                             </div>
                        </div>
                      
                    </div>

                    <div className="qualification_data">
                        <div>
                             <h3 className="qualification_title">Intermediate (12th - 63%)</h3>
                             <span className="qualification_subtitle">C.B. Ganj Inter College</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2019
                             </div>
                        </div>
                       <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>
                    </div>

                    <div className="qualification_data">
                        <div></div>


                        <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>


                        <div>
                             <h3 className="qualification_title">High School (10th - 68%)</h3>
                             <span className="qualification_subtitle">CPM Inter College</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2017
                             </div>
                        </div>
                      
                    </div>
                </div>

                <div className={toggleState === 1 ? "qualification_content qualification_content-active" : "qualification_content"}>
                    <div className="qualification_data">
                        <div>
                             <h3 className="qualification_title">College Projects</h3>
                             <span className="qualification_subtitle">Invertis University</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2020 - 2023
                             </div>
                        </div>
                       <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>
                    </div>

                    <div className="qualification_data">
                        <div></div>


                        <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>


                        <div>
                             <h3 className="qualification_title">4+ Projects After College</h3>
                             <span className="qualification_subtitle">Online</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2023 - present
                             </div>
                        </div>
                      
                    </div>

                    <div className="qualification_data">
                        <div>
                             <h3 className="qualification_title">Web Designer</h3>
                             <span className="qualification_subtitle">Figma</span>
                             <div className="qualification_calender">
                                 <i className="uil uil-calendar-alt"></i> 2020 - present
                             </div>
                        </div>
                       <div>
                       <span className="qualification_rounder"></span>
                        <span className="qualification_line"></span>
                       </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
  )
}
