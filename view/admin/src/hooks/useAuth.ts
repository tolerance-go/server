import { useModel } from '@umijs/max';
export default () => {
  const { initialState } = useModel('@@initialState');

  return {
    isLogin: !!initialState?.user,
    user: initialState?.user,
  };
};
