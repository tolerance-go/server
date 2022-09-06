import { useModel } from '@umijs/max';

/** 组件通过事件切换了的状态 */
export default (comId: string) => {
  const { comsSettings } = useModel('design.page.nodesSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { nodesStyles } = useModel('design.page.nodesStyles', (model) => {
    return {
      nodesStyles: model.nodesStyles,
    };
  });

  const { statusSettingsUsed } = useModel(
    'design.page.statusSettingsUsed',
    (model) => ({
      statusSettingsUsed: model.statusSettingsUsed,
    }),
  );

  const usedStatId = statusSettingsUsed[comId];
  const usedStatSettings = comsSettings[comId]?.[usedStatId];
  const usedStatStyles = nodesStyles[comId]?.[usedStatId];

  return { usedStatSettings, usedStatStyles, usedStatId };
};
