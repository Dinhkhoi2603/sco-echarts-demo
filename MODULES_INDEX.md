# 📚 Reusable Modules - Complete Index

## 🎯 Quick Navigation

This index provides quick access to all reusable modules, their APIs, and usage examples.

---

## 🔧 Custom Hooks

### 1. **useDateRange** 📅
**File:** `src/hooks/useDateRange.js`

**What it does:** Manages date range selection, validation, and formatting

**Quick usage:**
```javascript
import { useDateRange } from '../hooks';

const dateRange = useDateRange(90); // 90 days back

// Access
dateRange.startDate        // '2025-01-01'
dateRange.endDate          // '2025-12-31'
dateRange.daysDiff         // 365
dateRange.getFormattedRange() // 'Jan 1, 2025 → Dec 31, 2025'

// Actions
dateRange.setStartDate('2025-01-01')
dateRange.setPredefinedRange('month')
```

**When to use:**
- Any chart with date selection
- Time range filtering
- Date validation needed

---

### 2. **useAggregation** 📊
**File:** `src/hooks/useAggregation.js`

**What it does:** Aggregates data by week/month/quarter/year

**Quick usage:**
```javascript
import { useAggregation } from '../hooks';

const agg = useAggregation('month');

// Aggregate data
const aggregated = agg.aggregateData(rawData);

// Get formatters
const xAxisFormatter = agg.getXAxisFormatter();
const tooltipFormatter = agg.getTooltipFormatter();

// Get labels
agg.getPeriodLabel()        // 'Month'
agg.getPluralPeriodLabel()  // 'months'
```

**When to use:**
- Time-series data aggregation
- Week/Month/Quarter/Year views
- X-axis label formatting

---

### 3. **useChartZoom** 🔍
**File:** `src/hooks/useChartZoom.js`

**What it does:** Manages zoom and pan controls for charts

**Quick usage:**
```javascript
import { useChartZoom } from '../hooks';

const zoom = useChartZoom();

// In chart config
const option = {
  dataZoom: zoom.getDataZoomConfig(),
  toolbox: zoom.getToolboxConfig()
};

// Controls
zoom.setZoomMode('xy')      // 2D zoom
zoom.resetZoom()            // Reset to full view
zoom.zoomToLast(25)         // Zoom to last 25%
```

**When to use:**
- Charts with zoom functionality
- 2D zoom (X + Y axes)
- Pan controls needed

---

### 4. **useTimeMarkers** 📍
**File:** `src/hooks/useTimeMarkers.js`

**What it does:** Controls time marker display on X-axis

**Quick usage:**
```javascript
import { useTimeMarkers } from '../hooks';

const markers = useTimeMarkers(true);

// In chart config
const option = {
  xAxis: markers.getXAxisConfig(data, filterType, formatter)
};

// Controls
markers.toggleTimeMarkers()
markers.showAllTimeMarkers  // true/false
```

**When to use:**
- Charts with time-based X-axis
- Need to show all time periods
- Aggregated data visualization

---

## 🎨 Reusable Components

### 1. **DateRangePicker** 📅
**File:** `src/components/common/DateRangePicker.jsx`

**What it renders:** Two date inputs with validation and styling

**Props:**
```javascript
{
  startDate: string,              // Required: '2025-01-01'
  endDate: string,                // Required: '2025-12-31'
  onStartDateChange: function,    // Required: (e) => void
  onEndDateChange: function,      // Required: (e) => void
  maxDate: string,                // Required: '2026-01-01'
  label: string                   // Optional: '📅 Date Range:'
}
```

**Usage:**
```javascript
<DateRangePicker
  startDate={dateRange.startDate}
  endDate={dateRange.endDate}
  onStartDateChange={(e) => dateRange.setStartDate(e.target.value)}
  onEndDateChange={(e) => dateRange.setEndDate(e.target.value)}
  maxDate={dateRange.maxDate}
/>
```

---

### 2. **AggregationButtons** 📊
**File:** `src/components/common/AggregationButtons.jsx`

**What it renders:** Filter buttons with active states and animations

**Props:**
```javascript
{
  filterType: string,             // Required: 'month'
  onFilterChange: function,       // Required: (type) => void
  options: array,                 // Optional: ['custom', 'week', ...]
  label: string                   // Optional: '📊 Aggregate By:'
}
```

**Usage:**
```javascript
<AggregationButtons
  filterType={aggregation.filterType}
  onFilterChange={(type) => {
    aggregation.setFilterType(type);
    zoom.resetZoom();
  }}
  options={['custom', 'month', 'quarter']} // Customize as needed
/>
```

---

### 3. **ZoomControls** 🎯
**File:** `src/components/common/ZoomControls.jsx`

**What it renders:** Zoom mode dropdown, sliders toggle, reset button

**Props:**
```javascript
{
  zoomMode: string,               // Required: 'xy' | 'x' | 'none'
  onZoomModeChange: function,     // Required: (mode) => void
  showDataZoom: boolean,          // Required: true/false
  onToggleDataZoom: function,     // Required: () => void
  onResetZoom: function,          // Required: () => void
  showResetButton: boolean        // Optional: true (default)
}
```

