import { useModel } from '@umijs/max';
import { Col, Divider, Row } from 'antd';
import ComMaterial from './ComMaterial';
import ComTree from './ComTree';
import PagePanel from './PagePanel';
import Segmented from './Segmented';

export default () => {
  const { pagesSiderMode } = useModel('design.workbench.normalModeSubMode', (model) => ({
    pagesSiderMode: model.pagesSiderMode,
  }));

  return (
    <Row
      style={{
        flexDirection: 'column',
        height: '100%',
        alignItems: 'stretch',
        padding: 15,
      }}
      wrap={false}
    >
      <Col flex={'none'}>
        <Segmented />
      </Col>
      <Col flex={'none'}>
        <Divider
          style={{
            marginTop: 15,
            marginBottom: 15,
          }}
        ></Divider>
      </Col>
      <Col flex={'auto'}>
        {(() => {
          if (pagesSiderMode === 'page') {
            return <PagePanel />;
          }
          if (pagesSiderMode === 'layout') {
            return <ComTree />;
          }
          if (pagesSiderMode === 'material') {
            return <ComMaterial />;
          }
          return null;
        })()}
      </Col>
    </Row>
  );
};
