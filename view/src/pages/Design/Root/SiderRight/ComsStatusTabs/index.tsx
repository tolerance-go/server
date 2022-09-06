import { useSelectedComDefaultStatId } from '@/pages/design/hooks/selected/useSelectedComDefaultStatId';
import { useSetNearSelectedComponentStatusId } from '@/pages/design/hooks/actions/useSetNearSelectedComponentStatusId';
import { useModel } from '@umijs/max';
import { Badge, Tabs, Typography } from 'antd';
import { useRef } from 'react';
import ComStatusSettingsTrigger from './ComStatusSettingsTrigger';
import CreateComStatus, { CreateComStatusAPI } from './CreateComStatus';
import { pickModel } from '@/utils/pickModel';

const { TabPane } = Tabs;

export const ComsStatusTabs = () => {
  const createFormRef = useRef<CreateComStatusAPI>(null);

  const { stageSelectNodeId } = useModel(
    'design.stage.stageSelectNodeId',
    (model) => ({
      stageSelectNodeId: model?.stageSelectNodeId,
    }),
  );

  const { componentsStatus, deleteComStat } = useModel(
    'design.page.nodesStatus',
    (model) => ({
      componentsStatus: model.nodesStatus,
      deleteComStat: model.deleteComStat,
    }),
  );

  const { deleteComStatRelationFromToStatId } = useModel(
    'design.page.nodesStatusRelations',
    (model) => ({
      deleteComStatRelationFromToStatId:
        model.deleteComStatRelationFromToStatId,
    }),
  );

  const { selectedComDefaultStatId } = useSelectedComDefaultStatId();

  const { setNearSelectedComponentStatusId } =
    useSetNearSelectedComponentStatusId();

  const { activeNodeStatId, setActiveNodeStatId } = useModel(
    'design.stage.activeNodeStatId',
    pickModel(['activeNodeStatId', 'setActiveNodeStatId']),
  );

  const { triggerPrepareSaveTimeChange } = useModel(
    'design.app.stageAutoSave',
    (model) => ({
      triggerPrepareSaveTimeChange: model.triggerPrepareSaveTimeChange,
    }),
  );

  return (
    <Tabs
      size="small"
      type="editable-card"
      activeKey={activeNodeStatId}
      addIcon={<CreateComStatus ref={createFormRef} />}
      tabBarExtraContent={{
        right: <ComStatusSettingsTrigger />,
      }}
      onChange={(activeKey) => {
        setActiveNodeStatId(activeKey);
      }}
      onEdit={(event, type) => {
        if (type === 'remove') {
          const statId = event as string;

          if (stageSelectNodeId) {
            /** 如果删除的是激活的 id，重新设置激活 id */
            if (activeNodeStatId === statId) {
              setNearSelectedComponentStatusId();
            }

            deleteComStat(stageSelectNodeId, statId);

            /** 删除继承关系 */
            deleteComStatRelationFromToStatId(stageSelectNodeId, statId);

            triggerPrepareSaveTimeChange();
          }
        }
      }}
    >
      {stageSelectNodeId && componentsStatus[stageSelectNodeId] ? (
        Object.keys(componentsStatus[stageSelectNodeId]).map((statusId) => {
          const componentStatus = componentsStatus[stageSelectNodeId][statusId];
          return (
            <TabPane
              closable={selectedComDefaultStatId !== statusId}
              tab={
                selectedComDefaultStatId === statusId ? (
                  <Badge dot>
                    {activeNodeStatId === statusId ? (
                      <Typography.Link>{componentStatus.name}</Typography.Link>
                    ) : (
                      componentStatus.name
                    )}
                  </Badge>
                ) : (
                  componentStatus.name
                )
              }
              key={statusId}
            ></TabPane>
          );
        })
      ) : (
        <></>
      )}
    </Tabs>
  );
};
