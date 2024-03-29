import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@fenxing/common/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesSettings, nodesSettingsUpdateMode } = useModel(
    'design.page.nodesSettings',
    pickModel(['nodesSettings', 'nodesSettingsUpdateMode']),
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
          nodesSettings: nodesSettings ? JSON.stringify(nodesSettings) : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesSettings],
      ready: !!selectedPageId && nodesSettingsUpdateMode === 'update',
    },
  );
};
