import { WidgetControllerFindAll } from 'services/server/WidgetController';
import { ProListProps } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Col, Row } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';

export type WidgetIncludeWidgetGroupIncludeWidgetLibAndUser = Server.Widget & {
  widgetGroup: Server.WidgetGroup & {
    widgetLib: Server.WidgetLib;
  };
  user: Server.User;
};

export default ({ searchText }: { searchText: string }): ProListProps => {
  const [widgets, setWidgets] =
    useState<WidgetIncludeWidgetGroupIncludeWidgetLibAndUser[]>();

  useRequest(
    async () => {
      return WidgetControllerFindAll({
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
      });
    },
    {
      onSuccess: (data) => {
        setWidgets(data as WidgetIncludeWidgetGroupIncludeWidgetLibAndUser[]);
      },
    },
  );

  const metas: ProListProps<Server.Widget>['metas'] = {
    dataSource: widgets,
    title: {
      title: '名称',
      dataIndex: 'name',
      render(dom, entity) {
        return (
          <Highlighter
            searchWords={[searchText]}
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
      render: (__, item) => {
        return (
          <Row>
            <Col span={8}>
              <div style={{ color: '#00000073' }}>类型</div>
              <div style={{ color: '#000000D9' }}>
                <Highlighter
                  searchWords={[searchText]}
                  autoEscape={true}
                  textToHighlight={item.elementType}
                />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ color: '#00000073' }}>分组</div>
              <div style={{ color: '#000000D9' }}>
                {item.widgetGroup?.name && (
                  <Highlighter
                    searchWords={[searchText]}
                    autoEscape={true}
                    textToHighlight={item.widgetGroup?.name}
                  />
                )}
              </div>
            </Col>
            <Col span={8}>
              <div style={{ color: '#00000073' }}>组件库</div>
              <div style={{ color: '#000000D9' }}>
                {item.widgetGroup?.widgetLib.name && (
                  <Highlighter
                    searchWords={[searchText]}
                    autoEscape={true}
                    textToHighlight={item.widgetGroup?.widgetLib.name}
                  />
                )}
              </div>
            </Col>
          </Row>
        );
      },
    },
  };

  const dataSource = useMemo(() => {
    return searchText
      ? widgets?.filter(
          (item) =>
            item.name.includes(searchText) ||
            item.widgetGroup?.name.includes(searchText) ||
            item.widgetGroup?.widgetLib?.name.includes(searchText),
        )
      : widgets;
  }, [searchText, widgets]);

  return {
    metas,
    dataSource,
  };
};