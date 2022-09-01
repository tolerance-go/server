import TagsInput from './TagsInput';
import { PageContainer, ProCard } from '@ant-design/pro-components';

export default function App() {
  return (
    <PageContainer
      header={{
        title: '内部组件',
      }}
    >
      <ProCard title="可编辑 tags">
        <TagsInput />
      </ProCard>
    </PageContainer>
  );
}
