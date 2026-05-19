import React from 'react';
import './background.css';

const Background = () => {
  return (
    <div className="portfolio-bg" aria-hidden="true">
      <div className="portfolio-bg-grid"></div>
      <div className="portfolio-bg-blob blob-1"></div>
      <div className="portfolio-bg-blob blob-2"></div>
      <div className="portfolio-bg-blob blob-3"></div>
    </div>
  );
};

export default Background;
