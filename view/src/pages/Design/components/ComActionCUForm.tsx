import { ConfigurableForm } from '@/pages/Design/components/ConfigurableForm';
import { useComStatusExtendActions } from '@/pages/Design/hooks/relations/useComStatusExtendActions';
import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { EditOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormDependency,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { useMemo, useRef } from 'react';
import { NodeAction } from '../models/page/nodesActions';
import { ComStatRelation } from '../models/page/statusConnectRelations';

/** 组件的动作编辑和创建表单 */
export default ({
  mode,
  actionItem,
  extendRelation,
}: {
  mode: 'edit' | 'create';
  actionItem?: NodeAction;
  extendRelation?: ComStatRelation;
}) => {
  const { nodesActionsConfigs } = useModel(
    'Design.config.nodesActionsConfigs',
    (model) => ({ nodesActionsConfigs: model.nodesActionsConfigs }),
  );

  const { stageSelectNode } = useSelectedNode();

  const selectedComsActionsConfigs = stageSelectNode?.type
    ? nodesActionsConfigs[stageSelectNode.type]
    : undefined;

  // const [form] = Form.useForm();
  const formRef = useRef<ProFormInstance>();

  const { createComStatAction, nodesActions } = useModel(
    'Design.page.nodesActions',
    (model) => ({
      createComStatAction: model.createComStatAction,
      nodesActions: model.nodesActions,
    }),
  );

  const { getStageSelectNodeId, stageSelectNodeId } = useModel(
    'Design.stage.stageSelectNodeId',
    (model) => ({
      getStageSelectNodeId: model.getStageSelectNodeId,
      stageSelectNodeId: model.stageSelectNodeId,
    }),
  );

  const { getSelectedComponentStatusId, activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      getSelectedComponentStatusId: model.getActiveNodeStatId,
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  const { triggerPrepareSaveTimeChange } = useModel(
    'Design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { setCurrentComActionsExtendsActions } = useComStatusExtendActions();

  const disabled =
    actionItem && extendRelation
      ? !extendRelation?.actionUnsyncFields[actionItem.name]
      : false;

  const renderTrigger = () => {
    return mode === 'create' ? (
      <Button disabled={disabled} block>
        添加动作
      </Button>
    ) : (
      <a
        style={{
          color: disabled ? '#aaa' : undefined,
        }}
      >
        <EditOutlined />
      </a>
    );
  };

  const actionData = useMemo(() => {
    if (
      mode === 'edit' &&
      stageSelectNodeId &&
      activeNodeStatId &&
      actionItem?.id
    ) {
      return nodesActions[stageSelectNodeId][activeNodeStatId][actionItem?.id];
    }
    return undefined;
  }, [mode, nodesActions, actionItem?.id, stageSelectNodeId, activeNodeStatId]);

  if (disabled) {
    return renderTrigger();
  }

  return (
    <ModalForm
      formRef={formRef}
      initialValues={{
        type: {
          value: actionData?.type,
          label: actionData?.typeZh,
        },
        name: actionData?.name,
        settings: actionData?.settings,
      }}
      modalProps={{
        destroyOnClose: mode === 'edit',
      }}
      title={mode === 'create' ? '新建动作' : '编辑动作'}
      trigger={renderTrigger()}
      width={800}
      submitTimeout={2000}
      autoFocusFirstInput
      onFinish={async ({ type, name, settings }) => {
        const selectedComId = getStageSelectNodeId();
        const selectedComStatId = getSelectedComponentStatusId();
        if (selectedComId && selectedComStatId) {
          const actionData = {
            type: type.value,
            name,
            settings,
            typeZh: type.label,
          };

          if (mode === 'create') {
            createComStatAction(selectedComId, selectedComStatId, actionData);
          } else {
            if (actionItem?.id) {
              setCurrentComActionsExtendsActions({
                /** 这里用 actionItem.name 作为 key，值为旧值 */
                [actionItem.name]: {
                  id: actionItem?.id,
                  ...actionData,
                },
              });
            }
          }

          triggerPrepareSaveTimeChange();
        }
        return true;
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
          },
        ]}
        name="name"
        label="动作名称"
        placeholder="请输入"
        disabled={!!extendRelation}
      />
      <ProFormSelect
        rules={[
          {
            required: true,
          },
        ]}
        name="type"
        label="动作类型"
        placeholder="请选择"
        options={selectedComsActionsConfigs?.map((item) => ({
          label: item.name,
          value: item.type,
        }))}
        fieldProps={{
          labelInValue: true,
        }}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          const config = selectedComsActionsConfigs?.find(
            (item) => item.type === type?.value,
          );
          return (
            <ConfigurableForm
              onlyFormItem
              formItemNamePrefix="settings"
              configs={config?.settingsConfigs}
            />
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
