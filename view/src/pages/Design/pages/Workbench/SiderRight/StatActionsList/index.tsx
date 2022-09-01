import ComActionCUForm from '@/pages/Design/components/ComActionCUForm';
import ComActionViewForm from '@/pages/Design/components/ComActionViewForm';
import { FormItemExtendLabel } from '@/pages/Design/components/FormItemExtendLabel';
import { useSelectedComActiveStatExtendRelation } from '@/pages/Design/hooks/selected/useSelectedComActiveStatExtendRelation';
import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { ComponentAction } from '@/pages/Design/models/page/comsActions';
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

  const { comsActions, deleteComStatAction } = useModel(
    'Design.page.comsActions',
    (model) => ({
      comsActions: model.comsActions,
      deleteComStatAction: model.deleteComStatAction,
    }),
  );

  const actions =
    stageSelectNodeId && selectedComponentStatusId
      ? comsActions[stageSelectNodeId]?.[selectedComponentStatusId]
      : undefined;

  const { triggerPrepareSaveTimeChange } = useModel(
    'Design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { stageSelectNode } = useSelectedNode();

  const { lockComExtendActionField, unlockComExtendActionField } = useModel(
    'Design.page.statusConnectRelations',
    (model) => ({
      lockComExtendActionField: model.lockComExtendActionField,
      unlockComExtendActionField: model.unlockComExtendActionField,
    }),
  );

  const { extendRelation } = useSelectedComActiveStatExtendRelation();

  if (!stageSelectNode) {
    return null;
  }

  return (
    <ProList<ComponentAction>
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
                lockFields={extendRelation?.actionUnsyncFields}
                onUnLockClick={() => {
                  unlockComExtendActionField(
                    stageSelectNode.id,
                    extendRelation.id,
                    entity.name,
                  );
                  triggerPrepareSaveTimeChange();
                }}
                onLockClick={() => {
                  lockComExtendActionField(
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
                extendRelation?.actionUnsyncFields,
                selectedComponentStatusId,
                item.name,
              ) ? (
                <ComActionViewForm
                  extendRelation={extendRelation}
                  actionItem={item}
                  key="edit"
                />
              ) : (
                <ComActionCUForm
                  extendRelation={extendRelation}
                  actionItem={item}
                  mode="edit"
                  key="edit"
                ></ComActionCUForm>
              ),
              <a
                key="remove"
                onClick={() => {
                  if (stageSelectNodeId && selectedComponentStatusId) {
                    deleteComStatAction(
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
