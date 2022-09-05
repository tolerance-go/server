import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useDeleteComsFromStage = () => {
  const { setStageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    setStageSelectNodeId: model.setStageSelectNodeId,
  }));

  const { deleteComModelByIds } = useModel('Design.page.nodesStructuresAndRootIds', (model) => {
    return {
      deleteComModelByIds: model.deleteComModelByIds,
    };
  });

  const { deleteComStatuslByIds } = useModel('Design.page.nodesStatus', (model) => {
    return {
      deleteComStatuslByIds: model.deleteComStatuslByIds,
    };
  });

  const { deleteComSettingsDefaultslByIds } = useModel(
    'Design.page.nodesDefaultsStatus',
    (model) => {
      return {
        deleteComSettingsDefaultslByIds: model.deleteComSettingsDefaultslByIds,
      };
    },
  );

  const { deleteComsStatusRelationsByIds } = useModel(
    'Design.page.nodesStatusRelations',
    (model) => {
      return {
        deleteComsStatusRelationsByIds: model.deleteComsStatusRelationsByIds,
      };
    },
  );

  const { deleteComsActionsByIds } = useModel('Design.page.nodesActions', (model) => {
    return {
      deleteComsActionsByIds: model.deleteComsActionsByIds,
    };
  });

  const { deleteComsEventsByIds } = useModel('Design.page.nodesEvents', (model) => {
    return {
      deleteComsEventsByIds: model.deleteComsEventsByIds,
    };
  });

  const { deleteComsStylesByIds } = useModel('Design.page.nodesStyles', (model) => {
    return {
      deleteComsStylesByIds: model.deleteComsStylesByIds,
    };
  });

  const { deleteComsSettingsByIds } = useModel('Design.page.nodesSettings', (model) => {
    return {
      deleteComsSettingsByIds: model.deleteComsSettingsByIds,
    };
  });

  const deleteComsFromStage = useMemoizedFn((comIds: string[]) => {
    deleteComModelByIds(comIds);
    deleteComStatuslByIds(comIds);
    deleteComSettingsDefaultslByIds(comIds);
    deleteComsStatusRelationsByIds(comIds);
    deleteComsActionsByIds(comIds);
    deleteComsEventsByIds(comIds);
    deleteComsStylesByIds(comIds);
    deleteComsSettingsByIds(comIds);
    setStageSelectNodeId((prev) => {
      if (prev && comIds.includes(prev)) {
        return undefined;
      }
      return prev;
    });
  });

  return {
    deleteComsFromStage,
  };
};
