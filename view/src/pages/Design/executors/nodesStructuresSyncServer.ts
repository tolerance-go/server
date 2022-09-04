import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { NodesStructures } from '../models/page/nodesStructuresAndRootIds';

export default () => {
  const { nodesStructures, getNodesStructuresUpdateMode } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    pickModel(['nodesStructures', 'getNodesStructuresUpdateMode']),
  );

  const { getSelectedPageId } = useModel(
    'Design.page.selectedPageId',
    pickModel(['getSelectedPageId']),
  );

  /** 当数据修改后同步服务 */
  const { run: requestSyncNodesStructures } = useRequestReadyOnAuth(
    async (id: string, nodesStructures?: NodesStructures) => {
      return await PageControllerUpdate(
        { id },
        {
          nodesStructures: nodesStructures
            ? JSON.stringify(nodesStructures)
            : '{}',
        },
      );
    },
    {
      manual: true,
    },
  );

  useUpdateEffect(() => {
    const selectedPageId = getSelectedPageId();
    if (selectedPageId && getNodesStructuresUpdateMode() === 'update') {
      requestSyncNodesStructures(selectedPageId, nodesStructures);
    }
  }, [nodesStructures]);
};
