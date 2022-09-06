import { useInitialState } from '@/pages/design/hooks/useInitialState';
import { PageControllerCreate } from '@/services/server/PageController';
import { useModel } from '@umijs/max';
import { useClickAway, useEventTarget } from 'ahooks';
import { Input, Spin } from 'antd';
import { useRef } from 'react';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import useAppId from '@/pages/design/hooks/useAppId';

export const TempInput = () => {
  const { pushPath } = useModel('design.page.pageList', (model) => ({
    pushPath: model.pushPath,
  }));

  const { choosePageId } = useModel('design.page.selectedPageId', (model) => ({
    choosePageId: model.choosePageId,
  }));

  const { creatingMeta, stopTempInput } = useModel(
    'design.page.pageCreatingMeta',
    (model) => ({
      creatingMeta: model.creatingMeta,
      stopTempInput: model.stopTempInput,
    }),
  );

  const [value, { onChange }] = useEventTarget({
    initialValue: creatingMeta.defaultInputValue,
  });

  const appId = useAppId();

  const { loading, run } = useRequestReadyOnAuth(
    async (value) => {
      return PageControllerCreate({
        path: value,
        appId,
      });
    },
    {
      loadingDelay: 300,
      manual: true,
      onSuccess: (page) => {
        pushPath(page);
        choosePageId(page.id);
        stopTempInput();
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
          defaultValue={creatingMeta.defaultInputValue}
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
