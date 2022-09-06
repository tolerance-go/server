import { ConfigurableForm } from '@/pages/design/components/ConfigurableForm';
import { FormItemExtendLabel } from '@/pages/design/components/FormItemExtendLabel';
import { useComStatusExtendStyles } from '@/pages/design/hooks/relations/useComStatusExtendStyles';
import { useDebounceTriggerPrepareSaveTimeChange } from '@/pages/design/hooks/actions/useDebounceTriggerPrepareSaveTimeChange';
import { useComStatFormReset } from '@/pages/design/hooks/useComStatFormReset';
import { useSelectedComActiveStatExtendRelation } from '@/pages/design/hooks/selected/useSelectedComActiveStatExtendRelation';
import { useSelectedComActiveStatStyle } from '@/pages/design/hooks/selected/useSelectedComActiveStatStyle';
import { useSelectedComStyleConfigs } from '@/pages/design/hooks/selected/useSelectedComStyleConfigs';
import { useSelectedNode } from '@/pages/design/hooks/selected/useSelectedNode';
import { useModel } from '@umijs/max';
import { Form } from 'antd';

export default () => {
  const { configs } = useSelectedComStyleConfigs();
  const [form] = Form.useForm();

  const { stageSelectNode } = useSelectedNode();

  const { setCurrentComStylesExtendsStyles } = useComStatusExtendStyles();

  const { triggerPrepareSaveTimeChange } = useModel(
    'design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  const { debounceTriggerPrepareSaveTimeChange } =
    useDebounceTriggerPrepareSaveTimeChange();

  const { style } = useSelectedComActiveStatStyle(stageSelectNode?.id);
  const { extendRelation } = useSelectedComActiveStatExtendRelation();

  const { lockComExtendStyleField, unlockComExtendStyleField } = useModel(
    'design.page.nodesStatusRelations',
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
