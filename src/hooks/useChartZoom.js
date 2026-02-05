/**
 * Custom Hook: useChartZoom
 * 
 * Manages chart zoom and pan controls
 * Supports 2D zoom (X + Y axes)
 * Reusable across multiple chart components
 */

import { useState } from 'react';

export const useChartZoom = () => {
  const [zoomMode, setZoomMode] = useState('xy'); // xy, x, none
  const [showDataZoom, setShowDataZoom] = useState(true);
  const [dataZoomStart, setDataZoomStart] = useState(0);
  const [dataZoomEnd, setDataZoomEnd] = useState(100);

  // Reset zoom to full view
  const resetZoom = () => {
    setDataZoomStart(0);
    setDataZoomEnd(100);
  };

  // Set zoom range
  const setZoomRange = (start, end) => {
    setDataZoomStart(Math.max(0, Math.min(100, start)));
    setDataZoomEnd(Math.max(0, Math.min(100, end)));
  };

  // Zoom to specific percentage of data
  const zoomToLast = (percentage) => {
    const start = 100 - percentage;
    setDataZoomStart(start);
    setDataZoomEnd(100);
  };

  // Get dataZoom configuration for ECharts
  const getDataZoomConfig = () => {
    if (!showDataZoom) return [];

    return [
      {
        type: 'inside',
        xAxisIndex: 0,
        yAxisIndex: 0,
        start: dataZoomStart,
        end: dataZoomEnd,
        zoomOnMouseWheel: zoomMode !== 'x',
        moveOnMouseMove: true,
        zoomLock: zoomMode === 'none',
        disabled: zoomMode === 'none'
      },
      {
        type: 'slider',
        xAxisIndex: 0,
        start: dataZoomStart,
        end: dataZoomEnd,
        height: 25,
        bottom: 60,
        handleStyle: {
          color: '#667eea',
          borderColor: '#667eea'
        },
        dataBackground: {
          lineStyle: { color: '#667eea', opacity: 0.5 },
          areaStyle: { color: '#667eea', opacity: 0.2 }
        },
        selectedDataBackground: {
          lineStyle: { color: '#764ba2' },
          areaStyle: { color: '#764ba2', opacity: 0.3 }
        },
        textStyle: { color: '#2c3e50' },
        borderColor: '#ddd'
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        start: 0,
        end: 100,
        width: 25,
        right: 10,
        handleStyle: {
          color: '#48bb78',
          borderColor: '#48bb78'
        },
        dataBackground: {
          lineStyle: { color: '#48bb78', opacity: 0.5 },
          areaStyle: { color: '#48bb78', opacity: 0.2 }
        },
        selectedDataBackground: {
          lineStyle: { color: '#38a169' },
          areaStyle: { color: '#38a169', opacity: 0.3 }
        },
        textStyle: { color: '#2c3e50' },
        borderColor: '#ddd'
      }
    ];
  };

  // Get toolbox configuration
  const getToolboxConfig = () => {
    return {
      feature: {
        dataZoom: {
          yAxisIndex: 'all',
          title: { 
            zoom: '📦 Box Zoom (X+Y)', 
            back: '↩️ Reset View' 
          }
        },
        restore: { title: '🔄 Restore' },
        saveAsImage: { title: '💾 Save as Image', pixelRatio: 2 }
      },
      right: 20,
      top: 30
    };
  };

  return {
    // State
    zoomMode,
    showDataZoom,
    dataZoomStart,
    dataZoomEnd,
    
    // Setters
    setZoomMode,
    setShowDataZoom,
    setDataZoomStart,
    setDataZoomEnd,
    
    // Actions
    resetZoom,
    setZoomRange,
    zoomToLast,
    
    // Config builders
    getDataZoomConfig,
    getToolboxConfig
  };
};
