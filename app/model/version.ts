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
  id: CreationOptional<string>;
  name: string;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  app_id: string;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE } = app.Sequelize;

  const Version = app.model.define<VersionModel>('version', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: STRING,
    created_at: DATE,
    updated_at: DATE,
    app_id: UUID,
  });

  (
    Version as typeof Version & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Version.belongsTo(app.model.App);
    app.model.Version.hasMany(app.model.Page);
    app.model.Version.hasMany(app.model.Database);
  };

  return Version;
};
