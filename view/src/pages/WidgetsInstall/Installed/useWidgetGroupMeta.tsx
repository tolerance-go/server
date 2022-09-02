import BadgeWithTitle from '@/components/BadgeWithTitle';
import { ProButton } from '@/components/ProButton';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerDestroy } from '@/services/server/LicenseController';
import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import useGetImmer from '@/utils/useGetImmer';
import { ProListProps } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';

export type InstalledWidgetGroupItem = API.WidgetGroup & {
  widgets: API.Widget[];
  licenses: API.License[];
};

export default ({ searchText }: { searchText: string }) => {
  const [widgetGroups, setWidgetGroups] =
    useGetImmer<InstalledWidgetGroupItem[]>();

  const user = useLoginUser();

  const removeItemLic = useMemoizedFn((id: string, licId: string) => {
    setWidgetGroups((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        const index = target.licenses.findIndex((item) => item.id === licId);
        target.licenses.splice(index, 1);
      }
    });
  });

  const { run } = useRequestInternal(
    async () => {
      return WidgetGroupControllerFindAll({
        includes: [
          { model: 'User' },
          { model: 'Widget' },
          {
            model: 'License',
            wheres: {
              where: [
                {
                  fieldName: 'userId',
                  conditions: {
                    eq: user.id,
                  },
                },
              ],
            },
          },
        ],
      }) as Promise<InstalledWidgetGroupItem[]>;
    },
    {
      onSuccess: (data) => {
        setWidgetGroups(data);
      },
    },
  );

  const metas: ProListProps<InstalledWidgetGroupItem>['metas'] = {
    title: {
      title: '名称',
      dataIndex: 'name',
      render(dom, entity) {
        return (
          <span>
            <Highlighter
              searchWords={[searchText]}
              autoEscape={true}
              textToHighlight={entity.name}
            />
            <BadgeWithTitle count={entity.widgets.length} active />
          </span>
        );
      },
    },
    description: {
      title: '描述',
      dataIndex: 'desc',
      search: false,
    },
    subTitle: {
      title: '标签',
      dataIndex: 'labels',
    },
    actions: {
      render(dom, entity, index, action, schema) {
        const lic = entity.licenses.find((lic) => lic.userId === user.id);
        return (
          <ProButton
            style={{
              width: 80,
            }}
            type="link"
            size="small"
            disabled={!lic}
            request={async () => {
              return LicenseControllerDestroy({
                id: lic!.id,
              });
            }}
            onReqSuccess={(lic) => {
              removeItemLic(entity.id, lic.id);
            }}
          >
            {lic ? '卸载' : '已卸载'}
          </ProButton>
        );
      },
    },
  };

  const dataSource = useMemo(() => {
    return searchText
      ? widgetGroups?.filter((item) => item.name.includes(searchText))
      : widgetGroups;
  }, [searchText, widgetGroups]);

  return {
    listProps: {
      metas,
      dataSource,
      grid: { gutter: 16, column: 4 },
    },
    run,
  };
};
