import { ComponentStructure } from '@/pages/Design/models/page/nodesStructuresAndRootIds';
import { useModel } from '@umijs/max';
import { useMemo } from 'react';

export const useSelectedNode = () => {
  const { stageComponentsModel } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    (model) => ({
      stageComponentsModel: model.nodesStructures,
    }),
  );

  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const stageSelectNode: ComponentStructure | undefined = useMemo(() => {
    if (stageSelectNodeId) {
      return stageComponentsModel?.[stageSelectNodeId];
    }
    return undefined;
  }, [stageSelectNodeId, stageComponentsModel]);

  return {
    stageSelectNode,
  };
};
