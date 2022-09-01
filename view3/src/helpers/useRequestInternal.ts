import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';

// 内部版本
export const useRequestInternal: typeof useRequest = (
  service,
  options,
  plugins,
) => {
  const { initialState } = useModel('@@initialState', (model) => ({
    initialState: model?.initialState,
  }));

  return useRequest(
    service,
    {
      ready: !!initialState?.user,
      ...options,
    },
    plugins,
  );
};
