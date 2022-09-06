import { EventHandlerParams } from '@/pages/design/domains/StageEventManager';
import { NodeAction } from '@/pages/design/models/page/nodesActions';
import { SwitchStatusAction } from '@/pages/design/typings/actions';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useCommonActionHandler = () => {
  const { getComStatAction } = useModel(
    'design.page.nodesActions',
    (model) => ({
      getComStatAction: model.getComStatAction,
    }),
  );

  const { setComStatusSettingsUsed } = useModel(
    'design.page.statusSettingsUsed',
    (model) => ({
      setComStatusSettingsUsed: model.setComStatusSettingsUsed,
    }),
  );

  const commonActionHandler = useMemoizedFn(
    (
      params: EventHandlerParams,
      extra?: (action: NodeAction) => void,
    ) => {
      const { event } = params;
      const action = getComStatAction(
        event.execComId,
        event.execComStatId,
        event.execComStatActionId,
      );

      if (action?.type === 'switchStatus') {
        const act = action as SwitchStatusAction;
        setComStatusSettingsUsed(
          act.settings.targetComId,
          act.settings.targetStatId,
        );
      }

      if (action) {
        extra?.(action);
      }
    },
  );

  return {
    commonActionHandler,
  };
};
