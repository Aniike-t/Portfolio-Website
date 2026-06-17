import React from 'react';
import './AureluneArchive.css';

const ARCHIVE_ITEMS = [
  { id: 'arc1', year: '2023', name: 'The Deconstructed Mac', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80' },
  { id: 'arc2', year: '2022', name: 'Raw Silk Evening Gown', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80' },
  { id: 'arc3', year: '2024', name: 'Oversized Wool Trench', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80' },
  { id: 'arc4', year: '2021', name: 'Merino Wrap Sweater', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80' },
  { id: 'arc5', year: '2023', name: 'Structured Linen Suit', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80' },
  { id: 'arc6', year: '2020', name: 'Signature Leather Belt', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80' },
];

function AureluneArchive() {
  return (
    <div className="aurelune-archive-page">
      <div className="archive-header">
        <h1 className="archive-title">Archive</h1>
        <p className="archive-subtitle">A curated index of seminal silhouettes from past collections.</p>
      </div>

      <div className="archive-grid">
        {ARCHIVE_ITEMS.map((item) => (
          <div key={item.id} className="archive-card">
            <div className="archive-img-overlay">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div className="archive-hover-info">
                <span className="archive-year">{item.year}</span>
                <h3 className="archive-name">{item.name}</h3>
                <span className="view-details-text">Discover Piece</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="archive-footer-note">
        <p>Pieces in the archive are no longer available for purchase. They remain here as a record of our design evolution.</p>
      </div>
    </div>
  );
}

export default AureluneArchive;
