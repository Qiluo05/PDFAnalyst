<template>
  <div class="wordcloud-page">
    <!-- 装饰光晕 -->
    <div class="deco-glow glow-1"></div>
    <div class="deco-glow glow-2"></div>

    <div class="container">
      <!-- 页面头部 -->
      <div class="page-head">
        <span class="page-badge">☁️ 可视化</span>
        <h2 class="page-title">词云统计</h2>
        <p class="page-desc">粘贴文本，智能分词并生成可视化词云</p>
      </div>

      <div class="main-layout">
        <!-- 左侧：配置面板 -->
        <div ref="configPanelRef" class="config-panel">
          <h3 class="panel-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            文本配置
          </h3>

          <div class="input-wrap">
            <textarea
              v-model="inputText"
              placeholder="将中医药论文文本粘贴到此处，系统将自动进行分词与词频统计..."
              class="glow-textarea"
              rows="8"
            ></textarea>
            <div class="textarea-footer">
              <span class="char-count">{{ inputText.length }} 字符</span>
            </div>
          </div>

          <div class="import-row">
            <button class="btn-import" @click="$message.info('PDF 导入功能开发中')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              导入 PDF
            </button>
          </div>

          <div class="params-grid">
            <div class="param-item">
              <label>显示数量</label>
              <el-select v-model="selectedNumber" class="param-select">
                <el-option v-for="num in numberOptions" :key="num" :label="`前 ${num} 个`" :value="num" />
              </el-select>
            </div>
            <div class="param-item">
              <label>颜色主题</label>
              <el-select v-model="selectedTheme" class="param-select">
                <el-option v-for="t in themes" :key="t.value" :label="t.label" :value="t.value" />
              </el-select>
            </div>
            <div class="param-item">
              <label>词云形状</label>
              <el-select v-model="selectedShape" class="param-select">
                <el-option v-for="s in shapes" :key="s.value" :label="s.label" :value="s.value" />
              </el-select>
            </div>
          </div>

          <div class="actions-row">
            <button class="btn-primary" @click="calculate">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              生成词云
            </button>
            <button class="btn-ghost" @click="exportWordCloud" :disabled="!wordCount.length">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              导出图片
            </button>
          </div>
        </div>

        <!-- 右侧：结果区 -->
        <div ref="resultPanelRef" class="result-panel">
          <!-- 空状态 -->
          <div v-if="!wordCount.length" class="empty-state">
            <div class="empty-icon">
              <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-dasharray="6 4"/>
                <text x="40" y="46" text-anchor="middle" fill="rgba(255,255,255,0.12)" font-size="28">☁️</text>
                <path d="M20 50 Q 20 40 30 40 Q 30 32 40 32 Q 50 32 50 40 Q 60 40 60 50" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
              </svg>
            </div>
            <h3>等待生成词云</h3>
            <p>在左侧输入文本并点击「生成词云」</p>
          </div>

          <!-- 结果内容 -->
          <template v-else>
            <div class="result-tabs">
              <button class="tab-active">词云图</button>
              <button class="tab-inactive">高频词列表</button>
            </div>
            <div class="result-content">
              <div ref="wordcloudChart" class="chart-container"></div>
              <div class="word-list-panel">
                <h3 class="list-title">
                  高频词语
                  <span class="list-count">{{ wordCount.length }} 个</span>
                </h3>
                <div class="list-scroll">
                  <div
                    v-for="([word, count], index) in wordCount"
                    :key="index"
                    class="word-row"
                    :class="{ 'word-row--active': highlightedWord === word }"
                    @mouseenter="highlightWord(word)"
                    @mouseleave="highlightWord(null)"
                  >
                    <span class="word-rank">{{ index + 1 }}</span>
                    <span class="word-name">{{ word }}</span>
                    <div class="word-bar">
                      <div class="word-bar-fill" :style="{ width: (count / maxCount) * 100 + '%' }"></div>
                    </div>
                    <span class="word-count">{{ count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Segment, useDefault } from 'segmentit';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { debounce } from 'lodash';
import { gsap } from 'gsap';

export default {
  name: 'WordCloudPage',
  data() {
    return {
      inputText: '',
      wordCount: [],
      selectedNumber: 20,
      numberOptions: [5, 10, 15, 20, 30, 40, 50],
      selectedTheme: 'random',
      themes: [
        { label: '随机颜色', value: 'random' },
        { label: '莫兰迪色系', value: 'muted' },
        { label: '蓝色系', value: 'blue' },
        { label: '红色系', value: 'red' },
        { label: '绿色系', value: 'green' },
        { label: '暖色系', value: 'warm' },
        { label: '亮色系', value: 'bright' },
      ],
      selectedShape: 'circle',
      shapes: [
        { label: '圆形', value: 'circle' },
        { label: '星形', value: 'star' },
        { label: '正方形', value: 'square' },
        { label: '三角形', value: 'triangle' },
        { label: '菱形', value: 'diamond' },
        { label: '心形', value: 'cardioid' },
        { label: '五边形', value: 'pentagon' },
      ],
      chartInstance: null,
      highlightedWord: null,
    };
  },
  computed: {
    maxCount() {
      return this.wordCount.length ? Math.max(...this.wordCount.map(([, c]) => c)) : 1;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);

    // 入场动画
    gsap.fromTo(this.$refs.configPanelRef, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo(this.$refs.resultPanelRef, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.chartInstance?.dispose();
  },
  methods: {
    calculate() {
      if (!this.inputText.trim()) {
        this.$message.error('请输入要分析的文本');
        return;
      }

      const segment = useDefault(new Segment());
      const words = segment.doSegment(this.inputText, { simple: true });

      const countMap = words.reduce((acc, word) => {
        const trimmed = word.trim();
        if (trimmed && trimmed.length > 1 && /[一-龥]/.test(trimmed)) {
          acc[trimmed] = (acc[trimmed] || 0) + 1;
        }
        return acc;
      }, {});

      this.wordCount = Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, this.selectedNumber);

      this.$nextTick(() => {
        this.updateWordCloud();
      });
    },
    updateWordCloud() {
      if (!this.chartInstance) {
        if (this.$refs.wordcloudChart) {
          this.chartInstance = echarts.init(this.$refs.wordcloudChart);
        } else {
          return;
        }
      }

      const cloudData = this.wordCount.map(([word, count]) => ({
        name: word,
        value: count,
      }));

      const cloudColors = ['#00f7ff', '#4a90e2', '#7c3aed', '#f59e0b', '#f56c6c', '#67c23a', '#06b6d4', '#e6a23c'];

      const option = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(10, 22, 48, 0.9)',
          borderColor: 'rgba(74, 144, 226, 0.3)',
          textStyle: { color: '#fff' },
          formatter: (p) => `📄 ${p.name}<br/>频次: ${p.value}`,
        },
        series: [{
          type: 'wordCloud',
          data: cloudData,
          shape: this.selectedShape,
          sizeRange: [14, 52],
          rotationRange: [-15, 15],
          rotationStep: 15,
          gridSize: 6,
          layoutAnimation: true,
          textStyle: {
            color: this.getColorFunction(cloudColors),
            fontFamily: 'Microsoft YaHei, sans-serif',
            fontWeight: 'bold',
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(0, 247, 255, 0.4)',
            },
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 247, 255, 0.5)',
            },
          },
        }],
      };

      this.chartInstance.clear();
      this.chartInstance.setOption(option);
      this.chartInstance.resize();
      this.chartInstance.on('mouseover', (params) => {
        this.highlightWord(params.name);
      });
      this.chartInstance.on('mouseout', () => {
        this.highlightWord(null);
      });
    },
    getColorFunction(cloudColors) {
      const theme = this.selectedTheme;
      switch (theme) {
        case 'random':
          return () => cloudColors[Math.floor(Math.random() * cloudColors.length)];
        case 'blue':
          return () => `hsl(${180 + Math.random() * 90}, 70%, 55%)`;
        case 'red':
          return () => `hsl(${Math.random() * 30}, 70%, 55%)`;
        case 'green':
          return () => `hsl(${90 + Math.random() * 90}, 70%, 50%)`;
        case 'warm':
          return () => `hsl(${20 + Math.random() * 60}, 70%, 55%)`;
        case 'bright':
          return () => `hsl(${Math.random() * 360}, 80%, 65%)`;
        case 'muted':
          const muted = ['#a3b7a0', '#d6c7d9', '#e8d9d0', '#c8bfd0', '#b2c3b3', '#b1c2d6', '#c8d5d4', '#dfd6d7', '#c2d2b5'];
          return () => muted[Math.floor(Math.random() * muted.length)];
        default:
          return () => cloudColors[Math.floor(Math.random() * cloudColors.length)];
      }
    },
    handleResize: debounce(function () {
      this.chartInstance?.resize();
    }, 300),
    highlightWord(word) {
      this.highlightedWord = word;
      if (this.chartInstance) {
        this.chartInstance.dispatchAction({ type: 'downplay' });
        if (word) {
          this.chartInstance.dispatchAction({ type: 'highlight', name: word });
        }
      }
    },
    exportWordCloud() {
      if (!this.chartInstance) {
        this.$message.error('请先生成词云');
        return;
      }
      const url = this.chartInstance.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: 'rgba(10, 22, 48, 0.95)',
      });
      const link = document.createElement('a');
      link.href = url;
      link.download = 'wordcloud.png';
      link.click();
      this.$message.success('词云图片已导出');
    },
  },
};
</script>

