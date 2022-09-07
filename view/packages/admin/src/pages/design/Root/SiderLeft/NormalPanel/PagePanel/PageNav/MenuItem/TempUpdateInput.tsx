import { PageControllerUpdate } from '@fenxing/common/services/server/PageController';
import { useModel } from '@umijs/max';
import { useClickAway, useEventTarget } from 'ahooks';
import { Input, Spin } from 'antd';
import { useRef } from 'react';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';

export default ({ item }: { item: API.ShownPage }) => {
  const { updatePath } = useModel('design.page.pageList', (model) => ({
    updatePath: model.updatePath,
  }));

  const { stopUpdating } = useModel(
    'design.page.pageUpdatingMeta',
    (model) => ({
      stopUpdating: model.stopUpdating,
    }),
  );

  const [value, { onChange }] = useEventTarget({
    initialValue: item.path,
  });

  const { loading, run } = useRequestReadyOnAuth(
    async (value) => {
      return PageControllerUpdate(
        {
          id: item.id,
        },
        {
          path: value,
        },
      );
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess: (page) => {
        updatePath(page.id, page);
        stopUpdating();
      },
    },
  );

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    run(value);
  }, ref);

  return (
    <Spin spinning={loading}>
      <div ref={ref}>
        <Input
          autoFocus
          value={value}
          onChange={onChange}
          size="small"
          onPressEnter={(e) => {
            /** 防止 Menu 失去 active */
            e.stopPropagation();
            run(value);
          }}
          onBlur={run}
        ></Input>
      </div>
    </Spin>
  );
};
