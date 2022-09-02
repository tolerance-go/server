import { InitDataType, useLocation, useNavigate } from '@/.umi/exports';
import { PATHS, PATH_KEYS } from '@/constants/path';
import appendQueryStrToPath from '@/helpers/appendQueryStrToPath';
import { UserControllerLogout } from '@/services/server/UserController';
import { LogoutOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default ({ setInitialState }: Pick<InitDataType, 'setInitialState'>) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tooltip title="退出登录" key="GithubFilled">
      <LogoutOutlined
        onClick={async () => {
          await UserControllerLogout();
          setInitialState({});

          navigate(
            appendQueryStrToPath(PATHS.LOGIN, {
              // 从什么页面退出
              // 注意 window.location.pathname 是当前页面路径
              // @TODO: history.location.pathname 拿到的并不是
              [PATH_KEYS.QUIT_FROM]: `${location.pathname}${location.search}`,
            }),
          );
        }}
      />
    </Tooltip>
  );
};
