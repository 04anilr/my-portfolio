import React, { useCallback, useEffect, useRef, useState } from 'react';
import './banner.css';
import banner1 from '../../assets/slideOne.png';
import banner2 from '../../assets/slideTwo.png';
import banner3 from '../../assets/slideThree.png';

const SLIDES = [
    { src: banner1, alt: 'Full Stack Engineer — Frappe ERPNext, React, Next.js, TypeScript, Python' },
    { src: banner2, alt: 'Custom ERP, HRMS & Business Automation with Frappe Framework & ERPNext' },
    { src: banner3, alt: 'Building powerful web applications with React.js, Next.js & TypeScript' },
];

const SLIDE_DURATION = 5000; // ms each slide stays before auto-advancing

export const BannerSlider = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);

    const goTo = useCallback((index) => {
        setCurrent((index + SLIDES.length) % SLIDES.length);
    }, []);

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    // Auto-advance with the timer (pauses on hover).
    useEffect(() => {
        if (paused) return undefined;
        timerRef.current = setTimeout(() => {
            setCurrent((c) => (c + 1) % SLIDES.length);
        }, SLIDE_DURATION);
        return () => clearTimeout(timerRef.current);
    }, [current, paused]);

    return (
        <section
            className="banner-slider"
            aria-label="Highlights"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="banner-slider_viewport">
                <div
                    className="banner-slider_track"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {SLIDES.map((slide, i) => (
                        <div className="banner-slider_slide" key={i} aria-hidden={i !== current}>
                            <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                        </div>
                    ))}
                </div>

                {/* Timer progress bar on top */}
                <div className="banner-slider_progress">
                    {SLIDES.map((_, i) => (
                        <span className="banner-slider_progress-track" key={i}>
                            <span
                                className={`banner-slider_progress-fill ${i === current ? 'is-active' : ''} ${i < current ? 'is-done' : ''}`}
                                style={{
                                    animationDuration: `${SLIDE_DURATION}ms`,
                                    animationPlayState: paused ? 'paused' : 'running',
                                }}
                            />
                        </span>
                    ))}
                </div>

                {/* Left / right controls */}
                <button
                    type="button"
                    className="banner-slider_arrow banner-slider_arrow--prev"
                    onClick={prev}
                    aria-label="Previous slide"
                >
                    &#10094;
                </button>
                <button
                    type="button"
                    className="banner-slider_arrow banner-slider_arrow--next"
                    onClick={next}
                    aria-label="Next slide"
                >
                    &#10095;
                </button>

                {/* Dots */}
                <div className="banner-slider_dots">
                    {SLIDES.map((_, i) => (
                        <button
                            type="button"
                            key={i}
                            className={`banner-slider_dot ${i === current ? 'is-active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
