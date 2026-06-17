import React from 'react';
import './GramuseLegal.css';

function GramuseLegal({ documentType }) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p>Last updated: June 2026</p>
          <h3>1. Our Commitment to Your Privacy</h3>
          <p>At Gramuse, we believe in transparency, both in where your food comes from and how we handle your personal data. We collect information such as your delivery address, name, and email to ensure your fresh produce arrives on time.</p>
          
          <h3>2. Data Usage</h3>
          <p>Your data is used exclusively to manage orders, process payments, and provide you with updates regarding local harvests and farm news. We never sell your personal information to third-party advertisers.</p>

          <h3>3. Secure Processing</h3>
          <p>All payment processing is handled through secure, eco-certified banking partners using end-to-end encryption. We do not store your credit card information on our servers.</p>
        </>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <>
          <p>Last updated: June 2026</p>
          <h3>1. Service Availability</h3>
          <p>Gramuse operates within specific delivery zones to ensure the freshness of our produce. By placing an order, you confirm that your delivery address is within our active service areas.</p>
          
          <h3>2. Freshness Guarantee & Refunds</h3>
          <p>We stand by the quality of our local farm partners. If any item arrives damaged or fails to meet our freshness standards, please contact us within 24 hours for a full refund or replacement in your next box.</p>

          <h3>3. Subscription Modifications</h3>
          <p>Weekly harvest box subscriptions can be paused, modified, or cancelled at any time up to 48 hours before your scheduled delivery day.</p>
        </>
      )
    }
  };

  const currentDoc = content[documentType] || content['privacy'];

  return (
    <div className="gramuse-legal-page">
      <div className="legal-container">
        <div className="legal-header">
          <h1>{currentDoc.title}</h1>
        </div>
        <div className="legal-content">
          {currentDoc.body}
        </div>
      </div>
    </div>
  );
}

export default GramuseLegal;
