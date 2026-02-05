import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { generateInventoryData } from '../utils/dummyData';

function Advanced2DZoom() {
  const [zoomMode, setZoomMode] = useState('xy');
  const [showDataZoom, setShowDataZoom] = useState(true);
  const inventoryData = generateInventoryData(90);

  const option = {
    title: {
      text: '2D Zoom & Pan - Advanced Chart Exploration',
      subtext: 'Zoom into specific areas of the chart, not just time axis',
      left: 'center',
      textStyle: { fontSize: 20, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function (params) {
        let result = params[0].axisValue + '<br/>';
        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: <strong>${item.value.toLocaleString()}</strong> units<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Warehouse A', 'Warehouse B', 'Warehouse C'],
      top: 60,
      textStyle: { fontSize: 12 }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: showDataZoom ? '20%' : '10%',
      top: '20%',
      containLabel: true
    },
    toolbox: {
      feature: {
        // 🔥 Zoom Box - Drag to select area to zoom
        dataZoom: {
          yAxisIndex: 'all',  // Enable Y-axis zoom too!
          title: { 
            zoom: '📦 Box Zoom (X+Y)', 
            back: '↩️ Reset View' 
          },
          icon: {
            zoom: 'path://M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z',
            back: 'path://M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z'
          },
          emphasis: {
            iconStyle: {
              borderColor: '#667eea',
              borderWidth: 2
            }
          }
        },
        restore: { 
          title: '🔄 Restore',
          icon: 'path://M224 187.7V96H64v64h64v27.7C59.6 199 0 262.2 0 336C0 415.5 64.47 480 144 480S288 415.5 288 336C288 262.2 228.4 199 160 187.7zM144 432C90.98 432 48 389 48 336S90.98 240 144 240S240 282.1 240 336S197 432 144 432zM352 96v91.7C419.4 199 479 262.2 479 336C479 415.5 415.5 480 335.1 480S192 415.5 192 336h48C240 389 282.1 432 335.1 432S431.1 389 431.1 336S389 240 335.1 240V96H352z'
        },
        saveAsImage: { 
          title: '💾 Save',
          pixelRatio: 2 
        }
      },
      right: 20,
      top: 30,
      itemSize: 20,
      itemGap: 15
    },
    // 🔥 2D DataZoom - Can zoom both X and Y axes
    dataZoom: showDataZoom ? [
      {
        type: 'inside',  // Mouse wheel and drag zoom
        xAxisIndex: 0,
        yAxisIndex: 0,  // 🔥 Enable Y-axis zoom
        zoomOnMouseWheel: zoomMode !== 'x',  // Mouse wheel zooms
        moveOnMouseMove: true,  // Shift+drag to pan
        moveOnMouseWheel: false,
        // 🔥 Zoom lock options
        zoomLock: zoomMode === 'none',
        disabled: zoomMode === 'none'
      },
      {
        type: 'slider',  // X-axis slider
        xAxisIndex: 0,
        start: 0,
        end: 100,
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
        type: 'slider',  // 🔥 Y-axis slider (vertical)
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
    ] : [],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: inventoryData.map(item => item.date),
      axisLabel: {
        formatter: function (value) {
          return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: 'Inventory (Units)',
      nameTextStyle: { fontSize: 14, fontWeight: 'bold' },
      // 🔥 Scale - important for zoom to work properly
      scale: true,  
      axisLabel: {
        formatter: function (value) {
          return value.toLocaleString();
        }
      },
      splitLine: {
        lineStyle: { type: 'dashed', color: '#e0e0e0' }
      }
    },
    series: [
      {
        name: 'Warehouse A',
        type: 'line',
        data: inventoryData.map(item => item.warehouseA),
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#667eea' },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
              { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
            ]
          }
        }
      },
      {
        name: 'Warehouse B',
        type: 'line',
        data: inventoryData.map(item => item.warehouseB),
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#48bb78' },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(72, 187, 120, 0.3)' },
              { offset: 1, color: 'rgba(72, 187, 120, 0.05)' }
            ]
          }
        }
      },
      {
        name: 'Warehouse C',
        type: 'line',
        data: inventoryData.map(item => item.warehouseC),
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: { color: '#f6ad55' },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(246, 173, 85, 0.3)' },
              { offset: 1, color: 'rgba(246, 173, 85, 0.05)' }
            ]
          }
        }
      }
    ]
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔍 Advanced 2D Zoom & Pan</h1>
        <p>Zoom into specific areas of the chart (X + Y axes), not just time axis</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h4>🎯 Zoom Mode</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {zoomMode === 'xy' ? 'X + Y Axes' : zoomMode === 'x' ? 'X Only' : 'Disabled'}
          </div>
          <div className="stat-change">Current setting</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' }}>
          <h4>📦 Box Zoom</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>Enabled</div>
          <div className="stat-change">Click toolbar icon</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)' }}>
          <h4>🖱️ Mouse Wheel</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>2D Zoom</div>
          <div className="stat-change">Scroll to zoom in/out</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)' }}>
          <h4>👆 Sliders</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>X + Y</div>
          <div className="stat-change">Bottom + Right edge</div>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>🎯 Zoom Mode:</label>
          <select value={zoomMode} onChange={(e) => setZoomMode(e.target.value)}>
            <option value="xy">2D Zoom (X + Y)</option>
            <option value="x">X-Axis Only</option>
            <option value="none">Disabled</option>
          </select>
        </div>
        <div className="control-group">
          <label>📊 Show Sliders:</label>
          <button onClick={() => setShowDataZoom(!showDataZoom)}>
            {showDataZoom ? '✅ Sliders ON' : '❌ Sliders OFF'}
          </button>
        </div>
      </div>

      <div className="chart-container" style={{ height: '600px' }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>

      <div style={{ marginTop: '2rem', background: '#fff3cd', borderRadius: '12px', padding: '2rem', border: '2px solid #ffc107' }}>
        <h3 style={{ color: '#856404', marginBottom: '1.5rem', fontSize: '1.5rem' }}>🎮 How to Use 2D Zoom:</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>🖱️ Method 1: Mouse Wheel</h4>
            <ul style={{ color: '#495057', marginLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Scroll Up:</strong> Zoom IN to area under cursor</li>
              <li><strong>Scroll Down:</strong> Zoom OUT from area</li>
              <li><strong>Move Mouse:</strong> Then scroll to zoom different areas</li>
              <li><strong>Pan:</strong> Hold Shift + Drag to move around</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#48bb78', marginBottom: '1rem' }}>📦 Method 2: Box Zoom</h4>
            <ul style={{ color: '#495057', marginLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Step 1:</strong> Click the "📦 Box Zoom" icon in toolbar</li>
              <li><strong>Step 2:</strong> Drag a rectangle on the area you want to zoom</li>
              <li><strong>Result:</strong> Chart zooms to selected area (X + Y)</li>
              <li><strong>Reset:</strong> Click "↩️ Reset View" icon</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#f6ad55', marginBottom: '1rem' }}>📏 Method 3: Sliders</h4>
            <ul style={{ color: '#495057', marginLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Bottom Slider:</strong> Control X-axis range (time)</li>
              <li><strong>Right Slider:</strong> Control Y-axis range (values)</li>
              <li><strong>Drag Handles:</strong> Adjust visible range</li>
              <li><strong>Drag Middle:</strong> Pan without changing zoom level</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="feature-list" style={{ marginTop: '2rem' }}>
        <h4>🎯 Advanced Zoom Features:</h4>
        <ul style={{ columns: 2, columnGap: '2rem' }}>
          <li><strong>2D Zoom:</strong> Zoom both X (time) and Y (values) simultaneously</li>
          <li><strong>Mouse Wheel Zoom:</strong> Scroll anywhere on chart to zoom that area</li>
          <li><strong>Box Selection:</strong> Drag rectangle to zoom specific region</li>
          <li><strong>Dual Sliders:</strong> Independent control of X and Y axes</li>
          <li><strong>Shift + Drag Pan:</strong> Move around after zooming in</li>
          <li><strong>Dynamic Y-Scale:</strong> Y-axis rescales based on visible data</li>
          <li><strong>Zoom Lock:</strong> Disable/enable zoom on demand</li>
          <li><strong>Reset View:</strong> One-click return to original view</li>
          <li><strong>Precision Control:</strong> Zoom to exact data points</li>
          <li><strong>Area Focus:</strong> Zoom into anomalies or specific patterns</li>
          <li><strong>Multi-Series:</strong> All series zoom together</li>
          <li><strong>Smooth Animation:</strong> Animated zoom transitions</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '1rem' }}>💡 Pro Tips for 2D Zoom:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h5 style={{ color: '#1976d2' }}>🎯 When to Use 2D Zoom</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Use 2D zoom when you need to examine specific value ranges (e.g., only items between 4000-5000 units) 
              during a particular time period. Perfect for anomaly detection!
            </p>
          </div>
          <div>
            <h5 style={{ color: '#1976d2' }}>📊 Analyzing Patterns</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Zoom into a small area to see micro-trends, then zoom out to see the big picture. 
              The Y-slider lets you focus on specific value ranges across all time.
            </p>
          </div>
          <div>
            <h5 style={{ color: '#1976d2' }}>🔍 Detail Inspection</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Box zoom is fastest for precise area selection. Mouse wheel is best for quick exploration. 
              Sliders are ideal for fine-tuning the visible range.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f3e5f5', borderRadius: '8px' }}>
        <h4 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>🆚 2D Zoom vs Time-Only Zoom:</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#7b1fa2', color: 'white' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Time-Only Zoom</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>2D Zoom (This Demo)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>X-Axis Control</td>
              <td style={{ padding: '1rem' }}>✅ Yes</td>
              <td style={{ padding: '1rem' }}>✅ Yes</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>Y-Axis Control</td>
              <td style={{ padding: '1rem' }}>❌ No (auto-scale)</td>
              <td style={{ padding: '1rem' }}>✅ Yes (manual control)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>Zoom to Specific Values</td>
              <td style={{ padding: '1rem' }}>❌ No</td>
              <td style={{ padding: '1rem' }}>✅ Yes (e.g., 4000-5000 units)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>Focus on Anomalies</td>
              <td style={{ padding: '1rem' }}>⚠️ Limited</td>
              <td style={{ padding: '1rem' }}>✅ Excellent</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>Y-Slider</td>
              <td style={{ padding: '1rem' }}>❌ No</td>
              <td style={{ padding: '1rem' }}>✅ Yes (right edge)</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', fontWeight: 'bold' }}>Use Case</td>
              <td style={{ padding: '1rem' }}>Time-series analysis</td>
              <td style={{ padding: '1rem' }}>Detailed data exploration</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Advanced2DZoom;
