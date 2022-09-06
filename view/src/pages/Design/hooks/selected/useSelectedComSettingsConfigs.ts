import { useSelectedNode } from '@/pages/design/hooks/selected/useSelectedNode';
import { useModel } from '@umijs/max';
import consola from 'consola';

/** 获取当前选中组件配置的设置选项 */
export const useSelectedComSettingsConfigs = () => {
  const { stageSelectNode } = useSelectedNode();

  const { nodesSettingsFormConfigs } = useModel(
    'design.config.nodesSettingsConfigs',
    (model) => ({
      nodesSettingsFormConfigs: model.nodesSettingsFormConfigs,
    }),
  );

  const configs = stageSelectNode?.type
    ? nodesSettingsFormConfigs[stageSelectNode.type]
    : undefined;

  consola.info('渲染配置表单', configs);

  return {
    configs,
  };
};
