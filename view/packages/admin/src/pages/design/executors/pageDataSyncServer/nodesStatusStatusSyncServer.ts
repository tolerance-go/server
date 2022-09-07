import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@fenxing/common/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesStatus, nodesStatusUpdateMode } = useModel(
    'design.page.nodesStatus',
    pickModel(['nodesStatus', 'nodesStatusUpdateMode']),
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
