import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerShow } from '@/services/server/PageController';
import { parseJSON } from '@/utils/parseJSON';
import { usePickModelSafeInModel } from '@/utils/useModelTypes';

export default () => {
  const { selectedPageId } = usePickModelSafeInModel(
    'Design.page.selectedPageId',
    ['selectedPageId'],
  );

  const { initData } = usePickModelSafeInModel(
    'Design.page.nodesStructuresAndRootIds',
    ['initData'],
  );

  useRequestReadyOnAuth(
    async () => {
      if (selectedPageId) {
        return await PageControllerShow({ id: selectedPageId });
      }
    },
    {
      /** selectId 变化的时候，设置节点结构 */
      refreshDeps: [selectedPageId],
      onSuccess(data) {
        if (!data) return;

        initData?.({
          rootIds: parseJSON(data.stageRootNodeIds),
          nodesStructures: parseJSON(data.nodesStructures),
        });
      },
    },
  );
};
