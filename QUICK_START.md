# 🚀 Quick Start Guide - SCO ECharts Demo

## ⚡ 30-Second Setup

```bash
# You're already here! Just open the browser:
# 👉 http://localhost:5173/
```

The dev server is already running on **http://localhost:5173/** 🎉

---

## 📋 Navigation Guide

### Main Dashboard
**URL:** `http://localhost:5173/`

- Overview of all components
- Quick access cards to each demo
- Summary KPI statistics
- Order status pie chart

### Individual Components

| Component | URL | Key Features |
|-----------|-----|--------------|
| 📊 Inventory Tracking | `/inventory` | Zoom, Pan, Multi-warehouse |
| 📈 Demand Forecast | `/demand` | Predictions, Confidence intervals |
| 🔄 Supply Chain Flow | `/flow` | Sankey diagram, Flow visualization |
| 🔥 Warehouse Heatmap | `/heatmap` | Activity patterns, Peak hours |
| 🎯 KPI Dashboard | `/kpi` | Gauge charts, Performance metrics |
| 🏭 Multi-Warehouse | `/multi-warehouse` | Regional comparison |
| 📅 Timeline Analysis | `/timeline` | YoY trends, Multi-metric |

---

## 🎯 Quick Feature Tests

### Test 1: Zoom & Pan (Inventory Chart)
1. Go to `/inventory`
2. **Mouse Wheel:** Scroll up/down to zoom
3. **Drag:** Click and drag to pan
4. **Slider:** Use the slider at the bottom
5. **Toolbar:** Click zoom icon, draw a box

### Test 2: Time Range Selection
1. Stay on `/inventory`
2. Use the dropdown to change from "90 days" to "30 days"
3. Click "Last 25%" to zoom to recent data
4. Click "Reset Zoom" to return to full view

### Test 3: Interactive Sankey Diagram
1. Go to `/flow`
2. **Hover:** Move mouse over nodes and connections
3. **Click:** Click on a node to highlight connected flows
4. **Tooltip:** Hover to see volume details

### Test 4: Heatmap Analysis
1. Go to `/heatmap`
2. **Observe:** Dark blue = high activity, light blue = low
3. **Hover:** See exact activity percentage for each cell
4. **Identify:** Notice patterns (weekdays vs weekends)

### Test 5: Chart Type Switching
1. Go to `/multi-warehouse`
2. Change chart type from "Bar" to "Line"
3. Click "Side-by-Side" button to toggle stacked view
4. Use toolbar's magic type switcher

### Test 6: Gauge Charts
1. Go to `/kpi`
2. Observe the color zones (red/yellow/green)
3. Check the animated needle movements
4. Read the status recommendations below each gauge

### Test 7: Timeline with Dual Axes
1. Go to `/timeline`
2. **Legend:** Click "Revenue" to hide/show it
3. **Zoom:** Use slider to focus on specific months
4. **Toolbar:** Click "Data View" to see raw data
5. **Export:** Click camera icon to save as image

---

## 🎨 UI Interactions

### Universal Controls

#### Toolbox (Top Right of Charts)
- 📦 **Zoom Box:** Draw rectangle to zoom
- ↩️ **Restore:** Reset to original view
- 💾 **Save Image:** Download as PNG
- 📊 **Magic Type:** Switch chart types (where available)
- 📋 **Data View:** See raw data table

#### DataZoom (Bottom Slider)
- Drag the handles to adjust visible range
- Drag the middle section to pan
- Works in sync with mouse wheel zoom

#### Legend (Top of Chart)
- Click items to show/hide series
- Helps focus on specific data

#### Tooltips
- Hover anywhere on chart
- See detailed values
- Cross-hair pointer for precise reading

---

## 📊 Exploring the Data

### Dummy Data Characteristics

All data is **procedurally generated** with realistic patterns:

1. **Inventory Data** (`/inventory`)
   - 3 warehouses with different capacities
   - Random daily fluctuations
   - Stays within realistic bounds (2K-8K units)

2. **Demand Forecast** (`/demand`)
   - Seasonal patterns (sine wave)
   - Growth trend
   - 15% confidence interval bounds

3. **Supply Chain Flow** (`/flow`)
   - 3 suppliers → 3 warehouses → 1 DC → 2 channels → customers
   - Volume-based connections
   - Realistic distribution ratios

4. **Heatmap** (`/heatmap`)
   - Higher activity during business hours (8-18)
   - Lower activity on weekends (60% of weekday)
   - Minimal night activity (00-06)

