import { useModel } from '@umijs/max';

export const useSelectedComDefaultStatId = () => {
  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const { statusSettingsDefaults } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => ({
      statusSettingsDefaults: model.statusSettingsDefaults,
    }),
  );

  const selectedComDefaultStatId = stageSelectNodeId
    ? statusSettingsDefaults[stageSelectNodeId]
    : undefined;

  return {
    selectedComDefaultStatId,
  };
};
