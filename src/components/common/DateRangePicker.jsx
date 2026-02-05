/**
 * Reusable Component: DateRangePicker
 * 
 * Date range selection with calendar inputs
 * Includes validation and styling
 */

import React from 'react';

const DateRangePicker = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  maxDate,
  label = '📅 Date Range:'
}) => {
  const inputStyle = {
    padding: '0.5rem 0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#667eea';
    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
  };

  const handleMouseEnter = (e) => {
    if (document.activeElement !== e.target) {
      e.target.style.borderColor = '#667eea';
      e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.15)';
    }
  };

  const handleMouseLeave = (e) => {
    if (document.activeElement !== e.target) {
      e.target.style.borderColor = '#e2e8f0';
      e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
  };

  return (
    <div className="control-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input 
          type="date" 
          value={startDate} 
          onChange={onStartDateChange}
          max={endDate}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <span style={{ color: '#718096', fontWeight: '600', fontSize: '0.95rem' }}>→</span>
        <input 
          type="date" 
          value={endDate} 
          onChange={onEndDateChange}
          min={startDate}
          max={maxDate}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
