import { UnsyncFields } from '@/pages/Design/models/statusRelations';
import { useModel } from '@umijs/max';
import { useMemoizedFn } from 'ahooks';
import utl from 'lodash';

export const useComStatusExtendProps = <P extends object>(options: {
  getStatLockFields: (comId: string, relationId: string) => UnsyncFields;
  updateComStatProps: (
    comId: string,
    statId: string,
    props: Partial<P>,
  ) => void;
  setComStatProps: (comId: string, statId: string, props: P) => void;
}) => {
  const { getStageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    getStageSelectNodeId: model.getStageSelectNodeId,
  }));

  const { getSelectedComponentStatusId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      getSelectedComponentStatusId: model.getActiveNodeStatId,
    }),
  );

  const { getComExtendStatusFromStat } = useModel(
    'Design.page.statusConnectRelations',
    (model) => ({
      getComExtendStatusFromStat: model.getComExtendRelationsFromStat,
    }),
  );

  /** 设置组件所有继承该配置的组件配置 */
  const setComExtendsProps = useMemoizedFn(
    (comId: string, statId: string, props: Partial<P>) => {
      const extendRelations = getComExtendStatusFromStat(comId, statId);
      extendRelations.forEach((relation) => {
        const lockFields = options.getStatLockFields(comId, relation.id);

        const filtedSettings = utl.omit(
          props,
          lockFields
            ? Object.keys(lockFields).filter((field) => lockFields[field])
            : [],
        );
        options.updateComStatProps(
          comId,
          relation.toId,
          // 锁住的字段，不进行继承同步，在这里过滤掉
          filtedSettings,
        );
        setComExtendsProps(comId, relation.toId, filtedSettings);
      });
    },
  );

  const setCurrentComPropsExtendsProps = useMemoizedFn((props: P) => {
    const activeNodeStatId = getSelectedComponentStatusId();
    const stageSelectNodeId = getStageSelectNodeId();
    if (stageSelectNodeId && activeNodeStatId) {
      options.setComStatProps(
        stageSelectNodeId,
        activeNodeStatId,
        props,
      );

      setComExtendsProps(stageSelectNodeId, activeNodeStatId, props);
    }
  });

  return {
    setComExtendsProps,
    setCurrentComPropsExtendsProps,
  };
};
