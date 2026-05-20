import React, { useState } from 'react';
import './jstutorial.css';

const LESSONS = [
  {
    id: 'variables',
    title: '1. Variables & Types',
    description: 'Learn how to declare variables using const and let, and perform basic operations.',
    code: `// Try modifying these values and run!
const developer = "Anil Rajput";
let coffeeCups = 3;
let isProductive = true;

console.log("Developer name:", developer);
console.log("Initial coffee cups:", coffeeCups);

// Perform some operations
coffeeCups += 2; 
console.log("Updated cups:", coffeeCups);
console.log("Is highly productive?", coffeeCups > 4);`
  },
  {
    id: 'functions',
    title: '2. Arrow Functions & Arrays',
    description: 'Master ES6 arrow functions and modern array methods like map and filter.',
    code: `const scores = [85, 92, 78, 99, 64];

// Arrow function to filter passing scores (> 75)
const passingScores = scores.filter(score => score > 75);
console.log("Passing Scores:", passingScores);

// Double all scores using map
const doubledScores = scores.map(score => score * 2);
console.log("Doubled Scores:", doubledScores);

// Calculate total score using reduce
const totalScore = scores.reduce((sum, score) => sum + score, 0);
console.log("Average Score:", totalScore / scores.length);`
  },
  {
    id: 'destructuring',
    title: '3. Object Destructuring',
    description: 'Learn modern object destructuring and template literals to write clean JS.',
    code: `const profile = {
  name: "Anil Rajput",
  role: "GenAI Engineer",
  skills: ["React", "Python", "LLMs"],
  location: "Delhi, India"
};

// Destructure values from object
const { name, role, skills } = profile;

console.log(\`Developer: \${name}\`);
console.log(\`Specialization: \${role}\`);
console.log(\`Primary Skill: \${skills[2]}\`);`
  },
  {
    id: 'promises',
    title: '4. Promises & Async Sim',
    description: 'Understand async control flow and simulated promise resolution.',
    code: `console.log("1. Starting API request...");

// Create a simulated delay promise
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "Success", code: 200, data: "Hello from Dev.to API!" });
    }, 1500);
  });
};

fetchData().then(result => {
  console.log("3. API Response Received:");
  console.log(result);
});

console.log("2. Code execution continues while waiting...");`
  }
];

