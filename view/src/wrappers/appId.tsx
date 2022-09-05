import { useSearchParams } from '@/.umi/exports';
import { PATHS, QUERY_KEYS } from '@/constants/path';
import { Outlet, useNavigate } from '@umijs/max';
import { Button, Result, Space } from 'antd';

export default () => {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get(QUERY_KEYS.APP_ID);

  const navigate = useNavigate();

  if (appId) {
    return <Outlet key={appId} />;
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你访问该页面前丢失了必要的应用标识信息，请返回应用列表重新进入"
      extra={
        <Space>
          <Button
            onClick={() => {
              navigate(PATHS.DASHBOARD);
            }}
          >
            返回系统首页
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate(PATHS.APP_LIST);
            }}
          >
            返回应用列表
          </Button>
        </Space>
      }
    />
  );
};
