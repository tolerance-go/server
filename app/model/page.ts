import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface PageModel
  extends Model<
    InferAttributes<PageModel>,
    InferCreationAttributes<PageModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  path: string;
  stage_data?: string;
  appId: string;
  versionId: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;

  // 所有节点的 - 结构
  nodesStructures: CreationOptional<string>;
  // 所有节点的 - 样式
  nodesStyles: CreationOptional<string>;
  // 所有节点的 - 配置
  nodesSettings: CreationOptional<string>;
  // 所有节点的 - 事件
  nodesEvents: CreationOptional<string>;
  // 所有节点的 - 动作
  nodesActions: CreationOptional<string>;
  // 所有节点的 - 状态
  nodesStatus: CreationOptional<string>;
  // 所有节点的 - 状态关联
  nodesStatusRelations: CreationOptional<string>;
  // 所有节点的 - 默认状态
  nodesDefaultsStatus: CreationOptional<string>;
  // 舞台跟节点
  rootNodeIds: CreationOptional<string>;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE, JSON } = app.Sequelize;

  const Page = app.model.define<PageModel>('page', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    path: STRING,
    appId: {
      type: UUID,
      field: 'app_id',
    },
    stage_data: JSON,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    versionId: {
      type: UUID,
      field: 'version_id',
    },
    /** 舞台节点结构 */
    nodesStructures: JSON,
    rootNodeIds: JSON,
    nodesStyles: JSON,
    nodesSettings: JSON,
    nodesEvents: JSON,
    nodesActions: JSON,
    nodesStatus: JSON,
    nodesStatusRelations: JSON,
    nodesDefaultsStatus: JSON,
  });

  (
    Page as typeof Page & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Page.belongsTo(app.model.App);
    app.model.Page.belongsTo(app.model.Version);
    app.model.Page.hasMany(app.model.Discuss);
  };

  return Page;
};
