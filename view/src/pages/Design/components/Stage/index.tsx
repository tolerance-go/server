import { Atom } from '@/pages/Design/components/Atom';
import { ComponentStructure } from '@/pages/Design/models/page/comsStructures';
import { useModel } from '@umijs/max';
import consola from 'consola';
import { useMemo } from 'react';
import { StagePlaygroundWrapper } from './wrappers/Playground';
import { StageWorkbenchWrapper } from './wrappers/Workbench';

/** 根据 type 静态注册组件对象 */

export default function Stage() {
  const { rootIds, stageComponentsModel } = useModel(
    'Design.page.comsStructures',
    (model) => {
      return {
        stageComponentsModel: model.stageComponentsModel,
        rootIds: model.rootIds,
      };
    },
  );

  const rootNodeModels = useMemo(() => {
    return rootIds
      .map((id) => stageComponentsModel?.[id])
      .filter((item): item is ComponentStructure => item !== undefined);
  }, [rootIds, stageComponentsModel]);

  const { stageMode } = useModel('Design.stage.stageMode', (model) => ({
    stageMode: model.stageMode,
  }));

  if (!rootNodeModels) {
    return null;
  }

  consola.info('渲染跟节点组件', rootIds, stageComponentsModel);

  const el = (
    <>
      {rootNodeModels.map((model) => (
        <Atom key={model?.id} {...model} />
      ))}
    </>
  );

  if (stageMode === 'playground') {
    return <StagePlaygroundWrapper id="stage">{el}</StagePlaygroundWrapper>;
  }

  return <StageWorkbenchWrapper id="stage">{el}</StageWorkbenchWrapper>;
}
