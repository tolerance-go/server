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
    // 当作是 string 对待，鸭式辨形
    set(value: string[]) {
      this.setDataValue(key, value.join(','));
    },
    get() {
      const rawVal = this.getDataValue(key);
      return rawVal ? rawVal.split(',') : null;
    },
    allowNull: false,
    // @TODO: 这里的测试不知道测试的是存储在 DB 中的数据还是，设置 DB 前的校验
    validate: {
      isArray: true,
      notNull: true,
    },
  };
};
