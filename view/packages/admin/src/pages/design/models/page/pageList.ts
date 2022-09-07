import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { useGetImmer } from '@/pages/design/utils/useGetImmer';
import { PageControllerFindAll } from '@fenxing/common/services/server/PageController';
import { useModel, request } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

/** 路径管理 */
const usePageList = () => {
  const [list, setList, getList] = useGetImmer<API.ShownPage[]>();
  const { selectedPageId, choosePageId } = useModel(
    'design.page.selectedPageId',
    (model) => ({
      selectedPageId: model.selectedPageId,
      choosePageId: model.choosePageId,
    }),
  );

  /** 尾部插入 */
  const pushPath = useMemoizedFn((item: API.ShownPage) => {
    setList((prev) => prev?.concat(item));
  });

  /** 删除 path */
  const deletePath = useMemoizedFn((page: API.ShownPage) => {
    setList((draft) => {
      const index = draft?.findIndex((item) => item.id === page.id);
      if (index !== undefined && index > -1) {
        draft?.splice(index, 1);
      }
    });
    // 如果删除的正在选中，同时清空选中
    if (page.id === selectedPageId) {
      choosePageId(undefined);
    }
  });

  /** 更新 path */
  const updatePath = useMemoizedFn((id: string, page: API.UpdationPage) => {
    setList((draft) => {
      const target = draft?.find((item) => item.id === id);

      if (target) {
        Object.assign(target, page);
      }
    });
  });

  /** 复制 path */
  const copyPath = useMemoizedFn(
    (page: API.ShownPage, newPage: API.ShownPage) => {
      setList((draft) => {
        const index = draft?.findIndex((item) => item.id === page.id);
        if (index !== undefined && index > -1) {
          draft?.splice(index, 0, newPage);
        }
      });
    },
  );

  const { run: request, loading } = useRequestReadyOnAuth(
    async (appId: string) => {
      return PageControllerFindAll({
        wheres: {
          where: [
            {
              fieldName: 'appId',
              conditions: {
                eq: appId,
              },
            },
          ],
        },
      });
    },
    {
      onSuccess: (data) => {
        setList(data);
      },
    },
  );

  return {
    requestLoading: loading,
    request,
    pageList: list,
    updatePath,
    getList,
    setList,
    copyPath,
    deletePath,
    pushPath,
  };
};

export default usePageList;
