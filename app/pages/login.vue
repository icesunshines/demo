<template>
  <div
    class="login-container"
    ref="containerRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- 跟随鼠标的全局光晕 (白色柔和) -->
    <div
      class="mouse-light"
      :style="{
        transform: `translate(${mouseX}px, ${mouseY}px)`,
        opacity: isHovering ? 0.8 : 0
      }"
    ></div>

    <!-- 动态流体渐变网络 (粉, 蓝, 黄) -->
    <div class="blob blob-pink"></div>
    <div class="blob blob-sky"></div>
    <div class="blob blob-yellow"></div>

    <!-- 增加上升漂浮的玻璃气泡 (动态特效增强) -->
    <div class="glass-bubble bubble-1" :style="parallaxStyle(0.08)"></div>
    <div class="glass-bubble bubble-2" :style="parallaxStyle(-0.04)"></div>
    <div class="glass-bubble bubble-3" :style="parallaxStyle(0.06)"></div>
    <div class="glass-bubble bubble-4" :style="parallaxStyle(-0.07)"></div>

    <!-- 隐秘的管理员控制台入口 (Ghost Trigger) -->
    <a href="/admin/login" class="ghost-trigger">
      <icon-bug />
      <span class="ghost-text">SYS.CORE</span>
    </a>

    <!-- 居中悬浮卡片 (带有 3D 偏转视差) -->
    <div class="login-card-wrapper" :style="cardTransformStyle">
      <div class="login-card" ref="cardRef">

        <!-- 卡片边缘鼠标跟随的高光 -->
        <div
          class="card-glow"
          :style="{
            left: cardMouseX + 'px',
            top: cardMouseY + 'px',
            opacity: isHovering ? 1 : 0
          }"
        ></div>

        <!-- 品牌信息 Header -->
        <div class="brand-header">
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1>
            <!-- 幻彩渐变打字机效果 -->
            <span class="typewriter">Hello，欢迎回来_</span>
          </h1>
          <p>Login to your Workspace</p>
        </div>

        <!-- 登录表单 -->
        <a-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          layout="vertical"
          @submit="handleLogin"
          class="login-form"
        >
          <!-- 用户名 -->
          <a-form-item field="username" hide-label>
            <a-input
              v-model="formData.username"
              placeholder="用户名 / 邮箱"
              size="large"
              allow-clear
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>

          <!-- 密码 -->
          <a-form-item field="password" hide-label>
            <a-input-password
              v-model="formData.password"
              placeholder="密码"
              size="large"
              allow-clear
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>

          <!-- 额外操作区 -->
          <div class="form-actions">
            <a-checkbox v-model="formData.remember">记住我</a-checkbox>
            <a-link href="#" class="forgot-link">忘记密码?</a-link>
          </div>

          <!-- 提交按钮 -->
          <a-button
            html-type="submit"
            size="large"
            long
            :loading="loading"
            class="submit-btn"
          >
            登 录 进 入
          </a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconUser, IconLock, IconBug } from '@arco-design/web-vue/es/icon';
import { useLogin } from '~/composables/useLogin';

definePageMeta({ layout: false });

const { formRef, formData, rules, loading, handleLogin } = useLogin();

// --- 炫酷 3D & 跟随光效逻辑 ---
const containerRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

// 全局鼠标坐标
const mouseX = ref(-1000);
const mouseY = ref(-1000);
const cardMouseX = ref(-1000);
const cardMouseY = ref(-1000);

const isHovering = ref(false);
const rotateX = ref(0);
const rotateY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return;
  isHovering.value = true;

  mouseX.value = e.clientX;
  mouseY.value = e.clientY;

  const rect = containerRef.value.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // 偏转系数计算 (最大偏转 8 度)
  const deltaX = (e.clientX - centerX) / centerX;
  const deltaY = (e.clientY - centerY) / centerY;

  rotateX.value = -(deltaY * 8);
  rotateY.value = deltaX * 8;

  if (cardRef.value) {
    const cardRect = cardRef.value.getBoundingClientRect();
    cardMouseX.value = e.clientX - cardRect.left;
    cardMouseY.value = e.clientY - cardRect.top;
  }
};

const handleMouseLeave = () => {
  isHovering.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
};

// 缓动输出卡片 Transform
const cardTransformStyle = computed(() => {
  return {
    transform: `perspective(1200px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(${isHovering.value ? 1.02 : 1}, ${isHovering.value ? 1.02 : 1}, 1)`
  };
});

