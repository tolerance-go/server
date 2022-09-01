import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useInitSatgeData = () => {
  const { initData: initComsTreeData } = useModel(
    'Design.page.comsStructures',
    (model) => ({
      initData: model.initData,
    }),
  );

  const { initData: initStatusSettings } = useModel('Design.page.comsStatus', (model) => ({
    initData: model.initData,
  }));

  const { initData: initStatusSettingsDefaults } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => ({
      initData: model.initData,
    }),
  );

  const { initData: initStatusRelations } = useModel(
    'Design.page.statusConnectRelations',
    (model) => {
      return {
        initData: model.initData,
      };
    },
  );

  const { initData: initComsActions } = useModel('Design.page.comsActions', (model) => {
    return {
      initData: model.initData,
    };
  });

  const { initData: initComsEvents } = useModel('Design.page.comsEvents', (model) => {
    return {
      initData: model.initData,
    };
  });

  const { initData: initComsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      initData: model.initData,
    };
  });

  const { initData: initComsSettings } = useModel('Design.page.comsSettings', (model) => {
    return {
      initData: model.initData,
    };
  });

  const initStageData = useMemoizedFn(
    async (stageData: Record<string, any>) => {
      initComsTreeData(stageData.comsTree);
      initComsSettings(stageData.comsSettings);
      initStatusSettings(stageData.comsStatus);
      initStatusSettingsDefaults(stageData.comsStatusDefaults);
      initStatusRelations(stageData.comsStatusRelations);
      initComsActions(stageData.comsActions);
      initComsEvents(stageData.comsEvents);
      initComsStyles(stageData.comsStyles);
    },
  );

  return {
    initStageData,
  };
};
