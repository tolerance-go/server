import { Application } from 'egg';

const apiPrefix = '/api';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.resources('users', `${apiPrefix}/users`, controller.users);
  router.resources('apps', `${apiPrefix}/apps`, controller.apps);
  router.resources('pages', `${apiPrefix}/pages`, controller.pages);
  router.resources(
    'components',
    `${apiPrefix}/components`,
    controller.components,
  );
  router.resources('versions', `${apiPrefix}/versions`, controller.versions);
};
