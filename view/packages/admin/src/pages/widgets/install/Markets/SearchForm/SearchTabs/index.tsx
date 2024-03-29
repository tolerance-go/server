import BadgeWithTitle from '@/components/BadgeWithTitle';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { WidgetControllerCount } from '@fenxing/common/services/server/WidgetController';
import { WidgetGroupControllerCount } from '@fenxing/common/services/server/WidgetGroupController';
import { WidgetLibControllerCount } from '@fenxing/common/services/server/WidgetLibController';
import { WidgetsType } from '@/typings/widgets';
import { usePickModel } from '@/utils/useModelTypes';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';

export default ({
  showFilter,
  setShowFilter,
}: {
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { searchType, setSearchType } = useModel(
    'widgetsMarket.searchType',
    (model) => ({
      searchType: model.searchType,
      setSearchType: model.setSearchType,
    }),
  );

  const [widgetsCount, setWidgetsCount] = useState<number>();
  const [widgetGroupCount, setWidgetGroupCount] = useState<number>();
  const [widgetLibCount, setWidgetLibCount] = useState<number>();

  const { searchVal } = usePickModel('widgetsMarket.searchValue', [
    'searchVal',
  ]);

  const { run: requestWithWidget } = useRequestReadyOnAuth(
    async (searchText = '') => {
      return WidgetControllerCount({
        wheres: {
          where: [
            {
              fieldName: 'name',
              conditions: {
                like: searchText ? `%${searchText}%` : undefined,
              },
            },
          ],
        },
      });
    },
    {
      onSuccess(data) {
        setWidgetsCount(data);
      },
    },
  );

  const { run: requestWithWidgetGroup } = useRequestReadyOnAuth(
    async (searchText = '') => {
      return WidgetGroupControllerCount({
        wheres: {
          where: [
            {
              fieldName: 'name',
              conditions: {
                like: searchText ? `%${searchText}%` : undefined,
              },
            },
          ],
        },
      });
    },
    {
      onSuccess(data) {
        setWidgetGroupCount(data);
      },
    },
  );

  const { run: requestWithWidgetLib } = useRequestReadyOnAuth(
    async (searchText = '') => {
      return WidgetLibControllerCount({
        wheres: {
          where: [
            {
              fieldName: 'name',
              conditions: {
                like: searchText ? `%${searchText}%` : undefined,
              },
            },
          ],
        },
      });
    },
    {
      onSuccess(data) {
        setWidgetLibCount(data);
      },
    },
  );

  /** url 会初始化 searchVal */
  useEffect(() => {
    requestWithWidget(searchVal);
    requestWithWidgetGroup(searchVal);
    requestWithWidgetLib(searchVal);
  }, [searchVal]);

  return (
    <Tabs
      size="large"
      activeKey={searchType}
      onChange={(key) => setSearchType(key as WidgetsType)}
      tabBarExtraContent={
        <a
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        >
          高级筛选 {showFilter ? <UpOutlined /> : <DownOutlined />}
        </a>
      }
    >
      <Tabs.TabPane
        tab={
          <span>
            组件
            <BadgeWithTitle
              count={widgetsCount}
              active={searchType === 'widget'}
            />
          </span>
        }
        key="widget"
      />
      <Tabs.TabPane
        tab={
          <span>
            组
            <BadgeWithTitle
              count={widgetGroupCount}
              active={searchType === 'widgetGroup'}
            />
          </span>
        }
        key="widgetGroup"
      />
      <Tabs.TabPane
        tab={
          <span>
            库
            <BadgeWithTitle
              count={widgetLibCount}
              active={searchType === 'widgetLib'}
            />
          </span>
        }
        key="widgetLib"
      />
    </Tabs>
  );
};
