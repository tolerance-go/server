import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { stringButArrayType } from '../utils/stringButArrayType';

export interface ComponentModel
  extends Model<
    InferAttributes<ComponentModel>,
    InferCreationAttributes<ComponentModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  name: string;
  desc: string;
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  stage_data?: string;
  app_id: string;
  comIheritRelationId: CreationOptional<string>;
  usedInPageIds: CreationOptional<string>;
}

export default (app: Application) => {
  const { STRING, UUID, UUIDV4, DATE, JSON } = app.Sequelize;

  const Component = app.model.define<ComponentModel>('component', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: STRING,
    desc: STRING,
    app_id: UUID,
    stage_data: JSON,
    created_at: DATE,
    updated_at: DATE,
    comIheritRelationId: {
      type: UUID,
      field: 'com_iherit_relation_id',
    },
    usedInPageIds: stringButArrayType<ComponentModel>(
      app,
      'usedInPageIds',
      'used_in_page_ids',
    ),
  });

  (
    Component as typeof Component & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Component.hasMany(app.model.ComIheritRelation);
    app.model.Component.belongsTo(app.model.ComIheritRelation);
    app.model.Component.belongsTo(app.model.App);
  };

  return Component;
};
