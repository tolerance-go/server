import { useModel } from '@/.umi/plugin-model';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { PageControllerUpdate } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';

export default () => {
  const { nodesStyles, nodesStylesUpdateMode } = useModel(
    'Design.page.nodesStyles',
    pickModel(['nodesStyles', 'nodesStylesUpdateMode']),
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
          nodesStyles: nodesStyles ? JSON.stringify(nodesStyles) : '{}',
        },
      );
    },
    {
      refreshDeps: [nodesStyles],
      ready: !!selectedPageId && nodesStylesUpdateMode === 'update',
    },
  );
};
