/**
 * Reusable Component: ZoomControls
 * 
 * Zoom mode selection and toggle controls
 * 2D Zoom, X-only, Sliders toggle, Reset button
 */

import React from 'react';

const ZoomControls = ({ 
  zoomMode, 
  onZoomModeChange,
  showDataZoom,
  onToggleDataZoom,
  onResetZoom,
  showResetButton = true
}) => {
  const createButton = (onClick, isActive, activeColor, inactiveColor, label, activeLabel = label) => (
    <button 
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: isActive ? activeColor : inactiveColor,
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        outline: 'none',
        boxShadow: isActive 
          ? `0 4px 12px ${activeColor}66` 
          : `0 4px 12px ${inactiveColor}33`,
        transform: 'scale(1)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05) translateY(-2px)';
        e.target.style.boxShadow = isActive 
          ? `0 6px 16px ${activeColor}99` 
          : `0 6px 16px ${inactiveColor}66`;
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = isActive 
          ? `0 4px 12px ${activeColor}66` 
          : `0 4px 12px ${inactiveColor}33`;
      }}
      onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
    >
      {isActive ? activeLabel : label}
    </button>
  );

  return (
    <>
      {/* Zoom Mode Dropdown */}
      <div className="control-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>🎯 Zoom Mode:</label>
        <select 
          value={zoomMode} 
          onChange={(e) => onZoomModeChange(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            border: '2px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            outline: 'none',
            backgroundColor: '#fff',
            color: '#4a5568',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <option value="xy">🔍 2D Zoom (X + Y)</option>
          <option value="x">↔️ X-Axis Only</option>
          <option value="none">🚫 Disabled</option>
        </select>
      </div>

      {/* Sliders Toggle */}
      <div className="control-group">
        {createButton(
          onToggleDataZoom,
          showDataZoom,
          '#48bb78',
          '#e53e3e',
          '❌ Sliders OFF',
          '✅ Sliders ON'
        )}
      </div>

      {/* Reset Zoom Button */}
      {showResetButton && (
        <div className="control-group">
          {createButton(
            onResetZoom,
            false,
            '#667eea',
            '#667eea',
            '🔄 Reset Zoom'
          )}
        </div>
      )}
    </>
  );
};

export default ZoomControls;