5. **KPI Values** (`/kpi`)
   - Industry-standard metrics
   - Target-based thresholds
   - Realistic performance levels

6. **Multi-Warehouse** (`/multi-warehouse`)
   - 12 weeks of data
   - 4 regional warehouses
   - Varied but growing trends

7. **Timeline** (`/timeline`)
   - 12 months of data
   - Correlated metrics (orders ≈ shipments)
   - Realistic return rate (~3%)

---

## 🛠️ Customization Examples

### Change Chart Colors

**File:** Any component file (e.g., `src/components/InventoryChart.jsx`)

```jsx
// Find the series definition
series: [
  {
    name: 'Warehouse A',
    itemStyle: { color: '#YOUR_COLOR_HERE' },  // ← Change this
    // ... rest of config
  }
]
```

### Adjust Time Range Options

**File:** `src/components/InventoryChart.jsx`

```jsx
// Find the select element
<select value={timeRange} onChange={handleTimeRangeChange}>
  <option value="30">Last 30 Days</option>
  <option value="60">Last 60 Days</option>
  <option value="90">Last 90 Days</option>
  <option value="365">Last Year</option>
  {/* Add your own options here */}
</select>
```

### Modify Dummy Data

**File:** `src/utils/dummyData.js`

```javascript
// Example: Change inventory range
export const generateInventoryData = (days = 90) => {
  // ...
  warehouseA = Math.max(5000, Math.min(15000, warehouseA));  // ← Adjust min/max
  // ...
};
```

---

## 🎓 Learning Path

### Beginner (15 minutes)
1. ✅ Navigate to all 7 components
2. ✅ Try zoom & pan on Inventory chart
3. ✅ Change time ranges
4. ✅ Hover tooltips on different charts

### Intermediate (30 minutes)
1. ✅ Use all toolbar features (save, restore, data view)
2. ✅ Toggle chart types on Multi-Warehouse
3. ✅ Click legend items to filter data
4. ✅ Experiment with stacked vs side-by-side views

### Advanced (1 hour)
1. ✅ Examine code in component files
2. ✅ Modify chart options
3. ✅ Change colors and themes
4. ✅ Add new chart series
5. ✅ Create custom dummy data patterns

---

## 📱 Responsive Testing

The dashboard is fully responsive. Try:

1. **Resize Browser:** Drag window smaller/larger
2. **Mobile View:** Open DevTools (F12) → Toggle device toolbar
3. **Different Screens:** Test on tablet/phone if available

---

## 🐛 Troubleshooting

### Server Not Running?
```bash
cd d:/new-frontend/sco-echarts-demo
npm run dev
```

### Charts Not Showing?
- Check browser console (F12) for errors
- Ensure all dependencies installed: `npm install`
- Try clearing cache and refresh (Ctrl+Shift+R)

### Port Already in Use?
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Or change port in vite.config.js
```

### Slow Performance?
- Reduce data points in `dummyData.js`
- Disable animations in chart options
- Use `lazyUpdate={true}` in ReactECharts

---

## 📚 Next Steps

### Integrate with Real Data
Replace dummy data generators with API calls:

```jsx
// Before
import { generateInventoryData } from '../utils/dummyData';
const data = generateInventoryData(90);

// After
const [data, setData] = useState([]);
useEffect(() => {
  fetch('/api/inventory')
    .then(res => res.json())
    .then(setData);
}, []);
```

### Add More Chart Types
ECharts supports 20+ chart types:
- Radar charts
- Tree diagrams
- Scatter plots
- Candlestick charts
- 3D visualizations

See: https://echarts.apache.org/examples/en/index.html

### Custom Themes
Create custom color schemes:

```jsx
import * as echarts from 'echarts';

const myTheme = {
  color: ['#YOUR_COLORS'],
  backgroundColor: '#YOUR_BG'
};

echarts.registerTheme('myTheme', myTheme);
<ReactECharts option={option} theme="myTheme" />
```

---

## 💡 Pro Tips

1. **Use Browser DevTools:** F12 → Console to see any errors
2. **Hot Reload:** Save files to see changes instantly
3. **Component Isolation:** Test one chart at a time
4. **Copy Examples:** Use ECharts documentation examples as templates
5. **Performance:** Use `notMerge={true}` when changing data frequently

---

## 📧 Resources

- 📖 **README.md** - Project overview
- 🎯 **FEATURES.md** - Complete feature list
- 🌐 **ECharts Docs:** https://echarts.apache.org/
- 💬 **ECharts Examples:** https://echarts.apache.org/examples/

---

**Happy Charting! 📊✨**

Server is running at: **http://localhost:5173/**
