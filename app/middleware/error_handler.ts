enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  WARN_NOTIFICATION = 4,
  ERROR_NOTIFICATION = 5,
  REDIRECT = 9,
}

export default () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (error: any) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', error, ctx);

      // validate 错误
      // err
      // {
      //   code: "invalid_param"
      //   errors: [{message: "required", field: "desc", code: "missing_field"},…]
      //   message: "Validation Failed"
      // }
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        success: false,
        // @TODO: 业务代码可以控制 showType
        showType: ErrorShowType.ERROR_NOTIFICATION,
        errorCode: 0,
        errorMessage:
          error.code === 'invalid_param' ? '参数格式错误' : '服务器内部错误',
        // invalid_param 会出现 errors
        data: error.errors ?? error.message,
      };

      ctx.status = 200;
    }
  };
};
