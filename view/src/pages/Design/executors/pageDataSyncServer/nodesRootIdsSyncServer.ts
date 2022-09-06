import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';
import { useUpdateEffect } from 'ahooks';
import { RootIds } from '../models/page/nodesStructuresAndRootIds';

export default () => {
  const { rootNodeIds, getRootIdsUpdateMode } = useModel(
    'design.page.nodesStructuresAndRootIds',
    pickModel(['rootNodeIds', 'getRootIdsUpdateMode']),
  );

  const { getSelectedPageId } = useModel(
    'design.page.selectedPageId',
    pickModel(['getSelectedPageId']),
  );

  /** 当数据修改后同步服务 */
  const { run: requestSyncRootIds } = useRequestReadyOnAuth(
    async (id: string, rootNodeIds?: RootIds) => {
      return await PageControllerUpdate(
        { id },
        {
          rootNodeIds: rootNodeIds ? JSON.stringify(rootNodeIds) : '{}',
        },
      );
    },
    {
      manual: true,
    },
  );

  useUpdateEffect(() => {
    const selectedPageId = getSelectedPageId();
    if (selectedPageId && getRootIdsUpdateMode() === 'update') {
      requestSyncRootIds(selectedPageId, rootNodeIds);
    }
  }, [rootNodeIds]);
};
