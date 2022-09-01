import { useSaveStageDataWithPage } from '@/pages/Design/hooks/initials/useSaveStageDataWithPage';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { useRequestInternal } from '@/helpers/useRequestInternal';

export const useAutoSave = () => {
  const { saveStageDataWithPage: saveStageComsData } =
    useSaveStageDataWithPage();

  const { prepareSaveTime, updateAutoSaveTime } = useModel(
    'Design.app.stageAutoSave',
  );

  const { loading, run } = useRequestInternal(
    async () => {
      saveStageComsData();
      updateAutoSaveTime();
    },
    {
      manual: true,
    },
  );

  /** 当触发保存的时间修改，调用接口执行保存 */
  useUpdateEffect(() => {
    if (prepareSaveTime) {
      setTimeout(() => {
        run();
      });
    }
  }, [prepareSaveTime]);

  return {
    loading,
  };
};
