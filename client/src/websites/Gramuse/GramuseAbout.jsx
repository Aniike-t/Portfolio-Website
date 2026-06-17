import React from 'react';
import { Leaf, Droplets, Sun, Sprout } from 'lucide-react';
import './GramuseAbout.css';

function GramuseAbout() {
  return (
    <section id="about" className="gramuse-about-section">
      <div className="about-container">
        <div className="about-header">
          <span className="section-badge"><Leaf size={14} /> Our Roots</span>
          <h2 className="about-title">Nurtured by Nature,<br/>Delivered to You.</h2>
          <p className="about-subtitle">
            Gramuse began with a simple idea: that the best food shouldn't travel halfway across the world to reach your plate. We partner directly with local, organic farms to bring seasonal harvests to your neighborhood.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-image-card large">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80" alt="Local organic farm" loading="lazy" />
          </div>
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon"><Sprout size={24} /></div>
              <h3>100% Organic Certified</h3>
              <p>Every product we carry meets the highest standards of organic farming, free from synthetic pesticides and fertilizers.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Droplets size={24} /></div>
              <h3>Regenerative Practices</h3>
              <p>We work with farmers who actively rebuild soil health and restore local watersheds through their farming techniques.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Sun size={24} /></div>
              <h3>Harvested at Peak</h3>
              <p>Because our supply chain is hyper-local, produce is picked when it's fully ripe, maximizing flavor and nutritional value.</p>
            </div>
          </div>
        </div>

        <div className="farm-partners">
          <h3>Meet Our Partners</h3>
          <div className="partners-row">
            <div className="partner-card">
              <img src="https://images.unsplash.com/photo-1595858348630-fceb203d9061?w=400&auto=format&fit=crop&q=80" alt="Sunrise Valley Farm" />
              <h4>Sunrise Valley Farm</h4>
              <span>Heirloom Vegetables</span>
            </div>
            <div className="partner-card">
              <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&auto=format&fit=crop&q=80" alt="Oak Creek Dairy" />
              <h4>Oak Creek Dairy</h4>
              <span>Grass-fed Dairy</span>
            </div>
            <div className="partner-card">
              <img src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=400&auto=format&fit=crop&q=80" alt="Wilder Orchards" />
              <h4>Wilder Orchards</h4>
              <span>Seasonal Fruits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GramuseAbout;
