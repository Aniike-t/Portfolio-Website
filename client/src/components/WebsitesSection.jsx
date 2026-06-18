import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Shirt } from 'lucide-react';
import './WebsitesSection.css';

const websitesList = [
  {
    id: 'gramuse',
    title: 'Gramuse',
    subtitle: 'Organic Grocery E-Commerce',
    description: 'A vibrant organic grocery platform featuring live search, smart category filtering, cart management, and a realistic checkout pipeline.',
    icon: <ShoppingCart size={24} />,
    tags: ['E-Commerce', 'Filters & Sorting', 'Modal Pipeline', 'Fresh Aesthetic'],
    color: '#34a853',
    link: '/websites/gramuse'
  },
  {
    id: 'aurelune',
    title: 'Aurelune',
    subtitle: 'Luxury Editorial Fashion',
    description: 'A sophisticated fashion showcase featuring serif typography, lookbook slideshow transitions, category overlays, and bag quick-add details.',
    icon: <Shirt size={24} />,
    tags: ['Luxury Retail', 'Lookbook Slider', 'Size Selection', 'Minimalist Theme'],
    color: '#e8a598',
    link: '/websites/aurelune'
  }
];

function WebsitesSection() {
  const navigate = useNavigate();

  return (
    <div className="websites-section-container">
      <div className="section-header">
        <h2 className="websites-title">Interactive Showcases</h2>
        <p className="websites-subtitle">
          5 state-of-the-art websites demonstrating distinct design systems, custom interactions, and functional architectures.
        </p>
      </div>

      <div className="websites-grid">
        {websitesList.map((web) => (
          <div 
            key={web.id} 
            className="website-card"
            style={{ '--card-accent': web.color }}
            onClick={() => navigate(web.link)}
          >
            <div className="card-top">
              <div className="card-icon-wrapper" style={{ color: web.color }}>
                {web.icon}
              </div>
              <span className="card-badge">{web.subtitle}</span>
            </div>
            
            <h3 className="card-title">{web.title}</h3>
            <p className="card-desc">{web.description}</p>
            
            <div className="card-tags">
              {web.tags.map((tag, i) => (
                <span key={i} className="card-tag">{tag}</span>
              ))}
            </div>

            <div className="card-footer">
              <span className="launch-text">Launch Site</span>
              <span className="launch-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebsitesSection;
