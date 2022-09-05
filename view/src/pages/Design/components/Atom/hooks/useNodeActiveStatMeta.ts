// 用户选中组件，右侧面板对应的配置
import { useModel } from '@umijs/max';

export default (comId: string) => {
  const { comsSettings } = useModel('Design.page.nodesSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { nodesStyles } = useModel('Design.page.nodesStyles', (model) => {
    return {
      nodesStyles: model.nodesStyles,
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
    const activeStatStyles = nodesStyles[comId]?.[activeNodeStatId];
    return { activeStatSettings, activeStatStyles };
  }

  return {};
};
