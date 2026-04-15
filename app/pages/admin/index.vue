<template>
  <a-layout class="admin-layout">
    <!-- 侧边栏 Sider -->
    <a-layout-sider
      collapsible
      breakpoint="xl"
      class="admin-sider"
      :width="240"
    >
      <div class="logo">
        <div class="logo-icon"></div>
        <span class="logo-text">System Admin</span>
      </div>
      <a-menu
        :default-selected-keys="['1']"
        :style="{ width: '100%' }"
        class="admin-menu"
        @menu-item-click="handleMenuClick"
      >
        <a-menu-item key="1"><template #icon><icon-dashboard /></template>仪表盘概览</a-menu-item>
        <a-sub-menu key="2">
          <template #icon><icon-file /></template>
          <template #title>文章管理</template>
          <a-menu-item key="2_1">发布新文章</a-menu-item>
          <a-menu-item key="2_2">文章列表</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="3"><template #icon><icon-tags /></template>分类与标签</a-menu-item>
        <a-menu-item key="4"><template #icon><icon-message /></template>评论管理</a-menu-item>
        <a-menu-item key="5"><template #icon><icon-settings /></template>博客设置</a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- 顶部 Header -->
      <a-layout-header class="admin-header">
        <div class="header-left">
          <a-breadcrumb>
            <a-breadcrumb-item>后台管理</a-breadcrumb-item>
            <a-breadcrumb-item>仪表盘概览</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="header-right">
          <a-input-search placeholder="搜索..." class="search-input" />
          <a-badge :count="9" dot>
            <a-button type="text" shape="circle"><icon-notification size="20" /></a-button>
          </a-badge>
          <a-dropdown @select="handleUserSelect">
            <div class="user-profile">
              <a-avatar :style="{ backgroundColor: '#00c6ff' }" size="32">Admin</a-avatar>
              <span class="username">Super Administrator</span>
              <icon-down />
            </div>
            <template #content>
              <a-doption value="profile">个人中心</a-doption>
              <a-doption value="settings">设定</a-doption>
              <a-doption value="logout" style="color: #f53f3f;">退出登录</a-doption>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容主体 Content -->
      <a-layout-content class="admin-content">
        <div class="content-wrapper">
          <!-- 欢迎及统计卡片区 -->
          <div class="welcome-banner">
            <h2>欢迎回来，超级管理员！🚀</h2>
            <p>仪表盘已接入实时数据源（ECharts驱动），您可以监控项目在近期的访问与交互趋势。</p>
          </div>

          <a-row :gutter="24" class="stat-cards">
            <a-col :span="6">
              <a-card class="stat-card" hoverable>
                <div class="stat-icon b-blue"><icon-eye /></div>
                <a-statistic title="今日独立访客 (UV)" :value="1256" :value-from="0" animation show-group-separator />
                <div class="trend up"><icon-arrow-rise /> 12.5% 较昨日</div>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card class="stat-card" hoverable>
                <div class="stat-icon b-pink"><icon-file /></div>
                <a-statistic title="已发布文章总数" :value="84" :value-from="0" animation />
                <div class="trend up"><icon-arrow-rise /> 3篇 新发</div>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card class="stat-card" hoverable>
                <div class="stat-icon b-yellow"><icon-message /></div>
                <a-statistic title="待处理互动留言" :value="12" :value-from="0" animation />
                <div class="trend down"><icon-arrow-fall /> 5条 已回复</div>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card class="stat-card" hoverable>
                <div class="stat-icon b-purple"><icon-thumb-up /></div>
                <a-statistic title="全站获得赞同数" :value="13450" :value-from="0" animation show-group-separator />
                <div class="trend up"><icon-arrow-rise /> 240+ 飙升</div>
              </a-card>
            </a-col>
          </a-row>

          <!-- 中部：ECharts 数据可视化区 -->
          <a-row :gutter="24" class="chart-section" style="margin-bottom: 24px;">
            <a-col :span="16">
              <a-card title="最近 7 天系统流量与互动趋势" class="table-card" :bordered="false">
                <div class="chart-container">
                  <ClientOnly>
                    <v-chart class="chart" :option="lineChartOption" autoresize />
                  </ClientOnly>
                </div>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card title="读者访问来源分布" class="action-card" :bordered="false">
                <div class="chart-container">
                  <ClientOnly>
                    <v-chart class="chart" :option="pieChartOption" autoresize />
                  </ClientOnly>
                </div>
              </a-card>
            </a-col>
          </a-row>

          <!-- 底部：最新文章表格和快捷操作 -->
          <a-row :gutter="24" class="bottom-section">
            <a-col :span="16">
              <a-card title="最近发布的文章" class="table-card" :bordered="false">
                <template #extra>
                  <a-link>查看全部</a-link>
                </template>
                <a-table :data="tableData" :columns="columns" :pagination="false" :bordered="false" class="cursor-pointer-table" @row-click="handleRowClick" />
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card title="快捷操作" class="action-card" :bordered="false">
                <div class="action-grid">
                  <div class="action-btn"><icon-edit />撰写新文章</div>
                  <div class="action-btn"><icon-camera />媒体图库</div>
                  <div class="action-btn"><icon-robot />SEO设置</div>
                  <div class="action-btn"><icon-skin />主题切换</div>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {
  IconDashboard, IconFile, IconTags, IconMessage, IconSettings,
  IconEye, IconNotification, IconDown, IconThumbUp,
  IconEdit, IconCamera, IconRobot, IconSkin, IconArrowRise, IconArrowFall
} from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ref } from 'vue';

