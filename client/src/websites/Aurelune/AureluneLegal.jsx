import React from 'react';
import './AureluneLegal.css';

function AureluneLegal({ documentType }) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p>Last updated: June 2026</p>
          <h3>1. Information We Collect</h3>
          <p>At Aurelune, we collect personal information that you provide to us when you create an account, place an order, subscribe to our newsletter, or contact our client services team. This may include your name, email address, shipping and billing addresses, and payment details.</p>
          
          <h3>2. How We Use Your Information</h3>
          <p>We use your information to process transactions, manage your account, deliver editorial content via our newsletter, and improve the overall client experience. We respect your privacy and never sell your personal data to third parties.</p>

          <h3>3. Data Security</h3>
          <p>We implement state-of-the-art security measures to maintain the safety of your personal information. All sensitive payment data is transmitted via Secure Socket Layer (SSL) technology and encrypted into our payment gateway providers' database.</p>
        </>
      )
    },
    terms: {
      title: "Terms & Conditions",
      body: (
        <>
          <p>Last updated: June 2026</p>
          <h3>1. General Provisions</h3>
          <p>Welcome to the Aurelune digital boutique. By accessing or using our website, you agree to be bound by these Terms & Conditions. Please read them carefully.</p>
          
          <h3>2. Intellectual Property</h3>
          <p>All content on this site, including but not limited to text, graphics, logos, images, and software, is the property of Aurelune Paris and is protected by international copyright laws. Unauthorized reproduction is strictly prohibited.</p>

          <h3>3. Pricing and Availability</h3>
          <p>All prices are listed in Indian Rupees (₹) unless otherwise noted. We reserve the right to modify prices or discontinue items without notice. Given the limited nature of our collections, items may sell out quickly.</p>
        </>
      )
    }
  };

  const currentDoc = content[documentType] || content['privacy'];

  return (
    <div className="aurelune-legal-page">
      <div className="legal-header">
        <h1 className="legal-title">{currentDoc.title}</h1>
      </div>
      <div className="legal-content">
        {currentDoc.body}
      </div>
    </div>
  );
}

export default AureluneLegal;
