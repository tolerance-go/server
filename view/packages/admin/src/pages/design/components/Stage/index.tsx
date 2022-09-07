import { Atom } from '@/pages/design/components/Atom';
import { ComponentStructure } from '@/pages/design/models/page/nodesStructuresAndRootIds';
import { useModel } from '@umijs/max';
import { useMemo } from 'react';
import { StagePlaygroundWrapper } from './wrappers/Playground';
import { StageWorkbenchWrapper } from './wrappers/Workbench';

/** 根据 type 静态注册组件对象 */

export default function Stage() {
  const { rootNodeIds, stageComponentsModel } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        stageComponentsModel: model.nodesStructures,
        rootNodeIds: model.rootNodeIds,
      };
    },
  );

  const rootNodeModels = useMemo(() => {
    return rootNodeIds
      .map((id) => stageComponentsModel?.[id])
      .filter((item): item is ComponentStructure => item !== undefined);
  }, [rootNodeIds, stageComponentsModel]);

  const { stageMode } = useModel('design.stage.stageMode', (model) => ({
    stageMode: model.stageMode,
  }));

  if (!rootNodeModels) {
    return null;
  }

  const nodes = (
    <>
      {rootNodeModels.map((model) => (
        <Atom key={model?.id} {...model} />
      ))}
    </>
  );

  if (stageMode === 'playground') {
    return <StagePlaygroundWrapper id="stage">{nodes}</StagePlaygroundWrapper>;
  }

  return <StageWorkbenchWrapper id="stage">{nodes}</StageWorkbenchWrapper>;
}
