import {
  AppstoreAddOutlined,
  BranchesOutlined,
  CarryOutOutlined,
  CompassOutlined,
  MessageOutlined,
  PartitionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { PATHS } from '@fenxing/common/constants/path';
import { UserControllerShowWithSession } from '@fenxing/common/services/server/UserController';
import { RunTimeLayoutConfig } from '@umijs/max';
import { RuntimeConfig, useLocation } from './.umi/exports';
import QuitAdminBtn from './components/QuitAdminBtn';
import { UserSettings } from './components/UserSettings';
import { PUBLIC_PATH } from './constants/base';

// umi getInitialState 不反回，页面不会渲染
export const getInitialState = async (): Promise<{
  user: API.User;
}> => {
  // 失败会抛出异常
  const user = await UserControllerShowWithSession();

  return { user };
};

/** layout 插件约定的额外 clientRoute 信息 */
type LayoutPluginExtendClientRoute = {
  access?: string;
};

// 文件约定式路由增加配置
// 通过和 patchClientRoutes 配合，如果需要异步支持，需要封装插件
const routerMeta: Record<string, LayoutPluginExtendClientRoute> = {
  [PATHS.DASHBOARD]: {
    access: 'canSeeAdmin',
  },
  '/demands': {},
  [PATHS.APP_LIST]: {},
  '/discuss': {},
  '/versions': {},
  '/teams': {},
  '/widgets': {},
  '/widgets/install': {},
  '/widgets/publish': {},
};

// TODO: 从 umi 里面获取类型
export interface IClientRoute {
  id: string;
  element: React.ReactNode;
  children?: IClientRoute[];
  // compatible with @ant-design/pro-layout
  routes?: IClientRoute[];
  path?: string;
  index?: boolean;
  parentId?: string;
  clientLoader?: () => Promise<any>;
}

export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = ({
  routes,
}: {
  routes: (IClientRoute & LayoutPluginExtendClientRoute)[];
}) => {
  // [pro-layout:[global-layout:[...routes]], openapi]
  routes[0]?.routes?.[0]?.routes?.forEach((route) => {
    Object.assign(route, routerMeta[`/${route.path}`]);
  });
};

export const layout: RuntimeConfig['layout'] = (props) => {
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
    route: {
      path: '/',
      routes: [
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
      ],
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
      src: initialState?.user.avatar,
      size: 'small',
      title: initialState?.user.nickname ?? initialState?.user.username,
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
