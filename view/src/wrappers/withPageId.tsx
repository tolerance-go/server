import { useSearchParams } from '@/.umi/exports';
import { PATHS, QUERY_KEYS } from '@/constants/path';
import useAppId from '@/pages/design/hooks/useAppId';
import { useNavigate } from '@umijs/max';
import { Button, Result, Space } from 'antd';
import qs from 'qs';

export default (Component: React.ElementType) => () => {
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get(QUERY_KEYS.PAGE_ID);

  const appId = useAppId();

  const navigate = useNavigate();

  if (pageId) {
    return <Component key={pageId} />;
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你访问该页面前丢失了必要的页面标识信息，请返回页面列表重新进入"
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
              navigate(
                `${PATHS.DESIGN}?${qs.stringify({
                  appId,
                })}`,
              );
            }}
          >
            返回页面列表
          </Button>
        </Space>
      }
    />
  );
};
