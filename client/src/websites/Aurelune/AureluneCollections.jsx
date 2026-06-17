import React from 'react';
import './AureluneCollections.css';

const COLLECTIONS = [
  {
    id: 'ss26',
    season: 'Spring / Summer 2026',
    title: 'Lumière et Ombre',
    description: 'A study of light and shadow, featuring sheer silks, lightweight linens, and structured silhouettes designed to breathe.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550614000-4b95d466e852?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=600&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'aw25',
    season: 'Autumn / Winter 2025',
    title: 'The Brutalist Cut',
    description: 'Heavy wools, sharp tailoring, and structural outerwear inspired by mid-century brutalist architecture.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80'
    ]
  }
];

function AureluneCollections() {
  return (
    <div className="aurelune-collections-page">
      <div className="collections-header">
        <h1 className="collections-title">Collections</h1>
        <p className="collections-subtitle">Explore the seasonal narratives and visual campaigns that define the Aurelune aesthetic.</p>
      </div>

      <div className="collections-list">
        {COLLECTIONS.map(collection => (
          <div key={collection.id} className="collection-block">
            <div className="collection-meta">
              <span className="collection-season">{collection.season}</span>
              <h2 className="collection-name">{collection.title}</h2>
              <p className="collection-desc">{collection.description}</p>
              <button className="view-collection-btn">View Full Campaign</button>
            </div>
            <div className="collection-gallery">
              {collection.images.map((img, i) => (
                <div key={i} className={`gallery-img-wrap img-${i}`}>
                  <img src={img} alt={`${collection.title} look ${i+1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AureluneCollections;
