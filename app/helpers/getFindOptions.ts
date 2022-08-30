import { omitBy } from 'lodash';
import { convertIncludeToRuntime } from './convertIncludeToRuntime';
import { convertOrderToRuntime } from './convertOrderToRuntime';
import { convertWhereToRuntime } from './convertWhereToRuntime';

export const getFindOptions = (ctx, FindOptions) => {
  ctx.validate(FindOptions, ctx.request.body);

  const { limit, offset, wheres, includes } = ctx.request.body;
  const include = convertIncludeToRuntime(ctx.model, includes);
  const where = convertWhereToRuntime(wheres);
  const order = convertOrderToRuntime(ctx.request.body.order);
  const findOptions = omitBy(
    {
      order,
      limit,
      offset,
      where,
      include,
    },
    (val) => val === undefined,
  );

  return findOptions;
};
