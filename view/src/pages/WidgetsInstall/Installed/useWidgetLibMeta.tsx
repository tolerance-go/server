import BadgeWithTitle from '@/components/BadgeWithTitle';
import { ProButton } from '@/components/ProButton';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerDestroy } from '@/services/server/LicenseController';
import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import useGetImmer from '@/utils/useGetImmer';
import { ProListProps } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';

export type InstalledWidgetLibItem = API.WidgetLib & {
  widgetGroups: (API.WidgetGroup & {
    widgets: API.Widget[];
  })[];
  user: API.User;
  licenses: API.License[];
};

export default ({ searchText }: { searchText: string }) => {
  const [widgetLibs, setWidgetLibs] = useGetImmer<InstalledWidgetLibItem[]>();

  const user = useLoginUser();

  const removeItemLic = useMemoizedFn((id: string, licId: string) => {
    setWidgetLibs((draft) => {
      const target = draft?.find((item) => item.id === id);
      if (target) {
        const index = target.licenses.findIndex((item) => item.id === licId);
        target.licenses.splice(index, 1);
      }
    });
  });

  const { run } = useRequestReadyOnAuth(
    async () => {
      return WidgetLibControllerFindAll({
        includes: [
          { model: 'User' },
          {
            model: 'WidgetGroup',
            include: [
              {
                model: 'Widget',
              },
            ],
          },
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
      }) as Promise<InstalledWidgetLibItem[]>;
    },
    {
      onSuccess: (data) => {
        setWidgetLibs(data);
      },
    },
  );

  const metas: ProListProps<InstalledWidgetLibItem>['metas'] = {
    title: {
      title: '名称',
      dataIndex: 'name',
      render(dom, item) {
        const total = () => {
          let count = 0;
          for (let it of item.widgetGroups) {
            count += it.widgets.length;
          }
          return count;
        };
        return (
          <span>
            <Highlighter
              searchWords={[searchText]}
              autoEscape={true}
              textToHighlight={item.name}
            />
            <BadgeWithTitle count={total()} active />
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
      ? widgetLibs?.filter((item) => item.name.includes(searchText))
      : widgetLibs;
  }, [searchText, widgetLibs]);

  return {
    listProps: {
      metas,
      dataSource,
      grid: { gutter: 16, column: 3 },
    },
    run,
  };
};
