import { BASE, PUBLIC_PATH } from '@fenxing/common/src/constants/base';
import { conventionRoutes } from '@fenxing/common/src/configs/conventionRoutes';
import { defineConfig } from '@umijs/max';

export default defineConfig({
  plugins: [require.resolve('@fenxing/plugins-monorepo-tsconfig-generate')],
  monorepoTsConfigGenerate: {
    paths: {
      '@fenxing/common/*': ['../common/src/*'],
    },
  },
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
  conventionRoutes,
  npmClient: 'pnpm',
  base: BASE,
  publicPath: PUBLIC_PATH,
  monorepoRedirect: {},
});
