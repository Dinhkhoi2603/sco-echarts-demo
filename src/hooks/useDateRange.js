/**
 * Custom Hook: useDateRange
 * 
 * Manages date range selection and validation
 * Reusable across multiple chart components
 */

import { useState } from 'react';

export const useDateRange = (initialDaysBack = 90) => {
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - initialDaysBack);
  
  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

  // Calculate days difference
  const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

  // Validate date range
  const isValidRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end && end <= new Date();
  };

  // Get formatted date range string
  const getFormattedRange = () => {
    const start = new Date(startDate).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const end = new Date(endDate).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    return `${start} → ${end}`;
  };

  // Set predefined ranges
  const setPredefinedRange = (type) => {
    const end = new Date();
    const start = new Date(end);
    
    switch(type) {
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(end.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(end.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(end.getFullYear() - 1);
        break;
      default:
        return;
    }
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    daysDiff,
    isValidRange,
    getFormattedRange,
    setPredefinedRange,
    maxDate: today.toISOString().split('T')[0]
  };
};
