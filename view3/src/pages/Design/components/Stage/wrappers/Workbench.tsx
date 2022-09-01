import { joinUnitNumber } from '@/pages/Design/utils/joinUnitNumber';
import { useModel } from '@umijs/max';
import { PropsWithChildren } from 'react';

export const StageWorkbenchWrapper = (
  props: PropsWithChildren<{
    id: string;
  }>,
) => {
  const { stageSize } = useModel('Design.stage.stageSize', (model) => ({
    stageSize: model.stageSize,
  }));

  return (
    <div
      id={props.id}
      style={{
        width: joinUnitNumber(stageSize?.width),
        height: joinUnitNumber(stageSize?.height),
        background: '#fff',
      }}
    >
      {props.children}
    </div>
  );
};
