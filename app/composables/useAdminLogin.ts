import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';

export const useAdminLogin = () => {
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
      { required: true, message: '请输入管理员账号' },
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

      if (formData.username === 'admin' && formData.password === '123456') {
        Message.success('管理员认证成功，正在进入控制台...');
        router.push('/admin');
      } else {
        Message.error('管理员账号或密码错误');
      }
    } catch (error) {
      Message.error('登录异常，请稍后重试');
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