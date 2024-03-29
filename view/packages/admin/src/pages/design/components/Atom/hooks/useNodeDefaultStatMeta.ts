import { useModel } from '@/.umi/plugin-model';

export default (comId: string) => {
  const { nodesDefaultsStatus } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => ({
      nodesDefaultsStatus: model.nodesDefaultsStatus,
    }),
  );

  const { comsSettings } = useModel('design.page.nodesSettings', (model) => {
    return {
      comsSettings: model.nodesSettings,
    };
  });

  const { nodesStyles } = useModel('design.page.nodesStyles', (model) => {
    return {
      nodesStyles: model.nodesStyles,
    };
  });

  const defaultStatId = nodesDefaultsStatus[comId];
  const defaultStatSettings = comsSettings[comId]?.[defaultStatId];
  const defaultStatStyles = nodesStyles[comId]?.[defaultStatId];

  return {
    defaultStatId,
    defaultStatSettings,
    defaultStatStyles,
  };
};
