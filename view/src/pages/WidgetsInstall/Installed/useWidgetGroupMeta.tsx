import BadgeWithTitle from '@/components/BadgeWithTitle';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import { ProListProps } from '@ant-design/pro-components';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';

export type InstalledWidgetGroupItem = API.WidgetGroup & {
  widgets: API.Widget[];
};

export default ({ searchText }: { searchText: string }): ProListProps => {
  const [widgetGroups, setWidgetGroups] =
    useState<InstalledWidgetGroupItem[]>();

  const user = useLoginUser();

  useRequestInternal(
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
  };

  const dataSource = useMemo(() => {
    return searchText
      ? widgetGroups?.filter((item) => item.name.includes(searchText))
      : widgetGroups;
  }, [searchText, widgetGroups]);

  return {
    metas,
    dataSource,
    grid: { gutter: 16, column: 4 },
  };
};
