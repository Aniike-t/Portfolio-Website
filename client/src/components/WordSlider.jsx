import React, { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import './WordSlider.css';

function WordSlider({ words }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || slider.children.length === 0) return;
    
    const wordHeight = slider.children[0].offsetHeight;
    const originalWordsCount = words.length / 2; // Since words2 = [...words, ...words]
    const totalHeight = wordHeight * (originalWordsCount);

    gsap.killTweensOf(slider);

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(slider, {
      duration: originalWordsCount * 3, // 3 seconds per word for a very premium, slow feel
      y: -totalHeight,
      ease: "none",
    }).set(slider, { y: 0 }); 

  }, [words]);

  return (
    <div className="slider-container">
      <ul className="word-slider" ref={sliderRef}>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default WordSlider;