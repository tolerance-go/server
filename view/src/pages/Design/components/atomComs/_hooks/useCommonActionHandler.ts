import { EventHandlerParams } from '@/pages/Design/domains/StageEventManager';
import { ComponentAction } from '@/pages/Design/models/nodesActions';
import { SwitchStatusAction } from '@/pages/Design/typings/actions';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useCommonActionHandler = () => {
  const { getComStatAction } = useModel('Design.page.nodesActions', (model) => ({
    getComStatAction: model.getComStatAction,
  }));

  const { setComStatusSettingsUsed } = useModel(
    'Design.page.statusSettingsUsed',
    (model) => ({
      setComStatusSettingsUsed: model.setComStatusSettingsUsed,
    }),
  );

  const commonActionHandler = useMemoizedFn(
    (params: EventHandlerParams, extra?: (action: ComponentAction) => void) => {
      const { event } = params;
      const action = getComStatAction(
        event.execComId,
        event.execComStatId,
        event.execComStatActionId,
      );

      if (action.type === 'switchStatus') {
        const act = action as SwitchStatusAction;
        setComStatusSettingsUsed(
          act.settings.targetComId,
          act.settings.targetStatId,
        );
      }

      extra?.(action);
    },
  );

  return {
    commonActionHandler,
  };
};
