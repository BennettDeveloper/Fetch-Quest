import React from 'react';

const GameHero = ({ game }) => {
  return (
    <section className="game-hero">
      <div className="game-hero-image-wrapper">
        <img src={game.image} alt={game.title} className="game-hero-image" />
      </div>
    </section>
  );
};

export default GameHero;