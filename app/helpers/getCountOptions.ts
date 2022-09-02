import { omitBy } from 'lodash';
import { convertIncludeToRuntime } from './convertIncludeToRuntime';
import { convertWhereToRuntime } from './convertWhereToRuntime';

export const getCountOptions = (ctx, CountReqData) => {
  ctx.validate(CountReqData, ctx.request.body);

  const { wheres, includes } = ctx.request.body;
  const include = convertIncludeToRuntime(ctx.model, includes);
  const where = convertWhereToRuntime(wheres);
  const findOptions = omitBy(
    {
      where,
      include,
    },
    (val) => val === undefined,
  );

  return findOptions;
};
