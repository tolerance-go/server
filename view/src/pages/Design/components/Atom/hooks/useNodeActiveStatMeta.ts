// 用户选中组件，右侧面板对应的配置
import { useModel } from '@umijs/max';

export default (comId: string) => {
  const { comsSettings } = useModel('Design.page.nodesSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  if (activeNodeStatId) {
    const activeStatSettings = comsSettings[comId]?.[activeNodeStatId];
    const activeStatStyles = comsStyles[comId]?.[activeNodeStatId];
    return { activeStatSettings, activeStatStyles };
  }

  return {};
};
