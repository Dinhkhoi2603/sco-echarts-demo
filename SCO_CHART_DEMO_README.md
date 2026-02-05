# 🚀 SCO Chart Demo - Advanced Component

## 📋 Overview

`SCOChartDemo.jsx` is a comprehensive, all-in-one inventory tracking component that combines the best features from:
- ✅ **InventoryChart.jsx** - Date range selection and time aggregation
- ✅ **Advanced2DZoom.jsx** - 2D zoom capabilities (X + Y axes)

This component provides the most advanced and feature-rich charting solution in the SCO Analytics Dashboard.

---

## 🎯 Key Features Integrated

### From InventoryChart.jsx

#### 1. **Date Range Picker** 📅
- Calendar-based date selection
- Start date and end date inputs
- Validation: End date cannot be before start date
- Automatic update when dates change

#### 2. **Quick Time Filters** ⚡
- **Week**: Last 7 days
- **Month**: Last 30 days (1 month)
- **Quarter**: Last 90 days (3 months)
- **Year**: Last 365 days (1 year)
- One-click filter buttons with visual feedback

#### 3. **Smart Data Aggregation** 📊
Data is automatically aggregated based on the selected filter:
- **Week Filter**: Groups data by week → Shows "W01 2024, W02 2024..."
- **Month Filter**: Groups data by month → Shows "Jan 2024, Feb 2024..."
- **Quarter Filter**: Groups data by quarter → Shows "2024 Q1, 2024 Q2..."
- **Year Filter**: Groups data by year → Shows "2023, 2024..."
- **Custom**: Shows daily data without aggregation

Aggregation method: **Average** (mean) of all values in the period

#### 4. **Dynamic X-Axis Formatting** 🔤
- X-axis labels adapt automatically based on filter type
- Rotation: 45° for daily data, 0° for aggregated periods
- Optimized for readability

#### 5. **Enhanced Tooltips** 💬
- Context-aware date formatting
- Shows period name based on filter type
- Detailed value information for all series

#### 6. **Visual Indicators** 🎨
- Data range badge showing current period
- Aggregation status indicator
- Period count display (days/weeks/months/quarters/years)

### From Advanced2DZoom.jsx

#### 1. **2D Zoom Capability** 🔍
- Zoom on both X-axis (time) AND Y-axis (values)
- Three zoom modes:
  - **2D (X+Y)**: Zoom both axes simultaneously
  - **X-Only**: Traditional time-only zoom
  - **Disabled**: No zoom

#### 2. **Y-Axis Slider** 📏
- Vertical slider on the right edge
- Independent Y-axis range control
- Visual data background preview
- Drag handles for precise control

#### 3. **Box Zoom Tool** 📦
- Click toolbar icon to activate
- Drag a rectangle to select zoom area
- Zooms to exact selected region (X + Y)
- One-click reset button

#### 4. **Mouse Wheel Zoom** 🖱️
- Scroll to zoom in/out
- Zoom follows cursor position
- Works on both X and Y axes (when 2D mode enabled)
- Shift + Drag to pan after zooming

#### 5. **Advanced Zoom Controls** ⚙️
- Show/Hide sliders toggle
- Zoom mode selector dropdown
- Independent control of zoom behavior
- Reset zoom button

#### 6. **Scale Configuration** 📐
- Y-axis scale: true (enables proper Y-axis zoom)
- Dynamic Y-axis range adjustment
- Maintains data visibility during zoom

---

## 🎨 Additional Features

### Multi-Warehouse Tracking
- **Warehouse A, B, C**: Three warehouse locations tracked
- Color-coded series: Purple, Green, Orange
- Gradient area fills for visual emphasis
- Smooth line curves for trend visualization

### Safety & Reorder Indicators
- **Safety Stock Line**: Red dashed line (minimum safe inventory)
- **Reorder Point Line**: Orange dotted line (trigger for procurement)
- Always visible across all zoom levels

### Chart Toolbox
- **Box Zoom**: Select area to zoom (X+Y)
- **Reset View**: Return to original view
- **Restore**: Reset all settings
- **Save as Image**: Export chart as PNG (2x pixel ratio)

---

## 📊 Usage Guide

### Basic Workflow

1. **Select Time Period**
   - Use calendar pickers for custom dates, OR
   - Click Week/Month/Quarter/Year for quick filters

