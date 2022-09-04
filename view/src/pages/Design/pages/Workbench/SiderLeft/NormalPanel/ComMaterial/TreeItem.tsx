import { getAppIdOrThrow } from '@/pages/Design/helps/getAppIdOrThrow';
import { ComponentControllerCreateWithRelation } from '@/services/server/ComponentController';
import { RelationTreeItem } from '@/pages/Design/utils/treeUtils/makeTreeWithRelation';
import { useModel } from '@umijs/max';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';
import { Dropdown, Menu, Row, Tag, Tooltip, Typography } from 'antd';

export const TreeItem = ({
  record,
}: {
  record: RelationTreeItem<API.Component>;
}) => {
  const { requestRemove, addComMaterial } = useModel(
    'Design.component.componentList',
    (model) => ({
      requestRemove: model.requestRemove,
      addComMaterial: model.addComMaterial,
    }),
  );

  const { highlightId } = useModel(
    'Design.component.listHighlightItemId',
    (model) => ({
      highlightId: model.highlightId,
    }),
  );

  const { addMaterialInheritConnection } = useModel(
    'Design.component.componentInheritRelation',
    (model) => ({
      addMaterialInheritConnection: model.addMaterialInheritConnection,
    }),
  );

  /** 从其他组件继承创建 */
  const { run: requestCreateComIheritOtherCom } = useRequestReadyOnAuth(
    async (otherComId: number) => {
      const appId = getAppIdOrThrow();

      return ComponentControllerCreateWithRelation({
        name: `from-${record.id}`,
        desc: '从组件派生',
        fromComId: otherComId,
        appId,
      });
    },
    {
      manual: true,
      onSuccess: (data) => {
        addComMaterial(data.component);
        addMaterialInheritConnection(data.comIheritRelation);
      },
    },
  );

  return (
    <Row justify="space-between" align="middle">
      <Dropdown
        trigger={['contextMenu']}
        overlay={
          <Menu
            items={[
              {
                key: 'extend',
                label: '派生',
                onClick: () => {
                  requestCreateComIheritOtherCom(record.id);
                },
              },
              {
                key: 'remove',
                label: '删除',
                danger: true,
                onClick: () => {
                  requestRemove(record.id);
                },
              },
            ]}
          />
        }
      >
        <Tag>
          <Typography.Text mark={highlightId === record.id}>
            {record.name}
          </Typography.Text>
          {record.desc && (
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {record.desc}
            </Typography.Paragraph>
          )}
        </Tag>
      </Dropdown>
      {record.usedInPageIds?.length ? (
        <Tooltip title={`当前组件被 ${record.usedInPageIds.length} 个页面使用`}>
          <Typography.Text type="secondary">
            {record.usedInPageIds.length}
          </Typography.Text>
        </Tooltip>
      ) : null}
    </Row>
  );
};
