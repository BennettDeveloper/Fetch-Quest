import React from 'react';

const PRESETS = [
  { id: 'best', label: 'Best deals', params: { sortBy: 'DealRating' } },
  { id: 'new', label: 'New deals', params: { sortBy: 'Recent' } },
  { id: 'ending', label: 'Ending Soon', params: { sortBy: 'Recent', pageSize: 20 } },
  { id: 'savings75', label: '75%+ off', params: { sortBy: 'Savings', minimumSavings: 75 } },
  { id: 'savings85', label: '85%+ off', params: { sortBy: 'Savings', minimumSavings: 85 } },
  { id: 'steam', label: 'Steam deals', params: { sortBy: 'DealRating', storeID: 1 } },
  { id: 'gog', label: 'GOG deals', params: { sortBy: 'DealRating', storeID: 7 } },
  { id: 'humble', label: 'Humble deals', params: { sortBy: 'DealRating', storeID: 11 } },
];

const DealPresets = ({ activePreset, onSelect }) => {
  return (
    <div className="deal-presets">
      {PRESETS.map((preset) => (
        <button
          key={preset.id}
          className={`deal-preset-pill${activePreset === preset.id ? ' active' : ''}`}
          onClick={() => onSelect(preset.id, preset.params)}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};

export default DealPresets;
