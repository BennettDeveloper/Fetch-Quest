import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const savingsNum = parseFloat(game.savings);
  const hasDiscount = savingsNum > 0;
  const isFree = parseFloat(game.salePrice) === 0;
  const gameId = game.gameId || game.id;

  return (
    <Link to={`/game/${gameId}`} className="deal-row">
      <img src={game.image} alt={game.title} className="deal-row-thumb" />

      <div className="deal-row-info">
        <h3 className="deal-row-title">{game.title}</h3>
        <span className="deal-row-store">{game.store}</span>
      </div>

      <div className="deal-row-prices">
        {hasDiscount && !isFree && (
          <span className="deal-row-normal">${game.normalPrice}</span>
        )}
        <span className="deal-row-sale">
          {isFree ? 'FREE' : `$${game.salePrice}`}
        </span>
        {hasDiscount && (
          <span className="deal-row-badge">-{game.savings}%</span>
        )}
      </div>
    </Link>
  );
};

export default GameCard;
