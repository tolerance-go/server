import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProFormInstance,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { nanoid } from 'nanoid';
import React, { useImperativeHandle, useRef, useState } from 'react';

export type CreateComStatusAPI = {
  open: () => void;
};

export default React.forwardRef<CreateComStatusAPI>((props, ref) => {
  const formRef = useRef<ProFormInstance>();

  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  const { selectedNodeId } = useModel(
    'design.stage.stageSelectNodeId',
    (model) => ({
      selectedNodeId: model.stageSelectNodeId,
    }),
  );

  const { createStat } = useModel('design.page.nodesStatus', (model) => ({
    createStat: model.createSelectedComponentStat,
  }));

  const { copySettings } = useModel('design.page.nodesSettings', (model) => ({
    copySettings: model.copySelectedComSettingFromActiveStatToOtherStat,
  }));

  const { copyActions } = useModel('design.page.nodesActions', (model) => ({
    copyActions: model.copySelectedComActionFromActiveStatToOtherStat,
  }));

  const { copyEvents } = useModel('design.page.nodesEvents', (model) => ({
    copyEvents: model.copySelectedComEventFromActiveStatToOtherStat,
  }));

  const { copyStyles } = useModel('design.page.nodesStyles', (model) => ({
    copyStyles: model.copySelectedComStyleFromActiveStatToOtherStat,
  }));

  const { setDefaultState } = useModel(
    'design.page.nodesDefaultsStatus',
    (model) => {
      return {
        setDefaultState: model.setComStatusSettingsDefaults,
      };
    },
  );

  const { triggerSave } = useModel('design.app.stageAutoSave', (model) => ({
    triggerSave: model.triggerPrepareSaveTimeChange,
  }));

  const { setActiveNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    (model) => ({
      setActiveNodeStatId: model.setActiveNodeStatId,
    }),
  );

  return (
    <DrawerForm<{
      name: string;
      isDefault: boolean;
    }>
      title="新建配置状态"
      formRef={formRef}
      trigger={<PlusOutlined />}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      width={400}
      visible={visible}
      onVisibleChange={setVisible}
      submitTimeout={2000}
      onFinish={async (values) => {
        const newStatId = nanoid();

        createStat(newStatId, values.name);

        copySettings(newStatId);

        copyActions(newStatId);

        copyEvents(newStatId);

        copyStyles(newStatId);

        setActiveNodeStatId(newStatId);

        if (values.isDefault) {
          setDefaultState(selectedNodeId!, newStatId);
        }

        message.success('创建成功');
        triggerSave();
        return true;
      }}
    >
      <ProFormText name="name" label="名称" placeholder="请输入名称" />
      <ProFormSwitch
        initialValue={false}
        name="isDefault"
        label="是否设置为默认状态"
      />
    </DrawerForm>
  );
});
