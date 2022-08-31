import { Application } from 'egg';
import { DataType, ModelAttributeColumnOptions, Model } from 'sequelize';

export const stringButArrayType = <Entity extends Model>(
  app: Application,
  key: Extract<keyof Entity, string>,
  dbKey: string = key,
): DataType | ModelAttributeColumnOptions<Model> => {
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
