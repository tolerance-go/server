import { useSelectedComDefaultStatId } from '@/pages/Design/hooks/selected/useSelectedComDefaultStatId';
import { useSetNearSelectedComponentStatusId } from '@/pages/Design/hooks/actions/useSetNearSelectedComponentStatusId';
import { useModel } from '@umijs/max';
import { Badge, Tabs, Typography } from 'antd';
import { useRef } from 'react';
import ComStatusSettingsTrigger from './ComStatusSettingsTrigger';
import CreateComStatus, { CreateComStatusAPI } from './CreateComStatus';

const { TabPane } = Tabs;

export const ComsStatusTabs = () => {
  const createFormRef = useRef<CreateComStatusAPI>(null);

  const { stageSelectNodeId } = useModel('Design.stage.stageSelectNodeId', (model) => ({
    stageSelectNodeId: model?.stageSelectNodeId,
  }));

  const { componentsStatus, deleteComStat } = useModel(
    'Design.page.comsStatus',
    (model) => ({
      componentsStatus: model.componentsStatus,
      deleteComStat: model.deleteComStat,
    }),
  );

  const { deleteComStatRelationFromToStatId } = useModel(
    'Design.page.statusConnectRelations',
    (model) => ({
      deleteComStatRelationFromToStatId:
        model.deleteComStatRelationFromToStatId,
    }),
  );

  const { selectedComDefaultStatId } = useSelectedComDefaultStatId();

  const { setNearSelectedComponentStatusId } =
    useSetNearSelectedComponentStatusId();

  const { activeNodeStatId, setSelectedComponentStatusId } = useModel(
    'Design.stage.activeNodeStatId',
    (model) => ({
      activeNodeStatId: model.activeNodeStatId,
      setSelectedComponentStatusId: model.setActiveComStatId,
    }),
  );

  const { triggerPrepareSaveTimeChange } = useModel(
    'Design.app.stageAutoSave',
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
        setSelectedComponentStatusId(activeKey);
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
