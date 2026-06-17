import React from 'react';
import './AureluneStudio.css';

function AureluneStudio() {
  return (
    <div className="aurelune-studio-page">
      <div className="studio-hero">
        <h1 className="studio-title">The Studio</h1>
        <p className="studio-subtitle">Located in the heart of Le Marais, Paris. Our atelier is a space dedicated to the slow and deliberate study of form.</p>
      </div>

      <div className="studio-content-grid">
        <div className="studio-text-block">
          <span className="studio-label">01. PHILOSOPHY</span>
          <h2>Quiet Architecture</h2>
          <p>We approach clothing as soft architecture. Every seam, dart, and fold is considered not just for how it looks, but how it interacts with the body in motion. We believe in subtraction over addition—stripping away the unnecessary to reveal the essential silhouette.</p>
        </div>
        <div className="studio-image-block">
          <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=80" alt="Design sketches and fabric swatches" />
        </div>

        <div className="studio-image-block">
          <img src="https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=80" alt="Seamstress working on a garment" />
        </div>
        <div className="studio-text-block">
          <span className="studio-label">02. CRAFTSMANSHIP</span>
          <h2>The Hand of the Maker</h2>
          <p>True luxury requires time. Our garments are constructed using traditional tailoring techniques alongside modern innovations. We partner with multi-generational family mills in Biella, Italy for our wools, and source our silks from heritage looms in Lyon.</p>
        </div>
      </div>

      <div className="studio-materials-section">
        <h2 className="materials-title">Core Materials</h2>
        <div className="materials-grid">
          <div className="material-card">
            <h3>Mongolian Cashmere</h3>
            <p>Sourced responsibly from the Alashan region, known for producing the finest, longest fibers. Exceptionally soft and lightweight.</p>
          </div>
          <div className="material-card">
            <h3>Virgin Wool Twill</h3>
            <p>Woven in northern Italy. A structured yet breathable fabric that holds its shape beautifully while allowing fluid movement.</p>
          </div>
          <div className="material-card">
            <h3>Sandwashed Silk</h3>
            <p>Treated to achieve a matte, sueded finish. It drapes elegantly and feels incredible against the skin, shifting subtly in the light.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AureluneStudio;
