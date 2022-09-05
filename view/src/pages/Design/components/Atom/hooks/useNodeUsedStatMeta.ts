import { useModel } from '@umijs/max';

/** 组件通过事件切换了的状态 */
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

  const { statusSettingsUsed } = useModel(
    'Design.page.statusSettingsUsed',
    (model) => ({
      statusSettingsUsed: model.statusSettingsUsed,
    }),
  );

  const usedStatId = statusSettingsUsed[comId];
  const usedStatSettings = comsSettings[comId]?.[usedStatId];
  const usedStatStyles = nodesStyles[comId]?.[usedStatId];

  return { usedStatSettings, usedStatStyles, usedStatId };
};
