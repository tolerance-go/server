import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import List from './List';

const TableList: React.FC<unknown> = () => {
  return (
    <PageContainer
      header={{
        title: '组件管理',
      }}
    >
      <List />
    </PageContainer>
  );
};

export default TableList;
