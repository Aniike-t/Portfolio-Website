import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './ProjectsSection.css';
import ProjectCard from './ProjectCard';

const API_URL = import.meta.env.VITE_API_URL || '';

function ProjectsSection() {
    const { data: projects, isLoading, isError, error } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/get_projects`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });

    if (isLoading) {
        return (
            <div className="projects-container-v2">
                <div className="section-header-io">
                    <h2 className="section-title">Discovery in progress...</h2>
                    <div className="section-line"></div>
                </div>
                <div className="loading-grid">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="skeleton-card"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="projects-container-v2">
                <div className="section-header-io">
                    <h2 className="section-title" style={{ color: 'var(--google-red)' }}>Oops! Signal lost.</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="projects-container-v2">
            <div className="section-header-io fade-in">
                <span className="section-subtitle">PROJECTS</span>
                <h2 className="section-title">Experiments & Experience</h2>
                <div className="section-line"></div>
            </div>

            <div className="bento-grid">
                {Array.isArray(projects) && projects.map((project) => (
                    <Link
                        key={project.id}
                        to={`/project/${project.id}`}
                        className="project-item-v2"
                    >
                        <ProjectCard project={project} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProjectsSection;