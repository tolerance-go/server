import { useModel } from '@@/plugin-model';
import { useUpdateEffect } from 'ahooks';
/** 切换选中页面，重置页面节点选中 */
export default () => {
  const { selectedPageId } = useModel(
    'Design.page.selectedPageId',
    (model) => ({ selectedPageId: model.selectedPageId }),
  );

  const { setNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    setNodeId: model.setStageSelectNodeId,
  }));

  useUpdateEffect(() => {
    setNodeId(undefined);
  }, [selectedPageId]);
};
