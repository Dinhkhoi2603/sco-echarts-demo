import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { generateInventoryData } from '../utils/dummyData';

function SCOChartDemo() {
  // Date & Filter States (from InventoryChart)
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 90);
  
  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('custom');
  
  // Zoom States (from Advanced2DZoom)
  const [zoomMode, setZoomMode] = useState('xy'); // xy, x, none
  const [showDataZoom, setShowDataZoom] = useState(true);
  const [showAllTimeMarkers, setShowAllTimeMarkers] = useState(true);
  const [dataZoomStart, setDataZoomStart] = useState(0);
  const [dataZoomEnd, setDataZoomEnd] = useState(100);

  // Generate and filter data
  const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const allInventoryData = generateInventoryData(Math.max(daysDiff + 30, 1));
  
  const rawInventoryData = allInventoryData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });

  // Helper functions for date aggregation
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  };

  const getQuarter = (date) => {
    const d = new Date(date);
    const quarter = Math.floor(d.getMonth() / 3) + 1;
    return `${d.getFullYear()}-Q${quarter}`;
  };

  // Aggregate data based on filter type
  const aggregateData = (data, type) => {
    if (type === 'custom') return data;

    const grouped = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      let key;
      
      switch(type) {
        case 'week':
          key = getWeekNumber(date);
          break;
        case 'month':
          key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          break;
        case 'quarter':
          key = getQuarter(date);
          break;
        case 'year':
          key = date.getFullYear().toString();
          break;
        default:
          key = item.date;
      }
      
      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          warehouseA: [],
          warehouseB: [],
          warehouseC: [],
          safetyStock: item.safetyStock,
          reorderPoint: item.reorderPoint
        };
      }
      
      grouped[key].warehouseA.push(item.warehouseA);
      grouped[key].warehouseB.push(item.warehouseB);
      grouped[key].warehouseC.push(item.warehouseC);
    });
    
    return Object.keys(grouped).sort().map(key => {
      const group = grouped[key];
      return {
        date: group.date,
        warehouseA: Math.round(group.warehouseA.reduce((a, b) => a + b, 0) / group.warehouseA.length),
        warehouseB: Math.round(group.warehouseB.reduce((a, b) => a + b, 0) / group.warehouseB.length),
        warehouseC: Math.round(group.warehouseC.reduce((a, b) => a + b, 0) / group.warehouseC.length),
        safetyStock: group.safetyStock,
        reorderPoint: group.reorderPoint
      };
    });
  };

  const inventoryData = aggregateData(rawInventoryData, filterType);

  // X-axis formatter
  const getXAxisFormatter = () => {
    switch(filterType) {
      case 'week':
        return function(value) {
          const [year, week] = value.split('-W');
          return `W${week}\n${year}`;
        };
      case 'month':
        return function(value) {
          const [year, month] = value.split('-');
          const date = new Date(year, parseInt(month) - 1);
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };
      case 'quarter':
        return function(value) {
          return value.replace('-', ' ');
        };
      case 'year':
        return function(value) {
          return value;
        };
      default:
        return function(value) {
          return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };
    }
  };

  // ECharts option
  const option = {
    title: {
      text: 'SCO Advanced Chart - Inventory Tracking with 2D Zoom',
      subtext: 'Date range selection + Time aggregation + 2D Zoom & Pan',
      left: 'center',
      textStyle: { fontSize: 20, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function (params) {
        let dateLabel = params[0].axisValue;
        
        switch(filterType) {
          case 'week': {
            const [year, week] = dateLabel.split('-W');
            dateLabel = `Week ${week}, ${year}`;
            break;
          }
          case 'month': {
            const [y, m] = dateLabel.split('-');
            const monthDate = new Date(y, parseInt(m) - 1);
            dateLabel = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            break;
          }
          case 'quarter':
            dateLabel = dateLabel.replace('-', ' ');
            break;
          case 'year':
            dateLabel = `Year ${dateLabel}`;
            break;
          default:
            dateLabel = new Date(dateLabel).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            });
        }
        
        let result = `<strong>${dateLabel}</strong><br/>`;
        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: <strong>${item.value.toLocaleString()}</strong> units<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Safety Stock', 'Reorder Point'],
      top: 60,
      textStyle: { fontSize: 12 }
    },
    grid: {
      left: '5%',
      right: showDataZoom ? '7%' : '5%',
      bottom: showDataZoom ? '20%' : '10%',
      top: '20%',
      containLabel: true
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'all',  // 🔥 Enable Y-axis zoom in box zoom
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
    },
    // 🔥 2D DataZoom - Both X and Y axes
    dataZoom: showDataZoom ? [
      {
        type: 'inside',
        xAxisIndex: 0,
        yAxisIndex: 0,  // 🔥 Enable Y-axis zoom
        start: dataZoomStart,
        end: dataZoomEnd,
        zoomOnMouseWheel: zoomMode !== 'x',
        moveOnMouseMove: true,
        zoomLock: zoomMode === 'none',
        disabled: zoomMode === 'none'
      },
      {
        type: 'slider',  // X-axis slider
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
        formatter: getXAxisFormatter(),
        rotate: filterType === 'custom' ? 45 : 0,
        // 🔥 Show all time markers based on user preference and filter type
        interval: showAllTimeMarkers && filterType !== 'custom' ? 0 : 'auto',
        fontSize: showAllTimeMarkers && filterType !== 'custom' ? 11 : 10,
        margin: showAllTimeMarkers && filterType !== 'custom' ? 12 : 8,
        hideOverlap: !showAllTimeMarkers // Hide overlapping labels when auto mode
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        interval: showAllTimeMarkers && filterType !== 'custom' ? 0 : 'auto'
      },
      // 🔥 Add split lines to mark each time period
      splitLine: {
        show: showAllTimeMarkers && filterType !== 'custom',
        lineStyle: {
          color: '#e8e8e8',
          type: 'dotted',
          width: 1
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Inventory (Units)',
      nameTextStyle: { fontSize: 14, fontWeight: 'bold' },
      scale: true,  // 🔥 Important for Y-axis zoom
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
      },
      {
        name: 'Safety Stock',
        type: 'line',
        data: inventoryData.map(item => item.safetyStock),
        lineStyle: { type: 'dashed', color: '#e53e3e', width: 2 },
        itemStyle: { color: '#e53e3e' },
        symbol: 'none'
      },
      {
        name: 'Reorder Point',
        type: 'line',
        data: inventoryData.map(item => item.reorderPoint),
        lineStyle: { type: 'dotted', color: '#dd6b20', width: 2 },
        itemStyle: { color: '#dd6b20' },
        symbol: 'none'
      }
    ]
  };

  // Event handlers
  const handleFilterChange = (type) => {
    // 🔥 NEW LOGIC: Filter only changes aggregation type, NOT date range
    // User selects date range first, then chooses how to aggregate that data
    setFilterType(type);
    setDataZoomStart(0);
    setDataZoomEnd(100);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    // Reset zoom when date range changes
    setDataZoomStart(0);
    setDataZoomEnd(100);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    // Reset zoom when date range changes
    setDataZoomStart(0);
    setDataZoomEnd(100);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚀 SCO Advanced Chart Demo</h1>
        <p>1️⃣ Select date range → 2️⃣ Choose aggregation type → 3️⃣ Explore with 2D zoom</p>
        
        {/* Data Range Info */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: '#f7fafc', 
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            display: 'inline-block'
          }}>
            <span style={{ fontWeight: '600', color: '#4a5568' }}>
              📊 Showing data: 
            </span>
            <span style={{ color: '#667eea', fontWeight: '700', marginLeft: '0.5rem' }}>
              {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ color: '#718096', margin: '0 0.5rem' }}>→</span>
            <span style={{ color: '#667eea', fontWeight: '700' }}>
              {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ color: '#718096', marginLeft: '0.75rem' }}>
              ({inventoryData.length} {
                filterType === 'week' ? 'weeks' :
                filterType === 'month' ? 'months' :
                filterType === 'quarter' ? 'quarters' :
                filterType === 'year' ? 'years' :
                'days'
              })
            </span>
          </div>
          
          {filterType !== 'custom' && (
            <div style={{ 
              padding: '0.75rem 1rem', 
              backgroundColor: '#e6f7ff', 
              borderRadius: '8px',
              border: '1px solid #91d5ff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📈</span>
              <span style={{ fontWeight: '600', color: '#0050b3' }}>
                Data aggregated by {filterType}
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#1890ff',
                backgroundColor: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontWeight: '600'
              }}>
                AVG
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginTop: '1.5rem' }}>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h4>🎯 Zoom Mode</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {zoomMode === 'xy' ? 'X + Y' : zoomMode === 'x' ? 'X Only' : 'Off'}
          </div>
          <div className="stat-change">2D Zoom</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' }}>
          <h4>📊 Aggregation</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {filterType === 'custom' ? 'Daily' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </div>
          <div className="stat-change">View Mode</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)' }}>
          <h4>📍 Time Markers</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {showAllTimeMarkers ? 'All' : 'Auto'}
          </div>
          <div className="stat-change">{inventoryData.length} markers</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)' }}>
          <h4>👆 Sliders</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {showDataZoom ? 'X + Y' : 'Hidden'}
          </div>
          <div className="stat-change">{showDataZoom ? 'Active' : 'Inactive'}</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)' }}>
          <h4>📊 Data Points</h4>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            {inventoryData.length}
          </div>
          <div className="stat-change">
            {filterType === 'week' ? 'Weeks' :
             filterType === 'month' ? 'Months' :
             filterType === 'quarter' ? 'Quarters' :
             filterType === 'year' ? 'Years' : 'Days'}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end', marginTop: '1.5rem' }}>
        {/* Date Range Picker */}
        <div className="control-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>📅 Date Range:</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              type="date" 
              value={startDate} 
              onChange={handleStartDateChange}
              max={endDate}
              style={{
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
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }
              }}
            />
            <span style={{ color: '#718096', fontWeight: '600', fontSize: '0.95rem' }}>→</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={handleEndDateChange}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
              style={{
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
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }
              }}
            />
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="control-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>📊 Aggregate By:</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['custom', 'week', 'month', 'quarter', 'year'].map(type => (
              <button 
                key={type}
                onClick={() => handleFilterChange(type)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: filterType === type ? '#667eea' : '#fff',
                  color: filterType === type ? '#fff' : '#4a5568',
                  border: filterType === type ? '2px solid #667eea' : '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: filterType === type ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: filterType === type 
                    ? '0 4px 12px rgba(102, 126, 234, 0.4), 0 0 0 3px rgba(102, 126, 234, 0.1)' 
                    : '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  if (filterType !== type) {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.borderColor = '#667eea';
                    e.target.style.color = '#667eea';
                    e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filterType !== type) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.color = '#4a5568';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = filterType === type ? 'scale(1.02)' : 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = filterType === type ? 'scale(1.05)' : 'scale(1.05) translateY(-2px)';
                }}
              >
                {filterType === type && (
                  <span style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none'
                  }}></span>
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {filterType === type && '✓ '}
                  {type === 'custom' ? 'Daily' : type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Mode Control */}
        <div className="control-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>🎯 Zoom Mode:</label>
          <select 
            value={zoomMode} 
            onChange={(e) => setZoomMode(e.target.value)}
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
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.15)';
            }}
            onMouseLeave={(e) => {
              if (document.activeElement !== e.target) {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
              }
            }}
          >
            <option value="xy">🔍 2D Zoom (X + Y)</option>
            <option value="x">↔️ X-Axis Only</option>
            <option value="none">🚫 Disabled</option>
          </select>
        </div>

        {/* Show Sliders Toggle */}
        <div className="control-group">
          <button 
            onClick={() => setShowDataZoom(!showDataZoom)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: showDataZoom ? '#48bb78' : '#e53e3e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              outline: 'none',
              boxShadow: showDataZoom 
                ? '0 4px 12px rgba(72, 187, 120, 0.3)' 
                : '0 4px 12px rgba(229, 62, 62, 0.3)',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
              e.target.style.boxShadow = showDataZoom 
                ? '0 6px 16px rgba(72, 187, 120, 0.4)' 
                : '0 6px 16px rgba(229, 62, 62, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = showDataZoom 
                ? '0 4px 12px rgba(72, 187, 120, 0.3)' 
                : '0 4px 12px rgba(229, 62, 62, 0.3)';
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
          >
            {showDataZoom ? '✅ Sliders ON' : '❌ Sliders OFF'}
          </button>
        </div>

        {/* Show All Time Markers Toggle */}
        <div className="control-group">
          <button 
            onClick={() => setShowAllTimeMarkers(!showAllTimeMarkers)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: showAllTimeMarkers ? '#f6ad55' : '#718096',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              outline: 'none',
              boxShadow: showAllTimeMarkers 
                ? '0 4px 12px rgba(246, 173, 85, 0.3)' 
                : '0 4px 12px rgba(113, 128, 150, 0.2)',
              transform: 'scale(1)'
            }}
            title={filterType === 'custom' ? 'Only works with Week/Month/Quarter/Year filters' : 'Show all time markers on X-axis'}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
              e.target.style.boxShadow = showAllTimeMarkers 
                ? '0 6px 16px rgba(246, 173, 85, 0.4)' 
                : '0 6px 16px rgba(113, 128, 150, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = showAllTimeMarkers 
                ? '0 4px 12px rgba(246, 173, 85, 0.3)' 
                : '0 4px 12px rgba(113, 128, 150, 0.2)';
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
          >
            {showAllTimeMarkers ? '📍 All Markers' : '📍 Auto Markers'}
          </button>
        </div>

        {/* Reset Button */}
        <div className="control-group">
          <button 
            onClick={() => { setDataZoomStart(0); setDataZoomEnd(100); }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              outline: 'none',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
          >
            🔄 Reset Zoom
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container" style={{ height: '600px', marginTop: '1.5rem' }}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>

      {/* Features Section */}
      <div style={{ marginTop: '2rem', background: '#fff3cd', borderRadius: '12px', padding: '2rem', border: '2px solid #ffc107' }}>
        <h3 style={{ color: '#856404', marginBottom: '1.5rem', fontSize: '1.5rem' }}>🎮 How to Use This Advanced Chart:</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>📅 Date Range & Aggregation</h4>
            <ul style={{ color: '#495057', marginLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Step 1:</strong> Pick start & end dates using calendar</li>
              <li><strong>Step 2:</strong> Choose aggregation: Daily/Week/Month/Quarter/Year</li>
              <li><strong>Smart Aggregation:</strong> Data auto-averages within selected range</li>
              <li><strong>X-Axis Adapts:</strong> Labels format based on aggregation type</li>
              <li><strong>Time Markers:</strong> Show all periods on X-axis (📍 button)</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#48bb78', marginBottom: '1rem' }}>🔍 2D Zoom Methods</h4>
            <ul style={{ color: '#495057', marginLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Mouse Wheel:</strong> Scroll to zoom in/out on X+Y</li>
              <li><strong>Box Zoom:</strong> Drag rectangle on chart area</li>
              <li><strong>Sliders:</strong> X-slider (bottom) + Y-slider (right)</li>
              <li><strong>Shift+Drag:</strong> Pan around after zooming</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ color: '#f6ad55', marginBottom: '1rem' }}>⚙️ Advanced Controls</h4>
            <ul style={{ color: '#495057', marginLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Zoom Mode:</strong> Switch between 2D, X-only, or disabled</li>
              <li><strong>Toggle Sliders:</strong> Show/hide X and Y sliders</li>
              <li><strong>Time Markers:</strong> Show all periods or auto-select optimal spacing</li>
              <li><strong>Safety Lines:</strong> View safety stock & reorder points</li>
              <li><strong>Reset Zoom:</strong> One-click return to full view</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="feature-list" style={{ marginTop: '2rem' }}>
        <h4>🎯 Complete Feature Set:</h4>
        <div style={{ columns: 2, columnGap: '2rem' }}>
          <ul>
            <li><strong>📅 Custom Date Range:</strong> Calendar-based date selection</li>
            <li><strong>⚡ Quick Filters:</strong> Week/Month/Quarter/Year aggregation</li>
            <li><strong>📈 Smart Aggregation:</strong> Auto-average data by time period</li>
            <li><strong>📍 All Time Markers:</strong> Display every period on X-axis</li>
            <li><strong>🔍 2D Zoom:</strong> Zoom both X (time) and Y (values)</li>
            <li><strong>🖱️ Mouse Wheel Zoom:</strong> Scroll anywhere to zoom</li>
            <li><strong>📦 Box Selection:</strong> Drag rectangle to zoom area</li>
            <li><strong>📏 Dual Sliders:</strong> Independent X and Y axis control</li>
            <li><strong>🎯 Zoom Modes:</strong> 2D / X-only / Disabled</li>
            <li><strong>👁️ Toggle Sliders:</strong> Show/hide zoom controls</li>
            <li><strong>📊 Multi-Warehouse:</strong> Track 3 warehouse locations</li>
            <li><strong>🚨 Safety Stock:</strong> Visual alerts for stock levels</li>
            <li><strong>🔄 Reorder Point:</strong> Procurement trigger indicators</li>
            <li><strong>💾 Save as Image:</strong> Export chart to PNG</li>
            <li><strong>🔄 Reset View:</strong> Quick return to original view</li>
            <li><strong>✨ Smooth Animation:</strong> Animated transitions</li>
            <li><strong>🎨 Gradient Fills:</strong> Beautiful area visualizations</li>
          </ul>
        </div>
      </div>

      {/* Pro Tips */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '1rem' }}>💡 Pro Tips:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h5 style={{ color: '#1976d2' }}>🎯 Workflow Example</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              1️⃣ Select date range (e.g., Jan 1 - Dec 31, 2025)<br/>
              2️⃣ Click "Month" to see 12 months<br/>
              3️⃣ Use 2D zoom to focus on specific value ranges<br/>
              Perfect for analyzing trends within your date range!
            </p>
          </div>
          <div>
            <h5 style={{ color: '#1976d2' }}>📊 Aggregation Tips</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Choose date range first, then aggregation type. Example: Select 1 year → aggregate by Month 
              (12 data points) or Quarter (4 data points). Same range, different views!
            </p>
          </div>
          <div>
            <h5 style={{ color: '#1976d2' }}>⚡ Quick Analysis</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Long range + Quarter view = Big picture. Short range + Daily view = Details. 
              Adjust both date range and aggregation to get exactly the view you need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SCOChartDemo;
