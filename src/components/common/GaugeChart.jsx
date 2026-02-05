/**
 * Reusable Component: GaugeChart
 * 
 * Gauge chart with customizable colors and thresholds
 * Perfect for KPI dashboards
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';

const GaugeChart = ({ 
  title, 
  value, 
  min = 0, 
  max = 100, 
  unit = '',
  colorRanges = [
    [0.7, '#e53e3e'],
    [0.85, '#f6ad55'],
    [1, '#48bb78']
  ],
  reverseColors = false,
  suffix = ''
}) => {
  // Reverse color ranges if needed (for metrics where higher is worse)
  const finalColorRanges = reverseColors 
    ? [
        [0.5, '#48bb78'],
        [0.8, '#f6ad55'],
        [1, '#e53e3e']
      ]
    : colorRanges;

  const option = {
    title: {
      text: title,
      left: 'center',
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: min,
        max: max,
        splitNumber: 6,
        radius: '90%',
        center: ['50%', '70%'],
        axisLine: {
          lineStyle: {
            width: 20,
            color: finalColorRanges
          }
        },
        pointer: {
          itemStyle: { color: '#667eea' },
          width: 5,
          length: '60%'
        },
        axisTick: {
          distance: -20,
          length: 8,
          lineStyle: { color: '#fff', width: 2 }
        },
        splitLine: {
          distance: -20,
          length: 15,
          lineStyle: { color: '#fff', width: 3 }
        },
        axisLabel: {
          color: '#464646',
          distance: 15,
          fontSize: 12,
          formatter: suffix ? `{value}${suffix}` : '{value}'
        },
        detail: {
          valueAnimation: true,
          formatter: suffix ? `{value}${suffix}` : '{value}',
          color: '#667eea',
          fontSize: 30,
          fontWeight: 'bold',
          offsetCenter: [0, '0%']
        },
        data: [{ value: value, name: unit }],
        title: {
          offsetCenter: [0, '70%'],
          fontSize: 14,
          color: '#666'
        }
      }
    ]
  };

  return (
    <ReactECharts 
      option={option} 
      style={{ height: '100%', width: '100%' }}
      notMerge={true}
    />
  );
};

export default GaugeChart;
