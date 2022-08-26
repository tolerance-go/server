import { Application } from 'egg';

const apiPrefix = '/api';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.resources('users', `${apiPrefix}/users`, controller.users);

  router.resources('apps', `${apiPrefix}/apps`, controller.apps);
  router.delete(`${apiPrefix}/everyApp`, controller.apps.destroyEvery);

  router.put(`${apiPrefix}/apps/:id/history`, controller.apps.updateHistory);
  router.put(
    `${apiPrefix}/apps/:id/stage-size`,
    controller.apps.updateStageSize,
  );
  router.resources('pages', `${apiPrefix}/pages`, controller.pages);
  router.resources(
    'components',
    `${apiPrefix}/components`,
    controller.components,
  );
  router.post(
    `${apiPrefix}/components/createWithRelation`,
    controller.components.createWithRelation,
  );
  router.resources('versions', `${apiPrefix}/versions`, controller.versions);
  router.resources('databases', `${apiPrefix}/databases`, controller.databases);
  router.resources('discusses', `${apiPrefix}/discusses`, controller.discusses);
  router.get(
    `${apiPrefix}/discusses-count-comments`,
    controller.discusses.countComments,
  );
  router.resources('comments', `${apiPrefix}/comments`, controller.comments);
  router.delete(
    `${apiPrefix}/every-comments`,
    controller.comments.destroyEvery,
  );

  router.resources(
    'comIheritRelations',
    `${apiPrefix}/comIheritRelations`,
    controller.comIheritRelations,
  );
  router.delete(
    `${apiPrefix}/everyComIheritRelations`,
    controller.comIheritRelations.destroyEvery,
  );
};
