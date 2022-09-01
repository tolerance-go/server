import { useModel } from '@umijs/max';

export const useComponentUsedSettings = (comId?: string) => {
  const { comsSettings } = useModel('Design.page.comsSettings', (model) => {
    return {
      comsSettings: model.comsSettings,
    };
  });

  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const { statusSettingsUsed } = useModel('Design.page.statusSettingsUsed', (model) => ({
    statusSettingsUsed: model.statusSettingsUsed,
  }));

  if (comId) {
    const usedStatId = statusSettingsUsed[comId];

    const settings = comsSettings[comId]?.[usedStatId];
    const styles = comsStyles[comId]?.[usedStatId];
    return { settings, styles, usedStatId };
  }

  return {
    usedStatId: undefined,
    styles: undefined,
    settings: undefined,
  };
};
