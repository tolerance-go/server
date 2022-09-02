import BadgeWithTitle from '@/components/BadgeWithTitle';
import useLoginUser from '@/hooks/useLoginUser';
import {
  WidgetGroupIncludeLibAndUserAndWidgetsAndLicense,
  WidgetIncludeGroupIncludeLibAndUserAndLicense,
  WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
} from '@/typings/includes';
import { ProList, ProListProps } from '@ant-design/pro-components';
import { useState } from 'react';
import useWidgetGroupMeta from './useWidgetGroupMeta';
import useWidgetLibMeta from './useWidgetLibMeta';
import useWidgetMeta from './useWidgetMeta';

type Key = 'widgets' | 'widgetGroups' | 'widgetLibs';

export default () => {
  const [activeKey, setActiveKey] = useState<Key>('widgets');

  const [searchVal, setSearchVal] = useState('');

  const user = useLoginUser();

  const { run: requestWidgets, listProps: listPropsWithWidgets } =
    useWidgetMeta({
      searchText: searchVal,
    });

  const { run: requestWidgetGroup, listProps: listPropsWithWidgetGroup } =
    useWidgetGroupMeta({
      searchText: searchVal,
    });

  const { run: requestWidgetLibs, listProps: listPropsWithWidgetLib } =
    useWidgetLibMeta({
      searchText: searchVal,
    });

  const keyMapProps: Record<Key, ProListProps> = {
    widgets: listPropsWithWidgets,
    widgetGroups: listPropsWithWidgetGroup,
    widgetLibs: listPropsWithWidgetLib,
  };

  return (
    <ProList<
      | WidgetIncludeGroupIncludeLibAndUserAndLicense
      | WidgetGroupIncludeLibAndUserAndWidgetsAndLicense
      | WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense
    >
      rowKey="id"
      {...keyMapProps[activeKey]}
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
                    count={listPropsWithWidgets.dataSource?.length}
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
              return;
            }
            if (activeKey === 'widgetGroups') {
              requestWidgetGroup();
              return;
            }
            if (activeKey === 'widgetLibs') {
              requestWidgetLibs();
              return;
            }
          },
        },
      }}
      pagination={{}}
    />
  );
};
