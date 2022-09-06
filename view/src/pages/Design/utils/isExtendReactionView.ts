import { UnsyncFields } from '@/pages/design/models/statusRelations';

/** 是否显示动作行为展示，而非编辑 */
export const isExtendReactionView = (
  extendRelationToStatId: string | undefined,
  extendRelationLockFields: UnsyncFields | undefined,
  activeNodeStatId: string | undefined,
  name: string,
) => {
  return (
    extendRelationToStatId === activeNodeStatId &&
    !extendRelationLockFields?.[name]
  );
};
