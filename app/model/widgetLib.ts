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
import { WidgetGroupModel } from './widgetGroup';

export type WidgetLibEntity = {};

export type CreationWidgetLibEntity = WidgetLibEntity & {};

export class WidgetLibModel extends Model<
  InferAttributes<WidgetLibModel, { omit: 'widgetGroups' }>,
  InferCreationAttributes<WidgetLibModel>
> {
  declare id: CreationOptional<string>;
  declare desc: CreationOptional<string>;
  declare labels: CreationOptional<string>;
  declare name: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare type: string;
  declare userId: CreationOptional<string>;
  declare widgetGroups?: CreationAttributes<WidgetGroupModel>[];
  declare static associations: {
    user: Association<WidgetModel, UserModel>;
    widgetGroups: Association<WidgetLibModel, WidgetGroupModel>;
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
    app.model.WidgetLib.hasMany(app.model.License);
    app.model.WidgetLib.belongsTo(app.model.User);
    app.model.WidgetLib.hasMany(app.model.WidgetGroup);
    app.model.WidgetLib.hasMany(app.model.Review);
  };

  return WidgetLib;
};
