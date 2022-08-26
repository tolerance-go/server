import { Application } from 'egg';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface AppUserModel
  extends Model<
    InferAttributes<AppUserModel>,
    InferCreationAttributes<AppUserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  createdAt: CreationOptional<string>;
  updatedAt: CreationOptional<string>;
  userId: string;
  appId: string;
}

export default (app: Application) => {
  const { UUID, UUIDV4, DATE } = app.Sequelize;

  const AppUser = app.model.define<AppUserModel>('appUser', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: UUID,
      field: 'user_id',
    },
    appId: {
      type: UUID,
      field: 'app_id',
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });

  return AppUser;
};
