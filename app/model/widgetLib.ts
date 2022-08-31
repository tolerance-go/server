import { Application } from 'egg';
import { Association, Model } from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';
import { UserModel } from './user';
import { WidgetModel } from './widget';
import { CreationWidgetGroupEntity, WidgetGroupModel } from './widgetGroup';

export type WidgetLibEntity = {
  id?: string;
  desc?: string;
  labels?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  type: string;
  userId?: string;
};

export type CreationWidgetLibEntity = WidgetLibEntity & {
  widgetGroups?: CreationWidgetGroupEntity[];
};

export type WidgetLibModel = Model<
  Required<WidgetLibEntity>,
  CreationWidgetLibEntity
>;

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
    labels: stringButArrayType<WidgetLibEntity>(app, 'labels'),
  });

  const next = WidgetLib as typeof WidgetLib & {
    associate: () => void;
    associations: {
      user: Association<WidgetModel, UserModel>;
      widgetGroups: Association<WidgetLibModel, WidgetGroupModel>;
    };
  };

  next.associate = () => {
    app.model.WidgetLib.hasMany(app.model.License);
    app.model.WidgetLib.belongsTo(app.model.User);
    app.model.WidgetLib.hasMany(app.model.WidgetGroup);
    app.model.WidgetLib.hasMany(app.model.Review);
  };

  return next;
};
