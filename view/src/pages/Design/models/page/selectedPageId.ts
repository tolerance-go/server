import { QUERY_KEYS } from '@/constants/path';
import { useGetImmer } from '@/pages/Design/utils/useGetImmer';
import { getInitialStateFromURL } from '@/utils/getInitialStateFromURL';
import { useMemoizedFn } from 'ahooks';

export default () => {
  /** 当前激活的 page path */
  const [selectedPageId, setSelectedPageId, getSelectedPageId] = useGetImmer(
    () => getInitialStateFromURL(QUERY_KEYS.SELECTED_PAGE_ID, 'string'),
  );

  /** 设置 versionId 对应的 pageList */
  //   const setPageListByVersionId = useMemoizedFn(
  //     async (appId: string, versionId?: number) => {
  //       //   const data = await PageControllerIndex({
  //       //     appId: Number(appId),
  //       //     // versionId: versionId,
  //       //   });
  //       //   setList(data);
  //       //   if (data?.length) {
  //       //     setSelectedPageId(data[0].id);
  //       //   }
  //     },
  //   );

  const choosePageId = useMemoizedFn((id?: string) => {
    setSelectedPageId(id);
  });

  return {
    selectedPageId,
    choosePageId,
    getSelectedPageId,
  };
};
