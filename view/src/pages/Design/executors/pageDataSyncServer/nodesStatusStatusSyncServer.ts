import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesStatus, nodesStatusUpdateMode } = useModel(
    'Design.page.nodesStatus',
    pickModel(['nodesStatus', 'nodesStatusUpdateMode']),
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
          nodesStatus: nodesStatus ? JSON.stringify(nodesStatus) : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesStatus],
      ready: !!selectedPageId && nodesStatusUpdateMode === 'update',
    },
  );
};
