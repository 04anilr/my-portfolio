import React from 'react';
import './jstutorial.css';

export const JsPlaygroundCta = () => {
  const handleOpenSandbox = (e) => {
    e.preventDefault();
    window.location.hash = '#/playground';
  };

  return (
    <section className="js-playground-cta section" id="js-playground">
      <h2 className="section_title">JS Playground</h2>
      <span className="section_subtitle">Interactive JavaScript Tutorials</span>

      <div className="js-playground-cta__container container">
        <div className="js-playground-cta__card">
          <div className="js-playground-cta__content">
            <div className="js-playground-cta__icon-box">
              <i className="uil uil-brackets-curly"></i>
            </div>
            
            <h3 className="js-playground-cta__title">Learn JS Interactively</h3>
            <p className="js-playground-cta__description">
              Step away from static tutorials. Dive into a modern standalone developer sandbox equipped with 
              a live JavaScript compiler, real-time code editor, and dedicated log outputs console.
            </p>
            
            <div className="js-playground-cta__highlights">
              <div className="js-playground-cta__highlight-item">
                <i className="bx bx-badge-check highlight-icon"></i>
                <span>4 Structured Coding Lessons</span>
              </div>
              <div className="js-playground-cta__highlight-item">
                <i className="bx bx-badge-check highlight-icon"></i>
                <span>Sandboxed Code Evaluation</span>
              </div>
              <div className="js-playground-cta__highlight-item">
                <i className="bx bx-badge-check highlight-icon"></i>
                <span>Simulated Promise & Async Timers</span>
              </div>
              <div className="js-playground-cta__highlight-item">
                <i className="bx bx-badge-check highlight-icon"></i>
                <span>Real-time Standard Output Panel</span>
              </div>
            </div>

            <a href="#/playground" onClick={handleOpenSandbox} className="button button--flex js-playground-cta__btn">
              Launch Interactive Sandbox <i className="uil uil-arrow-right button_icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default JsPlaygroundCta;
