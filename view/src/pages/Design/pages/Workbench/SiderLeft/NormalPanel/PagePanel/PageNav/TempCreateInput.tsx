import { useInitialState } from '@/pages/Design/hooks/useInitialState';
import { PageControllerCreate } from '@/services/server/PageController';
import { useModel } from '@umijs/max';
import { useClickAway, useEventTarget } from 'ahooks';
import { Input, Spin } from 'antd';
import { useRef } from 'react';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import useAppId from '@/pages/Design/hooks/useAppId';

export const TempInput = () => {
  const { pushPath } = useModel('Design.page.pageList', (model) => ({
    pushPath: model.pushPath,
  }));

  const { choosePageId } = useModel('Design.page.selectedPageId', (model) => ({
    choosePageId: model.choosePageId,
  }));

  const { creatingMeta, stopTempInput } = useModel(
    'Design.page.pageCreatingMeta',
    (model) => ({
      creatingMeta: model.creatingMeta,
      stopTempInput: model.stopTempInput,
    }),
  );

  const [value, { onChange }] = useEventTarget({
    initialValue: creatingMeta.defaultInputValue,
  });

  const appId = useAppId();

  const { loading, run } = useRequestInternal(
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
