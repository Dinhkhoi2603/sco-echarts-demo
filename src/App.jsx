import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import InventoryChart from './components/InventoryChart';
import DemandForecast from './components/DemandForecast';
import SupplyChainFlow from './components/SupplyChainFlow';
import WarehouseHeatmap from './components/WarehouseHeatmap';
import KPIDashboard from './components/KPIDashboard';
import MultiWarehouse from './components/MultiWarehouse';
import TimelineAnalysis from './components/TimelineAnalysis';
import SCOChartDemo from './components/SCOChartDemo';
import Advanced2DZoom from './components/Advanced2DZoom';
import RefactoredChartExample from './components/RefactoredChartExample';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>📦 SCO Analytics Dashboard</h2>
          </div>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/sco-demo" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold' }}>🚀 SCO Advanced</Link>
            <Link to="/refactored" style={{ background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold' }}>🎨 Refactored</Link>
            <Link to="/2d-zoom">🔍 2D Zoom</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/demand">Demand</Link>
            <Link to="/flow">Flow</Link>
            <Link to="/heatmap">Heatmap</Link>
            <Link to="/kpi">KPI</Link>
            <Link to="/multi-warehouse">Multi-WH</Link>
            <Link to="/timeline">Timeline</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sco-demo" element={<SCOChartDemo />} />
            <Route path="/refactored" element={<RefactoredChartExample />} />
            <Route path="/2d-zoom" element={<Advanced2DZoom />} />
            <Route path="/inventory" element={<InventoryChart />} />
            <Route path="/demand" element={<DemandForecast />} />
            <Route path="/flow" element={<SupplyChainFlow />} />
            <Route path="/heatmap" element={<WarehouseHeatmap />} />
            <Route path="/kpi" element={<KPIDashboard />} />
            <Route path="/multi-warehouse" element={<MultiWarehouse />} />
            <Route path="/timeline" element={<TimelineAnalysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
