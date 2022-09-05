// 用户选中组件，右侧面板对应的配置
import { useModel } from '@umijs/max';

export default (comId: string) => {
  const { comsSettings } = useModel('Design.page.comsSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  if (activeNodeStatId) {
    const activeStatSettings = comsSettings[comId][activeNodeStatId];
    return activeStatSettings;
  }

  return undefined;
};
