import { useModel } from '@umijs/max';
import { useComStatusExtendProps } from '../_utils/useComStatusExtendProps';

/** 组件继承状态修改 */
export const useComStatusExtendStyles = () => {
  const { setComStatStyle, updateComStatStyle } = useModel(
    'design.page.nodesStyles',
    (model) => ({
      setComStatStyle: model.setComStatStyle,
      updateComStatStyle: model.updateComStatStyle,
    }),
  );

  const { getStatLockStyleFields } = useModel('design.page.nodesStatusRelations', (model) => ({
    getStatLockStyleFields: model.getStatLockStyleFields,
  }));

  const {
    setComExtendsProps: setComExtendsStyles,
    setCurrentComPropsExtendsProps: setCurrentComStylesExtendsStyles,
  } = useComStatusExtendProps({
    getStatLockFields: getStatLockStyleFields,
    updateComStatProps: updateComStatStyle,
    setComStatProps: setComStatStyle,
  });

  return {
    setCurrentComStylesExtendsStyles,
    setComExtendsStyles,
  };
};
