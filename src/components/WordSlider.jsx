import React, { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import './WordSlider.css';

function WordSlider({ words }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || slider.children.length === 0) return;
    
    const wordHeight = slider.children[0].offsetHeight;
    const originalWordsCount = words.length;
    const totalHeight = wordHeight * originalWordsCount;

    // Clear existing animations
    gsap.killTweensOf(slider);

    // Create timeline with infinite loop
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(slider, {
      duration: originalWordsCount * 2.5, // 2 second per word (slower)
      y: -totalHeight,
      ease: "none",
    }).set(slider, { y: 0 }); // Reset position after each iteration

  }, [words]);

  return (
    <div className="slider-container">
      <ul className="word-slider" ref={sliderRef}>
        {[...words, ...words].map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default WordSlider;