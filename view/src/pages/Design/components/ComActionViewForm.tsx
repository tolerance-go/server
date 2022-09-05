import { ConfigurableForm } from '@/pages/Design/components/ConfigurableForm';
import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { NodeAction } from '@/pages/Design/models/page/nodesActions';
import { ComStatRelation } from '@/pages/Design/models/page/statusConnectRelations';
import { EyeOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormDependency,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMemo, useRef } from 'react';

/** 组件的动作编辑和创建表单 */
export default ({
  actionItem,
  extendRelation,
}: {
  actionItem?: NodeAction;
  extendRelation?: ComStatRelation;
}) => {
  const { comsActionsConfigs } = useModel('Design.config.comsActionsConfigs', (model) => ({
    comsActionsConfigs: model.comsActionsConfigs,
  }));

  const { stageSelectNode } = useSelectedNode();

  const selectedComsActionsConfigs = stageSelectNode?.type
    ? comsActionsConfigs[stageSelectNode.type]
    : undefined;

  // const [form] = Form.useForm();
  const formRef = useRef<ProFormInstance>();

  const { nodesActions } = useModel('Design.page.nodesActions', (model) => ({
    nodesActions: model.nodesActions,
  }));

  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model.stageSelectNodeId,
  }));

  const { activeNodeStatId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  const actionData = useMemo(() => {
    if (stageSelectNodeId && activeNodeStatId && actionItem?.id) {
      return nodesActions[stageSelectNodeId][activeNodeStatId][
        actionItem?.id
      ];
    }
    return undefined;
  }, [
    nodesActions,
    actionItem?.id,
    stageSelectNodeId,
    activeNodeStatId,
  ]);

  return (
    <ModalForm
      // form={form}
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
        destroyOnClose: true,
      }}
      title={'查看动作'}
      trigger={
        <a>
          <EyeOutlined />
        </a>
      }
      width={800}
      submitTimeout={2000}
      autoFocusFirstInput
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
        readonly
      />
      <ProFormSelect
        rules={[
          {
            required: true,
          },
        ]}
        name="type"
        label="动作类型"
        readonly
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