// 背景视差浮动
const parallaxStyle = (factor: number) => {
  const rect = containerRef.value?.getBoundingClientRect();
  if (!rect || !isHovering.value) return { transform: 'translate(0px, 0px)' };
  const moveX = (mouseX.value - rect.width / 2) * factor;
  const moveY = (mouseY.value - rect.height / 2) * factor;
  return { transform: `translate(${moveX}px, ${moveY}px)` };
};
</script>

<style scoped lang="less">
/* -- 色彩方案重构：白色/粉红/天空蓝/黄 -- */
@color-white: #ffffff;
@color-pink: #ff8eaa;
@color-sky: #00c6ff;
@color-yellow: #fceaba;
@color-yellow-bright: #ffd700;

@text-main: #1e293b; /* 深色文本，保证在亮色玻璃上可读 */
@text-sub: #64748b;
@card-border: rgba(255, 255, 255, 0.5);

/* -- 容器设置 -- */
.login-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc; /* 替换为亮白大背景 */
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* 发光白色网格线 */
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* -- 跟随鼠标的全局聚光灯 (亮色模式改为点亮周围) -- */
.mouse-light {
  position: absolute;
  top: -250px; left: -250px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
  pointer-events: none;
  z-index: 10; /* 灯光在背景与气泡之上 */
  mix-blend-mode: overlay; /* 让灯光和渐变色完美融合 */
  transition: opacity 0.5s ease;
  will-change: transform;
}

/* -- 动态随机流体光斑 (Mesh Gradient) -- */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
  pointer-events: none;
  animation: blob-orbit 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
}
.blob-pink {
  top: -10%; left: 0%; width: 55vw; height: 55vw;
  background: radial-gradient(circle, rgba(255, 142, 170, 0.8) 0%, rgba(255, 142, 170, 0) 70%);
  animation-delay: -3s;
}
.blob-sky {
  bottom: -15%; right: -5%; width: 60vw; height: 50vw;
  background: radial-gradient(circle, rgba(0, 198, 255, 0.8) 0%, rgba(0, 198, 255, 0) 70%);
  animation-duration: 25s;
  animation-direction: alternate-reverse;
}
.blob-yellow {
  top: 30%; left: 40%; width: 45vw; height: 45vw;
  background: radial-gradient(circle, rgba(252, 234, 186, 0.9) 0%, rgba(255, 215, 0, 0) 70%);
  animation-duration: 18s;
  animation-delay: -7s;
}

@keyframes blob-orbit {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(15vw, -10vh) scale(1.1); }
  66% { transform: translate(-10vw, 15vh) scale(0.9); }
  100% { transform: translate(0, 0) scale(1.05); }
}

/* -- 上移的玻璃气泡特效 -- */
.glass-bubble {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  z-index: 5;
  pointer-events: none;
  animation: float-up 15s infinite linear;
}
.bubble-1 { width: 120px; height: 120px; left: 15%; bottom: -150px; animation-duration: 18s; }
.bubble-2 { width: 80px; height: 80px; left: 75%; bottom: -100px; animation-duration: 12s; animation-delay: 2s; }
.bubble-3 { width: 50px; height: 50px; left: 85%; bottom: -60px; animation-duration: 15s; animation-delay: 5s; }
.bubble-4 { width: 180px; height: 180px; left: 30%; bottom: -200px; animation-duration: 22s; animation-delay: 8s;}

