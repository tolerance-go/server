import { useSaveStageDataWithPage } from '@/pages/design/hooks/initials/useSaveStageDataWithPage';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';

export const useAutoSave = () => {
  const { saveStageDataWithPage: saveStageComsData } =
    useSaveStageDataWithPage();

  const { prepareSaveTime, updateAutoSaveTime } = useModel(
    'design.app.stageAutoSave',
  );

  const { loading, run } = useRequestReadyOnAuth(
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
