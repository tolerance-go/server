import { ConfigurableForm } from '@/pages/Design/components/ConfigurableForm';
import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { ComponentEvent } from '@/pages/Design/models/nodesEvents';
import { ComStatRelation } from '@/pages/Design/models/statusRelations';
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
  eventItem,
  extendRelation,
}: {
  eventItem?: ComponentEvent;
  extendRelation?: ComStatRelation;
}) => {
  const { nodesEventsConfigs } = useModel('Design.config.nodesEventsConfigs', (model) => ({
    nodesEventsConfigs: model.nodesEventsConfigs,
  }));

  const { stageSelectNode } = useSelectedNode();

  const selectedComsEventsConfigs = stageSelectNode?.type
    ? nodesEventsConfigs[stageSelectNode.type]
    : undefined;

  // const [form] = Form.useForm();
  const formRef = useRef<ProFormInstance>();

  const { getComStatActions } = useModel('Design.page.nodesActions', (model) => ({
    getComStatActions: model.getComStatActions,
  }));

  const { nodesEvents } = useModel('Design.page.nodesEvents', (model) => ({
    nodesEvents: model.nodesEvents,
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

  const { getComStatus } = useModel('Design.page.nodesStatus', (model) => ({
    getComStatus: model.getComStatus,
  }));

  const eventData = useMemo(() => {
    if (stageSelectNodeId && activeNodeStatId && eventItem?.id) {
      return nodesEvents[stageSelectNodeId][activeNodeStatId][
        eventItem.id
      ];
    }
    return undefined;
  }, [nodesEvents, eventItem?.id, stageSelectNodeId, activeNodeStatId]);

  return (
    <ModalForm
      // form={form}
      formRef={formRef}
      initialValues={{
        type: {
          value: eventData?.type,
          label: eventData?.typeZh,
        },
        name: eventData?.name,
        execComId: eventData?.execComId,
        execComStatId: eventData?.execComStatId,
        execComStatActionId: eventData?.execComStatActionId,
        settings: eventData?.settings,
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      title={'查看事件'}
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
        label="事件名称"
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
        label="事件类型"
        placeholder="请选择"
        options={selectedComsEventsConfigs?.map((item) => ({
          label: item.name,
          value: item.type,
        }))}
        fieldProps={{
          labelInValue: true,
        }}
        readonly
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          const config = selectedComsEventsConfigs?.find(
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
      <ProFormText
        rules={[
          {
            required: true,
          },
        ]}
        name="execComId"
        label="执行组件"
        placeholder="请输入"
        readonly
      />

      <ProFormDependency name={['execComId']}>
        {({ execComId }) => {
          const comStatus = getComStatus(execComId);
          return (
            <ProFormSelect
              disabled={!execComId}
              rules={[
                {
                  required: true,
                },
              ]}
              name="execComStatId"
              label="执行状态"
              placeholder="请输入"
              options={Object.keys(comStatus ?? {})?.map((statId) => {
                const stat = comStatus[statId];
                return {
                  label: stat.name,
                  value: stat.id,
                };
              })}
            />
          );
        }}
      </ProFormDependency>

      <ProFormDependency name={['execComId', 'execComStatId']}>
        {({ execComId, execComStatId }) => {
          const actions = getComStatActions(execComId, execComStatId);
          return (
            <ProFormSelect
              disabled={!execComId || !execComStatId}
              rules={[
                {
                  required: true,
                },
              ]}
              name="execComStatActionId"
              label="执行动作"
              placeholder="请输入"
              options={Object.keys(actions ?? {})?.map((eventId) => {
                const action = actions[eventId];
                return {
                  label: action.name,
                  value: action.id,
                };
              })}
            />
          );
        }}
      </ProFormDependency>

      <ProFormText
        disabled
        name="1111"
        label="触发条件(待实现)"
        placeholder="请输入"
        readonly
      />
      <ProFormText
        disabled
        name="2222"
        label="执行条件(待实现)"
        placeholder="请输入"
        readonly
      />
    </ModalForm>
  );
};
