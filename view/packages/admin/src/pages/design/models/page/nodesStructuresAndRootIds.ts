import { SlotPosition } from '@/pages/design/models/stage/slotsInsert';
import { ComId, SlotName } from '@/pages/design/typings/keys';
import { Server } from '@/typings/Server';
// import { useModel } from '@umijs/max';
import { useUpdateModeState } from '@/utils/useUpdateModeState';
import { useMemoizedFn } from 'ahooks';

/** 物料的组件都是引用该这里 */
export type ComponentStructure = {
  /** 所在的插槽名称 */
  slotName: string;
  /** 父组件的 id */
  parentId: string;
  id: string;
  type: string;
  /**
   * key 为插槽名称，插槽存在多种，不单单是 children
   * value 为组件的 id
   */
  slots: Record<SlotName, string[]>;
  display: Server.WidgetDisplay;
  /** 标记该组件是否和 component 关联 */
  fromComId?: number;
};

export type NodesStructures = Record<ComId, ComponentStructure>;

export type RootIds = string[];

const useStageComponentsModel = () => {
  const [
    rootNodeIds,
    setRootIds,
    getRootIds,
    initRootIds,
    rootIdsUpdateMode,
    getRootIdsUpdateMode,
  ] = useUpdateModeState<RootIds>([]);
  const [
    nodesStructures,
    setNodesStructures,
    getNodesStructures,
    initNodesStructures,
    nodesStructuresUpdateMode,
    getNodesStructuresUpdateMode,
  ] = useUpdateModeState<NodesStructures | undefined>(undefined);

  /** 新增组建到舞台 */
  const addComponentToStage = useMemoizedFn(
    (
      type: string,
      params: {
        parentId: string;
        slotName: string;
        id: string;
        display: ComponentStructure['display'];
      },
    ) => {
      const newId = params.id;

      setRootIds((prev) => prev.concat(newId));

      setNodesStructures((prev) => ({
        ...prev,
        [newId]: {
          slotName: params.slotName,
          parentId: params.parentId,
          id: newId,
          type,
          slots: {},
          display: params.display,
        },
      }));
    },
  );

  /**
   * 新增组建到插槽
   */
  const addComToStageSlot = useMemoizedFn(
    (params: {
      parentId: string;
      newId: string;
      slotName: string;
      type: string;
      display: ComponentStructure['display'];
      position: SlotPosition;
    }) => {
      setNodesStructures((prev) => ({
        ...prev,
        [params.parentId]: {
          ...(prev?.[params.parentId] as ComponentStructure),
          slots: {
            ...prev?.[params.parentId].slots,
            [params.slotName]:
              params.position === 'before'
                ? [
                    params.newId,
                    ...(prev?.[params.parentId].slots?.[params.slotName] ?? []),
                  ]
                : [
                    ...(prev?.[params.parentId].slots?.[params.slotName] ?? []),
                    params.newId,
                  ],
          },
        },
        [params.newId]: {
          slotName: params.slotName,
          parentId: params.parentId,
          id: params.newId,
          type: params.type,
          slots: {},
          display: params.display,
        },
      }));
    },
  );

  /** 删除组件单独根据 comId */
  const deleteComModelByIds = useMemoizedFn((comIds: string[]) => {
    setRootIds((draft) => {
      comIds.forEach((comId) => {
        const index = draft.findIndex((item) => item === comId);
        if (index > -1) {
          draft.splice(index, 1);
        }
      });
    });

    setNodesStructures((draft) => {
      comIds.forEach((comId) => {
        const comModel = draft?.[comId];
        if (comModel) {
          const { parentId, slotName } = comModel;

          /** 从父级中删除自己 */
          const parent = draft?.[parentId];
          if (parent) {
            const targetSlots = parent.slots?.[slotName];
            const slotIndex = targetSlots.findIndex((item) => item === comId);
            targetSlots.splice(slotIndex, 1);
          }

          /** 删除所有子组件 */
          let allSlots: string[] = [];
          const collectAllSlotComIds = (id: string) => {
            const target = nodesStructures?.[id];
            if (!target) return;
            Object.keys(target.slots).forEach((slotName) => {
              const slotComIds = target.slots[slotName];
              allSlots = allSlots.concat(slotComIds);
              slotComIds.forEach((slotComId) =>
                collectAllSlotComIds(slotComId),
              );
            });
          };
          collectAllSlotComIds(comId);
          allSlots.forEach((slotComId) => {
            delete draft?.[slotComId];
          });

          /** 删除自身 */
          delete draft?.[comId];
        }
      });
    });
  });

  /** 删除组件 */
  const removeComFromTree = useMemoizedFn(
    (options: { comId: string; parentId: string; slotName: string }) => {
      const { comId, parentId, slotName } = options;

      /** 删除跟组件 */
      if (parentId === 'root') {
        setRootIds((prev) => {
          const index = prev.findIndex((item) => item === comId);
          prev.splice(index, 1);
          return [...prev];
        });
      }

      setNodesStructures((prev) => {
        /** 删除自己在父组件中的插槽 */
        const parent = prev?.[parentId];
        if (parent) {
          const targetSlots = parent.slots?.[slotName];
          const slotIndex = targetSlots.findIndex((item) => item === comId);
          targetSlots.splice(slotIndex, 1);
        }

        /** 删除所有子组件 */
        let allSlots: string[] = [];
        const collectAllSlotComIds = (id: string) => {
          const target = nodesStructures?.[id];
          if (!target) return;
          Object.keys(target.slots).forEach((slotName) => {
            const slotComIds = target.slots[slotName];
            allSlots = allSlots.concat(slotComIds);
            slotComIds.forEach((slotComId) => collectAllSlotComIds(slotComId));
          });
        };
        collectAllSlotComIds(comId);
        allSlots.forEach((slotComId) => {
          delete prev?.[slotComId];
          // removeComSettings(slotComId);
        });

        /** 删除自身 */
        delete prev?.[comId];
        // removeComSettings(comId);
      });
    },
  );

  /** 删除插槽 */
  const removeSlotFromTree = useMemoizedFn(
    (options: { comId: string; slotName: string; parentId: string }) => {
      const { comId, slotName } = options;

      /** 删除插槽下面的所有组件 */
      const slotComIds = nodesStructures?.[comId].slots[slotName];
      slotComIds?.forEach((slotComId) => {
        removeComFromTree({
          comId: slotComId,
          parentId: comId,
          slotName,
        });
      });

      setNodesStructures((prev) => {
        /** 删除插槽自身 */
        delete prev?.[comId].slots[slotName];

        return prev;
      });
    },
  );

  /**
   * 移动组件
   * 插槽是不能移动的
   */
  const moveComFromTree = useMemoizedFn(
    (options: {
      comId: string;
      parentId: string;
      slotName: string;
      targetIndex: number;
      targetComId: string;
      targetSlotName: string;
      targetParentId: string;
    }) => {
      const {
        comId,
        parentId,
        slotName,
        targetParentId,
        targetIndex,
        targetComId,
        targetSlotName,
      } = options;

      /** 移动的是跟组件，放置的目标是跟组件 */
      if (parentId === 'root' && targetSlotName === 'root') {
        setRootIds((prev) => {
          const index = prev.findIndex((item) => item === comId);

          if (index === targetIndex) {
            return prev;
          }

          console.log(targetIndex);
          prev.splice(index, 1);
          prev.splice(
            index < targetIndex ? targetIndex - 1 : targetIndex,
            0,
            comId,
          );
        });
        /** 移动的是插槽组件，放置目标也是插槽 */
      } else if (parentId !== 'root' && targetSlotName !== 'root') {
        setNodesStructures((prev) => {
          // 找到要移动的元素
          const node = prev?.[comId];

          if (node) {
            /**
             * 从原来位置删除
             * 只是从父组件插槽相应删除
             */
            const parentNode = prev?.[parentId];
            if (parentNode) {
              const index = parentNode.slots[slotName].findIndex(
                (slotComId) => slotComId === comId,
              );
              parentNode.slots[slotName].splice(index, 1);

              // 在新的组件指定插槽下的指定顺序放置
              const targetCom = prev?.[targetComId];

              if (targetCom) {
                /** 同一个插槽内移动 */
                if (targetComId === parentId) {
                  targetCom.slots[targetSlotName].splice(
                    index < targetIndex ? targetIndex - 1 : targetIndex,
                    0,
                    comId,
                  );
                } else {
                  /** 2个不同插槽移动 */
                  targetCom.slots[targetSlotName].splice(targetIndex, 0, comId);
                }
              }
            }
          }
        });

        /** 移动的是跟组件，放置的是插槽组件 */
      } else if (parentId === 'root' && targetSlotName !== 'root') {
        setRootIds((prev) => {
          const index = prev.findIndex((item) => item === comId);
          prev.splice(index, 1);
        });

        setNodesStructures((prev) => {
          // 在新的组件指定插槽下的指定顺序放置
          const targetParentNode = prev?.[targetComId];

          if (targetParentNode) {
            targetParentNode.slots[targetSlotName].splice(
              targetIndex,
              0,
              comId,
            );
          }
        });

        /** 移动是插槽组件，放置的是跟组件 */
      } else if (slotName !== 'root' && targetParentId === 'root') {
        setNodesStructures((prev) => {
          // 找到要移动的元素
          const node = prev?.[comId];

          if (node) {
            /**
             * 从原来位置删除
             * 只是从父组件插槽相应删除
             */
            const parentNode = prev?.[parentId];
            if (parentNode) {
              const index = parentNode.slots[slotName].findIndex(
                (slotComId) => slotComId === comId,
              );
              parentNode.slots[slotName].splice(index, 1);
            }
          }
        });

        setRootIds((prev) => {
          prev.splice(targetIndex, 0, comId);
        });
      }
    },
  );

  /** 获取数据，准备持久化 */
  const getData = useMemoizedFn(() => {
    return {
      rootNodeIds,
      stageComponentsModel: nodesStructures,
    };
  });

  const getSliceData = useMemoizedFn((comIds: string[]) => {
    /** 递归获取所有组件 */
    const getSliceStageComponentsModel = (
      ids?: string[],
    ): NodesStructures | undefined => {
      return ids?.reduce((acc, nextId) => {
        return {
          ...acc,
          [nextId]: nodesStructures?.[nextId],
          ...Object.keys(nodesStructures?.[nextId].slots ?? {}).reduce(
            (slotAcc, slotName) => {
              return {
                ...slotAcc,
                ...getSliceStageComponentsModel(
                  nodesStructures?.[nextId].slots[slotName],
                ),
              };
            },
            {},
          ),
        };
      }, {});
    };

    return {
      rootNodeIds: comIds,
      stageComponentsModel: getSliceStageComponentsModel(comIds),
    };
  });

  /** 初始化 */
  const initData = useMemoizedFn(
    (from?: { rootNodeIds: string[]; nodesStructures: NodesStructures }) => {
      initRootIds(from?.rootNodeIds ?? []);
      initNodesStructures(from?.nodesStructures);
    },
  );

  const resetData = useMemoizedFn(() => {
    initRootIds([]);
    initNodesStructures(undefined);
  });

  /**
   * 从舞台上删除指定组件，但是相关配置依旧保留
   * 用在删除并在物料中保存索引
   */
  const removeTargetComsAndSaveTheirSettings = useMemoizedFn(
    (comIds: string[]) => {
      const inRootIds: { index: number; id: string }[] = [];
      const notInRootIds: string[] = [];

      comIds.forEach((comId) => {
        const index = rootNodeIds.findIndex((item) => item === comId);
        if (index > -1) {
          inRootIds.push({
            id: comId,
            index,
          });
        } else {
          notInRootIds.push(comId);
        }
      });

      if (inRootIds.length) {
        setRootIds((draft) => {
          inRootIds.forEach((item) => {
            draft.splice(item.index, 1);
          });
        });
      }

      if (notInRootIds.length) {
        setNodesStructures((draft) => {
          notInRootIds.forEach((comId) => {
            if (draft?.[comId].parentId) {
              Object.keys(draft?.[draft?.[comId].parentId].slots).forEach(
                (slotName) => {
                  const slots =
                    draft?.[draft?.[comId].parentId].slots[slotName];
                  const index = slots.findIndex((item) => item === comId);
                  slots.splice(index, 1);
                },
              );
            }
          });
        });
      }
    },
  );

  /**
   * 设置 node 的 component 引用标记
   */
  const markNodeFromComponent = useMemoizedFn(
    (comId: number, nodeId: string) => {
      setNodesStructures((draft) => {
        if (draft) {
          draft[nodeId].fromComId = comId;
        }
      });
    },
  );

  return {
    nodesStructuresUpdateMode,
    getNodesStructuresUpdateMode,
    getRootIds,
    getRootIdsUpdateMode,
    resetData,
    rootIdsUpdateMode,
    rootNodeIds,
    nodesStructures,
    markNodeFromComponent,
    getNodesStructures,
    deleteComModelByIds,
    getSliceData,
    removeTargetComsAndSaveTheirSettings,
    addComponentToStage,
    getData,
    initData,
    addComToStageSlot,
    removeComFromTree,
    removeSlotFromTree,
    moveComFromTree,
  };
};

export default useStageComponentsModel;