<style scoped>
.wordcloud-page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at 20% 30%, #0a1630 0%, #020714 100%);
  color: #fff;
  padding-top: 80px;
  overflow-x: hidden;
}

/* 装饰光晕 */
.deco-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
.glow-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.15), transparent);
  top: 10%; right: -10%;
}
.glow-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12), transparent);
  bottom: 10%; left: -5%;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* ===== 页面头部 ===== */
.page-head {
  text-align: center;
  margin-bottom: 3rem;
}
.page-badge {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0, 247, 255, 0.6);
  background: rgba(0, 247, 255, 0.08);
  border: 1px solid rgba(0, 247, 255, 0.15);
  padding: 4px 16px;
  border-radius: 999px;
  margin-bottom: 1rem;
}
.page-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #00f7ff, #4a90e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.6rem;
}
.page-desc {
  color: rgba(255, 255, 255, 0.45);
  font-size: 1rem;
}

/* ===== 双栏布局 ===== */
.main-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* ===== 左侧配置面板 ===== */
.config-panel {
  background: rgba(16, 24, 48, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.5rem;
}
.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* 文本框 */
.input-wrap {
  margin-bottom: 1.2rem;
}
.glow-textarea {
  width: 100%;
  padding: 14px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  font-family: inherit;
}
.glow-textarea:focus {
  outline: none;
  border-color: rgba(74, 144, 226, 0.4);
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.06);
}
.glow-textarea::placeholder {
  color: rgba(255, 255, 255, 0.2);
}
.textarea-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}
.char-count {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
}

