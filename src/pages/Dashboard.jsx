import { Link } from 'react-router-dom';
import { generateKPIData, generateOrderStatusData } from '../utils/dummyData';
import ReactECharts from 'echarts-for-react';

function Dashboard() {
  const kpiData = generateKPIData();
  const orderStatus = generateOrderStatusData();

  const orderStatusOption = {
    title: {
      text: 'Order Status Distribution',
      left: 'center',
      top: 10,
      textStyle: { fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 50
    },
    series: [
      {
        name: 'Orders',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        data: orderStatus
      }
    ],
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
  };

  const demoCards = [
    {
      title: 'SCO Advanced Chart',
      description: '🚀 Complete demo with date filters + 2D zoom + aggregation',
      features: ['Date range picker', 'Time aggregation', '2D Zoom (X+Y)', 'All-in-one solution'],
      link: '/sco-demo',
      icon: '🚀',
      featured: true
    },
    {
      title: 'Inventory Tracking',
      description: 'Real-time inventory levels with zoom & pan controls',
      features: ['Multi-warehouse view', 'Safety stock alerts', 'Time-range zoom'],
      link: '/inventory',
      icon: '📊'
    },
    {
      title: 'Demand Forecast',
      description: 'Predictive analytics with confidence intervals',
      features: ['12-month forecast', 'Upper/lower bounds', 'Actual vs Predicted'],
      link: '/demand',
      icon: '📈'
    },
    {
      title: 'Supply Chain Flow',
      description: 'Sankey diagram showing material flow',
      features: ['Supplier to customer', 'Flow visualization', 'Volume tracking'],
      link: '/flow',
      icon: '🔄'
    },
    {
      title: 'Warehouse Heatmap',
      description: 'Activity patterns by time and day',
      features: ['24/7 tracking', 'Peak hour detection', 'Resource planning'],
      link: '/heatmap',
      icon: '🔥'
    },
    {
      title: 'KPI Dashboard',
      description: 'Key performance indicators with gauges',
      features: ['Real-time KPIs', 'Target tracking', 'Performance metrics'],
      link: '/kpi',
      icon: '🎯'
    },
    {
      title: 'Multi-Warehouse',
      description: 'Compare performance across locations',
      features: ['Side-by-side comparison', 'Trend analysis', 'Regional insights'],
      link: '/multi-warehouse',
      icon: '🏭'
    },
    {
      title: 'Timeline Analysis',
      description: 'Year-over-year trends and patterns',
      features: ['Monthly breakdown', 'Multiple metrics', 'Export capabilities'],
      link: '/timeline',
      icon: '📅'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏢 Supply Chain Optimization Dashboard</h1>
        <p>Comprehensive analytics powered by Apache ECharts</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Inventory Turnover</h4>
          <div className="stat-value">{kpiData.inventoryTurnover}</div>
          <div className="stat-change positive">↑ 12% vs last month</div>
        </div>
        <div className="stat-card">
          <h4>Order Fulfillment</h4>
          <div className="stat-value">{kpiData.orderFulfillment}%</div>
          <div className="stat-change positive">↑ 2.3% vs last month</div>
        </div>
        <div className="stat-card">
          <h4>On-Time Delivery</h4>
          <div className="stat-value">{kpiData.onTimeDelivery}%</div>
          <div className="stat-change negative">↓ 1.2% vs last month</div>
        </div>
        <div className="stat-card">
          <h4>Warehouse Utilization</h4>
          <div className="stat-value">{kpiData.warehouseUtilization}%</div>
          <div className="stat-change positive">↑ 5.4% vs last month</div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginBottom: '2rem' }}>
        <div className="chart-container-small">
          <ReactECharts option={orderStatusOption} style={{ height: '100%' }} />
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>📊 Demo Components</h2>

      <div className="dashboard-grid">
        {demoCards.map((card, index) => (
          <Link to={card.link} key={index} style={{ textDecoration: 'none' }}>
            <div className="dashboard-card" style={card.featured ? {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: '3px solid #ffd700',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
              transform: 'scale(1.02)'
            } : {}}>
              <div className="card-header">
                <h3>
                  <span style={{ marginRight: '0.5rem' }}>{card.icon}</span>
                  {card.title}
                  {card.featured && <span style={{ 
                    marginLeft: '0.5rem', 
                    fontSize: '0.75rem', 
                    background: '#ffd700', 
                    color: '#000', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>NEW</span>}
                </h3>
                <span className="card-badge" style={card.featured ? { background: '#ffd700', color: '#000' } : {}}>
                  View Demo
                </span>
              </div>
              <p style={{ color: card.featured ? 'rgba(255,255,255,0.9)' : '#7f8c8d', marginBottom: '1rem' }}>
                {card.description}
              </p>
              <div className="feature-list">
                <h4 style={card.featured ? { color: 'white' } : {}}>Features:</h4>
                <ul>
                  {card.features.map((feature, fIndex) => (
                    <li key={fIndex} style={card.featured ? { color: 'rgba(255,255,255,0.95)' } : {}}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '12px' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🚀 Key Features of Apache ECharts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4>✅ 18+ Chart Types</h4>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Line, Bar, Pie, Scatter, Candlestick, Heatmap, Sankey, Graph, Gauge, Radar, and more
            </p>
          </div>
          <div>
            <h4>🔍 Zoom & Pan</h4>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Built-in dataZoom with slider and inside (mouse wheel) options
            </p>
          </div>
          <div>
            <h4>📅 Timeline Control</h4>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Navigate through different time periods (week/month/year views)
            </p>
          </div>
          <div>
            <h4>⚡ High Performance</h4>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Handles millions of data points with data sampling and progressive rendering
            </p>
          </div>
          <div>
            <h4>📱 Responsive</h4>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Mobile-friendly with touch support for zoom/pan interactions
            </p>
          </div>
          <div>
            <h4>🎨 Customizable</h4>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
              Extensive theme and style customization options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
