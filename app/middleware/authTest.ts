import { Context } from 'egg';
export default () => {
  return async function authTest(ctx: Context, next: () => Promise<any>) {
    console.log('ctx.request.url', ctx.request.url, ctx.request.method);

    const whiteList = [
      'POST:/api/login',
      'POST:/api/users',
      'GET:/swagger-doc',
      'GET:/swagger-ui.html',
      'GET:/swagger-ui.css',
      'GET:/swagger-ui-bundle.js',
      'GET:/swagger-ui-standalone-preset.js',
      'GET:/api/admin/db-init',
      'GET:/favicon-16x16.png',
      'GET:/favicon-32x32.png',
    ];
    if (whiteList.includes(`${ctx.request.method}:${ctx.request.url}`)) {
      return next();
    }

    if (!ctx.isAuthenticated()) {
      ctx.status = 401;
      throw new Error('用户未登录');
    }

    const user = await ctx.model.User.findByPk(ctx.user.id);

    if (!user) {
      ctx.status = 401;
      throw new Error('token 失效');
    }

    ctx.state.user = user;

    return next();
  };
};
