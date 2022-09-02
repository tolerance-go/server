// 运行时配置

import { UserControllerShowWithSession } from '@/services/server/UserController';
import { RunTimeLayoutConfig } from '@umijs/max';
import { useLocation } from './.umi/exports';
import QuitAdminBtn from './components/QuitAdminBtn';
import { UserSettings } from './components/UserSettings';
import { PUBLIC_PATH } from './constants/base';
import { PATHS } from './constants/path';
import { currentPageIsHome, currentPageIsLogin } from './helpers/currentPageIs';

// umi getInitialState 不反回，页面不会渲染
export async function getInitialState(): Promise<{
  user?: API.ShownUser;
}> {
  // 登录页面不自动获取用户信息
  if (currentPageIsLogin() || currentPageIsHome()) return {};

  // 失败会抛出异常
  const user = await UserControllerShowWithSession();

  return { user };
}

export const layout: RunTimeLayoutConfig = (props) => {
  const { initialState, setInitialState } = props;
  const location = useLocation();
  /**
   * 登录页和首页刷新，避免闪烁
   * 避免闪烁，增加 design 页面
   * @@initialState model 可能为空：在 其他 model 中的进行 use
   * initialState 可能为空，getInitialState 内部抛出异常
   * initialState.user 可能为空，登录页和首页首次进入不拉用户数据
   */
  // 注意 error 不会恢复，约定根据 user 存在来进行判断
  if (
    [PATHS.DESIGN, PATHS.HOME, PATHS.LOGIN].includes(location.pathname) ||
    !initialState?.user
  ) {
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
        <QuitAdminBtn key="quit" setInitialState={setInitialState} />,
      ];
    },
  };
};
