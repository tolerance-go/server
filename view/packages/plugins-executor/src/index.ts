import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { IApi } from '@umijs/max';
import { Mustache, winPath } from '@umijs/max/plugin-utils';
import { readFileSync } from 'fs';
import { groupBy } from 'lodash';
import { basename, dirname, extname, format, join } from 'path';
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

    const groups = groupBy(executors, (item) => item.pathname);

    const genFiles = Object.keys(groups).map((pathname, index) => {
      const filePath = `${join(
        'executors',
        pathname.split('/').join('_'),
      )}.tsx`;

      return {
        pathname,
        absFilePath: join(api.paths.absTmpPath, 'plugin-executor', filePath),
        filePath,
        index,
        executors: groups[pathname].map((executor) => {
          const fileWithoutExt = winPath(
            format({
              dir: dirname(executor.file),
              base: basename(executor.file, extname(executor.file)),
            }),
          );
          return {
            ...executor,
            fileWithoutExt,
          };
        }),
      };
    });

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
    const runtimeTpl = readFileSync(
      join(__dirname, './lib/runtime.ts.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: 'runtime.ts',
      content: Mustache.render(runtimeTpl, {
        files: genFiles,
        ifElse() {
          if (this.index === 0) {
            return 'if';
          }
          return 'else if';
        },
      }),
    });

    const executorTpl = readFileSync(
      join(__dirname, './lib/executors/path.tsx.tpl'),
      'utf-8',
    );
    genFiles.forEach(({ filePath, executors }) => {
      // executors.ts
      api.writeTmpFile({
        path: filePath,
        content: Mustache.render(executorTpl, {
          executors,
        }),
      });
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
