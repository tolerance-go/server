import { getPackagesSync } from '@manypkg/get-packages';
import prettier from '@umijs/utils/compiled/prettier';
import { readFileSync, writeFileSync } from 'fs';
import { omitBy } from 'lodash';
import { join, relative } from 'path';
import { IApi } from 'umi';

let once = false;

export default (api: IApi) => {
  api.describe({
    key: 'monorepoTsConfigGenerate',
    enableBy: api.EnableBy.register,
  });

  const modifyTsConfig = () => {
    const umiTsconfig = JSON.parse(
      readFileSync(join(api.paths.absTmpPath, 'tsconfig.json'), 'utf-8'),
    );

    const oldTsconfigContent = readFileSync(
      join(api.paths.cwd, 'tsconfig.json'),
      'utf-8',
    );

    const oldTsconfig = JSON.parse(oldTsconfigContent);

    const pkg = JSON.parse(readFileSync(api.pkgPath, 'utf-8'));

    const allDepends = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    const workspaceDepends = Object.keys(allDepends).filter((pkgName) =>
      allDepends[pkgName].startsWith('workspace:'),
    );

    const monorepos = getPackagesSync(api.paths.cwd);

    const paths = workspaceDepends.reduce((acc, depend) => {
      const monoPkg = monorepos.packages.find(
        (data) => data.packageJson.name === depend,
      );
      return {
        ...acc,
        [join(depend, '*')]: [
          join(relative(api.paths.cwd, monoPkg!.dir), 'src', '*'),
        ],
      };
    }, {});

    const cur = {
      ...oldTsconfig.compilerOptions?.paths,
      // tsconfig paths 数组会覆盖，不进行合并，把老的取出来
      ...umiTsconfig.compilerOptions.paths,
    };

    const monoPkgs = monorepos.packages.map((pkg) => pkg.packageJson.name);

    const nextTsConfig = {
      ...oldTsconfig,
      compilerOptions: {
        ...oldTsconfig.compilerOptions,
        paths: {
          ...omitBy(cur, (val, key) => {
            // @fenxing/common/* -> @fenxing/common
            return monoPkgs.includes(key.replace(/\/\*$/, ''));
          }),
          ...paths,
        },
      },
    };

    const nextTsConfigContent = JSON.stringify(nextTsConfig);

    if (oldTsconfigContent === nextTsConfigContent) return;

    api.logger.ready('monorepoTsConfigGenerate start gen tsconfig');

    writeFileSync(
      join(api.paths.cwd, 'tsconfig.json'),
      prettier.format(nextTsConfigContent, {
        parser: 'json',
      }),
      'utf-8',
    );
  };

  api.onPkgJSONChanged(() => {
    modifyTsConfig();
  });

  api.onBeforeCompiler(() => {
    if (once) return;

    once = true;
    modifyTsConfig();
  });
};
