import { useRef } from 'react';
import { ComId, EventId, StatId } from '@/pages/design/typings/keys';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import utl from 'lodash';
import { nanoid } from 'nanoid';
import { setComStatTypeWithName } from '@/pages/design/helps/setComStatTypeWithName';
import { updateComStatTypeWithName } from '@/pages/design/helps/updateComStatTypeWithName';
import { useCopyComPropsFromStatToOtherStat } from '@/pages/design/helps/useCopyComPropsFromStatToOtherStat';
import { useUpdateModeState } from '@/utils/useUpdateModeState';

/**
 * eg：
 * 1. 按钮发送请求
 * 2. 切换其他状态
 */
export type NodeEvent = {
  id: string;
  type: string;
  settings: object;
  name: string;
  typeZh: string;
  // 触发条件
  triggerConditionId?: string;
  // 执行条件
  execConditionId?: string;
  execComId: string;
  execComStatId: string;
  execComStatActionId: string;
};

/** key: EventId */
export type NodeEvents = Record<EventId, NodeEvent>;

/**
 * 组件的不同状态
 * key: statId
 */
export type NodeStatusEvents = Record<StatId, NodeEvents>;

/** 所有组件的所有状态下的配置
 * key: comId
 */
export type NodesEvents = Record<ComId, NodeStatusEvents>;

/** 组件的事件管理 */
const useComsEvents = () => {
  const [
    nodesEvents,
    setNodesEvents,
    getNodesEvents,
    initNodesEvents,
    nodesEventsUpdateMode,
    getNodesEventsUpdateMode,
  ] = useUpdateModeState<NodesEvents>({});

  /** 卸载当前页面所有事件注册的函数 */
  const uninstallAllRef = useRef<() => void>();

  const { eventManager } = useModel('design.stage.eventManager', (model) => ({
    eventManager: model.eventManager,
  }));

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

  /** 创建新的事件 */
  const createComStatEvent = useMemoizedFn(
    (comId: string, statId: string, event: Omit<NodeEvent, 'id'>) => {
      const newId = nanoid();

      setNodesEvents((draft) => {
        if (draft[comId] === undefined) {
          draft[comId] = {};
        }

        if (draft[comId][statId] === undefined) {
          draft[comId][statId] = {};
        }

        draft[comId][statId][newId] = {
          id: newId,
          ...event,
        };
      });

      /** 注册事件 */
      eventManager.register(comId, statId, {
        id: newId,
        type: event.type,
        settings: event.settings,
        execComId: event.execComId,
        execComStatId: event.execComStatId,
        execComStatActionId: event.execComStatActionId,
      });
    },
  );

  const setComStatEventWithName = useMemoizedFn(
    (
      comId: string,
      statId: string,
      eventWithName: {
        [actionName: string]: NodeEvent;
      },
    ) => {
      setNodesEvents((draft) => {
        setComStatTypeWithName(comId, statId, eventWithName, draft);
      });
    },
  );

  /** 通过 name 作为 key 找到并更新 */
  const updateComStatEventWithName = useMemoizedFn(
    (
      comId: string,
      statId: string,
      eventWithName: Partial<{
        [actionName: string]: NodeEvent;
      }>,
    ) => {
      setNodesEvents((draft) => {
        updateComStatTypeWithName(comId, statId, eventWithName, draft);
      });
    },
  );

  /** 更新动作 */
  const updateComStatEvent = useMemoizedFn(
    (
      comId: string,
      statId: string,
      event: Partial<NodeEvent> & Pick<NodeEvent, 'id'>,
    ) => {
      setNodesEvents((draft) => {
        draft[comId][statId][event.id] = {
          ...draft[comId][statId][event.id],
          ...event,
        };
      });

      /** 更新注册 */
      eventManager.update(comId, statId, {
        id: event.id,
        type: event.type,
        settings: event.settings,
        execComId: event.execComId,
        execComStatId: event.execComStatId,
        execComStatActionId: event.execComStatActionId,
      });
    },
  );

  /** 删除动作 */
  const deleteComStatEvent = useMemoizedFn(
    (comId: string, statId: string, eventId: string) => {
      setNodesEvents((draft) => {
        delete draft[comId][statId][eventId];
      });

      /** 卸载注册 */
      eventManager.uninstalled(comId, statId, eventId);
    },
  );

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      nodesEvents,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    return {
      nodesEvents: utl.pick(nodesEvents, comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn((from?: { nodesEvents: NodesEvents }) => {
    initNodesEvents(from?.nodesEvents ?? {});

    /** 初始化注册事件管理 */
    if (from?.nodesEvents) {
      uninstallAllRef.current?.();

      const uninstalls: (() => void)[] = [];

      Object.keys(from.nodesEvents).forEach((comId) => {
        Object.keys(from.nodesEvents[comId]).forEach((statId) => {
          const events = from.nodesEvents[comId][statId];
          Object.keys(events).forEach((eventId) => {
            const event = events[eventId];
            const uninstall = eventManager.register(comId, statId, {
              id: event.id,
              type: event.type,
              settings: event.settings,
              execComId: event.execComId,
              execComStatId: event.execComStatId,
              execComStatActionId: event.execComStatActionId,
            });
            uninstalls.push(uninstall);
          });
        });
      });

      uninstallAllRef.current = () => uninstalls.forEach((fn) => fn());
    }
  });

  const resetData = useMemoizedFn(() => {
    uninstallAllRef.current?.();
    initNodesEvents({});
  });

  /** 拷贝组件 A 状态的配置到 B 状态 */
  const { copyComPropsFromStatToOtherStat: copyComEventFromStatToOtherStat } =
    useCopyComPropsFromStatToOtherStat(setNodesEvents);

  const copySelectedComEventFromActiveStatToOtherStat = useMemoizedFn(
    (toStatId: string) => {
      const stageSelectNodeId = getStageSelectNodeId();
      const activeNodeStatId = getSelectedComponentStatusId();
      if (stageSelectNodeId && activeNodeStatId) {
        copyComEventFromStatToOtherStat(
          stageSelectNodeId,
          activeNodeStatId,
          toStatId,
        );
      }
    },
  );

  const deleteComsEventsByIds = useMemoizedFn((comIds: string[]) => {
    setNodesEvents((draft) => {
      comIds.forEach((comId) => {
        delete draft[comId];
      });
    });
  });

  return {
    nodesEvents,
    nodesEventsUpdateMode,
    getNodesEvents,
    initNodesEvents,
    getNodesEventsUpdateMode,
    deleteComsEventsByIds,
    setComStatEventWithName,
    updateComStatEventWithName,
    copySelectedComEventFromActiveStatToOtherStat,
    copyComEventFromStatToOtherStat,
    createComStatEvent,
    setComsEvents: setNodesEvents,
    updateComStatEvent,
    deleteComStatEvent,
    getData,
    initData,
    getSliceData,
    resetData,
  };
};

export default useComsEvents;
