import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@fenxing/common/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesEvents, nodesEventsUpdateMode } = useModel(
    'design.page.nodesEvents',
    pickModel(['nodesEvents', 'nodesEventsUpdateMode']),
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
          nodesEvents: nodesEvents ? JSON.stringify(nodesEvents) : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesEvents],
      ready: !!selectedPageId && nodesEventsUpdateMode === 'update',
    },
  );
};
