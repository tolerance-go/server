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
    },
    // 注册启用
    enableBy: api.EnableBy.config,
  });

  // api.onCheck(async () => {
  //   console.log('onCheck');
  // });
  // api.onCheckCode(async () => {
  //   console.log('onCheckCode');
  // });
  // api.onCheckConfig(async () => {
  //   console.log('onCheckConfig');
  // });
  // api.onCheckPkgJSON(async () => {
  //   console.log('onCheckPkgJSON');
  // });
  // api.onDevCompileDone(async () => {
  //   console.log('onDevCompileDone');
  // });
  // api.onGenerateFiles(async () => {
  //   console.log('onGenerateFiles');
  // });
  // api.onPatchRoute(async () => {
  //   console.log('onPatchRoute');
  // });
  // api.onPkgJSONChanged(async () => {
  //   console.log('onPkgJSONChanged');
  // });
  // api.onStart(async () => {
  //   console.log('onStart');
  // });

  api.onGenerateFiles(async () => {
    const umiTsconfig = JSON.parse(
      readFileSync(
        join(api.paths.absSrcPath, '.umi', 'tsconfig.json'),
        'utf-8',
      ),
    );

    const oldTsconfig = JSON.parse(
      readFileSync(join(api.paths.cwd, 'tsconfig.json'), 'utf-8'),
    );

    const next = {
      ...oldTsconfig,
      extends: './src/.umi/tsconfig.json',
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
