import { useModel } from '@umijs/max';
import { useSelectedComponentStatus } from './useSelectedComponentStatus';

/** 获取当前选中组件的所有配置状态 */
export const useSelectedComponentActiveStatus = () => {
  const { status } = useSelectedComponentStatus();

  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  if (status && activeNodeStatId) {
    return {
      stat: status[activeNodeStatId],
    };
  }

  return {
    stat: undefined,
  };
};
