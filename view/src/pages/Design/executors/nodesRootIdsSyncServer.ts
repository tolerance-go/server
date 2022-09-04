import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';
import { useUpdateEffect } from 'ahooks';
import { RootIds } from '../models/page/nodesStructuresAndRootIds';

export default () => {
  const { rootIds, getRootIdsUpdateMode } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    pickModel(['rootIds', 'getRootIdsUpdateMode']),
  );

  const { getSelectedPageId } = useModel(
    'Design.page.selectedPageId',
    pickModel(['getSelectedPageId']),
  );

  /** 当数据修改后同步服务 */
  const { run: requestSyncRootIds } = useRequestReadyOnAuth(
    async (id: string, rootIds?: RootIds) => {
      return await PageControllerUpdate(
        { id },
        {
          stageRootNodes: rootIds ? JSON.stringify(rootIds) : '{}',
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
      requestSyncRootIds(selectedPageId, rootIds);
    }
  }, [rootIds]);
};
