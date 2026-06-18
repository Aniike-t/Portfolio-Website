import React from 'react';
import { Star } from 'lucide-react';
import data from './data/solaraData.json';
import './SolaraTestimonials.css';

function SolaraTestimonials() {
  return (
    <section className="solara-testimonials-section">
      <div className="solara-testimonials-container">
        
        <div className="testimonials-header">
          <span className="solara-section-subtitle">Testimonials</span>
          <h2 className="solara-section-title">What Our Clients Say</h2>
          <p className="testimonials-sub">
            Hear from homeowners and industrial plant managers who made the swap to Solara power.
          </p>
        </div>

        <div className="testimonials-grid-layout">
          {data.testimonials.map(review => (
            <div key={review.id} className="testimonial-card">
              <div className="stars-row">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#beff53" stroke="#beff53" />
                ))}
              </div>
              <p className="review-text">"{review.review}"</p>
              <div className="client-info">
                <div className="avatar-placeholder">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4>{review.name}</h4>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SolaraTestimonials;
