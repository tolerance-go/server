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
  created_at: CreationOptional<string>;
  updated_at: CreationOptional<string>;
  stage_data?: string;
  app_id: string;
  version_id: CreationOptional<string>;
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
    app_id: UUID,
    stage_data: JSON,
    created_at: DATE,
    updated_at: DATE,
    version_id: UUID,
  });

  (
    Page as typeof Page & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.Page.belongsTo(app.model.App);
    app.model.Page.belongsTo(app.model.Version);
  };

  return Page;
};
