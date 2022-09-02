import BadgeWithTitle from '@/components/BadgeWithTitle';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import { ProListProps } from '@ant-design/pro-components';
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
  const [widgetLibs, setWidgetLibs] = useState<InstalledWidgetLibItem[]>();

  const user = useLoginUser();

  const { run } = useRequestInternal(
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
