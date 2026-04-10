import { getDealContext } from '../../utils/dealScore';

const typeStyles = {
  excellent: { border: 'rgba(119, 242, 168, 0.3)', bg: 'rgba(119, 242, 168, 0.07)' },
  good: { border: 'rgba(94, 167, 255, 0.3)', bg: 'rgba(94, 167, 255, 0.07)' },
  fair: { border: 'rgba(242, 201, 76, 0.3)', bg: 'rgba(242, 201, 76, 0.07)' },
  wait: { border: 'rgba(255, 160, 80, 0.3)', bg: 'rgba(255, 160, 80, 0.07)' },
  skip: { border: 'rgba(255, 100, 100, 0.3)', bg: 'rgba(255, 100, 100, 0.07)' },
};

const DealContextCard = ({ game }) => {
  const context = getDealContext(game.currentBestPrice, game.historicalLow);

  if (!context) return null;

  const style = typeStyles[context.type] || typeStyles.fair;

  return (
    <section
      className="insight-card deal-context-card"
      style={{ borderColor: style.border, background: `#12192b` }}
    >
      <h2 className="insight-card-title">Is This a Good Deal?</h2>

      <div className="deal-context-banner" style={{ background: style.bg, borderColor: style.border }}>
        <span className="deal-context-icon">{context.icon}</span>
        <p className="deal-context-message">{context.message}</p>
      </div>

      <div className="deal-context-numbers">
        <div className="deal-context-row">
          <span className="deal-context-label">Best price now</span>
          <span className="deal-context-value deal-price-green">
            ${game.currentBestPrice}
          </span>
        </div>
        <div className="deal-context-row">
          <span className="deal-context-label">Historical low</span>
          <span className="deal-context-value">${game.historicalLow}</span>
        </div>
        {game.historicalLowDate && (
          <div className="deal-context-row">
            <span className="deal-context-label">Lowest recorded</span>
            <span className="deal-context-value deal-context-muted">{game.historicalLowDate}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default DealContextCard;
