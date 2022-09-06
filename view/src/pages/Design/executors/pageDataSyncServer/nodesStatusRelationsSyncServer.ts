import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesData, updateMode } = useModel(
    'design.page.nodesStatusRelations',
    (model) => ({
      nodesData: model.nodesStatusRelations,
      updateMode: model.nodesStatusRelationsUpdateMode,
    }),
  );

  const { selectedPageId } = useModel(
    'design.page.selectedPageId',
    pickModel(['selectedPageId']),
  );

  /** 当数据修改后同步服务 */
  useRequestReadyOnAuth(
    async () => {
      return await PageControllerUpdate(
        { id: selectedPageId! },
        {
          nodesStatusRelations: nodesData ? JSON.stringify(nodesData) : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesData],
      ready: !!selectedPageId && updateMode === 'update',
    },
  );
};
