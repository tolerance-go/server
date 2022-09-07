import useAppId from '@/pages/design/hooks/useAppId';
import { usePickModel } from '@/utils/useModelTypes';
import useUrlState from '@ahooksjs/use-url-state';
import { useModel } from '@umijs/max';
import { useMount, useUnmount, useUpdateEffect } from 'ahooks';
import { Menu, Skeleton } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import clsx from 'clsx';
import styles from './index.less';
import { MenuItem } from './MenuItem';
import { TempInput } from './TempCreateInput';

const PageNav = () => {
  const [, setUrlState] = useUrlState({
    selectedPageId: undefined,
  });

  const appId = useAppId();

  const { pageList, request, setList, requestLoading } = usePickModel(
    'design.page.pageList',
    ['pageList', 'getList', 'request', 'setList', 'requestLoading'],
  );

  const { selectedPageId, choosePageId } = useModel(
    'design.page.selectedPageId',
    (model) => ({
      selectedPageId: model.selectedPageId,
      choosePageId: model.choosePageId,
    }),
  );

  const { creatingMeta } = useModel(
    'design.page.pageCreatingMeta',
    (model) => ({
      creatingMeta: model.creatingMeta,
    }),
  );

  useMount(() => {
    request(appId);
  });

  useUnmount(() => {
    setList(undefined);
  });

  /** 同步修改到 url */
  useUpdateEffect(() => {
    setUrlState({
      selectedPageId,
    });
  }, [selectedPageId]);

  return (
    <Skeleton loading={requestLoading}>
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
