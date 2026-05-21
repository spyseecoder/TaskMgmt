import React from 'react';

const FilterButtons = ({ activeFilter, onFilterChange, filters }) => {
  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
