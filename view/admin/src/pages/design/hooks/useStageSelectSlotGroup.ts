import { splitSlotGroupId } from '@/pages/design/helps';
import { useModel } from '@umijs/max';
import { useMemo } from 'react';

const useStageSelectSlotGroup = () => {
  const { stageSelectSlotGroupId } = useModel(
    'design.stage.stageSelectSlotGroupId',
    (model) => ({
      stageSelectSlotGroupId: model.stageSelectSlotGroupId,
    }),
  );

  const { stageComponentsModel } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({
      stageComponentsModel: model.nodesStructures,
    }),
  );

  const stageSelectSlotGroup =
    /** 当 id 变化，设置 group */
    useMemo(() => {
      if (stageSelectSlotGroupId) {
        if (stageComponentsModel) {
          const { comId, slotName } = splitSlotGroupId(stageSelectSlotGroupId);
          return {
            id: stageSelectSlotGroupId,
            slots: stageComponentsModel[comId].slots[slotName],
            comId,
            slotName,
            parentId: stageComponentsModel[comId].parentId,
            display: 'inline',
          };
        }
      } else {
        return undefined;
      }
    }, [stageSelectSlotGroupId]);

  return {
    stageSelectSlotGroup,
  };
};

export default useStageSelectSlotGroup;
