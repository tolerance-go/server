import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';
import { useGetState, useUpdateEffect } from 'ahooks';
import { useEffect } from 'react';

const useStageSelectNodeId = () => {
  const [stageSelectNodeId, setStageSelectNodeId, getStageSelectNodeId] =
    useGetState<string>();

  const { openTargetFromTreeMenu } = useModel(
    'Design.workbench.comsLayout',
    (model) => ({
      openTargetFromTreeMenu: model?.openTargetFromTreeMenu,
    }),
  );

  const { setPagesSiderMode } = useModel(
    'Design.workbench.normalModeSubMode',
    pickModel(['setPagesSiderMode']),
  );

  const { setSiderLeftMode } = useModel(
    'Design.workbench.siderLeftMode',
    pickModel(['setSiderLeftMode']),
  );

  const { setStageSelectSlotGroupId } = useModel(
    'Design.stage.stageSelectSlotGroupId',
    (model) => ({
      setStageSelectSlotGroupId: model?.setStageSelectSlotGroupId,
    }),
  );

  const { setSelectedKeys } = useModel(
    'Design.workbench.comsLayout',
    (model) => ({
      setSelectedKeys: model?.setSelectedKeys,
    }),
  );

  const { selectedComponentStatusIdFromComDefaultStatus } = useModel(
    'Design.page.statusSettingsDefaults',
    (model) => ({
      selectedComponentStatusIdFromComDefaultStatus:
        model.selectRightPanelComStatusIdFromDefault,
    }),
  );

  const { setMode: setRightBarMode } = useModel(
    'Design.workbench.siderRightMode',
    pickModel(['setMode']),
  );

  /** 当舞台选中组件 id 发生变化，打开树形节点菜单 */
  useEffect(() => {
    if (stageSelectNodeId) {
      openTargetFromTreeMenu(stageSelectNodeId);
    }
  }, [stageSelectNodeId]);

  /** 当舞台选中组件时候，清空选中的插槽组 */
  useUpdateEffect(() => {
    if (stageSelectNodeId) {
      setStageSelectSlotGroupId(undefined);
    }
  }, [stageSelectNodeId]);

  /** 选中组件后，设置布局选中 key */
  useUpdateEffect(() => {
    if (stageSelectNodeId) {
      setSelectedKeys([stageSelectNodeId]);
    }
  }, [stageSelectNodeId]);

  /** 选中组件后，设置 right panel 选中状态 tab */
  useUpdateEffect(() => {
    if (stageSelectNodeId) {
      selectedComponentStatusIdFromComDefaultStatus(stageSelectNodeId);
    }
  }, [stageSelectNodeId]);

  /** 当舞台选中组件，切换布局 */
  useEffect(() => {
    if (stageSelectNodeId) {
      setSiderLeftMode('pages');
      setPagesSiderMode('layout');
    }
  }, [stageSelectNodeId]);

  /** 选中组件后，设置 right panel 的模式为 settings */
  useUpdateEffect(() => {
    if (stageSelectNodeId) {
      setRightBarMode('settings');
    }
  }, [stageSelectNodeId]);

  return {
    stageSelectNodeId,
    setStageSelectNodeId,
    getStageSelectNodeId,
  };
};

export default useStageSelectNodeId;
