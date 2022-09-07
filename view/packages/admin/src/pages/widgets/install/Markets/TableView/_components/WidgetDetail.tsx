import { usePickModel } from '@/utils/useModelTypes';
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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = 'Just a link: https://reactjs.com.';

export default () => {
  const { widget } = usePickModel('widgets.install.marketListOrderMeta', [
    'widget',
  ]);
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
                {widget?.name}
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
              <Typography.Text>
                {widget?.user.nickname ?? widget?.user.username}
              </Typography.Text>
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
            {widget?.desc}
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
              {widget?.detail ? (
                <ReactMarkdown
                  linkTarget={'_blank'}
                  children={widget?.detail}
                  remarkPlugins={[remarkGfm]}
                />
              ) : null}
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
        <Tabs.TabPane key="changelog" tab="更新日志"></Tabs.TabPane>
        <Tabs.TabPane key="rate" tab="评价"></Tabs.TabPane>
      </Tabs>
    </div>
  );
};
