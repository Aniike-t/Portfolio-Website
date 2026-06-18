import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingBag, X, Plus, Minus, Star, Trash2, CheckCircle2, ChevronRight, Filter, Heart, Info, Sparkles, Activity } from 'lucide-react';
import BackToPortfolio from '../BackToPortfolio';
import NiramayaAbout from './NiramayaAbout';
import NiramayaOffers from './NiramayaOffers';
import NiramayaBlog from './NiramayaBlog';
import NiramayaProfile from './NiramayaProfile';
import NiramayaLegal from './NiramayaLegal';
import NiramayaFooter from './NiramayaFooter';
import PRODUCTS from './data/niramayaProducts.json';
import './NiramayaApp.css';

const CATEGORIES = ['All', 'Vitamins', 'Dietary supplements'];

function NiramayaApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeView, setActiveView] = useState('Shop');
  const [legalDoc, setLegalDoc] = useState('privacy');

  // Cart & Wishlist state
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Hotspot Details hover state
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Parallax scroll state
  const [scrollY, setScrollY] = useState(0);

  // Checkout modal flow
  const [checkoutState, setCheckoutState] = useState('none'); // 'none' | 'form' | 'processing' | 'success'
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', phone: '' });

  // Listen to scroll to update parallax offsets
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [selectedCategory, searchTerm]);

  // Add standard product to cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Add promotional bundle items to cart
  const handleAddBundle = (products, bundlePrice) => {
    // Add custom bundle item
    const bundleId = `bundle-${Date.now()}`;
    const bundleProduct = {
      id: bundleId,
      name: "Vedic Vitality Ritual (Bundle)",
      price: bundlePrice,
      unit: "Kit (2 Bottles)",
      image: "/niramaya/vit-d3.jpg",
      category: "Bundles",
      origin: "Vedic Cure Combo"
    };

    setCart(prev => [...prev, { product: bundleProduct, quantity: 1 }]);
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Toggle wishlist item
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Checkout submission
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) return;

    setCheckoutState('processing');

    setTimeout(() => {
      setCheckoutState('success');
      setCart([]);
    }, 2000);
  };

  return (
    <div className="niramaya-theme-wrapper">
      <BackToPortfolio />

      {/* FLOATING PARALLAX DECORATIVE LAYERS */}
      <div
        className="parallax-bg-leaf leaf-left"
        style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.05}deg)` }}
      >🌿</div>
      <div
        className="parallax-bg-leaf leaf-right"
        style={{ transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * -0.03}deg)` }}
      >🍃</div>
      <div
        className="parallax-bg-pill pill-one"
        style={{ transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.1}deg)` }}
      >💊</div>
      <div
        className="parallax-bg-pill pill-two"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      ></div>

      {/* HEADER */}
      <header className="niramaya-header">
        <div className="header-left">
          <div className="niramaya-logo" onClick={() => { setActiveView('Shop'); window.scrollTo(0, 0); }}>
            <span className="logo-icon">🌸</span>
            <span className="logo-name">Niramaya</span>
          </div>
        </div>

        <nav className="niramaya-nav">
          <button className={activeView === 'Shop' ? 'active' : ''} onClick={() => { setActiveView('Shop'); window.scrollTo(0, 0); }}>Shop</button>
          <button onClick={() => { setActiveView('Shop'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>About</button>
          <button onClick={() => { setActiveView('Shop'); setTimeout(() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Offers</button>
          <button className={activeView === 'Blog' ? 'active' : ''} onClick={() => { setActiveView('Blog'); window.scrollTo(0, 0); }}>Journal</button>
          <button className={activeView === 'Profile' ? 'active' : ''} onClick={() => { setActiveView('Profile'); window.scrollTo(0, 0); }}>Dashboard</button>
        </nav>

        <div className="header-actions">
          {/* Wishlist toggle */}
          <button className="header-action-btn" onClick={() => setIsWishlistOpen(true)}>
            <Heart size={20} />
            {wishlist.length > 0 && <span className="action-badge-count">{wishlist.length}</span>}
          </button>

          {/* Cart toggle */}
          <button className="header-action-btn cart-trigger-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {totalItemsCount > 0 && <span className="action-badge-count">{totalItemsCount}</span>}
          </button>

          <button className="login-btn-header" onClick={() => { setActiveView('Profile'); window.scrollTo(0, 0); }}>
            Login
          </button>
        </div>
      </header>

      {/* MAIN VIEW SYSTEM */}
      {activeView === 'Shop' && (
        <>
          {/* INTERACTIVE HERO SECTION WITH HOTSPOTS */}
          <section className="niramaya-hero">
            <div className="hero-grid-container">

              {/* Left Column: Headline and subtext */}
              <div className="hero-text-col">
                <span className="hero-category-label">Pure Adaptogens</span>
                <h1 className="hero-headline">HEALTHCARE.<br />REAL RESULTS.</h1>
                <p className="hero-subtext">
                  Take the step towards a healthier, more vibrant life — shop now and fuel your body with Ayurvedic science-backed formulations.
                </p>
                <div className="hero-cta-row">
                  <button className="hero-shop-btn" onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>
                    Shop Now <ChevronRight size={16} />
                  </button>
                  <button className="hero-learn-btn" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                    Learn More
                  </button>
                </div>
              </div>

              {/* Middle Column: Interactive Supplement Bottle with hot spots */}
              <div className="hero-image-col">
                <div className="hero-bottle-wrap">
                  <img
                    src="/niramaya/hero-bottle.jpg"
                    alt="Vitamin D3+K2 Bottle"
                    className="hero-main-bottle"
                  />

                  {/* Hotspots */}
                  {/* Hotspot 1: Allergen-Free (top right) */}
                  <div className={`hotspot-marker marker-allergen ${activeHotspot === 'allergen' ? 'expanded' : ''}`}
                    onMouseEnter={() => setActiveHotspot('allergen')}
                    onMouseLeave={() => setActiveHotspot(null)}>
                    <div className="hotspot-dot"></div>
                    <div className="hotspot-connector-line"></div>
                    <span className="hotspot-label">Allergen-Free</span>
                    <div className="hotspot-bubble-tooltip">
                      Formulated without soy, gluten, synthetic fillers, or animal gelatin.
                    </div>
                  </div>

                  {/* Hotspot 2: Non-GMO (bottom right) */}
                  <div className={`hotspot-marker marker-gmo ${activeHotspot === 'gmo' ? 'expanded' : ''}`}
                    onMouseEnter={() => setActiveHotspot('gmo')}
                    onMouseLeave={() => setActiveHotspot(null)}>
                    <div className="hotspot-dot"></div>
                    <div className="hotspot-connector-line"></div>
                    <span className="hotspot-label">Non-GMO</span>
                    <div className="hotspot-bubble-tooltip">
                      100% natural plant-sourced ingredients clean of bio-engineering.
                    </div>
                  </div>

                  {/* Hotspot 3: Premium Ingredients (bottom left) */}
                  <div className={`hotspot-marker marker-ingredients ${activeHotspot === 'ingredients' ? 'expanded' : ''}`}
                    onMouseEnter={() => setActiveHotspot('ingredients')}
                    onMouseLeave={() => setActiveHotspot(null)}>
                    <div className="hotspot-dot"></div>
                    <div className="hotspot-connector-line"></div>
                    <span className="hotspot-label">Premium Ingredients</span>
                    <div className="hotspot-bubble-tooltip">
                      Sourced from certified high-altitude organic growers across India.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pill preview circular thumbnail */}
              <div className="hero-pill-preview-col">
                <div className="pill-circle-card">
                  <div className="pill-circle-image-wrapper">
                    <img
                      src="/niramaya/capsules-preview.jpg"
                      alt="Bioactive capsules close-up"
                    />
                  </div>
                  <div className="pill-card-details">
                    <h5>Bioactive Synergy</h5>
                    <p>Designed for optimized assimilation and safety.</p>
                  </div>
                </div>

                <div className="small-quality-disclaimer">
                  <Sparkles size={14} className="sparkle-icon" />
                  <span>Our products are formulated with science-backed ingredients, free from artificial additives, and made to standard pharmacopoeia codes.</span>
                </div>
              </div>

            </div>
          </section>

          {/* NEW ARRIVALS & PRODUCTS SECTION */}
          <section id="shop" className="niramaya-products-section">
            <div className="section-head-bar">
              <div>
                <h2 className="products-sec-title">New Arrivals</h2>
                <p className="products-sec-subtitle">Shop now and fuel your body with the best organic elements!</p>
              </div>

              {/* Category tabs */}
              <div className="categories-tab-row">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`category-tab-btn ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="products-search-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search vitamins, ayurvedic extracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <div className="no-products-view">
                <h3>No supplements found</h3>
                <p>Try resetting filters or checking your search spelling.</p>
                <button className="reset-btn" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="niramaya-products-grid">
                {filteredProducts.map(product => {
                  const cartItem = cart.find(item => item.product.id === product.id);
                  const isWishlisted = wishlist.includes(product.id);

                  return (
                    <div key={product.id} className="supplement-card">

                      <div className="card-image-container">
                        <img src={product.image} alt={product.name} />

                        <button
                          className={`wishlist-toggle-btn ${isWishlisted ? 'liked' : ''}`}
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Toggle wishlist"
                        >
                          <Heart size={16} fill={isWishlisted ? "#ea4335" : "none"} stroke={isWishlisted ? "#ea4335" : "#363636"} />
                        </button>

                        <div className="card-origin-badge">
                          <Activity size={12} />
                          <span>{product.origin}</span>
                        </div>
                      </div>

                      <div className="card-details-wrap">
                        <div className="card-meta-line">
                          <span className="card-cat-label">{product.category}</span>
                          <div className="card-rating">
                            <Star size={12} fill="#fbbc04" stroke="#fbbc04" />
                            <span>{product.rating}</span>
                          </div>
                        </div>

                        <h3 className="card-prod-title">{product.name}</h3>
                        <p className="card-prod-unit">{product.unit}</p>

                        <div className="card-action-row">
                          <span className="card-prod-price">₹{product.price}</span>

                          {cartItem ? (
                            <div className="card-qty-selectors">
                              <button onClick={() => updateQuantity(product.id, -1)} aria-label="Decrease quantity">
                                <Minus size={12} />
                              </button>
                              <span>{cartItem.quantity}</span>
                              <button onClick={() => addToCart(product)} aria-label="Increase quantity">
                                <Plus size={12} />
                              </button>
                            </div>
                          ) : (
                            <button className="card-add-btn" onClick={() => addToCart(product)}>
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* CORE ABOUT & PHILOSOPHY SECTION */}
          <NiramayaAbout />

          {/* OFFERS SECTION */}
          <NiramayaOffers onAddBundle={handleAddBundle} />
        </>
      )}

      {activeView === 'Blog' && <NiramayaBlog />}
      {activeView === 'Profile' && <NiramayaProfile />}
      {activeView === 'Legal' && <NiramayaLegal documentType={legalDoc} />}

      {/* FOOTER */}
      <NiramayaFooter setActiveView={setActiveView} setLegalDoc={setLegalDoc} />

      {/* WISHLIST OVERLAY / DRAWER */}
      <div className={`drawer-overlay-wrapper ${isWishlistOpen ? 'open' : ''}`} onClick={() => setIsWishlistOpen(false)}>
        <div className="side-drawer wishlist-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>My Wishlist ({wishlist.length})</h3>
            <button className="drawer-close-btn" onClick={() => setIsWishlistOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="drawer-content-scroll">
            {wishlist.length === 0 ? (
              <div className="empty-drawer-state">
                <Heart size={48} className="empty-heart-icon" />
                <h4>Your wishlist is empty</h4>
                <p>Tap the heart icon on any supplement to add items here.</p>
                <button className="continue-shop-btn" onClick={() => setIsWishlistOpen(false)}>Continue Browsing</button>
              </div>
            ) : (
              <div className="wishlist-items-list">
                {wishlist.map(id => {
                  const prod = PRODUCTS.find(p => p.id === id);
                  if (!prod) return null;
                  return (
                    <div key={prod.id} className="drawer-item-row">
                      <img src={prod.image} alt={prod.name} />
                      <div className="drawer-item-details">
                        <h4>{prod.name}</h4>
                        <p>₹{prod.price}</p>
                        <button className="move-to-cart-btn" onClick={() => { addToCart(prod); toggleWishlist(prod.id); }}>
                          Move to Cart
                        </button>
                      </div>
                      <button className="remove-item-btn" onClick={() => toggleWishlist(prod.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CART DRAWER */}
      <div className={`drawer-overlay-wrapper ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="side-drawer cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>Shopping Bag ({totalItemsCount})</h3>
            <button className="drawer-close-btn" onClick={() => setIsCartOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="drawer-content-scroll">
            {cart.length === 0 ? (
              <div className="empty-drawer-state">
                <ShoppingBag size={48} className="empty-cart-icon" />
                <h4>Your shopping bag is empty</h4>
                <p>Add products to start fueling your daily vitality.</p>
                <button className="continue-shop-btn" onClick={() => setIsCartOpen(false)}>Shop Supplements</button>
              </div>
            ) : (
              <div className="cart-items-list">
                {cart.map(item => (
                  <div key={item.product.id} className="drawer-item-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="drawer-item-details">
                      <h4>{item.product.name}</h4>
                      <p>₹{item.product.price} / {item.product.unit}</p>

                      <div className="qty-picker-small">
                        <button onClick={() => updateQuantity(item.product.id, -1)}>
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="item-subtotal-price">
                      ₹{item.product.price * item.quantity}
                    </div>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="drawer-footer-summary">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-line">
                <span>Delivery</span>
                <span>{cartTotal > 999 ? 'FREE' : '₹99'}</span>
              </div>
              <div className="summary-line total-price-line">
                <span>Total</span>
                <span>₹{cartTotal + (cartTotal > 999 ? 0 : 99)}</span>
              </div>

              <button
                className="proceed-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutState('form');
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL FLOW */}
      {checkoutState !== 'none' && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-card">

            {checkoutState === 'form' && (
              <>
                <div className="modal-header">
                  <h3>Secure Delivery Checkout</h3>
                  <button className="close-modal-btn" onClick={() => setCheckoutState('none')}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                  <div className="form-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.name}
                      onChange={e => setShippingInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Aniket Mahajan"
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Shipping Address</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={e => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Flat 402, Shiv Ranjani, Bandra West, Mumbai"
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={e => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <button type="submit" className="submit-checkout-btn">
                    Place Order (Cash / UPI on Delivery)
                  </button>
                </form>
              </>
            )}

            {checkoutState === 'processing' && (
              <div className="modal-loading-state">
                <div className="payment-spinner"></div>
                <h3>Processing Order...</h3>
                <p>We are verifying delivery partner logs and securing standard packaging protocols.</p>
              </div>
            )}

            {checkoutState === 'success' && (
              <div className="modal-success-state">
                <CheckCircle2 size={64} className="success-icon-green" />
                <h3>Order Placed Successfully!</h3>
                <p className="success-txt">
                  Thank you, <strong>{shippingInfo.name}</strong>! Your order will be dispatched to <strong>{shippingInfo.address}</strong> via our Wellness Express courier network.
                </p>
                <div className="receipt-details">
                  <span>Order Reference: <strong>#NV-93218</strong></span>
                  <span>Method: <strong>Ayurvedic Express Courier</strong></span>
                </div>
                <button className="close-success-btn" onClick={() => setCheckoutState('none')}>
                  Continue Shopping
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default NiramayaApp;
