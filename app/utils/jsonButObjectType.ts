import { Application } from 'egg';
import { Model, DataType, ModelAttributeColumnOptions } from 'sequelize';

// type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
//   ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
//   : S;

// type SnakeToCamelCaseNested<T> = T extends object
//   ? {
//       [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<
//         T[K]
//       >;
//     }
//   : T;

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
