import { useModel } from '@umijs/max';

export const useSelectedComDefaultStatId = () => {
  const { stageSelectNodeId } = useModel('design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const { nodesDefaultsStatus } = useModel(
    'design.page.nodesDefaultsStatus',
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
