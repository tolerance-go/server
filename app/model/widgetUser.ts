import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface WidgetLibUserModel
  extends Model<
    InferAttributes<WidgetLibUserModel>,
    InferCreationAttributes<WidgetLibUserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  userId: string;
  widgetId: string;
}

export default (app: Application) => {
  const { UUID, UUIDV4, DATE } = app.Sequelize;

  const WidgetLibUser = app.model.define<WidgetLibUserModel>('widgetUser', {
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
    widgetId: {
      type: UUID,
      field: 'widget_id',
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  return WidgetLibUser;
};