**Usage:**
```javascript
<ZoomControls
  zoomMode={zoom.zoomMode}
  onZoomModeChange={zoom.setZoomMode}
  showDataZoom={zoom.showDataZoom}
  onToggleDataZoom={() => zoom.setShowDataZoom(!zoom.showDataZoom)}
  onResetZoom={zoom.resetZoom}
/>
```

---

## 🛠️ Utility Functions

### chartConfig.js

| Function | Purpose | Example |
|----------|---------|---------|
| `buildYAxisConfig` | Y-axis config | `buildYAxisConfig('Units', true)` |
| `buildTooltipConfig` | Tooltip config | `buildTooltipConfig(formatter)` |
| `buildLegendConfig` | Legend config | `buildLegendConfig(['A', 'B'], 35)` |
| `buildGridConfig` | Grid layout | `buildGridConfig(true)` |
| `buildLineSeries` | Line series | `buildLineSeries('Name', data, '#667eea')` |
| `buildReferenceLine` | Reference line | `buildReferenceLine('Safety', data, 'red')` |
| `buildTitleConfig` | Chart title | `buildTitleConfig('Title', 'Subtitle')` |
| `buildChartOption` | Complete config | `buildChartOption({ title, series })` |

---

### dataUtils.js

| Function | Purpose | Example |
|----------|---------|---------|
| `filterDataByDateRange` | Filter by dates | `filterDataByDateRange(data, '2025-01-01', '2025-12-31')` |
| `getDaysDifference` | Calculate days | `getDaysDifference('2025-01-01', '2025-12-31')` |
| `formatDate` | Format date | `formatDate('2025-01-01', 'long')` |
| `getPeriodCount` | Count periods | `getPeriodCount(start, end, 'month')` |
| `isValidDateRange` | Validate range | `isValidDateRange(start, end)` |
| `generateDateRange` | Generate dates | `generateDateRange(start, end)` |

---

## 📖 Documentation Files

| Document | Purpose | When to Read |
|----------|---------|--------------|
| `REFACTORING_SUMMARY.md` | Quick reference | Start here! |
| `REUSABLE_ARCHITECTURE.md` | Complete guide | Deep dive |
| `BEFORE_AFTER_COMPARISON.md` | Visual comparison | See the benefits |
| `MODULES_INDEX.md` | This file | Quick API reference |
| `RefactoredChartExample.jsx` | Working example | Learn by example |

---

## 🎮 Usage Patterns

### Pattern 1: Full-Featured Chart
```javascript
// Use all hooks
import { useDateRange, useAggregation, useChartZoom, useTimeMarkers } from '../hooks';
import { DateRangePicker, AggregationButtons, ZoomControls } from './common';
```

### Pattern 2: Simple Chart
```javascript
// Use only what you need
import { useDateRange } from '../hooks';
import { DateRangePicker } from './common';
```

### Pattern 3: Custom Logic
```javascript
// Use hooks + custom code
import { useDateRange, useAggregation } from '../hooks';

function MyChart() {
  const dateRange = useDateRange();
  const agg = useAggregation();
  
  // Your custom logic here
  const customProcessedData = myCustomFunction(agg.aggregateData(data));
}
```

---

## 🔄 Import Shortcuts

### Import from Index Files:
```javascript
// Hooks
import { useDateRange, useAggregation, useChartZoom, useTimeMarkers } from '../hooks';

// Components
import { DateRangePicker, AggregationButtons, ZoomControls } from './common';

// Utils
import { buildChartOption, filterDataByDateRange, getDaysDifference } from '../utils';
```

### Import Individually:
```javascript
import { useDateRange } from '../hooks/useDateRange';
import DateRangePicker from './common/DateRangePicker';
import { filterDataByDateRange } from '../utils/dataUtils';
```

---

## 🎯 Quick API Reference Card

### useDateRange API:
```
📥 Input:  initialDaysBack (number)
📤 Output: { startDate, endDate, daysDiff, setStartDate, setEndDate, getFormattedRange, setPredefinedRange, maxDate }
```

### useAggregation API:
```
📥 Input:  initialType ('custom'|'week'|'month'|'quarter'|'year')
📤 Output: { filterType, setFilterType, aggregateData, getXAxisFormatter, getTooltipFormatter, getPeriodLabel, getPluralPeriodLabel }
```

### useChartZoom API:
```
📥 Input:  none
📤 Output: { zoomMode, showDataZoom, dataZoomStart, dataZoomEnd, setZoomMode, setShowDataZoom, resetZoom, getDataZoomConfig, getToolboxConfig }
```

### useTimeMarkers API:
```
📥 Input:  initialState (boolean)
📤 Output: { showAllTimeMarkers, setShowAllTimeMarkers, toggleTimeMarkers, getXAxisConfig }
```

---

## 🚀 Quick Start Checklist

- [ ] Read `REFACTORING_SUMMARY.md`
- [ ] Review `RefactoredChartExample.jsx`
- [ ] Try importing one hook
- [ ] Build a simple chart
- [ ] Celebrate your clean code! 🎉

---

**Your complete guide to reusable chart modules!** 📚

*Everything you need in one place!* ✨
