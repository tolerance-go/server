import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface LicenseModel
  extends Model<
    InferAttributes<LicenseModel>,
    InferCreationAttributes<LicenseModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  // 过期时间
  expiration: CreationOptional<string>;
  userId: string;
}

export default (app: Application) => {
  const { UUID, UUIDV4, DATE } = app.Sequelize;

  const License = app.model.define<LicenseModel>('license', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    expiration: DATE,
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
    userId: {
      type: UUID,
      field: 'user_id',
    },
  });

  (
    License as typeof License & {
      associate: () => void;
    }
  ).associate = () => {
    app.model.License.hasOne(app.model.Widget);
    app.model.License.hasOne(app.model.WidgetGroup);
    app.model.License.hasOne(app.model.WidgetLib);
    app.model.License.belongsTo(app.model.User);
  };

  return License;
};
