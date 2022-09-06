import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useGetStageData = () => {
  const { getData: getComsTreeData } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getStatusSettings } = useModel('design.page.nodesStatus', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getStatusSettingsDefaults } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getStatusRelations } = useModel(
    'design.page.nodesStatusRelations',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getComsActions } = useModel('design.page.nodesActions', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsEvents } = useModel('design.page.nodesEvents', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsStyles } = useModel('design.page.nodesStyles', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsSettings } = useModel('design.page.nodesSettings', (model) => {
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
