import React from 'react';
import { Sparkles, ShoppingCart } from 'lucide-react';
import './NiramayaOffers.css';

function NiramayaOffers({ onAddBundle }) {
  // Bundle items: ashwagandha and vit-d3
  const handleAddBundle = () => {
    onAddBundle([
      { id: 'ashwagandha', name: 'Ashwagandha Gold (KSM-66)', price: 699, image: '/niramaya/ashwagandha.jpg', unit: '60 Tablets' },
      { id: 'vit-d3', name: 'Vegan Vitamin D3 + K2', price: 899, image: '/niramaya/vit-d3.jpg', unit: '60 Capsules' }
    ], 1299); // Bundle special price ₹1299 (Discounted from 1598)
  };

  return (
    <section id="offers" className="niramaya-offers-section">
      {/* Ticker marquee strip */}
      <div className="niramaya-offers-ticker">
        <div className="ticker-track">
          <span>GREAT OFFER • PURE INGREDIENTS • VEDIC SCIENCE • AYURVEDIC WELLNESS • 100% ORGANIC • GREAT OFFER • PURE INGREDIENTS • VEDIC SCIENCE • AYURVEDIC WELLNESS • 100% ORGANIC</span>
        </div>
      </div>

      <div className="niramaya-offers-container">
        <div className="offer-layout">
          <div className="offer-details">
            <div className="offer-badge">
              <Sparkles size={16} />
              <span>Pack of the Month</span>
            </div>
            
            <h2 className="offer-title">Vedic Vitality Ritual</h2>
            <p className="offer-sub">Ashwagandha Gold (60 Tabs) + Vegan Vitamin D3+K2 (60 Caps)</p>
            
            <p className="offer-description">
              Our signature vitality kit targets modern stress and bone/immune vitality simultaneously. By combining pure KSM-66 Ashwagandha with plant-based D3+K2, this bundle helps restore restorative sleep and physical strength.
            </p>

            <div className="offer-pricing">
              <span className="price-label">Bundle Price:</span>
              <span className="original-price">₹1,598</span>
              <span className="current-price">₹1,299</span>
              <span className="save-badge">Save ₹299</span>
            </div>

            <button className="add-bundle-btn" onClick={handleAddBundle}>
              <ShoppingCart size={18} />
              Add Bundle to Cart
            </button>
          </div>

          <div className="offer-images-wrapper">
            <div className="circle-bg-accent"></div>
            
            <div className="overlapping-bottles">
              <div className="bottle-one-container">
                <img 
                  src="/niramaya/vit-d3.jpg" 
                  alt="Vegan Vitamin D3 + K2"
                  className="bottle-img img-one"
                />
                <span className="bottle-label">Vitamin D3+K2</span>
              </div>
              
              <div className="bottle-two-container">
                <img 
                  src="/niramaya/ashwagandha.jpg" 
                  alt="Ashwagandha Gold"
                  className="bottle-img img-two"
                />
                <span className="bottle-label label-two">Ashwagandha Gold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NiramayaOffers;
