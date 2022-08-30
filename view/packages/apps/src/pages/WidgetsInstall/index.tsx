import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import List from './List';
import Markets from './Markets';

const TableList: React.FC<unknown> = () => {
  // 已购
  const [activeTabKey, setActiveTabKey] = useState<
    'markets' | 'purchase' | 'install' | string
  >('markets');
  return (
    <PageContainer
      header={{
        title: '组件管理',
      }}
      tabList={[
        {
          tab: '组件市场',
          key: 'markets',
        },
        {
          tab: '已安装',
          key: 'install',
        },
      ]}
      tabProps={{
        type: 'card',
      }}
      onTabChange={setActiveTabKey}
    >
      {
        {
          markets: <Markets />,
          install: <List />,
        }[activeTabKey]
      }
    </PageContainer>
  );
};

export default TableList;
