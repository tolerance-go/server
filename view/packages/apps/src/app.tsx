// 运行时配置

import { deleteURLQuery } from '@/helpers/deleteURLQuery';
import { getURLQuery } from '@/helpers/getURLQuery';
import { UserControllerLogin } from '@/services/server/UserController';
import { LogoutOutlined, SmileTwoTone } from '@ant-design/icons';
import { RunTimeLayoutConfig } from '@umijs/max';
import { message, Tooltip } from 'antd';
import { UserSettings } from './components/UserSettings';
import { PUBLIC_PATH } from './constants/base';
import { PATHS } from './constants/path';
import {
  UserControllerLogout,
  UserControllerShowWithSession,
} from './services/server/UserController';

const logWelcomeMsg = (user: API.ShownUser) => {
  const getTimeMsg = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 6) {
      return '早上好';
    } else if (hour < 12) {
      return '上午好';
    } else if (hour < 14) {
      return '中午好';
    } else if (hour < 17) {
      return '下午好';
    } else {
      return '晚上好';
    }
  };

  message.open({
    icon: <SmileTwoTone />,
    content: `Hi，${user.username} ${getTimeMsg()}~`,
  });
};

// umi getInitialState 不反回，页面不会渲染
export async function getInitialState(): Promise<{
  user?: API.ShownUser;
}> {
  const { userInfo } = getURLQuery() as {
    userInfo?: Partial<Pick<API.ShownUser, 'username' | 'password'>>;
  };

  if (userInfo) {
    if (!userInfo.password || !userInfo.username) {
      throw new Error('用户信息不完整');
    }

    const user = await UserControllerLogin({
      username: userInfo.username,
      password: userInfo.password,
    });
    deleteURLQuery(['userInfo'], 'replace');
    logWelcomeMsg(user);
    return { user };
  } else {
    const user = await UserControllerShowWithSession();
    logWelcomeMsg(user);
    return { user };
  }
}

export const layout: RunTimeLayoutConfig = (props) => {
  if (props.error) {
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
      src: props.initialState?.user?.avatar,
      size: 'small',
      title:
        props.initialState?.user?.nickname ??
        props.initialState?.user?.username,
    },
    rightContentRender: false,
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
              window.location.href = `http://localhost:9001${PATHS.LOGIN}`;
            }}
          />
        </Tooltip>,
      ];
    },
  };
};
