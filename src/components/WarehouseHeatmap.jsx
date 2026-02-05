import ReactECharts from 'echarts-for-react';
import { generateWarehouseHeatmap } from '../utils/dummyData';

function WarehouseHeatmap() {
  const heatmapData = generateWarehouseHeatmap();

  const option = {
    title: {
      text: 'Warehouse Activity Heatmap - By Hour & Day',
      left: 'center',
      textStyle: { fontSize: 20, fontWeight: 'bold' }
    },
    tooltip: {
      position: 'top',
      formatter: function(params) {
        return `${heatmapData.days[params.value[1]]} at ${heatmapData.hours[params.value[0]]}<br/>Activity Level: <strong>${params.value[2]}%</strong>`;
      }
    },
    grid: {
      height: '70%',
      top: '15%',
      left: '12%',
      right: '3%'
    },
    xAxis: {
      type: 'category',
      data: heatmapData.hours,
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: 11
      }
    },
    yAxis: {
      type: 'category',
      data: heatmapData.days,
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: 11
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#e3f2fd', '#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1']
      },
      text: ['High Activity', 'Low Activity'],
      textStyle: {
        color: '#333'
      }
    },
    series: [
      {
        name: 'Activity Level',
        type: 'heatmap',
        data: heatmapData.data,
        label: {
          show: true,
          formatter: function(params) {
            return params.value[2] + '%';
          },
          fontSize: 10
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // Calculate insights
  const peakHours = heatmapData.data
    .sort((a, b) => b[2] - a[2])
    .slice(0, 3);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔥 Warehouse Activity Heatmap</h1>
        <p>Analyze activity patterns by time of day and day of week</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Peak Activity Time</h4>
          <div className="stat-value">10:00 AM</div>
          <div className="stat-change">Weekdays average</div>
        </div>
        <div className="stat-card">
          <h4>Busiest Day</h4>
          <div className="stat-value">Wednesday</div>
          <div className="stat-change positive">↑ 15% above average</div>
        </div>
        <div className="stat-card">
          <h4>Weekend Activity</h4>
          <div className="stat-value">45%</div>
          <div className="stat-change">of weekday levels</div>
        </div>
        <div className="stat-card">
          <h4>Off-Peak Hours</h4>
          <div className="stat-value">00:00-06:00</div>
          <div className="stat-change">Lowest activity window</div>
        </div>
      </div>

      <div className="chart-container">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
        />
      </div>

      <div style={{ marginTop: '2rem', background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 15px rgba(0,0,0,0.08)' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>📊 Top 3 Peak Activity Periods:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {peakHours.map((item, index) => (
            <div key={index} style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                #{index + 1}
              </div>
              <div style={{ color: '#2c3e50', fontWeight: '600', marginTop: '0.5rem' }}>
                {heatmapData.days[item[1]]} at {heatmapData.hours[item[0]]}
              </div>
              <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                Activity: {item[2]}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-list">
        <h4>🎯 Heatmap Analysis Features:</h4>
        <ul>
          <li><strong>Pattern Detection:</strong> Identify peak and off-peak hours at a glance</li>
          <li><strong>Resource Planning:</strong> Optimize staff scheduling based on activity patterns</li>
          <li><strong>Color Gradient:</strong> Darker colors indicate higher activity levels</li>
          <li><strong>Interactive Tooltips:</strong> Hover over cells for detailed activity data</li>
          <li><strong>Visual Scale:</strong> Legend shows activity range from 0-100%</li>
          <li><strong>Day/Hour Breakdown:</strong> Complete weekly activity view in single chart</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
        <h4 style={{ color: '#856404', marginBottom: '0.5rem' }}>💡 Business Insights:</h4>
        <ul style={{ color: '#856404', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Schedule more staff during 8:00-18:00 on weekdays for peak efficiency</li>
          <li>Weekend operations can be scaled down to 40-50% of weekday capacity</li>
          <li>Night shift (22:00-06:00) shows minimal activity - consider cost optimization</li>
          <li>Wednesday shows highest activity - ideal for major shipments and restocking</li>
        </ul>
      </div>
    </div>
  );
}

export default WarehouseHeatmap;
