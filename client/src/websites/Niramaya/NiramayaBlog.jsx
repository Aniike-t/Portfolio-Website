import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import './NiramayaBlog.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Science of KSM-66 Ashwagandha: Controlling Cortisol",
    excerpt: "KSM-66 is the highest concentration full-spectrum root extract on the market. Discover how it regulates stress hormone cortisol and boosts cognitive clarity.",
    category: "Ayurvedic Science",
    tag: "Stress Relief",
    readTime: "5 min read",
    image: "/niramaya/blog-ashwagandha.jpg",
    date: "June 15, 2026"
  },
  {
    id: 2,
    title: "Why Vitamin D3 Needs Vitamin K2: The Calcium Guide",
    excerpt: "Taking Vitamin D3 alone can be counterproductive. Learn how Vitamin K2 works as a GPS to direct calcium into your bones rather than arteries.",
    category: "Supplement Guide",
    tag: "Bone Health",
    readTime: "4 min read",
    image: "/niramaya/blog-vitd3.jpg",
    date: "June 10, 2026"
  },
  {
    id: 3,
    title: "Vedic Dinacharya: Healthy Morning Rituals",
    excerpt: "Incorporate Ayurvedic daily routines (Dinacharya) like oil pulling, tongue scraping, and early sunlight exposure to enhance metabolism and align bio-rhythms.",
    category: "Holistic Living",
    tag: "Ayurveda",
    readTime: "7 min read",
    image: "/niramaya/blog-morning.jpg",
    date: "June 05, 2026"
  }
];

function NiramayaBlog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog" className="niramaya-blog-section">
      <div className="niramaya-blog-container">
        <div className="blog-section-header">
          <span className="blog-subtitle">Our Blog</span>
          <h2 className="blog-title">Niramaya Wellness Journal</h2>
          <p className="blog-desc">
            Stay informed, stay healthy! Read expert articles on herbal pharmacology, clinical nutrition, and traditional Ayurvedic practices.
          </p>
        </div>

        {selectedPost ? (
          <div className="blog-post-detail-view">
            <button className="back-to-blog-list-btn" onClick={() => setSelectedPost(null)}>
              ← Back to Journal
            </button>
            <div className="post-detail-header">
              <span className="post-detail-cat">{selectedPost.category}</span>
              <h1>{selectedPost.title}</h1>
              <div className="post-detail-meta">
                <span>{selectedPost.date}</span>
                <span className="dot">•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>
            <img src={selectedPost.image} alt={selectedPost.title} className="post-detail-img" />
            <div className="post-detail-body">
              <p className="lead-paragraph">{selectedPost.excerpt}</p>
              <p>
                In the modern, fast-paced world, stress, sleep disruptions, and nutritional deficits have become standard. While fast-acting synthetics offer temporary relief, they rarely target the underlying cause of health issues. Ayurvedic herbology views the body as an interconnected system where balance (Sama) is key. By pairing adaptogenic roots like Ashwagandha with modern high-bioavailability vitamins, we can optimize cognitive, immunologic, and cardiovascular parameters.
              </p>
              <h3>The Synergy of Co-factors</h3>
              <p>
                A core principle of both classical Ayurvedic formulation and modern bio-chemistry is synergism: the combined effect of elements is greater than the sum of individual components. For example, piperine (black pepper extract) is clinically proven to increase curcumin absorption by up to 2000%. Similarly, fat-soluble Vitamin D3 is dependent on Vitamin K2 to activate osteocalcin, the protein that binds calcium to bones. Without K2, calcium circulating in the blood can build up in blood vessels, increasing calcification risk.
              </p>
              <blockquote>
                "Ayurveda teaches us that the right food is medicine, and the right medicine is food. Quality, clean, and science-backed supplementation bridges this gap in modern urban life."
              </blockquote>
              <p>
                Therefore, selecting premium grade extracts and pairing them with appropriate bio-catalysts is essential for safety and optimal bio-activity. Make sure to consult with health professionals to align your daily supplementation to your body's Prakriti (unique constitution).
              </p>
            </div>
          </div>
        ) : (
          <div className="blog-layout">
            <div className="featured-blog-col">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
                  <div className="blog-card-image-wrap">
                    <img src={post.image} alt={post.title} />
                    <span className="blog-card-tag">{post.tag}</span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-cat">{post.category}</span>
                      <div className="blog-card-time">
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="read-more-link">
                      Read Article <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="blog-sidebar-col">
              <div className="sidebar-card newsletter-card">
                <h3>Subscribe to Niramaya Vitality</h3>
                <p>Get weekly research updates, traditional seasonal recipes, and exclusive Ayurvedic lifestyle guides directly in your inbox.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }} className="sidebar-subscribe-form">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">Join Newsletter</button>
                </form>
              </div>

              <div className="sidebar-card tags-card">
                <h3>Popular Topics</h3>
                <div className="sidebar-tags-grid">
                  <span className="sidebar-chip">Stress Management</span>
                  <span className="sidebar-chip">Bone Density</span>
                  <span className="sidebar-chip">Gut Health</span>
                  <span className="sidebar-chip">Immunity Supplements</span>
                  <span className="sidebar-chip">Ayurvedic Herbs</span>
                  <span className="sidebar-chip">Daily Rituals</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NiramayaBlog;
