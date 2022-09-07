import { usePickModel } from '@/utils/useModelTypes';
import useUrlState from '@ahooksjs/use-url-state';
import { ProForm, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useMemoizedFn, useUnmount } from 'ahooks';
import { Card, Input, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import useSearchReq from '../_hooks/useSearchReq';
import styles from './index.less';
import SearchTabs from './SearchTabs';

const quickSearch = ['小程序开发', '入驻', 'ISV 权限'];

export default () => {
  const { setSearchVal } = usePickModel('widgetsMarket.searchValue', [
    'setSearchVal',
  ]);

  const { searchByText } = useSearchReq();

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [urlState, setUrlState] = useUrlState({
    searchText: '',
  });
  const [inputVal, setInputVal] = useState<string>(urlState.searchText);

  const search = useMemoizedFn((val: string) => {
    setSearchVal(val);
    setUrlState({
      searchText: val,
    });
    searchByText(val);
  });

  useUnmount(() => {
    setSearchVal('');
  });

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
            search(inputVal);
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
          // onFinish={async () => {
          //   requestDataSource();
          // }}
        >
          <ProForm.Group title="作者">
            <ProFormText name="username" label="姓名" />
          </ProForm.Group>
        </QueryFilter>
      ) : null}
    </Card>
  );
};
