<template>
  <div class="dashboard">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>

    <div class="container">
      <!-- ========== HERO 区域 ========== -->
      <section ref="heroRef" class="hero">
        <!-- 装饰几何体 -->
        <div class="deco-geo deco-1"></div>
        <div class="deco-geo deco-2"></div>
        <div class="deco-geo deco-3"></div>
        <div class="deco-geo deco-4"></div>

        <div class="hero-badge">
          <span class="badge-dot"></span>
          中医药智能分析平台
        </div>

        <h1 class="hero-title">
          <span class="gradient-text">PDFAnalyst</span>
        </h1>

        <p class="hero-subtitle">
          面向中医药领域复杂的术语体系，集成常用中医药数据库，<br class="hide-mobile">
          快速解析论文核心内容，挖掘研究热点与趋势
        </p>

        <div class="hero-actions">
          <el-button class="btn-primary" @click="go('/papers')">
            <el-icon style="margin-right:6px"><Promotion /></el-icon>
            开始使用
          </el-button>
          <el-button class="btn-ghost" @click="go('/analysis')">
            探索数据
            <el-icon style="margin-left:6px"><ArrowRight /></el-icon>
          </el-button>
        </div>

        <!-- 快速统计 -->
        <div class="hero-stats">
          <div class="hero-stat-item">
            <span class="hero-stat-num" ref="stat1">0</span>
            <span class="hero-stat-label">论文解析</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat-item">
            <span class="hero-stat-num" ref="stat2">0</span>
            <span class="hero-stat-label">关键词提取</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat-item">
            <span class="hero-stat-num" ref="stat3">0</span>
            <span class="hero-stat-label">可视化图表</span>
          </div>
        </div>

        <!-- 下滚提示 -->
        <div class="scroll-hint">
          <span class="scroll-text">向下滚动</span>
          <div class="scroll-arrow"></div>
        </div>
      </section>

      <!-- ========== 特性区域 ========== -->
      <section ref="featuresRef" class="features">
        <h2 class="section-title">核心特性</h2>
        <p class="section-desc">为中医药科研打造的轻量高效分析工具</p>

        <div class="features-grid">
          <div v-for="(feat, idx) in features" :key="idx" class="feature-card" :style="{ transitionDelay: idx * 0.1 + 's' }">
            <div class="feature-icon" v-html="feat.icon"></div>
            <h3>{{ feat.title }}</h3>
            <p>{{ feat.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ========== 数据看板 ========== -->
      <section ref="chartsRef" id="charts" class="charts">
        <div class="section-header">
          <span class="section-badge">📊 可视化</span>
          <h2 class="section-title">数据看板</h2>
          <p class="section-desc">平台数据多维可视化概览，洞察研究趋势</p>
        </div>

        <div class="charts-grid">
          <div class="chart-card chart-card--primary echart1">
            <div class="chart-card-glow"></div>
            <div class="chart-card-inner">
              <div class="chart-header">
                <div class="chart-header-left">
                  <div class="chart-icon-area">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <div>
                    <h3>分析次数趋势</h3>
                    <span class="chart-subtitle">2018 — 2025 年度统计</span>
                  </div>
                </div>
                <span class="chart-tag">
                  <span class="tag-dot"></span>
                  年度
                </span>
              </div>
              <div ref="chart1" class="chart"></div>
            </div>
          </div>

          <div class="chart-card chart-card--secondary echart2">
            <div class="chart-card-glow"></div>
            <div class="chart-card-inner">
              <div class="chart-header">
                <div class="chart-header-left">
                  <div class="chart-icon-area">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <div>
                    <h3>高频中药词云</h3>
                    <span class="chart-subtitle">Top 20 中药频次</span>
                  </div>
                </div>
                <span class="chart-tag">
                  <span class="tag-dot"></span>
                  词云
                </span>
              </div>
              <div ref="chart2" class="chart"></div>
            </div>
          </div>

          <div class="chart-card chart-card--tertiary echart3">
            <div class="chart-card-glow"></div>
            <div class="chart-card-inner">
              <div class="chart-header">
                <div class="chart-header-left">
                  <div class="chart-icon-area">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 6a6 6 0 0 1 6 6"/></svg>
                  </div>
                  <div>
                    <h3>研究领域分布</h3>
                    <span class="chart-subtitle">各方向论文占比</span>
                  </div>
                </div>
                <span class="chart-tag">
                  <span class="tag-dot"></span>
                  占比
                </span>
              </div>
              <div ref="chart3" class="chart"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== Footer ========== -->
      <footer class="footer">
        <p>基于 PDF 的论文分析平台（中医药方向）</p>
        <p class="footer-sub">PDFAnalyst &copy; 2025</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initParticles, destroyParticles } from './particles';
import { initCharts, destroyCharts, handleResize } from './charts';
import { Promotion, ArrowRight } from '@element-plus/icons-vue';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const go = (path) => router.push(path);

// Refs
const canvasRef = ref(null);
const heroRef = ref(null);
const featuresRef = ref(null);
const chartsRef = ref(null);
const chart1 = ref(null);
const chart2 = ref(null);
const chart3 = ref(null);
const stat1 = ref(null);
const stat2 = ref(null);
const stat3 = ref(null);

// 特性数据
const features = [
  {
    icon: '<svg viewBox="0 0 48 48" fill="none" width="48" height="48"><path d="M24 4L30 14H42L34 22L38 34L28 28L18 34L22 22L14 14H26L24 4Z" fill="currentColor" opacity="0.9"/></svg>',
    title: '轻量便捷',
    desc: '核心代码精简，资源占用低，无需复杂配置即可快速部署和使用'
  },
  {
    icon: '<svg viewBox="0 0 48 48" fill="none" width="48" height="48"><rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" stroke-width="3" fill="none"/><path d="M16 22L22 28L32 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    title: '功能简洁',
    desc: '聚焦核心功能，避免冗余设计，提供直观易用的操作界面'
  },
  {
    icon: '<svg viewBox="0 0 48 48" fill="none" width="48" height="48"><circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="3" fill="none"/><path d="M24 14V24L30 30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="24" r="4" fill="currentColor"/></svg>',
    title: '智能解析',
    desc: '集成中医药数据库，快速解析论文核心内容与术语体系'
  },
  {
    icon: '<svg viewBox="0 0 48 48" fill="none" width="48" height="48"><path d="M6 36L16 26L24 34L34 20L42 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="14" r="4" fill="currentColor"/></svg>',
    title: '数据可视化',
    desc: '词云、趋势图、分布图等多种可视化方式，多维度呈现分析结果'
  },
];

// 统计数字动画
const animateStats = () => {
  gsap.to(stat1.value, { duration: 2, innerText: 1284, snap: 'innerText', ease: 'power2.out' });
  gsap.to(stat2.value, { duration: 2.3, innerText: 3672, snap: 'innerText', ease: 'power2.out', delay: 0.1 });
  gsap.to(stat3.value, { duration: 2.6, innerText: 89, snap: 'innerText', ease: 'power2.out', delay: 0.2 });
};

onMounted(() => {
  // 初始化粒子
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value);
  }

  // 初始化图表
  initCharts(chart1, chart2, chart3);
  window.addEventListener('resize', handleResize);

  // GSAP 入场动画
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Hero 动画
  tl.fromTo('.hero-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    .fromTo('.gradient-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
    .fromTo('.hero-actions', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
    .fromTo('.hero-stats', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
    .fromTo('.scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2')
    .call(() => animateStats());

  // 特性卡片滚动动画
  gsap.fromTo(
    '.feature-card',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: featuresRef.value, start: 'top 80%', toggleActions: 'play none none reverse' },
    }
  );

  // 图表卡片滚动动画
  gsap.fromTo(
    '.chart-card',
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: chartsRef.value, start: 'top 80%', toggleActions: 'play none none reverse' },
    }
  );
});

