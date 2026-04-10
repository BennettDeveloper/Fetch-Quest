import React from 'react';

const GameStatsCard = ({ game }) => {
  return (
    <section className="game-stats-card">
      <h2>Game Stats</h2>
      <ul>
        <li><strong>Genre:</strong> {game.genre}</li>
        <li><strong>Publisher:</strong> {game.publisher}</li>
        <li><strong>Review Score:</strong> {game.reviewScore}</li>
        <li><strong>Release Date:</strong> {game.releaseDate}</li>
        <li><strong>Total Offers:</strong> {game.offers.length}</li>
      </ul>
    </section>
  );
};

export default GameStatsCard;