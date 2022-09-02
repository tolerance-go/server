import { useRequestInternal } from '@/helpers/useRequestInternal';
import useAppId from '@/pages/Design/hooks/useAppId';
import { PageControllerIndex } from '@/services/server/PageController';
import { useModel, useSearchParams } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { Menu, Skeleton } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import clsx from 'clsx';
import { useLayoutEffect } from 'react';
import styles from './index.less';
import { MenuItem } from './MenuItem';
import { TempInput } from './TempCreateInput';

const PageNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const appId = useAppId();

  const { pageList, setList } = useModel('Design.page.pageList', (model) => ({
    pageList: model.pageList,
    setList: model.setList,
    getList: model.getList,
  }));

  const { selectedPageId, choosePageId } = useModel(
    'Design.page.selectedPageId',
    (model) => ({
      selectedPageId: model.selectedPageId,
      choosePageId: model.choosePageId,
    }),
  );

  const { creatingMeta } = useModel(
    'Design.page.pageCreatingMeta',
    (model) => ({
      creatingMeta: model.creatingMeta,
    }),
  );

  const { run, loading } = useRequestInternal(
    async () => {
      return PageControllerIndex({
        appId,
      });
    },
    {
      onSuccess: (data) => {
        setList(data);
      },
      manual: true,
    },
  );

  /** 初始化 list */
  useLayoutEffect(() => {
    if (pageList === undefined) {
      run();
    }
  }, []);

  /** 同步修改到 url */
  useUpdateEffect(() => {
    if (selectedPageId) {
      searchParams.set('selectedPageId', selectedPageId);
    } else {
      searchParams.delete('selectedPageId');
    }
    setSearchParams(searchParams);
  }, [selectedPageId]);

  return (
    <Skeleton loading={loading}>
      <div className={styles.wrap}>
        <Menu
          selectedKeys={selectedPageId ? [selectedPageId] : undefined}
          mode="inline"
          items={(pageList ?? [])
            .map((item) => {
              return {
                label: <MenuItem item={item} />,
                key: item.id,
                className: clsx({
                  'active-item': selectedPageId === String(item.id),
                }),
              } as ItemType;
            })
            .concat(
              creatingMeta.isCreating
                ? [
                    {
                      key: 'creator',
                      label: <TempInput />,
                    },
                  ]
                : [],
            )}
          onClick={(info) => {
            choosePageId(info.key);
          }}
        />
      </div>
    </Skeleton>
  );
};

export default PageNav;
