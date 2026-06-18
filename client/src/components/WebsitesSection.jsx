import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Shirt, Activity, Sun, Cpu } from 'lucide-react';
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
  },
  {
    id: 'niramaya',
    title: 'Niramaya',
    subtitle: 'Premium Ayurvedic & Modern Wellness',
    description: 'A luxury healthcare store with interactive product callouts, custom parallax scrolling, ingredient tags, a wellness blog, and full shopping functionality in INR.',
    icon: <Activity size={24} />,
    tags: ['Healthcare & Ayurveda', 'Parallax Scrolling', 'Interactive Tooltips', 'Wellness Dashboard', 'INR Localized'],
    color: '#bbcffb',
    link: '/websites/niramaya'
  },
  {
    id: 'solara',
    title: 'Solara',
    subtitle: 'Modern Clean Energy Blueprints',
    description: 'A professional clean energy solar portal featuring interactive savings calculators, layered 3D mouse parallax scenes, accordion FAQs, and animated vector assets.',
    icon: <Sun size={24} />,
    tags: ['Solar Energy', '3D Mouse Parallax', 'Savings Calculator', 'Accordion FAQs', 'Animated Vectors'],
    color: '#beff53',
    link: '/websites/solara'
  },
  {
    id: 'dailygrind',
    title: 'DailyGrind',
    subtitle: 'AI Analytics & Operations Lead',
    description: 'An interactive restaurant & cafe management dashboard featuring live data filtering, venue capacity gauges, animated clocks, and a fully functional AI operations agent chat tool with mobile layouts.',
    icon: <Cpu size={24} />,
    tags: ['AI Operations Lead', 'Live Data Filters', 'Clock Animations', 'Responsive Mobile Layout', 'Cafe Management'],
    color: '#f2644c',
    link: '/websites/dailygrind'
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
            className="showcase-card"
            style={{ '--card-accent': web.color }}
            onClick={() => navigate(web.link)}
          >
            <div className="showcase-card-top">
              <div className="showcase-card-icon-wrapper" style={{ color: web.color }}>
                {web.icon}
              </div>
              <span className="showcase-card-badge">{web.subtitle}</span>
            </div>
            
            <h3 className="showcase-card-title">{web.title}</h3>
            <p className="showcase-card-desc">{web.description}</p>
            
            <div className="showcase-card-tags">
              {web.tags.map((tag, i) => (
                <span key={i} className="showcase-card-tag">{tag}</span>
              ))}
            </div>

            <div className="showcase-card-footer">
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
