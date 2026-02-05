# 🏗️ Reusable Architecture Guide

## 📋 Overview

This guide documents the refactored architecture that breaks down the monolithic SCO Chart component into **reusable, independent modules** that can be used across multiple screens and projects.

---

## 🎯 Problem Statement

### Before Refactoring:
```
❌ 900+ lines in single component
❌ All logic mixed together
❌ Hard to maintain
❌ Difficult to reuse
❌ Tightly coupled code
❌ Testing is challenging
```

### After Refactoring:
```
✅ Separated concerns
✅ Reusable hooks
✅ Reusable components
✅ Easy to test
✅ Easy to maintain
✅ Flexible and extensible
```

---

## 📁 New Project Structure

```
src/
├── hooks/                          # Custom Hooks (Business Logic)
│   ├── useDateRange.js            # Date range management
│   ├── useAggregation.js          # Data aggregation logic
│   ├── useChartZoom.js            # Zoom & pan controls
│   └── useTimeMarkers.js          # Time marker display
│
├── components/
│   ├── common/                     # Reusable UI Components
│   │   ├── DateRangePicker.jsx    # Date range selector
│   │   ├── AggregationButtons.jsx # Filter buttons
│   │   └── ZoomControls.jsx       # Zoom controls
│   │
│   ├── SCOChartDemo.jsx           # Original (900+ lines)
│   └── RefactoredChartExample.jsx # Refactored (~200 lines)
│
└── utils/                          # Utility Functions
    ├── chartConfig.js             # Chart configuration builders
    ├── dataUtils.js               # Data manipulation helpers
    └── dummyData.js               # Data generators
```

---

## 🔧 Custom Hooks

### 1. `useDateRange` - Date Range Management

**Purpose**: Handle date range selection and validation

**Usage**:
```javascript
import { useDateRange } from '../hooks/useDateRange';

function MyComponent() {
  const dateRange = useDateRange(90); // Initialize with 90 days back
  
  return (
    <>
      <input 
        type="date" 
        value={dateRange.startDate}
        onChange={(e) => dateRange.setStartDate(e.target.value)}
      />
      <input 
        type="date" 
        value={dateRange.endDate}
        onChange={(e) => dateRange.setEndDate(e.target.value)}
      />
      <p>Days: {dateRange.daysDiff}</p>
      <p>Range: {dateRange.getFormattedRange()}</p>
    </>
  );
}
```

**API**:
```javascript
{
  // State
  startDate: string,
  endDate: string,
  daysDiff: number,
  maxDate: string,
  
  // Setters
  setStartDate: (date) => void,
  setEndDate: (date) => void,
  
  // Helpers
  isValidRange: () => boolean,
  getFormattedRange: () => string,
  setPredefinedRange: (type: 'week'|'month'|'quarter'|'year') => void
}
```

---

### 2. `useAggregation` - Data Aggregation Logic

**Purpose**: Aggregate data by week/month/quarter/year

**Usage**:
```javascript
import { useAggregation } from '../hooks/useAggregation';

function MyComponent() {
  const agg = useAggregation('custom'); // Initial type
  const data = [...]; // Your raw data
  
  const aggregated = agg.aggregateData(data);
  const xAxisFormatter = agg.getXAxisFormatter();
  
  return (
    <>
      <button onClick={() => agg.setFilterType('month')}>
        Monthly View
      </button>
      <p>Viewing: {agg.getPeriodLabel()}</p>
    </>
  );
}
```

**API**:
```javascript
{
  // State
  filterType: 'custom'|'week'|'month'|'quarter'|'year',
  
  // Setters
  setFilterType: (type) => void,
  
  // Data Processing
  aggregateData: (data, type?) => array,
  
  // Formatters
  getXAxisFormatter: (type?) => function,
  getTooltipFormatter: (type?) => function,
  getPeriodLabel: (type?) => string,
  getPluralPeriodLabel: (type?) => string,
  
  // Helpers
  getWeekNumber: (date) => string,
  getQuarter: (date) => string
}
```

---

### 3. `useChartZoom` - Zoom & Pan Controls

**Purpose**: Manage chart zoom and pan behavior

**Usage**:
```javascript
import { useChartZoom } from '../hooks/useChartZoom';

function MyComponent() {
  const zoom = useChartZoom();
  
  const chartOption = {
    dataZoom: zoom.getDataZoomConfig(),
    toolbox: zoom.getToolboxConfig()
  };
  
  return (
    <>
      <select value={zoom.zoomMode} onChange={(e) => zoom.setZoomMode(e.target.value)}>
        <option value="xy">2D Zoom</option>
        <option value="x">X Only</option>
      </select>
      <button onClick={zoom.resetZoom}>Reset</button>
    </>
  );
}
```

