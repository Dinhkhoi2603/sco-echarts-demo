/**
 * Data Utility Functions
 * 
 * Helper functions for data manipulation
 */

// Filter data by date range
export const filterDataByDateRange = (data, startDate, endDate) => {
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });
};

// Calculate date difference in days
export const getDaysDifference = (startDate, endDate) => {
  return Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
};

// Format date for display
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  switch(format) {
    case 'short':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'long':
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    case 'iso':
      return d.toISOString().split('T')[0];
    default:
      return d.toLocaleDateString('en-US');
  }
};

// Get period count based on date range
export const getPeriodCount = (startDate, endDate, periodType) => {
  const days = getDaysDifference(startDate, endDate);
  
  switch(periodType) {
    case 'week':
      return Math.ceil(days / 7);
    case 'month':
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    case 'quarter':
      return Math.ceil(getPeriodCount(startDate, endDate, 'month') / 3);
    case 'year':
      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();
      return endYear - startYear + 1;
    default:
      return days;
  }
};

// Check if date range is valid
export const isValidDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  return start <= end && end <= today && start instanceof Date && !isNaN(start);
};

// Generate date range array
export const generateDateRange = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    dates.push(new Date(current).toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};
