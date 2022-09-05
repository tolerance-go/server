import { ConfigurableForm } from '@/pages/Design/components/ConfigurableForm';
import { FormItemExtendLabel } from '@/pages/Design/components/FormItemExtendLabel';
import { useComStatusExtendStyles } from '@/pages/Design/hooks/relations/useComStatusExtendStyles';
import { useDebounceTriggerPrepareSaveTimeChange } from '@/pages/Design/hooks/actions/useDebounceTriggerPrepareSaveTimeChange';
import { useComStatFormReset } from '@/pages/Design/hooks/useComStatFormReset';
import { useSelectedComActiveStatExtendRelation } from '@/pages/Design/hooks/selected/useSelectedComActiveStatExtendRelation';
import { useSelectedComActiveStatStyle } from '@/pages/Design/hooks/selected/useSelectedComActiveStatStyle';
import { useSelectedComStyleConfigs } from '@/pages/Design/hooks/selected/useSelectedComStyleConfigs';
import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { useModel } from '@umijs/max';
import { Form } from 'antd';

export default () => {
  const { configs } = useSelectedComStyleConfigs();
  const [form] = Form.useForm();

  const { stageSelectNode } = useSelectedNode();

  const { setCurrentComStylesExtendsStyles } = useComStatusExtendStyles();

  const { triggerPrepareSaveTimeChange } = useModel(
    'Design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { debounceTriggerPrepareSaveTimeChange } =
    useDebounceTriggerPrepareSaveTimeChange();

  const { style } = useSelectedComActiveStatStyle(stageSelectNode?.id);
  const { extendRelation } = useSelectedComActiveStatExtendRelation();

  const { lockComExtendStyleField, unlockComExtendStyleField } = useModel(
    'Design.page.nodesStatusRelations',
    (model) => ({
      lockComExtendStyleField: model.lockComExtendStyleField,
      unlockComExtendStyleField: model.unlockComExtendStyleField,
    }),
  );

  useComStatFormReset(form, style);

  if (!stageSelectNode) {
    return null;
  }

  return (
    <ConfigurableForm
      configs={configs}
      // className={styles.wrapper}
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
        setCurrentComStylesExtendsStyles(values);
        debounceTriggerPrepareSaveTimeChange();
      }}
      renderLabel={(item) => {
        if (!extendRelation) {
          return <span>{item.label}</span>;
        }

        return (
          <FormItemExtendLabel
            lockFields={extendRelation.styleUnsyncFields}
            fieldName={item.name}
            label={item.label}
            onUnLockClick={() => {
              unlockComExtendStyleField(
                stageSelectNode.id,
                extendRelation.id,
                item.name,
              );
              triggerPrepareSaveTimeChange();
            }}
            onLockClick={() => {
              lockComExtendStyleField(
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
            !extendRelation.styleUnsyncFields[item.name]
          : false;
        return {
          disabled,
          bordered: false,
        };
      }}
    ></ConfigurableForm>
  );
};
