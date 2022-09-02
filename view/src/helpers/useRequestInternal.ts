import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';

// 内部版本
export const useRequestInternal: typeof useRequest = (
  service,
  options,
  plugins,
) => {
  const { initialState } = useModel('@@initialState', (model) => ({
    /**
     * 可能在 model 中调用，model 有 undefined 的可能
     * PS：umi 保证所有组件会在 initialState 之后渲染
     */
    initialState: model?.initialState,
  }));

  return useRequest(
    service,
    {
      ready: !!initialState?.user,
      // 通过设置 options.loadingDelay ，可以延迟 loading 变成 true 的时间，有效防止闪烁。
      loadingDelay: 300,
      ...options,
    },
    plugins,
  );
};
