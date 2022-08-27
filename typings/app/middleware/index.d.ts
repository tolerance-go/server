// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthTest from '../../../app/middleware/authTest';
import ExportErrorHandler from '../../../app/middleware/error_handler';

declare module 'egg' {
  interface IMiddleware {
    authTest: typeof ExportAuthTest;
    errorHandler: typeof ExportErrorHandler;
  }
}
