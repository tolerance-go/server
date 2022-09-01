import { DownloadOutlined, LineOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  Rate,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from 'antd';

export default () => {
  return (
    <div>
      <Row gutter={30}>
        <Col>
          <Avatar size={150} />
        </Col>
        <Col>
          <Row>
            <Space align="start">
              <Typography.Title
                style={{
                  marginBottom: 10,
                }}
              >
                Flutter
              </Typography.Title>
              <Tag
                style={{
                  position: 'relative',
                  top: 5,
                }}
              >
                v3.4.3
              </Tag>
            </Space>
          </Row>
          <Row>
            <Space split={<LineOutlined rotate={90} />} align="end">
              <Typography.Text>作者</Typography.Text>
              <Space>
                <DownloadOutlined />
                <Typography.Text>3234,234</Typography.Text>
              </Space>
              <Space align="baseline" size={5}>
                <Rate
                  style={{
                    fontSize: 16,
                  }}
                ></Rate>
                <Typography.Text>(5)</Typography.Text>
              </Space>
            </Space>
          </Row>
          <Typography.Paragraph
            style={{
              marginTop: 10,
            }}
          >
            aldsjflajsdfljasldfj
          </Typography.Paragraph>
          <Row>
            <Button size="small" type="primary">
              免费安装
            </Button>
          </Row>
        </Col>
      </Row>
      <Tabs
        style={{
          marginTop: 25,
        }}
      >
        <Tabs.TabPane key="detail" tab="详情介绍">
          <Row gutter={30}>
            <Col span={18}>
              <Typography>
                <Typography.Title level={3}>Introduction</Typography.Title>
                <Typography.Paragraph>
                  In the process of internal desktop applications development,
                  many different design specs and implementations would be
                  involved, which might cause designers and developers
                  difficulties and duplication and reduce the efficiency of
                  development.
                </Typography.Paragraph>
              </Typography>
            </Col>
            <Col
              span={6}
              style={{
                borderLeft: '1px solid #0000000f',
              }}
            >
              <Typography.Title level={5}>标签</Typography.Title>
              <Row>
                <Tag>asdfasf</Tag>
                <Tag>asdfasf</Tag>
                <Tag>asdfasf</Tag>
                <Tag>asdfasf</Tag>
              </Row>
              <Divider />
              <Typography.Title level={5}>其他信息</Typography.Title>
              <Descriptions bordered size="small" column={1}>
                <Descriptions.Item
                  label="发布时间"
                  style={{
                    fontSize: 12,
                  }}
                >
                  Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item
                  label="最近更新时间"
                  style={{
                    fontSize: 12,
                  }}
                >
                  1810000000
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane key="detail" tab="更新日志"></Tabs.TabPane>
        <Tabs.TabPane key="detail" tab="评价"></Tabs.TabPane>
      </Tabs>
    </div>
  );
};
