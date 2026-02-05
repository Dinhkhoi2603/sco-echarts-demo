# 📍 Time Markers Feature - Complete Guide

## 🎯 Overview

The **Time Markers** feature allows you to display all time periods on the X-axis, ensuring every week, month, quarter, or year in your selected date range is visible as a marker on the chart.

## ✨ What's New

### 1. **Show All Time Markers Button** 📍
A new toggle button in the controls section that lets you switch between:
- **"All Markers"** mode: Shows every single period (week/month/quarter/year) on the X-axis
- **"Auto Markers"** mode: ECharts automatically selects optimal spacing to prevent label overlap

### 2. **Intelligent Display Logic** 🧠
The feature automatically adapts based on your filter type:
- **Week/Month/Quarter/Year filters**: Shows all periods when enabled
- **Custom date filter**: Uses auto mode to prevent label crowding with daily data
- **Split lines**: Vertical dotted lines mark each period for better readability

### 3. **Enhanced Stats Card** 📊
A new stats card displays:
- Current marker mode (All or Auto)
- Total number of data points/markers
- Period type (Days/Weeks/Months/Quarters/Years)

## 🎨 Visual Features

### When "All Markers" is ON:
✅ Every period displays on X-axis  
✅ Split lines (dotted vertical lines) between periods  
✅ Larger font size (11px) for better readability  
✅ Increased margin (12px) between label and axis  
✅ All axis ticks visible and aligned with labels  

### When "Auto Markers" is ON:
✅ ECharts optimizes spacing automatically  
✅ No split lines (cleaner look)  
✅ Smaller font size (10px)  
✅ Labels hide on overlap to prevent cluttering  

## 📊 Use Cases

### 1. **Monthly Analysis** (Jan 2025 - Dec 2025)
```
Filter: Month
Markers: All (ON)
Result: 12 months displayed → 12 markers on X-axis
Display: "Jan 2024", "Feb 2024", ... "Dec 2024"
```

### 2. **Quarterly Planning** (Q1 2024 - Q4 2025)
```
Filter: Quarter
Markers: All (ON)
Result: 8 quarters displayed → 8 markers on X-axis
Display: "2024 Q1", "2024 Q2", ... "2025 Q4"
```

### 3. **Weekly Tracking** (52 weeks)
```
Filter: Week
Markers: All (ON)
Result: 52 weeks displayed → 52 markers on X-axis
Display: "W01 2024", "W02 2024", ... "W52 2024"
```

### 4. **Year-over-Year** (2020-2025)
```
Filter: Year
Markers: All (ON)
Result: 6 years displayed → 6 markers on X-axis
Display: "2020", "2021", "2022", "2023", "2024", "2025"
```

## 🎮 How to Use

### Step-by-Step Guide:

1. **Select a Time Filter**
   - Click one of: Week, Month, Quarter, or Year
   - This aggregates your data by that period

2. **Enable All Markers**
   - Click the **"📍 All Markers"** button (turns orange when active)
   - Or click **"📍 Auto Markers"** to let ECharts decide

3. **View the Chart**
   - X-axis now shows all periods in your date range
   - Dotted vertical lines help identify each period boundary
   - Tooltip shows exact period when hovering

4. **Zoom and Explore**
   - Use 2D zoom to focus on specific periods
   - All markers remain visible within zoomed area
   - Split lines help identify period boundaries even when zoomed

## 🔧 Technical Details

### Code Implementation

```javascript
// State management
const [showAllTimeMarkers, setShowAllTimeMarkers] = useState(true);

// X-axis configuration
xAxis: {
  axisLabel: {
    interval: showAllTimeMarkers && filterType !== 'custom' ? 0 : 'auto',
    fontSize: showAllTimeMarkers && filterType !== 'custom' ? 11 : 10,
    margin: showAllTimeMarkers && filterType !== 'custom' ? 12 : 8,
    hideOverlap: !showAllTimeMarkers
  },
  axisTick: {
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

### Key Configuration Properties

| Property | All Markers Mode | Auto Mode |
|----------|------------------|-----------|
| `axisLabel.interval` | 0 (show all) | 'auto' (optimize) |
| `axisLabel.fontSize` | 11px | 10px |
| `axisLabel.margin` | 12px | 8px |
| `axisLabel.hideOverlap` | false | true |
| `axisTick.interval` | 0 (show all) | 'auto' |
| `splitLine.show` | true | false |

## 📈 Examples with Data

### Example 1: 12-Month View
```
Date Range: Jan 1, 2025 - Dec 31, 2025
Filter: Month
Markers: All Markers (ON)

