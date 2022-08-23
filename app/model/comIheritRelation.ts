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
  id: CreationOptional<number>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  fromId: number;
  toId: number;
  appId: number;
}

export default (app: Application) => {
  const { INTEGER, DATE } = app.Sequelize;

  const ComIheritRelation = app.model.define<ComIheritRelationModel>(
    'comIheritRelation',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      fromId: {
        type: INTEGER,
        field: 'from_id',
      },
      toId: {
        type: INTEGER,
        field: 'to_id',
      },
      appId: {
        type: INTEGER,
        field: 'app_id',
      },
      createdAt: { type: DATE, field: 'created_at' },
      updatedAt: { type: DATE, field: 'updated_at' },
    },
  );

  /** 继承关系和组件没有包含关系，他们可以独立存在 */
  (
    ComIheritRelation as typeof ComIheritRelation & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.ComIheritRelation.belongsTo(app.model.App);
  };

  return ComIheritRelation;
};
