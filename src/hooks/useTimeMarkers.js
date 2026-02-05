/**
 * Custom Hook: useTimeMarkers
 * 
 * Manages time marker display on X-axis
 * Shows all periods or auto-selects optimal spacing
 * Reusable across multiple chart components
 */

import { useState } from 'react';

export const useTimeMarkers = (initialState = true) => {
  const [showAllTimeMarkers, setShowAllTimeMarkers] = useState(initialState);

  // Get X-axis configuration with time markers
  const getXAxisConfig = (data, filterType, xAxisFormatter) => {
    const isAggregated = filterType !== 'custom';
    const showMarkers = showAllTimeMarkers && isAggregated;

    return {
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.date),
      axisLabel: {
        formatter: xAxisFormatter,
        rotate: filterType === 'custom' ? 45 : 0,
        interval: showMarkers ? 0 : 'auto',
        fontSize: showMarkers ? 11 : 10,
        margin: showMarkers ? 12 : 8,
        hideOverlap: !showMarkers
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        interval: showMarkers ? 0 : 'auto'
      },
      splitLine: {
        show: showMarkers,
        lineStyle: {
          color: '#e8e8e8',
          type: 'dotted',
          width: 1
        }
      }
    };
  };

  // Toggle time markers
  const toggleTimeMarkers = () => {
    setShowAllTimeMarkers(!showAllTimeMarkers);
  };

  return {
    showAllTimeMarkers,
    setShowAllTimeMarkers,
    toggleTimeMarkers,
    getXAxisConfig
  };
};