onUnmounted(() => {
  destroyParticles();
  destroyCharts(chart1, chart2, chart3);
  window.removeEventListener('resize', handleResize);
  ScrollTrigger.getAll().forEach(t => t.kill());
});

const handleCardHover = () => {};
</script>

<style scoped>
/* ===== 全局 ===== */
.dashboard {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at 30% 20%, #0a1630 0%, #020714 100%);
  color: #fff;
  overflow-x: hidden;
}
.particle-canvas {
  position: fixed;
  top: 0; left: 0;
  z-index: 0;
  pointer-events: none;
}
.container {
  position: relative;
  z-index: 1;
}

/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  overflow: hidden;
}

/* 装饰几何体 */
.deco-geo {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  pointer-events: none;
}
.deco-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #4a90e2, transparent);
  top: -10%; left: -10%;
  animation: floatA 12s ease-in-out infinite alternate;
}
.deco-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #00f7ff, transparent);
  bottom: 10%; right: -5%;
  animation: floatB 15s ease-in-out infinite alternate;
}
.deco-3 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, #7c3aed, transparent);
  top: 30%; right: 15%;
  animation: floatA 10s ease-in-out infinite alternate-reverse;
}
.deco-4 {
  width: 150px; height: 150px;
  background: radial-gradient(circle, #f59e0b, transparent);
  bottom: 20%; left: 20%;
  animation: floatB 8s ease-in-out infinite alternate;
}
@keyframes floatA {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, -30px) scale(1.1); }
}
@keyframes floatB {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-30px, 40px) scale(1.15); }
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(106, 183, 255, 0.12);
  border: 1px solid rgba(106, 183, 255, 0.25);
  border-radius: 999px;
  padding: 6px 20px;
  font-size: 0.85rem;
  color: #6ab7ff;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  backdrop-filter: blur(4px);
}
.badge-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #00f7ff;
  box-shadow: 0 0 12px #00f7ff;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* 标题 */