/* 导入按钮 */
.import-row {
  margin-bottom: 1rem;
}
.btn-import {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.2rem;
  background: rgba(245, 158, 11, 0.08);
  border: 1px dashed rgba(245, 158, 11, 0.25);
  border-radius: 12px;
  color: rgba(245, 158, 11, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-import:hover {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.4);
  color: #f59e0b;
}

/* 参数 */
.params-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1.2rem;
}
.param-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.param-item label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
}
.param-select {
  width: 180px;
}

/* 按钮 */
.actions-row {
  display: flex;
  gap: 10px;
}
.btn-primary {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4a90e2, #7c3aed);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.25);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(74, 144, 226, 0.35);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-ghost:hover:not(:disabled) {
  border-color: rgba(74, 144, 226, 0.3);
  color: #6ab7ff;
}
.btn-ghost:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ===== 右侧结果面板 ===== */
.result-panel {
  background: rgba(16, 24, 48, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.5rem;
  min-height: 500px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}
.empty-icon {
  margin-bottom: 1.2rem;
  opacity: 0.6;
}
.empty-state h3 {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.5rem;
}
.empty-state p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.2);
}

/* 结果标签 */
.result-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.tab-active {
  padding: 6px 20px;
  background: rgba(74, 144, 226, 0.15);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  color: #6ab7ff;
  font-size: 0.85rem;
  cursor: pointer;
}
.tab-inactive {
  padding: 6px 20px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.85rem;
  cursor: pointer;
}

/* 结果内容区 */
.result-content {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.5rem;
  min-height: 450px;
}
.chart-container {
  height: 480px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
}

/* 词列表 */
.word-list-panel {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 1rem;
}
.list-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.list-count {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: normal;
}
.list-scroll {
  max-height: 390px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.05) transparent;
}
.list-scroll::-webkit-scrollbar {
  width: 4px;
}
.list-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
}

.word-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 6px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: default;
}
.word-row:hover,
.word-row--active {
  background: rgba(74, 144, 226, 0.08);
}
.word-rank {
  width: 22px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 600;
  text-align: right;
  flex-shrink: 0;
}
.word-name {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  flex-shrink: 0;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.word-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
}
.word-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #00f7ff);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.word-count {
  width: 32px;
  text-align: right;
  font-size: 0.8rem;
  color: rgba(0, 247, 255, 0.7);
  font-weight: 600;
  flex-shrink: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 960px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
  .result-content {
    grid-template-columns: 1fr;
  }
  .chart-container {
    height: 360px;
  }
  .list-scroll {
    max-height: 250px;
  }
}
@media (max-width: 600px) {
  .params-grid {
    flex-direction: column;
  }
  .param-item {
    flex-direction: column;
    align-items: stretch;
  }
  .param-select {
    width: 100%;
  }
  .actions-row {
    flex-direction: column;
  }
}
</style>
