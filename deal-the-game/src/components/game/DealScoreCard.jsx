import { computeDealScore } from '../../utils/dealScore';

const DealScoreCard = ({ game }) => {
  const savings =
    game.currentBestPrice && game.normalPrice
      ? (((parseFloat(game.normalPrice) - parseFloat(game.currentBestPrice)) /
          parseFloat(game.normalPrice)) *
          100).toFixed(0)
      : 0;

  const score = computeDealScore({
    savings,
    currentBestPrice: game.currentBestPrice,
    historicalLow: game.historicalLow,
    reviewScore: game.reviewScore,
    ratingsCount: game.ratingsCount,
  });

  const barColor =
    score.total >= 75 ? '#77f2a8' : score.total >= 50 ? '#f2c94c' : '#ff7070';

  return (
    <section className="insight-card">
      <h2 className="insight-card-title">Should You Buy This?</h2>

      <div className="deal-score-display">
        <span className="deal-score-number" style={{ color: barColor }}>
          {score.total}
        </span>
        <span className="deal-score-label">{score.label}</span>
      </div>

      <div className="deal-score-bar-track">
        <div
          className="deal-score-bar-fill"
          style={{ width: `${score.total}%`, background: barColor }}
        />
      </div>

      <ul className="deal-score-breakdown">
        <li>
          <span>Discount</span>
          <span className="score-pts">+{score.breakdown.discount} pts</span>
        </li>
        <li>
          <span>Near historical low</span>
          <span className="score-pts">+{score.breakdown.proximity} pts</span>
        </li>
        <li>
          <span>Review score</span>
          <span className="score-pts">+{score.breakdown.review} pts</span>
        </li>
        <li>
          <span>Popularity</span>
          <span className="score-pts">+{score.breakdown.popularity} pts</span>
        </li>
      </ul>
    </section>
  );
};

export default DealScoreCard;
