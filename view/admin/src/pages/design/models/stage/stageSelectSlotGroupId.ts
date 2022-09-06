import { useUpdateEffect } from 'ahooks';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

export type StageSlotGroupNode = {
  /** 所在的插槽名称 */
  slotName: string;
  /** 父组件的 id */
  parentId: string;
  /** 所在的组件 id */
  comId: string;
  id: string;
  /**
   * key 为插槽名称，插槽存在多种，不单单是 children
   * value 为组件的 id
   */
  slots: string[];
  display: 'block' | 'inline';
};

/** 舞台插槽组的选择 */
const useStageSelectSlotGroup = () => {
  const [stageSelectSlotGroupId, setStageSelectSlotGroupId] =
    useState<string>();

  const { openTargetFromTreeMenu } = useModel(
    'design.workbench.comsLayout',
    (model) => ({
      openTargetFromTreeMenu: model?.openTargetFromTreeMenu,
    }),
  );

  const { setSiderLeftMode } = useModel(
    'design.workbench.siderLeftMode',
    pickModel(['setSiderLeftMode']),
  );

  const { setPagesSiderMode } = useModel(
    'design.workbench.normalModeSubMode',
    pickModel(['setPagesSiderMode']),
  );

  /** 当舞台选中组件 id 发生变化，打开树形节点菜单 */
  useUpdateEffect(() => {
    if (stageSelectSlotGroupId) {
      openTargetFromTreeMenu(stageSelectSlotGroupId);
    }
  }, [stageSelectSlotGroupId]);

  /** 当舞台选中组件，切换布局 */
  useUpdateEffect(() => {
    if (stageSelectSlotGroupId) {
      setSiderLeftMode('pages');
      setPagesSiderMode('layout');
    }
  }, [stageSelectSlotGroupId]);

  return {
    stageSelectSlotGroupId,
    setStageSelectSlotGroupId,
  };
};

export default useStageSelectSlotGroup;
