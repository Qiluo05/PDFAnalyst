[English](README.md) | **简体中文**

# 📄 PDFAnalyst - 中医药论文智能分析平台

<div align="center">
  <p><em>面向中医药领域的论文分析与数据可视化平台</em></p>

  [![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
  [![Element Plus](https://img.shields.io/badge/Element%20Plus-2.9-409EFF?logo=element)](https://element-plus.org/)
  [![ECharts](https://img.shields.io/badge/ECharts-5-AA344D?logo=apacheecharts)](https://echarts.apache.org/)
  [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
</div>

---

## 📖 项目简介

**PDFAnalyst** 是一个面向中医药领域的论文分析前端平台，集成 ECharts 数据可视化与中文分词技术，帮助研究人员快速解析论文核心内容、挖掘研究热点与趋势。

> ⚠️ 当前处于前端开发阶段，后端集成与真实 PDF 解析功能正在构建中。

## 🏗 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Vue 3（Composition API + Options API） |
| **构建工具** | Vite 5 |
| **UI 组件库** | Element Plus 2 |
| **路由** | Vue Router 4（HTML5 History 模式） |
| **状态管理** | Vuex 4 |
| **可视化** | ECharts 5, ECharts WordCloud, ECharts GL |
| **动效引擎** | GSAP 3 + ScrollTrigger |
| **3D 引擎** | Three.js |
| **中文分词** | segmentit |
| **工具库** | lodash, file-saver |
| **图标库** | @element-plus/icons-vue |

## ✨ 功能特性

### 🏠 首页看板
- Canvas 粒子动效（星空 + 流星）
- 渐变动画标题与浮动装饰光晕
- GSAP 驱动的统计数字滚动动画
- 4 个特性卡片 + 滚动触发出场动画

### 📊 数据可视化
- **趋势图** — 年度分析次数（渐变面积 + 发光折线 + 极值标注）
- **词云图** — Top 20 高频中药（8 色主题）
- **环形图** — 研究领域分布（渐变扇区）

### 📄 论文全览
- 论文卡片列表（标题 / 作者 / 摘要 / 标签 / 引用数）
- 关键词搜索 + 年份筛选

### ☁️ 词云统计
- 基于 segmentit 的中文智能分词
- ECharts WordCloud 实时渲染
- 可配置：显示数量、7 种颜色主题、7 种词云形状
- 图表与词列表双向联动高亮
- 深色背景 PNG 导出

### 📈 生成 R 图（UI 原型）
- 图表类型选择（散点图 / 折线图 / 箱线图 / 热力图 / 火山图）
- CSV/Excel 文件上传、配色主题选择、轴配置
- 数据点 SVG 预览

### 🎨 设计体系
- 暗色太空主题（径向渐变背景）
- 毛玻璃（Glassmorphism）卡片组件
- GSAP + ScrollTrigger 滚动驱动动画
- 全响应式适配（桌面 / 平板 / 手机）

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
git clone https://github.com/Qisky233/PDFAnalyst.git
cd PDFAnalyst
npm install
npm run dev
```

### 命令说明

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（默认 http://localhost:5173） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建产物 |

## 🗂 项目结构

```
src/
├── main.js                      # 入口：注册 Element Plus、Router、图标
├── App.vue                      # 根组件：顶栏 + 抽屉菜单 + 路由出口
├── style.css                    # 全局样式重置
├── route/index.js               # 5 条路由配置
├── store/index.js               # Vuex 状态管理
├── components/
│   └── navBar/index.vue         # 固定顶部导航栏
├── views/
│   ├── index.vue                # 首页（Hero + 特性 + 数据看板）
│   ├── charts.js                # ECharts 图表初始化
│   ├── particles.js             # Canvas 粒子动画
│   ├── papers/index.vue         # 论文全览
│   ├── analysis/index.vue       # 数据分析
│   ├── wordCloud/index.vue      # 词云统计
│   └── rcharts/index.vue        # 生成 R 图
└── css/wordcloud.css            # 旧版样式（保留）
```

## 🔜 开发计划

- [ ] PDF 文件导入与文本提取
- [ ] 中医药术语标准化处理
- [ ] 关键词提取与趋势分析
- [ ] 后端 API 对接
- [ ] 用户认证系统

## 🤝 贡献指南

欢迎任何形式的贡献！包括但不限于：
- 提出建议或需求
- 反馈 Bug
- 提交代码
- 完善文档

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。
