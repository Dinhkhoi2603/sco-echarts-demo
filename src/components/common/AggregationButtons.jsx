/**
 * Reusable Component: AggregationButtons
 * 
 * Filter buttons for data aggregation
 * Daily, Week, Month, Quarter, Year
 */

import React from 'react';

const AggregationButtons = ({ 
  filterType, 
  onFilterChange,
  options = ['custom', 'week', 'month', 'quarter', 'year'],
  label = '📊 Aggregate By:'
}) => {
  const getButtonLabel = (type) => {
    return type === 'custom' ? 'Daily' : type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Get button styles based on state
  const getButtonStyle = (type, isActive) => ({
    padding: '0.5rem 1rem',
    backgroundColor: isActive ? '#667eea' : '#fff',
    color: isActive ? '#fff' : '#4a5568',
    border: isActive ? '2px solid #667eea' : '2px solid #e2e8f0',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isActive 
      ? '0 4px 12px rgba(102, 126, 234, 0.4), 0 0 0 3px rgba(102, 126, 234, 0.1)' 
      : '0 2px 4px rgba(0,0,0,0.05)'
  });

  return (
    <div className="control-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {options.map(type => {
          const isActive = filterType === type;
          
          return (
            <button 
              key={type}
              onClick={() => onFilterChange(type)}
              style={getButtonStyle(type, isActive)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.transform = 'scale(1.05) translateY(-2px)';
                  e.target.style.borderColor = '#667eea';
                  e.target.style.color = '#667eea';
                  e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.color = '#4a5568';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }
              }}
              onMouseDown={(e) => {
                e.target.style.transform = isActive ? 'scale(1.02)' : 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = isActive ? 'scale(1.05)' : 'scale(1.05) translateY(-2px)';
              }}
            >
              {isActive && (
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none'
                }}></span>
              )}
              <span style={{ position: 'relative', zIndex: 1, color: 'inherit' }}>
                {isActive && '✓ '}
                {getButtonLabel(type)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AggregationButtons;
