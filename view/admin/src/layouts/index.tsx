import Executor from '@@/plugin-executor/routes';
import { Outlet } from '@umijs/max';
import { withExecutor } from '@@/plugin-executor';

/** 注意 home，page 都是 page，都从这里 render */
export default withExecutor(() => {
  return <Outlet />;
}, Executor);
