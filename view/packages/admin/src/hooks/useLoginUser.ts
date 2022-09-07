import { useModel } from '@umijs/max';
export default () => {
  const { initialState } = useModel('@@initialState');

  const user = initialState?.user;
  if (!user) {
    throw new Error('用户未登录，获取不到用户信息');
  }

  return user;
};
