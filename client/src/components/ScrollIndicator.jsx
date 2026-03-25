import React, { useState, useEffect } from 'react';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(false);

    const [isScrolling, setIsScrolling] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        let scrollTimeout;
        const handleScroll = () => {
            setIsScrolling(true);
            setIsVisible(false);

            // Check if at the bottom of page to hide it
            const scrollBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50;
            setIsAtBottom(scrollBottom);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
                if (!scrollBottom) {
                    setIsVisible(true);
                }
            }, 30000);

        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Desktop only
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

    if (isAtBottom) return null;

    return (
        <div className={`scroll-mouse-container ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="mouse-io">
                <div className="wheel-io"></div>
            </div>
            <span className="scroll-hint-text">SCROLL</span>
        </div>
    );
};

export default ScrollIndicator;