**API**:
```javascript
{
  // State
  zoomMode: 'xy'|'x'|'none',
  showDataZoom: boolean,
  dataZoomStart: number (0-100),
  dataZoomEnd: number (0-100),
  
  // Setters
  setZoomMode: (mode) => void,
  setShowDataZoom: (show) => void,
  setDataZoomStart: (start) => void,
  setDataZoomEnd: (end) => void,
  
  // Actions
  resetZoom: () => void,
  setZoomRange: (start, end) => void,
  zoomToLast: (percentage) => void,
  
  // Config Builders
  getDataZoomConfig: () => array,
  getToolboxConfig: () => object
}
```

---

### 4. `useTimeMarkers` - Time Marker Display

**Purpose**: Control time marker display on X-axis

**Usage**:
```javascript
import { useTimeMarkers } from '../hooks/useTimeMarkers';

function MyComponent() {
  const markers = useTimeMarkers(true);
  
  const xAxisConfig = markers.getXAxisConfig(
    data, 
    filterType, 
    xAxisFormatter
  );
  
  return (
    <button onClick={markers.toggleTimeMarkers}>
      {markers.showAllTimeMarkers ? 'All' : 'Auto'}
    </button>
  );
}
```

**API**:
```javascript
{
  // State
  showAllTimeMarkers: boolean,
  
  // Setters
  setShowAllTimeMarkers: (show) => void,
  toggleTimeMarkers: () => void,
  
  // Config Builder
  getXAxisConfig: (data, filterType, formatter) => object
}
```

---

## 🎨 Reusable Components

### 1. `DateRangePicker` - Date Selection Component

**Usage**:
```javascript
import DateRangePicker from './common/DateRangePicker';

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onStartDateChange={(e) => setStartDate(e.target.value)}
  onEndDateChange={(e) => setEndDate(e.target.value)}
  maxDate={maxDate}
  label="📅 Date Range:" // Optional
/>
```

**Props**:
```javascript
{
  startDate: string (required),
  endDate: string (required),
  onStartDateChange: function (required),
  onEndDateChange: function (required),
  maxDate: string (required),
  label: string (optional, default: '📅 Date Range:')
}
```

---

### 2. `AggregationButtons` - Filter Buttons Component

**Usage**:
```javascript
import AggregationButtons from './common/AggregationButtons';

<AggregationButtons
  filterType={filterType}
  onFilterChange={(type) => setFilterType(type)}
  options={['custom', 'week', 'month', 'quarter', 'year']} // Optional
  label="📊 Aggregate By:" // Optional
/>
```

**Props**:
```javascript
{
  filterType: string (required),
  onFilterChange: function (required),
  options: array (optional, default: ['custom', 'week', 'month', 'quarter', 'year']),
  label: string (optional, default: '📊 Aggregate By:')
}
```

---

### 3. `ZoomControls` - Zoom Control Component

**Usage**:
```javascript
import ZoomControls from './common/ZoomControls';

<ZoomControls
  zoomMode={zoomMode}
  onZoomModeChange={setZoomMode}
  showDataZoom={showDataZoom}
  onToggleDataZoom={() => setShowDataZoom(!showDataZoom)}
  onResetZoom={resetZoom}
  showResetButton={true} // Optional
/>
```

**Props**:
```javascript
{
  zoomMode: string (required),
  onZoomModeChange: function (required),
  showDataZoom: boolean (required),
  onToggleDataZoom: function (required),
  onResetZoom: function (required),
  showResetButton: boolean (optional, default: true)
}
```

---

## 🛠️ Utility Functions

### `chartConfig.js` - Chart Configuration Builders

**Functions**:
```javascript
// Build Y-axis config
buildYAxisConfig(name, scale)

// Build tooltip config
buildTooltipConfig(formatter)

// Build legend config
buildLegendConfig(data, top)

// Build grid config
buildGridConfig(showDataZoom)

// Build line series
buildLineSeries(name, data, color, options)

// Build reference line
buildReferenceLine(name, data, color, lineType)

// Build title
buildTitleConfig(text, subtext)

// Build complete chart option
buildChartOption({ title, xAxis, yAxis, series, ... })
```

