import { useEffect } from 'react';

/**
 * Global scroll-reveal system.
 *
 * One IntersectionObserver reveals elements as they scroll into view. Cards and
 * text slide in from the left/right (or up), with a per-group stagger so grids
 * cascade instead of popping in all at once.
 *
 * Direction is applied via CSS classes (see index.css):
 *   .sr  .sr--left  .sr--right  .sr--up  .sr--scale  → .sr--visible
 *
 * A MutationObserver re-scans the DOM so async-loaded cards (the Blog and
 * Project sections fetch their data) get animated too.
 */

// dir: 'left' | 'right' | 'up' | 'scale' | 'alt' (alternate left/right by index)
// stagger: ms added per element index within the matched group
const REVEAL_CONFIG = [
    // Section headings — every section
    { selector: '.section_title', dir: 'up' },
    { selector: '.section_subtitle', dir: 'up', stagger: 70 },

    // Hero
    { selector: '.banner-slider_viewport', dir: 'scale' },
    { selector: '.home_data', dir: 'left' },
    { selector: '.home_visual', dir: 'right' },

    // About
    { selector: '.about_img', dir: 'left' },
    { selector: '.about_data', dir: 'right' },
    { selector: '.about_box', dir: 'up', stagger: 120 },

    // Skills / Services cards
    { selector: '.skills_content', dir: 'alt', stagger: 120 },
    { selector: '.services_card', dir: 'up', stagger: 80 },

    // Qualification timeline
    { selector: '.qualification_data', dir: 'alt', stagger: 120 },

    // Work / Projects / Blog cards
    { selector: '.work_filters', dir: 'up' },
    { selector: '.work_card', dir: 'up', stagger: 90 },
    { selector: '.project-article-card', dir: 'up', stagger: 90 },
    { selector: '.article', dir: 'up', stagger: 90 },

    // Trust & social proof
    { selector: '.stats_container', dir: 'scale' },
    { selector: '.clients_card', dir: 'up', stagger: 110 },
    { selector: '.testimonials_card', dir: 'up', stagger: 110 },

    // Contact
    { selector: '.contact_card', dir: 'left', stagger: 110 },
    { selector: '.contact_content', dir: 'right' },
];

export const useScrollReveal = () => {
    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('sr--visible');
                        obs.unobserve(entry.target); // reveal once
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );

        const prepare = (el, dir, index, stagger) => {
            // Already revealed — nothing more to do.
            if (el.classList.contains('sr--visible')) return;

            // First time we see this element: assign direction + stagger once.
            if (!el.dataset.srReady) {
                el.dataset.srReady = 'true';

                if (prefersReduced) {
                    // Respect user preference: show immediately, no motion.
                    el.classList.add('sr', 'sr--visible');
                    return;
                }

                let direction = dir;
                if (dir === 'alt') direction = index % 2 === 0 ? 'left' : 'right';

                el.classList.add('sr', `sr--${direction}`);
                if (stagger) {
                    el.style.transitionDelay = `${index * stagger}ms`;
                }
            }

            if (prefersReduced) return;

            // Always (re)observe: under React StrictMode the effect runs twice,
            // and the first observer is disconnected on cleanup — the second
            // mount must re-observe so the element still gets revealed.
            observer.observe(el);
        };

        const scan = () => {
            REVEAL_CONFIG.forEach(({ selector, dir, stagger }) => {
                const nodes = document.querySelectorAll(selector);
                nodes.forEach((el, i) => prepare(el, dir, i, stagger));
            });
        };

        scan();

        // Re-scan when async content (Blog/Project fetches) mounts.
        let rafId = null;
        const mutationObserver = new MutationObserver(() => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(scan);
        });
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);
};
