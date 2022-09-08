import { RuntimeConfig } from '@@/exports';
import React from 'react';
import { withExecutorComponent } from './index';

export const patchRoutes: RuntimeConfig['patchRoutes'] = ({
  routes,
  routeComponents,
}) => {
  Object.keys(routeComponents).forEach((path) => {
    {{#files}}
    {{ifElse}} (path === '{{{pathname}}}') {
      routeComponents[path] = withExecutorComponent(
        routeComponents[path],
        React.lazy(() => import('{{{absFilePath}}}')),
      );
    }
    {{/files}}
  });
};
