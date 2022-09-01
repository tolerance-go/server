import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { Card, Input, Row, Space, Tabs, Typography } from 'antd';
import { useState } from 'react';
import styles from './SearchForm.less';

const { TabPane } = Tabs;
const quickSearch = ['小程序开发', '入驻', 'ISV 权限'];

export default () => {
  const { setSearchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    setSearchVal: model.setSearchVal,
  }));

  const { searchType, setSearchType } = useModel(
    'widgetsMarket.searchType',
    (model) => ({
      searchType: model.searchType,
      setSearchType: model.setSearchType,
    }),
  );

  const { requestDataSource: requestDataSourceByWidgets } = useModel(
    'widgetsMarket.tableList.widgets',
    (model) => ({
      requestDataSource: model.requestDataSource,
    }),
  );

  const { requestDataSource: requestDataSourceByWidgetGroups } = useModel(
    'widgetsMarket.tableList.widgetGroups',
    (model) => ({
      requestDataSource: model.requestDataSource,
    }),
  );

  const { requestDataSource: requestDataSourceByWidgetLibs } = useModel(
    'widgetsMarket.tableList.widgetLibs',
    (model) => ({
      requestDataSource: model.requestDataSource,
    }),
  );

  const requestDataSource = useMemoizedFn((searchText?: string) => {
    if (searchType === 'widget') {
      requestDataSourceByWidgets(searchText);
    } else if (searchType === 'widgetGroup') {
      requestDataSourceByWidgetGroups(searchText);
    } else {
      requestDataSourceByWidgetLibs(searchText);
    }
  });

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [inputVal, setInputVal] = useState<string>('');

  return (
    <Card
      bodyStyle={{ paddingBottom: 0 }}
      bordered={false}
      className={showFilter ? '' : styles.hiddenFilter}
    >
      <Row align="middle" justify="center">
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          onSearch={() => {
            setSearchVal(inputVal);
            requestDataSource(inputVal);
          }}
          style={{ maxWidth: 522, width: '100%' }}
        />
        <Space
          style={{
            marginLeft: 15,
          }}
        >
          {quickSearch.map((text) => (
            <Typography.Link
              key={text}
              onClick={() => {
                setInputVal(text);
              }}
            >
              {text}
            </Typography.Link>
          ))}
        </Space>
      </Row>

      <Tabs
        size="large"
        activeKey={searchType}
        onChange={(key) =>
          setSearchType(key as API.CreationLicense['widgetType'])
        }
        tabBarExtraContent={
          <a
            className={styles.filterTrigger}
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            高级筛选 {showFilter ? <UpOutlined /> : <DownOutlined />}
          </a>
        }
      >
        <TabPane tab="组件" key="widget" />
        <TabPane tab="组" key="widgetGroup" />
        <TabPane tab="库" key="widgetLib" />
      </Tabs>
      {showFilter ? (
        <QueryFilter
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          className={styles.filter}
          onFinish={async () => {
            requestDataSource();
          }}
        >
          <ProForm.Group title="作者">
            <ProFormText name="username" label="姓名" />
          </ProForm.Group>
        </QueryFilter>
      ) : null}
    </Card>
  );
};
