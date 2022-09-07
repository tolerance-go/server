import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useInitSatgeData = () => {
  const { initData: initComsTreeData } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({
      initData: model.initData,
    }),
  );

  const { initData: initStatusSettings } = useModel('design.page.nodesStatus', (model) => ({
    initData: model.initData,
  }));

  const { initData: initStatusSettingsDefaults } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => ({
      initData: model.initData,
    }),
  );

  const { initData: initStatusRelations } = useModel(
    'design.page.nodesStatusRelations',
    (model) => {
      return {
        initData: model.initData,
      };
    },
  );

  const { initData: initComsActions } = useModel('design.page.nodesActions', (model) => {
    return {
      initData: model.initData,
    };
  });

  const { initData: initComsEvents } = useModel('design.page.nodesEvents', (model) => {
    return {
      initData: model.initData,
    };
  });

  const { initData: initComsStyles } = useModel('design.page.nodesStyles', (model) => {
    return {
      initData: model.initData,
    };
  });

  const { initData: initComsSettings } = useModel('design.page.nodesSettings', (model) => {
    return {
      initData: model.initData,
    };
  });

  const initStageData = useMemoizedFn(
    async (stageData: Record<string, any>) => {
      initComsTreeData(stageData.comsTree);
      initComsSettings(stageData.nodesSettings);
      initStatusSettings(stageData.nodesStatus);
      initStatusSettingsDefaults(stageData.comsStatusDefaults);
      initStatusRelations(stageData.nodesStatusRelations);
      initComsActions(stageData.nodesActions);
      initComsEvents(stageData.nodesEvents);
      initComsStyles(stageData.nodesStyles);
    },
  );

  return {
    initStageData,
  };
};
