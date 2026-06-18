import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import BackToPortfolio from '../BackToPortfolio';
import AureluneJournal from './AureluneJournal';
import AureluneArchive from './AureluneArchive';
import AureluneProfile from './AureluneProfile';
import AureluneLegal from './AureluneLegal';
import AureluneFooter from './AureluneFooter';
import PRODUCTS_LIST from './data/aureluneProducts.json';
import './AureluneApp.css';

const HERO_SLIDES = [
  {
    id: 'slide1',
    title: 'BLAZER WITH BELT',
    price: 420.00,
    collection: 'SPRING-SUMMER 2026',
    desc: 'City Silhouettes is a study of proportion, texture, and movement. Inspired by contemporary architecture, this blazer explores soft structure and fluid tailoring.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300'
  },
  {
    id: 'slide2',
    title: 'CASHMERE CARDIGAN',
    price: 280.00,
    collection: 'STUDIO ESSENTIALS',
    desc: 'Woven from raw Mongolian cashmere. Styled with micro-ribbed cuffs, drop shoulders, and organic horn buttons for effortless everyday layering.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300'
  },
  {
    id: 'slide3',
    title: 'SILK WRAP BLOUSE',
    price: 195.00,
    collection: 'THE CHIC SILHOUETTE',
    desc: 'A wrap blouse in sandwashed silk charmeuse. Features a low cowl draping and adjustable tie sash at the waist. Extremely soft drape and luxurious luster.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300'
  }
];

