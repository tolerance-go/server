import { conventionRoutes } from '@fenxing/common/src/configs/conventionRoutes';
import { defineConfig } from '@umijs/max';
import path from 'path';
import { BASE, PUBLIC_PATH } from './src/constants/base';

export default defineConfig({
  plugins: [
    require.resolve('@umijs/max-plugin-openapi'),
    require.resolve('@fenxing/plugins-executor'),
    require.resolve('@fenxing/plugins-monorepo-tsconfig-generate'),
  ],
  monorepoTsConfigGenerate: {
    paths: {
      '@fenxing/common/*': ['../common/src/*'],
    },
  },
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
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  clickToComponent: {},
  antd: {},
  access: {},
  model: {},
  initialState: {
    loading: '@/components/AppLoading',
  },
  layout: {
    title: '分形低代码管理后台',
  },
  conventionRoutes,
  npmClient: 'pnpm',
  base: BASE,
  publicPath: PUBLIC_PATH,
  monorepoRedirect: {},
});
