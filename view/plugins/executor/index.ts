import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IApi } from '@umijs/max';
import { ExecutorUtils } from './utils/executorUtils';
import { withTmpPath } from './utils/withTmpPath';

export default (api: IApi) => {
  api.describe({
    key: 'executor',
    // config: {
    //   schema(Joi) {
    //     return Joi.object({
    //        ... 暴露配置项
    //     });
    //   },
    // },
    // 注册启用
    enableBy: api.EnableBy.register,
  });

  api.onGenerateFiles(async () => {
    const executors = await getAllExecutors(api);

    // executors.ts
    api.writeTmpFile({
      path: 'executors.ts',
      content: ExecutorUtils.getExecutorsContent(executors),
    });

    // index.tsx
    const runtimeContent = readFileSync(
      join(__dirname, './libs/runtime.tsx'),
      'utf-8',
    );

    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: runtimeContent,
    });
  });

  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, 'executors')];
  });

  api.addRuntimePlugin({
    fn: () => {
      return [withTmpPath({ api, path: 'runtime.tsx' })];
    },
    // 保证在 model 之前执行，然后再被 model 包裹
    before: 'model',
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
