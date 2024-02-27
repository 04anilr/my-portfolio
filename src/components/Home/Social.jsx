import React from 'react';
import { SiMusicbrainz } from "react-icons/si";

export const Social = () => {
  return (
    <div className="home_social">
 <a href="https://www.linkedin.com/in/anil-rajput-6411a4233/" className='home_social-icon' target='_blank'>
        <i class='uil uil-linkedin'></i>

        </a>

        <a href="https://www.instagram.com/?next=%2F" className='home_social-icon' target='_blank'>
            <i class='uil uil-instagram'></i>

        </a>
        <a href="https://www.codingninjas.com/studio/profile/04anilr" className='home_social-icon' target='_blank'>
        <i class='uil'><SiMusicbrainz /></i>

        </a>
        <a href="https://github.com/04anilr" className='home_social-icon' target='_blank'>
        <i class='uil uil-github-alt'></i>

        </a>
        
    </div>
  )
}
