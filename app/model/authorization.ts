import 'egg';
import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

interface AuthorizationModel
  extends Model<
    InferAttributes<AuthorizationModel>,
    InferCreationAttributes<AuthorizationModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  provider: CreationOptional<string>;
  id: CreationOptional<string>;
  uid: CreationOptional<string>;
  userId: CreationOptional<string>;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;

  const Authorization = app.model.define<AuthorizationModel>('authorization', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    /** 授权码 */
    uid: STRING,
    /** 授权方 */
    provider: STRING,
    /** 绑定的用户 id  */
    userId: {
      type: UUID,
      field: 'user_id',
    },
  });

  return Authorization;
};
