import { Server } from '@/typings/Server';
import { ProCard } from '@ant-design/pro-components';
import SearchForm from './SearchForm';
import TableView from './TableView';

export default () => {
  return (
    <>
      <ProCard
        size="small"
        style={{
          marginBottom: 16,
        }}
      >
        <SearchForm />
      </ProCard>
      <TableView />
    </>
  );
};
