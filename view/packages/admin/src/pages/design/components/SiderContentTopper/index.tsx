import { Col, Row, Space, Typography } from 'antd';

export const SiderContentTopper = (props: {
  title: string;
  actions: React.ReactNode[];
}) => {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        background: '#fff',
        paddingBottom: 15,
      }}
    >
      <Col>
        <Typography.Text
          style={{
            fontSize: 14,
          }}
          strong
        >
          {props.title}
        </Typography.Text>
      </Col>
      <Col>
        <Space size={5}>{props.actions}</Space>
      </Col>
    </Row>
  );
};
