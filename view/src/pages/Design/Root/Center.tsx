import { PlaygroundHandlerBar } from '@/pages/Design/components/PlaygroundHandlerBar';
import Stage from '@/pages/Design/components/Stage';
import { useModel } from '@umijs/max';
import { Layout } from 'antd';

const { Content } = Layout;

export default () => {
  const { setMode } = useModel('Design.workbench.siderLeftMode', (model) => ({
    setMode: model.setSiderLeftMode,
  }));

  const { stageMode } = useModel('Design.stage.stageMode', (model) => ({
    stageMode: model.stageMode,
  }));

  return (
    <Content
      id="workbenchWindow"
      style={{
        overflow: 'auto',
        background: '#f0f2f5',
      }}
      onClick={() => {
        /** 点击舞台，回复左边栏状态 */
        setMode('pages');
      }}
    >
      <Stage />
      {stageMode === 'playground' && <PlaygroundHandlerBar />}
    </Content>
  );
};
