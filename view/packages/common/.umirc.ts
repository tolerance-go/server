import { defineConfig } from '@umijs/max';
import path from 'path';
import { BASE, PUBLIC_PATH } from './src/constants/base';

export default defineConfig({
  plugins: [require.resolve('@umijs/max-plugin-openapi')],
  openAPI: [
    {
      requestLibPath:
        "import { request } from '@fenxing/common/helpers/request'",
      schemaPath: 'http://127.0.0.1:7001/swagger-doc',
      projectName: 'server',
    },
  ],
  npmClient: 'pnpm',
  base: BASE,
  publicPath: PUBLIC_PATH,
  model: {},
  initialState: {},
});
