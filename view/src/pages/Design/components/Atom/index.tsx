import { ComponentStructure } from '@/pages/design/models/page/nodesStructuresAndRootIds';
import { usePickModel } from '@/utils/useModelTypes';
import { useModel } from '@umijs/max';
import useNodeActiveMeta from './hooks/useNodeActiveStatMeta';
import useNodeDefaultMeta from './hooks/useNodeDefaultStatMeta';
import useNodeUsedMeta from './hooks/useNodeUsedStatMeta';
import { AtomPlaygroundWrapper } from './wrappers/Playground';
import { AtomWorkbenchWrapper } from './wrappers/Workbench';

/**
 * 通过 model 生成组件
 * 舞台上的组件
 */
export const Atom = (props: ComponentStructure) => {
  const { stageMode } = useModel('design.stage.stageMode', (model) => ({
    stageMode: model.stageMode,
  }));

  const { widgetElements } = usePickModel('design.widgetElements', [
    'widgetElements',
  ]);

  const Element = widgetElements[props.type];
  const { slots } = props;

  const { stageSelectNodeId } = useModel(
    'design.stage.stageSelectNodeId',
    (model) => ({
      stageSelectNodeId: model.stageSelectNodeId,
    }),
  );

  const { defaultStatId, defaultStatSettings, defaultStatStyles } =
    useNodeDefaultMeta(props.id);
  const { usedStatSettings, usedStatStyles, usedStatId } = useNodeUsedMeta(
    props.id,
  );
  const { activeStatStyles, activeStatSettings } = useNodeActiveMeta(props.id);

  const statId = usedStatId ?? defaultStatId;

  /**
   * 选中状态 settings 优先级最高
   * 其他 used 大于 defaults
   */
  const el = (
    <Element
      key={props.id}
      {...{
        id: props.id,
        /** 每个组件都一定存在一个默认状态 */
        statId,
        settings:
          stageSelectNodeId === props.id
            ? activeStatSettings ?? usedStatSettings ?? defaultStatSettings
            : usedStatSettings ?? defaultStatSettings,
        styles:
          stageSelectNodeId === props.id
            ? activeStatStyles ?? usedStatStyles ?? defaultStatStyles
            : usedStatStyles ?? defaultStatStyles,
        slots,
      }}
    />
  );

  if (stageMode === 'playground') {
    return (
      <AtomPlaygroundWrapper
        statId={statId}
        comId={props.id}
        display={props.display}
      >
        {el}
      </AtomPlaygroundWrapper>
    );
  }

  return (
    <AtomWorkbenchWrapper
      {...props}
      usedStat={usedStatId !== undefined && usedStatId !== defaultStatId}
    >
      {el}
    </AtomWorkbenchWrapper>
  );
};
