import * as Babel from '@umijs/bundler-utils/compiled/babel/core';
import * as parser from '@umijs/bundler-utils/compiled/babel/parser';
import traverse from '@umijs/bundler-utils/compiled/babel/traverse';
import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { Loader, transformSync } from '@umijs/bundler-utils/compiled/esbuild';
import { IApi } from '@umijs/max';
import { glob, winPath } from '@umijs/max/plugin-utils';
import { readFileSync } from 'fs';
import { basename, extname, join, relative } from 'path';
import { getIdentifierDeclaration } from './astUtils';

interface IOpts {
  contentTest?: (content: string) => boolean;
  astTest?: (opts: { node: t.Node; content: string }) => boolean;
}

export function getNamespace(absFilePath: string, absSrcPath: string) {
  const relPath = winPath(relative(winPath(absSrcPath), winPath(absFilePath)));
  const parts = relPath.split('/');
  const dirs = parts.slice(0, -1);
  const file = parts[parts.length - 1];
  // src/pages/foo.executors/bar > foo/bar
  // src/pages/foo/executors/bar > foo/bar
  const validDirs = dirs
    .map((dir) => (dir.endsWith('.executors') ? dir.split('.')[0] : dir))
    .filter((dir) => !['src', 'pages', 'executors'].includes(dir));

  let normalizedFile = file;
  normalizedFile = basename(file, extname(file));

  return [...validDirs, normalizedFile].join('.');
}

export function getPathname(absFilePath: string, absSrcPath: string) {
  const relPath = winPath(relative(winPath(absSrcPath), winPath(absFilePath)));
  const parts = relPath.split('/');
  // executors 的使用方式：
  // executors 需要建在对应约定路由的边上
  // page/index.tsx = page/executors => page/index
  // page.tsx = page.executors => page
  const executorsIndex = parts.findIndex((item) => item.endsWith('executors'));

  const folderName = parts[executorsIndex];

  // executors -> @@/global-layout
  // pages/index.executor -> index
  // pages/pageA/pageSub.executor -> pageA/pageSub
  // pages/design/executors/cleanStageSelectNodeIdWhenSwitchPage.ts -> design
  let dirs = parts.slice(0, executorsIndex);

  if (dirs.length === 0) {
    return '@@/global-layout';
  }

  // 删除最前面的 pages
  dirs = dirs.slice(1);

  const exeParts = folderName.split('.');

  if (exeParts.length === 2) {
    return dirs.concat(exeParts[0]).join('/');
  }

  return dirs.concat('index').join('/');
}

export class Executor {
  file: string;
  namespace: string;
  id: string;
  exportName: string;
  pathname: string;
  constructor(file: string, absSrcPath: string, id: number) {
    let namespace;
    let exportName;
    const [_file, meta] = file.split('#');
    if (meta) {
      const metaObj: Record<string, string> = JSON.parse(meta);
      namespace = metaObj.namespace;
      exportName = metaObj.exportName;
    }
    this.file = _file;
    this.id = `executor_${id}`;
    this.namespace = namespace || getNamespace(_file, absSrcPath);
    this.exportName = exportName || 'default';
    this.pathname = getPathname(_file, absSrcPath);
  }
}

export class ExecutorUtils {
  api: IApi;
  opts: IOpts = {};
  count = 1;
  constructor(api: IApi | null, opts: IOpts) {
    this.api = api as IApi;
    this.opts = opts;
  }

  getAllExecutors() {
    // reset count
    this.count = 1;
    const executors = [
      ...this.getExecutors({
        base: join(this.api.paths.absSrcPath, 'executors'),
        pattern: '**/*.{ts,tsx,js,jsx}',
      }),
      ...this.getExecutors({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/executors/**/*.{ts,tsx,js,jsx}',
      }),
      ...this.getExecutors({
        base: join(this.api.paths.absPagesPath),
        pattern: '**/*.executors/**/*.{ts,tsx,js,jsx}',
      }),
    ].map((file: string) => {
      return new Executor(file, this.api.paths.absSrcPath, this.count++);
    });
    // check duplicate
    const namespaces = executors.map((executor) => executor.namespace);
    if (new Set(namespaces).size !== namespaces.length) {
      throw new Error(
        `Duplicate namespace in executors: ${namespaces.join(', ')}`,
      );
    }

    return executors;
  }

  getExecutors(opts: { base: string; pattern?: string }) {
    return glob
      .sync(opts.pattern || '**/*.{ts,js}', {
        cwd: opts.base,
        absolute: true,
      })
      .map(winPath)
      .filter((file) => {
        if (/\.d.ts$/.test(file)) return false;
        if (/\.(test|e2e|spec).([jt])sx?$/.test(file)) return false;
        const content = readFileSync(file, 'utf-8');
        return this.isExecutorValid({ content, file });
      });
  }

  isExecutorValid(opts: { content: string; file: string }) {
    const { file, content } = opts;

    if (this.opts.contentTest && this.opts.contentTest(content)) {
      return true;
    }

    // transform with esbuild first
    // to reduce unexpected ast problem
    const loader = extname(file).slice(1) as Loader;
    const result = transformSync(content, {
      loader,
      sourcemap: false,
      minify: false,
    });

    // transform with babel
    let ret = false;
    const ast = parser.parse(result.code, {
      sourceType: 'module',
      sourceFilename: file,
      plugins: [],
    });
    traverse(ast, {
      ExportDefaultDeclaration: (
        path: Babel.NodePath<t.ExportDefaultDeclaration>,
      ) => {
        let node: any = path.node.declaration;
        node = getIdentifierDeclaration(node, path);
        if (this.opts.astTest && this.opts.astTest({ node, content })) {
          ret = true;
        }
      },
    });

    return ret;
  }
}
