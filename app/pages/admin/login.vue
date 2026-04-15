<template>
  <div class="admin-login-layout">
    <!-- 左侧：视觉创意区 -->
    <div class="split-left">
      <div class="overlay"></div>
      <div class="scanlines"></div>
      <div class="brand-content">
        <h1 class="glitch" data-text="SYSTEM">SYSTEM</h1>
        <h2 class="glitch-sub" data-text="A D M I N I S T R A T O R">A D M I N I S T R A T O R</h2>
        <div class="divider"></div>
        <p class="description">
          Top-tier enterprise management console. <br/>
          Secure, Fast, and Highly Customizable.
        </p>

        <!-- 动态数据流终端 (无限滚动) -->
        <div class="terminal-container">
          <div class="terminal-stream">
            <template v-for="i in 2" :key="i">
              <div class="stream-block">
                <span>[SYS] KERNEL PANIC: 0x00000021... RESOLVED</span>
                <span>[NET] INCOMING UDP TRAFFIC FROM 192.168.1.1</span>
                <span>[AUTH] VERIFYING RSA-4096 SIGNATURES... OK</span>
                <span>[SEC] FIREWALL RULE #44 TRIGGERED. LOGGED.</span>
                <span>[MEM] ALLOCATING 4096MB FOR NEURAL NET...</span>
                <span>[SYS] INITIATING GHOST PROTOCOL v2.4</span>
                <span>[DATA] DECRYPTING SECTOR 7G... VALID</span>
                <span>[SYS] SYSTEM READY. WAITING FOR ADMIN.</span>
                <span>> _</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：登录表单区 -->
    <div class="split-right">
      <div class="form-container">
        <!-- 切换回普通用户的链接 -->
        <a href="/login" class="back-link">
          <icon-left /> Return to User Portal
        </a>

        <div class="form-header">
          <h3>Secure Login</h3>
          <p>Please enter your administrative credentials.</p>
        </div>

        <a-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          layout="vertical"
          @submit="handleLogin"
          class="dark-form"
        >
          <a-form-item field="username" label="Administrator ID">
            <a-input
              v-model="formData.username"
              placeholder="Enter your ID..."
              size="large"
              allow-clear
            >
              <template #prefix><icon-desktop /></template>
            </a-input>
          </a-form-item>

          <a-form-item field="password" label="Access Key">
            <a-input-password
              v-model="formData.password"
              placeholder="Enter your Access Key..."
              size="large"
              allow-clear
            >
              <template #prefix><icon-safe /></template>
            </a-input-password>
          </a-form-item>

          <div class="form-meta">
            <a-checkbox v-model="formData.remember">Keep Session Alive</a-checkbox>
            <a-link class="forgot-btn">Lost Access?</a-link>
          </div>

          <a-button
            html-type="submit"
            size="large"
            long
            :loading="loading"
            class="cyber-button"
          >
            AUTHORIZE
            <icon-right class="btn-icon" />
          </a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconLeft, IconRight, IconDesktop, IconSafe } from '@arco-design/web-vue/es/icon';
import { useAdminLogin } from '~/composables/useAdminLogin';

definePageMeta({ layout: false });

const { formRef, formData, rules, loading, handleLogin } = useAdminLogin();
</script>

<style scoped lang="less">
/* -- 暗黑工业/赛博朋克风配色 -- */
@bg-dark: #0a0a0a;
@bg-panel: #111111;
@accent-color: #00ffcc; /* 青色发光点缀 */
@text-main: #ffffff;
@text-dim: #888888;
@border-color: #333333;

.admin-login-layout {
  display: flex;
  min-height: 100vh;
  background-color: @bg-dark;
  font-family: 'JetBrains Mono', 'Fira Code', 'Inter', sans-serif;
  overflow: hidden;
}

