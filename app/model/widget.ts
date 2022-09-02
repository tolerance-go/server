import { Application } from 'egg';
import {
  Association,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';
import { UserModel } from './user';
import { WidgetGroupModel } from './widgetGroup';

export type WidgetEntity = {};

export type CreationWidgetEntity = WidgetEntity;

export class WidgetModel extends Model<
  InferAttributes<WidgetModel>,
  InferCreationAttributes<WidgetModel>
> {
  declare id: CreationOptional<string>;
  declare desc: CreationOptional<string>;
  declare labels: CreationOptional<string>;
  declare name: string;
  declare elementType: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;
  declare type: string;
  declare display: string;
  declare widgetGroupId: CreationOptional<string>;
  declare userId: CreationOptional<string>;
  declare static associations: {
    user: Association<WidgetModel, UserModel>;
    widgetGroup: Association<WidgetModel, WidgetGroupModel>;
  };
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE } = app.Sequelize;

  const Widget = app.model.define<WidgetModel>('widget', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    display: {
      type: STRING(30),
      validate: {
        isIn: [['inline-block', 'block']],
      },
    },
    widgetGroupId: {
      type: UUID,
      field: 'widget_group_id',
    },
    elementType: STRING,
    type: STRING,
    name: STRING(30),
    desc: STRING,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    labels: stringButArrayType<WidgetModel>(app, 'labels'),
    userId: {
      type: UUID,
      field: 'user_id',
    },
  });

  (
    Widget as typeof Widget & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Widget.hasMany(app.model.License);
    app.model.Widget.belongsTo(app.model.WidgetGroup);
    app.model.Widget.belongsTo(app.model.User);
    app.model.Widget.hasMany(app.model.Review);
  };

  return Widget;
};
