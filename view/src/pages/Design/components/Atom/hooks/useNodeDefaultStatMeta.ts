import { useModel } from '@/.umi/plugin-model';

export default (comId: string) => {
  const { nodesDefaultsStatus } = useModel(
    'Design.page.nodesDefaultsStatus',
    (model) => ({
      nodesDefaultsStatus: model.nodesDefaultsStatus,
    }),
  );

  const { comsSettings } = useModel('Design.page.nodesSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { comsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      comsStyles: model.comsStyles,
    };
  });

  const defaultStatId = nodesDefaultsStatus[comId];
  const defaultStatSettings = comsSettings[comId]?.[defaultStatId];
  const defaultStatStyles = comsStyles[comId]?.[defaultStatId];

  return {
    defaultStatId,
    defaultStatSettings,
    defaultStatStyles,
  };
};
