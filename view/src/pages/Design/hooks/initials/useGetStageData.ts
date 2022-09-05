import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useGetStageData = () => {
  const { getData: getComsTreeData } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getStatusSettings } = useModel('Design.page.nodesStatus', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getStatusSettingsDefaults } = useModel(
    'Design.page.nodesDefaultsStatus',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getStatusRelations } = useModel(
    'Design.page.nodesStatusRelations',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getComsActions } = useModel('Design.page.nodesActions', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsEvents } = useModel('Design.page.nodesEvents', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsStyles } = useModel('Design.page.nodesStyles', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsSettings } = useModel('Design.page.nodesSettings', (model) => {
    return {
      getData: model.getData,
    };
  });

  const getStageData = useMemoizedFn(() => {
    return {
      nodesStatusRelations: getStatusRelations(),
      comsTree: getComsTreeData(),
      // comsModel: getComsModelData(),
      nodesStatus: getStatusSettings(),
      comsStatusDefaults: getStatusSettingsDefaults(),
      nodesActions: getComsActions(),
      nodesEvents: getComsEvents(),
      nodesStyles: getComsStyles(),
      comsSettings: getComsSettings(),
    };
  });

  return {
    getStageData,
  };
};
