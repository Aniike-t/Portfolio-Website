import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './ProjectsSection.css';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projects.json'; // Import project data

function ProjectsSection() {
    // Map the imported data to the format your component expects
    const projects = projectsData.map(p => ({
        id: p.id,
        title: p.name,
        description: p.summary,
        link: `/project/${p.id}`,
        width: p.layout.width,
        height: p.layout.height,
    }));

    const [layoutConfig, setLayoutConfig] = useState({
        areas: '',
        projectLayouts: []
    });
    const containerRef = useRef(null); 
    const gridSize = { rows: 5, cols: 5 };

    // ... (The entire layout generation logic from your original file remains unchanged)
    // useEffect, generateQuadGridLayout, initTileGridArray, etc. are all the same.
    // I am omitting them here for brevity, but you should KEEP THEM in your file.

    useEffect(() => {
        generateQuadGridLayout();
    }, []);

    const generateQuadGridLayout = () => {
        const numRows = gridSize.rows;
        const numCols = gridSize.cols;
        let tileGrid = initTileGridArray(numRows, numCols);
        let projectLayouts = [];
        let placedProjectsCount = 0;
        const projectsToPlace = projects.slice(0, 6);

        const shuffledProjects = [...projectsToPlace].sort(() => Math.random() - 0.5);

        for (let i = 0; i < shuffledProjects.length; i++) {
            const project = shuffledProjects[i];
            if (placedProjectsCount >= 6) break;

            const placement = findPlacementPosition(project, tileGrid, numRows, numCols, i);
            if (placement) {
                markGridOccupied(tileGrid, placement, i + 1);
                // Find original index from projectsData to link correctly
                const originalProjectIndex = projects.findIndex(p => p.id === project.id);
                projectLayouts.push({ projectIndex: originalProjectIndex, area: `p${i}`, ...placement });
                placedProjectsCount++;
            }
        }

        let gridAreaRows = [];
        for (let row = 1; row <= numRows; row++) {
            let rowAreas = [];
            for (let col = 1; col <= numCols; col++) {
                const projectIndex = tileGrid[row][col];
                if (projectIndex > 0) {
                    rowAreas.push(`p${projectIndex - 1}`);
                } else {
                    rowAreas.push('.');
                }
            }
            gridAreaRows.push(`"${rowAreas.join(' ')}"`);
        }

        setLayoutConfig({
            areas: gridAreaRows.join(' '),
            projectLayouts: projectLayouts
        });
    };

    const initTileGridArray = (numRows, numCols) => {
        let tileGrid = {};
        for (let i = 1; i <= numRows; i++) {
            tileGrid[i] = {};
            for (let j = 1; j <= numCols; j++) {
                tileGrid[i][j] = 0;
            }
        }
        return tileGrid;
    };

    const findPlacementPosition = (project, tileGrid, numRows, numCols, projectIndex) => {
        const projectWidth = project.width || 1;
        const projectHeight = project.height || 1;

        for (let row = 1; row <= numRows; row++) {
            for (let col = 1; col <= numCols; col++) {
                if (checkAreaAvailable(tileGrid, row, col, projectWidth, projectHeight, numRows, numCols)) {
                    return {
                        area: `p${projectIndex}`,
                        startRow: row,
                        startCol: col,
                        rows: projectHeight,
                        cols: projectWidth
                    };
                }
            }
        }
        return null;
    };

    const checkAreaAvailable = (tileGrid, startRow, startCol, width, height, numRows, numCols) => {
        if (startRow + height - 1 > numRows || startCol + width - 1 > numCols) {
            return false;
        }
        for (let row = startRow; row < startRow + height; row++) {
            for (let col = startCol; col < startCol + width; col++) {
                if (tileGrid[row][col] !== 0) {
                    return false;
                }
            }
        }
        return true;
    };

    const markGridOccupied = (tileGrid, placement, projectIndex) => {
        for (let row = placement.startRow; row < placement.startRow + placement.rows; row++) {
            for (let col = placement.startCol; col < placement.startCol + placement.cols; col++) {
                tileGrid[row][col] = projectIndex;
            }
        }
    };

    const tileMargin = 10;

    return (
        <div className="projects-container">
            <div
                className="quad-grid"
                style={{
                    gridTemplateAreas: layoutConfig.areas,
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                    gridAutoRows: `minmax(200px, auto)`,
                    gap: `${tileMargin}px`
                }}
                ref={containerRef}
            >
                {layoutConfig.projectLayouts.map((layout, index) => {
                    const project = projects[layout.projectIndex];
                    const projectStyleClasses = `project-item tile-${layout.cols}x${layout.rows}`;

                    return (
                        <Link
                            key={index}
                            to={project.link} // Use the link from project data
                            className={projectStyleClasses}
                            style={{
                                gridArea: layout.area,
                                margin: `${tileMargin}px`
                            }}
                        >
                            <ProjectCard project={project} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ProjectsSection;