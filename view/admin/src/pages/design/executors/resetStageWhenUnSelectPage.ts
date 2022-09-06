import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';


export default () => {
  const { selectedPageId } = useModel(
    'design.page.selectedPageId',
    (model) => ({ selectedPageId: model.selectedPageId }),
  );

  const { resetNodesStructuresAndRootIds } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({ resetNodesStructuresAndRootIds: model.resetData }),
  );

  const { resetNodesSettings } = useModel(
    'design.page.nodesSettings',
    (model) => ({ resetNodesSettings: model.resetData }),
  );

  const { resetNodesDefaultsStatus } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => ({ resetNodesDefaultsStatus: model.resetData }),
  );

  const { resetNodesStyles } = useModel('design.page.nodesStyles', (model) => ({
    resetNodesStyles: model.resetData,
  }));

  const { resetNodesEvents } = useModel('design.page.nodesEvents', (model) => ({
    resetNodesEvents: model.resetData,
  }));

  const { resetNodesActions } = useModel(
    'design.page.nodesActions',
    (model) => ({ resetNodesActions: model.resetData }),
  );

  const { resetNodesStatusRelations } = useModel(
    'design.page.nodesStatusRelations',
    (model) => ({ resetNodesStatusRelations: model.resetData }),
  );

  const { resetNodesStatus } = useModel('design.page.nodesStatus', (model) => ({
    resetNodesStatus: model.resetData,
  }));

  const { setStageSelectNodeId } = useModel(
    'design.stage.stageSelectNodeId',
    (model) => ({ setStageSelectNodeId: model.setStageSelectNodeId }),
  );

  const { setStageSelectSlotGroupId } = useModel(
    'design.stage.stageSelectSlotGroupId',
    (model) => ({ setStageSelectSlotGroupId: model.setStageSelectSlotGroupId }),
  );

  const { setHoverNodeId } = useModel('design.stage.hoverNodeId', (model) => ({
    setHoverNodeId: model.setHoverNodeId,
  }));

  const { setActiveNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    (model) => ({ setActiveNodeStatId: model.setActiveNodeStatId }),
  );

  const { cleanFocusSlotsInert } = useModel(
    'design.stage.slotsInsert',
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
