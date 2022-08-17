import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface DatabaseModel
  extends Model<
    InferAttributes<DatabaseModel>,
    InferCreationAttributes<DatabaseModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  desc: string;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  data?: string;
  app_id: number;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE, JSON } = app.Sequelize;

  const Database = app.model.define<DatabaseModel>('database', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    desc: STRING,
    app_id: INTEGER,
    data: JSON,
    created_at: DATE,
    updated_at: DATE,
  });

  (
    Database as typeof Database & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Database.belongsTo(app.model.App);
  };

  return Database;
};
