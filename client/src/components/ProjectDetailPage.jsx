import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './ProjectDetailPage.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL || '';

function ProjectDetailPage() {
  const { projectId } = useParams();

  const { data: project, isLoading, isError, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/get_project/${projectId}`);
      if (!response.ok) throw new Error('Project not found');
      return response.json();
    },
    enabled: !!projectId,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <div className="project-detail-container loading-state">
        <div className="google-dots-hero">
          <div className="dot dot-blue"></div>
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
        {/* <p>Fetching Lab Data...</p> */}
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="project-detail-container error-state">
        <h2 className="gradient-text">404 | Project Misplaced</h2>
        <p>{error?.message || "Data unavailable"}</p>
        <Link to="/" className="back-link-io">
          <IoArrowBack /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-layout fade-in">
      {/* Background Accents */}
      <div className="detail-bg-accent red"></div>
      <div className="detail-bg-accent blue"></div>

      <header className="detail-nav">
        <Link to="/" className="back-link-io">
          <IoArrowBack /> <span>Back to Index</span>
        </Link>
        <div className="nav-project-id">{project.id.toUpperCase()}</div>
      </header>

      <main className="detail-grid">
        {/* HERO SECTION */}
        <section className="detail-hero-section">
          <div className="detail-title-wrapper">
            {project.media && project.media.length > 0 && (
               <div className="project-logo-container">
                 <img 
                   src={project.media[0].url} 
                   alt={`${project.name} Logo`} 
                   className="project-logo-detail"
                 />
               </div>
            )}
            <h1 className="detail-title">{project.name}</h1>
          </div>
          <div className="detail-title-line"></div>
          <p className="detail-summary">{project.summary}</p>

          <div className="detail-meta-pills">
            {Array.isArray(project.technologies_used) && project.technologies_used.slice(0, 3).map((tech, i) => (
              <span key={i} className="meta-pill">{tech}</span>
            ))}
          </div>
        </section>

        {/* MEDIA SECTION */}
        {Array.isArray(project.media) && project.media.length > 1 && (
          <section className="detail-gallery-section">
            <div className="gallery-main">
              {project.media.slice(1).map((item, index) => (
                <div key={index} className={`gallery-item ${item.type === 'video/mp4' ? 'video' : 'image'}`}>
                  {item.type === 'image' ? (
                    <img src={item.url} alt={`${project.name} screenshot`} />
                  ) : (
                    <video autoPlay muted loop playsInline>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTENT SECTION */}
        <section className="detail-content-section">
          <div className="content-card about-project">
            <h3>Project Context</h3>
            <p>{project.problem_statement}</p>
          </div>

          <aside className="content-sidebar">
            <div className="content-card tech-stack">
              <h3>Stack Overview</h3>
              <div className="tech-tags-io">
                {Array.isArray(project.technologies_used) && project.technologies_used.map((tech, i) => (
                  <span key={i} className="tech-tag-io">{tech}</span>
                ))}
              </div>
            </div>

            <div className="content-card repo-card">
              <h3>Collaborate</h3>
              <p>Explore the source code on GitHub or contribute to the project repository.</p>
              <a href={project.github_repo} target="_blank" rel="noopener noreferrer" className="github-btn-io">
                <FaGithub /> <span>Repository</span> <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </aside>
        </section>
      </main>

      <footer className="detail-footer">
        <div className="footer-line"></div>
        <p>© 2026 Aniket Mahajan</p>
      </footer>
    </div>
  );
}

export default ProjectDetailPage;