import { ComId } from '@/pages/Design/typings/keys';
import { useUpdateModeState } from '@/utils/useUpdateModeState';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import utl from 'lodash';

export type StatusSettingsDefaults = Record<ComId, string>;

/** 每个组件的默认应用状态 */
export default () => {
  const [
    nodesDefaultsStatus,
    setStatusSettingsDefaults,
    getNodesDefaultsStatus,
    initNodesDefaultsStatus,
    nodesDefaultsStatusUpdateMode,
    getNodesDefaultsStatusUpdateMode,
  ] = useUpdateModeState<StatusSettingsDefaults>({});

  /** 设置组件的默认状态 */
  const setComStatusSettingsDefaults = useMemoizedFn(
    (comId: string, defaultStatId: string) => {
      setStatusSettingsDefaults((draft) => {
        draft[comId] = defaultStatId;
      });
    },
  );

  const { setSelectedComponentStatusId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      setSelectedComponentStatusId: model.setActiveNodeStatId,
    }),
  );

  /** 设置组件的默认状态为全局右侧面板选中状态 */
  const selectRightPanelComStatusIdFromDefault = useMemoizedFn(
    (comId: string) => {
      const defaultStatId = nodesDefaultsStatus[comId];
      setSelectedComponentStatusId(defaultStatId);
    },
  );

  const deleteComSettingsDefaultslByIds = useMemoizedFn((comIds: string[]) => {
    setStatusSettingsDefaults((draft) => {
      comIds.forEach((comId) => {
        delete draft[comId];
      });
    });
  });

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      nodesDefaultsStatus,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    return {
      nodesDefaultsStatus: utl.pick(nodesDefaultsStatus, comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn(
    (from?: { nodesDefaultsStatus: StatusSettingsDefaults }) => {
      initNodesDefaultsStatus(from?.nodesDefaultsStatus ?? {});
    },
  );

  const resetData = useMemoizedFn(() => {
    initNodesDefaultsStatus({});
  });

  /** 清空组件的默认配置 */
  const cleanComDefautStat = useMemoizedFn((comId: string) => {
    setStatusSettingsDefaults((draft) => {
      delete draft[comId];
    });
  });

  const getComDefaultStatId = useMemoizedFn((comId: string) => {
    return nodesDefaultsStatus[comId];
  });

  return {
    getNodesDefaultsStatus,
    initNodesDefaultsStatus,
    resetData,
    nodesDefaultsStatusUpdateMode,
    getNodesDefaultsStatusUpdateMode,
    nodesDefaultsStatus,
    deleteComSettingsDefaultslByIds,
    getSliceData,
    getComDefaultStatId,
    initData,
    getData,
    cleanComDefautStat,
    setComStatusSettingsDefaults,
    selectRightPanelComStatusIdFromDefault,
  };
};
