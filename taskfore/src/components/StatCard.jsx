import React from 'react';

const StatCard = ({ label, count, borderColor }) => {
  return (
    <div className={`stat-card ${borderColor}`}>
      <div className="stat-count">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;
