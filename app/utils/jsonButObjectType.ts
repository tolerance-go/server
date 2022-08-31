import { Application } from 'egg';
import { Model, DataType, ModelAttributeColumnOptions } from 'sequelize';

export const jsonButObjectType = <Entity extends Model>(
  app: Application,
  key: Extract<keyof Entity, string>,
  dbKey: string = key,
): DataType | ModelAttributeColumnOptions<Entity> => {
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
