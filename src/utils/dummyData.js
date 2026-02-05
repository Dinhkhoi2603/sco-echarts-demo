// Utility functions to generate dummy data for SCO

// Generate inventory data with trend
export const generateInventoryData = (days = 90) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  let warehouseA = 5000;
  let warehouseB = 4500;
  let warehouseC = 3800;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Add some randomness and trends
    warehouseA += Math.random() * 200 - 100;
    warehouseB += Math.random() * 180 - 90;
    warehouseC += Math.random() * 150 - 75;
    
    // Keep values within reasonable bounds
    warehouseA = Math.max(2000, Math.min(8000, warehouseA));
    warehouseB = Math.max(2000, Math.min(7500, warehouseB));
    warehouseC = Math.max(1500, Math.min(6000, warehouseC));
    
    data.push({
      date: date.toISOString().split('T')[0],
      warehouseA: Math.round(warehouseA),
      warehouseB: Math.round(warehouseB),
      warehouseC: Math.round(warehouseC),
      safetyStock: 3000,
      reorderPoint: 3500
    });
  }
  
  return data;
};

// Generate demand forecast data
export const generateDemandForecast = (months = 12) => {
  const data = [];
  const startDate = new Date();
  
  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    const seasonalFactor = 1 + Math.sin(i * Math.PI / 6) * 0.3;
    const trend = 1 + i * 0.05;
    const baseDemand = 10000;
    
    const actual = Math.round(baseDemand * seasonalFactor * trend + (Math.random() - 0.5) * 1000);
    const forecast = Math.round(baseDemand * seasonalFactor * trend);
    const upperBound = Math.round(forecast * 1.15);
    const lowerBound = Math.round(forecast * 0.85);
    
    data.push({
      month: date.toISOString().slice(0, 7),
      actual: i < 6 ? actual : null,
      forecast: forecast,
      upperBound: upperBound,
      lowerBound: lowerBound
    });
  }
  
  return data;
};

// Generate supply chain flow data (for Sankey diagram)
export const generateSupplyChainFlow = () => {
  return {
    nodes: [
      { name: 'Supplier A' },
      { name: 'Supplier B' },
      { name: 'Supplier C' },
      { name: 'Warehouse North' },
      { name: 'Warehouse South' },
      { name: 'Warehouse East' },
      { name: 'Distribution Center' },
      { name: 'Retail Stores' },
      { name: 'E-commerce' },
      { name: 'Customers' }
    ],
    links: [
      { source: 'Supplier A', target: 'Warehouse North', value: 3500 },
      { source: 'Supplier A', target: 'Warehouse South', value: 2800 },
      { source: 'Supplier B', target: 'Warehouse North', value: 2200 },
      { source: 'Supplier B', target: 'Warehouse East', value: 3100 },
      { source: 'Supplier C', target: 'Warehouse South', value: 1900 },
      { source: 'Supplier C', target: 'Warehouse East', value: 2400 },
      
      { source: 'Warehouse North', target: 'Distribution Center', value: 5700 },
      { source: 'Warehouse South', target: 'Distribution Center', value: 4700 },
      { source: 'Warehouse East', target: 'Distribution Center', value: 5500 },
      
      { source: 'Distribution Center', target: 'Retail Stores', value: 10000 },
      { source: 'Distribution Center', target: 'E-commerce', value: 5900 },
      
      { source: 'Retail Stores', target: 'Customers', value: 9500 },
      { source: 'E-commerce', target: 'Customers', value: 5600 }
    ]
  };
};

// Generate warehouse heatmap data
export const generateWarehouseHeatmap = () => {
  const data = [];
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', 
                 '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  days.forEach((day, dayIndex) => {
    hours.forEach((hour, hourIndex) => {
      // Peak hours simulation
      let activity = 30 + Math.random() * 20;
      
      // Higher activity during business hours (8-18)
      if (hourIndex >= 4 && hourIndex <= 9) {
        activity += 40;
      }
      
      // Lower activity on weekends
      if (dayIndex >= 5) {
        activity *= 0.6;
      }
      
      data.push([hourIndex, dayIndex, Math.round(activity)]);
    });
  });
  
  return { data, hours, days };
};

// Generate KPI data
export const generateKPIData = () => {
  return {
    inventoryTurnover: 8.5,
    orderFulfillment: 94.5,
    onTimeDelivery: 92.3,
    warehouseUtilization: 78.5,
    stockoutRate: 2.1,
    avgLeadTime: 4.2
  };
};

// Generate multi-warehouse comparison data
export const generateMultiWarehouseData = (weeks = 12) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - weeks * 7);
  
  for (let i = 0; i < weeks; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i * 7);
    
    data.push({
      week: `W${i + 1}`,
      date: date.toISOString().split('T')[0],
      north: Math.round(15000 + Math.random() * 5000),
      south: Math.round(12000 + Math.random() * 4000),
      east: Math.round(13500 + Math.random() * 4500),
      west: Math.round(11000 + Math.random() * 3500)
    });
  }
  
  return data;
};

// Generate timeline data with multiple metrics
export const generateTimelineData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, index) => ({
    month,
    orders: Math.round(5000 + Math.random() * 3000 + index * 200),
    shipments: Math.round(4800 + Math.random() * 2800 + index * 190),
    returns: Math.round(200 + Math.random() * 150),
    revenue: Math.round(250000 + Math.random() * 100000 + index * 10000)
  }));
};

// Generate order status data
export const generateOrderStatusData = () => {
  return [
    { value: 335, name: 'Delivered' },
    { value: 234, name: 'In Transit' },
    { value: 154, name: 'Processing' },
    { value: 89, name: 'Pending' },
    { value: 48, name: 'Delayed' }
  ];
};

// Generate product categories data
export const generateProductCategoriesData = () => {
  return [
    { name: 'Electronics', value: 45000, percentage: 30 },
    { name: 'Clothing', value: 35000, percentage: 23 },
    { name: 'Food & Beverage', value: 28000, percentage: 19 },
    { name: 'Home & Garden', value: 22000, percentage: 15 },
    { name: 'Sports', value: 12000, percentage: 8 },
    { name: 'Others', value: 8000, percentage: 5 }
  ];
};