// Echarts Imports
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';

// 初始化并注入使用 ECharts 的各个组件
use([CanvasRenderer, LineChart, PieChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent]);

// 页面无需特定外层 Layout，它自己就是一个完整的管理端骨架
definePageMeta({ layout: false });

const router = useRouter();

// 侧边栏点击逻辑
const handleMenuClick = (key: string) => {
  if (key === '2_1') {
    router.push('/admin/write');
  }
};

// 表格行点击逻辑
const handleRowClick = (record: any) => {
  // 点击某篇文章时，直接跳转至撰写页面（实际开发中可带上 id，例如 '/admin/write?id=' + record.key）
  router.push('/admin/write');
};

// 右上角用户下拉菜单点击逻辑
const handleUserSelect = (value: string | number | Record<string, any> | undefined) => {
  if (value === 'logout') {
    Message.success('已安全退出登录');
    router.push('/admin/login');
  }
};

// 模拟表格数据
const columns = [
  { title: '文章标题', dataIndex: 'title' },
  { title: '状态', dataIndex: 'status', slotName: 'status' },
  { title: '发布时间', dataIndex: 'date' },
  { title: '数据追踪', dataIndex: 'views' }
];

const tableData = [
  { key: '1', title: '【深度】我是如何结合 Claude Code 将开发效率提升 300%', status: '已发布', date: '2026-04-11', views: '1,452 访问' },
  { key: '2', title: 'Nuxt 3 最佳实践与性能优化（万字长文）', status: '已发布', date: '2026-04-10', views: '2,890 访问' },
  { key: '3', title: 'Vue 3 ECharts 封装图表组件的坑与解决方案', status: '草稿', date: '2026-04-09', views: '-' },
  { key: '4', title: '纯 CSS 实现隐形登入入口：极客特效解析', status: '已发布', date: '2026-04-08', views: '3,205 访问' }
];

// ECharts 流量趋势图配置项
const lineChartOption = ref({
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e2e8f0' },
  legend: { data: ['页面浏览量 (PV)', '独立访客数 (UV)'], bottom: 0 },
  grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: { lineStyle: { color: '#cbd5e1' } },
    axisLabel: { color: '#64748b' }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } },
    axisLabel: { color: '#64748b' }
  },
  series: [
    {
      name: '页面浏览量 (PV)',
      type: 'line',
      smooth: true,
      color: '#00c6ff',
      lineStyle: { width: 3, shadowColor: 'rgba(0, 198, 255, 0.3)', shadowBlur: 10 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: 'rgba(0, 198, 255, 0.4)' }, { offset: 1, color: 'rgba(0, 198, 255, 0)' }]
        }
      },
      data: [120, 230, 290, 480, 520, 890, 1256]
    },
    {
      name: '独立访客数 (UV)',
      type: 'line',
      smooth: true,
      color: '#ff8eaa',
      lineStyle: { width: 3, shadowColor: 'rgba(255, 142, 170, 0.3)', shadowBlur: 10 },
      data: [80, 150, 180, 320, 310, 540, 890]
    }
  ]
});

