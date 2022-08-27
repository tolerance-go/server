import 'egg';
import { ModelStatic } from 'sequelize';
import { getAuthorization } from '../app/model/authorization';
import { UserModel } from '../app/model/user';

declare module 'egg' {
  // 扩展 app
  interface Application {}

  interface Context {
    state: {
      user: UserModel;
    };
  }
}
