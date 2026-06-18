import React from 'react';
import './NiramayaLegal.css';

function NiramayaLegal({ documentType = 'privacy' }) {
  const content = {
    privacy: {
      title: "Privacy & Data Policy",
      subtitle: "Last Updated: June 15, 2026",
      sections: [
        {
          heading: "1. Information We Collect",
          body: "We collect personal information necessary to deliver Niramaya Wellness products and customize your health tracker dashboards. This includes your name, email, billing address, and wellness logs (such as water logs and supplement checklists) if logged by you."
        },
        {
          heading: "2. How We Use Data",
          body: "We do not sell or share your health parameters with third-party insurance or marketing agencies. Your data is used exclusively to optimize user dashboards, dispatch wellness orders, and send weekly Ayurvedic lifestyle updates (if subscribed)."
        },
        {
          heading: "3. Health Logs & Device Privacy",
          body: "All checklist parameters, water logs, and supplement tracking remain entirely local to your device's browser cache. We do not persist sensitive metabolic metrics on remote databases unless explicitly linked to an active medical portal."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Last Updated: June 15, 2026",
      sections: [
        {
          heading: "1. Product Usage Disclaimer",
          body: "Niramaya Wellness products are classified as food supplements. They are not intended to diagnose, treat, cure, or prevent any chronic disease. Statements on this site have not been evaluated by regulatory drug controls."
        },
        {
          heading: "2. Ayurvedic Consultations",
          body: "Any recommendations generated through our wellness logs are for educational purposes only. They do not constitute professional medical advice, diagnosis, or treatment."
        },
        {
          heading: "3. Local Delivery Commitments",
          body: "Supplements ordered through our express portal are delivered via certified logistics partners. Delivery times may vary depending on local weather conditions or heavy traffic zones."
        }
      ]
    }
  };

  const activeDoc = content[documentType] || content.privacy;

  return (
    <div className="niramaya-legal-section">
      <div className="niramaya-legal-container">
        <h1 className="legal-title">{activeDoc.title}</h1>
        <span className="legal-subtitle">{activeDoc.subtitle}</span>

        <div className="legal-document-body">
          {activeDoc.sections.map((sec, i) => (
            <div key={i} className="legal-paragraph-block">
              <h3>{sec.heading}</h3>
              <p>{sec.body}</p>
            </div>
          ))}
          
          <div className="legal-footer-disclaimer">
            <p>
              <strong>Regulatory Notice:</strong> Niramaya Wellness is a licensed manufacturer of Ayurvedic proprietary medicines under AYUSH regulations. For specific clinical consultations, always consult a registered Ayurvedic Doctor (Vaidya) or your general practitioner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NiramayaLegal;
