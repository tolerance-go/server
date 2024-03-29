import ComEventCUForm from '@/pages/design/components/ComEventCUForm';
import ComEventViewForm from '@/pages/design/components/ComEventViewForm';
import { FormItemExtendLabel } from '@/pages/design/components/FormItemExtendLabel';
import { useSelectedComActiveStatExtendRelation } from '@/pages/design/hooks/selected/useSelectedComActiveStatExtendRelation';
import { useSelectedNode } from '@/pages/design/hooks/selected/useSelectedNode';
import { ComponentEvent } from '@/pages/design/models/nodesEvents';
import { isExtendReactionView } from '@/pages/design/utils/isExtendReactionView';
import { DeleteOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import './index.less';

export default () => {
  const { stageSelectNodeId } = useModel('design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const { activeNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  const { nodesEvents, deleteComStatEvent } = useModel(
    'design.page.nodesEvents',
    (model) => ({
      nodesEvents: model.nodesEvents,
      deleteComStatEvent: model.deleteComStatEvent,
    }),
  );

  const actions =
    stageSelectNodeId && activeNodeStatId
      ? nodesEvents[stageSelectNodeId]?.[activeNodeStatId]
      : undefined;

  const { triggerPrepareSaveTimeChange } = useModel(
    'design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { extendRelation } = useSelectedComActiveStatExtendRelation();

  const { lockComExtendEventField, unlockComExtendEventField } = useModel(
    'design.page.nodesStatusRelations',
    (model) => ({
      lockComExtendEventField: model.lockComExtendEventField,
      unlockComExtendEventField: model.unlockComExtendEventField,
    }),
  );

  const { stageSelectNode } = useSelectedNode();

  if (!stageSelectNode) {
    return null;
  }

  return (
    <ProList<ComponentEvent>
      style={{
        marginTop: 10,
      }}
      split
      className="actions-list"
      rowKey="id"
      dataSource={Object.keys(actions ?? {}).map((actionId) => {
        const action = actions![actionId];
        return action;
      })}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'name',
          render: (dom, entity) => {
            if (!extendRelation) {
              return dom;
            }

            return (
              <FormItemExtendLabel
                label={entity.name}
                fieldName={entity.name}
                lockFields={extendRelation.eventUnsyncFields}
                onUnLockClick={() => {
                  unlockComExtendEventField(
                    stageSelectNode.id,
                    extendRelation.id,
                    entity.name,
                  );
                  triggerPrepareSaveTimeChange();
                }}
                onLockClick={() => {
                  lockComExtendEventField(
                    stageSelectNode.id,
                    extendRelation.id,
                    entity.name,
                  );
                  triggerPrepareSaveTimeChange();
                }}
              ></FormItemExtendLabel>
            );
          },
        },
        subTitle: {
          dataIndex: 'typeZh',
        },
        actions: {
          render: (dom, item) => {
            return [
              isExtendReactionView(
                extendRelation?.toId,
                extendRelation?.eventUnsyncFields,
                activeNodeStatId,
                item.name,
              ) ? (
                <ComEventViewForm
                  extendRelation={extendRelation}
                  eventItem={item}
                  key="edit"
                />
              ) : (
                <ComEventCUForm
                  extendRelation={extendRelation}
                  eventItem={item}
                  mode="edit"
                  key="edit"
                ></ComEventCUForm>
              ),
              <a
                key="remove"
                onClick={() => {
                  if (stageSelectNodeId && activeNodeStatId) {
                    deleteComStatEvent(
                      stageSelectNodeId,
                      activeNodeStatId,
                      item.id,
                    );
                    triggerPrepareSaveTimeChange();
                  }
                }}
                style={{
                  color: 'red',
                }}
              >
                <DeleteOutlined />
              </a>,
            ];
          },
        },
      }}
    />
  );
};
