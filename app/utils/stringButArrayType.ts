import { Application } from 'egg';
import { DataType, Model, ModelAttributeColumnOptions } from 'sequelize';

export const stringButArrayType = <AppModel extends Model>(
  app: Application,
  key: Extract<keyof AppModel, string>,
  dbKey: string = key,
): DataType | ModelAttributeColumnOptions<AppModel> => {
  const { STRING } = app.Sequelize;
  return {
    type: STRING,
    field: dbKey,
    set(value: string[] | string) {
      if (Array.isArray(value)) {
        this.setDataValue(key, value.join(','));
      } else {
        this.setDataValue(key, value);
      }
    },
    get() {
      const rawVal = this.getDataValue(key);
      return rawVal ? rawVal.split(',') : null;
    },
  };
};
