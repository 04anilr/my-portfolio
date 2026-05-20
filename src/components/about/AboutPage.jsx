import React from 'react';
import './aboutpage.css';
import AboutImg from "../../assets/profile-pic (4).png";

export const AboutPage = () => {
  const handleBackToPortfolio = (e) => {
    e.preventDefault();
    window.location.hash = '#about';
  };

  return (
    <section className="about-page section standalone-about" id="about-page">
      {/* Dynamic Header */}
      <div className="about-page__header container">
        <a href="#about" onClick={handleBackToPortfolio} className="about-page__back-btn">
          <i className="uil uil-arrow-left"></i> Return to Portfolio
        </a>
        <div className="about-page__header-title-box">
          <h2 className="about-page__header-title">Full Biography</h2>
          <span className="about-page__header-subtitle">Learn more about Anil's developer journey</span>
        </div>
      </div>

      <div className="about-page__container container grid">
        {/* Left Sidebar Card */}
        <div className="about-page__sidebar">
          <div className="about-page__profile-card">
            <div className="about-page__avatar-wrapper">
              <img src={AboutImg} alt="Anil Rajput" className="about-page__avatar" />
              <span className="about-page__status-dot"></span>
            </div>
            
            <h3 className="about-page__name">Anil Rajput</h3>
            <p className="about-page__title">SSDE at Hybrowlabs Technologies</p>

            <div className="about-page__badges">
              <span className="about-badge">B.Tech CSE</span>
              <span className="about-badge">2+ Years Exp</span>
              <span className="about-badge">Frappe/ERPNext</span>
              <span className="about-badge">Generative AI</span>
            </div>

            <div className="about-page__divider"></div>

            <div className="about-page__skills-grid">
              <h4 className="about-page__skills-title">Core Stack</h4>
              <div className="about-page__skills-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">FastAPI</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">AI/GenAI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Article Content */}
        <div className="about-page__content">
          <div className="about-page__article-card">
            {/* About Me Section */}
            <div className="about-article__section">
              <h3 className="about-article__title">
                <i className="uil uil-user"></i> About Me
              </h3>
              <p className="about-article__text">
                I am a passionate Software Developer Engineer with a strong background in full-stack development, modern web technologies, and enterprise application development. I completed my Bachelor of Technology (B.Tech) in Computer Science Engineering from Invertis University in 2023. Since the beginning of my professional journey, I have been deeply focused on building scalable, user-friendly, and high-performance applications that solve real-world business problems.
              </p>
            </div>

            {/* Core Expertise Section */}
            <div className="about-article__section">
              <h3 className="about-article__title">
                <i className="uil uil-brackets-curly"></i> Technical Expertise
              </h3>
              <p className="about-article__text">
                Over the years, I have gained hands-on experience working with multiple technologies and frameworks across frontend, backend, AI, and enterprise systems. My technical expertise includes Generative AI, React.js, Next.js, JavaScript, Python, FastAPI, and Frappe | ERPNext development. I enjoy working on both frontend and backend systems, creating seamless user experiences while also developing robust APIs and business logic for scalable applications.
              </p>
            </div>

            {/* Professional Journey Section */}
            <div className="about-article__section">
              <h3 className="about-article__title">
                <i className="uil uil-briefcase-alt"></i> Professional Journey
              </h3>
              <p className="about-article__text">
                Currently, I am working as an SSDE (Software Support & Development Engineer) at Hybrowlabs Technologies, where I have been contributing for more than 2 years. During my time here, I have worked on several enterprise-grade applications and business solutions, collaborating with teams to deliver efficient and reliable software products. My experience has helped me develop strong problem-solving skills, technical understanding, and the ability to work in fast-paced development environments.
              </p>
            </div>

            {/* Key Contributions Section */}
            <div className="about-article__section">
              <h3 className="about-article__title">
                <i className="uil uil-layer-group"></i> Active Contributions
              </h3>
              <p className="about-article__text">
                At present, I am actively working on HRMS and Recruitment Management systems for Physics Wallah, where I contribute to developing and enhancing modules related to employee management, recruitment workflows, user interfaces, and system integrations. My role involves building scalable features, improving application performance, and ensuring smooth user experiences for enterprise-level platforms.
              </p>
            </div>

            {/* Domain Experience Section */}
            <div className="about-article__section">
              <h3 className="about-article__title">
                <i className="uil uil-globe"></i> Domain & Projects Experience
              </h3>
              <p className="about-article__text">
                Apart from enterprise systems, I have also worked on a variety of projects across different industries and domains. Some of the notable projects I have contributed to include Holiday Trip, LBF Logistica, ISKCON Temple management-related solutions, and several other business applications. These projects allowed me to work on diverse functionalities such as management systems, workflow automation, dashboards, API integrations, and responsive user interfaces.
              </p>
            </div>

            {/* Aspiration Section */}
            <div className="about-article__section">
              <h3 className="about-article__title">
                <i className="uil uil-target"></i> Aspirations & Goals
              </h3>
              <p className="about-article__text">
                I am always eager to learn new technologies and continuously improve my development skills. I have a strong interest in modern AI technologies, scalable web applications, and enterprise software solutions. My goal is to keep building impactful digital products that create value for businesses and users while growing as a professional developer in the software industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutPage;
