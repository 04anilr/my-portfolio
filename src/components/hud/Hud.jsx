import React, { useState, useEffect } from 'react';
import './hud.css';

const DEV_TIPS = [
  "Tip: Clean code reads like well-written prose. Keep your functions short and focused!",
  "Tip: Rest is just as important as writing code. Step away to solve that tough bug!",
  "Tip: Git commit often, push when stable. Clear messages save hours of future debugging!",
  "Tip: Master console.table() - it prints array objects in beautiful terminal grids!",
  "Tip: Why write 1 line of CSS when you can write 50 lines of complex JS? (Just kidding, use CSS!)"
];

export const Hud = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [ping, setPing] = useState(15);
  const [devTip, setDevTip] = useState(DEV_TIPS[0]);
  const [skillsStatus, setSkillsStatus] = useState(() => {
    return localStorage.getItem('skills-status') || 'pending';
  });

  // Track session uptime
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute greeting on mount
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning ☀️');
    else if (hour < 18) setGreeting('Good Afternoon ⛅');
    else setGreeting('Good Evening 🌙');
  }, []);

  // Fluctuate simulated ping
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(12 + Math.floor(Math.random() * 7));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // React immediately to Skills Status updates in other components
  useEffect(() => {
    const handleStatusChange = () => {
      setSkillsStatus(localStorage.getItem('skills-status') || 'pending');
    };
    window.addEventListener('skillsStatusChange', handleStatusChange);
    return () => window.removeEventListener('skillsStatusChange', handleStatusChange);
  }, []);

  const formatUptime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const getNewTip = () => {
    const currentIndex = DEV_TIPS.indexOf(devTip);
    const nextIndex = (currentIndex + 1) % DEV_TIPS.length;
    setDevTip(DEV_TIPS[nextIndex]);
  };

  return (
    <div className={`telemetry-hud ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Collapsed view toggle button */}
      {!isExpanded ? (
        <button 
          className="telemetry-hud__collapsed-btn" 
          onClick={() => setIsExpanded(true)}
          title="Open Telemetry HUD companion"
        >
          <span className="telemetry-hud__pulse"></span>
          <i className="uil uil-dashboard"></i>
          <span className="telemetry-hud__label">HUD</span>
        </button>
      ) : (
        <div className="telemetry-hud__panel">
          {/* Header */}
          <div className="telemetry-hud__header">
            <span className="telemetry-hud__title">
              <i className="uil uil-atom"></i> System Telemetry
            </span>
            <button className="telemetry-hud__close-btn" onClick={() => setIsExpanded(false)}>
              <i className="uil uil-minus"></i>
            </button>
          </div>

          {/* Body */}
          <div className="telemetry-hud__body">
            <div className="telemetry-hud__greeting">{greeting}</div>
            
            <div className="telemetry-hud__metrics">
              <div className="telemetry-hud__metric-row">
                <span className="metric-name">Active Session</span>
                <span className="metric-value value-glowing">{formatUptime(uptime)}</span>
              </div>
              <div className="telemetry-hud__metric-row">
                <span className="metric-name">Link Latency</span>
                <span className="metric-value">{ping}ms</span>
              </div>
              <div className="telemetry-hud__metric-row">
                <span className="metric-name">Assessment status</span>
                <span className={`metric-value status-badge ${skillsStatus === 'pending' ? 'pending' : 'verified'}`}>
                  {skillsStatus === 'pending' ? 'PENDING' : 'VERIFIED'}
                </span>
              </div>
              <div className="telemetry-hud__metric-row">
                <span className="metric-name">AI Assistant</span>
                <span className="metric-value value-green">ONLINE</span>
              </div>
            </div>

            <div className="telemetry-hud__divider"></div>

            {/* Dev tips module */}
            <div className="telemetry-hud__tip-container">
              <p className="telemetry-hud__tip-text">{devTip}</p>
              <button className="telemetry-hud__tip-btn" onClick={getNewTip}>
                Next Advice <i className="uil uil-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
