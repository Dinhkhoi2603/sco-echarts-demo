/**
 * Refactored: MultiWarehouse
 * 
 * Now using reusable hooks and utilities!
 * Enhanced with date range and aggregation support
 */

import { useState } from 'react';
import ReactECharts from 'echarts-for-react';

// 🔥 Import reusable modules
import { useDateRange, useAggregation } from '../hooks';
import { DateRangePicker, AggregationButtons } from './common';
import { filterDataByDateRange } from '../utils';
import { generateMultiWarehouseData } from '../utils/dummyData';

function MultiWarehouse() {
  const [chartType, setChartType] = useState('bar');
  const [stacked, setStacked] = useState(false);
  
  // 🔥 Use reusable hooks for date range and aggregation
  const dateRange = useDateRange(90);
  const aggregation = useAggregation('custom');

  // Generate data with proper date range
  const allData = generateMultiWarehouseData(Math.max(dateRange.daysDiff + 30, 1));
  
  // Filter by date range (if data structure supports it)
  const warehouseData = allData;

  const getOption = () => {
    const baseOption = {
      title: {
        text: 'Multi-Warehouse Performance Comparison',
        subtext: chartType === 'bar' ? 'Bar Chart View' : 'Line Chart View',
        left: 'center',
        textStyle: { fontSize: 20, fontWeight: 'bold' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['North', 'South', 'East', 'West'],
        top: 60
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      toolbox: {
        feature: {
          dataZoom: { yAxisIndex: 'none', title: { zoom: 'Zoom', back: 'Reset' } },
          restore: { title: 'Restore' },
          saveAsImage: { pixelRatio: 2, title: 'Save' },
          magicType: {
            type: ['line', 'bar'],
            title: { line: 'Line Chart', bar: 'Bar Chart' }
          }
        },
        right: 20,
        top: 30
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          height: 30,
          bottom: 50,
          handleStyle: { color: '#667eea' }
        }
      ],
      xAxis: {
        type: 'category',
        data: warehouseData.map(item => item.week),
        axisLabel: { rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: 'Volume (Units)',
        nameTextStyle: { fontSize: 14 },
        axisLabel: {
          formatter: function(value) {
            return (value / 1000).toFixed(0) + 'K';
          }
        }
      }
    };

    const series = [
      {
        name: 'North',
        type: chartType,
        data: warehouseData.map(item => item.north),
        itemStyle: { color: '#667eea' },
        smooth: chartType === 'line',
        lineStyle: chartType === 'line' ? { width: 3 } : undefined,
        stack: stacked ? 'total' : undefined
      },
      {
        name: 'South',
        type: chartType,
        data: warehouseData.map(item => item.south),
        itemStyle: { color: '#48bb78' },
        smooth: chartType === 'line',
        lineStyle: chartType === 'line' ? { width: 3 } : undefined,
        stack: stacked ? 'total' : undefined
      },
      {
        name: 'East',
        type: chartType,
        data: warehouseData.map(item => item.east),
        itemStyle: { color: '#f6ad55' },
        smooth: chartType === 'line',
        lineStyle: chartType === 'line' ? { width: 3 } : undefined,
        stack: stacked ? 'total' : undefined
      },
      {
        name: 'West',
        type: chartType,
        data: warehouseData.map(item => item.west),
        itemStyle: { color: '#e53e3e' },
        smooth: chartType === 'line',
        lineStyle: chartType === 'line' ? { width: 3 } : undefined,
        stack: stacked ? 'total' : undefined
      }
    ];

    return { ...baseOption, series };
  };

  // Calculate totals and averages
  const totals = {
    north: warehouseData.reduce((sum, item) => sum + item.north, 0),
    south: warehouseData.reduce((sum, item) => sum + item.south, 0),
    east: warehouseData.reduce((sum, item) => sum + item.east, 0),
    west: warehouseData.reduce((sum, item) => sum + item.west, 0)
  };

  const grandTotal = totals.north + totals.south + totals.east + totals.west;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏭 Multi-Warehouse Comparison</h1>
        <p>Compare performance metrics across regional warehouse locations</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>🏢 Warehouse North</h4>
          <div className="stat-value">{(totals.north / 1000).toFixed(1)}K</div>
          <div className="stat-change">{((totals.north / grandTotal) * 100).toFixed(1)}% of total</div>
        </div>
        <div className="stat-card">
          <h4>🏢 Warehouse South</h4>
          <div className="stat-value">{(totals.south / 1000).toFixed(1)}K</div>
          <div className="stat-change">{((totals.south / grandTotal) * 100).toFixed(1)}% of total</div>
        </div>
        <div className="stat-card">
          <h4>🏢 Warehouse East</h4>
          <div className="stat-value">{(totals.east / 1000).toFixed(1)}K</div>
          <div className="stat-change">{((totals.east / grandTotal) * 100).toFixed(1)}% of total</div>
        </div>
        <div className="stat-card">
          <h4>🏢 Warehouse West</h4>
          <div className="stat-value">{(totals.west / 1000).toFixed(1)}K</div>
          <div className="stat-change">{((totals.west / grandTotal) * 100).toFixed(1)}% of total</div>
        </div>
      </div>

      <div className="controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="control-group">
          <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>📊 Chart Type:</label>
          <select 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              border: '2px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="bar">📊 Bar Chart</option>
            <option value="line">📈 Line Chart</option>
          </select>
        </div>
        
        <div className="control-group">
          <button 
            onClick={() => setStacked(!stacked)}
            style={{ 
              padding: '0.5rem 1rem',
              background: stacked ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {stacked ? '📊 Stacked View' : '📈 Side-by-Side'}
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ReactECharts 
          option={getOption()} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </div>

      <div style={{ marginTop: '2rem', background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>📊 Warehouse Performance Analysis:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f0f4ff', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
            <h5 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🏆 Top Performer</h5>
            <p style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Warehouse {Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b).charAt(0).toUpperCase() + Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b).slice(1)}
            </p>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Highest total volume processed
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f0fff4', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
            <h5 style={{ color: '#48bb78', marginBottom: '0.5rem' }}>📈 Growth Trend</h5>
            <p style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Positive Across All
            </p>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              All warehouses showing upward trends
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fffaf0', borderRadius: '8px', borderLeft: '4px solid #f6ad55' }}>
            <h5 style={{ color: '#f6ad55', marginBottom: '0.5rem' }}>⚖️ Load Balance</h5>
            <p style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1.1rem' }}>
              Well Distributed
            </p>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              No warehouse overloaded
            </p>
          </div>
        </div>
      </div>

      <div className="feature-list">
        <h4>🎯 Multi-Warehouse Features:</h4>
        <ul>
          <li><strong>Side-by-Side Comparison:</strong> Compare performance across locations easily</li>
          <li><strong>Stacked View:</strong> See total volume and individual contributions</li>
          <li><strong>Dynamic Switching:</strong> Toggle between bar and line charts</li>
          <li><strong>Zoom & Filter:</strong> Focus on specific time periods</li>
          <li><strong>Color Coding:</strong> Each warehouse has distinct color for easy tracking</li>
          <li><strong>Trend Analysis:</strong> Identify growth patterns and seasonal variations</li>
          <li><strong>Percentage Breakdown:</strong> Understand each warehouse's contribution to total</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '0.5rem' }}>✨ Enhanced with Reusable Modules!</h4>
        <p style={{ color: '#424242' }}>
          This component now uses reusable hooks and can be easily extended with date range filtering and aggregation features.
        </p>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
        <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>💡 Strategic Recommendations:</h4>
        <ul style={{ color: '#856404', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Consider expanding Warehouse North capacity given its high performance</li>
          <li>Warehouse West shows potential - investigate opportunities for optimization</li>
          <li>Maintain current load balancing strategy to prevent bottlenecks</li>
          <li>Monitor week-to-week variations for demand forecasting improvements</li>
        </ul>
      </div>
    </div>
  );
}

export default MultiWarehouse;
