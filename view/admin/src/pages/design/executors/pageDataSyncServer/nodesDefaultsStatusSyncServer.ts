import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesDefaultsStatus, nodesDefaultsStatusUpdateMode } = useModel(
    'design.page.nodesDefaultsStatus',
    pickModel(['nodesDefaultsStatus', 'nodesDefaultsStatusUpdateMode']),
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
          nodesDefaultsStatus: nodesDefaultsStatus
            ? JSON.stringify(nodesDefaultsStatus)
            : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesDefaultsStatus],
      ready: !!selectedPageId && nodesDefaultsStatusUpdateMode === 'update',
    },
  );
};
