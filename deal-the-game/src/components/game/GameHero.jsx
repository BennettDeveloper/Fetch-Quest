import React from 'react';

const GameHero = ({ game }) => {
  return (
    <section className="game-hero">
      <img src={game.image} alt={game.title} className="game-hero-image" />

      <div className="game-hero-content">
        <h1>{game.title}</h1>
        <p>Track live pricing, compare store offers, and find the best current deal.</p>
      </div>
    </section>
  );
};

export default GameHero;