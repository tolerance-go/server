import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { jsonButObjectType } from '../utils/jsonButObjectType';
import { stringButArrayType } from '../utils/stringButArrayType';

export interface AppModel
  extends Model<InferAttributes<AppModel>, InferCreationAttributes<AppModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  desc: CreationOptional<string>;
  labels: CreationOptional<string>;
  appData: CreationOptional<string>;
  historyData: CreationOptional<string>;
  stageSizeData: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  title: string;
  userId: string;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE, JSON: JSON_TYPE } = app.Sequelize;

  const App = app.model.define<AppModel>('app', {
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
    title: STRING(30),
    appData: jsonButObjectType<AppModel>(app, 'appData', 'app_data'),
    historyData: {
      type: JSON_TYPE,
      field: 'history_data',
    },
    desc: STRING,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    stageSizeData: {
      type: JSON_TYPE,
      field: 'stage_size_data',
    },
    labels: stringButArrayType<AppModel>(app, 'labels'),
  });

  (
    App as typeof App & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.App.hasMany(app.model.Page);
    app.model.App.hasMany(app.model.Version);
    app.model.App.hasMany(app.model.Component);
    app.model.App.hasMany(app.model.Database);
    app.model.App.belongsToMany(app.model.User, {
      through: app.model.AppUser,
    });
  };

  return App;
};
