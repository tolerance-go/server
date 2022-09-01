import { SiderContentTopper } from '@/pages/Design/components/SiderContentTopper';
import { makeTreeWithRelation } from '@/pages/Design/utils/treeUtils/makeTreeWithRelation';
import { mapTree } from '@/pages/Design/utils/treeUtils/mapTree';
import { useModel } from '@umijs/max';
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { useMemo } from 'react';
import MaterialCreator from './MaterialCreator';
import { TreeItem } from './TreeItem';

type TreeNode = DataNode & {
  parentStatId?: string;
  relationId?: string;
};

export default () => {
  const {
    comsMaterials,
    comsMaterialListLoading,
    comsMaterialMap,
    removeComMaterial,
  } = useModel('Design.component.componentList', (model) => ({
    comsMaterials: model.comsMaterialList,
    comsMaterialListLoading: model.comsMaterialListLoading,
    removeComMaterial: model.removeComMaterial,
    comsMaterialMap: model.comsMaterialMap,
  }));

  const { materialInheritConnectionMap } = useModel(
    'Design.component.componentInheritRelation',
    (model) => ({
      materialInheritConnectionMap: model.materialInheritConnectionMap,
    }),
  );

  const { setComActiveMaterialId, comActiveMaterialId } = useModel(
    'Design.component.activeId',
    (model) => {
      return {
        setComActiveMaterialId: model.setComActiveMaterialId,
        comActiveMaterialId: model.comActiveMaterialId,
      };
    },
  );

  const treeData = useMemo(() => {
    return mapTree(
      makeTreeWithRelation(comsMaterialMap, materialInheritConnectionMap),
      (item) => {
        return {
          key: item.id,
          title: <TreeItem record={item}></TreeItem>,
          parentStatId: item.parentId,
          relationId: item.relationId,
        } as TreeNode;
      },
    );
  }, [comsMaterialMap, materialInheritConnectionMap]);

  return (
    <div>
      <SiderContentTopper
        title="暂存组件"
        renderCreator={() => <MaterialCreator />}
      ></SiderContentTopper>
      <Tree<TreeNode>
        showLine={{
          showLeafIcon: false,
        }}
        blockNode
        selectable
        selectedKeys={comActiveMaterialId ? [comActiveMaterialId] : undefined}
        treeData={treeData}
        onSelect={(selectedKeys) => {
          if (selectedKeys[0]) {
            setComActiveMaterialId(Number(selectedKeys[0]));
          }
        }}
      />
    </div>
  );
};
