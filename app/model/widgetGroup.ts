import { Application } from 'egg';
import { Association, Model } from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';
import { UserModel } from './user';
import { CreationWidgetEntity, WidgetModel } from './widget';
import { WidgetLibModel } from './widgetLib';

export type WidgetGroupEntity = {
  id?: string;
  desc?: string;
  labels?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  type: string;
  widgetLibId?: string;
  userId?: string;
};

export type CreationWidgetGroupEntity = WidgetGroupEntity & {
  widgets?: CreationWidgetEntity[];
};
export type WidgetGroupModel = Model<
  Required<WidgetGroupEntity>,
  CreationWidgetGroupEntity
>;

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
    labels: stringButArrayType<WidgetGroupEntity>(app, 'labels'),
    userId: {
      type: UUID,
      field: 'user_id',
    },
  });

  const next = WidgetGroup as typeof WidgetGroup & {
    associate: () => void;
    associations: {
      user: Association<WidgetGroupModel, UserModel>;
      widgets: Association<WidgetGroupModel, WidgetModel>;
      widgetLib: Association<WidgetGroupModel, WidgetLibModel>;
    };
  };

  next.associate = () => {
    app.model.WidgetGroup.hasMany(app.model.License);
    app.model.WidgetGroup.hasMany(app.model.Widget);
    app.model.WidgetGroup.belongsTo(app.model.WidgetLib);
    app.model.WidgetGroup.belongsTo(app.model.User);
    app.model.WidgetGroup.hasMany(app.model.Review);
  };

  return next;
};