X-Axis Labels:
├─ Jan 2025
├─ Feb 2025
├─ Mar 2025
├─ Apr 2025
├─ May 2025
├─ Jun 2025
├─ Jul 2025
├─ Aug 2025
├─ Sep 2025
├─ Oct 2025
├─ Nov 2025
└─ Dec 2025

Total Markers: 12
```

### Example 2: 4-Quarter View
```
Date Range: Jan 1, 2025 - Dec 31, 2025
Filter: Quarter
Markers: All Markers (ON)

X-Axis Labels:
├─ 2025 Q1
├─ 2025 Q2
├─ 2025 Q3
└─ 2025 Q4

Total Markers: 4
```

### Example 3: Custom Date Range
```
Date Range: Jan 1, 2025 - Mar 31, 2025 (90 days)
Filter: Custom
Markers: Auto Markers (mode doesn't apply to custom filter)

X-Axis Labels: Auto-selected by ECharts (e.g., Jan 1, Jan 15, Feb 1, Feb 15, Mar 1, Mar 15...)
```

## 💡 Best Practices

### ✅ DO:
- Enable "All Markers" for aggregated views (Week/Month/Quarter/Year)
- Use it when presenting data to stakeholders (shows complete timeline)
- Combine with 2D zoom for detailed period inspection
- Use for reports and presentations

### ❌ DON'T:
- Enable for very long time ranges (100+ periods may overlap)
- Use with custom/daily data (automatically disabled)
- Forget to zoom out before enabling (gives full context)

## 🎯 Pro Tips

### Tip 1: **Presentation Mode**
```
1. Select "Month" or "Quarter" filter
2. Enable "All Markers"
3. Hide sliders for cleaner look
4. Perfect for stakeholder presentations!
```

### Tip 2: **Detailed Analysis**
```
1. Enable "All Markers" to see full timeline
2. Use box zoom on specific periods
3. Split lines help identify exact period boundaries
4. Great for finding patterns across periods
```

### Tip 3: **Comparison**
```
1. View data with "All Markers" ON
2. Toggle to "Auto Markers" to reduce clutter
3. Compare readability and choose best view
```

### Tip 4: **Large Datasets**
```
If you have many periods (50+):
1. Start with "Auto Markers"
2. Zoom into specific date ranges
3. Then enable "All Markers" for zoomed view
```

## 🔍 Troubleshooting

### Problem: Labels are overlapping
**Solution**: 
- Switch to "Auto Markers" mode
- Or zoom into specific date range first
- Or increase chart width

### Problem: Not showing all markers even when enabled
**Check**:
- Are you using Week/Month/Quarter/Year filter? (Required)
- Custom filter automatically uses Auto mode
- Try zooming out to full view first

### Problem: Split lines not visible
**Solution**:
- Ensure "All Markers" is enabled
- Check that filter type is not 'custom'
- Refresh chart by toggling the button

## 📊 Performance Notes

- **All Markers mode** is optimized for up to ~100 periods
- Beyond 100 periods, labels may still overlap depending on chart width
- No performance impact on rendering (pure visual feature)
- Works seamlessly with zoom and pan operations

## 🎨 Customization Options

You can customize the appearance in the code:

```javascript
// Label styling
fontSize: 11,          // Change font size
margin: 12,            // Distance from axis
rotate: 0,             // Label rotation

// Split line styling
lineStyle: {
  color: '#e8e8e8',    // Line color
  type: 'dotted',      // Line type: solid, dashed, dotted
  width: 1             // Line thickness
}
```

## 🚀 Future Enhancements (Ideas)

- [ ] Custom marker interval (show every 2nd, 3rd period)
- [ ] Different marker styles per period type
- [ ] Highlight specific periods (e.g., fiscal quarters)
- [ ] Export marker positions to CSV
- [ ] Custom split line colors per period
- [ ] Animated marker appearance on filter change

## 📋 Summary

The Time Markers feature gives you complete control over X-axis period visibility, ensuring that:

✅ Every period in your selected range can be displayed  
✅ Chart remains readable with intelligent spacing  
✅ Split lines provide clear visual separation  
✅ Works seamlessly with aggregation and zoom features  
✅ Enhances presentations and detailed analysis  

**Toggle Button**: 📍 All Markers / 📍 Auto Markers  
**Works with**: Week, Month, Quarter, Year filters  
**Perfect for**: Presentations, reports, and detailed period analysis  

---

**Built to enhance the SCO Chart Demo experience** 🚀

*For complete component documentation, see [SCO_CHART_DEMO_README.md](./SCO_CHART_DEMO_README.md)*