const CATEGORIES = [
  { name: 'Latest', count: 74, thumbs: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100'] },
  { name: 'Outerwear', count: 38, thumbs: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100'] },
  { name: 'Tops', count: 113, thumbs: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100'] },
  { name: 'Bottoms', count: 67, thumbs: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100'] },
  { name: 'Accessories', count: 54, thumbs: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100'] }
];

// Products loaded from json
function AureluneApp() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Tops');
  const [bag, setBag] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [bagNotification, setBagNotification] = useState('');
  const [activePage, setActivePage] = useState('Shop');
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Profile/Legal state
  const [legalDoc, setLegalDoc] = useState('privacy');

  // Auto-play lookbook carousel
  useEffect(() => {
    if (activePage !== 'Shop') return;
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activePage]);

  const addToBag = (product, size = 'M') => {
    setBag(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.product.id === product.id && item.size === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });

    setBagNotification(`Added ${product.name} (${size}) to bag.`);
    setTimeout(() => setBagNotification(''), 3000);
  };

  const removeFromBag = (productId, size) => {
    setBag(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const bagTotal = bag.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="aurelune-theme-container">
      <BackToPortfolio />

      {/* NOTIFICATION TOAST */}
      {bagNotification && (
        <div className="bag-notification-toast">
          <span>{bagNotification}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="aurelune-header">
        <div className="header-nav-left">
          <button className={`nav-btn ${activePage === 'Shop' ? 'active' : ''}`} onClick={() => setActivePage('Shop')}>Shop</button>
          <button className={`nav-btn ${activePage === 'Collections' ? 'active' : ''}`} onClick={() => setActivePage('Collections')}>Collections</button>
          <button className={`nav-btn ${activePage === 'Studio' ? 'active' : ''}`} onClick={() => setActivePage('Studio')}>Studio</button>
          <button className={`nav-btn ${activePage === 'Journal' ? 'active' : ''}`} onClick={() => setActivePage('Journal')}>Journal</button>
          <button className={`nav-btn font-muted ${activePage === 'Archive' ? 'active' : ''}`} onClick={() => setActivePage('Archive')}>Archive</button>
        </div>

        <div className="aurelune-logo">Aurelune</div>

        <div className="header-nav-right">
          <button className="icon-btn" onClick={() => setIsSearchOpen(true)}><Search size={18} /></button>
          <button className="icon-btn" onClick={() => setIsBagOpen(true)}>
            <ShoppingBag size={18} />
            {bag.length > 0 && <span className="bag-count-dot">{bag.reduce((s, i) => s + i.quantity, 0)}</span>}
          </button>
          <button className={`icon-btn ${activePage === 'Profile' ? 'active' : ''}`} onClick={() => setActivePage('Profile')}><User size={18} /></button>
        </div>
      </header>

      {/* SHOP PAGE */}
      {activePage === 'Shop' && (
        <>
          {/* LOOKBOOK HERO CAROUSEL */}
          <section className="aurelune-hero-carousel">
        <div className="hero-slider-stage">
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={slide.id} 
              className={`hero-slide-item ${activeSlide === idx ? 'active' : ''}`}
            >
              <div className="slide-content-left">
                <span className="collection-label">{slide.collection}</span>
                <h1 className="hero-logo-large">Aurelune</h1>
                <span className="script-title">New collection '26</span>
                
                <div className="product-excerpt-card">
                  <p className="excerpt-desc">{slide.desc}</p>
                  <button 
                    className="explore-drop-btn"
                    onClick={() => {
                      const prod = PRODUCTS_LIST.find(p => p.name.toLowerCase().includes(slide.title.toLowerCase().split(' ')[0]));
                      if (prod) setDetailProduct(prod);
                    }}
                  >
                    Explore the Drop ↗
                  </button>
                </div>
              </div>

              <div className="slide-image-right">
                <img src={slide.image} alt={slide.title} />
                
                <div className="floating-preview-tag" onClick={() => {
                  const prod = PRODUCTS_LIST.find(p => p.name.toLowerCase().includes(slide.title.toLowerCase().split(' ')[0]));
                  if (prod) setDetailProduct(prod);
                }}>
                  <img src={slide.thumb} alt="Preview thumb" className="tag-thumb" />
                  <div className="tag-meta">
                    <h4>{slide.title}</h4>
                    <span>€ {slide.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="carousel-nav-footer">
          <div className="carousel-bullets">
            {HERO_SLIDES.map((_, idx) => (
              <button 
                key={idx} 
                className={`bullet-dot ${activeSlide === idx ? 'active' : ''}`}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SPLIT SECTION */}
      <section className="aurelune-categories-split">
        <div className="categories-title-col">
          <span className="section-label">CATEGORIES</span>
          <h2 className="category-bold-header">{activeCategory}</h2>
        </div>

        <div className="categories-list-col">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.name} 
              className={`category-list-row ${activeCategory === cat.name ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategory(cat.name)}
            >
              <div className="row-left">
                <h3 className="category-serif-name">{cat.name}</h3>
                <div className="hover-thumbs-container">
                  {cat.thumbs.map((t, idx) => (
                    <img key={idx} src={t} alt="Category preview" className="hover-cat-thumb" />
                  ))}
                </div>
              </div>
              <span className="category-item-count">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SHOP SECTION OR SEARCH RESULTS */}
      <section className="aurelune-shop-grid-section">
        <div className="section-intro">
          <span className="section-label font-gold">{searchQuery ? 'SEARCH RESULTS' : 'THE SHOP'}</span>
          <h2>{searchQuery ? `Showing results for "${searchQuery}"` : 'Essential Silhouettes'}</h2>
        </div>

        <div className="aurelune-grid">
          {PRODUCTS_LIST.filter(p => {
             if (searchQuery) return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
             return p.featured !== false; // Only show featured on homepage
          }).map(prod => (
            <div key={prod.id} className="aurelune-grid-card" onClick={() => setDetailProduct(prod)}>
              <div className="grid-image-wrap">
                <img src={prod.image} alt={prod.name} loading="lazy" />
                
                {/* Size quick-add overlay */}
                <div className="size-overlay-panel" onClick={(e) => e.stopPropagation()}>
                  <span className="overlay-title">Quick Add</span>
                  <div className="size-choices">
                    {['XS', 'S', 'M', 'L'].map(size => (
                      <button 
                        key={size} 
                        className="size-choice-btn"
                        onClick={() => addToBag(prod, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid-meta">
                <h3 className="grid-product-name">{prod.name}</h3>
                <span className="grid-product-price">€ {prod.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LUXURY EDITORIAL QUOTE */}
          <section className="aurelune-manifesto">
            <p className="manifesto-text">
              "Aurelune designs for the modern wardrobe. Our garments are defined by architectural silhouettes, premium yarns, and timeless tailoring—bridging the gap between casual comfort and structural sophistication."
            </p>
            <span className="manifesto-author">— Aurelune Studio, Paris</span>
          </section>
        </>
      )}

      {/* OTHER PAGES */}
      {activePage === 'Collections' && <AureluneCollections />}
      {activePage === 'Studio' && <AureluneStudio />}
      {activePage === 'Journal' && <AureluneJournal />}
      {activePage === 'Archive' && <AureluneArchive />}
      {activePage === 'Profile' && <AureluneProfile />}
      {activePage === 'Legal' && <AureluneLegal documentType={legalDoc} />}

      {/* FOOTER */}
      <AureluneFooter setActivePage={setActivePage} setLegalDoc={setLegalDoc} />

      {/* SEARCH OVERLAY */}
      <div className={`aurelune-search-overlay ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-container">
          <button className="close-search-btn" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
            <X size={32} />
          </button>
          <input 
            type="text" 
            className="search-input-huge" 
            placeholder="Search collections, pieces, or materials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={isSearchOpen}
          />
          {searchQuery && (
            <button className="view-results-btn" onClick={() => { setIsSearchOpen(false); setActivePage('Shop'); }}>
              View Results
            </button>
          )}
        </div>
      </div>

      {/* BAG DRAWER */}
      <div className={`aurelune-bag-drawer-overlay ${isBagOpen ? 'open' : ''}`} onClick={() => setIsBagOpen(false)}>
        <div className="aurelune-bag-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="bag-header">
            <h3>SHOPPING BAG ({bag.reduce((s, i) => s + i.quantity, 0)})</h3>
            <button className="close-bag-btn" onClick={() => setIsBagOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="bag-content">
            {bag.length === 0 ? (
              <div className="empty-bag-state">
                <p>Your shopping bag is empty.</p>
                <button className="explore-bag-btn" onClick={() => setIsBagOpen(false)}>Explore Collection</button>
              </div>
            ) : (
              <div className="bag-items-list">
                {bag.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="bag-item-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="bag-item-details">
                      <div className="bag-item-top">
                        <h4>{item.product.name}</h4>
                        <span className="bag-item-price">€ {(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <span className="bag-item-size">Size: {item.size}</span>
                      <span className="bag-item-qty">Qty: {item.quantity}</span>
                      
                      <button 
                        className="bag-remove-btn" 
                        onClick={() => removeFromBag(item.product.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {bag.length > 0 && (
            <div className="bag-footer">
              <div className="bag-summary-line">
                <span>SUBTOTAL</span>
                <span>€ {bagTotal.toFixed(2)}</span>
              </div>
              <div className="bag-summary-line">
                <span>SHIPPING</span>
                <span>COMPLIMENTARY</span>
              </div>
              <button className="bag-checkout-btn" onClick={() => {
                alert("Order Placed Successfully!");
                setBag([]);
                setIsBagOpen(false);
              }}>
                CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL VIEW */}
      {detailProduct && (
        <div className="aurelune-modal-overlay" onClick={() => setDetailProduct(null)}>
          <div className="aurelune-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setDetailProduct(null)}>
              <X size={24} />
            </button>

            <div className="modal-split">
              <div className="modal-img-pane">
                <img src={detailProduct.image} alt={detailProduct.name} />
              </div>

              <div className="modal-info-pane">
                <span className="modal-label">COLLECTION PIECE</span>
                <h2 className="modal-title">{detailProduct.name}</h2>
                <span className="modal-price">€ {detailProduct.price.toFixed(2)}</span>
                
                <hr className="modal-divider" />
                
                <p className="modal-desc">{detailProduct.desc}</p>
                <p className="modal-sub-details">{detailProduct.details}</p>

                <div className="modal-size-selection">
                  <span className="size-label">SELECT SIZE</span>
                  <div className="size-buttons-row">
                    {['XS', 'S', 'M', 'L'].map(size => (
                      <button 
                        key={size}
                        className={`size-btn-item ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="modal-add-btn"
                  onClick={() => {
                    addToBag(detailProduct, selectedSize);
                    setDetailProduct(null);
                  }}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AureluneApp;
