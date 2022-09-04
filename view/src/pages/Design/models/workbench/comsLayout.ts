import { isSlotGroupId, joinSlotGroupId } from '@/pages/Design/helps';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { TreeDataNode } from 'antd';
import utl from 'lodash';
import { useState } from 'react';
import { splitSlotGroupId } from '@/pages/Design/helps';

export type SelfTreeDataNode = TreeDataNode & {
  data: {
    type: string;
    parentId: string;
    slotName: string;
    comId: string;
  };
};

const useComsLayout = () => {
  const [expanedKeys, setExpanedKeys] = useState<React.Key[]>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>();
  const [selectedNodes, setSelectedNodes] = useState<SelfTreeDataNode[]>();
  /** 是否展示全部插槽 */
  const [showAllSlots, setShowAllSlots] = useState<boolean>(false);

  const { getNodesStructures } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    (model) => {
      return {
        getNodesStructures: model?.getNodesStructures,
      };
    },
  );

  /** 层级打开指定的菜单 */
  const openTargetFromTreeMenu = useMemoizedFn((targetId: string) => {
    const stageComponentsModel = getNodesStructures();

    const findAllParentsId = (comId: string, dist: string[] = []) => {
      if (
        comId === 'root' ||
        stageComponentsModel?.[comId]?.parentId === 'root'
      )
        return dist;
      const parentId = stageComponentsModel?.[comId]?.parentId;

      if (parentId) {
        const slotName = stageComponentsModel?.[comId].slotName;
        if (slotName) {
          dist.push(joinSlotGroupId(parentId, slotName));
        }

        dist.push(parentId);

        findAllParentsId(parentId, dist);
      }
      return dist;
    };

    const isSlotGroupIdResult = isSlotGroupId(targetId);

    const getComId = () => {
      if (isSlotGroupIdResult) {
        return splitSlotGroupId(targetId).comId;
      }
      return targetId;
    };

    const comId = getComId();

    setExpanedKeys((prev) =>
      utl.union(
        (prev ?? [])
          .concat(findAllParentsId(comId))
          .concat(isSlotGroupIdResult ? comId : []),
      ),
    );
  });

  return {
    showAllSlots,
    selectedKeys,
    expanedKeys,
    selectedNodes,
    setShowAllSlots,
    setSelectedNodes,
    setSelectedKeys,
    setExpanedKeys,
    openTargetFromTreeMenu,
  };
};

export default useComsLayout;
