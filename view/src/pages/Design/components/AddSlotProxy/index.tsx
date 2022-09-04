import { SLOTS_NAME } from '@/pages/Design/constants';
import { joinSlotGroupId } from '@/pages/Design/helps';
import { ComponentStructure } from '@/pages/Design/models/page/nodesStructuresAndRootIds';
import { useModel } from '@umijs/max';
import { useMemo } from 'react';
import { Atom } from '../Atom';
import AddSlotButton from './AddSlotButton';
import SlotGroup from './SlotGroup';

export const AddSlotProxy = ({
  nodeId,
  slotName,
  slots,
}: {
  nodeId: string;
  slotName: string;
  slots?: Record<string, string[]>;
}) => {
  const { stageComponentsModel } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        stageComponentsModel: model?.nodesStructures,
      };
    },
  );

  const slotModels = useMemo(() => {
    return slots?.[slotName]
      ? slots?.[slotName]
          .map((childId) => stageComponentsModel?.[childId])
          .filter((item): item is ComponentStructure => item !== undefined)
      : undefined;
  }, [slots, slotName, stageComponentsModel]);

  const slotsDom = slotModels?.map((model) => (
    <Atom key={model?.id} {...model} />
  ));

  const slotId = joinSlotGroupId(nodeId, slotName);

  if (slotName === SLOTS_NAME.ADDON_BEFORE) {
    return (
      <SlotGroup slotGroupId={slotId} hasSlotsDom={!!slotsDom?.length}>
        <AddSlotButton nodeId={nodeId} slotName={slotName} slotPos="before" />
        {slotsDom}
      </SlotGroup>
    );
  }

  if (slotName === SLOTS_NAME.ADDON_AFTER) {
    return (
      <SlotGroup slotGroupId={slotId} hasSlotsDom={!!slotsDom?.length}>
        {slotsDom}
        <AddSlotButton nodeId={nodeId} slotName={slotName} slotPos="after" />
      </SlotGroup>
    );
  }

  return (
    <SlotGroup slotGroupId={slotId} hasSlotsDom={!!slotsDom?.length}>
      <AddSlotButton nodeId={nodeId} slotName={slotName} slotPos="before" />
      {slotsDom}
      {slotsDom ? (
        <AddSlotButton nodeId={nodeId} slotName={slotName} slotPos="after" />
      ) : null}
    </SlotGroup>
  );
};
