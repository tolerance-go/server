import { SiderContentTopper } from '@/pages/Design/components/SiderContentTopper';
import { Col, Row } from 'antd';
import { PageCreator } from './PageCreator';
import PageFetchReloadTrigger from './PageFetchReloadTrigger';
import PageNav from './PageNav';

export default () => {
  return (
    <Row
      style={{
        flexDirection: 'column',
        height: '100%',
        alignItems: 'stretch',
      }}
      wrap={false}
    >
      <Col flex={'none'}>
        <SiderContentTopper
          title="路径"
          actions={[
            <PageFetchReloadTrigger key={'0'} />,
            <PageCreator key="1" />,
          ]}
        ></SiderContentTopper>
      </Col>
      <Col
        flex={'auto'}
        style={{
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <PageNav />
      </Col>
    </Row>
  );
};
