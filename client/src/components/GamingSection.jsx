import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GameboyGame from './GameboyGame';
import './GamingSection.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const GamingSection = () => {
    const { data: games, isLoading } = useQuery({
        queryKey: ['games'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/get_games`);
            if (!response.ok) throw new Error('Failed to fetch games');
            return response.json();
        }
    });

    return (
        <section id="hobbies" className="gaming-section">
            <div className="section-header-io fade-in">
                <span className="section-subtitle">GAMESSS...</span>
                <h2 className="section-title">Play & Create</h2>
                <div className="section-line"></div>
            </div>

            <div className="gaming-flex-container">
                {/* LEFT: Mini Game */}
                <div className="gaming-flex-item mini-game-container">
                    <div className="game-intro">
                        <h3>Interactive Retro <span className="gradient-text">Game</span></h3>
                        <p>A custom JS engine. Collect high scores!</p>
                    </div>
                    <GameboyGame />
                </div>

                {/* RIGHT: Tiled Games */}
                <div className="gaming-flex-item games-list-container">
                    <h3>Game Jam <span className="gradient-text">Projects</span></h3>
                    <div className="small-games-grid">
                        {isLoading ? (
                            <div className="loader">Searching...</div>
                        ) : (
                            games?.map(game => (
                                <a key={game.id} href={game.url} target="_blank" rel="noopener noreferrer" className="small-game-tile">
                                    <div className="tile-media">
                                        <img src={game.media?.[0]?.url} alt={game.name} />
                                    </div>
                                    <div className="tile-content">
                                        <span className="game-id">ID: {game.id}</span>
                                        <h4>{game.name}</h4>
                                        <div className="game-tech-tags">
                                            {game.technologies_used?.map((tech, i) => (
                                                <small key={i}>{tech}</small>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GamingSection;
