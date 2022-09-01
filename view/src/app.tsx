// 运行时配置

import {
  UserControllerLogout,
  UserControllerShowWithSession,
} from '@/services/server/UserController';
import { LogoutOutlined } from '@ant-design/icons';
import { history, RunTimeLayoutConfig } from '@umijs/max';
import { Tooltip } from 'antd';
import { UserSettings } from './components/UserSettings';
import { PUBLIC_PATH } from './constants/base';
import { PATHS } from './constants/path';
import { currentPageIsLogin } from './helpers/currentPageIs';

// umi getInitialState 不反回，页面不会渲染
export async function getInitialState(): Promise<{
  user?: API.ShownUser;
}> {
  // 登录页面不自动获取用户信息
  if (currentPageIsLogin()) return {};

  try {
    // 失败会抛出异常
    const user = await UserControllerShowWithSession();

    return { user };
  } catch {
    return {};
  }
}

export const layout: RunTimeLayoutConfig = ({
  error,
  initialState,
  setInitialState,
}) => {
  if (error) {
    return {
      menuRender: false,
    };
  }
  return {
    logo: `${PUBLIC_PATH}logo.svg`,
    menu: {
      locale: false,
    },
    avatarProps: {
      src: initialState?.user?.avatar,
      size: 'small',
      title: initialState?.user?.nickname ?? initialState?.user?.username,
    },
    rightContentRender: () => <></>,
    actionsRender: (props) => {
      if (props.isMobile) return [];
      return [
        // <InfoCircleFilled key="InfoCircleFilled" />,
        // <QuestionCircleFilled key="QuestionCircleFilled" />,
        <UserSettings key="settings"></UserSettings>,
        <Tooltip title="退出登录" key="GithubFilled">
          <LogoutOutlined
            onClick={async () => {
              await UserControllerLogout();
              setInitialState({});
              history.push(PATHS.LOGIN);
            }}
          />
        </Tooltip>,
      ];
    },
  };
};
