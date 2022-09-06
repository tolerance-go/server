import { PATHS } from '@/constants/path';
import { useNavigate } from '@umijs/max';
import { Button, Result } from 'antd';

const App = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(PATHS.DASHBOARD);
          }}
        >
          返回系统首页
        </Button>
      }
    />
  );
};

export default App;
