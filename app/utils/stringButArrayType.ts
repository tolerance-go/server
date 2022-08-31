import { Application } from 'egg';
import { DataType, ModelAttributeColumnOptions } from 'sequelize';

export const stringButArrayType = <Entity extends object>(
  app: Application,
  key: Extract<keyof Entity, string>,
  dbKey: string = key,
): DataType | ModelAttributeColumnOptions => {
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
