<<<<<<< HEAD
# My Blog (Nuxt 3)

一个基于 Nuxt 3构建的前后端分离博客与后台管理系统。具备极致的前端交互体验、现代化的 UI 以及数据可视化功能。

## ✨ 核心特性

* **动态炫酷登录端 (/login)**：采用白/粉/蓝/黄浅色系，融合 Glassmorphism（玻璃拟态）、动态网格背景、全局跟随光晕以及 CSS 气泡浮动特效，提供极佳的沉浸式登录体验；右下角具有隐藏式的系统内核入口触发器 (Ghost Trigger)。
* **赛博朋克后台验证 (/admin/login)**：暗黑工业风格管理层登录验证，集成无限滚动的虚假命令终端 (Fake Terminal) 及 CRT 扫描线 (Scanlines) 视觉特效。
* **数据仪表盘 (/admin)**：使用 `ECharts` 和 `vue-echarts` 集成专业级后台仪表盘，直观的卡片化统计以及动态折线图、来源分布饼图。
* **沉浸式博客撰写端 (/admin/write)**：双栏实时预览，轻量级伪解析 (Regex FakeRender) 支持实时查看 Markdown 效果，具备侧边栏快捷操作以及虚拟的 AI 辅助写作展示面板。

## 🛠️ 技术栈

* **框架**：[Nuxt 3](https://nuxt.com/) / Vue 3 Composition API
* **UI 组件**：[Arco Design Vue](https://arco.design/vue/docs/start)
* **图表库**：[ECharts](https://echarts.apache.org/) + `vue-echarts`
* **样式**：Less + CSS3 高级特性 (滤镜、径向渐变、3D 变换)

## 🚀 快速开始

确保你的 Node.js 环境已就绪。

### 1. 安装依赖

```bash
# npm
npm install

# pnpm
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
# 或 pnpm dev
```
启动后，可在浏览器访问：

* 用户登录：`http://localhost:3000/login`
* 后台管理（登录）：`http://localhost:3000/admin/login`
* 控制台仪表盘：`http://localhost:3000/admin`
* 撰写文章：`http://localhost:3000/admin/write`

## 📦 生产环境构建

构建生产版本：

```bash
npm run build
```

本地预览生产环境：

```bash
npm run preview
```

## 📄 接下来要做的 (TODO)

- [ ] 构建公共前端主页面结构 (`app/pages/index.vue`)
- [ ] 后端基础架构 (Nitro / Server API) 连接并实现真实的登录校验与用户管理。
- [ ] 文章的数据库增删改查实现。
=======
# demo
走一遍GitHub流程
>>>>>>> 387dd9bb8d40864b5f90fa00d8188e84b6d7f065
