import { useModel } from '@/.umi/plugin-model';
import { PATHS } from '@/constants/path';
import useAppId from '@/pages/design/hooks/useAppId';
import { pickModel } from '@/utils/pickModel';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { Button } from 'antd';

export const PlayAction = () => {
  const appId = useAppId();

  const { selectedPageId } = useModel(
    'design.page.selectedPageId',
    pickModel(['selectedPageId']),
  );

  return (
    <Button
      disabled={!selectedPageId}
      type="text"
      icon={<PlayCircleTwoTone />}
      onClick={() => {
        window.open(
          `${PATHS.PLAYGROUND}?appId=${appId}&pageId=${selectedPageId}`,
        );
      }}
    >
      演示
    </Button>
  );
};
