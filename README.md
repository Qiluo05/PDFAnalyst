**English** | [简体中文](README-zh.md)

# 📄 PDFAnalyst

<div align="center">
  <p><em>Traditional Chinese Medicine Paper Analysis Platform</em></p>

  [![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
  [![Element Plus](https://img.shields.io/badge/Element%20Plus-2.9-409EFF?logo=element)](https://element-plus.org/)
  [![ECharts](https://img.shields.io/badge/ECharts-5-AA344D?logo=apacheecharts)](https://echarts.apache.org/)
  [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
</div>

## 📖 Overview

**PDFAnalyst** is a front-end analysis platform designed for the Traditional Chinese Medicine (TCM) research domain. It helps researchers quickly parse core content of papers, explore research hotspots and trends through intelligent word segmentation and multi-dimensional data visualization.

> ⚠️ **Note**: This project is currently in the early development stage, focusing on front-end UI/UX. Backend integration and real PDF parsing are under development.

## 🏗 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Vue 3 (Composition API + Options API) |
| **Build Tool** | Vite 5 |
| **UI Library** | Element Plus 2 |
| **Router** | Vue Router 4 (HTML5 History) |
| **State** | Vuex 4 |
| **Charts** | ECharts 5, ECharts WordCloud, ECharts GL |
| **Animation** | GSAP 3 + ScrollTrigger |
| **3D** | Three.js |
| **Text Analysis** | segmentit (Chinese word segmentation) |
| **Utilities** | lodash, file-saver |
| **Icons** | @element-plus/icons-vue |

## ✨ Features

### 🏠 Dashboard
- Canvas particle animation (starry sky with meteor effects)
- Animated hero section with gradient title and floating geometric decorations
- Statistics counter animation powered by GSAP
- Feature cards with scroll-triggered entrance animations

### 📊 Data Visualization
- **Trend Chart** — Annual analysis count with gradient area and glow effects
- **Word Cloud** — Top 20 high-frequency TCM herbs with multiple color themes
- **Ring Chart** — Research field distribution with gradient segments

### 📄 Paper Overview
- Paper card grid with title, authors, abstract, and tags
- Search and year filter functionality

### ☁️ Word Cloud Generator
- Chinese word segmentation using segmentit library
- Real-time word cloud rendering via ECharts WordCloud
- Configurable: display count, color themes (7 options), cloud shapes (7 options)
- Bidirectional highlighting between chart and word list
- PNG image export with dark background

### 📈 R Chart Generator (UI Prototype)
- Chart type selection (Scatter, Line, Boxplot, Heatmap, Volcano)
- File upload, color theme picker, axis configuration
- SVG preview with interactive data points

### 🎨 Design System
- Dark space-themed UI with radial gradient backgrounds
- Glassmorphism (frosted glass) card components
- Smooth scroll-triggered animations (GSAP + ScrollTrigger)
- Fully responsive (desktop + tablet + mobile)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/Qisky233/PDFAnalyst.git
cd PDFAnalyst
npm install
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (default http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🗂 Project Structure

```
src/
├── main.js                      # App entry: register Element Plus, Router, Icons
├── App.vue                      # Root: NavBar + Drawer + RouterView
├── style.css                    # Global reset
├── route/index.js               # 5 routes
├── store/index.js               # Vuex store
├── components/
│   └── navBar/index.vue         # Fixed top navigation
├── views/
│   ├── index.vue                # Homepage (Hero + Features + Charts)
│   ├── charts.js                # ECharts init (trend line, word cloud, ring)
│   ├── particles.js             # Canvas stars + meteor animation
│   ├── papers/index.vue         # Paper overview with search
│   ├── analysis/index.vue       # Data analysis dashboard
│   ├── wordCloud/index.vue      # Word cloud generator
│   └── rcharts/index.vue        # R chart generator prototype
└── css/wordcloud.css            # Legacy styles
```

## 🔜 Roadmap

- [ ] PDF file import and text extraction
- [ ] TCM terminology standardization processing
- [ ] Keyword extraction and trend analysis
- [ ] Real backend API integration
- [ ] User authentication system

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a PR.

## 📄 License

This project is [MIT](LICENSE) licensed.
