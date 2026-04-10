import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <img src={game.image} alt={game.title} className="game-card-image" />

      <div className="game-card-content">
        <h3>{game.title}</h3>
        <p className="game-card-price">${game.salePrice}</p>
        <p className="game-card-store">{game.store}</p>
      </div>
    </Link>
  );
};

export default GameCard;