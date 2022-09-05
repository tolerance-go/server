import { useModel } from '@umijs/max';

export const useSelectedComDefaultStatId = () => {
  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const { nodesDefaultsStatus } = useModel(
    'Design.page.nodesDefaultsStatus',
    (model) => ({
      nodesDefaultsStatus: model.nodesDefaultsStatus,
    }),
  );

  const selectedComDefaultStatId = stageSelectNodeId
    ? nodesDefaultsStatus[stageSelectNodeId]
    : undefined;

  return {
    selectedComDefaultStatId,
  };
};
