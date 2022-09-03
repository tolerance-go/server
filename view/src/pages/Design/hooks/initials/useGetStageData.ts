import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useGetStageData = () => {
  const { getData: getComsTreeData } = useModel(
    'Design.page.nodesStructures',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getStatusSettings } = useModel('Design.page.comsStatus', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getStatusSettingsDefaults } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getStatusRelations } = useModel(
    'Design.page.statusConnectRelations',
    (model) => {
      return {
        getData: model.getData,
      };
    },
  );

  const { getData: getComsActions } = useModel('Design.page.comsActions', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsEvents } = useModel('Design.page.comsEvents', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsStyles } = useModel('Design.page.comsStyles', (model) => {
    return {
      getData: model.getData,
    };
  });

  const { getData: getComsSettings } = useModel('Design.page.comsSettings', (model) => {
    return {
      getData: model.getData,
    };
  });

  const getStageData = useMemoizedFn(() => {
    return {
      comsStatusRelations: getStatusRelations(),
      comsTree: getComsTreeData(),
      // comsModel: getComsModelData(),
      comsStatus: getStatusSettings(),
      comsStatusDefaults: getStatusSettingsDefaults(),
      comsActions: getComsActions(),
      comsEvents: getComsEvents(),
      comsStyles: getComsStyles(),
      comsSettings: getComsSettings(),
    };
  });

  return {
    getStageData,
  };
};
