import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface AppModel
  extends Model<InferAttributes<AppModel>, InferCreationAttributes<AppModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  desc: CreationOptional<string>;
  labels: CreationOptional<string>;
  app_data: CreationOptional<string>;
  history_data: CreationOptional<string>;
  stage_size_data: CreationOptional<string>;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  title: string;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE, JSON } = app.Sequelize;

  const App = app.model.define<AppModel>('app', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    app_data: JSON,
    history_data: JSON,
    desc: STRING,
    labels: STRING,
    created_at: DATE,
    updated_at: DATE,
    stage_size_data: JSON,
  });

  (
    App as typeof App & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.App.hasMany(app.model.Page);
    app.model.App.hasMany(app.model.Version);
  };

  return App;
};
