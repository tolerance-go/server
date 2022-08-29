import { mapValues, omit } from 'lodash';

export const convertDtoToRule = (
  dto: Record<
    string,
    {
      enum?: string[];
    }
  >,
) => {
  return mapValues(dto, (val) => {
    // https://github.com/tolerance-go/egg-swagger-doc-custom#contract%E5%AE%9A%E4%B9%89
    // https://github.com/node-modules/parameter
    if (val.enum) {
      return {
        ...omit(val, ['enum']),
        values: val.enum,
        type: 'enum',
      };
    }

    return val;
  });
};
