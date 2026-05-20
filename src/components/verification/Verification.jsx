import React, { useState, useEffect } from 'react';
import './verification.css';
import ProfilePic from '../../assets/profile-pic (4).png';

const QUIZ_QUESTIONS = [
  {
    question: "React uses a virtual DOM to optimize UI updates. What is it?",
    options: [
      "A copy of the raw HTML source code",
      "An in-memory lightweight representation of the real DOM",
      "A cloud database synchronized with the client screen"
    ],
    correctAnswer: 1
  },
  {
    question: "Which CSS property is used to align items along the main axis in a Flexbox container?",
    options: [
      "align-items",
      "align-content",
      "justify-content"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the correct way to check if a variable 'x' is an Array in modern JavaScript?",
    options: [
      "typeof x === 'array'",
      "Array.isArray(x)",
      "x.type === 'Array'"
    ],
    correctAnswer: 1
  }
];

const Verification = () => {
  const [skillsStatus, setSkillsStatus] = useState(() => {
    return localStorage.getItem('skills-status') || 'pending';
  });
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);

  // Sync state to local storage and custom event to update HUD companion
  useEffect(() => {
    localStorage.setItem('skills-status', skillsStatus);
    // Dispatch a custom event to notify the HUD component of state updates in real time
    window.dispatchEvent(new Event('skillsStatusChange'));
  }, [skillsStatus]);

  const startQuiz = (e) => {
    e.preventDefault();
    setIsQuizOpen(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleNext = () => {
    if (selectedOption === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleVerifyFinish = () => {
    const finalScore = selectedOption === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer ? quizScore + 1 : quizScore;
    
    if (finalScore === QUIZ_QUESTIONS.length) {
      setSkillsStatus('verified');
      triggerConfetti();
    }
    setQuizFinished(true);
  };

  const triggerConfetti = () => {
    const particles = Array.from({ length: 60 }, (_, idx) => ({
      id: idx,
      color: ['#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6'][Math.floor(Math.random() * 5)],
      left: Math.random() * 100, // percentage of screen width
      size: Math.random() * 8 + 6, // diameter
      delay: Math.random() * 1.5, // stagger emission
      duration: Math.random() * 2 + 2, // speed
    }));
    setConfettiParticles(particles);
    setTimeout(() => setConfettiParticles([]), 5000);
  };

  return (
    <section className="verification_section section" id="verification">
      <h2 className="section_title">Profile Status</h2>
      <span className="section_subtitle">My verification badge</span>
      
      <div className="verification_container container">
        {/* Left Card: Skills Status */}
        <div className={`verification_card-wrapper ${skillsStatus === 'pending' ? 'orange-border' : 'green-border'}`}>
          <div className="verification_card">
            <div className="verification_header">
              <img src={ProfilePic} alt="Anil Rajput" className="verification_avatar" />
              <div className="verification_user-info">
                <h3 className="verification_name">Anil Rajput</h3>
                <span className="verification_role">Generative AI & Full-Stack Engineer</span>
              </div>
              <span className={`verification_badge ${skillsStatus === 'pending' ? 'badge-orange' : 'badge-green'}`}>
                {skillsStatus === 'pending' ? 'Pending' : 'Verified'}
              </span>
            </div>
            
            <div className="verification_divider"></div>
            
            <div>
              <h4 className="verification_status-title">Skills Status</h4>
              <div className="verification_list">
                <div className="verification_list-item">
                  <span>React JS Assessment</span>
                  <span className={`verification_list-status ${skillsStatus === 'pending' ? 'status-orange' : 'status-green'}`}>
                    {skillsStatus === 'pending' ? 'Pending' : 'Verified'}
                  </span>
                </div>
                <div className="verification_list-item">
                  <span>CSS/UI Assessment</span>
                  <span className={`verification_list-status ${skillsStatus === 'pending' ? 'status-orange' : 'status-green'}`}>
                    {skillsStatus === 'pending' ? 'Pending' : 'Verified'}
                  </span>
                </div>
                <div className="verification_list-item">
                  <span>Problem Solving</span>
                  <span className={`verification_list-status ${skillsStatus === 'pending' ? 'status-orange' : 'status-green'}`}>
                    {skillsStatus === 'pending' ? 'Pending' : 'Verified'}
                  </span>
                </div>
              </div>
            </div>
            
            {skillsStatus === 'pending' ? (
              <div className="verification_action action-blue">
                <i className="bx bx-shield-quarter verification_action-icon"></i>
                <div className="verification_action-content">
                  <h4 className="verification_action-title">Verify Your Skills</h4>
                  <p className="verification_action-desc">
                    To finalize your skills, please begin the mandatory assessment process.
                  </p>
                  <a href="#skills" onClick={startQuiz} className="verification_action-link">
                    Start Assessment <i className="bx bx-right-arrow-alt"></i>
                  </a>
                </div>
              </div>
            ) : (
              <div className="verification_action action-green-success">
                <i className="bx bx-check-shield verification_action-icon"></i>
                <div className="verification_action-content">
                  <h4 className="verification_action-title">Skills Fully Verified!</h4>
                  <p className="verification_action-desc">
                    Congratulations! You successfully cleared the certification assessment tasks.
                  </p>
                  <span className="verification_action-success-badge">
                    <i className="bx bx-badge-check"></i> Certified Developer
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Central Connector */}
        <div className="verification_connector">
          <div className={`connector_line ${skillsStatus === 'verified' ? 'active-green' : ''}`}></div>
          <div className={`connector_badge ${skillsStatus === 'verified' ? 'active-green' : ''}`}>
            <i className={skillsStatus === 'pending' ? "bx bx-shield-quarter" : "bx bx-check-shield"}></i>
          </div>
          <div className={`connector_line ${skillsStatus === 'verified' ? 'active-green' : ''}`}></div>
        </div>

        {/* Right Card: Profile Status (Green) */}
        <div className="verification_card-wrapper green-border">
          <div className="verification_card">
            <div className="verification_header">
              <img src={ProfilePic} alt="Anil Rajput" className="verification_avatar" />
              <div className="verification_user-info">
                <h3 className="verification_name">Anil Rajput</h3>
                <span className="verification_role">Generative AI & Full-Stack Engineer</span>
              </div>
              <span className="verification_badge badge-green">Verified</span>
            </div>
            
            <div className="verification_divider"></div>
            
            <div>
              <h4 className="verification_status-title">Verification Status</h4>
              <div className="verification_list">
                <div className="verification_list-item">
                  <span>Personal Information</span>
                  <span className="verification_list-status status-green">Verified</span>
                </div>
                <div className="verification_list-item">
                  <span>Employment Information</span>
                  <span className="verification_list-status status-green">Verified</span>
                </div>
                <div className="verification_list-item">
                  <span>Criminal Record</span>
                  <span className="verification_list-status status-green">Verified</span>
                </div>
              </div>
            </div>
            
            <div className="verification_action action-green-success">
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

      {/* Dynamic Skills Assessment Quiz Modal */}
      {isQuizOpen && (
        <div className="verification-quiz-overlay" onClick={() => setIsQuizOpen(false)}>
          <div className="verification-quiz-modal" onClick={e => e.stopPropagation()}>
            <button className="verification-quiz-close" onClick={() => setIsQuizOpen(false)}>
              <i className="uil uil-times"></i>
            </button>
            
            {!quizFinished ? (
              <>
                <div className="quiz-progress-bar">
                  <div 
                    className="quiz-progress-fill" 
                    style={{ width: `${((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
                <span className="quiz-step-label">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                
                <h3 className="quiz-question-text">{QUIZ_QUESTIONS[currentQuestionIndex].question}</h3>
                
                <div className="quiz-options-list">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`quiz-option-btn ${selectedOption === idx ? 'selected' : ''}`}
                    >
                      <span className="option-bullet">{String.fromCharCode(65 + idx)}</span>
                      <span className="option-text">{opt}</span>
                    </button>
                  ))}
                </div>
                
                <div className="quiz-actions">
                  {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length ? (
                    <button 
                      onClick={handleNext} 
                      disabled={selectedOption === null}
                      className="quiz-nav-btn"
                    >
                      Next Question <i className="bx bx-right-arrow-alt"></i>
                    </button>
                  ) : (
                    <button 
                      onClick={handleVerifyFinish} 
                      disabled={selectedOption === null}
                      className="quiz-nav-btn quiz-finish-btn"
                    >
                      Submit & Verify <i className="bx bx-badge-check"></i>
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="quiz-results">
                {quizScore === QUIZ_QUESTIONS.length || (selectedOption === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer && quizScore + 1 === QUIZ_QUESTIONS.length) ? (
                  <>
                    <div className="results-icon success-icon">
                      <i className="bx bx-award"></i>
                    </div>
                    <h3 className="results-title">Assessment Cleared!</h3>
                    <p className="results-text">
                      Outstanding! You answered all {QUIZ_QUESTIONS.length} questions correctly. 
                      Your developer skills verification tag has been activated dynamically!
                    </p>
                    <button className="results-btn close-btn" onClick={() => setIsQuizOpen(false)}>
                      Finish <i className="bx bx-check-circle"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="results-icon fail-icon">
                      <i className="bx bx-error-alt"></i>
                    </div>
                    <h3 className="results-title">Verification Failed</h3>
                    <p className="results-text">
                      You scored {selectedOption === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer ? quizScore + 1 : quizScore} out of {QUIZ_QUESTIONS.length}. 
                      To obtain the verification tag, you must achieve a perfect score. Please try again!
                    </p>
                    <button className="results-btn retry-btn" onClick={startQuiz}>
                      Retry Assessment <i className="bx bx-refresh"></i>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pure CSS/React Custom Confetti Particles */}
      {confettiParticles.map(p => (
        <div 
          key={p.id}
          className="confetti-particle"
          style={{
            backgroundColor: p.color,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </section>
  );
};

export default Verification;