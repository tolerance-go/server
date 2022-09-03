import { ProButton } from '@/components/ProButton';
import useLoginUser from '@/hooks/useLoginUser';
import { LicenseControllerCreate } from '@/services/server/LicenseController';
import { WidgetIncludeGroupIncludeLibAndUserAndLicense } from '@/typings/includes';
import { usePickModel } from '@/utils/useModelTypes';
import { DownloadOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useMount } from 'ahooks';
import { Col, Drawer, Rate, Row, Space, Tag, Typography } from 'antd';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import useSearchReq from '../_hooks/useSearchReq';
import Filter from './_components/Filter';
import WidgetDetail from './_components/WidgetDetail';

export default () => {
  const { searchVal } = useModel('widgetsMarket.searchValue', (model) => ({
    searchVal: model.searchVal,
  }));

  const { widgets, loading, addLicenseToItem } = useModel(
    'widgetsMarket.tableList.widgets',
    (model) => ({
      widgets: model.widgets,
      loading: model.loading,
      addLicenseToItem: model.addLicenseToItem,
    }),
  );

  const { setWidget } = usePickModel('WidgetsInstall.selectedWidgetMeta', [
    'setWidget',
  ]);

  const { search } = useSearchReq();

  const user = useLoginUser();

  useMount(() => {
    search();
  });

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Drawer
        title="组件详情"
        width={'70%'}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <WidgetDetail />
      </Drawer>
      <ProList<WidgetIncludeGroupIncludeLibAndUserAndLicense>
        rowKey="id"
        dataSource={widgets}
        split
        loading={loading}
        onRow={(item) => {
          return {
            onClick: () => {
              setVisible(true);
              setWidget(item);
            },
          };
        }}
        metas={{
          title: {
            title: '名称',
            dataIndex: 'name',
            search: false,
            render(dom, entity) {
              return (
                <Space>
                  <Highlighter
                    searchWords={[searchVal]}
                    autoEscape={true}
                    textToHighlight={entity.name}
                  />
                  <Tag>v2.3.0</Tag>
                </Space>
              );
            },
          },
          description: {
            title: '描述',
            dataIndex: 'desc',
            search: false,
          },
          subTitle: {
            title: '标签',
            dataIndex: 'labels',
            search: false,
          },
          content: {
            search: false,
            render: (__, item) => {
              return (
                <Row gutter={20}>
                  <Col span={6}>
                    <div style={{ color: '#00000073' }}>分类</div>
                    <div>
                      <Space size={5}>
                        <Highlighter
                          searchWords={[searchVal]}
                          autoEscape={true}
                          textToHighlight={item.widgetGroup.widgetLib.name}
                        />
                        <span>/</span>
                        <Highlighter
                          searchWords={[searchVal]}
                          autoEscape={true}
                          textToHighlight={item.widgetGroup.name}
                        />
                      </Space>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div style={{ color: '#00000073' }}>作者</div>
                    <div>{item.user.username}</div>
                  </Col>
                  <Col span={6}>
                    <div style={{ color: '#00000073' }}>下载数</div>
                    <div>
                      <Space size={5}>
                        <DownloadOutlined />
                        324,9
                      </Space>
                    </div>
                  </Col>

                  <Col span={6}>
                    <div style={{ color: '#00000073' }}>评分</div>
                    <div>
                      <Space align="baseline" size={5}>
                        <Rate
                          style={{
                            fontSize: 15,
                          }}
                        />
                        <Typography.Text type="secondary">(0)</Typography.Text>
                      </Space>
                    </div>
                  </Col>
                </Row>
              );
            },
          },
          actions: {
            render: (dom, record) => {
              const license = record.licenses.find(
                (lic) => lic.userId === user.id && lic.widgetId === record.id,
              );

              return [
                <ProButton
                  style={{
                    width: 80,
                  }}
                  disabled={!!license}
                  size="small"
                  type="link"
                  key={'get'}
                  request={async () => {
                    const license = await LicenseControllerCreate({
                      widgetId: record.id,
                    });
                    return license;
                  }}
                  onReqSuccess={(data) => {
                    addLicenseToItem(record.id, data);
                  }}
                >
                  {!!license ? '已安装' : '免费安装'}
                </ProButton>,
              ];
            },
          },
        }}
        toolBarRender={() => {
          return [<Filter key={'1'} />];
        }}
        pagination={{}}
        headerTitle={'查询结果'}
      />
    </>
  );
};
