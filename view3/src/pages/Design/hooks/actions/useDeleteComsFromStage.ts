import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useDeleteComsFromStage = () => {
  const { setStageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    setStageSelectNodeId: model.setStageSelectNodeId,
  }));

  const { deleteComModelByIds } = useModel('Design.page.comsStructures', (model) => {
    return {
      deleteComModelByIds: model.deleteComModelByIds,
    };
  });

  const { deleteComStatuslByIds } = useModel('Design.page.comsStatus', (model) => {
    return {
      deleteComStatuslByIds: model.deleteComStatuslByIds,
    };
  });

  const { deleteComSettingsDefaultslByIds } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => {
      return {
        deleteComSettingsDefaultslByIds: model.deleteComSettingsDefaultslByIds,
      };
    },
  );

  const { deleteComsStatusRelationslByIds } = useModel(
    'Design.page.statusConnectRelations',
    (model) => {
      return {
        deleteComsStatusRelationslByIds: model.deleteComsStatusRelationslByIds,
      };
    },
  );

  const { deleteComsActionsByIds } = useModel('Design.page.comsActions', (model) => {
    return {
      deleteComsActionsByIds: model.deleteComsActionsByIds,
    };
  });

  const { deleteComsEventsByIds } = useModel('Design.page.comsEvents', (model) => {
    return {
      deleteComsEventsByIds: model.deleteComsEventsByIds,
    };
  });

  const { deleteComsStylesByIds } = useModel('Design.page.comsStyles', (model) => {
    return {
      deleteComsStylesByIds: model.deleteComsStylesByIds,
    };
  });

  const { deleteComsSettingsByIds } = useModel('Design.page.comsSettings', (model) => {
    return {
      deleteComsSettingsByIds: model.deleteComsSettingsByIds,
    };
  });

  const deleteComsFromStage = useMemoizedFn((comIds: string[]) => {
    deleteComModelByIds(comIds);
    deleteComStatuslByIds(comIds);
    deleteComSettingsDefaultslByIds(comIds);
    deleteComsStatusRelationslByIds(comIds);
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
