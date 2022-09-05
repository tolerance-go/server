import { ComId, StatId } from '@/pages/Design/typings/keys';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import utl from 'lodash';
import { useState } from 'react';

export type ComponentSetting = Record<string, any>;

/**
 * 组件的不同状态
 * key: statId
 */
export type ComponentStatusSettings = Record<StatId, ComponentSetting>;

/** 所有组件的所有状态下的配置
 * key: comId
 */
export type ComponentsSettings = Record<ComId, ComponentStatusSettings>;

/** 组件外观 */
const useComsSettings = () => {
  const [nodesSettings, setNodesSettings] = useState<ComponentsSettings>({});

  const { getSelectedComponentStatusId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      getSelectedComponentStatusId: model.getActiveComStatId,
    }),
  );

  const { getStageSelectNodeId } = useModel(
    'Design.stage.stageSelectNodeId',
    (model) => ({
      getStageSelectNodeId: model.getStageSelectNodeId,
    }),
  );

  const setNodeStatSettings = useMemoizedFn(
    (comId: string, statId: string, setting: ComponentSetting) => {
      setNodesSettings(
        produce((draft) => {
          if (draft[comId] === undefined) {
            draft[comId] = {};
          }
          draft[comId][statId] = setting;
        }),
      );
    },
  );

  const updateComStatSetting = useMemoizedFn(
    (comId: string, statId: string, setting: Partial<ComponentSetting>) => {
      setNodesSettings(
        produce((draft) => {
          if (draft[comId] === undefined) {
            draft[comId] = {};
          }
          draft[comId][statId] = {
            ...draft[comId][statId],
            ...setting,
          };
        }),
      );
    },
  );

  /** 设置组件当前状态下的配置 */
  const setSelectedComSettings = useMemoizedFn((settings: object) => {
    const activeNodeStatId = getSelectedComponentStatusId();
    const stageSelectNodeId = getStageSelectNodeId();

    if (stageSelectNodeId && activeNodeStatId) {
      setNodeStatSettings(
        stageSelectNodeId,
        activeNodeStatId,
        settings,
      );
    }
  });

  /** 拷贝组件 A 状态的配置到 B 状态 */
  const copyComSettingFromStatToOtherStat = useMemoizedFn(
    (comId: string, fromStatId: string, toStatId: string) => {
      setNodesSettings(
        produce((draft) => {
          if (draft[comId] === undefined) {
            draft[comId] = {};
          }
          draft[comId][toStatId] = draft[comId][fromStatId];
        }),
      );
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
  const initData = useMemoizedFn(
    (from?: { comsSettings: ComponentsSettings }) => {
      setNodesSettings(from?.comsSettings ?? {});
    },
  );

  const deleteComsSettingsByIds = useMemoizedFn((comIds: string[]) => {
    setNodesSettings(
      produce((draft) => {
        comIds.forEach((comId) => {
          delete draft[comId];
        });
      }),
    );
  });

  return {
    nodesSettings,
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

export default useComsSettings;
