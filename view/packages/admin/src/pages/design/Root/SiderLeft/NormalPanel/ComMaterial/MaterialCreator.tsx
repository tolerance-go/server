import { getAppIdOrThrow } from '@/pages/design/helps/getAppIdOrThrow';
import { getPageIdOrThrow } from '@/pages/design/helps/getPageIdOrThrow';
import { useGetSliceStageData } from '@/pages/design/hooks/initials/useGetSliceStageData';
import { ComponentControllerCreate } from '@fenxing/common/services/server/ComponentController';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormDependency,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';

type FormValues = {
  name: string;
  nodeId?: string;
  desc?: string;
  isLink?: boolean;
};

export default () => {
  const { addComMaterial } = useModel('design.component.componentList', (model) => ({
    addComMaterial: model.addComMaterial,
  }));

  const { triggerPrepareSaveTimeChange } = useModel(
    'design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { getSliceStageData } = useGetSliceStageData();

  const { markNodeFromComponent } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({
      markNodeFromComponent: model.markNodeFromComponent,
    }),
  );

  const { runAsync: requestCreateComponentAsync } = useRequestReadyOnAuth(
    async (values: FormValues) => {
      const { name, desc, nodeId, isLink } = values;

      const pageId = getPageIdOrThrow();
      const appId = getAppIdOrThrow();

      const params = (() => {
        const draft: Parameters<typeof ComponentControllerCreate>[0] = {
          app_id: appId,
          name,
          desc,
        };
        if (nodeId) {
          const stageData = getSliceStageData([nodeId]);
          draft.stage_data = JSON.stringify(stageData);

          if (isLink) {
            draft.usedInPageIds = [Number(pageId)];
          }
        }
        return draft;
      })();

      return ComponentControllerCreate(params);
    },
    {
      manual: true,
    },
  );

  return (
    <ModalForm<FormValues>
      title="新建组件"
      trigger={<PlusOutlined />}
      autoFocusFirstInput
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          const data = await requestCreateComponentAsync(values);
          addComMaterial(data);
          if (values.nodeId) {
            markNodeFromComponent(data.id, values.nodeId);
            triggerPrepareSaveTimeChange();
          }

          return true;
        } catch (error) {
          return false;
        }
      }}
    >
      <ProFormText
        rules={[
          {
            required: true,
          },
        ]}
        name="name"
        label="名称"
        placeholder="请输入名称"
      />
      <ProFormText
        name="nodeId"
        label="从舞台组件复制"
        placeholder="请输入 ID"
      />
      <ProFormDependency name={['nodeId']}>
        {(values) => {
          return values.nodeId ? (
            <ProFormSwitch name="isLink" label="是否关联" />
          ) : null;
        }}
      </ProFormDependency>
      <ProFormTextArea name="desc" label="描述" placeholder="请输入描述" />
    </ModalForm>
  );
};
