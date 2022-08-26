import 'egg';
import { ModelStatic } from 'sequelize';
import { getAuthorization } from '../app/model/authorization';

declare module 'egg' {
  // 扩展 app
  interface Application {}
}
