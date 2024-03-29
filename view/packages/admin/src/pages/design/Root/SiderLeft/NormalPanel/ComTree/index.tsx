import { isSlotGroupId, joinSlotGroupId } from '@/pages/design/helps';
import { SelfTreeDataNode } from '@/pages/design/models/comsLayout';
import { useModel } from '@umijs/max';
import { Col, Row, Tag, Tree, TreeProps } from 'antd';
import utl from 'lodash';
import { useEffect, useMemo } from 'react';
import TreeActions from './TreeActions';
import TreeItemMenu from './TreeItemMenu';

export default () => {
  const { stageComponentsModel, rootNodeIds, moveComFromTree } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({
      stageComponentsModel: model?.nodesStructures,
      rootNodeIds: model?.rootNodeIds,
      moveComFromTree: model?.moveComFromTree,
    }),
  );

  const {
    expanedKeys,
    selectedKeys,
    setSelectedNodes,
    setExpanedKeys,
    setSelectedKeys,
    showAllSlots,
  } = useModel('design.workbench.comsLayout', (model) => ({
    expanedKeys: model?.expanedKeys,
    setExpanedKeys: model?.setExpanedKeys,
    selectedKeys: model?.selectedKeys,
    setSelectedKeys: model?.setSelectedKeys,
    selectedNodes: model?.selectedNodes,
    setSelectedNodes: model?.setSelectedNodes,
    showAllSlots: model.showAllSlots,
  }));

  const { nodesSlotsNames } = useModel('design.config.nodesSlotsNames', (model) => ({
    nodesSlotsNames: model.nodesSlotsNames,
  }));

  const { setHoverNodeId } = useModel('design.stage.hoverNodeId', (model) => ({
    setHoverNodeId: model?.setHoverNodeId,
  }));

  const { setStageSelectNodeId } = useModel('design.stage.stageSelectNodeId', (model) => ({
    setStageSelectNodeId: model?.setStageSelectNodeId,
  }));

  const { setStageSelectSlotGroupId } = useModel(
    'design.stage.stageSelectSlotGroupId',
    (model) => ({
      setStageSelectSlotGroupId: model?.setStageSelectSlotGroupId,
    }),
  );

  const { triggerSaveTimeChange } = useModel('design.app.stageAutoSave', (model) => {
    return {
      triggerSaveTimeChange: model?.triggerPrepareSaveTimeChange,
    };
  });

  const treeData = useMemo(() => {
    const getTree = (
      ids: string[],
      parentId: string,
      slotName: string,
    ): SelfTreeDataNode[] => {
      return ids.map((id) => {
        const model = stageComponentsModel?.[id];
        if (!model) {
          throw new Error('model id is unknow');
        }
        return {
          title: (
            <TreeItemMenu
              comId={id}
              parentId={parentId}
              slotName={slotName}
              type="component"
            >
              <div>{model?.type}</div>
            </TreeItemMenu>
          ),
          key: model?.id,
          data: {
            type: 'component',
            parentId,
            slotName,
            comId: model?.id,
          },
          children: Object.keys(model?.slots ?? {})
            .map((item) => ({
              type: 'exist',
              name: item,
            }))
            .concat(
              (showAllSlots
                ? utl.difference(
                    nodesSlotsNames[model.type],
                    Object.keys(model?.slots ?? {}),
                  )
                : []
              ).map((name) => ({
                type: 'shadow',
                name,
              })),
            )
            .map((item) => {
              const slotName = item.name;
              const slotIds = model?.slots[slotName] ?? [];
              const slotGroupId = joinSlotGroupId(model?.id, slotName);
              return {
                title: (
                  <TreeItemMenu
                    comId={id}
                    parentId={parentId}
                    slotName={slotName}
                    type="slots"
                  >
                    <Tag
                      style={{
                        border:
                          item.type === 'shadow'
                            ? '1px dashed #d9d9d9'
                            : undefined,
                        color: item.type === 'shadow' ? '#bbb' : undefined,
                      }}
                    >
                      {slotName}
                    </Tag>
                  </TreeItemMenu>
                ),
                /** 插槽层的 key 是父节 id 和插槽拼接 */
                key: slotGroupId,
                children: getTree(slotIds, id, slotName),
                data: {
                  type: 'slots',
                  /**
                   * 插槽的 comId 是所在组件的 id
                   * parentId 是指所在组件的父 id
                   */
                  parentId,
                  slotName,
                  comId: model?.id,
                },
              };
            }),
        };
      });
    };
    return getTree(rootNodeIds, 'root', 'root');
  }, [stageComponentsModel, showAllSlots, rootNodeIds]);

  const handleDrop: TreeProps<SelfTreeDataNode>['onDrop'] = (info) => {
    if (!info.dropToGap) {
      window.__consola.info('action:', 'droped', '添加到插槽顶部', info);

      /** 此时的 node 插槽 */
      moveComFromTree({
        comId: info.dragNode.key as string,
        parentId: info.dragNode.data.parentId,
        slotName: info.dragNode.data.slotName,
        targetIndex: 0,
        targetComId: info.node.data.comId,
        targetSlotName: info.node.data.slotName,
        targetParentId: info.node.data.parentId,
      });
    } else {
      window.__consola.info('action:', 'droped', '添加到插槽间隔中', info);

      /** 此时的 node 是组件，而不是插槽 */
      moveComFromTree({
        comId: info.dragNode.key as string,
        parentId: info.dragNode.data.parentId,
        slotName: info.dragNode.data.slotName,
        targetIndex: info.dropPosition,
        targetComId: info.node.data.parentId,
        targetSlotName: info.node.data.slotName,
        targetParentId: info.node.data.parentId,
      });
    }

    triggerSaveTimeChange();
  };

  /** 当组件选中 keys 变化，触发舞台选中节点状态变化 */
  useEffect(() => {
    if (selectedKeys?.length) {
      const key = String(selectedKeys[0]);
      if (isSlotGroupId(key)) {
        setStageSelectSlotGroupId(key);
      } else {
        setStageSelectNodeId(key);
      }
    }
  }, [selectedKeys]);

  window.__consola.info('debug:', 'tree render expanedKeys', expanedKeys);

  return (
    <Row
      style={{
        flexDirection: 'column',
        height: '100%',
        alignItems: 'stretch',
      }}
      wrap={false}
    >
      <Col flex={'none'}>
        <TreeActions />
      </Col>
      <Col
        flex={'auto'}
        style={{
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <Tree<SelfTreeDataNode>
          expandedKeys={expanedKeys}
          draggable={(node) => {
            const nodeData = node as unknown as SelfTreeDataNode;
            window.__consola.info('filter:', 'draggable', nodeData);

            return nodeData.data.type === 'component';
          }}
          allowDrop={(info) => {
            window.__consola.info('filter:', 'allowDrop', info);
            return (
              /** 插槽子级 */
              (info.dropNode.data.type === 'slots' &&
                info.dropPosition === 0) ||
              /** 组件同级 */
              (info.dropNode.data.type === 'component' &&
                info.dropPosition === 1)
            );
          }}
          blockNode
          selectable
          selectedKeys={selectedKeys}
          treeData={treeData}
          onExpand={(keys) => {
            window.__consola.info('action:', '展开指定节点', keys);

            setExpanedKeys(keys);
          }}
          onMouseEnter={(info) => {
            setHoverNodeId(info.node.key as string);
          }}
          onMouseLeave={() => {
            setHoverNodeId(undefined);
          }}
          onSelect={(selectedKeys, info) => {
            setSelectedKeys(selectedKeys);
            setSelectedNodes(info.selectedNodes);
          }}
          onDrop={handleDrop}
        />
      </Col>
    </Row>
  );
};
