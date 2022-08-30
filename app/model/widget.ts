import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';

export interface WidgetModel
  extends Model<
    InferAttributes<WidgetModel>,
    InferCreationAttributes<WidgetModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  desc: CreationOptional<string>;
  labels: CreationOptional<string>;
  name: string;
  elementType: string;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  type: string;
  widgetGroupId: CreationOptional<string>;
  userId: CreationOptional<string>;
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
