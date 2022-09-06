import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useGetSliceStageData = () => {
  const { getSliceData: getComsTreeData } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusSettings } = useModel(
    'design.page.nodesStatus',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusSettingsDefaults } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusRelations } = useModel(
    'design.page.nodesStatusRelations',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getComsActions } = useModel('design.page.nodesActions', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsEvents } = useModel('design.page.nodesEvents', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsStyles } = useModel('design.page.nodesStyles', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsSettings } = useModel(
    'design.page.nodesSettings',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const getSliceStageData = useMemoizedFn((comIds: string[]) => {
    const comsTree = getComsTreeData(comIds);
    const allComIds = Object.keys(comsTree.stageComponentsModel ?? {});
    return {
      comsTree,
      nodesStatusRelations: getStatusRelations(allComIds),
      nodesStatus: getStatusSettings(allComIds),
      comsStatusDefaults: getStatusSettingsDefaults(allComIds),
      nodesActions: getComsActions(allComIds),
      nodesEvents: getComsEvents(allComIds),
      nodesStyles: getComsStyles(allComIds),
      comsSettings: getComsSettings(allComIds),
    };
  });

  return {
    getSliceStageData,
  };
};
