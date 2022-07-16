import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface VersionModel
  extends Model<
    InferAttributes<VersionModel>,
    InferCreationAttributes<VersionModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  app_id: number;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Version = app.model.define<VersionModel>('version', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    created_at: DATE,
    updated_at: DATE,
    app_id: INTEGER,
  });

  (
    Version as typeof Version & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Version.belongsTo(app.model.App);
    app.model.Version.hasMany(app.model.Page);
  };

  return Version;
};