.hero-title {
  margin-bottom: 1.5rem;
}
.gradient-text {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #00f7ff 0%, #4a90e2 40%, #7c3aed 70%, #f59e0b 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 6s ease-in-out infinite alternate;
  letter-spacing: -2px;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 副标题 */
.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.65);
  max-width: 700px;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

/* 按钮 */
.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
}
.btn-primary {
  background: linear-gradient(135deg, #4a90e2, #7c3aed) !important;
  border: none !important;
  color: #fff !important;
  font-size: 1rem;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(74, 144, 226, 0.35);
}
.btn-primary:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 12px 40px rgba(74, 144, 226, 0.5);
}
.btn-ghost {
  background: transparent !important;
  border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
  color: #fff !important;
  font-size: 1rem;
  padding: 0.85rem 2rem;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  border-color: #4a90e2 !important;
  background: rgba(74, 144, 226, 0.1) !important;
  transform: translateY(-3px);
}

/* 快速统计 */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 3rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin-bottom: 4rem;
}
.hero-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-stat-num {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00f7ff, #4a90e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}
.hero-stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

/* 下滚提示 */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: bounceY 2.5s ease-in-out infinite;
}
.scroll-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.scroll-arrow {
  width: 16px; height: 16px;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  transform: rotate(45deg);
}
@keyframes bounceY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* ===== 通用章节 ===== */
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #00f7ff, #4a90e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.8rem;
}
.section-desc {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  margin-bottom: 3rem;
}

/* ===== 特性区域 ===== */
.features {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.feature-card {
  background: rgba(16, 24, 48, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(60px);
}
.feature-card:hover {
  transform: translateY(-8px) !important;
  border-color: rgba(74, 144, 226, 0.3);
  box-shadow: 0 20px 60px rgba(0, 102, 255, 0.15);
  background: rgba(16, 24, 48, 0.8);
}
.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a90e2;
  transition: color 0.3s ease;
}
.feature-card:hover .feature-icon {
  color: #00f7ff;
}
.feature-card h3 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.6rem;
}
.feature-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
}

/* ===== 数据看板 ===== */
.charts {
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-badge {
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

.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* 图表卡片 — 发光边框 + 毛玻璃 */
.chart-card {
  position: relative;
  border-radius: 20px;
  min-height: 440px;
  opacity: 0;
  transform: translateY(60px);
  overflow: hidden;
}
.chart-card-glow {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.chart-card--primary .chart-card-glow {
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.15), rgba(74, 144, 226, 0.05));
  box-shadow: 0 0 60px rgba(0, 247, 255, 0.08);
}
.chart-card--secondary .chart-card-glow {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(74, 144, 226, 0.05));
  box-shadow: 0 0 60px rgba(124, 58, 237, 0.08);
}
.chart-card--tertiary .chart-card-glow {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 108, 108, 0.05));
  box-shadow: 0 0 60px rgba(245, 158, 11, 0.08);
}
.chart-card:hover .chart-card-glow {
  opacity: 1;
}
.chart-card-inner {
  position: relative;
  z-index: 1;
  background: rgba(16, 24, 48, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.5rem;
  height: 100%;
  transition: all 0.4s ease;
}
.chart-card--primary:hover .chart-card-inner {
  border-color: rgba(0, 247, 255, 0.2);
}
.chart-card--secondary:hover .chart-card-inner {
  border-color: rgba(124, 58, 237, 0.2);
}
.chart-card--tertiary:hover .chart-card-inner {
  border-color: rgba(245, 158, 11, 0.2);
}

/* 图表头部 */
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}
.chart-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.chart-icon-area {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.chart-card--primary .chart-icon-area {
  background: rgba(0, 247, 255, 0.12);
  color: #00f7ff;
}
.chart-card--secondary .chart-icon-area {
  background: rgba(124, 58, 237, 0.12);
  color: #7c3aed;
}
.chart-card--tertiary .chart-icon-area {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}
.chart-header h3 {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}
.chart-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
}
.chart-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.65rem;
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  margin-top: 2px;
}
.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #00f7ff;
  animation: pulse-dot 2s ease-in-out infinite;
}
.chart {
  height: 340px;
  width: 100%;
}

@media (max-width: 768px) {
  .chart {
    height: 280px;
  }
}

/* ===== Footer ===== */
.footer {
  text-align: center;
  padding: 3rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.footer p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}
.footer-sub {
  font-size: 0.75rem;
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.25);
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .charts-grid {
    grid-template-columns: 1fr;
  }
  .hero-stats {
    gap: 2rem;
    padding: 1.2rem 2rem;
  }
  .hero-stat-num { font-size: 1.5rem; }
  .hide-mobile { display: none; }
}
@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }
  .hero-stats {
    gap: 1.2rem;
    padding: 1rem 1.5rem;
  }
}
</style>
