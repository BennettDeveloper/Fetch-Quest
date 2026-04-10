import { useState } from 'react';

const COLLAPSE_LENGTH = 320;

const RequirementsTable = ({ title, rows }) => {
  if (!rows?.length) return null;
  return (
    <div className="req-block">
      <h4 className="req-block-title">{title}</h4>
      <ul className="req-list">
        {rows.map(({ key, value }) => (
          <li key={key} className="req-row">
            <span className="req-key">{key}</span>
            <span className="req-value">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GameDescriptionCard = ({ game }) => {
  if (!game) return null;

  const description = game?.description || '';
  const hasLongDescription = description.length > COLLAPSE_LENGTH;
  const [expanded, setExpanded] = useState(false);

  const displayText =
    hasLongDescription && !expanded
      ? `${description.slice(0, COLLAPSE_LENGTH)}…`
      : description;

  const hasRequirements =
    game?.minRequirements?.length > 0 || game?.recommendedRequirements?.length > 0;

  return (
    <section className="about-section">
      <div className={`about-layout${hasRequirements ? ' about-layout--split' : ''}`}>
        <div className="about-left">
          <h2 className="about-title">About {game.title}</h2>

          <div className="about-description">
            <p>{displayText || 'No description available for this title yet.'}</p>
            {hasLongDescription && (
              <button
                className="about-read-more"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>

          {game.backgroundImage && (
            <div className="about-banner">
              <img
                src={game.backgroundImage}
                alt={`${game.title} banner`}
                className="about-banner-image"
              />
            </div>
          )}
        </div>

        {hasRequirements && (
          <div className="about-right">
            <h3 className="req-section-title">System Requirements</h3>
            <RequirementsTable title="Minimum" rows={game.minRequirements} />
            <RequirementsTable title="Recommended" rows={game.recommendedRequirements} />
          </div>
        )}
      </div>
    </section>
  );
};

export default GameDescriptionCard;
