import Executor from '@@/plugin-executor/routes';
import withExecutor from '@/wrappers/withExecutor';
import { Outlet } from '@umijs/max';

/** 注意 home，page 都是 page，都从这里 render */
export default withExecutor(() => {
  return <Outlet />;
}, Executor);
