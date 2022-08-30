import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationAttributes,
} from 'sequelize';
import { WidgetLibModel } from './widgetLib';
export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  nickname: CreationOptional<string>;
  password: string;
  email: CreationOptional<string>;
  avatar: CreationOptional<string>;
  username: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  widget?: CreationAttributes<WidgetLibModel>[];
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE } = app.Sequelize;

  const User = app.model.define<UserModel>('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: STRING,
    avatar: STRING,
    password: STRING,
    nickname: STRING(30),
    username: STRING(30),
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  (
    User as typeof User & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.User.hasMany(app.model.App);
    app.model.User.hasMany(app.model.WidgetLib);
    app.model.User.hasMany(app.model.Widget);
    app.model.User.hasMany(app.model.License);
    // app.model.User.hasMany(app.model.Review);
  };

  return User;
};
