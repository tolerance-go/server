import { PATHS } from '@/constants/path';
import { useNavigate } from '@umijs/max';
import { Button, Result, Space } from 'antd';

export default () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Space>
          <Button
            onClick={() => {
              navigate(PATHS.DASHBOARD);
            }}
          >
            返回系统首页
          </Button>
        </Space>
      }
    />
  );
};