2. **View Aggregated Data**
   - Data automatically aggregates based on filter
   - X-axis updates to show appropriate time format
   - Badge shows aggregation status

3. **Explore with 2D Zoom**
   - Scroll mouse wheel to zoom
   - Use box zoom for precise area selection
   - Drag sliders for fine control
   - Switch zoom modes as needed

4. **Analyze Specific Value Ranges**
   - Use Y-axis slider to focus on specific inventory levels
   - Example: Zoom to 4000-5000 units range
   - Perfect for anomaly detection

### Advanced Techniques

#### Combine Features
```
1. Click "Month" → View monthly aggregates
2. Use box zoom on a specific month
3. Adjust Y-slider to focus on value range
4. Analyze micro-trends in the zoomed area
```

#### Quick Analysis Pattern
```
1. Start with "Year" filter → Get overview
2. Identify anomaly or pattern
3. Switch to "Custom" dates for that period
4. Use 2D zoom to examine details
```

#### Trend Investigation
```
1. Select "Quarter" filter
2. Mouse wheel zoom on specific quarters
3. Compare against Safety Stock line
4. Use Y-zoom to focus on critical ranges
```

---

## 🎛️ Control Reference

### Date Controls
| Control | Function | Behavior |
|---------|----------|----------|
| Start Date Picker | Select start date | Calendar popup, max = end date |
| End Date Picker | Select end date | Calendar popup, min = start date, max = today |
| Week Button | Last 7 days | Sets dates, aggregates by week |
| Month Button | Last 30 days | Sets dates, aggregates by month |
| Quarter Button | Last 90 days | Sets dates, aggregates by quarter |
| Year Button | Last 365 days | Sets dates, aggregates by year |

### Zoom Controls
| Control | Function | Shortcut/Method |
|---------|----------|-----------------|
| Mouse Wheel | Zoom in/out | Scroll up/down |
| Box Zoom | Select area to zoom | Toolbar icon → Drag rectangle |
| X-Slider (bottom) | Control time range | Drag handles or middle bar |
| Y-Slider (right) | Control value range | Drag handles or middle bar |
| Zoom Mode Dropdown | Change zoom behavior | Select: 2D / X-only / Disabled |
| Show Sliders Toggle | Show/hide sliders | Click button |
| Reset Zoom | Restore full view | Click button |

---

## 📈 Use Cases

### 1. Long-Term Trend Analysis
**Scenario**: Analyze year-over-year inventory trends

**Steps**:
1. Click "Year" button
2. View aggregated yearly data
3. Compare trends across warehouses
4. Check against safety stock levels

### 2. Anomaly Detection
**Scenario**: Find unusual inventory spikes or drops

**Steps**:
1. Start with "Month" view
2. Identify suspicious patterns
3. Use box zoom on anomaly period
4. Adjust Y-zoom to focus on specific value ranges
5. Examine tooltip details

### 3. Procurement Planning
**Scenario**: Identify when to reorder inventory

**Steps**:
1. Select "Quarter" filter
2. Monitor where lines approach reorder point
3. Zoom into critical periods
4. Use Y-slider to focus on threshold ranges

### 4. Multi-Warehouse Comparison
**Scenario**: Compare performance across locations

**Steps**:
1. Use "Month" aggregation for smoothing
2. Observe which warehouse has highest/lowest inventory
3. Zoom into specific months with discrepancies
4. Analyze patterns and correlations

### 5. Capacity Planning
**Scenario**: Plan warehouse capacity upgrades

**Steps**:
1. View "Year" data for historical patterns
2. Identify peak inventory periods
3. Compare against safety stock
4. Use Y-zoom to analyze maximum levels

---

## 🎨 Visual Design

### Color Scheme
- **Warehouse A**: Purple (`#667eea`) - Gradient area fill
- **Warehouse B**: Green (`#48bb78`) - Gradient area fill
- **Warehouse C**: Orange (`#f6ad55`) - Gradient area fill
- **Safety Stock**: Red (`#e53e3e`) - Dashed line
- **Reorder Point**: Orange (`#dd6b20`) - Dotted line

### UI Elements
- **Primary Buttons**: Purple gradient
- **Active Filter**: Purple background with white text
- **Inactive Filter**: White background with border
- **Reset Button**: Purple solid
- **Toggle ON**: Green background
- **Toggle OFF**: Red background

### Stats Cards
- **Zoom Mode**: Purple gradient
- **Time Filter**: Green gradient
- **Box Zoom**: Orange gradient
- **Sliders**: Red gradient

