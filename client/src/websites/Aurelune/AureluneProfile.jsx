import React from 'react';
import './AureluneProfile.css';

function AureluneProfile() {
  return (
    <div className="aurelune-profile-page">
      <div className="profile-header">
        <h1 className="profile-title">My Client Account</h1>
        <p className="profile-subtitle">Manage your personal details, track orders, and view saved pieces.</p>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <button className="profile-nav-link active">Personal Information</button>
          <button className="profile-nav-link">Order History</button>
          <button className="profile-nav-link">Saved Items</button>
          <button className="profile-nav-link">Address Book</button>
          <button className="profile-nav-link logout">Sign Out</button>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" defaultValue="Guest" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" defaultValue="User" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue="guest@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AureluneProfile;
