import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import Installed from './Installed';
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
      onTabChange={setActiveTabKey}
    >
      {
        {
          markets: <Markets />,
          install: <Installed />,
        }[activeTabKey]
      }
    </PageContainer>
  );
};

export default TableList;
