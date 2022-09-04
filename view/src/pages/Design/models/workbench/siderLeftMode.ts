import { useModel } from '@umijs/max';
import { useMemoizedFn, usePrevious, useUpdateLayoutEffect } from 'ahooks';
import { useState } from 'react';

/**
 * 左侧边栏内容：
 * pages 页面，布局，物料的栏目状态
 * insert 选中插槽，等待插入组件的场景
 * components 往舞台插入组件的场景
 */
export type SiderLeftMode = 'pages' | 'insert' | 'components';

const useSiderLeftMode = () => {
  /**
   * insert 点击舞台组件等待插入
   * normal 显示 页面，布局，资源等
   */
  const [siderLeftMode, setSiderLeftMode] = useState<SiderLeftMode>('pages');

  const prevMode = usePrevious(siderLeftMode);

  const { cleanFocusSlotsInert } = useModel(
    'Design.stage.slotsInsert',
    (model) => {
      return {
        cleanFocusSlotsInert: model.cleanFocusSlotsInert,
      };
    },
  );

  const switchSiderLeftMode = useMemoizedFn((mode: SiderLeftMode) => {
    setSiderLeftMode(mode);
  });

  useUpdateLayoutEffect(() => {
    if (siderLeftMode !== 'insert' && prevMode === 'insert') {
      cleanFocusSlotsInert();
    }
  }, [siderLeftMode]);

  return {
    siderLeftMode,
    setSiderLeftMode,
    switchSiderLeftMode,
  };
};

export default useSiderLeftMode;
