import { WidgetControllerFindAll } from '@/services/server/WidgetController';
import { WidgetGroupControllerFindAll } from '@/services/server/WidgetGroupController';
import { WidgetLibControllerFindAll } from '@/services/server/WidgetLibController';
import {
  WidgetGroupIncludeLibAndUserAndWidgetsAndLicense,
  WidgetIncludeGroupIncludeLibAndUserAndLicense,
  WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
} from '@/typings/includes';
import { ProList } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Badge, Col, Row } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';

const renderBadge = (count?: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -3,
        marginLeft: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

type Key = 'widgets' | 'widgetGroups' | 'widgetLibs';

export default () => {
  const [activeKey, setActiveKey] = useState<Key>('widgets');

  const [widgetMeta, setWidgetMeta] = useState<{
    widgets: WidgetIncludeGroupIncludeLibAndUserAndLicense[];
    widgetGroups: WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[];
    widgetLibs: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[];
  }>();

  useRequest(
    async () => {
      const [widgets, widgetGroups, widgetLibs] = await Promise.all([
        WidgetControllerFindAll({
          includes: [
            {
              model: 'WidgetGroup',
              include: [
                {
                  model: 'WidgetLib',
                },
              ],
            },
            {
              model: 'User',
            },
          ],
        }) as Promise<WidgetIncludeGroupIncludeLibAndUserAndLicense[]>,
        WidgetGroupControllerFindAll({
          includes: [
            {
              model: 'WidgetLib',
            },
            {
              model: 'User',
            },
            {
              model: 'Widget',
            },
          ],
        }) as Promise<WidgetGroupIncludeLibAndUserAndWidgetsAndLicense[]>,
        WidgetLibControllerFindAll({
          includes: [
            {
              model: 'User',
            },
            {
              model: 'WidgetGroup',
              include: [
                {
                  model: 'Widget',
                },
              ],
            },
          ],
        }) as Promise<WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense[]>,
      ]);
      return {
        widgets,
        widgetGroups,
        widgetLibs,
      };
    },
    {
      onSuccess: (data) => {
        setWidgetMeta(data);
      },
    },
  );

  const [searchVal, setSearchVal] = useState('');

  const result = useMemo(() => {
    if (activeKey === 'widgetGroups') {
      return searchVal
        ? widgetMeta?.widgetGroups?.filter((item) =>
            item.name.includes(searchVal),
          )
        : widgetMeta?.widgetGroups;
    }

    if (activeKey === 'widgetLibs') {
      return searchVal
        ? widgetMeta?.widgetLibs?.filter((item) =>
            item.name.includes(searchVal),
          )
        : widgetMeta?.widgetLibs;
    }

    return searchVal
      ? widgetMeta?.widgets?.filter(
          (item) =>
            item.name.includes(searchVal) ||
            item.widgetGroup.name.includes(searchVal) ||
            item.widgetGroup.widgetLib.name.includes(searchVal),
        )
      : widgetMeta?.widgets;
  }, [widgetMeta, searchVal, activeKey]);

  return (
    <ProList<
      | WidgetIncludeGroupIncludeLibAndUserAndLicense
      | WidgetGroupIncludeLibAndUserAndWidgetsAndLicense
      | WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense
    >
      rowKey="id"
      dataSource={result}
      {...(activeKey === 'widgetGroups'
        ? {
            grid: { gutter: 16, column: 4 },
            metas: {
              title: {
                title: '名称',
                dataIndex: 'name',
                render(dom, entity) {
                  const item = entity as WidgetGroupIncludeLibAndUserAndWidgetsAndLicense;
                  return (
                    <span>
                      <Highlighter
                        searchWords={[searchVal]}
                        autoEscape={true}
                        textToHighlight={entity.name}
                      />
                      <Badge
                        count={item.widgets.length}
                        style={{
                          marginTop: -3,
                          marginLeft: 4,
                          color: '#1890FF',
                          backgroundColor: '#E6F7FF',
                        }}
                      />
                    </span>
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
              },
            },
          }
        : activeKey === 'widgetLibs'
        ? {
            grid: { gutter: 16, column: 3 },
            metas: {
              title: {
                title: '名称',
                dataIndex: 'name',
                render(dom, entity) {
                  const item =
                    entity as WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense;

                  const total = (
                    it: WidgetLibIncludeUserAndGroupIncludeWidgetsAndLicense,
                  ) => {
                    let count = 0;
                    for (let iit of it.widgetGroups) {
                      count += iit.widgets.length;
                    }
                    return count;
                  };
                  return (
                    <span>
                      <Highlighter
                        searchWords={[searchVal]}
                        autoEscape={true}
                        textToHighlight={entity.name}
                      />
                      <Badge
                        count={total(item)}
                        style={{
                          marginTop: -3,
                          marginLeft: 4,
                          color: '#1890FF',
                          backgroundColor: '#E6F7FF',
                        }}
                      />
                    </span>
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
              },
            },
          }
        : {
            split: true,
            metas: {
              title: {
                title: '名称',
                dataIndex: 'name',
                render(dom, entity) {
                  return (
                    <Highlighter
                      searchWords={[searchVal]}
                      autoEscape={true}
                      textToHighlight={entity.name}
                    />
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
              },
              content: {
                search: false,
                render: (__, row) => {
                  const item = row as WidgetIncludeGroupIncludeLibAndUserAndLicense;
                  return (
                    <Row>
                      <Col span={8}>
                        <div style={{ color: '#00000073' }}>类型</div>
                        <div style={{ color: '#000000D9' }}>
                          <Highlighter
                            searchWords={[searchVal]}
                            autoEscape={true}
                            textToHighlight={item.elementType}
                          />
                        </div>
                      </Col>
                      <Col span={8}>
                        <div style={{ color: '#00000073' }}>分组</div>
                        <div style={{ color: '#000000D9' }}>
                          <Highlighter
                            searchWords={[searchVal]}
                            autoEscape={true}
                            textToHighlight={item.widgetGroup.name}
                          />
                        </div>
                      </Col>
                      <Col span={8}>
                        <div style={{ color: '#00000073' }}>组件库</div>
                        <div style={{ color: '#000000D9' }}>
                          <Highlighter
                            searchWords={[searchVal]}
                            autoEscape={true}
                            textToHighlight={item.widgetGroup.widgetLib.name}
                          />
                        </div>
                      </Col>
                    </Row>
                  );
                },
              },
            },
          })}
      toolbar={{
        menu: {
          activeKey,
          items: [
            {
              key: 'widgets',
              label: (
                <span>
                  组件
                  {renderBadge(
                    widgetMeta?.widgets.length,
                    activeKey === 'widgets',
                  )}
                </span>
              ),
            },
            {
              key: 'widgetGroups',
              label: (
                <span>
                  组
                  {renderBadge(
                    widgetMeta?.widgetGroups.length,
                    activeKey === 'widgetGroups',
                  )}
                </span>
              ),
            },
            {
              key: 'widgetLibs',
              label: (
                <span>
                  库
                  {renderBadge(
                    widgetMeta?.widgetLibs.length,
                    activeKey === 'widgetLibs',
                  )}
                </span>
              ),
            },
          ],
          onChange(key) {
            setActiveKey(key as Key);
          },
        },
        search: {
          onSearch: (value: string) => {
            setSearchVal(value);
          },
        },
      }}
      pagination={{}}
    />
  );
};
