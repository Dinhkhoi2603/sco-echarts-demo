/**
 * Custom Hook: useAggregation
 * 
 * Manages data aggregation logic (week, month, quarter, year)
 * Reusable across multiple chart components
 */

import { useState, useMemo } from 'react';

export const useAggregation = (initialType = 'custom') => {
  const [filterType, setFilterType] = useState(initialType);

  // Get week number (ISO 8601)
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  };

  // Get quarter
  const getQuarter = (date) => {
    const d = new Date(date);
    const quarter = Math.floor(d.getMonth() / 3) + 1;
    return `${d.getFullYear()}-Q${quarter}`;
  };

  // Aggregate data based on filter type
  const aggregateData = (data, type = filterType) => {
    if (type === 'custom') return data;

    const grouped = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      let key;
      
      switch(type) {
        case 'week':
          key = getWeekNumber(date);
          break;
        case 'month':
          key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          break;
        case 'quarter':
          key = getQuarter(date);
          break;
        case 'year':
          key = date.getFullYear().toString();
          break;
        default:
          key = item.date;
      }
      
      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          values: {},
          count: 0
        };
      }
      
      // Aggregate all numeric fields
      Object.keys(item).forEach(field => {
        if (field !== 'date' && typeof item[field] === 'number') {
          if (!grouped[key].values[field]) {
            grouped[key].values[field] = [];
          }
          grouped[key].values[field].push(item[field]);
        }
      });
      
      grouped[key].count++;
    });
    
    // Calculate averages and sort by date
    return Object.keys(grouped).sort().map(key => {
      const group = grouped[key];
      const result = { date: group.date };
      
      Object.keys(group.values).forEach(field => {
        const values = group.values[field];
        result[field] = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      });
      
      return result;
    });
  };

  // Get X-axis formatter based on filter type
  const getXAxisFormatter = (type = filterType) => {
    switch(type) {
      case 'week':
        return function(value) {
          const [year, week] = value.split('-W');
          return `W${week}\n${year}`;
        };
      case 'month':
        return function(value) {
          const [year, month] = value.split('-');
          const date = new Date(year, parseInt(month) - 1);
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };
      case 'quarter':
        return function(value) {
          return value.replace('-', ' ');
        };
      case 'year':
        return function(value) {
          return value;
        };
      default:
        return function(value) {
          return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };
    }
  };

  // Get tooltip date formatter
  const getTooltipFormatter = (type = filterType) => {
    return (dateLabel) => {
      switch(type) {
        case 'week':
          const [year, week] = dateLabel.split('-W');
          return `Week ${week}, ${year}`;
        case 'month':
          const [y, m] = dateLabel.split('-');
          const monthDate = new Date(y, parseInt(m) - 1);
          return monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        case 'quarter':
          return dateLabel.replace('-', ' ');
        case 'year':
          return `Year ${dateLabel}`;
        default:
          return new Date(dateLabel).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          });
      }
    };
  };

  // Get period label (for display)
  const getPeriodLabel = (type = filterType) => {
    const labels = {
      custom: 'Daily',
      week: 'Week',
      month: 'Month',
      quarter: 'Quarter',
      year: 'Year'
    };
    return labels[type] || 'Daily';
  };

  // Get plural period label
  const getPluralPeriodLabel = (type = filterType) => {
    const labels = {
      custom: 'days',
      week: 'weeks',
      month: 'months',
      quarter: 'quarters',
      year: 'years'
    };
    return labels[type] || 'days';
  };

  return {
    filterType,
    setFilterType,
    aggregateData,
    getXAxisFormatter,
    getTooltipFormatter,
    getPeriodLabel,
    getPluralPeriodLabel,
    getWeekNumber,
    getQuarter
  };
};
