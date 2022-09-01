import { PATHS } from '@/constants/path';
import { history } from '@umijs/max';

export const currentPageIs = (pathname: string) => {
  return history.location.pathname === pathname;
};

export const currentPageIsLogin = () => {
  return history.location.pathname === PATHS.LOGIN;
};

export const currentPageIsHome = () => {
  return history.location.pathname === PATHS.HOME;
};
