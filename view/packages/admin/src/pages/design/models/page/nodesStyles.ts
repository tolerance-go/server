import { ComId, StatId } from '@/pages/design/typings/keys';
import { useUpdateModeState } from '@/utils/useUpdateModeState';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import utl from 'lodash';
import { CSSProperties } from 'react';

/** 单位数字 */
export type UnitNumber = {
  value?: number;
  /**
   * percentage 百分比
   * absolute 绝对值
   */
  unit?: 'px' | '%';
};

export type BoxPosition = {
  top?: UnitNumber;
  left?: UnitNumber;
  right?: UnitNumber;
  bottom?: UnitNumber;
};

export type BoxSize = {
  width?: UnitNumber;
  height?: UnitNumber;
  /** 锁定宽高比例 */
  lockingWidthRatio?: boolean;
};

export type ComponentCommonStyle = {
  marginPosition?: BoxPosition;
  paddingPosition?: BoxPosition;
  positionType?: CSSProperties['position'];
  position?: BoxPosition;
  size?: BoxSize;
};

/**
 * 组件的不同状态
 * key: statId
 */
export type ComponentStatusStyles = Record<StatId, ComponentCommonStyle>;

/** 所有组件的所有状态下的配置
 * key: comId
 */
export type ComponentsStyles = Record<ComId, ComponentStatusStyles>;

/** 组件外观 */
export default () => {
  const [
    nodesStyles,
    setNodesStyles,
    getNodesStyles,
    initNodesStyles,
    nodesStylesUpdateMode,
    setNodesStylesUpdateMode,
  ] = useUpdateModeState<ComponentsStyles>({});

  const { getSelectedComponentStatusId } = useModel(
    'design.stage.activeNodeStatId',
    (model) => ({
      getSelectedComponentStatusId: model.getActiveNodeStatId,
    }),
  );

  const { getStageSelectNodeId } = useModel(
    'design.stage.stageSelectNodeId',
    (model) => ({
      getStageSelectNodeId: model.getStageSelectNodeId,
    }),
  );

  const setComStatStyle = useMemoizedFn(
    (comId: string, statId: string, style: ComponentCommonStyle) => {
      setNodesStyles((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }
        draft[comId][statId] = style;
      });
    },
  );

  const updateComStatStyle = useMemoizedFn(
    (comId: string, statId: string, style: ComponentCommonStyle) => {
      setNodesStyles((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }
        draft[comId][statId] = {
          ...draft[comId][statId],
          ...style,
        };
      });
    },
  );

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      nodesStyles,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    return {
      nodesStyles: utl.pick(nodesStyles, comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn((from?: { nodesStyles: ComponentsStyles }) => {
    initNodesStyles(from?.nodesStyles ?? {});
  });

  const resetData = useMemoizedFn(() => {
    initNodesStyles({});
  });

  /** 拷贝组件 A 状态的配置到 B 状态 */
  const copyComStyleFromStatToOtherStat = useMemoizedFn(
    (comId: string, fromStatId: string, toStatId: string) => {
      setNodesStyles((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }
        draft[comId][toStatId] = draft[comId][fromStatId];
      });
    },
  );

  const copySelectedComStyleFromActiveStatToOtherStat = useMemoizedFn(
    (toStatId: string) => {
      const stageSelectNodeId = getStageSelectNodeId();
      const activeNodeStatId = getSelectedComponentStatusId();
      if (stageSelectNodeId && activeNodeStatId) {
        copyComStyleFromStatToOtherStat(
          stageSelectNodeId,
          activeNodeStatId,
          toStatId,
        );
      }
    },
  );

  const deleteComsStylesByIds = useMemoizedFn((comIds: string[]) => {
    setNodesStyles((draft) => {
      comIds.forEach((comId) => {
        delete draft[comId];
      });
    });
  });

  return {
    nodesStyles,
    nodesStylesUpdateMode,
    resetData,
    getNodesStyles,
    initNodesStyles,
    setNodesStylesUpdateMode,
    deleteComsStylesByIds,
    getSliceData,
    getData,
    initData,
    setComStatStyle,
    updateComStatStyle,
    copyComStyleFromStatToOtherStat,
    copySelectedComStyleFromActiveStatToOtherStat,
  };
};
