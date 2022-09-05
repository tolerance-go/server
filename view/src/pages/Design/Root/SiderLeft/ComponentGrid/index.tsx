import { usePickModel } from '@/utils/useModelTypes';
import { Affix, Card, message, Row, Tabs, Typography } from 'antd';
import React, { useRef } from 'react';
import { useGridData } from './useGridData';
import { useHandleComGridItemClick } from './useHandleComGridItemClick';

const { TabPane } = Tabs;

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'center',
  padding: 14,
  cursor: 'pointer',
};

const App = ({ siderRef }: { siderRef: React.RefObject<HTMLDivElement> }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { handleComGridItemClick } = useHandleComGridItemClick();

  const { widgetsData } = useGridData();

  const { widgetElements } = usePickModel('Design.widgetElements', [
    'widgetElements',
  ]);

  return (
    <div ref={ref}>
      <Tabs
        style={{
          padding: 15,
        }}
        key="item1"
        defaultActiveKey="1"
        size="small"
        destroyInactiveTabPane
      >
        {widgetsData?.map((lib) => {
          return (
            <TabPane tab={lib.name} key={lib.id}>
              {lib.widgetGroups.map((group) => {
                return (
                  <div key={group.name}>
                    <Affix offsetTop={0} target={() => siderRef.current}>
                      <Row
                        style={{
                          padding: '15px 5px 15px 5px',
                          background: '#fff',
                        }}
                      >
                        <Typography.Text
                          style={{
                            fontSize: 14,
                          }}
                          strong
                        >
                          {group.name}
                        </Typography.Text>
                      </Row>
                    </Affix>
                    <Card
                      key={group.id}
                      bordered={false}
                      size="small"
                      style={{
                        /** 左右空 1px 防止滚动的时候，标题挡住 */
                        margin: '0 1px',
                      }}
                    >
                      {group.widgets.map((widget) => {
                        return (
                          <Card.Grid
                            key={widget.id}
                            hoverable={false}
                            style={gridStyle}
                            onClick={() => {
                              if (!widgetElements[widget.type]) {
                                message.info('暂未支持，敬请期待');
                                return;
                              }
                              handleComGridItemClick(widget);
                            }}
                          >
                            <Typography.Text
                              type={
                                widgetElements[widget.type]
                                  ? undefined
                                  : 'secondary'
                              }
                              style={{
                                fontSize: 14,
                              }}
                            >
                              {widget.name}
                            </Typography.Text>
                          </Card.Grid>
                        );
                      })}
                    </Card>
                  </div>
                );
              })}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default App;
