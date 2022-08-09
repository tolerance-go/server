import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface ComponentModel
  extends Model<
    InferAttributes<ComponentModel>,
    InferCreationAttributes<ComponentModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  desc: string;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  stage_data?: string;
  app_id: number;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE, JSON } = app.Sequelize;

  const Component = app.model.define<ComponentModel>('component', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    desc: STRING,
    app_id: INTEGER,
    stage_data: JSON,
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
