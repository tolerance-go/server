import { IApi } from '@umijs/max';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default (api: IApi) => {
  api.describe({
    key: 'monorepoTsConfigGenerate',
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object({
            paths: Joi.object(),
          }),
        );
      },
      /**
       * api.ConfigChangeType.reload 表示在 dev 模式下，配置项被修改时会重启 dev 进程。
       * 你也可以修改为 api.ConfigChangeType.regenerateTmpFiles, 表示只重新生成临时文件
       */
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    // 注册启用
    enableBy: api.EnableBy.config,
  });

  api.onGenerateFiles(async () => {
    const umiTsconfig = JSON.parse(
      readFileSync(join(api.paths.absTmpPath, 'tsconfig.json'), 'utf-8'),
    );

    const oldTsconfig = JSON.parse(
      readFileSync(join(api.paths.cwd, 'tsconfig.json'), 'utf-8'),
    );

    const next = {
      ...oldTsconfig,
      compilerOptions: {
        ...oldTsconfig.compilerOptions,
        paths: {
          ...oldTsconfig.compilerOptions.paths,
          ...umiTsconfig.compilerOptions.paths,
          ...api.config.monorepoTsConfigGenerate.paths,
        },
      },
    };

    if (JSON.stringify(oldTsconfig) === JSON.stringify(next)) return;

    console.log('monorepoTsConfigGenerate start gen tsconfig');

    writeFileSync(
      join(api.paths.cwd, 'tsconfig.json'),
      JSON.stringify(next, null, 2),
      'utf-8',
    );
  });
};
