import React from 'react';

const PlatformTabs = ({ game }) => {
  const platformList =
    game.platforms && game.platforms !== 'Unknown'
      ? game.platforms.split(',').map((platform) => platform.trim())
      : ['PC'];

  return (
    <div className="platform-tabs">
      {platformList.slice(0, 4).map((platform) => (
        <button key={platform} className="platform-tab active">
          {platform}
        </button>
      ))}
    </div>
  );
};

export default PlatformTabs;