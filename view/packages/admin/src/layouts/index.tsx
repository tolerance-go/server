import { Outlet } from '@umijs/max';
import withAuth from '@/wrappers/withAuth';

/** 注意 home，page 都是 page，都从这里 render */
export default withAuth(() => {
  return <Outlet />;
});
