<template>
  <div class="write-article-container">
    <div class="header-tools">
      <div class="left">
        <a-button type="text" @click="router.back()">
          <template #icon><icon-left /></template>
          返回
        </a-button>
        <span class="divider"></span>
        <span class="status-tag">草稿箱自动保存中...</span>
      </div>
      <div class="right">
        <a-button class="preset-btn">存为草稿</a-button>
        <a-button type="primary" class="publish-btn" @click="publishArticle">
          <template #icon><icon-send /></template>
          立即发布
        </a-button>
      </div>
    </div>

    <!-- 写作核心区域 -->
    <div class="editor-main">
      <div class="editor-content">
        <!-- 标题输入框 -->
        <a-input
          v-model="articleData.title"
          class="title-input"
          placeholder="请输入文章标题..."
          :bordered="false"
        />

        <!-- 文章基础属性 -->
        <div class="article-meta">
          <a-space size="large">
            <a-select v-model="articleData.category" placeholder="选择分类" style="width: 160px" :bordered="false" class="meta-select">
              <a-option value="tech">技术分享</a-option>
              <a-option value="career">职业感悟</a-option>
              <a-option value="tools">效率工具</a-option>
            </a-select>

            <a-input-tag v-model="articleData.tags" placeholder="添加标签 (回车确认)" style="width: 260px" :bordered="false" class="meta-select" />
          </a-space>
        </div>

        <!-- 正文输入区 -->
        <a-textarea
          v-model="articleData.content"
          class="content-input"
          placeholder="开始你的创作... (支持 Markdown)"
          :auto-size="{ minRows: 20 }"
          :bordered="false"
        />
      </div>

      <!-- 右侧悬浮面板 (AI 辅助/写作建议等) -->
      <div class="side-panel">
        <a-card title="Claude AI 辅助" :bordered="false" class="ai-card">
          <template #extra>
            <icon-robot style="color: #165DFF;" />
          </template>
          <p class="ai-desc">一键优化你的文章排版与措辞。</p>
          <a-space direction="vertical" style="width: 100%;">
            <a-button long>✨ 生成文章摘要</a-button>
            <a-button long>📝 润色当前大纲</a-button>
            <a-button long>🔍 SEO 关键词提取</a-button>
          </a-space>
        </a-card>

        <a-card title="发布设置" :bordered="false" class="settings-card" style="margin-top: 16px;">
          <a-form layout="vertical">
            <a-form-item label="封面大图">
              <div class="cover-uploader">
                <icon-plus size="24" style="color: var(--color-text-3)" />
                <div>点击上传图片</div>
              </div>
            </a-form-item>
            <a-form-item label="发布时间">
              <a-date-picker show-time style="width: 100%" />
            </a-form-item>
            <a-form-item label="访问权限">
              <a-radio-group default-value="public">
                <a-radio value="public">公开</a-radio>
                <a-radio value="private">私密</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { IconLeft, IconSend, IconRobot, IconPlus } from '@arco-design/web-vue/es/icon';

definePageMeta({ layout: false });

const router = useRouter();

// 预设默认文章内容（前端工程师与 Claude Code）
const articleData = reactive({
  title: '深度解析：前端工程师如何结合 Claude Code 颠覆工作流与项目质量',
  category: 'tools',
  tags: ['AI编程', 'ClaudeCode', '前端开发', '效率提升'],
  content: `## 为什么前端开发需要 Claude Code？

在这个 AI 浪潮席卷技术的时代，仅仅依靠 GitHub Copilot 的自动补全已经无法满足高级前端工程师对复杂架构梳理的需求。而 Anthropic 推出的官方 CLI 工具——**Claude Code**，彻底改变了我们与代码库交互的方式。

它不仅是一个 "代码补全" 工具，更是一个驻扎在你终端的**高级架构师兼结对编程助手**。

### 🚀 1. 它是如何提升工作效率的？

传统的前端开发流程往往伴随着：
- 不断在浏览器和编辑器之间切换搜索 API。
- 为了写一个复杂的 \`Regex\` 或者一个生僻的 Three.js 动画翻遍文档。
- 难以维护前人遗留下来的祖传"意念代码"。

有了 Claude Code：
1. **全局上下文理解**：你可以直接在终端中让它分析整个 \`components\` 文件夹的逻辑，它能立刻找出冗余的组件并提供合并方案。
2. **极速搭建页面（正如你正在看的这篇布局）**：无论是极其复杂的 Glassmorphism 玻璃拟态特效，还是基于黑客赛博朋克风的管理大盘，只要你提需求，它能直接将无缝运行的代码**直接写入你的工作区**（通过 Write Tool）。
3. **免去手写样板代码**：表单验证、TS 接口定义、API 自动映射等都可以一句话生成。

### 🛡️ 2. 大大改善项目的健壮度与质量

质量往往来源于细致的代码审查与测试覆盖率，而这些大多是被业务压得喘不过气的开发者最容易忽略的环节。

- **快速 Code Review**：提交前，你可以利用 \`/review-pr\` 这类技巧，让 Claude Code 以极度苛刻和规范的视角审查你的 Vue/React 代码，它能准确指出诸如 \`watchEffect\` 循环依赖、不正确的 Pinia 状态更新等隐藏极深的坑。
- **完善类型安全**：还在写 \`any\` 吗？甩出一段 \`any\` 遍地的旧代码，让它重构成完美的 \`TypeScript\` Interface 与 Type Definition。
- **自动编写单元测试**：写测试用例极其枯燥，将你的组件喂给 Claude，它能在 10 秒内输出高覆盖率的 \`Vitest\` 单元测试用例。

### 💡 结论

我们正处在一个范式转移的奇点上。**前端工程师并不会被取代**，但是**不会使用 AI 环境引擎的前端最终将被掌握这些超能力的人降维打击**。

作为最擅长 UI 表达和用户交互的物种，结合 Claude Code 给定的强大算力和理解树，前端开发者能以前所未有的速度将脑中的蓝图转化为高质量、稳如泰山的工程代码。

-- *本文诞生于与 Claude Code 的一次奇妙结对编程体验中。*
`
});

