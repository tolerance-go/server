import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1657513962993_5337';

  // add your egg config in here
  config.middleware = ['errorHandler', 'authTest'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'database_development',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qaz892728595',
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
  };

  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    apiInfo: {
      title: '接口文档', // 接口文档的标题
      description: 'swagger 测试接口文档', // 接口文档描述
      version: '1.0.0', // 接口文档版本
      termsOfService: 'http://swagger.io/terms/', // 服务条件
      contact: {
        email: '892728595@qq.com', // 联系方式
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    basePath: '/', // 配置基础路径
    schemes: ['http', 'https'], // 配置支持的协议
    consumes: ['application/json'], // 指定处理请求的提交内容类型 (Content-Type)，如 application/json、text/html
    produces: ['application/json'], // 指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: {}, // 配置接口安全授权方式
    enableSecurity: false, // 是否启用授权，默认 false
    // enableValidate: true, // 是否启用参数校验，默认 true
    // routerMap: false, // 是否启用自动生成路由(实验功能)，默认 true
    routerMap: false,
    enable: true, // 默认 true
  };

  config.passportGithub = {
    key: 'd851b821e52ed67852f7',
    secret: '6f00f773407344a7b783e667c26362589a86edc5',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  config.multipart = {
    mode: 'file',
    // 表单 Field 文件名长度限制
    fieldNameSize: 100,
    // 表单 Field 内容大小
    fieldSize: '100kb',
    // 表单 Field 最大个数
    fields: 10,

    // 单个文件大小
    fileSize: '10mb',
    // 允许上传的最大文件数
    files: 10,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
