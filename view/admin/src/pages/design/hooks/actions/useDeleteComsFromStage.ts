import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useDeleteComsFromStage = () => {
  const { setStageSelectNodeId } = useModel('design.stage.stageSelectNodeId', (model) => ({
    setStageSelectNodeId: model.setStageSelectNodeId,
  }));

  const { deleteComModelByIds } = useModel('design.page.nodesStructuresAndRootIds', (model) => {
    return {
      deleteComModelByIds: model.deleteComModelByIds,
    };
  });

  const { deleteComStatuslByIds } = useModel('design.page.nodesStatus', (model) => {
    return {
      deleteComStatuslByIds: model.deleteComStatuslByIds,
    };
  });

  const { deleteComSettingsDefaultslByIds } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => {
      return {
        deleteComSettingsDefaultslByIds: model.deleteComSettingsDefaultslByIds,
      };
    },
  );

  const { deleteComsStatusRelationsByIds } = useModel(
    'design.page.nodesStatusRelations',
    (model) => {
      return {
        deleteComsStatusRelationsByIds: model.deleteComsStatusRelationsByIds,
      };
    },
  );

  const { deleteComsActionsByIds } = useModel('design.page.nodesActions', (model) => {
    return {
      deleteComsActionsByIds: model.deleteComsActionsByIds,
    };
  });

  const { deleteComsEventsByIds } = useModel('design.page.nodesEvents', (model) => {
    return {
      deleteComsEventsByIds: model.deleteComsEventsByIds,
    };
  });

  const { deleteComsStylesByIds } = useModel('design.page.nodesStyles', (model) => {
    return {
      deleteComsStylesByIds: model.deleteComsStylesByIds,
    };
  });

  const { deleteComsSettingsByIds } = useModel('design.page.nodesSettings', (model) => {
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
