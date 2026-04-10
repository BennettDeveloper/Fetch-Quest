import React from 'react';

const FiltersPanel = () => {
  return (
    <aside className="filters-panel">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Genre</label>
        <select>
          <option>All Genres</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <select>
          <option>All Prices</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Review Score</label>
        <select>
          <option>All Scores</option>
        </select>
      </div>
    </aside>
  );
};

export default FiltersPanel;