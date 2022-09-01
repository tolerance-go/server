import { useModel } from '@umijs/max';

export const useComActiveStatStyle = (comId?: string) => {
  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const { selectedComponentStatusId } = useModel(
    'Design.stage.selectedComponentStatusId',
    (model) => ({
      selectedComponentStatusId: model.selectedComponentStatusId,
    }),
  );

  if (comId && selectedComponentStatusId) {
    const styles = comsStyles[comId]?.[selectedComponentStatusId];
    return { styles };
  }

  return {
    styles: undefined,
  };
};
