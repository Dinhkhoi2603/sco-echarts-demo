/**
 * Example: Refactored Chart Component
 * 
 * Demonstrates how to use all the reusable modules
 * Much cleaner and more maintainable than the original
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';

// Custom Hooks
import { useDateRange } from '../hooks/useDateRange';
import { useAggregation } from '../hooks/useAggregation';
import { useChartZoom } from '../hooks/useChartZoom';
import { useTimeMarkers } from '../hooks/useTimeMarkers';

// Reusable Components
import DateRangePicker from './common/DateRangePicker';
import AggregationButtons from './common/AggregationButtons';
import ZoomControls from './common/ZoomControls';

// Utilities
import { filterDataByDateRange } from '../utils/dataUtils';
import { 
  buildChartOption, 
  buildTitleConfig, 
  buildTooltipConfig,
  buildLegendConfig,
  buildGridConfig,
  buildYAxisConfig,
  buildLineSeries 
} from '../utils/chartConfig';
import { generateInventoryData } from '../utils/dummyData';

function RefactoredChartExample() {
  // 🔥 Use custom hooks for all logic
  const dateRange = useDateRange(90);
  const aggregation = useAggregation('custom');
  const zoom = useChartZoom();
  const timeMarkers = useTimeMarkers();

  // Generate and filter data
  const allData = generateInventoryData(Math.max(dateRange.daysDiff + 30, 1));
  const filteredData = filterDataByDateRange(allData, dateRange.startDate, dateRange.endDate);
  const aggregatedData = aggregation.aggregateData(filteredData);

  // Build chart configuration
  const chartOption = buildChartOption({
    title: buildTitleConfig(
      'Refactored Chart Example',
      `${dateRange.getFormattedRange()} - ${aggregatedData.length} ${aggregation.getPluralPeriodLabel()}`
    ),
    
    tooltip: buildTooltipConfig((params) => {
      const dateLabel = aggregation.getTooltipFormatter()(params[0].axisValue);
      let result = `<strong>${dateLabel}</strong><br/>`;
      params.forEach(item => {
        result += `${item.marker} ${item.seriesName}: <strong>${item.value.toLocaleString()}</strong> units<br/>`;
      });
      return result;
    }),
    
    legend: buildLegendConfig(['Warehouse A', 'Warehouse B', 'Warehouse C'], 60),
    
    grid: buildGridConfig(zoom.showDataZoom),
    
    toolbox: zoom.getToolboxConfig(),
    
    dataZoom: zoom.getDataZoomConfig(),
    
    xAxis: timeMarkers.getXAxisConfig(
      aggregatedData, 
      aggregation.filterType, 
      aggregation.getXAxisFormatter()
    ),
    
    yAxis: buildYAxisConfig('Inventory (Units)', true),
    
    series: [
      buildLineSeries('Warehouse A', aggregatedData.map(i => i.warehouseA), '#667eea', { showArea: true }),
      buildLineSeries('Warehouse B', aggregatedData.map(i => i.warehouseB), '#48bb78', { showArea: true }),
      buildLineSeries('Warehouse C', aggregatedData.map(i => i.warehouseC), '#f6ad55', { showArea: true })
    ]
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🎨 Refactored Chart Example</h1>
        <p>Built with reusable hooks and components</p>
      </div>

      {/* Controls - Using Reusable Components */}
      <div className="controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        
        {/* Date Range Picker */}
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={(e) => {
            dateRange.setStartDate(e.target.value);
            zoom.resetZoom();
          }}
          onEndDateChange={(e) => {
            dateRange.setEndDate(e.target.value);
            zoom.resetZoom();
          }}
          maxDate={dateRange.maxDate}
        />

        {/* Aggregation Buttons */}
        <AggregationButtons
          filterType={aggregation.filterType}
          onFilterChange={(type) => {
            aggregation.setFilterType(type);
            zoom.resetZoom();
          }}
        />

        {/* Zoom Controls */}
        <ZoomControls
          zoomMode={zoom.zoomMode}
          onZoomModeChange={zoom.setZoomMode}
          showDataZoom={zoom.showDataZoom}
          onToggleDataZoom={() => zoom.setShowDataZoom(!zoom.showDataZoom)}
          onResetZoom={zoom.resetZoom}
        />

        {/* Time Markers Toggle */}
        <div className="control-group">
          <button 
            onClick={timeMarkers.toggleTimeMarkers}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: timeMarkers.showAllTimeMarkers ? '#f6ad55' : '#718096',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              outline: 'none'
            }}
          >
            {timeMarkers.showAllTimeMarkers ? '📍 All Markers' : '📍 Auto Markers'}
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container" style={{ height: '600px', marginTop: '1.5rem' }}>
        <ReactECharts 
          option={chartOption} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>

      {/* Info */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '1rem' }}>✨ This component uses:</h4>
        <ul style={{ color: '#424242', marginLeft: '1.5rem', lineHeight: '2' }}>
          <li><code>useDateRange</code> - Date range management</li>
          <li><code>useAggregation</code> - Data aggregation logic</li>
          <li><code>useChartZoom</code> - Zoom and pan controls</li>
          <li><code>useTimeMarkers</code> - Time marker display</li>
          <li><code>DateRangePicker</code> - Reusable date picker component</li>
          <li><code>AggregationButtons</code> - Reusable filter buttons</li>
          <li><code>ZoomControls</code> - Reusable zoom controls</li>
          <li><code>buildChartOption</code> - Chart configuration builder</li>
        </ul>
        <p style={{ marginTop: '1rem', color: '#1976d2', fontWeight: '600' }}>
          Result: ~200 lines vs 900+ lines in original component! 🎉
        </p>
      </div>
    </div>
  );
}

export default RefactoredChartExample;
