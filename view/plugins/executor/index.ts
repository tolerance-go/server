import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IApi } from '@umijs/max';
import { ExecutorUtils } from './utils/executorUtils';
// import { withTmpPath } from './utils/withTmpPath';
import { groupBy } from 'lodash';

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

    const executorsGroupByPathname = groupBy(
      executors,
      (item) => item.pathname,
    );

    const indexContent = readFileSync(
      join(__dirname, './libs/Executor.tsx'),
      'utf-8',
    );

    Object.keys(executorsGroupByPathname).forEach((pathname) => {
      const dir = join('routes', pathname);

      // executors.ts
      api.writeTmpFile({
        path: join(dir, 'executors.ts'),
        content: ExecutorUtils.getExecutorsContent(
          executorsGroupByPathname[pathname],
        ),
      });

      // index.tsx
      api.writeTmpFile({
        path: join(dir, 'index.tsx'),
        content: indexContent,
      });
    });
  });

  api.addTmpGenerateWatcherPaths(() => {
    return [join(api.paths.absSrcPath, 'executors')];
  });

  // api.addRuntimePlugin({
  //   fn: () => {
  //     return [withTmpPath({ api, path: 'runtime.tsx' })];
  //   },
  //   // 保证在 model 之前执行，然后再被 model 包裹
  //   before: 'model',
  // });
};

async function getAllExecutors(api: IApi) {
  return new ExecutorUtils(api, {
    // 测试默认导出是不是函数
    astTest({ node }) {
      return t.isArrowFunctionExpression(node) || t.isFunctionDeclaration(node);
    },
  }).getAllExecutors();
}
