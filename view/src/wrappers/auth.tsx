import { PATHS } from '@/constants/path';
import useAuth from '@/hooks/useAuth';
import { Outlet, useNavigate } from '@umijs/max';
import { Button, Result, Space } from 'antd';

/**
 * 刷新进入页面，会在 getInitialState 的地方根据 401 判断跳转登录页面
 * 但是可能用户在 登录页面 按下浏览器回退按钮，因为是单页应用
 * 所以还需要增加页面 auth 的拦截，否则会渲染一个空页面，如果该页面有
 * 自动发出的请求还会根据 401 继续返回登录页，如果没有则就是一个空页面
 * 我们不希望这样，所以渲染一个更有意义的页面让用户知道并选择下一步怎么做
 */
export default () => {
  const { isLogin } = useAuth();

  const navigate = useNavigate();

  if (isLogin) {
    return <Outlet />;
  } else {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你暂时没有权限访问该页面，请尝试登录或返回首页"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate(PATHS.LOGIN);
              }}
            >
              返回登录页
            </Button>
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
  }
};