@keyframes float-up {
  0% { transform: translateY(0) rotate(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
}

/* -- 悬浮卡片区 -- */
.login-card-wrapper {
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 440px;
  padding: 20px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-style: preserve-3d;
}

@keyframes slide-up-fade {
  0% { opacity: 0; transform: translateY(60px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* 玻璃拟态 Card (亮色高斯模糊) */
.login-card {
  position: relative;
  background: rgba(255, 255, 255, 0.35); /* 半透明白 */
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  padding: 48px 36px;
  box-shadow:
    0 30px 60px -15px rgba(0, 0, 0, 0.1),
    inset 0 2px 2px rgba(255, 255, 255, 0.8);
  color: @text-main;
  overflow: hidden;
  transform: translateZ(20px);
}

/* 卡片内部的鼠标跟随高光 */
.card-glow {
  position: absolute;
  top: 0; left: 0;
  width: 350px; height: 350px;
  background: radial-gradient(circle closest-side, rgba(255, 255, 255, 0.8), transparent);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: -1;
  transition: opacity 0.3s;
}

/* -- 顶部 Logo 与打字机效果文案 -- */
.brand-header {
  text-align: center;
  margin-bottom: 40px;
  transform: translateZ(30px);

  .logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 68px; height: 68px;
    border-radius: 50%; /* 圆形更贴合泡泡灵动感 */
    background: linear-gradient(135deg, @color-sky, @color-pink, @color-yellow-bright);
    background-size: 200% 200%;
    animation: gradient-shift 5s ease infinite;
    margin-bottom: 24px;
    box-shadow: 0 12px 30px rgba(0, 198, 255, 0.3), inset 0 -2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

    &:hover {
      transform: scale(1.15) rotate(10deg);
    }

    svg { width: 34px; height: 34px; color: #fff; }
  }

  h1 {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 8px;
    /* 文字也用渐变 */
    background: linear-gradient(to right, #00c6ff, #ff8eaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* 幻彩打字机光标 */
  .typewriter {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 2.5s steps(15, end), blink-caret .75s step-end infinite;
    max-width: 100%;
    border-right: 3px solid @color-pink;
    padding-right: 4px;
  }

  p { font-size: 15px; color: @text-sub; margin: 0; font-weight: 500;}
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: @color-sky; } }

/* -- 覆盖 Arco Input 样式 (适配亮色磨砂) -- */
:deep(.arco-form) { transform: translateZ(20px); }

:deep(.arco-input-wrapper) {
  background-color: rgba(255, 255, 255, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  border-radius: 14px;
  color: @text-main !important;
  padding: 4px 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);

  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important;
    border-color: @color-sky !important;
  }

  &.arco-input-focus {
    background-color: #ffffff !important;
    border-color: @color-sky !important;
    box-shadow: 0 0 0 4px rgba(0, 198, 255, 0.2), inset 0 2px 4px rgba(0,0,0,0.02) !important;
    transform: translateY(-2px);
  }

  .arco-input {
    color: @text-main;
    font-size: 15px;
    font-weight: 500;
  }
  .arco-input-prefix { color: @text-sub; font-size: 18px; }
  .arco-input::placeholder { color: #94a3b8; }
}

/* -- 表单底部 -- */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 32px;

  :deep(.arco-checkbox) {
    color: @text-sub;
    font-weight: 500;

    .arco-checkbox-icon {
      border-radius: 6px;
      border-color: #cbd5e1;
      background-color: rgba(255,255,255,0.8);
      transition: all 0.2s;
    }
    .arco-checkbox-icon:hover {
      border-color: @color-pink;
    }
    &.arco-checkbox-checked .arco-checkbox-icon {
      background-color: @color-pink;
      border-color: @color-pink;
    }
  }

  .forgot-link {
    color: @color-sky;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    font-size: 14px;
    &:hover {
      color: @color-pink;
      transform: translateX(2px);
    }
  }
}

/* -- 终极动态按钮设计 -- */
.submit-btn {
  border-radius: 14px;
  font-weight: 700;
  font-size: 16px;
  height: 56px;
  color: #fff !important;
  /* 粉红、黄、天空蓝的三段渐变 */
  background: linear-gradient(115deg, @color-pink, @color-yellow-bright, @color-sky);
  background-size: 200% auto;
  border: none;
  box-shadow: 0 10px 25px rgba(255, 142, 170, 0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  position: relative;

  /* 悬浮呼吸动画与果冻弹跳 */
  &:hover:not([disabled]) {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 15px 35px rgba(0, 198, 255, 0.4), 0 5px 15px rgba(255, 142, 170, 0.5);
    background-position: right center; /* 梦幻色彩转动 */
  }

  &:active {
    transform: translateY(2px) scale(0.97);
    box-shadow: 0 5px 15px rgba(0, 198, 255, 0.3);
  }
}

@media (max-width: 480px) {
  .login-card-wrapper { transform: none !important; transition: none; padding: 16px; }
  .login-card { padding: 40px 24px; border-radius: 24px; background: rgba(255,255,255,0.7); filter: none;}
  .mouse-light, .card-glow, .glass-bubble { display: none; }
}

/* -- 隐秘管理员入口 (Ghost Trigger) -- */
.ghost-trigger {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: @text-sub;
  text-decoration: none;
  opacity: 0.15;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 50;
  padding: 8px 12px;
  border-radius: 20px;
  background: transparent;

  .ghost-text {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    opacity: 1;
    color: @color-sky;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 198, 255, 0.15);

    .ghost-text {
      max-width: 100px;
      opacity: 1;
      padding-right: 4px;
    }
  }
}
</style>