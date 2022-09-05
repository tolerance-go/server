import { useModel } from '@umijs/max';
import { useMemo } from 'react';

/** 获取当前组件状态的继承状态对象 */
export const useSelectedComActiveStatExtendRelation = () => {
  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model.stageSelectNodeId,
  }));

  const { nodesStatusRelations } = useModel('Design.page.nodesStatusRelations', (model) => ({
    nodesStatusRelations: model.nodesStatusRelations,
  }));

  const extendRelation = useMemo(() => {
    if (stageSelectNodeId) {
      const relations = Object.keys(
        nodesStatusRelations[stageSelectNodeId] ?? {},
      ).map((relationId) => nodesStatusRelations[stageSelectNodeId][relationId]);

      const extendRelation = relations.find(
        (relation) => relation.toId === activeNodeStatId,
      );

      return extendRelation;
    }
    return undefined;
  }, [stageSelectNodeId, nodesStatusRelations, activeNodeStatId]);

  return {
    extendRelation,
  };
};
