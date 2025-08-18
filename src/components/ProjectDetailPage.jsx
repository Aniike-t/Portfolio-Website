import React from 'react';
import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './ProjectDetailPage.css';
import { FaGithub } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";


function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-not-found">
            <h2>Project Not Found</h2>
            <Link to="/" className="back-link">
                <IoArrowBack /> Go Back to Portfolio
            </Link>
        </div>
      </div>
    );
  }

return (
    <div className="project-detail-container">
            <header className="detail-header">
                    <Link to="/#projects-section" className="back-link">
                            <IoArrowBack /> Back to Portfolio
                    </Link>
            </header>
            <main className="project-content">
                    <h1>{project.name}</h1>
                    
                    <div className="project-section">
                            <h3>Summary</h3>
                            <p>{project.summary}</p>
                    </div>
                    
                    {project.media && project.media.length > 0 && (
                            <div className="project-section media-gallery">
                                    {project.media.map((item, index) => (
                                            item.type === 'image' ? 
                                            <img
                                                    key={index}
                                                    src={item.url}
                                                    alt={`${project.name} media ${index + 1}`}
                                                    {...(item.height && item.width
                                                            ? { height: item.height, width: item.width }
                                                            : {})
                                                    }
                                            /> :
                                            null
                                    ))}

                                    {project.media.map((item, index) => (
                                            item.type === 'video/mp4' ? 
                                            <video
                                                    key={index}
                                                    controls
                                                    className="project-video"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    {...(item.height && item.width
                                                            ? { height: item.height, width: item.width }
                                                            : {})
                                                    }
                                            >
                                                    <source src={item.url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                            </video> :
                                            null
                                    ))}
                            </div>
                    )}

                    <div className="project-section">
                            <h3>The Problem & Solution</h3>
                            <p>{project.problem_statement}</p>
                    </div>

                    <div className="project-section">
                            <h3>Technologies Used</h3>
                            <div className="tech-tags">
                                    {project.technologies_used.map((tech, index) => (
                                            <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                            </div>
                    </div>

                    <div className="project-section cta-section">
                            <a href={project.github_repo} target="_blank" rel="noopener noreferrer" className="github-button">
                                    <FaGithub /> View on GitHub
                            </a>
                    </div>

            </main>
    </div>
);
}

export default ProjectDetailPage;