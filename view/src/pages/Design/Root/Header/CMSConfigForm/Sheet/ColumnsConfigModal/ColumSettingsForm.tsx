import { ConfigurableForm } from '@/pages/design/components/ConfigurableForm';
import { useFormReset } from '@/pages/design/hooks/useFormReset';
import { useSelectedData } from '@/pages/design/hooks/selected/useSelectedData';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import { Empty, Form, Result } from 'antd';
import utl from 'lodash';

export const ColumSettingsForm = () => {
  const { selectedData } = useSelectedData();

  const { columnsSettings } = selectedData?.data ?? {};
  const [form] = Form.useForm();

  const {
    dataColumnSettingsConfigs,
    updateDataListItemColumn,
    getColumnDataMetaAfterUpdateColumnSettings,
  } = useModel('design.database.dataList', (model) => ({
    dataColumnSettingsConfigs: model.dataColumnSettingsConfigs,
    getColumnDataMetaAfterUpdateColumnSettings:
      model.getColumnDataMetaAfterUpdateColumnSettings,
    updateDataListItemColumn: model.updateDataListItemColumn,
  }));

  const { selectedColumnFieldId } = useModel('design.database.dataFieldsConfig', (model) => ({
    selectedColumnFieldId: model.selectedColumnFieldId,
  }));

  const { selectedDataId } = useModel('design.database.selectedDataId', (model) => ({
    selectedDataId: model.selectedDataId,
  }));

  const deboucneUpdate = useMemoizedFn(
    utl.debounce(async (values: Record<string, any>) => {
      if (!selectedDataId || !selectedColumnFieldId) return;

      const { data } = getColumnDataMetaAfterUpdateColumnSettings(
        selectedDataId,
        selectedColumnFieldId,
        values,
      );

      updateDataListItemColumn(
        selectedDataId,
        selectedColumnFieldId,
        data?.columnsSettings?.[selectedColumnFieldId] ?? {},
      );
    }, 350),
  );

  const colSettings = selectedColumnFieldId
    ? columnsSettings?.[selectedColumnFieldId]
    : undefined;

  useFormReset(form, selectedColumnFieldId, colSettings);

  if (!selectedColumnFieldId || !selectedData) {
    return <Empty />;
  }

  if (!colSettings) {
    return <Result status={'error'} title="未找到对应配置"></Result>;
  }

  return (
    <ConfigurableForm
      form={form}
      configs={dataColumnSettingsConfigs[colSettings.type]}
      onValuesChange={(changedValues, values) => {
        deboucneUpdate(values);
      }}
    />
  );
};
