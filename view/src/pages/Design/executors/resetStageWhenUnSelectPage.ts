import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';

export default () => {
  const { selectedPageId } = useModel(
    'Design.page.selectedPageId',
    (model) => ({ selectedPageId: model.selectedPageId }),
  );

  const { resetNodesStructuresAndRootIds } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    (model) => ({ resetNodesStructuresAndRootIds: model.resetData }),
  );

  const { resetNodesSettings } = useModel(
    'Design.page.nodesSettings',
    (model) => ({ resetNodesSettings: model.resetData }),
  );

  const { resetNodesDefaultsStatus } = useModel(
    'Design.page.nodesDefaultsStatus',
    (model) => ({ resetNodesDefaultsStatus: model.resetData }),
  );

  const { resetNodesStyles } = useModel('Design.page.nodesStyles', (model) => ({
    resetNodesStyles: model.resetData,
  }));

  const { resetNodesEvents } = useModel('Design.page.nodesEvents', (model) => ({
    resetNodesEvents: model.resetData,
  }));

  const { resetNodesActions } = useModel(
    'Design.page.nodesActions',
    (model) => ({ resetNodesActions: model.resetData }),
  );

  const { resetNodesStatusRelations } = useModel(
    'Design.page.nodesStatusRelations',
    (model) => ({ resetNodesStatusRelations: model.resetData }),
  );

  const { resetNodesStatus } = useModel('Design.page.nodesStatus', (model) => ({
    resetNodesStatus: model.resetData,
  }));

  const { setStageSelectNodeId } = useModel(
    'Design.stage.stageSelectNodeId',
    (model) => ({ setStageSelectNodeId: model.setStageSelectNodeId }),
  );

  const { setStageSelectSlotGroupId } = useModel(
    'Design.stage.stageSelectSlotGroupId',
    (model) => ({ setStageSelectSlotGroupId: model.setStageSelectSlotGroupId }),
  );

  const { setHoverNodeId } = useModel('Design.stage.hoverNodeId', (model) => ({
    setHoverNodeId: model.setHoverNodeId,
  }));

  const { setActiveNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({ setActiveNodeStatId: model.setActiveNodeStatId }),
  );

  const { cleanFocusSlotsInert } = useModel(
    'Design.stage.slotsInsert',
    (model) => ({ cleanFocusSlotsInert: model.cleanFocusSlotsInert }),
  );

  /** 清空选中页面后，同时清空相关数据 */
  useUpdateEffect(() => {
    if (selectedPageId === undefined) {
      resetNodesStructuresAndRootIds();
      resetNodesSettings();
      resetNodesDefaultsStatus();
      resetNodesStyles();
      resetNodesEvents();
      resetNodesActions();
      resetNodesStatus();
      resetNodesStatusRelations();

      // 舞台，右侧面板
      setStageSelectNodeId(undefined);
      setStageSelectSlotGroupId(undefined);
      setHoverNodeId(undefined);
      setActiveNodeStatId(undefined);
      cleanFocusSlotsInert();
    }
  }, [selectedPageId]);
};
