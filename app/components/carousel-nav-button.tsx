// CarouselNavButton.jsx - Client Component (minimal)
'use client';

import { useCallback } from 'react';

export function CarouselNavButton({ direction, targetId }) {
    const handleClick = useCallback(() => {
        const carousel = document.getElementById(targetId);
        if (carousel) {
            const scrollAmount = direction === 'left' ? -250 : 250;
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, [direction, targetId]);

    return (
        <button
            onClick={handleClick}
            className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10`}
            aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
        >
            {direction === 'left' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            )}
        </button>
    );
}
