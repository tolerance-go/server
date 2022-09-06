import { ConfigurableForm } from '@/pages/design/components/ConfigurableForm';
import { FormItemExtendLabel } from '@/pages/design/components/FormItemExtendLabel';
import { useComStatusExtendSettings } from '@/pages/design/hooks/relations/useComStatusExtendSettings';
import { useDebounceTriggerPrepareSaveTimeChange } from '@/pages/design/hooks/actions/useDebounceTriggerPrepareSaveTimeChange';
import { useComStatFormReset } from '@/pages/design/hooks/useComStatFormReset';
import { useSelectedComActiveStatExtendRelation } from '@/pages/design/hooks/selected/useSelectedComActiveStatExtendRelation';
import { useSelectedComSettingsConfigs } from '@/pages/design/hooks/selected/useSelectedComSettingsConfigs';
import { useSelectedNode } from '@/pages/design/hooks/selected/useSelectedNode';
import { useModel } from '@umijs/max';
import { Form } from 'antd';
import consola from 'consola';
import useNodeActiveStatSettings from './hooks/useNodeActiveStatSettings';

export const SettingForm = () => {
  const { stageSelectNode } = useSelectedNode();
  const { configs } = useSelectedComSettingsConfigs();

  const activeStatSettings = useNodeActiveStatSettings(stageSelectNode?.id);

  const { setCurrentComSettingsExtendsSettings } = useComStatusExtendSettings();

  const { extendRelation } = useSelectedComActiveStatExtendRelation();

  const [form] = Form.useForm();

  const { debounceTriggerPrepareSaveTimeChange } =
    useDebounceTriggerPrepareSaveTimeChange();

  const { triggerPrepareSaveTimeChange } = useModel(
    'design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { lockComExtendField, unlockComExtendField } = useModel(
    'design.page.nodesStatusRelations',
    (model) => ({
      lockComExtendField: model.lockComExtendSettingField,
      unlockComExtendField: model.unlockComExtendSettingField,
    }),
  );

  // /** 先执行 reset 再执行 setFieldsValue */
  // useEffect(() => {
  //   form.resetFields();
  //   form.setFieldsValue(getSetting());
  // }, [activeNodeStatId]);

  useComStatFormReset(form, activeStatSettings);

  if (!stageSelectNode) {
    consola.info('本次渲染，未选中元素，返回空');
    return null;
  }

  return (
    <ConfigurableForm
      configs={configs}
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 17,
      }}
      theme="dark-area"
      layout={'horizontal'}
      form={form}
      requiredMark={false}
      onValuesChange={(changedValues, values) => {
        consola.success('同步修改组件配置值', values);
        setCurrentComSettingsExtendsSettings(values);
        debounceTriggerPrepareSaveTimeChange();
      }}
      renderLabel={(item) => {
        if (!extendRelation) {
          return <span>{item.label}</span>;
        }

        return (
          <FormItemExtendLabel
            lockFields={extendRelation.settingUnsyncFields}
            fieldName={item.name}
            label={item.label}
            onUnLockClick={() => {
              unlockComExtendField(
                stageSelectNode.id,
                extendRelation.id,
                item.name,
              );
              triggerPrepareSaveTimeChange();
            }}
            onLockClick={() => {
              lockComExtendField(
                stageSelectNode.id,
                extendRelation.id,
                item.name,
              );
              triggerPrepareSaveTimeChange();
            }}
          ></FormItemExtendLabel>
        );
      }}
      configInputProps={(item) => {
        const disabled = extendRelation
          ? /**
             * 锁住表示不自动同步，那么用户就是可以自定义输入的
             * 这里和界面的图标是相反的
             */
            !extendRelation.settingUnsyncFields[item.name]
          : false;
        return {
          disabled,
          bordered: false,
        };
      }}
    ></ConfigurableForm>
  );
};