---

## 🔧 Technical Details

### State Management
```javascript
// Date & Filter States
- startDate: string (ISO date format)
- endDate: string (ISO date format)
- filterType: 'custom' | 'week' | 'month' | 'quarter' | 'year'

// Zoom States
- zoomMode: 'xy' | 'x' | 'none'
- showDataZoom: boolean
- dataZoomStart: number (0-100)
- dataZoomEnd: number (0-100)
```

### Data Flow
```
Raw Data Generation → Date Filtering → Aggregation → Chart Rendering
                                           ↓
                              getWeekNumber() / getQuarter()
                                           ↓
                              Calculate Averages by Period
```

### Performance Optimization
- `notMerge={true}`: Better performance with dynamic data
- `lazyUpdate={true}`: Reduces re-renders
- Aggregation reduces data points for better rendering
- Y-axis scale: true for proper zoom behavior

---

## 💡 Pro Tips

### 1. **Start Broad, Then Narrow**
Begin with Year or Quarter view to see big picture, then zoom into specific areas of interest.

### 2. **Use Y-Zoom for Value Analysis**
When you need to examine specific inventory ranges (e.g., 4000-5000 units), use the Y-slider or 2D zoom instead of trying to visually focus.

### 3. **Combine Aggregation with Zoom**
Aggregate by Month to smooth noise, then use box zoom on specific months for detailed inspection.

### 4. **Toggle Sliders When Needed**
Hide sliders when presenting to reduce clutter, show them when doing detailed analysis.

### 5. **Reset Often**
Use the Reset Zoom button frequently to return to full context and avoid getting "lost" in zoomed views.

### 6. **Mouse Wheel for Quick Exploration**
Mouse wheel zoom is fastest for quick exploration. Use box zoom when you know exactly what area you want to examine.

### 7. **Watch the Aggregation Badge**
Always check the aggregation badge to know if you're viewing averaged data or raw daily data.

---

## 🆚 Comparison Table

| Feature | InventoryChart | Advanced2DZoom | **SCOChartDemo** |
|---------|---------------|----------------|------------------|
| Date Range Picker | ✅ | ❌ | ✅ |
| Quick Time Filters | ✅ | ❌ | ✅ |
| Data Aggregation | ✅ | ❌ | ✅ |
| X-Axis Zoom | ✅ | ✅ | ✅ |
| Y-Axis Zoom | ❌ | ✅ | ✅ |
| Y-Axis Slider | ❌ | ✅ | ✅ |
| Box Zoom (X+Y) | ❌ | ✅ | ✅ |
| Zoom Mode Control | ❌ | ✅ | ✅ |
| Safety Stock Line | ✅ | ❌ | ✅ |
| Reorder Point Line | ✅ | ❌ | ✅ |
| Multi-Warehouse | ✅ | ✅ | ✅ |
| **Total Features** | 6 | 5 | **11** |

---

## 🚀 Future Enhancements (Potential)

- [ ] Custom aggregation functions (median, max, min)
- [ ] Export aggregated data to CSV
- [ ] Compare multiple date ranges side-by-side
- [ ] Anomaly detection highlighting
- [ ] Forecast overlay on aggregated data
- [ ] Warehouse filtering (show/hide specific warehouses)
- [ ] Custom safety stock levels per warehouse
- [ ] Alert notifications when approaching thresholds
- [ ] Multi-period comparison (YoY, MoM)
- [ ] Integration with real-time data sources

---

## 📦 File Location

```
src/
└── components/
    └── SCOChartDemo.jsx  (Main component - 580+ lines)
```

## 🔗 Related Files

- `src/components/InventoryChart.jsx` - Source of date/filter features
- `src/components/Advanced2DZoom.jsx` - Source of 2D zoom features
- `src/utils/dummyData.js` - Data generation utilities
- `src/App.jsx` - Routing configuration
- `src/pages/Dashboard.jsx` - Dashboard with link to demo

---

## 📝 Notes

- Component is fully self-contained (no external state management needed)
- All features work independently and in combination
- Performance tested with up to 365 days of daily data
- Responsive design adapts to different screen sizes
- No external dependencies beyond React and ECharts

---

**Built with ❤️ for Supply Chain Optimization**

*This component represents the culmination of advanced charting techniques for SCO analytics, providing users with maximum flexibility and insight into inventory data.*
