import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerShow } from '@/services/server/PageController';
import { parseJSON } from '@/utils/parseJSON';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';

export default () => {
  const { selectedPageId } = useModel(
    'Design.page.selectedPageId',
    pickModel(['selectedPageId']),
  );

  const { initData: initNodesStructuresAndRootIds } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    pickModel(['initData']),
  );

  const { initData: initNodesSettings } = useModel(
    'Design.page.nodesSettings',
    pickModel(['initData']),
  );

  const { initData: initNodesDefaultsStatus } = useModel(
    'Design.page.nodesDefaultsStatus',
    pickModel(['initData']),
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

        initNodesStructuresAndRootIds({
          rootIds: parseJSON(data.stageRootNodeIds),
          nodesStructures: parseJSON(data.nodesStructures),
        });

        initNodesSettings({
          nodesSettings: parseJSON(data.nodesSettings),
        });

        initNodesDefaultsStatus({
          nodesDefaultsStatus: parseJSON(data.nodesDefaultsStatus),
        });
      },
    },
  );
};
