import * as echarts from 'echarts'
import { debounce } from 'lodash'
import 'echarts-wordcloud'

// ===== 数据 =====
const annualData = {
  xAxis: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
  series: [986, 1123, 1345, 1587, 1823, 2105, 2354, 1678]
}

const herbData = [
  { name: '黄芪', value: 100 }, { name: '甘草', value: 95 },
  { name: '当归', value: 90 }, { name: '人参', value: 85 },
  { name: '茯苓', value: 80 }, { name: '白术', value: 75 },
  { name: '川芎', value: 70 }, { name: '熟地黄', value: 68 },
  { name: '白芍', value: 65 }, { name: '黄芩', value: 62 },
  { name: '黄连', value: 58 }, { name: '麦冬', value: 55 },
  { name: '枸杞', value: 52 }, { name: '大黄', value: 48 },
  { name: '丹参', value: 45 }, { name: '柴胡', value: 42 },
  { name: '桂枝', value: 38 }, { name: '生姜', value: 35 },
  { name: '大枣', value: 32 }, { name: '五味子', value: 30 },
]

const categoryData = [
  { value: 335, name: '临床研究' },
  { value: 310, name: '方剂配伍' },
  { value: 245, name: '中药化学' },
  { value: 198, name: '针灸推拿' },
  { value: 156, name: '中医理论' },
  { value: 120, name: '数据挖掘' },
  { value: 85, name: '实验研究' },
  { value: 72, name: '文献综述' },
]

let chartInstance1 = null
let chartInstance2 = null
let chartInstance3 = null

// 工具：暗色主题渐变色
const cyanGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: '#00f7ff' },
  { offset: 1, color: '#0066ff' },
])
const blueGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: '#4a90e2' },
  { offset: 1, color: '#2b5f8a' },
])
const purpleGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: '#7c3aed' },
  { offset: 1, color: '#4a1d96' },
])

export const initCharts = (chart1, chart2, chart3) => {
  // ===== 1. 年度趋势 — 面积折线图 =====
  chartInstance1 = echarts.init(chart1.value, undefined, { renderer: 'canvas' })
  chartInstance1.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 22, 48, 0.9)',
      borderColor: 'rgba(0, 247, 255, 0.3)',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: '<b>{b0}</b><br/>📄 分析次数: {c0}',
    },
    grid: { top: '12%', bottom: '18%', left: '10%', right: '6%' },
    xAxis: {
      type: 'category',
      data: annualData.xAxis,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
    },
    series: [{
      data: annualData.series,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      showSymbol: false,
      lineStyle: {
        color: '#00f7ff',
        width: 3,
        shadowColor: 'rgba(0, 247, 255, 0.4)',
        shadowBlur: 10,
      },
      itemStyle: {
        color: '#00f7ff',
        borderColor: '#fff',
        borderWidth: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 247, 255, 0.35)' },
          { offset: 0.5, color: 'rgba(0, 102, 255, 0.15)' },
          { offset: 1, color: 'rgba(0, 102, 255, 0)' },
        ]),
      },
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
        symbol: 'pin',
        symbolSize: 40,
        label: { color: '#fff', fontSize: 10 },
        itemStyle: { color: '#4a90e2' },
      },
    }],
  })

  // ===== 2. 词云 — 中药高频词 =====
  chartInstance2 = echarts.init(chart2.value, undefined, { renderer: 'canvas' })
  const cloudColors = ['#00f7ff', '#4a90e2', '#7c3aed', '#f59e0b', '#f56c6c', '#67c23a', '#e6a23c', '#06b6d4']
  chartInstance2.setOption({
    tooltip: {
      show: true,
      backgroundColor: 'rgba(10, 22, 48, 0.9)',
      borderColor: 'rgba(74, 144, 226, 0.3)',
      textStyle: { color: '#fff' },
      formatter: (p) => `🌿 ${p.name}<br/>频次: ${p.value}`,
    },
    series: [{
      type: 'wordCloud',
      data: herbData,
      shape: 'circle',
      sizeRange: [14, 48],
      rotationRange: [-20, 20],
      rotationStep: 20,
      gridSize: 6,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        color: () => cloudColors[Math.floor(Math.random() * cloudColors.length)],
        fontFamily: 'Microsoft YaHei, sans-serif',
        fontWeight: 'bold',
        emphasis: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 247, 255, 0.5)',
        },
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          fontSize: 56,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 247, 255, 0.6)',
        },
      },
    }],
  })

  // ===== 3. 研究领域分布 — 环形图 =====
  chartInstance3 = echarts.init(chart3.value, undefined, { renderer: 'canvas' })
  chartInstance3.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 22, 48, 0.9)',
      borderColor: 'rgba(74, 144, 226, 0.3)',
      textStyle: { color: '#fff' },
      formatter: '<b>{b}</b><br/>占比: {d}%<br/>论文数: {c}',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: true,
      padAngle: 2,
      itemStyle: {
        borderRadius: 6,
        borderColor: 'rgba(2, 7, 20, 0.6)',
        borderWidth: 2,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
        },
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      data: categoryData.map((item, idx) => ({
        ...item,
        itemStyle: {
          color: [
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#00f7ff' }, { offset: 1, color: '#4a90e2' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#4a90e2' }, { offset: 1, color: '#7c3aed' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#7c3aed' }, { offset: 1, color: '#f59e0b' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#f59e0b' }, { offset: 1, color: '#f56c6c' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#f56c6c' }, { offset: 1, color: '#67c23a' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#67c23a' }, { offset: 1, color: '#06b6d4' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#06b6d4' }, { offset: 1, color: '#4a90e2' }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#4a90e2' }, { offset: 1, color: '#00f7ff' }
            ]),
          ][idx],
        },
      })),
      labelLine: { show: false },
    }],
  })
}

export const destroyCharts = (chart1, chart2, chart3) => {
  chartInstance1?.dispose()
  chartInstance2?.dispose()
  chartInstance3?.dispose()
}

export const handleResize = debounce(() => {
  chartInstance1?.resize()
  chartInstance2?.resize()
  chartInstance3?.resize()
}, 300)
