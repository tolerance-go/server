import { defineConfig } from '@umijs/max';
import { BASE, PUBLIC_PATH } from './src/constants/base';

export default defineConfig({
  plugins: [require.resolve('@umijs/max-plugin-openapi')],
  openAPI: [
    {
      requestLibPath: "import { request } from '@/utils/request'",
      schemaPath: 'http://127.0.0.1:7001/swagger-doc',
      projectName: 'server',
    },
  ],
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
  access: {},
  model: {},
  initialState: {
    loading: '@fenxing/app-loading',
  },
  layout: {
    title: '分形低代码管理后台',
  },
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '工作台',
      path: '/dashboard',
      component: './Dashboard',
      icon: 'carryOut',
    },
    {
      name: '需求管理',
      path: '/demands',
      component: './Demands',
      icon: 'compass',
    },
    {
      name: '应用管理',
      path: '/apps',
      component: './Apps',
      icon: 'partition',
    },
    {
      name: '讨论管理',
      path: '/discuss',
      component: './Discuss',
      icon: 'message',
    },
    {
      name: '版本管理',
      path: '/versions',
      component: './Versions',
      icon: 'branches',
    },
    {
      name: '团队管理',
      path: '/teams',
      component: './Teams',
      icon: 'team',
    },
    {
      name: '组件管理',
      path: '/widgets',
      icon: 'appstoreAdd',
      routes: [
        {
          name: '我的安装',
          path: '/widgets/install',
          component: './WidgetsInstall',
        },
        {
          name: '我的发布',
          path: '/widgets/publish',
          component: './WidgetsPublish',
        },
      ],
    },
    {
      path: '*',
      component: '/404',

      // 以下不起作用
      // // 不展示顶栏
      // headerRender: false,
      // // 不展示页脚
      // footerRender: false,
      // // 不展示菜单
      // menuRender: false,
      // // 隐藏自己和子菜单
      // hideInMenu: true,
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: '测试页面',
    //   path: '/test',
    //   component: './test',
    // },
  ],
  npmClient: 'pnpm',
  base: BASE,
  publicPath: PUBLIC_PATH,
});
