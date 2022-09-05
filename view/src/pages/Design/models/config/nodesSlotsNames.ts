import { SLOTS_NAME } from '@/pages/Design/constants';
import { useState } from 'react';

/**
 * 组件对应配置表单的描述信息
 * 及其组件对应初始化配置信息
 */
export default () => {
  const [nodesSlotsNames, setNodesSlotsNames] = useState<
    Record<string, string[]>
  >({
    button: ['children', SLOTS_NAME.ADDON_AFTER, SLOTS_NAME.ADDON_BEFORE],
    line: [SLOTS_NAME.ADDON_AFTER, SLOTS_NAME.ADDON_BEFORE],
    table: [SLOTS_NAME.ADDON_AFTER, SLOTS_NAME.ADDON_BEFORE],
  });

  return {
    nodesSlotsNames,
    setNodesSlotsNames,
  };
};
