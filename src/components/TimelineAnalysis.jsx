/**
 * Refactored: TimelineAnalysis
 * 
 * Now using reusable zoom controls!
 * Enhanced with better structure
 */

import { useState } from 'react';
import ReactECharts from 'echarts-for-react';

// 🔥 Import reusable modules
import { useChartZoom } from '../hooks';
import { generateTimelineData } from '../utils/dummyData';

function TimelineAnalysis() {
  const [viewMode, setViewMode] = useState('all');
  
  // 🔥 Use reusable zoom hook
  const zoom = useChartZoom();
  
  const timelineData = generateTimelineData();

  const option = {
    title: {
      text: 'Year-over-Year Timeline Analysis',
      subtext: 'Comprehensive trends and patterns',
      left: 'center',
      textStyle: { fontSize: 20, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: { backgroundColor: '#6a7985' }
      },
      formatter: function(params) {
        let result = `<strong>${params[0].axisValue}</strong><br/>`;
        params.forEach(item => {
          if (item.seriesName === 'Revenue') {
            result += `${item.marker} ${item.seriesName}: <strong>$${(item.value / 1000).toFixed(0)}K</strong><br/>`;
          } else {
            result += `${item.marker} ${item.seriesName}: <strong>${item.value.toLocaleString()}</strong><br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['Orders', 'Shipments', 'Returns', 'Revenue'],
      top: 60,
      selected: {
        'Orders': viewMode === 'all' || viewMode === 'orders',
        'Shipments': viewMode === 'all' || viewMode === 'shipments',
        'Returns': viewMode === 'all' || viewMode === 'returns',
        'Revenue': viewMode === 'all' || viewMode === 'revenue'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    toolbox: zoom.getToolboxConfig(),
    dataZoom: zoom.getDataZoomConfig(),
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: timelineData.map(item => item.month)
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        nameTextStyle: { fontSize: 14 },
        position: 'left',
        axisLabel: {
          formatter: function(value) {
            return (value / 1000).toFixed(0) + 'K';
          }
        }
      },
      {
        type: 'value',
        name: 'Revenue ($)',
        nameTextStyle: { fontSize: 14 },
        position: 'right',
        axisLabel: {
          formatter: function(value) {
            return '$' + (value / 1000).toFixed(0) + 'K';
          }
        }
      }
    ],
    series: [
      {
        name: 'Orders',
        type: 'bar',
        data: timelineData.map(item => item.orders),
        itemStyle: { color: '#667eea' },
        emphasis: {
          focus: 'series',
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        }
      },
      {
        name: 'Shipments',
        type: 'bar',
        data: timelineData.map(item => item.shipments),
        itemStyle: { color: '#48bb78' },
        emphasis: { focus: 'series' }
      },
      {
        name: 'Returns',
        type: 'line',
        data: timelineData.map(item => item.returns),
        smooth: true,
        lineStyle: { width: 3, color: '#e53e3e' },
        itemStyle: { color: '#e53e3e' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(229, 62, 62, 0.3)' },
              { offset: 1, color: 'rgba(229, 62, 62, 0.05)' }
            ]
          }
        },
        emphasis: { focus: 'series' }
      },
      {
        name: 'Revenue',
        type: 'line',
        yAxisIndex: 1,
        data: timelineData.map(item => item.revenue),
        smooth: true,
        lineStyle: { width: 4, color: '#f6ad55' },
        itemStyle: { color: '#f6ad55' },
        symbol: 'circle',
        symbolSize: 8,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 3,
            borderColor: '#fff',
            shadowBlur: 10
          }
        }
      }
    ]
  };

  const totalOrders = timelineData.reduce((sum, item) => sum + item.orders, 0);
  const totalShipments = timelineData.reduce((sum, item) => sum + item.shipments, 0);
  const totalReturns = timelineData.reduce((sum, item) => sum + item.returns, 0);
  const totalRevenue = timelineData.reduce((sum, item) => sum + item.revenue, 0);
  const fulfillmentRate = ((totalShipments / totalOrders) * 100).toFixed(1);
  const returnRate = ((totalReturns / totalShipments) * 100).toFixed(1);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📅 Timeline Analysis</h1>
        <p>Comprehensive year-over-year trends and patterns</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Orders (YTD)</h4>
          <div className="stat-value">{(totalOrders / 1000).toFixed(1)}K</div>
          <div className="stat-change positive">↑ 15.2% YoY</div>
        </div>
        <div className="stat-card">
          <h4>Total Shipments</h4>
          <div className="stat-value">{(totalShipments / 1000).toFixed(1)}K</div>
          <div className="stat-change positive">↑ 14.8% YoY</div>
        </div>
        <div className="stat-card">
          <h4>Fulfillment Rate</h4>
          <div className="stat-value">{fulfillmentRate}%</div>
          <div className="stat-change positive">Excellent</div>
        </div>
        <div className="stat-card">
          <h4>Return Rate</h4>
          <div className="stat-value">{returnRate}%</div>
          <div className="stat-change">Within target</div>
        </div>
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <div className="stat-value">${(totalRevenue / 1000000).toFixed(2)}M</div>
          <div className="stat-change positive">↑ 18.5% YoY</div>
        </div>
        <div className="stat-card">
          <h4>Avg Order Value</h4>
          <div className="stat-value">${(totalRevenue / totalOrders).toFixed(0)}</div>
          <div className="stat-change positive">↑ $12 vs last year</div>
        </div>
      </div>

      <div className="controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="control-group">
          <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>👁️ View Mode:</label>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
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
            <option value="all">📊 All Metrics</option>
            <option value="orders">📦 Orders Only</option>
            <option value="shipments">🚚 Shipments Only</option>
            <option value="returns">↩️ Returns Only</option>
            <option value="revenue">💰 Revenue Only</option>
          </select>
        </div>

        <div className="control-group">
          <button 
            onClick={zoom.resetZoom}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#48bb78',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#38a169'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#48bb78'}
          >
            🔄 Reset Zoom
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </div>

      <div style={{ marginTop: '2rem', background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>📊 Monthly Breakdown - Top 3 Months:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {timelineData
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 3)
            .map((item, index) => (
              <div key={index} style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                  #{index + 1} - {item.month}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#495057' }}>
                  <div>Orders: <strong>{item.orders.toLocaleString()}</strong></div>
                  <div>Shipments: <strong>{item.shipments.toLocaleString()}</strong></div>
                  <div>Revenue: <strong>${(item.revenue / 1000).toFixed(0)}K</strong></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="feature-list">
        <h4>🎯 Timeline Analysis Features:</h4>
        <ul>
          <li><strong>Multi-Metric View:</strong> Track multiple KPIs in a single chart</li>
          <li><strong>Dual Y-Axis:</strong> Compare metrics with different scales (count vs revenue)</li>
          <li><strong>Mixed Chart Types:</strong> Bars for volume, lines for trends</li>
          <li><strong>Interactive Legend:</strong> Click legend items to show/hide specific metrics</li>
          <li><strong>View Mode Filter:</strong> Focus on specific metrics using the dropdown</li>
          <li><strong>Zoom Timeline:</strong> Focus on specific months or quarters</li>
          <li><strong>Year-over-Year:</strong> Compare performance across time periods</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '0.5rem' }}>✨ Enhanced with Reusable Zoom Hook!</h4>
        <p style={{ color: '#424242' }}>
          This component now uses <code>useChartZoom</code> hook for consistent zoom behavior across all charts.
        </p>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e8f5e9', borderRadius: '8px' }}>
        <h4 style={{ color: '#2e7d32', marginBottom: '1rem' }}>📈 Key Insights & Trends:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h5 style={{ color: '#388e3c' }}>🎯 Growth Pattern</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Consistent upward trend across all metrics indicates healthy business growth. Revenue is growing faster than order volume, suggesting higher average order values.
            </p>
          </div>
          <div>
            <h5 style={{ color: '#388e3c' }}>📦 Operational Efficiency</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              High fulfillment rate ({fulfillmentRate}%) shows excellent operational capability. Low return rate ({returnRate}%) indicates good product quality and customer satisfaction.
            </p>
          </div>
          <div>
            <h5 style={{ color: '#388e3c' }}>🔮 Forecast</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Based on current trajectory, expect to reach ${((totalRevenue / 1000000) * 1.2).toFixed(2)}M in revenue by year end with continued growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineAnalysis;
