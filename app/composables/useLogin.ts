import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';

export const useLogin = () => {
  const router = useRouter();
  const loading = ref(false);
  const formRef = ref();

  const formData = reactive({
    username: '',
    password: '',
    remember: false
  });

  const rules = {
    username: [
      { required: true, message: '请输入用户名或邮箱' },
      { min: 4, message: '账号长度不能小于4位' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码长度不能小于6位' }
    ]
  };

  const handleLogin = async ({ errors, values }: any) => {
    if (errors) return;

    loading.value = true;
    try {
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 模拟简单的请求验证逻辑
      if (formData.username === 'admin' && formData.password === '123456') {
        Message.success('登录成功，欢迎回来！');
        // 保存 token 等逻辑
        // localStorage.setItem('token', 'mock_token_...');
        // router.push('/'); // 根据你的布局和页面结构跳转
      } else {
        Message.error('用户名或密码错误');
      }
    } catch (error) {
      Message.error('登录失败，请稍后重试');
    } finally {
      loading.value = false;
    }
  };

  return {
    formRef,
    formData,
    rules,
    loading,
    handleLogin
  };
};