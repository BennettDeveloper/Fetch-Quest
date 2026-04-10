import { getPricePrediction } from '../../utils/dealScore';

const trendColors = {
  low: '#77f2a8',
  dropping: '#77f2a8',
  rising: '#ff9f6b',
  stable: '#9ca8c7',
};

const PricePredictionCard = ({ game }) => {
  const savings =
    game.currentBestPrice && game.normalPrice
      ? (((parseFloat(game.normalPrice) - parseFloat(game.currentBestPrice)) /
          parseFloat(game.normalPrice)) *
          100).toFixed(0)
      : 0;

  const prediction = getPricePrediction(
    savings,
    game.currentBestPrice,
    game.historicalLow,
    game.historicalLowDate
  );

  const color = trendColors[prediction.trend] || trendColors.stable;

  return (
    <section className="insight-card">
      <h2 className="insight-card-title">Price Prediction</h2>

      <div className="price-prediction-label" style={{ color }}>
        <span className="price-prediction-icon">{prediction.icon}</span>
        <span>{prediction.label}</span>
      </div>

      <p className="price-prediction-detail">{prediction.detail}</p>
    </section>
  );
};

export default PricePredictionCard;
