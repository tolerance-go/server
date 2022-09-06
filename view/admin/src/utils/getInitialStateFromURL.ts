import { getURLQuery } from '@/helpers/getURLQuery';

/**
 *
 * 从 url 上获取初始字段值，如果类型不一致返回空
 *
 * @param key url 字段
 * @param type 类型
 * @returns
 */
export const getInitialStateFromURL = <
  T extends 'string' | 'boolean' | 'number',
  ReturnType = T extends 'string'
    ? string
    : T extends 'boolean'
    ? boolean
    : number,
>(
  key: string,
  type: T,
): ReturnType | undefined => {
  const query = getURLQuery();
  const val = query[key];

  if (typeof val === type) {
    return val as ReturnType;
  }

  return undefined;
};
