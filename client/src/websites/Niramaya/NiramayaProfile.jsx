import React, { useState } from 'react';
import { User, Shield, Package, Activity, Award, LogOut, Check, Plus, Droplets, Moon, Coffee } from 'lucide-react';
import './NiramayaProfile.css';

function NiramayaProfile() {
  const [waterCount, setWaterCount] = useState(5);
  const [supplementsTaken, setSupplementsTaken] = useState({
    vitD3: true,
    ashwagandha: false,
    curcumin: false
  });

  const handleWaterIncrement = () => {
    if (waterCount < 10) setWaterCount(prev => prev + 1);
  };

  const toggleSupplement = (key) => {
    setSupplementsTaken(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const orders = [
    {
      id: "NV-92011",
      date: "June 12, 2026",
      status: "Delivered",
      total: 1299,
      items: "Vedic Vitality Ritual (1x)"
    },
    {
      id: "NV-87114",
      date: "May 22, 2026",
      status: "Delivered",
      total: 899,
      items: "Vegan Vitamin D3 + K2 (1x)"
    }
  ];

  return (
    <div className="niramaya-profile-section">
      <div className="niramaya-profile-container">
        
        {/* PROFILE HEADER/HERO */}
        <div className="profile-hero-card">
          <div className="profile-avatar-wrapper">
            <div className="avatar-letter">A</div>
            <span className="profile-tier-badge">Arogya Gold Member</span>
          </div>
          <div className="profile-meta-info">
            <h2>Aniket Mahajan</h2>
            <p className="profile-email">aniketvm1104@gmail.com</p>
            <p className="profile-loc">Mumbai, Maharashtra, India</p>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Arogya Points</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2</span>
              <span className="stat-label">Active Subscriptions</span>
            </div>
          </div>
        </div>

        <div className="profile-layout-grid">
          {/* WELLNESS TRACKER */}
          <div className="profile-col-tracker">
            <div className="dashboard-card wellness-card">
              <div className="card-header-icon">
                <Activity size={20} />
                <h3>Daily Wellness Checklist</h3>
              </div>
              
              <div className="checklist-subtext">Track your bio-harmony and supplement goals.</div>

              {/* Supplements Scheduler */}
              <div className="tracker-sub-section">
                <h4>Supplement Schedule</h4>
                <div className="supplement-checklist">
                  <div className={`supp-item ${supplementsTaken.vitD3 ? 'done' : ''}`} onClick={() => toggleSupplement('vitD3')}>
                    <div className="checkbox-indicator">
                      {supplementsTaken.vitD3 && <Check size={14} />}
                    </div>
                    <div className="supp-details">
                      <h5>Vitamin D3 + K2</h5>
                      <span>1 capsule in the morning with food</span>
                    </div>
                  </div>

                  <div className={`supp-item ${supplementsTaken.ashwagandha ? 'done' : ''}`} onClick={() => toggleSupplement('ashwagandha')}>
                    <div className="checkbox-indicator">
                      {supplementsTaken.ashwagandha && <Check size={14} />}
                    </div>
                    <div className="supp-details">
                      <h5>Ashwagandha Gold</h5>
                      <span>1 tablet after dinner with warm water</span>
                    </div>
                  </div>

                  <div className={`supp-item ${supplementsTaken.curcumin ? 'done' : ''}`} onClick={() => toggleSupplement('curcumin')}>
                    <div className="checkbox-indicator">
                      {supplementsTaken.curcumin && <Check size={14} />}
                    </div>
                    <div className="supp-details">
                      <h5>Organic Turmeric Curcumin</h5>
                      <span>1 capsule in the afternoon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Water logging */}
              <div className="tracker-sub-section">
                <div className="water-tracker-header">
                  <h4>Hydration Tracker</h4>
                  <span className="water-ratio">{waterCount}/10 Glasses</span>
                </div>
                <div className="water-progress-bar">
                  <div className="water-progress-filled" style={{ width: `${(waterCount/10)*100}%` }}></div>
                </div>
                <button className="log-water-btn" onClick={handleWaterIncrement} disabled={waterCount >= 10}>
                  <Plus size={16} /> Log 250ml Water
                </button>
              </div>

              {/* Health stats details */}
              <div className="wellness-mini-stats">
                <div className="mini-stat">
                  <Moon size={16} className="sleep-icon" />
                  <div>
                    <span className="mini-val">7.8 hrs</span>
                    <span className="mini-lbl">Sleep Duration</span>
                  </div>
                </div>
                <div className="mini-stat">
                  <Coffee size={16} className="energy-icon" />
                  <div>
                    <span className="mini-val">Balanced</span>
                    <span className="mini-lbl">Stress Index</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ORDER HISTORY & ACCOUNT SETTINGS */}
          <div className="profile-col-info">
            
            {/* Orders Card */}
            <div className="dashboard-card orders-card">
              <div className="card-header-icon">
                <Package size={20} />
                <h3>Order History</h3>
              </div>
              
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-row-item">
                    <div className="order-row-header">
                      <span className="order-number">Order #{order.id}</span>
                      <span className="order-status-badge">{order.status}</span>
                    </div>
                    <div className="order-row-details">
                      <span className="order-date">{order.date}</span>
                      <span className="order-items">{order.items}</span>
                    </div>
                    <div className="order-row-footer">
                      <span className="order-total-price">₹{order.total}</span>
                      <button className="invoice-btn" onClick={() => alert("Downloading receipt details...")}>Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings / Badges */}
            <div className="dashboard-card security-card">
              <div className="card-header-icon">
                <Shield size={20} />
                <h3>Security & Preferences</h3>
              </div>
              <ul className="profile-preferences-list">
                <li>
                  <span>Two-Factor Authentication</span>
                  <button className="toggle-btn-small active">Enabled</button>
                </li>
                <li>
                  <span>Weekly Wellness Digest</span>
                  <button className="toggle-btn-small active">Subscribed</button>
                </li>
                <li>
                  <span>Ayush Doctor Consultation Alerts</span>
                  <button className="toggle-btn-small">Disabled</button>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default NiramayaProfile;
