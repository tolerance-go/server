import { QUERY_KEYS } from '@/constants/path';
import { useSearchParams } from '@umijs/max';

/**
 * 需要有对应的 wrappers 拦截，才能保证 pageId 一定存在
 */
export default () => {
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get(QUERY_KEYS.PAGE_ID);
  if (!pageId) {
    throw new Error('页面 id 获取失败');
  }

  return pageId;
};
