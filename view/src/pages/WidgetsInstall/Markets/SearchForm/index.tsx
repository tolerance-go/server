import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { Card, Input, Row, Space, Tabs, Typography } from 'antd';
import { useState } from 'react';
import useSearchReq from '../_hooks/useSearchReq';
import styles from './index.less';
import SearchTabs from './SearchTabs';

const { TabPane } = Tabs;
const quickSearch = ['小程序开发', '入驻', 'ISV 权限'];

export default () => {
  const { setSearchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    setSearchVal: model.setSearchVal,
  }));

  const { searchByText } = useSearchReq();

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
            searchByText(inputVal);
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

      <SearchTabs showFilter={showFilter} setShowFilter={setShowFilter} />
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