// ECharts 来源分布饼图配置项
const pieChartOption = ref({
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['45%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false, position: 'center' },
      emphasis: {
        label: { show: true, fontSize: 16, fontWeight: 'bold' }
      },
      color: ['#00c6ff', '#ff8eaa', '#ffd700', '#c084fc', '#4ade80'],
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: 'GitHub 链入' },
        { value: 484, name: '技术社区' },
        { value: 300, name: '其他渠道' }
      ]
    }
  ]
});
</script>

<style scoped lang="less">
/* -- 现代后台轻量化配色 -- */
@bg-page: #f4f7fb;
@bg-sidebar: #ffffff;
@primary: #00c6ff;
@text-main: #1e293b;

.admin-layout {
  height: 100vh;
  background-color: @bg-page;
}

/* -- 侧边栏 -- */
.admin-sider {
  background-color: @bg-sidebar;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.03);
  z-index: 10;

  .logo {
    display: flex;
    align-items: center;
    padding: 24px 20px;

    .logo-icon {
      width: 32px; height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #00c6ff, #ff8eaa);
      margin-right: 12px;
    }
    .logo-text {
      font-size: 18px;
      font-weight: 800;
      color: @text-main;
    }
  }

  .admin-menu {
    border-right: none;
    padding: 0 12px;

    :deep(.arco-menu-item), :deep(.arco-menu-inline-header) {
      border-radius: 8px;
      margin-bottom: 4px;
      &:hover {
        background-color: #f1f5f9;
        color: @primary;
      }
    }
    :deep(.arco-menu-item.arco-menu-selected) {
      background-color: #e6f6ff;
      color: @primary;
      font-weight: 600;
      svg { color: @primary; }
    }
  }
}

/* -- 顶部 Header -- */
.admin-header {
  height: 64px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.02);
  z-index: 5;

  .header-left {
    :deep(.arco-breadcrumb-item) {
      font-weight: 500;
      color: #64748b;
      &:last-child { color: @text-main; font-weight: 600; }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .search-input {
      width: 200px;
      border-radius: 20px;
      background-color: #f1f5f9;
      border: none;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding-left: 10px;
      border-left: 1px solid #e2e8f0;

      .username {
        font-weight: 600;
        font-size: 14px;
        color: @text-main;
      }
    }
  }
}

/* -- 内容核心区 -- */
.content-wrapper {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-banner {
  margin-bottom: 24px;
  h2 { margin: 0 0 8px; font-weight: 700; color: @text-main; }
  p { color: #64748b; margin: 0; }
}

/* 统计卡片 */
.stat-cards {
  margin-bottom: 24px;

  .stat-card {
    border-radius: 16px;
    border: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
    position: relative;
    overflow: hidden;

    /* 卡片内部排版 */
    :deep(.arco-card-body) {
      display: flex;
      align-items: center;
      padding: 24px;
    }

    .stat-icon {
      width: 54px; height: 54px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
      margin-right: 20px;

      &.b-blue { background: #e0f2fe; color: #0284c7; }
      &.b-pink { background: #fce7f3; color: #db2777; }
      &.b-yellow { background: #fef9c3; color: #ca8a04; }
      &.b-purple { background: #f3e8ff; color: #9333ea; }
    }

    :deep(.arco-statistic-title) {
      color: #64748b;
      margin-bottom: 4px;
      font-weight: 500;
    }
    :deep(.arco-statistic-value) {
      color: @text-main;
      font-weight: 800;
      font-size: 28px;
    }

    .trend {
      position: absolute;
      right: 24px;
      bottom: 24px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;

      &.up { color: #10b981; } /* 绿色上升 */
      &.down { color: #f43f5e; } /* 红色下降 */
    }
  }
}

/* 核心图表区域 */
.chart-container {
  height: 320px;
  width: 100%;

  .chart {
    height: 100%;
    width: 100%;
  }
}

/* 底部区域 */
.bottom-section {
  .table-card, .action-card {
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);

    :deep(.arco-card-header) {
      border-bottom: 1px solid #f1f5f9;
      padding: 16px 24px;
      font-weight: 700;
    }
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    .action-btn {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      font-weight: 600;
      color: @text-main;
      cursor: pointer;
      transition: all 0.3s;

      svg {
        display: block;
        margin: 0 auto 8px auto;
        font-size: 24px;
        color: @primary;
      }

      &:hover {
        background-color: #ffffff;
        border-color: @primary;
        color: @primary;
        box-shadow: 0 10px 20px rgba(0, 198, 255, 0.1);
        transform: translateY(-2px);
      }
    }
  }
}
</style>