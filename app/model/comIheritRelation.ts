import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface ComIheritRelationModel
  extends Model<
    InferAttributes<ComIheritRelationModel>,
    InferCreationAttributes<ComIheritRelationModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  fromId: string;
  toId: CreationOptional<string>;
  appId: string;
  componentId: string;
}

export default (app: Application) => {
  const { UUID, UUIDV4, DATE } = app.Sequelize;

  const ComIheritRelation = app.model.define<ComIheritRelationModel>(
    'comIheritRelation',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      fromId: {
        type: UUID,
        field: 'from_id',
      },
      toId: {
        type: UUID,
        field: 'to_id',
      },
      appId: {
        type: UUID,
        field: 'app_id',
      },
      createdAt: { type: DATE, field: 'created_at' },
      updatedAt: { type: DATE, field: 'updated_at' },
      componentId: {
        type: UUID,
        field: 'component_id',
      },
    },
  );

  /** 继承关系和组件没有包含关系，他们可以独立存在 */
  (
    ComIheritRelation as typeof ComIheritRelation & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.ComIheritRelation.hasOne(app.model.Component);
    app.model.ComIheritRelation.belongsTo(app.model.Component);
  };

  return ComIheritRelation;
};
