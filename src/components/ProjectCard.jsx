import React from 'react';
import './ProjectCard.css';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <span className="view-prompt">View Project →</span>
    </div>
  );
}

export default ProjectCard;