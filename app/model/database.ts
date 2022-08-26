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
  id: CreationOptional<string>;
  name: string;
  desc: string;
  /** 逻辑创建和更新时间，优先级更高 */
  logic_created_at: CreationOptional<string>;
  logic_updated_at: CreationOptional<string>;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  data?: string;
  app_id: string;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE, JSON } = app.Sequelize;

  const Database = app.model.define<DatabaseModel>('database', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: STRING,
    desc: STRING,
    logic_created_at: DATE,
    logic_updated_at: DATE,
    app_id: UUID,
    data: JSON,
    created_at: DATE,
    updated_at: DATE,
  });

  // (
  //   Database as typeof Database & {
  //     associate: () => void;
  //   }
  // ).associate = () => {
  //   app.model.Database.belongsTo(app.model.App);
  // };

  return Database;
};
