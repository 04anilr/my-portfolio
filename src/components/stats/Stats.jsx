import React, { useEffect, useRef, useState } from 'react';
import './stats.css';

const METRICS = [
    { value: 2, suffix: '+', label: 'Years of Experience' },
    { value: 10, suffix: '+', label: 'Projects Delivered' },
    { value: 15, suffix: '+', label: 'Technologies Worked With' },
    { value: 500, suffix: '+', label: 'LinkedIn Connections' },
];

const useCountUp = (target, start, duration = 1600) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return undefined;
        let rafId;
        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo for a snappy, premium count
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(eased * target));
            if (progress < 1) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [target, start, duration]);

    return count;
};

const StatItem = ({ value, suffix, label, start }) => {
    const count = useCountUp(value, start);
    return (
        <div className="stats_item">
            <span className="stats_number">
                {count}
                <span className="stats_suffix">{suffix}</span>
            </span>
            <span className="stats_label">{label}</span>
        </div>
    );
};

export const Stats = () => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats section" aria-label="Key metrics">
            <div className="stats_container container" ref={ref}>
                {METRICS.map((m) => (
                    <StatItem key={m.label} {...m} start={inView} />
                ))}
            </div>
        </section>
    );
};
