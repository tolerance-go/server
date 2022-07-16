import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  swaggerdoc: {
    enable: true, // 是否启用
    package: 'egg-swagger-doc-custom', // 指定包名称
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
