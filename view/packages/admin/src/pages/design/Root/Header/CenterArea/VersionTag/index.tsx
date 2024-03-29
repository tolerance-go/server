import { VersionControllerShow } from '@fenxing/common/services/server/VersionController';
import { ExportOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useRequestReadyOnAuth } from '@/helpers/useRequestInternal';

import { Popover, Space, Spin, Tag, Tooltip } from 'antd';
import HistoryList from './HistoryList';
import styles from './index.less';

export const VersionTag = () => {
  const { setActiveVersionId, activeVersionId } = useModel(
    'design.app.versionList',
    (model) => ({
      setActiveVersionId: model.setActiveVersionId,
      activeVersionId: model.activeVersionId,
    }),
  );

  const { data, loading } = useRequestReadyOnAuth(
    async () => {
      if (!activeVersionId) {
        return;
      }
      return VersionControllerShow({
        id: String(activeVersionId),
      });
    },
    {
      refreshDeps: [activeVersionId],
    },
  );

  const renderVersion = () => {
    if (data) {
      return (
        <Tag
          style={{
            cursor: 'pointer',
          }}
        >
          <Space size={'small'}>
            {data?.name}
            <Tooltip title="退出当前版本状态">
              <ExportOutlined
                onClick={() => {
                  setActiveVersionId(undefined);
                }}
                style={{
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
          </Space>
        </Tag>
      );
    }

    return (
      <Tag
        style={{
          cursor: 'pointer',
        }}
      >
        最新未发布
      </Tag>
    );
  };

  return (
    <Spin spinning={loading} size="small">
      <Popover
        content={<HistoryList />}
        trigger={['click']}
        overlayClassName={styles.overlay}
      >
        <Tooltip title="查看历史版本">{renderVersion()}</Tooltip>
      </Popover>
    </Spin>
  );
};
