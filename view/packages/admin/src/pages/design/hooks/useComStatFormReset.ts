import { useModel } from '@umijs/max';
import { FormInstance } from 'antd';
import { useFormReset } from './useFormReset';

export const useComStatFormReset = (
  form: FormInstance,
  data?: Record<string, any>,
) => {
  const { activeNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
    }),
  );

  useFormReset(form, activeNodeStatId, data);
};
