import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface DataModel
  extends Model<
    InferAttributes<DataModel>,
    InferCreationAttributes<DataModel>
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

  const Component = app.model.define<DataModel>('data', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    desc: STRING,
    app_id: INTEGER,
    data: JSON,
    created_at: DATE,
    updated_at: DATE,
  });

  (
    Component as typeof Component & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Component.belongsTo(app.model.App);
  };

  return Component;
};
