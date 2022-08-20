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
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  pageId: number;
  title: CreationOptional<string>;
  desc: CreationOptional<string>;
  belongsToComId: string;
  belongsToComStatId: string;
  left: number;
  top: number;
  /** 创建时候所属组件的长宽，用来后期动态算比例 */
  containerWidth: number;
  containerHeight: number;
  containerLeft: number;
  containerTop: number;
}

export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Discuss = app.model.define<DiscussModel>('discuss', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    title: STRING,
    desc: STRING,
    left: INTEGER,
    top: INTEGER,
    belongsToComStatId: { type: STRING, field: 'belongs_to_com_stat_id' },
    belongsToComId: {
      type: STRING,
      field: 'belongs_to_com_id',
    },
    containerWidth: { type: INTEGER, field: 'container_width' },
    containerHeight: { type: INTEGER, field: 'container_height' },
    containerLeft: { type: INTEGER, field: 'container_left' },
    containerTop: { type: INTEGER, field: 'container_top' },
    pageId: { type: INTEGER, field: 'page_id' },
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
