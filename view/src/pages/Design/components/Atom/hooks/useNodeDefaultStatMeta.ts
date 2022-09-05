import { useModel } from '@/.umi/plugin-model';

export default (comId: string) => {
  const { statusSettingsDefaults } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => ({
      statusSettingsDefaults: model.statusSettingsDefaults,
    }),
  );

  const { comsSettings } = useModel('Design.page.comsSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const defaultStatId = statusSettingsDefaults[comId];
  const defaultStatSettings = comsSettings[comId]?.[defaultStatId];
  const defaultStatStyles = comsStyles[comId]?.[defaultStatId];

  return {
    defaultStatId,
    defaultStatSettings,
    defaultStatStyles,
  };
};
