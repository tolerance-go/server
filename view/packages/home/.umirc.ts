import { defineConfig } from '@umijs/max';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
    '/public': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  antd: {},
  npmClient: 'pnpm',
  routes: [
    {
      name: '首页',
      path: '/',
      component: './Home',
    },
    {
      name: '登录页面',
      path: '/login',
      component: './Login',
    },
  ],
});
