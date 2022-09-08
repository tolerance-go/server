import { Application } from 'egg';
import {
  Association,
  CreationAttributes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';
import { UserModel } from './user';
import { WidgetModel } from './widget';
import { WidgetLibModel } from './widgetLib';

export type WidgetGroupEntity = {};

export type CreationWidgetGroupEntity = WidgetGroupEntity & {};
export class WidgetGroupModel extends Model<
  InferAttributes<WidgetGroupModel>,
  InferCreationAttributes<WidgetGroupModel>
> {
  declare id: CreationOptional<string>;
  declare desc: CreationOptional<string>;
  declare labels: CreationOptional<string>;
  declare name: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare type: string;
  declare widgetLibId: CreationOptional<string>;
  declare userId: CreationOptional<string>;
  declare widgets?: CreationAttributes<WidgetModel>[];
  declare static associations: {
    user: Association<WidgetGroupModel, UserModel>;
    widgets: Association<WidgetGroupModel, WidgetModel>;
    widgetLib: Association<WidgetGroupModel, WidgetLibModel>;
  };
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE } = app.Sequelize;

  const WidgetGroup = app.model.define<WidgetGroupModel>('widgetGroup', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    widgetLibId: {
      type: UUID,
      field: 'widget_lib_id',
    },
    type: STRING,
    name: STRING(30),
    desc: STRING,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    labels: stringButArrayType<WidgetGroupModel>(app, 'labels'),
    userId: {
      type: UUID,
      field: 'user_id',
    },
  });

  (
    WidgetGroup as typeof WidgetGroup & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.WidgetGroup.hasMany(app.model.License);
    app.model.WidgetGroup.hasMany(app.model.Widget);
    app.model.WidgetGroup.belongsTo(app.model.WidgetLib);
    app.model.WidgetGroup.belongsTo(app.model.User);
    app.model.WidgetGroup.hasMany(app.model.Review);
  };

  return WidgetGroup;
};
