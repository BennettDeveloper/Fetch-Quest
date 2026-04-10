import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const gameLinkId = game.gameId || game.id;

  return (
    <Link to={`/game/${gameLinkId}`} className="game-card">
      <img src={game.image} alt={game.title} className="game-card-image" />

      <div className="game-card-content">
        <h3>{game.title}</h3>

        <p className="game-card-price">${game.salePrice}</p>

        <div className="game-card-store-row">
          <span>{game.store}</span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;