import { Application } from 'egg';
import {
  CreationAttributes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Association,
} from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';
import { UserModel } from './user';
import { WidgetGroupModel } from './widgetGroup';

export class WidgetLibModel extends Model<
  InferAttributes<WidgetLibModel>,
  InferCreationAttributes<WidgetLibModel>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  desc: CreationOptional<string>;
  labels: CreationOptional<string>;
  name: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  type: string;
  userId: CreationOptional<string>;
  widgetGroups?: CreationAttributes<WidgetGroupModel>[];
  static associations: {
    widgetGroups: Association<WidgetLibModel, WidgetGroupModel>;
    users: Association<WidgetLibModel, UserModel>;
  };
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE } = app.Sequelize;

  const WidgetLib = app.model.define<WidgetLibModel>('widgetLib', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: UUID,
      field: 'user_id',
    },
    type: STRING,
    name: STRING(30),
    desc: STRING,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    labels: stringButArrayType<WidgetLibModel>(app, 'labels'),
  });

  (
    WidgetLib as typeof WidgetLib & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.WidgetLib.belongsToMany(app.model.User, {
      through: app.model.WidgetLibUser,
    });
    app.model.WidgetLib.hasMany(app.model.WidgetGroup);
  };

  return WidgetLib;
};
