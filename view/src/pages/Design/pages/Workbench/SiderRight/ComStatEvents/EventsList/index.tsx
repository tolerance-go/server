import ComEventCUForm from '@/pages/Design/components/ComEventCUForm';
import ComEventViewForm from '@/pages/Design/components/ComEventViewForm';
import { FormItemExtendLabel } from '@/pages/Design/components/FormItemExtendLabel';
import { useSelectedComActiveStatExtendRelation } from '@/pages/Design/hooks/selected/useSelectedComActiveStatExtendRelation';
import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { ComponentEvent } from '@/pages/Design/models/comsEvents';
import { isExtendReactionView } from '@/pages/Design/utils/isExtendReactionView';
import { DeleteOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import './index.less';

export default () => {
  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const { selectedComponentStatusId } = useModel(
    'Design.stage.selectedComponentStatusId',
    (model) => ({
      selectedComponentStatusId: model.selectedComponentStatusId,
    }),
  );

  const { comsEvents, deleteComStatEvent } = useModel(
    'Design.page.comsEvents',
    (model) => ({
      comsEvents: model.comsEvents,
      deleteComStatEvent: model.deleteComStatEvent,
    }),
  );

  const actions =
    stageSelectNodeId && selectedComponentStatusId
      ? comsEvents[stageSelectNodeId]?.[selectedComponentStatusId]
      : undefined;

  const { triggerPrepareSaveTimeChange } = useModel(
    'Design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { extendRelation } = useSelectedComActiveStatExtendRelation();

  const { lockComExtendEventField, unlockComExtendEventField } = useModel(
    'Design.page.statusConnectRelations',
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
                selectedComponentStatusId,
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
                  if (stageSelectNodeId && selectedComponentStatusId) {
                    deleteComStatEvent(
                      stageSelectNodeId,
                      selectedComponentStatusId,
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