import { Outlet } from '@umijs/max';

export default () => {
  // const { error } = useModel('@@initialState');

  // if (error) {
  //   return <Alert banner message="全局初始化数据配置失败" type="error"></Alert>;
  // }

  return <Outlet />;
};
