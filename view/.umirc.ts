import { defineConfig } from '@umijs/max';
import { BASE, PUBLIC_PATH } from './src/constants/base';
import { PATHS } from './src/constants/path';

export default defineConfig({
  plugins: [require.resolve('@umijs/max-plugin-openapi')],
  openAPI: [
    {
      requestLibPath: "import { request } from '@/helpers/request'",
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
    loading: '@/components/AppLoading',
  },
  layout: {
    title: '分形低代码管理后台',
  },
  routes: [
    {
      path: PATHS.HOME,
      component: './Home',
      // 不展示顶栏
      headerRender: false,
      // 不展示页脚
      footerRender: false,
      // 不展示菜单
      menuRender: false,
      // 隐藏自己和子菜单
      hideInMenu: true,
    },
    {
      path: PATHS.LOGIN,
      component: './Login',
      headerRender: false,
      footerRender: false,
      menuRender: false,
      hideInMenu: true,
    },
    {
      path: PATHS.DESIGN,
      component: './Design/pages/Workbench',
      headerRender: false,
      footerRender: false,
      menuRender: false,
      hideInMenu: true,
      wrappers: ['@/wrappers/auth'],
    },
    {
      name: '工作台',
      path: PATHS.DASHBOARD,
      component: './Dashboard',
      icon: 'carryOut',
      wrappers: ['@/wrappers/auth'],
    },
    {
      name: '需求管理',
      path: '/demands',
      component: './Demands',
      icon: 'compass',
      wrappers: ['@/wrappers/auth'],
    },
    {
      name: '应用管理',
      path: PATHS.APP_LIST,
      component: './Apps',
      icon: 'partition',
      wrappers: ['@/wrappers/auth'],
    },
    {
      name: '讨论管理',
      path: '/discuss',
      component: './Discuss',
      icon: 'message',
      wrappers: ['@/wrappers/auth'],
    },
    {
      name: '版本管理',
      path: '/versions',
      component: './Versions',
      icon: 'branches',
      wrappers: ['@/wrappers/auth'],
    },
    {
      name: '团队管理',
      path: '/teams',
      component: './Teams',
      icon: 'team',
      wrappers: ['@/wrappers/auth'],
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
          wrappers: ['@/wrappers/auth'],
        },
        {
          name: '我的发布',
          path: '/widgets/publish',
          component: './WidgetsPublish',
          wrappers: ['@/wrappers/auth'],
        },
      ],
    },
    {
      path: '*',
      component: '/404',
      wrappers: ['@/wrappers/auth'],
      // 以下不起作用
      // @TODO: 上报该 bug
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
