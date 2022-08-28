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
import { WidgetModel } from './widget';

export class WidgetGroupModel extends Model<
  InferAttributes<WidgetGroupModel>,
  InferCreationAttributes<WidgetGroupModel>
> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  desc: CreationOptional<string>;
  labels: CreationOptional<string>;
  name: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  type: string;
  widgetLibId: CreationOptional<string>;
  widgets?: CreationAttributes<WidgetModel>[];
  static associations: {
    widgets: Association<WidgetGroupModel, WidgetModel>;
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
  });

  (
    WidgetGroup as typeof WidgetGroup & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.WidgetGroup.belongsTo(app.model.WidgetLib);
    app.model.WidgetGroup.hasMany(app.model.Widget);
  };

  return WidgetGroup;
};
