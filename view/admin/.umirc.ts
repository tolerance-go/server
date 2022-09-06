import { defineConfig } from '@umijs/max';
import path from 'path';
import { BASE, PUBLIC_PATH } from './src/constants/base';
import { PATHS } from './src/constants/path';

export default defineConfig({
  plugins: [
    require.resolve('@umijs/max-plugin-openapi'),
    path.join(__dirname, 'plugins', 'executor', 'index.ts'),
  ],
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
  conventionRoutes: {
    exclude: [
      /\/components\/?/,
      /\/models\/?/,
      /\/constants\/?/,
      /\/assets\/?/,
      /\/domains\/?/,
      /\/executors\/?/,
      /\/effects\/?/,
      /\/helps\/?/,
      /\/helpers\/?/,
      /\/hooks\/?/,
      /\/layouts\/?/,
      /\/typings\/?/,
      /\/utils\/?/,
      /\/wrappers\/?/,
      /\/services\/?/,
      /\.md$/,
      /_/,
      /[A-Z]/,
    ],
  },
  npmClient: 'pnpm',
  base: BASE,
  publicPath: PUBLIC_PATH,
});
