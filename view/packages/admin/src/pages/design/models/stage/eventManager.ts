import { EventManager } from '@/pages/design/domains/StageEventManager';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';

/**
 * 事件处理中心
 * 目前所有组件公用一个事件中心
 */
const useEventManager = () => {
  const [eventManager] = useState(
    () => new EventManager(location.pathname !== '/playground'),
  );
  const { stageMode } = useModel('design.stage.stageMode', (model) => ({
    stageMode: model.stageMode,
  }));

  useUpdateEffect(() => {
    if (location.pathname === '/workbench') {
      if (stageMode === 'playground') {
        eventManager.enable();
      } else {
        eventManager.disable();
      }
    }
  }, [stageMode]);

  return {
    eventManager,
  };
};

export default useEventManager;
