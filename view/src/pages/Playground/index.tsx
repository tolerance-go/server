import { DiscussInfos } from '@/pages/design/components/DiscussInfos';
import { PlaygroundHandlerBar } from '@/pages/design/components/PlaygroundHandlerBar';
import Stage from '@/pages/design/components/Stage';
import withAppId from '@/wrappers/withAppId';
import withAuth from '@/wrappers/withAuth';
import withPageId from '@/wrappers/withPageId';
import { DiscussDrawer } from './DiscussDrawer';

export default withPageId(
  withAppId(
    withAuth(() => {
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
          <Stage />
          <PlaygroundHandlerBar />
        </div>
      );
    }),
  ),
);
