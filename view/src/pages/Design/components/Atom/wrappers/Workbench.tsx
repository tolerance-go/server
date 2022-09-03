import { ComponentStructure } from '@/pages/Design/models/page/nodesStructures';
import { useModel } from '@umijs/max';
import { Dropdown, Menu } from 'antd';
import clsx from 'clsx';
import consola from 'consola';
import React from 'react';
import styles from './Workbench.less';
import { LinkageComponentCreator } from './Workbench/LinkageComponentCreator';

/**
 * 舞台节点的包装组件
 * 所有舞台组件都会包裹一层该组件
 * 他会响应用户设计阶段的选择事件进行操作，选中并且进行设置
 */
export const AtomWorkbenchWrapper = (
  props: React.PropsWithChildren<
    ComponentStructure & {
      /** 事件交互中，处于状态改变时 */
      usedStat: boolean;
    }
  >,
) => {
  const { setStageSelectNodeId, stageSelectNodeId } = useModel(
    'Design.stage.stageSelectNodeId',
    (model) => ({
      setStageSelectNodeId: model?.setStageSelectNodeId,
      stageSelectNodeId: model?.stageSelectNodeId,
    }),
  );
  const { hoverNodeId, setHoverNodeId } = useModel(
    'Design.stage.hoverNodeId',
    (model) => ({
      hoverNodeId: model?.hoverNodeId,
      setHoverNodeId: model?.setHoverNodeId,
    }),
  );

  return (
    <Dropdown
      trigger={['contextMenu']}
      overlay={
        <Menu
          items={[
            {
              label: (
                <LinkageComponentCreator nodeId={props.id} type={props.type} />
              ),
              key: 'createComponent',
            },
          ]}
        ></Menu>
      }
    >
      <div
        className={clsx(styles.wrap, {
          [styles.selected]: stageSelectNodeId === props.id,
          [styles.hover]: hoverNodeId === props.id,
          [styles.warn]: props.usedStat,
        })}
        style={{
          padding: 8,
          display: props.display,
        }}
        onMouseEnter={(event) => {
          event.stopPropagation();
          if (props.id !== hoverNodeId) {
            consola.info('hover', '进入组件', props.id);
            setHoverNodeId(props.id);
          }
        }}
        onMouseOver={(event) => {
          event.stopPropagation();
          if (props.id !== hoverNodeId) {
            consola.info('hover', '悬停组件', props.id);
            setHoverNodeId(props.id);
          }
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          if (props.id === hoverNodeId) {
            consola.info('hover', '离开组件', props.id);
            setHoverNodeId(undefined);
          }
        }}
        onClick={(event) => {
          consola.info('atom 被点击', props);

          consola.success('选中组件', props.id);
          setStageSelectNodeId(props.id);

          /** 防止多层级的 Atom */
          event.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </Dropdown>
  );
};
