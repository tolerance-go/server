import { Includeable } from 'sequelize';
import { IModel } from '../../typings/app';
import { convertWhereToRuntime } from './convertWhereToRuntime';
import { Wheres } from './convertWhereToRuntime';

export type Include = {
  model: keyof IModel;
  include?: Include[];
  wheres?: Wheres;
};

export const convertIncludeToRuntime = (
  models: IModel,
  include?: Include[],
): Includeable[] | undefined => {
  return include?.map((item) => {
    const dist: Includeable = {
      model: models[item.model],
    };

    const include = convertIncludeToRuntime(models, item.include);
    if (include) {
      dist.include = include;
    }

    const where = convertWhereToRuntime(item.wheres);
    if (where) {
      dist.where = where;
    }

    return dist;
  });
};
