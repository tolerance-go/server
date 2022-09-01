import { DiscussInfos } from '@/pages/Design/components/DiscussInfos';
import { PlaygroundHandlerBar } from '@/pages/Design/components/PlaygroundHandlerBar';
import Stage from '@/pages/Design/components/Stage';
import { DiscussDrawer } from './DiscussDrawer';
import Global from './Global';

export default function App() {
  return (
    <div
      id="playgroundWindow"
      style={{
        background: '#f0f2f5',
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <DiscussDrawer>
        <DiscussInfos />
      </DiscussDrawer>
      <Global />
      <Stage />
      <PlaygroundHandlerBar />
    </div>
  );
}
