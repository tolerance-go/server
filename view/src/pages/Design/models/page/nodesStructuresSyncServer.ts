import { IS_DEBUG } from '@/constants/debug';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { usePickModelSafeInModel } from '@/utils/useModelTypes';
import { useUpdateEffect } from 'ahooks';
import { notification } from 'antd';
import { NodesStructures, RootIds } from './nodesStructures';

export default () => {
  const { nodesStructures, rootIds } = usePickModelSafeInModel(
    'Design.page.nodesStructures',
    ['nodesStructures', 'rootIds'],
  );

  const { getSelectedPageId } = usePickModelSafeInModel(
    'Design.page.selectedPageId',
    ['getSelectedPageId'],
  );

  /** 当数据修改后同步服务 */
  const { run: requestSyncNodesStructures } = useRequestInternal(
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
      onSuccess(data) {
        if (IS_DEBUG) {
          notification.success({
            message: '同步 nodesStructures 成功',
            description: data.nodesStructures,
          });
        }
      },
    },
  );

  const { run: requestSyncStageRootIds } = useRequestInternal(
    async (id: string, rootIds?: RootIds) => {
      return await PageControllerUpdate(
        { id },
        {
          stageRootNodes: rootIds ? JSON.stringify(rootIds) : '[]',
        },
      );
    },
    {
      manual: true,
      onSuccess(data) {
        if (IS_DEBUG) {
          notification.success({
            message: '同步 rootIds 成功',
            description: data.stageRootNodes,
          });
        }
      },
    },
  );

  useUpdateEffect(() => {
    const selectedPageId = getSelectedPageId?.();
    if (selectedPageId) {
      requestSyncNodesStructures(selectedPageId, nodesStructures);
    }
  }, [nodesStructures]);

  useUpdateEffect(() => {
    const selectedPageId = getSelectedPageId?.();
    if (selectedPageId) {
      requestSyncStageRootIds(selectedPageId, rootIds);
    }
  }, [rootIds]);
};
