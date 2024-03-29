import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useSetNearSelectedComponentStatusId = () => {
  const { getLatestComponentsStatus } = useModel('design.page.nodesStatus', (model) => ({
    getLatestComponentsStatus: model.getComponentsStatus,
  }));

  const { getStageSelectNodeId } = useModel('design.stage.stageSelectNodeId', (model) => ({
    getStageSelectNodeId: model.getStageSelectNodeId,
  }));

  const { setSelectedComponentStatusId, getSelectedComponentStatusId } =
    useModel('design.stage.activeNodeStatId', (model) => ({
      setSelectedComponentStatusId: model.setActiveNodeStatId,
      getSelectedComponentStatusId: model.getActiveNodeStatId,
    }));

  /** 将选中 id 设置为旁边的 id */
  const setNearSelectedComponentStatusId = useMemoizedFn(() => {
    const stageSelectNodeId = getStageSelectNodeId();
    if (stageSelectNodeId) {
      const componentsStatus = getLatestComponentsStatus();
      const activeNodeStatId = getSelectedComponentStatusId();
      const keys = Object.keys(componentsStatus[stageSelectNodeId]);
      const index = keys.findIndex(
        (item) => item === activeNodeStatId,
      );
      if (index > 0) {
        setSelectedComponentStatusId(keys[index - 1]);
      } else {
        setSelectedComponentStatusId(undefined);
      }
    }
  });

  return {
    setNearSelectedComponentStatusId,
  };
};
