import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

export const useSetNearSelectedComponentStatusId = () => {
  const { getLatestComponentsStatus } = useModel('Design.page.comsStatus', (model) => ({
    getLatestComponentsStatus: model.getComponentsStatus,
  }));

  const { getStageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    getStageSelectNodeId: model.getStageSelectNodeId,
  }));

  const { setSelectedComponentStatusId, getSelectedComponentStatusId } =
    useModel('Design.stage.activeNodeStatId', (model) => ({
      setSelectedComponentStatusId: model.setActiveComStatId,
      getSelectedComponentStatusId: model.getActiveComStatId,
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
