import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const savingsNum = parseFloat(game.savings);
  const hasDiscount = savingsNum > 0;
  const isFree = parseFloat(game.salePrice) === 0;
  const gameId = game.gameId || game.id;

  const multipleStores = game.stores?.length > 1;
  const storeLabel = multipleStores
    ? game.stores.slice(0, 3).join(' · ') + (game.stores.length > 3 ? ` +${game.stores.length - 3}` : '')
    : game.store;

  return (
    <Link to={`/game/${gameId}`} className="deal-row">
      <img src={game.image} alt={game.title} className="deal-row-thumb" />

      <div className="deal-row-info">
        <h3 className="deal-row-title">{game.title}</h3>
        <span className="deal-row-store">{storeLabel}</span>
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
