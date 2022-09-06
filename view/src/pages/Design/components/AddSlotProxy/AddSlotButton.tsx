import { useModel } from '@/.umi/plugin-model';
import { pickModel } from '@/utils/pickModel';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { SlotPosition } from '../../models/stage/slotsInsert';

export default ({
  // 前后都可以插入的时候，用来表示当前位置
  slotPos,
  nodeId,
  slotName,
}: {
  slotPos: SlotPosition;
  nodeId: string;
  slotName: string;
}) => {
  const { setMode } = useModel('design.workbench.siderLeftMode', (model) => ({
    setMode: model.setSiderLeftMode,
  }));

  const { stageMode } = useModel('design.stage.stageMode', (model) => ({
    stageMode: model.stageMode,
  }));

  const {
    setFocusComId,
    setFocusSlotName,
    setFocusSlotPosition,
    focusSlotPosition,
    focusComId,
    focusSlotName,
  } = useModel(
    'design.stage.slotsInsert',
    pickModel([
      'setFocusComId',
      'setFocusSlotName',
      'setFocusSlotPosition',
      'focusSlotPosition',
      'focusComId',
      'focusSlotName',
    ]),
  );

  return stageMode === 'playground' ? null : (
    <Button
      shape="circle"
      size="small"
      style={{
        margin: 4,
      }}
      type={
        nodeId === focusComId &&
        slotName === focusSlotName &&
        focusSlotPosition === slotPos
          ? 'primary'
          : 'dashed'
      }
      icon={
        <PlusOutlined
          style={{
            cursor: 'pointer',
          }}
        />
      }
      onClick={(event) => {
        setFocusComId(nodeId);
        setFocusSlotName(slotName);
        setFocusSlotPosition(slotPos);

        event.stopPropagation();
        setMode('insert');
      }}
    ></Button>
  );
};
