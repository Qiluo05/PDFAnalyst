<template>
  <div class="papers-page">
    <div class="container">
      <h2 class="page-title">📄 论文全览</h2>
      <p class="page-desc">浏览已解析的中医药领域论文，快速定位核心内容</p>

      <!-- 搜索与筛选 -->
      <div class="toolbar">
        <el-input v-model="searchQuery" placeholder="搜索论文标题、关键词..." class="search-input" clearable />
        <el-select v-model="filterYear" placeholder="筛选年份" class="filter-select">
          <el-option v-for="y in years" :key="y" :label="y" :value="y" />
        </el-select>
      </div>

      <!-- 论文列表 -->
      <div class="paper-grid">
        <div v-for="(paper, idx) in filteredPapers" :key="idx" class="paper-card">
          <div class="paper-header">
            <span class="paper-badge">{{ paper.year }}</span>
            <span class="paper-source">{{ paper.source }}</span>
          </div>
          <h3 class="paper-title">{{ paper.title }}</h3>
          <p class="paper-authors">{{ paper.authors }}</p>
          <p class="paper-abstract">{{ paper.abstract }}</p>
          <div class="paper-tags">
            <el-tag v-for="tag in paper.tags" :key="tag" size="small" class="tag">{{ tag }}</el-tag>
          </div>
          <div class="paper-footer">
            <span class="paper-citations">📊 {{ paper.citations }} 引用</span>
            <el-button size="small" type="primary" plain @click="viewPaper(paper)">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const searchQuery = ref('')
const filterYear = ref('')

const years = ['全部', '2025', '2024', '2023', '2022', '2021']

const papers = ref([
  {
    title: '基于深度学习的中医方剂配伍规律挖掘方法研究',
    authors: '张明伟, 李芳, 王建国',
    abstract: '目的：探索利用深度学习技术挖掘中医方剂配伍规律的新方法。方法：构建基于注意力机制的方剂序列模型，对《伤寒论》等经典著作中的方剂进行建模分析。结果：模型能够有效识别核心药对与配伍模式。',
    year: '2025',
    source: '中医杂志',
    citations: 23,
    tags: ['方剂配伍', '深度学习', '数据挖掘']
  },
  {
    title: '中药活性成分对COVID-19靶点的分子对接研究',
    authors: '陈思远, 赵敏, 刘洋',
    abstract: '利用分子对接技术筛选中药活性成分与SARS-CoV-2主要蛋白酶的结合能力，发现黄芩素、甘草酸等成分具有较高的结合亲和力，为中药抗COVID-19提供理论依据。',
    year: '2024',
    source: '中国中药杂志',
    citations: 156,
    tags: ['COVID-19', '分子对接', '中药活性成分']
  },
  {
    title: '基于网络药理学探讨黄连解毒汤治疗糖尿病的机制',
    authors: '林小红, 周伟, 黄丽华',
    abstract: '采用网络药理学方法分析黄连解毒汤治疗糖尿病的潜在作用靶点与信号通路，预测其可能通过调控PI3K/Akt、AMPK等信号通路发挥降糖作用。',
    year: '2024',
    source: '中草药',
    citations: 89,
    tags: ['网络药理学', '糖尿病', '黄连解毒汤']
  },
  {
    title: '针灸治疗失眠症的随机对照试验Meta分析',
    authors: '孙志强, 吴倩, 郑明',
    abstract: '系统评价针灸治疗失眠症的疗效与安全性，检索国内外数据库收集随机对照试验，进行Meta分析。结果表明针灸组总有效率优于对照组。',
    year: '2023',
    source: '中国针灸',
    citations: 67,
    tags: ['针灸', '失眠', 'Meta分析']
  },
  {
    title: '基于UPLC-Q-TOF-MS技术的当归补血汤化学成分分析',
    authors: '杨雪, 韩冰, 高建国',
    abstract: '采用超高效液相色谱-四极杆-飞行时间质谱联用技术对当归补血汤中的化学成分进行快速鉴定，共鉴定出86个化合物。',
    year: '2023',
    source: '药物分析杂志',
    citations: 45,
    tags: ['化学成分', '质谱分析', '当归补血汤']
  },
  {
    title: '中医体质类型与代谢综合征关联性的横断面研究',
    authors: '王芳菲, 张晓东, 李时珍',
    abstract: '对3000例体检人群进行中医体质辨识与代谢综合征筛查，分析体质类型与代谢综合征的关联性。结果发现痰湿质、湿热质人群代谢综合征患病率显著升高。',
    year: '2022',
    source: '中华中医药杂志',
    citations: 34,
    tags: ['中医体质', '代谢综合征', '横断面研究']
  },
])

const filteredPapers = computed(() => {
  let list = papers.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(q) || p.authors.includes(q) || p.tags.some(t => t.includes(q)))
  }
  if (filterYear.value && filterYear.value !== '全部') {
    list = list.filter(p => p.year === filterYear.value)
  }
  return list
})

const viewPaper = (paper) => {
  ElMessage.info(`已选择：${paper.title}`)
}
</script>

<style scoped>
.papers-page {
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
.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.search-input {
  flex: 1;
  max-width: 400px;
}
.filter-select {
  width: 140px;
}
.paper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}
.paper-card {
  background: rgba(16, 24, 48, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}
.paper-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 102, 255, 0.3);
}
.paper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}
.paper-badge {
  background: linear-gradient(135deg, #6ab7ff, #4a90e2);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}
.paper-source {
  color: #888;
  font-size: 0.85rem;
}
.paper-title {
  font-size: 1.1rem;
  color: #e0e0e0;
  margin-bottom: 0.4rem;
  line-height: 1.5;
}
.paper-authors {
  color: #7ab7ef;
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
}
.paper-abstract {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.8rem;
}
.paper-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.tag {
  background: rgba(106, 183, 255, 0.15);
  border-color: rgba(106, 183, 255, 0.3);
  color: #6ab7ff;
}
.paper-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}
.paper-citations {
  color: #888;
  font-size: 0.85rem;
}
</style>
