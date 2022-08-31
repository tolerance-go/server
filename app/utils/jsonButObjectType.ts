import { Application } from 'egg';
import { Model, DataType, ModelAttributeColumnOptions } from 'sequelize';

export const jsonButObjectType = <AppModel extends Model>(
  app: Application,
  key: Extract<keyof AppModel, string>,
  dbKey: string = key,
): DataType | ModelAttributeColumnOptions<AppModel> => {
  const { STRING } = app.Sequelize;
  return {
    type: STRING,
    field: dbKey,
    set(value: object | string) {
      if (typeof value === 'object') {
        this.setDataValue(key, JSON.stringify(value));
      } else {
        this.setDataValue(key, value);
      }
    },
    get() {
      const rawVal = this.getDataValue(key);
      return rawVal ? JSON.parse(rawVal) : null;
    },
  };
};
