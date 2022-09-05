import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import useInitPageData from '@/hooks/useInitPageData';
import { PageControllerShow } from '@/services/server/PageController';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';

export default () => {
  const { selectedPageId } = useModel(
    'Design.page.selectedPageId',
    pickModel(['selectedPageId']),
  );

  const initPageData = useInitPageData();

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
        initPageData(data);
      },
    },
  );
};
