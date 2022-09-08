import { groupBy } from 'lodash';
import { RuntimeConfig } from '@@/exports';
import { withExecutor } from './index';
import { executors } from './executors';

const groups = groupBy(executors, (item) => item.pathname);

export const patchRoutes: RuntimeConfig['patchRoutes'] = ({
  routes,
  routeComponents,
}) => {
  Object.keys(routeComponents).forEach((path) => {
    if (groups[path]?.length) {
      routeComponents[path] = withExecutor(routeComponents[path], groups[path]);
    }
  });
};
