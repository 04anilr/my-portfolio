import React from 'react'
import "./home.css";
import { Social } from './Social';
import { Data } from './Data';

export const Home = () => {
  return (
    <section className='home section' id='home'>
        <div className='home_container container'>
            <div className='home_content grid'>
                <Data />
                <div className='home_visual'>
                    <div className='home_visual-card'>
                        <div className='home_visual-img'></div>
                        <span className='home_badge'>
                            <span className='home_badge-dot'></span>
                            Available for Hire
                        </span>
                    </div>
                    <Social />
                </div>
            </div>
        </div>
    </section>
  )
}
