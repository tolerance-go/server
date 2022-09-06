import * as Babel from '@umijs/bundler-utils/compiled/babel/core';
import * as parser from '@umijs/bundler-utils/compiled/babel/parser';
import traverse from '@umijs/bundler-utils/compiled/babel/traverse';
import * as t from '@umijs/bundler-utils/compiled/babel/types';
import { Loader, transformSync } from '@umijs/bundler-utils/compiled/esbuild';
import { readFileSync } from 'fs';
import { basename, dirname, extname, format, join, relative } from 'path';
import { IApi } from '@umijs/max';
import { glob, winPath } from '@umijs/max/plugin-utils';
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
  // src/pages/foo/executors/bar > foo/bar
  const validDirs = dirs.filter(
    (dir) => !['src', 'pages', 'executors'].includes(dir),
  );
  let normalizedFile = file;
  normalizedFile = basename(file, extname(file));
  // foo.executor > foo
  if (normalizedFile.endsWith('.executor')) {
    normalizedFile = normalizedFile.split('.').slice(0, -1).join('.');
  }
  return [...validDirs, normalizedFile].join('.');
}

export class Executor {
  file: string;
  namespace: string;
  id: string;
  exportName: string;
  exportConfigs: boolean;
  constructor(
    file: string,
    absSrcPath: string,
    id: number,
    exportConfigs: boolean,
  ) {
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
    this.exportConfigs = exportConfigs;
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
        pattern: '**/executors.{ts,tsx,js,jsx}',
      }),
    ].map(
      ({ file, exportConfigs }: { file: string; exportConfigs: boolean }) => {
        return new Executor(
          file,
          this.api.paths.absSrcPath,
          this.count++,
          exportConfigs,
        );
      },
    );
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
    const contentMaps: Record<string, string> = {};

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
        contentMaps[file] = content;
        return this.isExecutorValid({ content, file });
      })
      .map((file) => {
        const content = contentMaps[file]
          ? contentMaps[file]
          : readFileSync(file, 'utf-8');
        return {
          file,
          exportConfigs: !!content.match(/\nexport const executorConfigs/),
        };
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

  static getExecutorsContent(executors: Executor[]) {
    const imports: string[] = [];
    const executorProps: string[] = [];
    executors.forEach((executor) => {
      const fileWithoutExt = winPath(
        format({
          dir: dirname(executor.file),
          base: basename(executor.file, extname(executor.file)),
        }),
      );
      if (executor.exportName !== 'default') {
        imports.push(
          `import { ${executor.exportName} as ${executor.id} } from '${fileWithoutExt}';`,
        );
      } else {
        imports.push(`import ${executor.id} from '${fileWithoutExt}';`);
      }

      if (executor.exportConfigs) {
        imports.push(
          `import { executorConfigs as ${executor.id}_configs } from '${fileWithoutExt}';`,
        );
      }

      executorProps.push(
        `{ id: '${executor.id}', namespace: '${
          executor.namespace
        }', executor: ${executor.id},${
          executor.exportConfigs ? ` configs: ${executor.id}_configs` : ''
        } },`,
      );
    });
    return `
${imports.join('\n')}
export const executors = [
${executorProps.join('\n')}
] as const`;
  }
}
