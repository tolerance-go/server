import { useModel } from '@umijs/max';

export const useSelectedComActiveStatStyle = (comId?: string) => {
  const { nodesStyles } = useModel('Design.page.nodesStyles', (model) => {
    return {
      nodesStyles: model.nodesStyles,
    };
  });

  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  if (comId && activeNodeStatId) {
    const style = nodesStyles[comId]?.[activeNodeStatId];
    return { style };
  }

  return {
    style: undefined,
  };
};
