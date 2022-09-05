import { useSelectedNode } from '@/pages/Design/hooks/selected/useSelectedNode';
import { pickModel } from '@/utils/pickModel';
import { useModel } from '@umijs/max';
import consola from 'consola';

/** 获取当前选中组件配置的设置选项 */
export const useSelectedComSettingsConfigs = () => {
  const { stageSelectNode } = useSelectedNode();

  const { nodesSettingsFormConfigs: comsSettingsFormConfigs } = useModel(
    'Design.config.nodesSettingsConfigs',
    pickModel(['comsSettingsFormConfigs']),
  );

  const configs = stageSelectNode?.type
    ? comsSettingsFormConfigs[stageSelectNode.type]
    : undefined;

  consola.info('渲染配置表单', configs);

  return {
    configs,
  };
};
