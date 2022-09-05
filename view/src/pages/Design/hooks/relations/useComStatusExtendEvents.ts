import { useModel } from '@umijs/max';
import { useComStatusExtendProps } from '../_utils/useComStatusExtendProps';

/** 组件继承状态修改 */
export const useComStatusExtendEvents = () => {
  const { setComStatEventWithName, updateComStatEventWithName } = useModel(
    'Design.page.nodesEvents',
    (model) => ({
      setComStatEventWithName: model.setComStatEventWithName,
      updateComStatEventWithName: model.updateComStatEventWithName,
    }),
  );

  const { getStatLockEventFields } = useModel('Design.page.nodesStatusRelations', (model) => ({
    getStatLockEventFields: model.getStatLockEventFields,
  }));

  const {
    setComExtendsProps: setComExtendsEvents,
    setCurrentComPropsExtendsProps: setCurrentComEventsExtendsEvents,
  } = useComStatusExtendProps({
    getStatLockFields: getStatLockEventFields,
    updateComStatProps: updateComStatEventWithName,
    setComStatProps: setComStatEventWithName,
  });

  return {
    setCurrentComEventsExtendsEvents,
    setComExtendsEvents,
  };
};
