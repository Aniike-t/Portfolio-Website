import React from 'react';
import './AureluneJournal.css';

const ARTICLES = [
  {
    id: 1,
    category: 'Design Notes',
    title: 'The Anatomy of a Perfect Blazer',
    date: 'October 12, 2025',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Exploring the intricate balance of structure and drape. A look inside the atelier as we construct our signature silhouette.'
  },
  {
    id: 2,
    category: 'Material Focus',
    title: 'Sourcing Sustainable Cashmere',
    date: 'September 28, 2025',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Our journey to the Alashan region to find the world’s finest and most ethically produced cashmere fibers.'
  },
  {
    id: 3,
    category: 'Editorial',
    title: 'City Silhouettes: A Photo Essay',
    date: 'September 15, 2025',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Capturing the new collection on the streets of Paris. How our garments interact with the urban landscape.'
  }
];

function AureluneJournal() {
  return (
    <div className="aurelune-journal-page">
      <div className="journal-header">
        <h1 className="journal-title">Journal</h1>
        <p className="journal-subtitle">Notes on design, process, and the world of Aurelune.</p>
      </div>

      <div className="journal-grid">
        {ARTICLES.map((article, index) => (
          <div key={article.id} className={`journal-card ${index === 0 ? 'featured' : ''}`}>
            <div className="journal-img-wrap">
              <img src={article.image} alt={article.title} loading="lazy" />
            </div>
            <div className="journal-meta">
              <div className="journal-meta-top">
                <span className="journal-category">{article.category}</span>
                <span className="journal-date">{article.date}</span>
              </div>
              <h2 className="journal-card-title">{article.title}</h2>
              <p className="journal-excerpt">{article.excerpt}</p>
              <button className="read-more-btn">Read Article</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AureluneJournal;
