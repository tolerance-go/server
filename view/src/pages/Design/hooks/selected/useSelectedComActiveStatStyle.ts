import { useModel } from '@umijs/max';

export const useSelectedComActiveStatStyle = (comId?: string) => {
  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  if (comId && activeNodeStatId) {
    const style = comsStyles[comId]?.[activeNodeStatId];
    return { style };
  }

  return {
    style: undefined,
  };
};
