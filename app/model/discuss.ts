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
  id: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  pageId: string;
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
  resolved?: boolean;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, FLOAT, DATE, BOOLEAN } = app.Sequelize;

  const Discuss = app.model.define<DiscussModel>('discuss', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    title: STRING,
    desc: STRING,
    left: FLOAT,
    top: FLOAT,
    resolved: {
      type: BOOLEAN,
      defaultValue: false,
    },
    belongsToComStatId: { type: STRING, field: 'belongs_to_com_stat_id' },
    belongsToComId: {
      type: STRING,
      field: 'belongs_to_com_id',
    },
    containerWidth: { type: FLOAT, field: 'container_width' },
    containerHeight: { type: FLOAT, field: 'container_height' },
    containerLeft: { type: FLOAT, field: 'container_left' },
    containerTop: { type: FLOAT, field: 'container_top' },
    pageId: { type: UUID, field: 'page_id' },
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
