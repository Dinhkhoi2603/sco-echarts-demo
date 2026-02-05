# 📦 SCO Analytics Dashboard - Apache ECharts Demo

A comprehensive Supply Chain Optimization (SCO) dashboard built with **React** and **Apache ECharts**, featuring interactive charts with zoom, pan, timeline controls, and various SCO-specific visualizations.

## 🚀 Features

### 📊 Chart Types Demonstrated

1. **Inventory Tracking**
   - Multi-warehouse inventory levels monitoring
   - Real-time zoom & pan controls
   - Safety stock and reorder point visualization
   - Time range selection (30 days to 1 year)

2. **Demand Forecasting**
   - Predictive analytics with confidence intervals
   - Upper/lower bound visualization
   - Historical vs predicted comparison
   - Seasonal pattern detection

3. **Supply Chain Flow (Sankey Diagram)**
   - Material flow from suppliers to customers
   - Volume-based connection width
   - Interactive node highlighting
   - Multi-level hierarchy visualization

4. **Warehouse Heatmap**
   - Activity patterns by hour and day
   - Peak hour detection
   - Resource planning insights
   - Color-coded intensity levels

5. **KPI Dashboard**
   - Real-time gauge charts
   - Performance indicators with thresholds
   - Color-coded status zones
   - Animated value updates

6. **Multi-Warehouse Comparison**
   - Side-by-side performance comparison
   - Stacked vs separate view modes
   - Dynamic chart type switching (bar/line)
   - Regional performance analysis

7. **Timeline Analysis**
   - Year-over-year trends
   - Multiple metrics on dual Y-axes
   - Mixed chart types (bar + line)
   - Interactive metric filtering

## 🎯 Key ECharts Features Showcased

✅ **Zoom & Pan**
- Mouse wheel zoom
- Slider zoom control
- Drag to pan
- Zoom box selection

✅ **Timeline Controls**
- DataZoom component
- Time range selection
- Week/Month/Year views

✅ **Interactive Features**
- Tooltips with custom formatting
- Legend toggling
- Toolbox actions (save, restore, data view)
- Responsive design

✅ **Advanced Visualizations**
- Sankey diagrams
- Heatmaps
- Gauge charts
- Mixed chart types
- Dual Y-axes
- Stacked charts

## 🛠️ Installation

```bash
# Clone or download the project
cd sco-echarts-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.0.2",
  "echarts": "^5.5.1",
  "echarts-for-react": "^3.0.2"
}
```

## 📁 Project Structure

```
sco-echarts-demo/
├── src/
│   ├── components/           # Chart components
│   │   ├── InventoryChart.jsx
│   │   ├── DemandForecast.jsx
│   │   ├── SupplyChainFlow.jsx
│   │   ├── WarehouseHeatmap.jsx
│   │   ├── KPIDashboard.jsx
│   │   ├── MultiWarehouse.jsx
│   │   └── TimelineAnalysis.jsx
│   ├── pages/
│   │   └── Dashboard.jsx     # Main dashboard
│   ├── utils/
│   │   └── dummyData.js      # Data generators
│   ├── App.jsx               # App component with routing
│   ├── App.css               # Styles
│   └── main.jsx              # Entry point
├── package.json
└── README.md
```

## 💡 Usage Examples

### Basic Chart Setup

```jsx
import ReactECharts from 'echarts-for-react';

function MyChart() {
  const option = {
    title: { text: 'My Chart' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [
      {
        data: [120, 200, 150],
        type: 'line'
      }
    ]
  };

  return <ReactECharts option={option} />;
}
```

### Adding Zoom & Pan

```jsx
const option = {
  // ... other options
  dataZoom: [
    {
      type: 'inside',        // Mouse wheel zoom
      start: 0,
      end: 100
    },
    {
      type: 'slider',        // Slider control
      start: 0,
      end: 100,
      height: 30
    }
  ]
};
```

### Creating a Sankey Diagram

```jsx
const option = {
  series: [
    {
      type: 'sankey',
      data: [
        { name: 'Supplier A' },
        { name: 'Warehouse' },
        { name: 'Customer' }
      ],
      links: [
        { source: 'Supplier A', target: 'Warehouse', value: 100 },
        { source: 'Warehouse', target: 'Customer', value: 100 }
      ]
    }
  ]
};
```

## 🎨 Customization

All charts are fully customizable through ECharts options:

- **Colors**: Modify the `color` array or individual `itemStyle.color`
- **Layout**: Adjust `grid`, `left`, `right`, `top`, `bottom` properties
- **Interactivity**: Configure `tooltip`, `legend`, `toolbox` settings
- **Animation**: Control with `animation` and `animationDuration` options

## 📊 Dummy Data

The project includes comprehensive dummy data generators in `src/utils/dummyData.js`:

- `generateInventoryData()` - Inventory levels over time
- `generateDemandForecast()` - Forecast with confidence intervals
- `generateSupplyChainFlow()` - Sankey diagram data
- `generateWarehouseHeatmap()` - Activity heatmap data
- `generateKPIData()` - KPI metrics
- `generateMultiWarehouseData()` - Multi-warehouse comparison
- `generateTimelineData()` - Timeline analysis data

## 🌟 Best Practices

1. **Performance**: Use `notMerge={true}` for better performance with dynamic data
2. **Responsive**: Charts automatically resize with container
3. **Lazy Update**: Use `lazyUpdate={true}` for better performance
4. **Data Formatting**: Format tooltips and axis labels for better readability
5. **Colors**: Use consistent color schemes across charts
6. **Accessibility**: Provide clear labels and legends

## 📚 Resources

- [Apache ECharts Documentation](https://echarts.apache.org/en/index.html)
- [echarts-for-react GitHub](https://github.com/hustcc/echarts-for-react)
- [ECharts Examples Gallery](https://echarts.apache.org/examples/en/index.html)
- [ECharts Configuration Options](https://echarts.apache.org/en/option.html)

## 🚀 Production Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 License

MIT License - feel free to use this demo for learning and commercial projects.

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

## 📧 Support

For ECharts issues: [ECharts GitHub Issues](https://github.com/apache/echarts/issues)

---

**Built with ❤️ using React + Apache ECharts**

*Perfect for Supply Chain Optimization, Logistics Analytics, Warehouse Management Systems, and Business Intelligence Dashboards*
