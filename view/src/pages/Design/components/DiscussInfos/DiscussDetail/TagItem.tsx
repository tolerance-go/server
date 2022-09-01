import { useModel } from '@umijs/max';
import { Tag } from 'antd';

export const TagItem = () => {
  const { componentsStatus } = useModel('Design.page.comsStatus', (model) => ({
    componentsStatus: model.componentsStatus,
  }));

  const { stageComponentsModel } = useModel(
    'Design.page.comsStructures',
    (model) => ({
      stageComponentsModel: model.stageComponentsModel,
    }),
  );

  const { selectedDiscuss } = useModel('Design.playground', (model) => ({
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
