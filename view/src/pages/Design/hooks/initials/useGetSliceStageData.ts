import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useGetSliceStageData = () => {
  const { getSliceData: getComsTreeData } = useModel(
    'Design.page.comsStructures',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusSettings } = useModel(
    'Design.page.comsStatus',
    (model) => {
      return {
        getSliceData: model.getSliceData,
      };
    },
  );

  const { getSliceData: getStatusSettingsDefaults } = useModel(
    'Design.page.statusSettingsDefaults',
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

  const { getSliceData: getComsActions } = useModel('Design.page.comsActions', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsEvents } = useModel('Design.page.comsEvents', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      getSliceData: model.getSliceData,
    };
  });

  const { getSliceData: getComsSettings } = useModel(
    'Design.page.comsSettings',
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
      comsStatus: getStatusSettings(allComIds),
      comsStatusDefaults: getStatusSettingsDefaults(allComIds),
      comsActions: getComsActions(allComIds),
      comsEvents: getComsEvents(allComIds),
      comsStyles: getComsStyles(allComIds),
      comsSettings: getComsSettings(allComIds),
    };
  });

  return {
    getSliceStageData,
  };
};