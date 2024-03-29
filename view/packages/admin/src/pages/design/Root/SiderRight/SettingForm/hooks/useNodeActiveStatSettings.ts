// 用户选中组件，右侧面板对应的配置
import { useModel } from '@umijs/max';

export default (comId?: string) => {
  const { comsSettings } = useModel('design.page.nodesSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { activeNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  if (comId && activeNodeStatId) {
    const activeStatSettings = comsSettings[comId][activeNodeStatId];
    return activeStatSettings;
  }

  return undefined;
};
