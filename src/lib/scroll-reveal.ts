/**
 * Generic scroll-reveal animation system.
 *
 * Usage: add `data-reveal` to any element you want to animate on scroll.
 *
 * Attributes:
 *   data-reveal="fade-down" | "fade-up" | "fade-left" | "fade-right" — animation direction
 *   data-reveal-delay="150"                              — delay in ms (default 0)
 *   data-reveal-threshold="0.15"                         — intersection threshold (default 1)
 */

const ANIMATIONS: Record<string, { from: string; keyframes: string }> = {
    'fade-down': {
        from: 'translate(0, -16px)',
        keyframes: 'revealFadeDown',
    },
    'fade-up': {
        from: 'translate(0, 16px)',
        keyframes: 'revealFadeUp',
    },
    'fade-left': {
        from: 'translate(24px, 0)',
        keyframes: 'revealFadeLeft',
    },
    'fade-right': {
        from: 'translate(-24px, 0)',
        keyframes: 'revealFadeRight',
    },
};

let stylesInjected = false;

function injectStyles() {
    if (stylesInjected) return;
    stylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `
        [data-reveal] {
            opacity: 0;
            will-change: opacity, transform;
        }

        [data-reveal="fade-down"] { transform: translate(0, -16px); }
        [data-reveal="fade-up"]   { transform: translate(0, 16px); }
        [data-reveal="fade-left"]  { transform: translate(24px, 0); }
        [data-reveal="fade-right"] { transform: translate(-24px, 0); }

        [data-reveal].revealed {
            animation: var(--reveal-name) 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--reveal-delay, 0ms);
        }

        @keyframes revealFadeDown {
            from { opacity: 0; transform: translate(0, -16px); }
            to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes revealFadeUp {
            from { opacity: 0; transform: translate(0, 16px); }
            to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes revealFadeLeft {
            from { opacity: 0; transform: translate(24px, 0); }
            to   { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes revealFadeRight {
            from { opacity: 0; transform: translate(-24px, 0); }
            to   { opacity: 1; transform: translate(0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
            [data-reveal] {
                opacity: 1 !important;
                transform: none !important;
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

export function initScrollReveal() {
    injectStyles();

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.revealed)');
    if (!elements.length) return;

    // Group elements by threshold so we create fewer observers
    const groups = new Map<number, HTMLElement[]>();

    elements.forEach((el) => {
        const type = el.dataset.reveal || 'fade-up';
        const anim = ANIMATIONS[type];
        if (!anim) return;

        el.style.setProperty('--reveal-name', anim.keyframes);
        const delay = el.dataset.revealDelay || '0';
        el.style.setProperty('--reveal-delay', `${delay}ms`);

        const threshold = parseFloat(el.dataset.revealThreshold || '1');
        if (!groups.has(threshold)) groups.set(threshold, []);
        groups.get(threshold)!.push(el);
    });

    groups.forEach((els, threshold) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );
        els.forEach((el) => observer.observe(el));
    });
}