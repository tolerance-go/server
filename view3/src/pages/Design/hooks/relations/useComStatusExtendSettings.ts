import { useModel } from '@umijs/max';
import { useComStatusExtendProps } from '../_utils/useComStatusExtendProps';

/** 组件继承状态修改 */
export const useComStatusExtendSettings = () => {
  const { setComStatSetting, updateComStatSetting } = useModel(
    'Design.page.comsSettings',
    (model) => ({
      setComStatSetting: model.setComStatSetting,
      updateComStatSetting: model.updateComStatSetting,
    }),
  );

  const { getStatLockSettingFields } = useModel('Design.page.statusConnectRelations', (model) => ({
    getStatLockSettingFields: model.getStatLockSettingFields,
  }));

  const {
    setComExtendsProps: setComExtendsSettings,
    setCurrentComPropsExtendsProps: setCurrentComSettingsExtendsSettings,
  } = useComStatusExtendProps({
    getStatLockFields: getStatLockSettingFields,
    updateComStatProps: updateComStatSetting,
    setComStatProps: setComStatSetting,
  });

  return {
    setCurrentComSettingsExtendsSettings,
    setComExtendsSettings,
  };
};
