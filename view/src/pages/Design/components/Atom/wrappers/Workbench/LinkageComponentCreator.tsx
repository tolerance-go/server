import { getAppIdOrThrow } from '@/pages/Design/helps/getAppIdOrThrow';
import { getPageIdOrThrow } from '@/pages/Design/helps/getPageIdOrThrow';
import { useGetSliceStageData } from '@/pages/Design/hooks/initials/useGetSliceStageData';
import { ComponentStructure } from '@/pages/Design/models/page/nodesStructures';
import { ComponentControllerCreate } from '@/services/server/ComponentController';
import { useModel } from '@umijs/max';
import { useRequestInternal } from '@/helpers/useRequestInternal';
import { Spin } from 'antd';

export const LinkageComponentCreator = (props: {
  nodeId: ComponentStructure['id'];
  type: ComponentStructure['type'];
}) => {
  const { getSliceStageData } = useGetSliceStageData();

  const { addComMaterial } = useModel('Design.component.componentList', (model) => ({
    addComMaterial: model.addComMaterial,
  }));

  const { setNormalStatus } = useModel(
    'Design.workbench.normalModeSubMode',
    (model) => ({
      setNormalStatus: model.setNormalStatus,
    }),
  );

  const { setHighlightId } = useModel(
    'Design.component.listHighlightItemId',
    (model) => ({
      setHighlightId: model.setHighlightId,
    }),
  );

  const { markNodeFromComponent } = useModel(
    'Design.page.nodesStructures',
    (model) => ({
      markNodeFromComponent: model.markNodeFromComponent,
    }),
  );

  const { triggerPrepareSaveTimeChange } = useModel(
    'Design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  /**
   * 从当前舞台上的组件进行复制创建
   */
  const {
    loading: requestComponentFromStageNodeLoading,
    run: requestComponentFromStageNode,
  } = useRequestInternal(
    async (
      stateNodeId: string,
      params: Pick<API.CreationComponent, 'name' | 'desc'>,
    ) => {
      const stageData = getSliceStageData([stateNodeId]);
      const appId = getAppIdOrThrow();
      const pageId = getPageIdOrThrow();

      return ComponentControllerCreate({
        name: params.name,
        desc: params.desc,
        app_id: appId,
        stage_data: JSON.stringify(stageData),
        usedInPageIds: [pageId],
      });
    },
    {
      manual: true,
      onSuccess(data, params) {
        addComMaterial(data);
        setNormalStatus('material');
        setHighlightId(data.id);

        markNodeFromComponent(data.id, props.nodeId);
        triggerPrepareSaveTimeChange();
      },
    },
  );

  return (
    <Spin spinning={requestComponentFromStageNodeLoading}>
      <div
        onClick={() => {
          requestComponentFromStageNode(props.nodeId, {
            name: `${props.type}-${props.nodeId}`,
            desc: '从舞台组件创建',
          });
        }}
      >
        创建关联组件
      </div>
    </Spin>
  );
};
