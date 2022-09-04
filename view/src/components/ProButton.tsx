import { useMemoizedFn } from 'ahooks';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { Button, ButtonProps, Popconfirm, PopconfirmProps } from 'antd';

export const ProButton = <T, TParams extends any[]>({
  request,
  onReqSuccess,
  popconfirm,
  defaultParams,
  ...rest
}: {
  request?: (...args: TParams) => Promise<T>;
  onReqSuccess?: (data: T) => void;
  popconfirm?: PopconfirmProps;
  defaultParams?: TParams;
} & ButtonProps) => {
  const { run, loading } = useRequestReadyOnAuth<T, TParams>(
    async (...params) => {
      return request!(...params);
    },
    {
      manual: true,
      onSuccess: onReqSuccess,
      defaultParams,
    },
  );

  const handleClick = useMemoizedFn(() => {
    if (!request) return;

    run(...(defaultParams ?? ([] as unknown[] as TParams)));
  });

  const btn = (
    <Button {...rest} loading={loading} onClick={handleClick}></Button>
  );

  if (popconfirm) {
    return (
      <Popconfirm {...popconfirm} onConfirm={handleClick}>
        {btn}
      </Popconfirm>
    );
  }

  return btn;
};
