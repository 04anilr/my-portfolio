import React, { useState, useEffect, useRef } from 'react';
import './profile.css';
import profileImg from '../../assets/about.png';

export const ProfileDrawer = ({ isOpen, onClose }) => {
  const [hue, setHue] = useState(() => {
    return parseInt(localStorage.getItem('theme-hue')) || 215;
  });
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Welcome to Anil\'s Developer Terminal!', type: 'system' },
    { text: 'Type "help" for a list of interactive commands.', type: 'info' },
  ]);
  const [pulseGlow, setPulseGlow] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync theme accent hue on change
  useEffect(() => {
    document.documentElement.style.setProperty('--hue', hue);
    localStorage.setItem('theme-hue', hue);
  }, [hue]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = terminalInput.trim().toLowerCase();
      const parts = trimmed.split(' ');
      const cmd = parts[0];
      const arg = parts.slice(1).join(' ');

      let response = '';
      let resType = 'output';

      if (cmd) {
        setTerminalHistory(prev => [...prev, { text: `visitor@anilr-portfolio:~$ ${terminalInput}`, type: 'input' }]);

        if (cmd === 'help') {
          response = 'Available Commands:\n  [about]    - Learn more about Anil\n  [skills]   - View the technical skills matrix\n  [projects] - Discover highlight projects\n  [stats]    - View fun developer stats\n  [theme X]  - Set accent hue (0-360, e.g., theme 120)\n  [secret]   - Reveal terminal easter egg\n  [clear]    - Clear terminal screen';
          resType = 'info';
        } else if (cmd === 'about') {
          response = 'Anil Rajput is an advanced Generative AI Engineer and Full Stack Developer. He specializes in designing intelligent web systems, custom automations (ERPNext/Frappe), and large language model (LLM) integrations.';
        } else if (cmd === 'skills') {
          response = 'Skills Strength Matrix:\n  - Frontend Development : [████████████████░░░░] 80%\n  - Backend Development  : [██████████████████░░] 90%\n  - GenAI / LLM Ops      : [██████████████████░░] 90%\n  - Systems & DevOps     : [████████████░░░░░░░░] 60%';
          resType = 'success';
        } else if (cmd === 'projects') {
          response = 'Key Projects Highlighted:\n  1. Generative AI Chatbot - Integrated LLMs for smart agents\n  2. ERPNext Automations - Custom Frappe workflows\n  3. Modern Portfolio - Dynamic interactive showcases';
        } else if (cmd === 'stats') {
          response = 'Personal Live Stats:\n  - Cups of Chai/Coffee  : 512\n  - Production Builds    : 247\n  - ESLint Warnings Fixed: 1,429\n  - Keyboard Clicks      : 2.3M\n  - AI Assistant Status  : ONLINE';
        } else if (cmd === 'theme') {
          const hueVal = parseInt(arg);
          if (!isNaN(hueVal) && hueVal >= 0 && hueVal <= 360) {
            setHue(hueVal);
            response = `Theme accent color dynamically set to Hue: ${hueVal}°!`;
            resType = 'success';
          } else {
            response = 'Usage: theme <number> (where number is between 0 and 360, e.g., theme 120 for emerald green)';
            resType = 'error';
          }
        } else if (cmd === 'secret') {
          setHue(280); // Set to purple
          response = '🎉 EASTER EGG UNLOCKED! 🎉\nTheme hue set to Cyberpunk Purple (280°).\nWhy do developers prefer dark mode?\nBecause light attracts bugs! 🐛';
          resType = 'success';
        } else if (cmd === 'clear') {
          setTerminalHistory([]);
          setTerminalInput('');
          return;
        } else {
          response = `Command not found: "${cmd}". Type "help" for a list of options.`;
          resType = 'error';
        }

        setTerminalHistory(prev => [...prev, { text: response, type: resType }]);
      }

      setTerminalInput('');
    }
  };

  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-drawer" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="profile-drawer__close" onClick={onClose} aria-label="Close Profile">
          <i className="uil uil-multiply"></i>
        </button>

        {/* Profile Info Header */}
        <div className="profile-drawer__header">
          <div 
            className={`profile-drawer__avatar-wrapper ${pulseGlow ? 'glow-active' : ''}`}
            onClick={() => setPulseGlow(!pulseGlow)}
            title="Click to toggle avatar neon glow!"
          >
            <img src={profileImg} alt="Anil Rajput" className="profile-drawer__avatar" />
            <div className="avatar-ping"></div>
          </div>
          <h2 className="profile-drawer__name">Anil Rajput</h2>
          <span className="profile-drawer__role">Generative AI & Full-Stack Engineer</span>
          
          <div className="profile-drawer__socials">
            <a href="https://github.com/04anilr" target="_blank" rel="noreferrer" className="profile-drawer__social-tag">
              <i className="uil uil-github-alt"></i> GitHub
            </a>
            <a href="https://www.linkedin.com/in/anil-rajput-6411a4233/" target="_blank" rel="noreferrer" className="profile-drawer__social-tag">
              <i className="uil uil-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>

        {/* Dynamic Interactive Stats */}
        <div className="profile-drawer__stats">
          <div className="profile-drawer__stat-box">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years Exp</span>
          </div>
          <div className="profile-drawer__stat-box">
            <span className="stat-number">30+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="profile-drawer__stat-box">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Contributions</span>
          </div>
        </div>

        <hr className="profile-drawer__divider" />

        {/* Highly Advanced Feature: Theme Accent Hue Slider */}
        <div className="profile-drawer__theme-picker">
          <h3 className="profile-drawer__section-title">
            <i className="uil uil-palette"></i> Interactive Accent Customizer
          </h3>
          <p className="profile-drawer__section-desc">
            Slide the color range to dynamically re-theme the entire portfolio dashboard in real time!
          </p>
          <div className="hue-slider-wrapper">
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={hue} 
              onChange={e => setHue(parseInt(e.target.value))} 
              className="hue-slider"
            />
            <div className="hue-slider-labels">
              <span>0° (Red)</span>
              <span>120° (Green)</span>
              <span>240° (Blue)</span>
              <span>360° (Red)</span>
            </div>
            <div className="hue-preview">
              Current Accent Hue: <span className="hue-value" style={{ color: `hsl(${hue}, 100%, 60%)` }}>{hue}°</span>
            </div>
          </div>
        </div>

        <hr className="profile-drawer__divider" />

        {/* Highly Advanced Feature: Retro Dev Terminal */}
        <div className="profile-drawer__terminal-container">
          <h3 className="profile-drawer__section-title">
            <i className="uil uil-terminal"></i> Retro Developer Terminal
          </h3>
          <p className="profile-drawer__section-desc">
            Click on the terminal box below and query Anil's custom API commands!
          </p>
          
          <div className="profile-terminal" onClick={focusTerminal}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">anilr@developer-shell: ~</span>
            </div>
            
            <div className="terminal-body">
              {terminalHistory.map((item, index) => (
                <div key={index} className={`terminal-line line-${item.type}`}>
                  {item.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
            
            <div className="terminal-input-row">
              <span className="terminal-prompt">visitor@anilr-portfolio:~$</span>
              <input 
                ref={inputRef}
                type="text" 
                value={terminalInput} 
                onChange={e => setTerminalInput(e.target.value)}
                onKeyDown={handleCommand}
                className="terminal-input"
                placeholder="Type 'help'..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
