import { useDeleteComsFromStage } from '@/pages/design/hooks/actions/useDeleteComsFromStage';
import { useModel } from '@umijs/max';
import { useHotkeys } from 'react-hotkeys-hook';

/** 响应快捷键删除舞台组件 */
export const useStageSelectedNodeIdEffect = () => {
  const { getStageSelectNodeId } = useModel('design.stage.stageSelectNodeId', (model) => ({
    getStageSelectNodeId: model.getStageSelectNodeId,
  }));

  const { deleteComsFromStage } = useDeleteComsFromStage();

  useHotkeys('Escape', () => {
    const sid = getStageSelectNodeId();
    if (sid) {
      deleteComsFromStage([sid]);
    }
  });
};
