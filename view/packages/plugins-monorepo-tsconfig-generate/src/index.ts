import { omitBy } from 'lodash';
import { IApi } from 'umi';
import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { getPackagesSync } from '@manypkg/get-packages';

let once = false;

export default (api: IApi) => {
  api.describe({
    key: 'monorepoTsConfigGenerate',
    config: {
      schema(Joi) {
        return Joi.object({});
      },
    },
    enableBy: api.EnableBy.config,
  });

  const modifyTsConfig = () => {
    const umiTsconfig = JSON.parse(
      readFileSync(join(api.paths.absTmpPath, 'tsconfig.json'), 'utf-8'),
    );

    const oldTsconfig = JSON.parse(
      readFileSync(join(api.paths.cwd, 'tsconfig.json'), 'utf-8'),
    );

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

    const next = {
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

    if (JSON.stringify(oldTsconfig) === JSON.stringify(next)) return;

    api.logger.ready('monorepoTsConfigGenerate start gen tsconfig');

    writeFileSync(
      join(api.paths.cwd, 'tsconfig.json'),
      JSON.stringify(next, null, 2),
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
