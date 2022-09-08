import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { IApi } from '@umijs/max';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ExecutorUtils } from './utils/executorUtils';
import { withTmpPath } from './utils/withTmpPath';

export default (api: IApi) => {
  api.describe({
    key: 'executor',
    // 注册启用
    enableBy: api.EnableBy.register,
  });

  api.onGenerateFiles(async () => {
    const executors = await getAllExecutors(api);

    // index.tsx
    const indexContent = readFileSync(
      join(__dirname, './lib/index.tsx'),
      'utf-8',
    );
    api.writeTmpFile({
      path: 'index.tsx',
      content: indexContent,
    });

    // runtime.ts
    const runtimeContent = readFileSync(
      join(__dirname, './lib/runtime.ts'),
      'utf-8',
    );
    api.writeTmpFile({
      path: 'runtime.ts',
      content: runtimeContent,
    });

    // executors.ts
    api.writeTmpFile({
      path: 'executors.ts',
      content: ExecutorUtils.getExecutorsContent(executors),
    });
  });

  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, 'executors')];
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.ts' })];
  });
};

async function getAllExecutors(api: IApi) {
  return new ExecutorUtils(api, {
    // 测试默认导出是不是函数
    astTest({ node }) {
      return t.isArrowFunctionExpression(node) || t.isFunctionDeclaration(node);
    },
  }).getAllExecutors();
}
