# 🎓 ECharts Implementation Guide - From Zero to Advanced

## 📋 Mục Lục

1. [Setup Project](#setup-project)
2. [Create Basic Chart](#create-basic-chart)
3. [Add Date Range Selection](#add-date-range-selection)
4. [Implement Data Aggregation](#implement-data-aggregation)
5. [Add 2D Zoom Feature](#add-2d-zoom-feature)
6. [Add Time Markers](#add-time-markers)
7. [Advanced Styling](#advanced-styling)
8. [Performance Optimization](#performance-optimization)
9. [Complete Example](#complete-example)

---

## 🚀 Setup Project

### Step 1: Install Dependencies

```bash
npm install react react-dom
npm install echarts echarts-for-react
```

### Step 2: Project Structure

```
src/
├── components/
│   └── MyChart.jsx          # Chart component của bạn
├── utils/
│   └── dummyData.js         # Data generator
└── App.jsx
```

---

## 📊 Create Basic Chart

### **Goal:** Vẽ một line chart đơn giản

### Step 1: Import Libraries

```javascript
import React from 'react';
import ReactECharts from 'echarts-for-react';
```

### Step 2: Create Component

```javascript
function BasicChart() {
  // Sample data
  const data = [
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 120 },
    { date: '2024-01-03', value: 115 },
    { date: '2024-01-04', value: 130 },
    { date: '2024-01-05', value: 125 },
  ];

  // ECharts option
  const option = {
    title: {
      text: 'My First Chart',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: 'Value',
      type: 'line',
      data: data.map(item => item.value)
    }]
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}

export default BasicChart;
```

### ✅ Output:
- Line chart với 5 data points
- X-axis: Dates
- Y-axis: Values

**💡 Key Concepts:**
- `option` object là cấu hình toàn bộ chart
- `xAxis.data` chứa labels cho X-axis
- `series.data` chứa values để vẽ

---

## 📅 Add Date Range Selection

### **Goal:** User có thể chọn start date và end date

### Step 1: Add State for Dates

```javascript
import { useState } from 'react';

function ChartWithDateRange() {
  // Setup default dates (90 days ago to today)
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 90);
  
  const [startDate, setStartDate] = useState(
    defaultStartDate.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    today.toISOString().split('T')[0]
  );

  // ...rest of code
}
```

### Step 2: Generate Data Based on Date Range

```javascript
// Calculate number of days between dates
const daysDiff = Math.ceil(
  (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
);

// Generate data for the range (with buffer)
const allData = generateData(daysDiff + 30); // +30 buffer

// Filter data within selected range
const filteredData = allData.filter(item => {
  const itemDate = new Date(item.date);
  return itemDate >= new Date(startDate) && 
         itemDate <= new Date(endDate);
});
```

### Step 3: Create Date Picker UI

```javascript
return (
  <div>
    <div style={{ marginBottom: '20px' }}>
      <label>Start Date:</label>
      <input 
        type="date" 
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        max={endDate}
      />
      
      <label style={{ marginLeft: '20px' }}>End Date:</label>
      <input 
        type="date" 
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={startDate}
        max={today.toISOString().split('T')[0]}
      />
    </div>
    
    <ReactECharts option={option} />
  </div>
);
```

### ✅ Output:
- 2 date inputs
- Chart tự động update khi dates thay đổi
- Validation: start <= end <= today

**💡 Key Concepts:**
- Buffer data để tránh thiếu ở biên
- Filter data theo date range
- Re-render khi state thay đổi

---

## 📊 Implement Data Aggregation

### **Goal:** Aggregate data by Week/Month/Quarter/Year

### Step 1: Add Aggregation State

```javascript
const [filterType, setFilterType] = useState('custom'); // custom, week, month, quarter, year
```

### Step 2: Create Helper Functions

```javascript
// Get week number (ISO 8601 standard)
const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
};

// Get quarter (Q1, Q2, Q3, Q4)
const getQuarter = (date) => {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3) + 1;
  return `${d.getFullYear()}-Q${quarter}`;
};
```

### Step 3: Create Aggregation Function

```javascript
const aggregateData = (data, type) => {
  // If custom (daily), return as-is
  if (type === 'custom') return data;
  
  const grouped = {};
  
  // STEP 1: Group data by period
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
    }
    
    if (!grouped[key]) {
      grouped[key] = {
        date: key,
        values: []
      };
    }
    
    grouped[key].values.push(item.value);
  });
  
  // STEP 2: Calculate average for each group
  return Object.keys(grouped).sort().map(key => {
    const group = grouped[key];
    const average = group.values.reduce((a, b) => a + b, 0) / group.values.length;
    return {
      date: group.date,
      value: Math.round(average)
    };
  });
};

// Apply aggregation
const aggregatedData = aggregateData(filteredData, filterType);
```

### Step 4: Dynamic X-Axis Formatter

```javascript
const getXAxisFormatter = () => {
  switch(filterType) {
    case 'week':
      return (value) => {
        const [year, week] = value.split('-W');
        return `W${week}\n${year}`;
      };
    case 'month':
      return (value) => {
        const [year, month] = value.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
      };
    case 'quarter':
      return (value) => value.replace('-', ' ');
    case 'year':
      return (value) => value;
    default:
      return (value) => {
        return new Date(value).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      };
  }
};
```

### Step 5: Add Filter Buttons

```javascript
<div style={{ marginBottom: '20px' }}>
  <button onClick={() => setFilterType('custom')}>
    Daily
  </button>
  <button onClick={() => setFilterType('week')}>
    Week
  </button>
  <button onClick={() => setFilterType('month')}>
    Month
  </button>
  <button onClick={() => setFilterType('quarter')}>
    Quarter
  </button>
  <button onClick={() => setFilterType('year')}>
    Year
  </button>
</div>
```

### Step 6: Update Chart Option

```javascript
const option = {
  // ... other configs
  xAxis: {
    type: 'category',
    data: aggregatedData.map(item => item.date),
    axisLabel: {
      formatter: getXAxisFormatter(),
      rotate: filterType === 'custom' ? 45 : 0
    }
  },
  series: [{
    data: aggregatedData.map(item => item.value)
  }]
};
```

### ✅ Output:
- 5 buttons: Daily, Week, Month, Quarter, Year
- Click button → Data tự động aggregate
- X-axis labels thay đổi theo period
- 365 daily points → 12 monthly points (when Month selected)

**💡 Key Concepts:**
- Group data theo time period
- Calculate average (không phải sum!)
- Dynamic formatter cho X-axis labels
- Sort để đảm bảo thứ tự đúng

---

## 🔍 Add 2D Zoom Feature

### **Goal:** User có thể zoom cả X và Y axes

### Step 1: Add Zoom States

```javascript
const [zoomMode, setZoomMode] = useState('xy'); // xy, x, none
const [showDataZoom, setShowDataZoom] = useState(true);
const [dataZoomStart, setDataZoomStart] = useState(0);
const [dataZoomEnd, setDataZoomEnd] = useState(100);
```

### Step 2: Configure DataZoom

```javascript
const option = {
  // ... other configs
  
  // Add toolbox for box zoom
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'all', // Enable Y-axis zoom
        title: { 
          zoom: '📦 Box Zoom', 
          back: '↩️ Reset' 
        }
      },
      restore: { title: '🔄 Restore' },
      saveAsImage: { title: '💾 Save', pixelRatio: 2 }
    }
  },
  
  // Add dataZoom components
  dataZoom: showDataZoom ? [
    // 1. Inside zoom (mouse wheel + drag)
    {
      type: 'inside',
      xAxisIndex: 0,
      yAxisIndex: 0, // ⭐ Enable Y-axis zoom
      start: dataZoomStart,
      end: dataZoomEnd,
      zoomOnMouseWheel: zoomMode !== 'x', // Disable if X-only mode
      moveOnMouseMove: true,
      zoomLock: zoomMode === 'none' // Lock if disabled
    },
    // 2. X-axis slider (horizontal)
    {
      type: 'slider',
      xAxisIndex: 0,
      start: dataZoomStart,
      end: dataZoomEnd,
      height: 25,
      bottom: 60,
      handleStyle: { color: '#667eea' }
    },
    // 3. Y-axis slider (vertical) ⭐ Key feature!
    {
      type: 'slider',
      yAxisIndex: 0,
      start: 0,
      end: 100,
      width: 25,
      right: 10,
      handleStyle: { color: '#48bb78' }
    }
  ] : [],
  
  // Important: Enable scale for Y-axis
  yAxis: {
    type: 'value',
    scale: true // ⭐ Must have for Y-axis zoom!
  }
};
```

### Step 3: Add Zoom Controls

```javascript
<div style={{ marginBottom: '20px' }}>
  <label>Zoom Mode:</label>
  <select 
    value={zoomMode} 
    onChange={(e) => setZoomMode(e.target.value)}
  >
    <option value="xy">2D Zoom (X + Y)</option>
    <option value="x">X-Axis Only</option>
    <option value="none">Disabled</option>
  </select>
  
  <button onClick={() => setShowDataZoom(!showDataZoom)}>
    {showDataZoom ? 'Hide' : 'Show'} Sliders
  </button>
  
  <button onClick={() => {
    setDataZoomStart(0);
    setDataZoomEnd(100);
  }}>
    Reset Zoom
  </button>
</div>
```

### ✅ Output:
- Mouse wheel zoom cả X và Y
- 2 sliders: horizontal (X) và vertical (Y)
- Box zoom tool trong toolbox
- Toggle zoom mode: 2D / X-only / Disabled
- Reset button

**💡 Key Concepts:**
- 3 dataZoom components: inside + 2 sliders
- `yAxisIndex: 0` để enable Y-axis zoom
- `scale: true` trên yAxis là BẮT BUỘC
- `zoomMode` để control behavior

**🎯 User Interactions:**
- **Mouse wheel**: Zoom in/out
- **Drag on chart**: Pan
- **Drag sliders**: Select range
- **Click toolbox icon**: Box zoom
- **Double click**: Reset zoom

---

## 📍 Add Time Markers

### **Goal:** Hiển thị tất cả time period markers trên X-axis

### Step 1: Add State

```javascript
const [showAllTimeMarkers, setShowAllTimeMarkers] = useState(true);
```

### Step 2: Configure X-Axis

```javascript
xAxis: {
  type: 'category',
  data: aggregatedData.map(item => item.date),
  axisLabel: {
    formatter: getXAxisFormatter(),
    rotate: filterType === 'custom' ? 45 : 0,
    
    // ⭐ Show all markers if enabled and aggregated
    interval: showAllTimeMarkers && filterType !== 'custom' ? 0 : 'auto',
    // interval = 0 → show ALL labels
    // interval = 'auto' → ECharts auto-skip for space
    
    fontSize: showAllTimeMarkers && filterType !== 'custom' ? 11 : 10,
    margin: showAllTimeMarkers && filterType !== 'custom' ? 12 : 8,
  },
  axisTick: {
    show: true,
    alignWithLabel: true,
    interval: showAllTimeMarkers && filterType !== 'custom' ? 0 : 'auto'
  },
  splitLine: {
    show: showAllTimeMarkers && filterType !== 'custom',
    lineStyle: {
      color: '#e8e8e8',
      type: 'dotted',
      width: 1
    }
  }
}
```

### Step 3: Add Toggle Button

```javascript
<button onClick={() => setShowAllTimeMarkers(!showAllTimeMarkers)}>
  {showAllTimeMarkers ? '📍 All Markers' : '📍 Auto Markers'}
</button>
```

### ✅ Output:
- Toggle button
- When ON: Hiện ALL period labels (12 months → 12 labels)
- When OFF: ECharts tự skip để fit
- Vertical dotted lines cho mỗi period
- Chỉ apply cho aggregated data (không cho daily)

**💡 Key Concepts:**
- `interval: 0` = force show all
- `interval: 'auto'` = let ECharts decide
- `splitLine` = vertical grid lines
- Conditional based on filterType

---

## 🎨 Advanced Styling

### **Goal:** Làm chart đẹp hơn với gradient, smooth lines, area fill

### Step 1: Smooth Line with Gradient Area

```javascript
series: [{
  name: 'Value',
  type: 'line',
  data: aggregatedData.map(item => item.value),
  
  smooth: true, // ⭐ Smooth curve
  lineStyle: { 
    width: 3,
    color: '#667eea'
  },
  
  // ⭐ Gradient area fill
  areaStyle: {
    color: {
      type: 'linear',
      x: 0, y: 0,    // Start (top)
      x2: 0, y2: 1,  // End (bottom)
      colorStops: [
        { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },  // 30% opacity at top
        { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }  // 5% opacity at bottom
      ]
    }
  },
  
  symbol: 'circle',
  symbolSize: 6
}]
```

### Step 2: Enhanced Tooltip

```javascript
tooltip: {
  trigger: 'axis',
  axisPointer: { 
    type: 'cross',
    crossStyle: {
      color: '#999'
    }
  },
  formatter: function(params) {
    let dateLabel = params[0].axisValue;
    
    // Format date based on filter type
    if (filterType === 'month') {
      const [y, m] = dateLabel.split('-');
      const date = new Date(y, parseInt(m) - 1);
      dateLabel = date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
    // ... other cases
    
    let result = `<strong>${dateLabel}</strong><br/>`;
    params.forEach(item => {
      result += `${item.marker} ${item.seriesName}: `;
      result += `<strong>${item.value.toLocaleString()}</strong><br/>`;
    });
    return result;
  }
}
```

### Step 3: Grid & Layout

```javascript
grid: {
  left: '5%',
  right: showDataZoom ? '7%' : '5%',   // Space for Y slider
  bottom: showDataZoom ? '20%' : '10%', // Space for X slider
  top: '20%',
  containLabel: true
}
```

### ✅ Output:
- Smooth curved lines
- Gradient area fill (top → bottom)
- Enhanced tooltip with formatting
- Proper spacing for sliders

**💡 Styling Tips:**
- `smooth: true` cho curves mượt
- Gradient với `offset` và `colorStops`
- `containLabel: true` để labels không bị cắt
- Adjust grid margins cho sliders

---

## ⚡ Performance Optimization

### **Goal:** Chart chạy nhanh với large dataset

### Tip 1: Lazy Update

```javascript
<ReactECharts 
  option={option}
  lazyUpdate={true}  // ⭐ Only update when necessary
  notMerge={true}    // ⭐ Replace option instead of merge
/>
```

### Tip 2: Throttle Data

```javascript
// Don't generate too much data
const MAX_DATA_POINTS = 1000;
const step = Math.max(1, Math.floor(rawData.length / MAX_DATA_POINTS));
const throttledData = rawData.filter((_, index) => index % step === 0);
```

### Tip 3: Memoize Expensive Calculations

```javascript
import { useMemo } from 'react';

const aggregatedData = useMemo(() => {
  return aggregateData(filteredData, filterType);
}, [filteredData, filterType]);
```

### Tip 4: Cleanup on Unmount

```javascript
// echarts-for-react already handles this!
// But if you use manual wrapper:
useEffect(() => {
  return () => {
    chartInstance.current?.dispose();
  };
}, []);
```

**💡 Performance Tips:**
- `lazyUpdate` giảm re-renders
- Throttle data nếu > 10k points
- Memoize calculations với `useMemo`
- Canvas rendering nhanh hơn SVG

---

## 🎯 Complete Example

### **Full Implementation với tất cả features:**

```javascript
import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

function AdvancedChart() {
  // ============ STATES ============
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 90);
  
  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('custom');
  const [zoomMode, setZoomMode] = useState('xy');
  const [showDataZoom, setShowDataZoom] = useState(true);
  const [showAllTimeMarkers, setShowAllTimeMarkers] = useState(true);
  const [dataZoomStart, setDataZoomStart] = useState(0);
  const [dataZoomEnd, setDataZoomEnd] = useState(100);

  // ============ DATA PROCESSING ============
  const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const allData = generateData(daysDiff + 30); // Your data generator
  
  const filteredData = allData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });

  const aggregatedData = useMemo(() => {
    return aggregateData(filteredData, filterType);
  }, [filteredData, filterType]);

  // ============ CHART OPTION ============
  const option = {
    title: {
      text: 'Advanced Chart with All Features',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    toolbox: {
      feature: {
        dataZoom: { yAxisIndex: 'all' },
        restore: {},
        saveAsImage: { pixelRatio: 2 }
      }
    },
    grid: {
      left: '5%',
      right: showDataZoom ? '7%' : '5%',
      bottom: showDataZoom ? '20%' : '10%',
      top: '20%',
      containLabel: true
    },
    dataZoom: showDataZoom ? [
      {
        type: 'inside',
        xAxisIndex: 0,
        yAxisIndex: 0,
        start: dataZoomStart,
        end: dataZoomEnd,
        zoomOnMouseWheel: zoomMode !== 'x',
        zoomLock: zoomMode === 'none'
      },
      {
        type: 'slider',
        xAxisIndex: 0,
        start: dataZoomStart,
        end: dataZoomEnd,
        height: 25,
        bottom: 60
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        width: 25,
        right: 10
      }
    ] : [],
    xAxis: {
      type: 'category',
      data: aggregatedData.map(item => item.date),
      axisLabel: {
        formatter: getXAxisFormatter(),
        rotate: filterType === 'custom' ? 45 : 0,
        interval: showAllTimeMarkers && filterType !== 'custom' ? 0 : 'auto'
      },
      splitLine: {
        show: showAllTimeMarkers && filterType !== 'custom'
      }
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [{
      name: 'Value',
      type: 'line',
      data: aggregatedData.map(item => item.value),
      smooth: true,
      lineStyle: { width: 3 },
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
    }]
  };

  // ============ RENDER ============
  return (
    <div>
      {/* Date Range Controls */}
      <div style={{ marginBottom: '20px' }}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      {/* Aggregation Controls */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilterType('custom')}>Daily</button>
        <button onClick={() => setFilterType('week')}>Week</button>
        <button onClick={() => setFilterType('month')}>Month</button>
        <button onClick={() => setFilterType('quarter')}>Quarter</button>
        <button onClick={() => setFilterType('year')}>Year</button>
      </div>

      {/* Zoom Controls */}
      <div style={{ marginBottom: '20px' }}>
        <select value={zoomMode} onChange={(e) => setZoomMode(e.target.value)}>
          <option value="xy">2D Zoom</option>
          <option value="x">X Only</option>
          <option value="none">Disabled</option>
        </select>
        <button onClick={() => setShowDataZoom(!showDataZoom)}>
          Toggle Sliders
        </button>
        <button onClick={() => setShowAllTimeMarkers(!showAllTimeMarkers)}>
          Toggle Markers
        </button>
        <button onClick={() => { setDataZoomStart(0); setDataZoomEnd(100); }}>
          Reset Zoom
        </button>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: '600px' }}>
        <ReactECharts 
          option={option}
          style={{ height: '100%', width: '100%' }}
          lazyUpdate={true}
          notMerge={true}
        />
      </div>
    </div>
  );
}

export default AdvancedChart;
```

---

## 🎓 Summary - Implementation Checklist

### ✅ **Features Implemented:**

1. **Date Range Selection**
   - Start/End date inputs
   - Filter data by range
   - Buffer data generation

2. **Data Aggregation**
   - Week/Month/Quarter/Year options
   - Group by period
   - Calculate averages
   - Dynamic X-axis formatting

3. **2D Zoom**
   - Mouse wheel zoom (X + Y)
   - 2 sliders (horizontal + vertical)
   - Box zoom tool
   - Zoom mode toggle
   - Reset functionality

4. **Time Markers**
   - Show all period markers
   - Auto/Manual toggle
   - Split lines for periods
   - Conditional display

5. **Advanced Styling**
   - Smooth curves
   - Gradient area fill
   - Enhanced tooltips
   - Proper spacing

6. **Performance**
   - Lazy updates
   - Memoization
   - Proper cleanup

---

## 🎯 Demo Script

### **Để demo project:**

#### **1. Basic Chart (5 minutes)**
```
"Đây là một line chart cơ bản. Chúng ta có X-axis là dates, 
Y-axis là values. ECharts render rất nhanh và smooth."

[Show basic chart]
```

#### **2. Date Range (3 minutes)**
```
"User có thể chọn date range tùy ý. 
Chart tự động filter và update real-time."

[Change dates, show chart update]
```

#### **3. Aggregation (5 minutes)**
```
"Click Month button → 365 daily points → 12 monthly points.
X-axis labels tự động format phù hợp. 
Giúp visualize long-term trends."

[Demo each filter type]
```

#### **4. 2D Zoom (7 minutes)**
```
"Đây là feature độc đáo:
- Mouse wheel zoom IN/OUT cả 2 axes
- Drag chart để pan
- 2 sliders: horizontal cho X, vertical cho Y
- Box zoom tool: drag to select area
- Toggle zoom mode: 2D / X-only / Disabled"

[Demo each zoom method]
```

#### **5. Time Markers (3 minutes)**
```
"Toggle ON → Hiện tất cả 12 month markers.
Toggle OFF → ECharts tự skip để fit space.
Có vertical dotted lines để dễ nhìn."

[Toggle and show difference]
```

#### **6. Combined Power (5 minutes)**
```
"Kết hợp tất cả:
1. Select 1 year range
2. Aggregate by Quarter → 4 data points
3. Enable all markers → See Q1, Q2, Q3, Q4
4. Zoom into Q2 to see details
5. Reset and try different combinations"

[Demo workflow]
```

---

## 📚 Additional Resources

### **Official Docs:**
- ECharts: https://echarts.apache.org/en/index.html
- echarts-for-react: https://github.com/hustcc/echarts-for-react

### **Examples Gallery:**
- https://echarts.apache.org/examples/en/index.html

### **This Project:**
- Full example: `src/components/SCOChartDemo.jsx`
- Reusable hooks: `src/hooks/`
- Components: `src/components/common/`

---

## 🎉 Congratulations!

Bạn đã học cách implement một advanced chart với:
- ✅ Date range selection
- ✅ Data aggregation (Week/Month/Quarter/Year)
- ✅ 2D Zoom (X + Y axes)
- ✅ Time markers
- ✅ Beautiful styling
- ✅ Performance optimization

**Next Steps:**
- Customize cho use case của bạn
- Add more chart types (bar, pie, etc.)
- Integrate with real API
- Add export functionality
- Create dashboard with multiple charts

**Happy Charting!** 📊✨