**Example**:
```javascript
import { 
  buildChartOption, 
  buildLineSeries, 
  buildYAxisConfig 
} from '../utils/chartConfig';

const chartOption = buildChartOption({
  title: buildTitleConfig('My Chart'),
  yAxis: buildYAxisConfig('Value', true),
  series: [
    buildLineSeries('Series 1', data1, '#667eea', { showArea: true })
  ]
});
```

---

### `dataUtils.js` - Data Manipulation Helpers

**Functions**:
```javascript
// Filter data by date range
filterDataByDateRange(data, startDate, endDate)

// Calculate days difference
getDaysDifference(startDate, endDate)

// Format date
formatDate(date, format)

// Get period count
getPeriodCount(startDate, endDate, periodType)

// Validate date range
isValidDateRange(startDate, endDate)

// Generate date range array
generateDateRange(startDate, endDate)
```

**Example**:
```javascript
import { 
  filterDataByDateRange, 
  getDaysDifference 
} from '../utils/dataUtils';

const filtered = filterDataByDateRange(rawData, '2025-01-01', '2025-12-31');
const days = getDaysDifference('2025-01-01', '2025-12-31'); // 365
```

---

## 📊 Complete Example

### Refactored Component (200 lines):
```javascript
import React from 'react';
import ReactECharts from 'echarts-for-react';

// Hooks
import { useDateRange } from '../hooks/useDateRange';
import { useAggregation } from '../hooks/useAggregation';
import { useChartZoom } from '../hooks/useChartZoom';

// Components
import DateRangePicker from './common/DateRangePicker';
import AggregationButtons from './common/AggregationButtons';

// Utils
import { filterDataByDateRange } from '../utils/dataUtils';
import { buildChartOption, buildLineSeries } from '../utils/chartConfig';

function MyChart() {
  // All logic in hooks
  const dateRange = useDateRange(90);
  const aggregation = useAggregation('custom');
  const zoom = useChartZoom();
  
  // Data processing
  const filteredData = filterDataByDateRange(data, dateRange.startDate, dateRange.endDate);
  const aggregatedData = aggregation.aggregateData(filteredData);
  
  // Chart config
  const chartOption = buildChartOption({
    series: [
      buildLineSeries('Data', aggregatedData, '#667eea')
    ],
    dataZoom: zoom.getDataZoomConfig()
  });
  
  return (
    <div>
      <DateRangePicker {...dateRange} />
      <AggregationButtons 
        filterType={aggregation.filterType}
        onFilterChange={aggregation.setFilterType}
      />
      <ReactECharts option={chartOption} />
    </div>
  );
}
```

---

## ✅ Benefits

### Code Reusability:
- ✅ Use same hooks across multiple charts
- ✅ Same components for consistent UI
- ✅ Share utilities across project

### Maintainability:
- ✅ Each module has single responsibility
- ✅ Easy to find and fix bugs
- ✅ Changes don't affect other parts

### Testability:
- ✅ Test hooks independently
- ✅ Test components in isolation
- ✅ Mock dependencies easily

### Flexibility:
- ✅ Mix and match modules as needed
- ✅ Override defaults easily
- ✅ Extend functionality without breaking existing code

### Developer Experience:
- ✅ Clear, documented APIs
- ✅ Predictable behavior
- ✅ Easy to learn and use

---

## 📈 Comparison

| Aspect | Original | Refactored |
|--------|----------|------------|
| Lines of Code | 900+ | ~200 |
| Functions | 50+ inline | 4 hooks |
| Components | 1 monolithic | 3 reusable |
| Reusability | 0% | 100% |
| Testability | Hard | Easy |
| Maintainability | Low | High |
| Learning Curve | Steep | Gentle |

---

## 🚀 Getting Started

### Step 1: Use in Existing Component
```javascript
// Just import and use!
import { useDateRange } from '../hooks/useDateRange';

function MyComponent() {
  const dateRange = useDateRange();
  // ...
}
```

### Step 2: Create New Chart
```javascript
// Copy RefactoredChartExample.jsx
// Customize as needed
// All the hard work is done!
```

### Step 3: Extend Functionality
```javascript
// Add new hooks
// Add new components
// Everything is modular!
```

---

## 📚 Additional Resources

- [Custom Hooks Documentation](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

---

## 🎯 Next Steps

1. ✅ Review the refactored example
2. ✅ Try using hooks in your components
3. ✅ Create reusable components for your UI patterns
4. ✅ Build utility functions for common operations
5. ✅ Share modules across your team

---

**Built with ❤️ for scalability and maintainability**

*Transform 900 lines into 200 lines without losing functionality!* ✨
