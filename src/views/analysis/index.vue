<template>
  <div class="analysis-page">
    <div class="container">
      <h2 class="page-title">📊 数据分析</h2>
      <p class="page-desc">基于已解析论文的多维度数据统计与可视化分析</p>

      <!-- 概览统计卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📄</div>
          <div class="stat-body">
            <span class="stat-number">1,284</span>
            <span class="stat-label">论文总数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏷️</div>
          <div class="stat-body">
            <span class="stat-number">3,672</span>
            <span class="stat-label">关键词总数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-body">
            <span class="stat-number">2015-2025</span>
            <span class="stat-label">覆盖年份</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏛️</div>
          <div class="stat-body">
            <span class="stat-number">186</span>
            <span class="stat-label">来源期刊</span>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="chart-grid">
        <div class="chart-card">
          <h3>📈 年度发文趋势</h3>
          <div class="chart-placeholder bar-chart">
            <div class="bar" v-for="(h, idx) in barHeights" :key="idx" :style="{ height: h + '%' }">
              <span class="bar-label">{{ 2025 - (barHeights.length - 1 - idx) }}</span>
            </div>
          </div>
        </div>
        <div class="chart-card">
          <h3>🏆 高频关键词 Top 10</h3>
          <div class="keyword-list">
            <div v-for="(kw, idx) in topKeywords" :key="idx" class="keyword-row">
              <span class="keyword-rank">{{ idx + 1 }}</span>
              <span class="keyword-name">{{ kw.name }}</span>
              <div class="keyword-bar-bg">
                <div class="keyword-bar-fill" :style="{ width: kw.pct + '%' }"></div>
              </div>
              <span class="keyword-count">{{ kw.count }}</span>
            </div>
          </div>
        </div>
        <div class="chart-card wide">
          <h3>🧬 研究领域分布</h3>
          <div class="pie-placeholder">
            <svg viewBox="0 0 200 200" class="pie-svg">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#4a90e2" stroke-width="30" stroke-dasharray="150 502" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#00f7ff" stroke-width="30" stroke-dasharray="100 502" stroke-dashoffset="-150" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#f56c6c" stroke-width="30" stroke-dasharray="80 502" stroke-dashoffset="-250" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#e6a23c" stroke-width="30" stroke-dasharray="70 502" stroke-dashoffset="-330" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#67c23a" stroke-width="30" stroke-dasharray="60 502" stroke-dashoffset="-400" transform="rotate(-90 100 100)" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#909399" stroke-width="30" stroke-dasharray="42 502" stroke-dashoffset="-460" transform="rotate(-90 100 100)" />
            </svg>
            <div class="pie-legend">
              <div v-for="area in researchAreas" :key="area.name" class="legend-item">
                <span class="legend-dot" :style="{ background: area.color }"></span>
                <span>{{ area.name }} ({{ area.pct }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const barHeights = [25, 30, 28, 35, 40, 55, 48, 62, 75, 88, 92]

const topKeywords = [
  { name: '网络药理学', count: 342, pct: 100 },
  { name: '数据挖掘', count: 286, pct: 84 },
  { name: '中医药', count: 251, pct: 73 },
  { name: '方剂配伍', count: 198, pct: 58 },
  { name: 'Meta分析', count: 167, pct: 49 },
  { name: '分子对接', count: 145, pct: 42 },
  { name: '中医体质', count: 123, pct: 36 },
  { name: '活性成分', count: 108, pct: 32 },
  { name: '针灸', count: 92, pct: 27 },
  { name: '临床试验', count: 76, pct: 22 },
]

const researchAreas = [
  { name: '临床研究', pct: '30%', color: '#4a90e2' },
  { name: '方剂配伍', pct: '20%', color: '#00f7ff' },
  { name: '中药化学', pct: '16%', color: '#f56c6c' },
  { name: '针灸推拿', pct: '14%', color: '#e6a23c' },
  { name: '中医理论', pct: '12%', color: '#67c23a' },
  { name: '其他', pct: '8%', color: '#909399' },
]
</script>

<style scoped>
.analysis-page {
  min-height: 100vh;
  background: radial-gradient(circle at center, #0a1630 0%, #020714 100%);
  color: #fff;
  padding-top: 80px;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
.page-title {
  font-size: 2rem;
  color: #00f7ff;
  margin-bottom: 0.5rem;
}
.page-desc {
  color: #aaa;
  margin-bottom: 2rem;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: rgba(16, 24, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 102, 255, 0.2);
}
.stat-icon {
  font-size: 2rem;
}
.stat-body {
  display: flex;
  flex-direction: column;
}
.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00f7ff;
}
.stat-label {
  font-size: 0.85rem;
  color: #888;
  margin-top: 2px;
}

/* 图表卡片 */
.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.chart-card {
  background: rgba(16, 24, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.chart-card:hover {
  box-shadow: 0 10px 20px rgba(0, 102, 255, 0.3);
}
.chart-card.wide {
  grid-column: 1 / -1;
}
.chart-card h3 {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1rem;
}

/* 柱状图占位 */
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 200px;
  padding-top: 20px;
}
.bar {
  flex: 1;
  background: linear-gradient(to top, #4a90e2, #00f7ff);
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 8px;
  transition: all 0.3s ease;
}
.bar:hover {
  opacity: 0.8;
  transform: scaleY(1.02);
  transform-origin: bottom;
}
.bar-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #888;
  white-space: nowrap;
}

/* 关键词列表 */
.keyword-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.keyword-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.keyword-rank {
  width: 20px;
  font-size: 0.85rem;
  color: #888;
  font-weight: bold;
}
.keyword-name {
  width: 100px;
  font-size: 0.9rem;
  color: #ddd;
}
.keyword-bar-bg {
  flex: 1;
  height: 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  overflow: hidden;
}
.keyword-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #00f7ff);
  border-radius: 7px;
  transition: width 0.5s ease;
}
.keyword-count {
  width: 40px;
  text-align: right;
  font-size: 0.85rem;
  color: #6ab7ff;
}

/* 饼图占位 */
.pie-placeholder {
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: center;
}
.pie-svg {
  width: 200px;
  height: 200px;
}
.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #ccc;
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-grid {
    grid-template-columns: 1fr;
  }
}
</style>
