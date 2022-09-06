import IconTrigger from '@/pages/design/components/IconTrigger';
import useAppId from '@/pages/design/hooks/useAppId';
import { usePickModel } from '@/utils/useModelTypes';
import { ReloadOutlined } from '@ant-design/icons';

export default () => {
  const { request } = usePickModel('design.page.pageList', ['request']);
  const appId = useAppId();

  return (
    <IconTrigger
      icon={
        <ReloadOutlined
          style={{
            fontSize: 12,
          }}
        />
      }
      onClick={() => {
        request(appId);
      }}
    ></IconTrigger>
  );
};
