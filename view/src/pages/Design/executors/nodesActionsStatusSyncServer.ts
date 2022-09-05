import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesActions, nodesActionsUpdateMode } = useModel(
    'Design.page.nodesActions',
    pickModel(['nodesActions', 'nodesActionsUpdateMode']),
  );

  const { selectedPageId } = useModel(
    'Design.page.selectedPageId',
    pickModel(['selectedPageId']),
  );

  /** 当数据修改后同步服务 */
  useRequestReadyOnAuth(
    async () => {
      return await PageControllerUpdate(
        { id: selectedPageId! },
        {
          nodesActions: nodesActions ? JSON.stringify(nodesActions) : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesActions],
      ready: !!selectedPageId && nodesActionsUpdateMode === 'update',
    },
  );
};
