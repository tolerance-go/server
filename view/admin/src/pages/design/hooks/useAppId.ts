import { QUERY_KEYS } from '@/constants/path';
import { useSearchParams } from '@umijs/max';

/**
 * Design 页面专属
 * 需要有对应的 wrappers 拦截，才能保证 appId 一定存在
 */
export default () => {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get(QUERY_KEYS.APP_ID);
  if (!appId) {
    throw new Error('应用 id 获取失败');
  }

  return appId;
};
