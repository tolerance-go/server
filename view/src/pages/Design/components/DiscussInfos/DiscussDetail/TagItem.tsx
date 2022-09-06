import { useModel } from '@umijs/max';
import { Tag } from 'antd';

export const TagItem = () => {
  const { componentsStatus } = useModel('design.page.nodesStatus', (model) => ({
    componentsStatus: model.nodesStatus,
  }));

  const { stageComponentsModel } = useModel(
    'design.page.nodesStructuresAndRootIds',
    (model) => ({
      stageComponentsModel: model.nodesStructures,
    }),
  );

  const { selectedDiscuss } = useModel('design.playground', (model) => ({
    selectedDiscuss: model.selectedDiscuss,
  }));

  if (!selectedDiscuss) return null;

  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      <Tag
        style={{
          fontSize: 10,
          borderRadius: 10,
        }}
        color="blue"
      >
        {stageComponentsModel?.[selectedDiscuss.belongsToComId].type ??
          '未知组件'}
        :{' '}
        {
          componentsStatus[selectedDiscuss.belongsToComId][
            selectedDiscuss.belongsToComStatId
          ].name
        }
      </Tag>
    </div>
  );
};