export const JsTutorial = () => {
  const [activeLesson, setActiveLesson] = useState(LESSONS[0]);
  const [code, setCode] = useState(activeLesson.code);
  const [consoleOutput, setConsoleOutput] = useState('Click "Run Code" to execute the script.');
  const [isSuccess, setIsSuccess] = useState(null);

  // Sync editor code with selected lesson
  const selectLesson = (lesson) => {
    setActiveLesson(lesson);
    setCode(lesson.code);
    setConsoleOutput('Click "Run Code" to execute the script.');
    setIsSuccess(null);
  };

  const handleReset = () => {
    setCode(activeLesson.code);
    setConsoleOutput('Code reset to original lesson template.');
    setIsSuccess(null);
  };

  const executeCode = () => {
    const logs = [];
    const customConsole = {
      log: (...args) => {
        logs.push(
          args
            .map(arg => {
              if (typeof arg === 'object') {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch (e) {
                  return String(arg);
                }
              }
              return String(arg);
            })
            .join(' ')
        );
      },
      error: (...args) => {
        logs.push(`[ERROR] ${args.join(' ')}`);
      },
      warn: (...args) => {
        logs.push(`[WARN] ${args.join(' ')}`);
      }
    };

    try {
      // Execute the script using a Function wrapper bound to custom console context
      // eslint-disable-next-line no-new-func
      const executor = new Function('console', 'setTimeout', code);
      // Pass a custom setTimeout to support Async Promises logging inside this sandbox
      const sandboxTimeout = (callback, delay) => {
        return setTimeout(() => {
          try {
            callback();
            // Append delayed async log outputs directly to console panel
            setConsoleOutput(logs.join('\n'));
          } catch (err) {
            logs.push(`[Async Error]: ${err.message}`);
            setConsoleOutput(logs.join('\n'));
          }
        }, delay);
      };

      executor(customConsole, sandboxTimeout);
      
      setConsoleOutput(logs.join('\n') || 'Code executed successfully (no logs printed).');
      setIsSuccess(true);
    } catch (err) {
      setConsoleOutput(`[Compile/Execution Error]:\n${err.message}`);
      setIsSuccess(false);
    }
  };

  // Get total line numbers
  const totalLines = code.split('\n').length;
  const lineNumbersArray = Array.from({ length: totalLines }, (_, idx) => idx + 1);

  const handleBackToPortfolio = (e) => {
    e.preventDefault();
    window.location.hash = '#js-playground';
  };

  return (
    <section className="js-tutorial section standalone-playground" id="js-playground">
      {/* Return to Portfolio standalone header */}
      <div className="js-playground__header container">
        <a href="#js-playground" onClick={handleBackToPortfolio} className="js-playground__back-btn">
          <i className="uil uil-arrow-left"></i> Return to Portfolio
        </a>
        <div className="js-playground__header-title-box">
          <h2 className="js-playground__header-title">JS Sandbox Editor</h2>
          <span className="js-playground__header-subtitle">Standalone interactive scripting console</span>
        </div>
      </div>

      <div className="js-tutorial__container container grid">
        {/* Left Side: Lessons List */}
        <div className="js-tutorial__lessons-wrapper">
          <h3 className="js-tutorial__sidebar-title">Select a Lesson</h3>
          <div className="js-tutorial__lessons-list">
            {LESSONS.map(lesson => (
              <div 
                key={lesson.id} 
                className={`js-lesson-card ${activeLesson.id === lesson.id ? 'active' : ''}`}
                onClick={() => selectLesson(lesson)}
              >
                <div className="js-lesson-card__icon-box">
                  <i className="uil uil-code-branch"></i>
                </div>
                <div className="js-lesson-card__details">
                  <h4 className="js-lesson-card__title">{lesson.title}</h4>
                  <p className="js-lesson-card__desc">{lesson.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Code Box & Console Dashboard */}
        <div className="js-tutorial__editor-wrapper">
          {/* Editor Container */}
          <div className="js-code-box">
            <div className="js-code-box__header">
              <div className="js-code-box__dots">
                <span className="editor-dot dot-red"></span>
                <span className="editor-dot dot-yellow"></span>
                <span className="editor-dot dot-green"></span>
              </div>
              <span className="js-code-box__filename">playground.js</span>
              <button className="js-code-box__reset" onClick={handleReset} title="Reset lesson template">
                <i className="uil uil-history"></i> Reset
              </button>
            </div>

            <div className="js-code-box__editor-body">
              {/* Line Numbers gutter */}
              <div className="js-code-box__gutter">
                {lineNumbersArray.map(ln => (
                  <span key={ln} className="gutter-ln">{ln}</span>
                ))}
              </div>
              {/* Textarea Code Input */}
              <textarea 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                className="js-code-box__textarea"
                spellCheck="false"
                rows={totalLines > 10 ? totalLines : 10}
              />
            </div>

            <div className="js-code-box__actions">
              <button className="js-code-box__run-btn" onClick={executeCode}>
                <i className="uil uil-play"></i> Run Code
              </button>
            </div>
          </div>

          {/* Console Box Container */}
          <div className="js-console-box">
            <div className="js-console-box__header">
              <span className="js-console-box__title">
                <i className="uil uil-processor"></i> Sandbox Console Output
              </span>
              {isSuccess !== null && (
                <span className={`js-console-box__status ${isSuccess ? 'status-success' : 'status-error'}`}>
                  {isSuccess ? 'Success' : 'Failed'}
                </span>
              )}
            </div>
            <div className="js-console-box__output">
              {consoleOutput}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
