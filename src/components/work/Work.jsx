import React from 'react';
import {Works} from './Works';

export const Work = () => {
  return (
    <section className="work section" id="portfolio">
        <h2 className="section_title">My Project</h2>
        <span className="section_subtitle">Most recent works</span>
        <Works />
    </section>
  )
}
