import executor_1 from '/Users/yarnb/30/server/view/packages/admin/src/executors/dump copy';
import executor_2 from '/Users/yarnb/30/server/view/packages/admin/src/executors/dump';

export const executors = [
  { id: 'executor_1', namespace: 'dump copy', executor: executor_1, pathname: '/', },
  { id: 'executor_2', namespace: 'dump', executor: executor_2, pathname: '/' },
] as const;