/* -- 左侧视觉区 -- */
.split-left {
  flex: 1;
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop'); /* 默认一张赛博风暗色图 */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 40px 8%;

  .overlay {
    position: absolute;
    inset: 0;
    // 使用纯 CSS 生成像素点阵遮罩覆盖在图片上
    background:
      linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.9)),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px);
    z-index: 1;
  }

  .brand-content {
    position: relative;
    z-index: 3;
    color: @text-main;
    width: 100%;
  }

  .divider {
    width: 60px;
    height: 4px;
    background-color: @accent-color;
    margin: 24px 0;
    box-shadow: 0 0 10px @accent-color;
  }

  .description {
    font-size: 16px;
    color: #cccccc;
    line-height: 1.6;
    letter-spacing: 0.5px;
    border-left: 2px solid @accent-color;
    padding-left: 16px;
  }

  .terminal-container {
    margin-top: 60px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    color: @accent-color;
    opacity: 0.8;
    height: 120px;
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 40px;
      background: linear-gradient(transparent, rgba(10, 10, 10, 1));
      pointer-events: none;
    }
  }

  .terminal-stream {
    display: flex;
    flex-direction: column;
    animation: scroll-up 15s linear infinite;
  }

  .stream-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 6px;

    span {
      text-shadow: 0 0 5px rgba(0, 255, 204, 0.5);
    }
  }
}

.scanlines {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.1)
  );
  background-size: 100% 4px;
  pointer-events: none;
}

@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

/* -- 纯 CSS Glitch 故障艺术文字特效 -- */
.glitch {
  font-size: 64px;
  font-weight: 900;
  letter-spacing: 4px;
  margin: 0;
  position: relative;
  text-transform: uppercase;
}
.glitch-sub {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 12px;
  margin: 10px 0 0 0;
  color: @accent-color;
}

@keyframes flash {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.2; }
}


/* -- 右侧登录表单区 -- */
.split-right {
  width: 480px;
  background-color: @bg-panel;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  position: relative;
  border-left: 1px solid @border-color;
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);

  /* 顶部发光线条装饰 */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, @accent-color, transparent);
  }
}

.back-link {
  position: absolute;
  top: 40px;
  left: 60px;
  color: @text-dim;
  text-decoration: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s;

  &:hover {
    color: @accent-color;
  }
}

.form-container {
  width: 100%;
}

.form-header {
  margin-bottom: 40px;
  h3 {
    font-size: 28px;
    font-weight: 600;
    color: @text-main;
    margin: 0 0 8px;
  }
  p {
    font-size: 14px;
    color: @text-dim;
    margin: 0;
  }
}

/* -- 定制 Arco 表单组件 (高度几何感，扁平化) -- */
.dark-form {
  :deep(.arco-form-item-label-col) {
    label {
      color: #999999;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
  }

  :deep(.arco-input-wrapper) {
    background-color: transparent !important;
    border: none !important;
    border-bottom: 2px solid @border-color !important;
    border-radius: 0;
    color: @text-main !important;
    padding: 8px 0;
    transition: all 0.3s;

    &:hover {
      border-bottom-color: #555555 !important;
    }

    &.arco-input-focus {
      border-bottom-color: @accent-color !important;
      box-shadow: 0 2px 0 0 rgba(0, 255, 204, 0.2) !important;
    }

    .arco-input { color: @text-main; font-size: 16px; }
    .arco-input-prefix { color: @text-dim; font-size: 20px; margin-right: 12px; }
    .arco-input::placeholder { color: #555555; }
  }
}

.form-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 40px;

  :deep(.arco-checkbox) {
    color: @text-dim;

    .arco-checkbox-icon {
      background-color: transparent;
      border: 1px solid @text-dim;
      border-radius: 2px; /* 极简方块 */
    }
    .arco-checkbox-icon:hover { border-color: @accent-color; }
    &.arco-checkbox-checked .arco-checkbox-icon {
      background-color: transparent;
      border-color: @accent-color;
      /* 替换勾号颜色 */
      svg { color: @accent-color; stroke-width: 3px; }
    }
  }

  .forgot-btn {
    color: @text-dim;
    &:hover { color: @text-main; }
  }
}

/* 按钮设计：线条 + 悬浮镭射 */
.cyber-button {
  background-color: transparent;
  border: 1px solid @accent-color;
  color: @accent-color !important;
  font-weight: 600;
  letter-spacing: 2px;
  height: 54px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  .btn-icon {
    margin-left: 8px;
    transition: transform 0.3s;
  }

  /* 悬浮填充反转 */
  &:hover:not([disabled]) {
    background-color: @accent-color;
    color: @bg-dark !important;
    box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);

    .btn-icon {
      transform: translateX(4px);
    }
  }
}

/* -- 移动端适配 -- */
@media (max-width: 900px) {
  .split-left { display: none; }
  .split-right {
    width: 100%;
    padding: 0 8%;
    border-left: none;
  }
  .back-link { top: 20px; left: 8%; }
}
</style>