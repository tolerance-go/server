import { ComId, StatId } from '@/pages/Design/typings/keys';
import { useUpdateModeState } from '@/utils/useUpdateModeState';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import utl from 'lodash';

export type NodeSetting = Record<string, any>;

/**
 * 组件的不同状态
 * key: statId
 */
export type NodeStatusSettings = Record<StatId, NodeSetting>;

/** 所有组件的所有状态下的配置
 * key: comId
 */
export type NodesSettings = Record<ComId, NodeStatusSettings>;

/** 组件外观 */
export default () => {
  const [
    nodesSettings,
    setNodesSettings,
    getNodesSettings,
    initNodesSettings,
    nodesSettingsUpdateMode,
    getNodesSettingsUpdateMode,
  ] = useUpdateModeState<NodesSettings>({});

  const { getSelectedComponentStatusId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      getSelectedComponentStatusId: model.getActiveNodeStatId,
    }),
  );

  const { getStageSelectNodeId } = useModel(
    'Design.stage.stageSelectNodeId',
    (model) => ({
      getStageSelectNodeId: model.getStageSelectNodeId,
    }),
  );

  const setNodeStatSettings = useMemoizedFn(
    (comId: string, statId: string, setting: NodeSetting) => {
      setNodesSettings((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }
        draft[comId][statId] = setting;
      });
    },
  );

  const updateComStatSetting = useMemoizedFn(
    (comId: string, statId: string, setting: Partial<NodeSetting>) => {
      setNodesSettings((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }
        draft[comId][statId] = {
          ...draft[comId][statId],
          ...setting,
        };
      });
    },
  );

  /** 设置组件当前状态下的配置 */
  const setSelectedComSettings = useMemoizedFn((settings: object) => {
    const activeNodeStatId = getSelectedComponentStatusId();
    const stageSelectNodeId = getStageSelectNodeId();

    if (stageSelectNodeId && activeNodeStatId) {
      setNodeStatSettings(stageSelectNodeId, activeNodeStatId, settings);
    }
  });

  /** 拷贝组件 A 状态的配置到 B 状态 */
  const copyComSettingFromStatToOtherStat = useMemoizedFn(
    (comId: string, fromStatId: string, toStatId: string) => {
      setNodesSettings((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }
        draft[comId][toStatId] = draft[comId][fromStatId];
      });
    },
  );

  const copySelectedComSettingFromActiveStatToOtherStat = useMemoizedFn(
    (toStatId: string) => {
      const stageSelectNodeId = getStageSelectNodeId();
      const activeNodeStatId = getSelectedComponentStatusId();
      if (stageSelectNodeId && activeNodeStatId) {
        copyComSettingFromStatToOtherStat(
          stageSelectNodeId,
          activeNodeStatId,
          toStatId,
        );
      }
    },
  );

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      comsSettings: nodesSettings,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    return {
      comsSettings: utl.pick(nodesSettings, comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn((from?: { nodesSettings: NodesSettings }) => {
    initNodesSettings(from?.nodesSettings ?? {});
  });

  const resetData = useMemoizedFn(() => {
    initNodesSettings({});
  });

  const deleteComsSettingsByIds = useMemoizedFn((comIds: string[]) => {
    setNodesSettings((draft) => {
      comIds.forEach((comId) => {
        delete draft[comId];
      });
    });
  });

  return {
    nodesSettings,
    nodesSettingsUpdateMode,
    resetData,
    getNodesSettingsUpdateMode,
    getNodesSettings,
    deleteComsSettingsByIds,
    getSliceData,
    copyComSettingFromStatToOtherStat,
    copySelectedComSettingFromActiveStatToOtherStat,
    setSelectedComSettings,
    getData,
    initData,
    setNodeStatSettings,
    updateComStatSetting,
  };
};
