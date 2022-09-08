import useUrlState from '@ahooksjs/use-url-state';
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import Installed from './Installed';
import Markets from './Markets';

const TableList: React.FC<unknown> = () => {
  const [query, setQuery] = useUrlState({ activeTabKey: 'markets' });

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
      tabActiveKey={query.activeTabKey ?? '2'}
      onTabChange={(key) => setQuery({ activeTabKey: key })}
    >
      {
        {
          markets: <Markets />,
          install: <Installed />,
          // https://github.com/alibaba/hooks/issues/1856
        }[query.activeTabKey as string]
      }
    </PageContainer>
  );
};

export default TableList;