const publishArticle = () => {
  if (!articleData.title.trim()) {
    Message.error('文章标题不能为空！');
    return;
  }
  Message.success('🎉 文章发布成功！');
  setTimeout(() => {
    router.push('/admin'); // 跳转回后台列表
  }, 1000);
};
</script>

<style scoped lang="less">
/* -- 浅色沉浸式写作主题 -- */
.write-article-container {
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
}

/* -- 顶部工具栏 -- */
.header-tools {
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-shadow: 0 1px 15px rgba(0,0,0,0.02);
  z-index: 10;

  .left {
    display: flex;
    align-items: center;
    gap: 16px;

    .divider {
      width: 1px;
      height: 20px;
      background-color: #e2e8f0;
    }

    .status-tag {
      font-size: 13px;
      color: #94a3b8;
    }
  }

  .right {
    display: flex;
    gap: 12px;

    .publish-btn {
      border-radius: 20px;
      padding: 0 24px;
      font-weight: 600;
    }
    .preset-btn {
      border-radius: 20px;
      background-color: #f1f5f9;
      color: #475569;
      &:hover { background-color: #e2e8f0; }
    }
  }
}

/* -- 核心编辑器布局 -- */
.editor-main {
  flex: 1;
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 32px 40px;
  gap: 32px;
}

.editor-content {
  flex: 1;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  padding: 40px;
  display: flex;
  flex-direction: column;

  /* 重写 Input 样式变为沉浸式 */
  .title-input {
    font-size: 32px;
    font-weight: 800;
    color: #1e293b;
    padding: 0;
    margin-bottom: 24px;

    // arco input 清除背景
    :deep(.arco-input) {
      font-size: 32px;
      font-weight: 800;
      &::placeholder { color: #cbd5e1; font-weight: 600; }
    }
  }

  .article-meta {
    margin-bottom: 32px;
    border-bottom: 1px dashed #e2e8f0;
    padding-bottom: 24px;

    .meta-select {
      background-color: #f8fafc;
      border-radius: 8px;
    }
  }

  .content-input {
    flex: 1;
    font-size: 16px;
    line-height: 1.8;
    color: #334155;
    padding: 0;

    :deep(.arco-textarea) {
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Arial, sans-serif;
      &::placeholder { color: #94a3b8; }
    }
  }
}

/* -- 右侧悬浮面板 -- */
.side-panel {
  width: 320px;
  flex-shrink: 0;

  .ai-card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(22, 93, 255, 0.08);
    background: linear-gradient(to bottom, #f0f8ff, #ffffff);

    :deep(.arco-card-header) { border: none; font-weight: 700; color: #165DFF; }

    .ai-desc { color: #64748b; font-size: 13px; margin: 0 0 16px 0; }
  }

  .settings-card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);

    :deep(.arco-card-header) { font-weight: 600; }

    .cover-uploader {
      width: 100%;
      height: 120px;
      background-color: #f8fafc;
      border: 2px dashed #cbd5e1;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #165DFF;
        color: #165DFF;
        background-color: #f0f6ff;
      }

      div { margin-top: 8px; font-size: 13px; }
    }
  }
}

@media (max-width: 1024px) {
  .editor-main { flex-direction: column; padding: 20px; }
  .side-panel { width: 100%; order: -1; } /* 移动端先显示面板或者干脆隐藏 */
  .header-tools { padding: 0 20px; }
}
</style>