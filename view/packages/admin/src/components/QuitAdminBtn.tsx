import { InitDataType, useLocation } from '@/.umi/exports';
import { PATHS, QUERY_KEYS } from '@/constants/path';
import { LogoutOutlined } from '@ant-design/icons';
import { HOST_ORIGINS } from '@fenxing/common/constants/hosts';
import { UserControllerLogout } from '@fenxing/common/services/server/UserController';
import { Tooltip } from 'antd';
import qs from 'qs';

export default ({ setInitialState }: Pick<InitDataType, 'setInitialState'>) => {
  const location = useLocation();

  return (
    <Tooltip title="退出登录" key="GithubFilled">
      <LogoutOutlined
        onClick={async () => {
          await UserControllerLogout();
          // setInitialState(undefined);

          window.location.href = `${HOST_ORIGINS.HOME}${
            PATHS.LOGIN
          }?${qs.stringify({
            // 从什么页面退出
            // 注意 window.location.pathname 是当前页面路径
            // @TODO: history.location.pathname 拿到的并不是
            [QUERY_KEYS.QUIT_FROM]: `${location.pathname}${location.search}`,
          })}`;
        }}
      />
    </Tooltip>
  );
};
