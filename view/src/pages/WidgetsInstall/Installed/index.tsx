import { useModel } from '@/.umi/plugin-model';
import BadgeWithTitle from '@/components/BadgeWithTitle';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import useLoginUser from '@/hooks/useLoginUser';
import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import {
  WidgetGroupIncludeLibAndUserAndWidgetsAndLicense,
  WidgetIncludeGroupIncludeLibAndUserAndLicense,
  WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
} from '@/typings/includes';
import { ProList, ProListProps } from '@ant-design/pro-components';
import { Badge } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import useWidgetGroupMeta from './useWidgetGroupMeta';
import useWidgetMeta from './useWidgetMeta';

type Key = 'widgets' | 'widgetGroups' | 'widgetLibs';

export default () => {
  const [activeKey, setActiveKey] = useState<Key>('widgets');

  const [widgetMeta, setWidgetMeta] = useState<{
    widgets: WidgetIncludeGroupIncludeLibAndUserAndLicense[];
    widgetGroups: WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[];
    widgetLibs: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[];
  }>();
  const [searchVal, setSearchVal] = useState('');

  const user = useLoginUser();

  const { requestWidgets } = useModel(
    'WidgetsInstall.Installed.widgetList',
    (model) => ({
      requestWidgets: model.requestWidgets,
    }),
  );

  const listPropsWithWidgets = useWidgetMeta({
    searchText: searchVal,
  });

  const listPropsWithWidgetGroup = useWidgetGroupMeta({
    searchText: searchVal,
  });

  const keyMapProps: Record<Key, ProListProps> = {
    widgets: listPropsWithWidgets,
    widgetGroups: listPropsWithWidgetGroup,
    widgetLibs: listPropsWithWidgets,
  };

  useRequestInternal(
    async () => {
      const [widgets, widgetGroups, widgetLibs] = await Promise.all([
        WidgetControllerFindAll({
          includes: [
            {
              model: 'WidgetGroup',
              include: [
                {
                  model: 'WidgetLib',
                },
              ],
            },
            {
              model: 'User',
            },
          ],
        }) as Promise<WidgetIncludeGroupIncludeLibAndUserAndLicense[]>,
        WidgetGroupControllerFindAll({
          includes: [
            {
              model: 'WidgetLib',
            },
            {
              model: 'User',
            },
            {
              model: 'Widget',
            },
          ],
        }) as Promise<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>,
        WidgetLibControllerFindAll({
          includes: [
            {
              model: 'User',
            },
            {
              model: 'WidgetGroup',
              include: [
                {
                  model: 'Widget',
                },
              ],
            },
          ],
        }) as Promise<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>,
      ]);
      return {
        widgets,
        widgetGroups,
        widgetLibs,
      };
    },
    {
      onSuccess: (data) => {
        setWidgetMeta(data);
      },
    },
  );

  const result = useMemo(() => {
    if (activeKey === 'widgetGroups') {
      return searchVal
        ? widgetMeta?.widgetGroups?.filter((item) =>
            item.name.includes(searchVal),
          )
        : widgetMeta?.widgetGroups;
    }

    if (activeKey === 'widgetLibs') {
      return searchVal
        ? widgetMeta?.widgetLibs?.filter((item) =>
            item.name.includes(searchVal),
          )
        : widgetMeta?.widgetLibs;
    }
  }, [widgetMeta, searchVal, activeKey]);

  return (
    <ProList<
      | WidgetIncludeGroupIncludeLibAndUserAndLicense
      | WidgetGroupIncludeLibAndUserAndWidgetsAndLicense
      | WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense
    >
      rowKey="id"
      dataSource={result}
      {...keyMapProps[activeKey]}
      {...(activeKey === 'widgetLibs'
        ? {
            grid: { gutter: 16, column: 3 },
            metas: {
              title: {
                title: '名称',
                dataIndex: 'name',
                render(dom, entity) {
                  const item =
                    entity as WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense;

                  const total = (
                    it: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
                  ) => {
                    let count = 0;
                    for (let iit of it.widgetGroups) {
                      count += iit.widgets.length;
                    }
                    return count;
                  };
                  return (
                    <span>
                      <Highlighter
                        searchWords={[searchVal]}
                        autoEscape={true}
                        textToHighlight={entity.name}
                      />
                      <Badge
                        count={total(item)}
                        style={{
                          marginTop: -3,
                          marginLeft: 4,
                          color: '#1890FF',
                          backgroundColor: '#E6F7FF',
                        }}
                      />
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
            },
          }
        : {})}
      toolbar={{
        menu: {
          activeKey,
          items: [
            {
              key: 'widgets',
              label: (
                <span>
                  组件
                  <BadgeWithTitle
                    count={listPropsWithWidgets.dataSource?.length}
                    active={activeKey === 'widgets'}
                  />
                </span>
              ),
            },
            {
              key: 'widgetGroups',
              label: (
                <span>
                  组
                  <BadgeWithTitle
                    count={listPropsWithWidgetGroup.dataSource?.length}
                    active={activeKey === 'widgetGroups'}
                  />
                </span>
              ),
            },
            {
              key: 'widgetLibs',
              label: (
                <span>
                  库
                  <BadgeWithTitle
                    count={widgetMeta?.widgetLibs.length}
                    active={activeKey === 'widgetLibs'}
                  />
                </span>
              ),
            },
          ],
          onChange(key) {
            setActiveKey(key as Key);
          },
        },
        search: {
          onSearch: (value: string) => {
            setSearchVal(value);
            if (activeKey === 'widgets') {
              requestWidgets(user);
            }
          },
        },
      }}
      pagination={{}}
    />
  );
};
