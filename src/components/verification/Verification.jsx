import React from 'react';
import './verification.css';
import ProfilePic from '../../assets/profile-pic (4).png';
const Verification = () => {
    return (
        <section className="verification_section section" id="verification">
            <h2 className="section_title">Profile Status</h2>
            <span className="section_subtitle">My verification badge</span>
            <div className="verification_container container">
                {/* Left Card: Skills Status (Orange) */}
                <div className="verification_card-wrapper orange-border">
                    <div className="verification_card">
                        <div className="verification_header">
                            <img src={ProfilePic} alt="Anil Rajput" className="verification_avatar" />
                            <div className="verification_user-info">
                                <h3 className="verification_name">Anil Rajput</h3>
                                <span className="verification_role">Frontend Developer</span>
                            </div>
                            <span className="verification_badge badge-orange">Pending</span>
                        </div>
                        <div className="verification_divider"></div>
                        <div>
                            <h4 className="verification_status-title">Skills Status</h4>
                            <div className="verification_list">
                                <div className="verification_list-item">
                                    <span>React JS Assessment</span>
                                    <span className="verification_list-status status-orange">Pending</span>
                                </div>
                                <div className="verification_list-item">
                                    <span>CSS/UI Assessment</span>
                                    <span className="verification_list-status status-orange">Pending</span>
                                </div>
                                <div className="verification_list-item">
                                    <span>Problem Solving</span>
                                    <span className="verification_list-status status-orange">Pending</span>
                                </div>
                            </div>
                        </div>
                        <div className="verification_action action-blue">
                            <i className="bx bx-shield-quarter verification_action-icon"></i>
                            <div className="verification_action-content">
                                <h4 className="verification_action-title">Verify Your Skills</h4>
                                <p className="verification_action-desc">
                                    To finalize your skills, please begin the mandatory assessment process.
                                </p>
                                <a href="#skills" className="verification_action-link">
                                    Start Assessment <i className="bx bx-right-arrow-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Central Connector */}
                <div className="verification_connector">
                    <div className="connector_line"></div>
                    <div className="connector_badge">
                        <i className="bx bx-check-shield"></i>
                    </div>
                    <div className="connector_line"></div>
                </div>
                {/* Right Card: Profile Status (Green) */}
                <div className="verification_card-wrapper">
                    <div className="verification_card">
                        <div className="verification_header">
                            <img src={ProfilePic} alt="Anil Rajput" className="verification_avatar" />
                            <div className="verification_user-info">
                                <h3 className="verification_name">Anil Rajput</h3>
                                <span className="verification_role">Frontend Developer</span>
                            </div>
                            <span className="verification_badge">Verified</span>
                        </div>
                        <div className="verification_divider"></div>
                        <div>
                            <h4 className="verification_status-title">Verification Status</h4>
                            <div className="verification_list">
                                <div className="verification_list-item">
                                    <span>Personal Information</span>
                                    <span className="verification_list-status">Verified</span>
                                </div>
                                <div className="verification_list-item">
                                    <span>Employment Information</span>
                                    <span className="verification_list-status">Verified</span>
                                </div>
                                <div className="verification_list-item">
                                    <span>Criminal Record</span>
                                    <span className="verification_list-status">Verified</span>
                                </div>
                            </div>
                        </div>
                        <div className="verification_action">
                            <i className="bx bx-check-shield verification_action-icon"></i>
                            <div className="verification_action-content">
                                <h4 className="verification_action-title">Profile has been verified</h4>
                                <p className="verification_action-desc">
                                    Your profile is fully verified. Now you can access all features.
                                </p>
                                <a href="#about" className="verification_action-link">
                                    View Profile <i className="bx bx-right-arrow-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Verification;