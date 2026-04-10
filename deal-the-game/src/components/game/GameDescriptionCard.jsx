import React from 'react';

const GameDescriptionCard = ({ description }) => {
  return (
    <section className="game-description-card">
      <h2>About This Game</h2>
      <p>
        {description || 'No description available for this title yet.'}
      </p>
    </section>
  );
};

export default GameDescriptionCard;