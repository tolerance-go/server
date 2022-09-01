import { useModel } from '@umijs/max';

export const useComDefaultStatStyle = (comId?: string) => {
  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const { statusSettingsDefaults } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => ({
      statusSettingsDefaults: model.statusSettingsDefaults,
    }),
  );

  if (comId) {
    const defaultStatId = statusSettingsDefaults[comId];

    const styles = comsStyles[comId]?.[defaultStatId];
    return { styles, defaultStatId };
  }

  return {
    styles: undefined,
  };
};
