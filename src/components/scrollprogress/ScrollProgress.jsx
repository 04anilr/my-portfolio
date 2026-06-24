import React, { useEffect, useState } from 'react';
import './scrollprogress.css';

export const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const height =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="scroll-progress" aria-hidden="true">
            <div className="scroll-progress_bar" style={{ width: `${progress}%` }} />
        </div>
    );
};
