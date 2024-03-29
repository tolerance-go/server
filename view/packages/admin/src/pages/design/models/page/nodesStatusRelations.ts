import { ComId, RelationId } from '@/pages/design/typings/keys';
import { useUpdateModeState } from '@/utils/useUpdateModeState';
import { useMemoizedFn } from 'ahooks';
import utl from 'lodash';
import { nanoid } from 'nanoid';

export type UnsyncFields = Record<string, boolean>;

/** from 是被继承的，to 是继承者 */
export type NodeStatRelation = {
  id: string;
  toId: string;
  fromId: string;
  /** 锁住的字段，不进行继承同步 */
  settingUnsyncFields: UnsyncFields;
  /** 样式锁 */
  styleUnsyncFields: UnsyncFields;
  /** 动作锁 */
  actionUnsyncFields: UnsyncFields;
  /** 事件锁 */
  eventUnsyncFields: UnsyncFields;
};

/**
 * key: relationId
 */
export type NodeStatusRelations = Record<RelationId, NodeStatRelation>;

/**
 * 所有组件的所有状态下配置之间的关系
 * key: comId
 */
export type NodesStatusRelations = Record<ComId, NodeStatusRelations>;

export default () => {
  const [
    nodesStatusRelations,
    setNodesStatusRelations,
    getNodesStatusRelations,
    initNodesStatusRelations,
    nodesStatusRelationsUpdateMode,
    getNodesStatusRelationsUpdateMode,
  ] = useUpdateModeState<NodesStatusRelations>({});

  /** 创建组件状态关系 */
  const createComStatRelation = useMemoizedFn(
    (comId: string, data: Omit<NodeStatRelation, 'id'>) => {
      setNodesStatusRelations((draft) => {
        const relationId = nanoid();
        if (draft[comId]) {
          draft[comId][relationId] = {
            ...data,
            id: relationId,
          };
        } else {
          draft[comId] = {
            [relationId]: {
              ...data,
              id: relationId,
            },
          };
        }
      });
    },
  );

  /** 删除组件的状态关系 */
  const deleteComStatRelation = useMemoizedFn(
    (comId: string, relationId: string) => {
      setNodesStatusRelations((draft) => {
        if (draft[comId]) {
          delete draft[comId][relationId];
        }
      });
    },
  );

  /** 根据 toStatId 删除关系 */
  const deleteComStatRelationFromToStatId = useMemoizedFn(
    (comId: string, toStatId: string) => {
      Object.keys(nodesStatusRelations[comId]).forEach((relationId) => {
        const relation = nodesStatusRelations[comId][relationId];
        if (relation.toId === toStatId) {
          deleteComStatRelation(comId, relation.id);
        }
      });
    },
  );

  const deleteComsStatusRelationsByIds = useMemoizedFn((comIds: string[]) => {
    setNodesStatusRelations((draft) => {
      comIds.forEach((comId) => {
        delete draft[comId];
      });
    });
  });

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      nodesStatusRelations,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    return {
      nodesStatusRelations: utl.pick(nodesStatusRelations, comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn(
    (from?: { nodesStatusRelations: NodesStatusRelations }) => {
      initNodesStatusRelations(from?.nodesStatusRelations ?? {});
    },
  );

  const resetData = useMemoizedFn(() => {
    initNodesStatusRelations({});
  });

  /** 找到所有继承该组件状态的状态 */
  const getComExtendRelationsFromStat = useMemoizedFn(
    (comId: string, fromStatId: string) => {
      return Object.keys(nodesStatusRelations[comId] ?? {})
        .filter((relationId) => {
          const relation = nodesStatusRelations[comId][relationId];
          return relation.fromId === fromStatId;
        })
        .map((relationId) => nodesStatusRelations[comId][relationId]);
    },
  );

  /** 获取组件状态的继承锁定字段（不同步修改） */
  const getStatLockSettingFields = useMemoizedFn(
    (comId: string, relationId: string) => {
      return nodesStatusRelations[comId]?.[relationId].settingUnsyncFields;
    },
  );

  const getStatLockStyleFields = useMemoizedFn(
    (comId: string, relationId: string) => {
      return nodesStatusRelations[comId]?.[relationId].styleUnsyncFields;
    },
  );

  const getStatLockActionFields = useMemoizedFn(
    (comId: string, relationId: string) => {
      return nodesStatusRelations[comId]?.[relationId].actionUnsyncFields;
    },
  );

  const getStatLockEventFields = useMemoizedFn(
    (comId: string, relationId: string) => {
      return nodesStatusRelations[comId]?.[relationId].eventUnsyncFields;
    },
  );

  /** 将组件的继承字段锁起来 */
  const lockComExtendSettingField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].settingUnsyncFields[fieldName] = true;
      });
    },
  );

  /** 将组件的继承字段解锁 */
  const unlockComExtendSettingField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].settingUnsyncFields[fieldName] = false;
      });
    },
  );

  /** 将组件的继承字段锁起来 */
  const lockComExtendStyleField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].styleUnsyncFields[fieldName] = true;
      });
    },
  );

  /** 将组件的继承字段解锁 */
  const unlockComExtendStyleField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].styleUnsyncFields[fieldName] = false;
      });
    },
  );

  const lockComExtendActionField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].actionUnsyncFields[fieldName] = true;
      });
    },
  );

  const unlockComExtendActionField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].actionUnsyncFields[fieldName] = false;
      });
    },
  );

  const lockComExtendEventField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].eventUnsyncFields[fieldName] = true;
      });
    },
  );

  const unlockComExtendEventField = useMemoizedFn(
    (comId: string, relationId: string, fieldName: string) => {
      setNodesStatusRelations((draft) => {
        draft[comId][relationId].eventUnsyncFields[fieldName] = false;
      });
    },
  );

  return {
    initNodesStatusRelations,
    resetData,
    nodesStatusRelationsUpdateMode,
    getNodesStatusRelationsUpdateMode,
    nodesStatusRelations,
    getNodesStatusRelations,
    deleteComsStatusRelationsByIds,
    getSliceData,
    getStatLockEventFields,
    getStatLockActionFields,
    deleteComStatRelationFromToStatId,
    lockComExtendEventField,
    unlockComExtendEventField,
    lockComExtendActionField,
    unlockComExtendActionField,
    getStatLockStyleFields,
    lockComExtendStyleField,
    unlockComExtendStyleField,
    getStatLockSettingFields,
    lockComExtendSettingField,
    unlockComExtendSettingField,
    getComExtendRelationsFromStat,
    initData,
    getData,
    deleteComStatRelation,
    createComStatRelation,
    setNodesStatusRelations,
  };
};
