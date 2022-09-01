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

      const formatErrorMsg = () => {
        if (error.code === 'invalid_param') {
          return `参数格式错误: ${JSON.stringify(error.errors)}`;
        }
        return `服务器内部错误: ${error.message ?? '未知'}`;
      };

      ctx.body = {
        success: false,
        // @TODO: 业务代码可以控制 showType
        showType: ErrorShowType.ERROR_NOTIFICATION,
        errorCode: 0,
        errorMessage: formatErrorMsg(),
        // invalid_param 会出现 errors，TODO：把它序列化放到 message 里面去
        // data: error.errors ?? error.message,
      };
    }
  };
};
