import React from 'react';

const GameHero = ({ game }) => {
  return (
    <section className="game-hero">
      <img src={game.image} alt={game.title} className="game-hero-image" />

      <div className="game-hero-content">
        <h1>{game.title}</h1>
        <p>{game.description}</p>
      </div>
    </section>
  );
};

export default GameHero;