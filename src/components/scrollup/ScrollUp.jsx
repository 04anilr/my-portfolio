import React, { useEffect } from 'react';
import './scrollup.css';

export const ScrollUp = () => {
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollUp = document.querySelector(".scrollup");
      if (scrollUp) {
        if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
        else scrollUp.classList.remove("show-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button className="scrollup" onClick={ScrollToTop}>
      <i className="uil uil-arrow-up scrollup_icon"></i>
    </button>
  );
};
