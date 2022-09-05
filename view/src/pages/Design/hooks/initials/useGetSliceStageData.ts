import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useGetSliceStageData = () => {
  const { getSliceData: getComsTreeData } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusSettings } = useModel(
    'Design.page.nodesStatus',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusSettingsDefaults } = useModel(
    'Design.page.nodesDefaultsStatus',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusRelations } = useModel(
    'Design.page.statusConnectRelations',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getComsActions } = useModel('Design.page.nodesActions', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsEvents } = useModel('Design.page.nodesEvents', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsStyles } = useModel('Design.page.nodesStyles', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsSettings } = useModel(
    'Design.page.nodesSettings',
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
      comsStatusRelations: getStatusRelations(allComIds),
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
