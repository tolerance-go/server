import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface DiscussModel
  extends Model<
    InferAttributes<DiscussModel>,
    InferCreationAttributes<DiscussModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  page_id: number;
  title: string;
  desc: CreationOptional<string>;
  belongsToComId: number;
  belongsToComStatId: number;
  left: number;
  top: number;
  /** 创建时候所属组件的长宽，用来后期动态算比例 */
  containerWidth: number;
  containerHeight: number;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Discuss = app.model.define<DiscussModel>('discuss', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    desc: STRING,
    belongsToComId: INTEGER,
    belongsToComStatId: INTEGER,
    left: INTEGER,
    top: INTEGER,
    containerWidth: INTEGER,
    containerHeight: INTEGER,
    page_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  (
    Discuss as typeof Discuss & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Discuss.belongsTo(app.model.Page);
  };

  return Discuss;
};
