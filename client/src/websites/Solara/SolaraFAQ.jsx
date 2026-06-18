import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import data from './data/solaraData.json';
import './SolaraFAQ.css';

function SolaraFAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="solara-faq-section">
      <div className="solara-faq-container">
        
        {/* Left Column: Descriptive text */}
        <div className="faq-intro-col">
          <span className="solara-section-subtitle">Common Queries</span>
          <h2 className="solara-section-title">Frequently Asked Questions</h2>
          <p className="faq-desc">
            Find clear and simple answers to the most common questions about solar energy conversions, grid metering, and storage backup limits.
          </p>
        </div>

        {/* Right Column: Accordion list */}
        <div className="faq-accordion-col">
          {data.faqs.map(faq => {
            const isOpen = activeId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`accordion-row ${isOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion(faq.id)}
              >
                <div className="accordion-trigger">
                  <h4>{faq.question}</h4>
                  <span className="accordion-icon-box">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </div>
                
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default SolaraFAQ;
