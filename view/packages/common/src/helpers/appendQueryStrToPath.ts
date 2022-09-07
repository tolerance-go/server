import qs from 'qs';

export default (pathname: string, params: object) => {
  return `${pathname}?${qs.stringify(params)}`;
};
