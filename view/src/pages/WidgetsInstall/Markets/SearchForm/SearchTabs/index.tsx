import BadgeTabItem from '@/components/BadgeTabItem';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { WidgetControllerCount } from '@/services/server/WidgetController';
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
            <BadgeTabItem
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
            <BadgeTabItem />
          </span>
        }
        key="widgetGroup"
      />
      <Tabs.TabPane
        tab={
          <span>
            库
            <BadgeTabItem />
          </span>
        }
        key="widgetLib"
      />
    </Tabs>
  );
};
