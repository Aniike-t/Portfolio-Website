import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './GitHubActivity.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const GitHubActivity = () => {
    const { data: calendar, isLoading, isError, error } = useQuery({
        queryKey: ['github-heatmap'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/get_github_heatmap`);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to fetch heatmap');
            }
            return response.json();
        },
        retry: 1,
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="gh-heatmap-sync">Syncing commits...</div>;
    
    if (isError) {
        return (
            <div className="github-heatmap-container error-state">
                <p>GitHub Heatmap requires authentication.</p>
            </div>
        );
    }

    
    return (
        <div className="github-heatmap-container fade-in">
            <div className="gh-heatmap-header">
                <div className="gh-header-top">
                    <span className="gh-count">{calendar.totalContributions} Contributions</span>

                </div>
                <p className="gh-user-subtitle">@Aniike-t</p>
            </div>

            <div className="heatmap-scroll-area">
                <div className="heatmap-wrapper">
                    {calendar.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="heatmap-week">
                            {week.contributionDays.map((day, dIdx) => (
                                <div 
                                    key={dIdx} 
                                    className="heatmap-day" 
                                    style={{ '--day-color': day.color }}
                                    data-count={day.contributionCount}
                                    title={`${day.contributionCount} commits on ${day.date}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="heatmap-footer">
                <div className="gh-legend-container">
                    <span></span>
                    <div className="gh-legend">
                        <div className="legend-day" style={{ background: '#161b22' }}></div>
                        <div className="legend-day" style={{ background: '#0e4429' }}></div>
                        <div className="legend-day" style={{ background: '#006d32' }}></div>
                        <div className="legend-day" style={{ background: '#26a641' }}></div>
                        <div className="legend-day" style={{ background: '#39d353' }}></div>
                    </div>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default GitHubActivity;
