import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface HistoryModel
  extends Model<
    InferAttributes<HistoryModel>,
    InferCreationAttributes<HistoryModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  data?: string;
  app_id: number;
}

export default (app: Application) => {
  const { INTEGER, DATE, JSON } = app.Sequelize;

  const History = app.model.define<HistoryModel>('history', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    app_id: INTEGER,
    data: JSON,
    created_at: DATE,
    updated_at: DATE,
  });

  (
    History as typeof History & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.History.belongsTo(app.model.App);
  };

  return History;
};
