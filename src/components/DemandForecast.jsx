import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { generateDemandForecast } from '../utils/dummyData';

function DemandForecast() {
  const [forecastPeriod, setForecastPeriod] = useState('12');
  const forecastData = generateDemandForecast(parseInt(forecastPeriod));

  const option = {
    title: {
      text: 'Demand Forecasting with Confidence Intervals',
      left: 'center',
      textStyle: { fontSize: 20, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Actual Demand', 'Forecast', 'Upper Bound', 'Lower Bound'],
      top: 35
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    toolbox: {
      feature: {
        dataZoom: { yAxisIndex: 'none' },
        restore: {},
        saveAsImage: { pixelRatio: 2 }
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
        bottom: 50
      }
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: forecastData.map(item => item.month),
      axisLabel: {
        rotate: 45,
        formatter: function(value) {
          const [year, month] = value.split('-');
          const date = new Date(year, month - 1);
          return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Demand (Units)',
      nameTextStyle: { fontSize: 14 },
      axisLabel: {
        formatter: function(value) {
          return (value / 1000).toFixed(0) + 'K';
        }
      },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [
      {
        name: 'Actual Demand',
        type: 'line',
        data: forecastData.map(item => item.actual),
        smooth: true,
        lineStyle: { width: 3, color: '#667eea' },
        itemStyle: { color: '#667eea' },
        symbol: 'circle',
        symbolSize: 8,
        emphasis: {
          focus: 'series',
          itemStyle: { borderWidth: 2, borderColor: '#fff' }
        }
      },
      {
        name: 'Forecast',
        type: 'line',
        data: forecastData.map(item => item.forecast),
        smooth: true,
        lineStyle: { width: 3, color: '#48bb78', type: 'dashed' },
        itemStyle: { color: '#48bb78' },
        symbol: 'diamond',
        symbolSize: 8
      },
      {
        name: 'Upper Bound',
        type: 'line',
        data: forecastData.map(item => item.upperBound),
        lineStyle: { width: 1, color: '#f6ad55', opacity: 0.5 },
        itemStyle: { color: '#f6ad55' },
        symbol: 'none',
        areaStyle: { color: 'rgba(246, 173, 85, 0.1)' },
        stack: 'confidence-band'
      },
      {
        name: 'Lower Bound',
        type: 'line',
        data: forecastData.map(item => item.lowerBound),
        lineStyle: { width: 1, color: '#f6ad55', opacity: 0.5 },
        itemStyle: { color: '#f6ad55' },
        symbol: 'none',
        areaStyle: { color: 'rgba(246, 173, 85, 0.1)' }
      }
    ]
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📈 Demand Forecasting</h1>
        <p>Predictive analytics with confidence intervals and historical comparison</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Forecast Period:</label>
          <select value={forecastPeriod} onChange={(e) => setForecastPeriod(e.target.value)}>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
            <option value="18">18 Months</option>
            <option value="24">24 Months</option>
          </select>
        </div>
      </div>

      <div className="chart-container">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Forecast Accuracy</h4>
          <div className="stat-value">94.2%</div>
          <div className="stat-change positive">↑ 2.1% vs last period</div>
        </div>
        <div className="stat-card">
          <h4>Avg Monthly Demand</h4>
          <div className="stat-value">12.5K</div>
          <div className="stat-change positive">↑ 8.3% growth</div>
        </div>
        <div className="stat-card">
          <h4>Confidence Level</h4>
          <div className="stat-value">95%</div>
          <div className="stat-change">Interval: ±15%</div>
        </div>
        <div className="stat-card">
          <h4>Peak Month</h4>
          <div className="stat-value">Dec 2026</div>
          <div className="stat-change">Est. 18.2K units</div>
        </div>
      </div>

      <div className="feature-list">
        <h4>🎯 Forecasting Features:</h4>
        <ul>
          <li><strong>Historical vs Predicted:</strong> Compare actual demand with forecasted values</li>
          <li><strong>Confidence Intervals:</strong> Upper and lower bounds showing prediction uncertainty</li>
          <li><strong>Seasonal Patterns:</strong> Algorithm detects and incorporates seasonal trends</li>
          <li><strong>Multiple Time Horizons:</strong> View forecasts from 6 months to 2 years</li>
          <li><strong>Interactive Zoom:</strong> Focus on specific time periods for detailed analysis</li>
          <li><strong>Accuracy Metrics:</strong> Track forecast performance over time</li>
        </ul>
      </div>
    </div>
  );
}

export default DemandForecast;
