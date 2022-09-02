import BadgeWithTitle from '@/components/BadgeWithTitle';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { WidgetControllerCount } from '@/services/server/WidgetController';
import { WidgetGroupControllerCount } from '@/services/server/WidgetGroupController';
import { WidgetsType } from '@/typings/widgets';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Tabs } from 'antd';
import { useState } from 'react';

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

  useRequestInternal(
    async () => {
      return WidgetControllerCount({});
    },
    {
      onSuccess(data) {
        setWidgetsCount(data);
      },
    },
  );

  useRequestInternal(
    async () => {
      return WidgetGroupControllerCount({});
    },
    {
      onSuccess(data) {
        setWidgetGroupCount(data);
      },
    },
  );

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
            <BadgeWithTitle />
          </span>
        }
        key="widgetLib"
      />
    </Tabs>
  );
};
