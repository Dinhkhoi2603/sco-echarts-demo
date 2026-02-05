/**
 * Chart Configuration Builder
 * 
 * Reusable functions to build ECharts configurations
 */

// Build Y-axis configuration
export const buildYAxisConfig = (name = 'Value', scale = true) => ({
  type: 'value',
  name: name,
  nameTextStyle: { fontSize: 14, fontWeight: 'bold' },
  scale: scale,
  axisLabel: {
    formatter: function (value) {
      return value.toLocaleString();
    }
  },
  splitLine: {
    lineStyle: { type: 'dashed', color: '#e0e0e0' }
  }
});

// Build tooltip configuration
export const buildTooltipConfig = (formatter) => ({
  trigger: 'axis',
  axisPointer: { type: 'cross' },
  formatter: formatter
});

// Build legend configuration
export const buildLegendConfig = (data, top = 35) => ({
  data: data,
  top: top,
  textStyle: { fontSize: 12 }
});

// Build grid configuration
export const buildGridConfig = (showDataZoom = true) => ({
  left: '5%',
  right: showDataZoom ? '7%' : '5%',
  bottom: showDataZoom ? '20%' : '10%',
  top: '20%',
  containLabel: true
});

// Build line series configuration
export const buildLineSeries = (name, data, color, options = {}) => ({
  name: name,
  type: 'line',
  data: data,
  smooth: options.smooth !== undefined ? options.smooth : true,
  lineStyle: { width: options.lineWidth || 3 },
  itemStyle: { color: color },
  symbol: options.symbol || 'circle',
  symbolSize: options.symbolSize || 6,
  areaStyle: options.showArea ? {
    color: {
      type: 'linear',
      x: 0, y: 0, x2: 0, y2: 1,
      colorStops: [
        { offset: 0, color: `${color}4D` }, // 30% opacity
        { offset: 1, color: `${color}0D` }  // 5% opacity
      ]
    }
  } : undefined,
  ...options.extraConfig
});

// Build reference line series (safety stock, reorder point, etc.)
export const buildReferenceLine = (name, data, color, lineType = 'dashed') => ({
  name: name,
  type: 'line',
  data: data,
  lineStyle: { type: lineType, color: color, width: 2 },
  itemStyle: { color: color },
  symbol: 'none'
});

// Build chart title
export const buildTitleConfig = (text, subtext = '') => ({
  text: text,
  subtext: subtext,
  left: 'center',
  textStyle: { fontSize: 20, fontWeight: 'bold' }
});

// Build complete chart option
export const buildChartOption = ({
  title,
  xAxis,
  yAxis,
  series,
  tooltip,
  legend,
  grid,
  dataZoom,
  toolbox
}) => {
  return {
    title,
    tooltip,
    legend,
    grid,
    toolbox,
    dataZoom,
    xAxis,
    yAxis,
    series
  };
};
