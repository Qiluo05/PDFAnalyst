<template>
  <div class="rcharts-page">
    <div class="container">
      <h2 class="page-title">📈 生成 R 图</h2>
      <p class="page-desc">配置参数并生成专业级别的 R 语言统计图表</p>

      <div class="rcharts-layout">
        <!-- 左侧配置面板 -->
        <div class="config-panel">
          <h3>⚙️ 图表配置</h3>

          <div class="form-group">
            <label>图表类型</label>
            <el-select v-model="chartType" class="full-width">
              <el-option label="散点图 (Scatter)" value="scatter" />
              <el-option label="折线图 (Line)" value="line" />
              <el-option label="箱线图 (Boxplot)" value="boxplot" />
              <el-option label="热力图 (Heatmap)" value="heatmap" />
              <el-option label="火山图 (Volcano)" value="volcano" />
            </el-select>
          </div>

          <div class="form-group">
            <label>数据文件</label>
            <el-upload class="upload-area" drag multiple :auto-upload="false">
              <el-icon class="upload-icon"><UploadFilled /></el-icon>
              <div class="upload-text">拖拽 CSV / Excel 文件到此处</div>
              <template #tip>
                <div class="upload-tip">支持 .csv, .xlsx 格式，最大 10MB</div>
              </template>
            </el-upload>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label>X 轴列</label>
              <el-select v-model="xCol" class="full-width">
                <el-option label="未选择" value="" />
              </el-select>
            </div>
            <div class="form-group half">
              <label>Y 轴列</label>
              <el-select v-model="yCol" class="full-width">
                <el-option label="未选择" value="" />
              </el-select>
            </div>
          </div>

          <div class="form-group">
            <label>图表标题</label>
            <el-input v-model="chartTitle" placeholder="输入图表标题..." />
          </div>

          <div class="form-group">
            <label>配色主题</label>
            <div class="theme-selector">
              <div v-for="t in themes" :key="t.value" class="theme-option" :class="{ active: selectedTheme === t.value }" @click="selectedTheme = t.value">
                <div class="theme-preview">
                  <span v-for="c in t.colors" :key="c" :style="{ background: c }"></span>
                </div>
                <span>{{ t.label }}</span>
              </div>
            </div>
          </div>

          <el-button type="primary" class="generate-btn" @click="generateChart">
            🚀 生成图表
          </el-button>
        </div>

        <!-- 右侧预览区域 -->
        <div class="preview-panel">
          <h3>👁️ 图表预览</h3>
          <div class="preview-area">
            <svg viewBox="0 0 500 350" class="preview-svg">
              <!-- 坐标轴 -->
              <line x1="60" y1="280" x2="480" y2="280" stroke="#555" stroke-width="2" />
              <line x1="60" y1="280" x2="60" y2="20" stroke="#555" stroke-width="2" />
              <!-- 数据点 -->
              <circle v-for="(pt, idx) in scatterData" :key="idx" :cx="pt.x" :cy="pt.y" r="4" :fill="pt.color" opacity="0.8" />
              <!-- 趋势线 -->
              <polyline :points="trendLine" fill="none" stroke="#00f7ff" stroke-width="2" stroke-dasharray="5,3" opacity="0.6" />
              <!-- 轴标签 -->
              <text x="250" y="320" text-anchor="middle" fill="#888" font-size="12">{{ chartType === 'volcano' ? 'Log₂(Fold Change)' : 'X 轴变量' }}</text>
              <text x="20" y="150" text-anchor="middle" fill="#888" font-size="12" transform="rotate(-90 20 150)">{{ chartType === 'volcano' ? '-Log₁₀(P-value)' : 'Y 轴变量' }}</text>
            </svg>
          </div>
          <div class="preview-info">
            <span>📊 {{ chartTypeLabel }} · {{ scatterData.length }} 个数据点</span>
            <el-button size="small" plain @click="exportChart">导出图片</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const chartType = ref('scatter')
const xCol = ref('')
const yCol = ref('')
const chartTitle = ref('')
const selectedTheme = ref('ocean')

const chartTypeLabel = computed(() => {
  const map = { scatter: '散点图', line: '折线图', boxplot: '箱线图', heatmap: '热力图', volcano: '火山图' }
  return map[chartType.value] || '散点图'
})

const themes = [
  { label: '海洋', value: 'ocean', colors: ['#00f7ff', '#4a90e2', '#2b5f8a'] },
  { label: '火焰', value: 'fire', colors: ['#f56c6c', '#e6a23c', '#f9d71c'] },
  { label: '森林', value: 'forest', colors: ['#67c23a', '#4fa83d', '#2d7d2d'] },
  { label: '星空', value: 'night', colors: ['#7c3aed', '#3b82f6', '#06b6d4'] },
]

const scatterData = ref([])
const trendLine = ref('')

const generateRandomData = () => {
  const points = []
  let ptsStr = ''
  for (let i = 0; i < 30; i++) {
    const x = 80 + Math.random() * 380
    const y = 250 - Math.random() * 200
    const hue = 180 + Math.random() * 60
    points.push({ x, y, color: `hsl(${hue}, 70%, 55%)` })
    ptsStr += `${x},${y} `
  }
  scatterData.value = points
  trendLine.value = ptsStr
}

const generateChart = () => {
  generateRandomData()
  ElMessage.success('图表生成成功！')
}

const exportChart = () => {
  ElMessage.info('图表已导出为 PNG 格式')
}

generateRandomData()
</script>

<style scoped>
.rcharts-page {
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

.rcharts-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 2rem;
  align-items: start;
}

/* 配置面板 */
.config-panel {
  background: rgba(16, 24, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
}
.config-panel h3 {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1.2rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 6px;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.half {
  flex: 1;
}
.full-width {
  width: 100%;
}

/* 上传 */
.upload-area {
  width: 100%;
}
.upload-icon {
  font-size: 2rem;
  color: #6ab7ff;
}
.upload-text {
  color: #ccc;
  font-size: 0.9rem;
}
.upload-tip {
  color: #888;
  font-size: 0.75rem;
  margin-top: 4px;
}

/* 主题选择 */
.theme-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.theme-option {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  font-size: 0.8rem;
  color: #aaa;
}
.theme-option.active {
  border-color: #00f7ff;
  box-shadow: 0 0 10px rgba(0, 247, 255, 0.2);
}
.theme-option:hover {
  border-color: #6ab7ff;
}
.theme-preview {
  display: flex;
  gap: 3px;
  justify-content: center;
  margin-bottom: 4px;
}
.theme-preview span {
  width: 16px;
  height: 8px;
  border-radius: 4px;
}

.generate-btn {
  width: 100%;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #6ab7ff, #4a90e2);
  border: none;
  font-size: 1rem;
  padding: 0.7rem;
}

/* 预览面板 */
.preview-panel {
  background: rgba(16, 24, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
}
.preview-panel h3 {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1rem;
}
.preview-area {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 1rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-svg {
  width: 100%;
  max-width: 500px;
}
.preview-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  color: #888;
  font-size: 0.85rem;
}

@media (max-width: 900px) {
  .rcharts-layout {
    grid-template-columns: 1fr;
  }
}
</style>
