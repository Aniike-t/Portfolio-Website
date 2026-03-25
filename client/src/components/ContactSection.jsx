import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaCode, FaRocket } from 'react-icons/fa';
import './ContactSection.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const ContactSection = () => {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('Warping through the network...');

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${API_URL}/user_contactus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok) {
                setStatus('Message received! I will get back to you soon.');
                e.target.reset();
            } else {
                throw new Error(result.error || 'The transmission was lost.');
            }
        } catch (err) {
            setStatus(`Failed to send: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-v2-container fade-in">
            <div className="contact-v2-grid">
                <div className="contact-v2-info">
                    <div className="contact-badge">
                        <span className="pulse-dot"></span>
                        OPEN FOR OPPORTUNITIES
                    </div>
                    <h2 className="contact-v2-title">
                        Let's start your next <span className="gradient-text">Big Thing.</span>
                    </h2>
                    <p className="contact-v2-description">
                        Whether you have a specific project in mind, want to hire me for a role,
                        or just want to talk tech – I'm just a message away.
                    </p>

                    <div className="availability-grid">
                        <div className="avail-item">
                            <FaCode /> <span>Freelance</span>
                        </div>
                        <div className="avail-item">
                            <FaRocket /> <span>Collaboration</span>
                        </div>
                        <div className="avail-item">
                            <FaBriefcase /> <span>Full-Time Hire</span>
                        </div>
                    </div>

                    <div className="contact-cards">
                        <a href="mailto:aniketvm1104@gmail.com" className="c-card">
                            <div className="c-icon-box"><FaEnvelope /></div>
                            <div className="c-info">
                                <span>Email</span>
                                <strong>aniketvm1104@gmail.com</strong>
                            </div>
                        </a>
                        <a href="tel:+917738185520" className="c-card">
                            <div className="c-icon-box"><FaPhoneAlt /></div>
                            <div className="c-info">
                                <span>Mobile</span>
                                <strong>+91 7738185520</strong>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="contact-form-glass">
                    <form className="contact-v2-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Name <span className="required-star">*</span></label>
                                <input type="text" name="name" placeholder="John Doe" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Email Address <span className="required-star">*</span></label>
                                <input type="email" name="email" placeholder="john@example.com" required />
                            </div>
                            <div className="input-group">
                                <label>Mobile</label>
                                <input type="text" name="mobile" placeholder="+1 (234) 567..." />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Message <span className="required-star">*</span></label>
                            <textarea name="message" placeholder="I have a project idea regarding NLP..." rows="4" required></textarea>
                        </div>

                        <button type="submit" className="contact-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} <FaPaperPlane />
                        </button>

                        {status && (
                            <div className={`form-feedback ${status.includes('received') ? 'success' : 'error'}`}>
                                {status}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
