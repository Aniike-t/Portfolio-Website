import React from 'react';
import { User, Package, CreditCard, Heart, LogOut } from 'lucide-react';
import './GramuseProfile.css';

function GramuseProfile() {
  return (
    <div className="gramuse-profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-avatar-section">
            <div className="avatar-circle">AM</div>
            <h3>Aniket Mahajan</h3>
            <span className="member-status">Green Member</span>
          </div>
          
          <nav className="profile-nav">
            <button className="nav-btn active"><User size={18} /> Personal Details</button>
            <button className="nav-btn"><Package size={18} /> My Deliveries</button>
            <button className="nav-btn"><Heart size={18} /> Favorite Farms</button>
            <button className="nav-btn"><CreditCard size={18} /> Payment Methods</button>
            <button className="nav-btn logout-btn"><LogOut size={18} /> Sign Out</button>
          </nav>
        </div>

        <div className="profile-main-content">
          <div className="profile-card">
            <h2>Personal Details</h2>
            <form className="details-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" defaultValue="Aniket" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" defaultValue="Mahajan" />
                </div>
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" defaultValue="hello@aniket.com" />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 000-0000" />
              </div>
              <button type="submit" className="gramuse-btn update-btn">Update Information</button>
            </form>
          </div>

          <div className="profile-card sub-card">
            <h2>Active Subscriptions</h2>
            <div className="subscription-box">
              <div className="sub-info">
                <h4>Weekly Harvest Box</h4>
                <p>Delivered every Sunday morning.</p>
              </div>
              <span className="sub-price">$35.00 / wk</span>
              <button className="manage-sub-btn">Manage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GramuseProfile;
