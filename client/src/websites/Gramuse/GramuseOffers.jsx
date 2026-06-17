import React from 'react';
import { Tag, ArrowRight, Percent } from 'lucide-react';
import './GramuseOffers.css';

const OFFERS = [
  { id: 'o1', title: 'Organic Citrus Box', discount: '20% OFF', oldPrice: 24.99, newPrice: 19.99, image: 'https://images.unsplash.com/photo-1596733430284-f74372754d92?w=500&auto=format&fit=crop&q=80' },
  { id: 'o2', title: 'Grass-fed Ribeye', discount: 'Buy 2 Get 1', oldPrice: 38.00, newPrice: 25.33, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop&q=80' },
  { id: 'o3', title: 'Farm Fresh Eggs (2 Dozen)', discount: '$5 OFF', oldPrice: 14.50, newPrice: 9.50, image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=500&auto=format&fit=crop&q=80' }
];

function GramuseOffers() {
  return (
    <section id="offers" className="gramuse-offers-section">
      <div className="offers-container">
        <div className="offers-header">
          <h2 className="offers-title">Weekly Harvest Deals</h2>
          <p className="offers-subtitle">Seasonal abundance at special prices. Valid through Sunday.</p>
        </div>

        <div className="offers-grid">
          {OFFERS.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image-wrap">
                <img src={offer.image} alt={offer.title} loading="lazy" />
                <div className="offer-badge">
                  <Percent size={14} /> {offer.discount}
                </div>
              </div>
              <div className="offer-details">
                <h3>{offer.title}</h3>
                <div className="price-row">
                  <span className="old-price">${offer.oldPrice.toFixed(2)}</span>
                  <span className="new-price">${offer.newPrice.toFixed(2)}</span>
                </div>
                <button className="add-offer-btn">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="newsletter-banner">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <Tag size={24} className="newsletter-icon" />
              <h3>Get 15% Off Your First Order</h3>
              <p>Sign up for our newsletter to receive exclusive deals, seasonal recipes, and stories from our local farmers.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GramuseOffers;
