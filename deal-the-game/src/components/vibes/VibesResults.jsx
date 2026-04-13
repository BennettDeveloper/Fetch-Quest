import GameCard from '../discover/GameCard';

const VibesResults = ({ results, mood }) => {
  if (!results.length) {
    return (
      <div className="vibes-empty">
        <p className="vibes-empty-title">No results found for {mood.label}</p>
        <p className="vibes-empty-sub">Try a different vibe or check back later.</p>
      </div>
    );
  }

  const withDeals = results.filter((r) => r.hasDeal);
  const withoutDeals = results.filter((r) => !r.hasDeal);

  return (
    <div className="vibes-results">
      <p className="vibes-results-meta">
        {withDeals.length} deal{withDeals.length !== 1 ? 's' : ''} found
        {withoutDeals.length > 0 && ` · ${withoutDeals.length} not currently on sale`}
      </p>

      <div className="deals-list">
        {withDeals.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}

        {withoutDeals.map((game, i) => (
          <div key={`no-deal-${i}`} className="deal-row deal-row--no-deal">
            {game.image && (
              <img src={game.image} alt={game.title} className="deal-row-thumb" />
            )}
            <div className="deal-row-info">
              <h3 className="deal-row-title">{game.title}</h3>
              <span className="deal-row-store">
                {game.genres?.slice(0, 2).join(', ')}
              </span>
            </div>
            <span className="vibes-no-deal-badge">No deal</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibesResults;
