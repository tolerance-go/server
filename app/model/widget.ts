import { Application } from 'egg';
import { Association, Model } from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';
import { UserModel } from './user';
import { WidgetGroupModel } from './widgetGroup';

export type WidgetEntity = {
  id?: string;
  desc?: string;
  labels?: string;
  name: string;
  elementType: string;
  createdAt?: string;
  updatedAt?: string;
  type: string;
  widgetGroupId?: string;
  userId?: string;
};

export type CreationWidgetEntity = WidgetEntity;

export type WidgetModel = Model<Required<WidgetEntity>, CreationWidgetEntity>;

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
    labels: stringButArrayType<WidgetEntity>(app, 'labels'),
    userId: {
      type: UUID,
      field: 'user_id',
    },
  });

  const next = Widget as typeof Widget & {
    associate: () => void;
    associations: {
      user: Association<WidgetModel, UserModel>;
      widgetGroup: Association<WidgetModel, WidgetGroupModel>;
    };
  };

  next.associate = () => {
    app.model.Widget.hasMany(app.model.License);
    app.model.Widget.belongsTo(app.model.WidgetGroup);
    app.model.Widget.belongsTo(app.model.User);
    app.model.Widget.hasMany(app.model.Review);
  };

  return next;
};
