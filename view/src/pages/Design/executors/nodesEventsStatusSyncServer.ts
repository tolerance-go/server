import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesEvents, nodesEventsUpdateMode } = useModel(
    'Design.page.nodesEvents',
    pickModel(['nodesEvents', 'nodesEventsUpdateMode']),
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
