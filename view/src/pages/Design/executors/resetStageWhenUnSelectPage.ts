import { useUpdateEffect } from 'ahooks';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';

export default () => {
  const { selectedPageId } = useModel(
    'Design.page.selectedPageId',
    pickModel(['selectedPageId']),
  );

  const { resetData: resetNodesStructuresAndRootIds } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    pickModel(['resetData']),
  );

  const { resetData: resetNodesSettings } = useModel(
    'Design.page.nodesSettings',
    pickModel(['resetData']),
  );

  const { resetData: resetNodesDefaultsStatus } = useModel(
    'Design.page.nodesDefaultsStatus',
    pickModel(['resetData']),
  );

  const { resetData: resetNodesStyles } = useModel(
    'Design.page.nodesStyles',
    pickModel(['resetData']),
  );

  const { resetData: resetNodesEvents } = useModel(
    'Design.page.nodesEvents',
    pickModel(['resetData']),
  );

  const { resetData: resetNodesActions } = useModel(
    'Design.page.nodesActions',
    pickModel(['resetData']),
  );

  const { resetData: resetNodesStatus } = useModel(
    'Design.page.nodesStatus',
    pickModel(['resetData']),
  );

  const { setStageSelectNodeId } = useModel(
    'Design.stage.stageSelectNodeId',
    pickModel(['setStageSelectNodeId']),
  );

  const { setStageSelectSlotGroupId } = useModel(
    'Design.stage.stageSelectSlotGroupId',
    pickModel(['setStageSelectSlotGroupId']),
  );

  const { setHoverNodeId } = useModel(
    'Design.stage.hoverNodeId',
    pickModel(['setHoverNodeId']),
  );

  const { setActiveNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    pickModel(['setActiveNodeStatId']),
  );

  const { cleanFocusSlotsInert } = useModel(
    'Design.stage.slotsInsert',
    pickModel(['cleanFocusSlotsInert']),
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

      // 舞台，右侧面板
      setStageSelectNodeId(undefined);
      setStageSelectSlotGroupId(undefined);
      setHoverNodeId(undefined);
      setActiveNodeStatId(undefined);
      cleanFocusSlotsInert();
    }
  }, [selectedPageId]);
};
