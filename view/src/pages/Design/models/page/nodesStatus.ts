import { DEFAULT_COM_STATUS_NAME } from '@/pages/Design/constants';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';

import { ComId, StatId } from '@/pages/Design/typings/keys';
import { useUpdateModeState } from '@/utils/useUpdateModeState';
import utl from 'lodash';

/** 组件状态 */
export type NodeStat = {
  id: string;
  name: string;
};

/** 组件的不同状态 */
export type NodeStatus = Record<StatId, NodeStat>;

/** 所有组件的所有状态下的配置 */
export type NodesStatus = Record<ComId, NodeStatus>;

const useStatusSettings = () => {
  const [
    nodesStatus,
    setNodesStatus,
    getNodesStatus,
    initNodesStatus,
    nodesStatusUpdateMode,
    getNodesStatusUpdateMode,
  ] = useUpdateModeState<NodesStatus>({});

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

  /** 删除组件的所有状态 */
  const deleteComStatus = useMemoizedFn((comId: string) => {
    setNodesStatus((draft) => {
      delete draft[comId];
    });
  });

  /** 删除组件的某个状态 */
  const deleteComStat = useMemoizedFn((comId: string, statId: string) => {
    setNodesStatus((draft) => {
      delete draft[comId][statId];
    });
  });

  /** 从当前选中组件，创建新的配置状态 */
  const createSelectedComponentStat = useMemoizedFn(
    (newStatId: string, name: string) => {
      setNodesStatus((draft) => {
        const stageSelectNodeId = getStageSelectNodeId();

        if (stageSelectNodeId) {
          draft[stageSelectNodeId] = {
            ...draft[stageSelectNodeId],
            [newStatId]: {
              id: newStatId,
              name,
            },
          };
        }
      });
    },
  );

  /** 初始化组件的默认状态 */
  const initComStatus = useMemoizedFn(
    ({ statusId, comId }: { statusId: string; comId: string }) => {
      setNodesStatus((draft) => {
        draft[comId] = {
          [statusId]: {
            id: statusId,
            name: DEFAULT_COM_STATUS_NAME,
          },
        };
      });
    },
  );

  /** 设置当前选中组件的激活 tab 的名称 */
  const setSelectedComActiveStatName = useMemoizedFn((name: string) => {
    const activeNodeStatId = getSelectedComponentStatusId();
    const stageSelectNodeId = getStageSelectNodeId();

    if (stageSelectNodeId && activeNodeStatId) {
      setNodesStatus((draft) => {
        draft[stageSelectNodeId][activeNodeStatId].name = name;
      });
    }
  });

  /** 获取指定组件的所有状态 */
  const getComStatus = useMemoizedFn((comId: string) => {
    return nodesStatus[comId];
  });

  const deleteComStatuslByIds = useMemoizedFn((comIds: string[]) => {
    setNodesStatus((draft) => {
      comIds.forEach((comId) => {
        delete draft[comId];
      });
    });
  });

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      componentsStatus: nodesStatus,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    return {
      componentsStatus: utl.pick(nodesStatus, comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn(
    (from?: { nodesStatus: NodesStatus }) => {
      initNodesStatus(from?.nodesStatus ?? {});
    },
  );

  return {
    nodesStatus,
    nodesStatusUpdateMode,
    initNodesStatus,
    getNodesStatusUpdateMode,
    deleteComStatuslByIds,
    getSliceData,
    getComStatus,
    setSelectedComActiveStatName,
    deleteComStatus,
    deleteComStat,
    getData,
    initData,
    getComponentsStatus: getNodesStatus,
    initComStatus,
    setComponentsStatus: setNodesStatus,
    createSelectedComponentStat,
  };
};

export default useStatusSettings;
