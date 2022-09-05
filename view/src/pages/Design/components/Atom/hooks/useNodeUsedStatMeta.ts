import { useModel } from '@umijs/max';

/** 组件通过事件切换了的状态 */
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

  const { statusSettingsUsed } = useModel(
    'Design.page.statusSettingsUsed',
    (model) => ({
      statusSettingsUsed: model.statusSettingsUsed,
    }),
  );

  const usedStatId = statusSettingsUsed[comId];
  const usedStatSettings = comsSettings[comId]?.[usedStatId];
  const usedStatStyles = comsStyles[comId]?.[usedStatId];

  return { usedStatSettings, usedStatStyles, usedStatId };
};
