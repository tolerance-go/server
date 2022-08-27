import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { jsonButObjectType } from '../utils/jsonButObjectType';

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
    nodesStructures: jsonButObjectType(
      app,
      'nodesStructures',
      'nodes_structures',
    ),
    nodesStyles: jsonButObjectType(app, 'nodesStyles', 'nodes_styles'),
    nodesSettings: jsonButObjectType(app, 'nodesSettings', 'nodes_settings'),
    nodesEvents: jsonButObjectType(app, 'nodesEvents', 'nodes_events'),
    nodesActions: jsonButObjectType(app, 'nodesActions', 'nodes_actions'),
    nodesStatus: jsonButObjectType(app, 'nodesStatus', 'nodes_status'),
    nodesStatusRelations: jsonButObjectType(
      app,
      'nodesStatusRelations',
      'nodes_status_relations',
    ),
    nodesDefaultsStatus: jsonButObjectType(
      app,
      'nodesDefaultsStatus',
      'nodes_defaults_status',
    ),
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
