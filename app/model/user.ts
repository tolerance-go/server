import { Application } from 'egg';
import {
  CreationAttributes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { WidgetModel } from './widget';
export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  declare id: CreationOptional<string>;
  declare nickname: CreationOptional<string | null>;
  declare password: string;
  declare email: CreationOptional<string | null>;
  declare avatar: CreationOptional<string | null>;
  declare username: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare widgets?: CreationAttributes<WidgetModel>[];
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
    app.model.User.hasMany(app.model.Review);
  };

  return User;
};
