import IconTrigger from '@/pages/Design/components/IconTrigger';
import useAppId from '@/pages/Design/hooks/useAppId';
import { usePickModel } from '@/utils/useModelTypes';
import { ReloadOutlined } from '@ant-design/icons';

export default () => {
  const { request } = usePickModel('Design.page.pageList', ['request']);
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
