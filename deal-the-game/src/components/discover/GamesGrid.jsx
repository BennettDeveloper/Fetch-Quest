import GameCard from './GameCard';

const GamesGrid = ({ games = [] }) => {
  return (
    <div className="deals-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesGrid;
