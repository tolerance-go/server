import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { nanoid } from 'nanoid';

export const useHandleComGridItemClick = () => {
  const { mode: siderLeftMode } = useModel(
    'design.workbench.siderLeftMode',
    (model) => ({
      mode: model.siderLeftMode,
    }),
  );

  const { addComponentToStage, addComToStageSlot } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({
      addComponentToStage: model.addComponentToStage,
      addComToStageSlot: model.addComToStageSlot,
    }),
  );

  const { getComsInitialSettings } = useModel(
    'design.config.nodesInitialSettings',
    pickModel(['getComsInitialSettings']),
  );

  const { focusComId, focusSlotName, focusSlotPosition } = useModel(
    'design.stage.slotsInsert',
    pickModel(['focusComId', 'focusSlotName', 'focusSlotPosition']),
  );

  const { setActiveNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    pickModel(['setActiveNodeStatId']),
  );

  const { initComStatus } = useModel('design.page.nodesStatus', (model) => ({
    initComStatus: model.initComStatus,
  }));

  const { setNodeStatSettings } = useModel(
    'design.page.nodesSettings',
    pickModel(['setNodeStatSettings']),
  );

  const { setComStatStyle } = useModel('design.page.nodesStyles', (model) => ({
    setComStatStyle: model.setComStatStyle,
  }));

  const { setComStatusSettingsDefaults } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => ({
      setComStatusSettingsDefaults: model.setComStatusSettingsDefaults,
    }),
  );

  const { setStageSelectNodeId } = useModel(
    'design.stage.stageSelectNodeId',
    (model) => ({
      setStageSelectNodeId: model.setStageSelectNodeId,
    }),
  );

  const { triggerSaveTimeChange } = useModel(
    'design.app.stageAutoSave',
    (model) => {
      return {
        triggerSaveTimeChange: model.triggerPrepareSaveTimeChange,
      };
    },
  );

  const handleComGridItemClick = useMemoizedFn((widget: API.Widget) => {
    const newComId = nanoid();
    const statusId = nanoid();

    /** 处理直接向舞台加入 */

    /** 处理插槽插入 */
    if (siderLeftMode === 'insert') {
      if (!focusComId || !focusSlotName) {
        throw new Error('当前 focusCom 信息异常消失');
      }

      addComToStageSlot({
        parentId: focusComId,
        newId: newComId,
        slotName: focusSlotName,
        type: widget.type,
        display: widget.display,
        position: focusSlotPosition,
      });
    } else {
      addComponentToStage(widget.type, {
        id: newComId,
        display: widget.display,
        parentId: 'root',
        slotName: 'root',
      });
    }

    // 初始化节点配置
    setNodeStatSettings(
      newComId,
      statusId,
      getComsInitialSettings()?.[widget.type] ?? {},
    );

    /** 设置组件默认状态 */
    setComStatusSettingsDefaults(newComId, statusId);

    /** 设置组件初始化样式 */
    setComStatStyle(newComId, statusId, {});

    // 初始化新组件的初始化状态
    initComStatus({ comId: newComId, statusId });

    /** 设置选中组件 */
    setStageSelectNodeId(newComId);

    /** 设置选中组件的选中状态 */
    setActiveNodeStatId(statusId);

    triggerSaveTimeChange();
  });

  return { handleComGridItemClick };
};
