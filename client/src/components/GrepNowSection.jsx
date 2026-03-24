import React from 'react';
import './GrepNowSection.css';
import { FaAndroid, FaStar, FaChartLine, FaBrain, FaLayerGroup } from 'react-icons/fa';

const GrepNowSection = () => {
    return (
        <section id="grepnow" className="section grepnow-featured">
            <div className="grep-business-section">
                <div className="grep-bg-layer"></div>

                <div className="section-header-io fade-in" style={{ maxWidth: '1400px', margin: '0 auto 60px', padding: '0 40px' }}>
                    <span className="section-subtitle">FEATURED VENTURE</span>
                    <h2 className="section-title">Case Study: <span className="gradient-text">gREP</span></h2>
                    <div className="section-line"></div>
                </div>

                <div className="grep-content-wrapper">
                    <div className="grep-info-side">
                        <div className="grep-badge">FEATURED VENTURE</div>
                        <h2 className="grep-brand-title">gREP</h2>
                        <p className="grep-tagline">Vocabulary Mastered. Eloquence Demystified.</p>

                        <div className="grep-main-description">
                            gREP is a full-scale educational ecosystem engineered to fix the fragmented nature of language learning.
                            By combining a proprietary **Spaced Repetition Algorithm** with a minimalist, gesture-driven
                            Android interface, I've created a platform that treats vocabulary as a scientific pursuit.
                        </div>

                        <div className="grep-stats-grid">
                            <div className="stat-card">
                                <FaStar className="s-icon purple" />
                                <div className="stat-val">4.8</div>
                                <div className="stat-label">User Rating</div>
                            </div>
                            <div className="stat-card">
                                <FaChartLine className="s-icon blue" />
                                <div className="stat-val">150+</div>
                                <div className="stat-label">Word Mastery Decks</div>
                            </div>
                            <div className="stat-card">
                                <FaAndroid className="s-icon green" />
                                <div className="stat-val">Active</div>
                                <div className="stat-label">On Play Store</div>
                            </div>
                        </div>

                        <div className="grep-actions">
                            <a href="https://grepnow.in/" target="_blank" rel="noopener noreferrer" className="grep-btn-primary">
                                VISIT GREPNOW.IN
                            </a>
                            <a href="https://github.com/aniike-t/grep-vocabulary" target="_blank" rel="noopener noreferrer" className="grep-btn-secondary">
                                VIEW ARCHITECTURE
                            </a>
                        </div>
                    </div>

                    <div className="grep-visual-side">
                        <div className="phone-mockup-v2">
                            <div className="screen-inner">
                                <img src="https://www.grepnow.in/og-image.png" alt="gREP Application UI" />
                            </div>
                        </div>

                        <div className="feature-floating-cards">
                            <div className="f-card f1">
                                <FaBrain />
                                <span>Neural Spaced Repetition</span>
                            </div>
                            <div className="f-card f2">
                                <FaLayerGroup />
                                <span>Custom Mastery Decks</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grep-tech-strip">
                    <div className="tech-marquee">
                        <span>REACT NATIVE</span> • <span>ANDROID ARCHITECTURE</span> • <span>DYNAMODB</span> •
                        <span>PIXEL-PERFECT UI</span> • <span>SPACED REPETITION</span> • <span>OFFLINE SYNC</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrepNowSection;
