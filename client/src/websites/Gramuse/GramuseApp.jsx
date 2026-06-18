import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, X, Plus, Minus, Star, Trash2, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import BackToPortfolio from '../BackToPortfolio';
import GramuseAbout from './GramuseAbout';
import GramuseOffers from './GramuseOffers';
import GramuseProfile from './GramuseProfile';
import GramuseLegal from './GramuseLegal';
import GramuseFooter from './GramuseFooter';
import PRODUCTS from './data/gramuseProducts.json';
import './GramuseApp.css';
// Products are loaded from JSON
const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Meat', 'Beverages'];

function GramuseApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  // View state: 'Shop', 'Profile', 'Legal'
  const [activeView, setActiveView] = useState('Shop');
  const [legalDoc, setLegalDoc] = useState('privacy');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout Modal states: 'none' | 'form' | 'processing' | 'success'
  const [checkoutState, setCheckoutState] = useState('none');
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', phone: '' });

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedCategory === 'All') {
      // Only show featured when no search and no specific category
      result = result.filter(p => p.featured !== false);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchTerm, sortBy]);

  // Cart operations
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

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Checkout submission handler
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) return;
    
    setCheckoutState('processing');
    
    // Simulate API call for payment & processing
    setTimeout(() => {
      setCheckoutState('success');
      setCart([]);
    }, 2000);
  };

  return (
    <div className="gramuse-theme-container">
      <BackToPortfolio />
      
      {/* HEADER */}
      <header className="gramuse-header">
        <div className="gramuse-header-left">
          <div className="gramuse-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-name">Gramuse</span>
          </div>
        </div>

        <div className="gramuse-search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search fresh groceries, organics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="gramuse-header-right">
          <nav className="gramuse-nav-links">
            <button className={activeView === 'Shop' ? 'active' : ''} onClick={() => { setActiveView('Shop'); window.scrollTo(0,0); }}>Shop</button>
            <button onClick={() => { setActiveView('Shop'); document.getElementById('about')?.scrollIntoView({behavior:'smooth'}); }}>About Us</button>
            <button onClick={() => { setActiveView('Shop'); document.getElementById('offers')?.scrollIntoView({behavior:'smooth'}); }}>Offers</button>
            <button className={activeView === 'Profile' ? 'active' : ''} onClick={() => { setActiveView('Profile'); window.scrollTo(0,0); }}>Profile</button>
          </nav>
          
          <button className="gramuse-cart-trigger" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {totalItemsCount > 0 && (
              <span className="cart-badge-count">{totalItemsCount}</span>
            )}
          </button>
        </div>
      </header>

      {activeView === 'Shop' && (
        <>
          {/* HERO BANNER */}
          <section className="gramuse-hero">
            <div className="gramuse-hero-content">
              <span className="hero-tag">100% Organic & Healthy Foods</span>
              <h1>We bring the fresh store to your doorstep</h1>
              <p>Get organic produce, fresh bakery, milk, and tender meats sourced directly from local eco-certified farms.</p>
              <button onClick={() => document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})} className="gramuse-btn">Shop Now <ChevronRight size={16} /></button>
            </div>
            <div className="gramuse-hero-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80" 
                alt="Fresh basket of organic groceries"
              />
            </div>
          </section>

          {/* SHOP WORKSPACE */}
          <main id="shop" className="gramuse-shop-container">
            
            {/* FILTERS HEADER */}
        <div className="gramuse-filters-row">
          <div className="categories-scroller">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sorting-selector-wrap">
            <Filter size={16} className="filter-sort-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="gramuse-select"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-state">
            <h3>No products found</h3>
            <p>We couldn't find anything matching your filters or search query.</p>
            <button className="gramuse-btn secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="gramuse-products-grid">
            {filteredProducts.map(product => {
              const cartItem = cart.find(item => item.product.id === product.id);
              return (
                <div key={product.id} className="gramuse-product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <span className="product-origin">{product.origin}</span>
                  </div>

                  <div className="product-info">
                    <div className="product-cat-rating">
                      <span className="product-category">{product.category}</span>
                      <div className="product-rating">
                        <Star size={14} fill="#fbbc04" stroke="#fbbc04" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-unit">Price per {product.unit}</span>

                    <div className="product-card-footer">
                      <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                      
                      {cartItem ? (
                        <div className="qty-selector">
                          <button onClick={() => updateQuantity(product.id, -1)} aria-label="Decrease quantity">
                            <Minus size={14} />
                          </button>
                          <span>{cartItem.quantity}</span>
                          <button onClick={() => addToCart(product)} aria-label="Increase quantity">
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="add-to-cart-btn" 
                          onClick={() => addToCart(product)}
                          aria-label="Add to cart"
                        >
                          <Plus size={16} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

          {/* ABOUT SECTION */}
          <GramuseAbout />

          {/* OFFERS SECTION */}
          <GramuseOffers />
        </>
      )}

      {/* OTHER VIEWS */}
      {activeView === 'Profile' && <GramuseProfile />}
      {activeView === 'Legal' && <GramuseLegal documentType={legalDoc} />}

      {/* FOOTER */}
      <GramuseFooter setActiveView={setActiveView} setLegalDoc={setLegalDoc} />

      {/* CART DRAWER */}
      <div className={`gramuse-cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="gramuse-cart-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <h3>Shopping Cart ({totalItemsCount})</h3>
            <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="cart-drawer-content">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <div className="empty-cart-icon">🛒</div>
                <h4>Your cart is empty</h4>
                <p>Add fresh items from our shop page to fill your green basket.</p>
                <button className="gramuse-btn" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
              </div>
            ) : (
              <div className="cart-items-list">
                {cart.map(item => (
                  <div key={item.product.id} className="cart-item-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="cart-item-details">
                      <h4>{item.product.name}</h4>
                      <p>₹{item.product.price.toLocaleString('en-IN')} / {item.product.unit}</p>
                      
                      <div className="cart-item-actions">
                        <div className="qty-selector small">
                          <button onClick={() => updateQuantity(item.product.id, -1)}>
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addToCart(item.product)}>
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <button className="cart-remove-btn" onClick={() => removeFromCart(item.product.id)}>
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-subtotal">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-summary-line">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary-line">
                <span>Eco Shipping</span>
                <span>{cartTotal > 1000 ? 'FREE' : '₹150'}</span>
              </div>
              <div className="cart-summary-line total">
                <span>Total</span>
                <span>₹{(cartTotal + (cartTotal > 1000 ? 0 : 150)).toLocaleString('en-IN')}</span>
              </div>

              <button 
                className="checkout-btn" 
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
        <div className="gramuse-checkout-modal-overlay">
          <div className="gramuse-checkout-modal">
            
            {checkoutState === 'form' && (
              <>
                <div className="modal-header">
                  <h3>Secure Checkout</h3>
                  <button className="close-modal-btn" onClick={() => setCheckoutState('none')}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={shippingInfo.name} 
                      onChange={e => setShippingInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Aniket Mahajan"
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <input 
                      type="text" 
                      required 
                      value={shippingInfo.address} 
                      onChange={e => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Eco Green Boulevard, New York, NY"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input 
                      type="tel" 
                      required 
                      value={shippingInfo.phone} 
                      onChange={e => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <button type="submit" className="confirm-payment-btn">
                    Place Secure Order
                  </button>
                </form>
              </>
            )}

            {checkoutState === 'processing' && (
              <div className="checkout-loading-state">
                <div className="spinner"></div>
                <h3>Securing Payment...</h3>
                <p>Please do not close this window. We are verifying your order details with local eco-delivery networks.</p>
              </div>
            )}

            {checkoutState === 'success' && (
              <div className="checkout-success-state">
                <CheckCircle2 size={64} color="#34a853" className="success-icon" />
                <h3>Order Confirmed!</h3>
                <p className="success-message">
                  Thank you, <strong>{shippingInfo.name}</strong>! Your order will be delivered to <strong>{shippingInfo.address}</strong> within 15 minutes.
                </p>
                <div className="order-receipt-summary">
                  <span>Order Number: <strong>#GR-48201</strong></span>
                  <span>Method: <strong>Carbon Neutral Drone</strong></span>
                </div>
                <button className="gramuse-btn" onClick={() => setCheckoutState('none')}>
                  Back to Shop
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default GramuseApp;
