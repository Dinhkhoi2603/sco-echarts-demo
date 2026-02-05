import ReactECharts from 'echarts-for-react';
import { generateSupplyChainFlow } from '../utils/dummyData';

function SupplyChainFlow() {
  const flowData = generateSupplyChainFlow();

  const option = {
    title: {
      text: 'Supply Chain Material Flow - Sankey Diagram',
      left: 'center',
      textStyle: { fontSize: 20, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: function(params) {
        if (params.dataType === 'edge') {
          return `${params.data.source} → ${params.data.target}<br/>Volume: <strong>${params.data.value.toLocaleString()}</strong> units`;
        } else {
          return `${params.name}<br/>Total Flow: <strong>${params.value.toLocaleString()}</strong> units`;
        }
      }
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        },
        label: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: 12
        },
        data: flowData.nodes,
        links: flowData.links,
        left: '5%',
        right: '15%',
        top: '10%',
        bottom: '10%',
        nodeWidth: 20,
        nodeGap: 15,
        layoutIterations: 32
      }
    ],
    color: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#38f9d7', '#fa709a', '#fee140']
  };

  const stats = {
    totalSuppliers: 3,
    totalWarehouses: 3,
    totalDistribution: 1,
    totalChannels: 2,
    totalFlow: flowData.links.reduce((sum, link) => sum + link.value, 0)
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔄 Supply Chain Flow Analysis</h1>
        <p>Visualize material flow from suppliers to customers using Sankey diagram</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Suppliers</h4>
          <div className="stat-value">{stats.totalSuppliers}</div>
          <div className="stat-change">Active partners</div>
        </div>
        <div className="stat-card">
          <h4>Warehouses</h4>
          <div className="stat-value">{stats.totalWarehouses}</div>
          <div className="stat-change">Regional locations</div>
        </div>
        <div className="stat-card">
          <h4>Distribution Channels</h4>
          <div className="stat-value">{stats.totalChannels}</div>
          <div className="stat-change">Retail + E-commerce</div>
        </div>
        <div className="stat-card">
          <h4>Total Monthly Flow</h4>
          <div className="stat-value">{(stats.totalFlow / 1000).toFixed(1)}K</div>
          <div className="stat-change positive">↑ 6.2% vs last month</div>
        </div>
      </div>

      <div className="chart-container">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
        />
      </div>

      <div className="feature-list">
        <h4>🎯 Sankey Diagram Features:</h4>
        <ul>
          <li><strong>Flow Visualization:</strong> Width of connections represents volume</li>
          <li><strong>Multi-Level Hierarchy:</strong> Track flow through entire supply chain</li>
          <li><strong>Interactive Hover:</strong> Click on nodes to highlight connected flows</li>
          <li><strong>Gradient Colors:</strong> Visual differentiation between flow paths</li>
          <li><strong>Volume Analysis:</strong> Identify bottlenecks and high-volume routes</li>
          <li><strong>Path Tracing:</strong> Follow material from source to destination</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
        <h4 style={{ color: '#1565c0', marginBottom: '1rem' }}>📊 Supply Chain Insights:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h5 style={{ color: '#1976d2' }}>🏭 Supplier Performance</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Supplier A handles 39% of total volume, making it the primary supplier
            </p>
          </div>
          <div>
            <h5 style={{ color: '#1976d2' }}>📦 Warehouse Distribution</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Warehouse North processes the highest volume at 35% of total flow
            </p>
          </div>
          <div>
            <h5 style={{ color: '#1976d2' }}>🛒 Channel Split</h5>
            <p style={{ color: '#424242', fontSize: '0.9rem' }}>
              Retail stores account for 63% of sales, e-commerce 37%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyChainFlow;
