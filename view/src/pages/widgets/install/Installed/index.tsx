import BadgeWithTitle from '@/components/BadgeWithTitle';
import { usePickModel } from '@/utils/useModelTypes';
import { ProList, ProListProps } from '@ant-design/pro-components';
import { useState } from 'react';
import { WidgetKey } from './models/activeKey';
import useWidgetGroupMeta, {
  InstalledWidgetGroupItem,
} from './useWidgetGroupMeta';
import useWidgetLibMeta, { InstalledWidgetLibItem } from './useWidgetLibMeta';
import useWidgetMeta, { InstallWidget } from './useWidgetMeta';

export default () => {
  const [searchVal, setSearchVal] = useState('');
  const { activeKey, setActiveKey } = usePickModel(
    'widgets.install.Installed.activeKey',
    ['activeKey', 'setActiveKey'],
  );

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

  const keyMapProps: Record<WidgetKey, ProListProps> = {
    widgets: listPropsWithWidgets,
    widgetGroups: listPropsWithWidgetGroup,
    widgetLibs: listPropsWithWidgetLib,
  };

  return (
    <ProList<InstalledWidgetLibItem | InstallWidget | InstalledWidgetGroupItem>
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
                    count={listPropsWithWidgetLib.dataSource?.length}
                    active={activeKey === 'widgetLibs'}
                  />
                </span>
              ),
            },
          ],
          onChange(key) {
            setActiveKey(key as WidgetKey);
          },
        },
        search: {
          onSearch: (value: string) => {
            setSearchVal(value);
            if (activeKey === 'widgets') {
              requestWidgets();
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
