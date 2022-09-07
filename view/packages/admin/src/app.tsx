// 运行时配置

import { UserControllerShowWithSession } from '@fenxing/common/services/server/UserController';
import {
  AppstoreAddOutlined,
  BranchesOutlined,
  CarryOutOutlined,
  CompassOutlined,
  MessageOutlined,
  PartitionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { HOST_ORIGINS } from '@fenxing/common/constants/hosts';
import { RunTimeLayoutConfig } from '@umijs/max';
import { useLocation } from './.umi/exports';
import QuitAdminBtn from './components/QuitAdminBtn';
import { UserSettings } from './components/UserSettings';
import { PUBLIC_PATH } from './constants/base';
import { PATHS } from '@fenxing/common/constants/path';

// umi getInitialState 不反回，页面不会渲染
export async function getInitialState(): Promise<{
  user: API.ShownUser;
}> {
  try {
    // 失败会抛出异常
    const user = await UserControllerShowWithSession();

    return { user };
  } catch {
    window.location.href = `${HOST_ORIGINS.HOME}${PATHS.LOGIN}`;
    throw Error('never to this');
  }
}

export const layout: RunTimeLayoutConfig = (props) => {
  const { initialState, setInitialState } = props;
  const location = useLocation();
  /**
   * 避免页面闪烁，提前判断而不是在 routes 中隐藏导航
   */
  if ([PATHS.DESIGN, PATHS.PLAYGROUND].includes(location.pathname)) {
    return {
      menuRender: false,
      footerRender: false,
      headerRender: false,
    };
  }

  return {
    logo: `${PUBLIC_PATH}logo.svg`,
    menu: {
      locale: false,
    },
    route: {
      path: '/',
      routes: initialState?.user
        ? [
            {
              name: '工作台',
              path: PATHS.DASHBOARD,
              icon: <CarryOutOutlined />,
            },
            {
              name: '需求管理',
              path: '/demands',
              icon: <CompassOutlined />,
            },
            {
              name: '应用管理',
              path: PATHS.APP_LIST,
              icon: <PartitionOutlined />,
            },
            {
              name: '讨论管理',
              path: '/discuss',
              icon: <MessageOutlined />,
            },
            {
              name: '版本管理',
              path: '/versions',
              icon: <BranchesOutlined />,
            },
            {
              name: '团队管理',
              path: '/teams',
              icon: <TeamOutlined />,
            },
            {
              name: '组件管理',
              path: '/widgets',
              icon: <AppstoreAddOutlined />,
              routes: [
                {
                  name: '我的安装',
                  path: '/widgets/install',
                },
                {
                  name: '我的发布',
                  path: '/widgets/publish',
                },
              ],
            },
          ]
        : [],
    },
    bgLayoutImgList: [
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    avatarProps: {
      src: initialState?.user?.avatar,
      size: 'small',
      title: initialState?.user?.nickname ?? initialState?.user?.username,
    },
    rightContentRender:
      // false 才不会有额外的 div
      false as unknown as ReturnType<RunTimeLayoutConfig>['rightContentRender'],
    actionsRender: (props) => {
      if (props.isMobile) return [];
      return [
        // <InfoCircleFilled key="InfoCircleFilled" />,
        // <QuestionCircleFilled key="QuestionCircleFilled" />,
        <UserSettings key="settings"></UserSettings>,
        <QuitAdminBtn key="quit" setInitialState={setInitialState} />,
      ];
    },
  };
};
